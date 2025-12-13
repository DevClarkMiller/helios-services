using helios.identity.data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace helios.identity.api.Commands.Handlers {
    public class AuthResponseCommandHandler : IRequestHandler<AuthResponseCommand, string> {
        private IdentityContext _context;
        IConfiguration _configuration;
        public AuthResponseCommandHandler(IdentityContext identityContext, IConfiguration configuration) {
            _context = identityContext;
            _configuration = configuration;
        }
        
        public async Task<string> Handle(AuthResponseCommand request, CancellationToken cancellationToken) {
            var claims = request.AuthenticationResult.Principal!.Identities.FirstOrDefault()?.Claims;

            var providerKey = claims?.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            string email = claims?.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value!;
            string firstName = claims?.FirstOrDefault(c => c.Type == ClaimTypes.GivenName)?.Value!;
            string lastName = claims?.FirstOrDefault(c => c.Type == ClaimTypes.Surname)?.Value!;

            using var transaction = await _context.Database.BeginTransactionAsync(cancellationToken);

            try {
                User user;

                // Try to find the user login by email and ProviderId
                var userLogin = await _context.UserLogins
                    .Include(ul => ul.User)
                    .FirstOrDefaultAsync(ul => ul.ProviderId == request.ProviderId && ul.Email == email);

                if (userLogin is not null) {
                    user = userLogin.User;

                    user.FirstName = firstName;
                    user.LastName = lastName;

                    user.LastLoginAt = DateTime.UtcNow;

                    // Do an update for the user based off the claims
                    await _context.SaveChangesAsync(cancellationToken);

                } else {
                    // TODO: FIND A WAY TO CHECK IF THE USER ALREADY EXISTS

                    // Create the user
                    user = new User {
                        FirstName = firstName,
                        LastName = lastName,
                        LastLoginAt = DateTime.UtcNow,
                        CreatedAt = DateTime.UtcNow,
                    };

                    await _context.AddAsync(user, cancellationToken);
                    await _context.SaveChangesAsync(cancellationToken);

                    // Create the UserLogin
                    userLogin = new UserLogin {
                        Email = email,
                        ProviderKey = providerKey,
                        ProviderId = request.ProviderId,
                        UserId = user.Id
                    };

                    await _context.AddAsync(userLogin, cancellationToken);
                    await _context.SaveChangesAsync(cancellationToken);
                }

                await transaction.CommitAsync(cancellationToken);

                var tokenHandler = new JwtSecurityTokenHandler();

                var jwtSecret = _configuration.GetSection("AppSettings").GetValue<string>("Secret");
                var key = Encoding.ASCII.GetBytes(jwtSecret!);
                var tokenDescriptor = new SecurityTokenDescriptor {
                    // We only store the users id, the rest of the info can be fetched when needed
                    Subject = new ClaimsIdentity(new Claim[] { 
                        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                        SecurityAlgorithms.HmacSha256Signature
                    )
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                string returnToken = tokenHandler.WriteToken(token);

                return returnToken;
            } catch {
                await transaction.RollbackAsync(cancellationToken);
                throw;
            }
        }
    }
}
