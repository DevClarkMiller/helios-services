using helios.identity.data;
using FreeMediator;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using helios.identity.api.Services;

namespace helios.identity.api.Commands.Handlers {
    public class AuthResponseCommandHandler : IRequestHandler<AuthResponseCommand, string> {
        private IdentityContext _context;
        private IConfiguration _configuration;
		private ITokenService _tokenService;

        public AuthResponseCommandHandler(IdentityContext identityContext, IConfiguration configuration, ITokenService tokenService) {
            _context = identityContext;
            _configuration = configuration;
			_tokenService = tokenService;
        }
        
        public async Task<string> Handle(AuthResponseCommand request, CancellationToken cancellationToken) {
            var claims = request.AuthenticationResult.Principal!.Identities.FirstOrDefault()?.Claims;

            var providerKey = claims?.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            string email = claims?.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value!;
            string phone = claims?.FirstOrDefault(c => c.Type == ClaimTypes.MobilePhone)?.Value!;
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
                        PhoneNumber = phone,
                        ProviderKey = providerKey,
                        ProviderId = request.ProviderId,
                        UserId = user.Id,
                    };

                    await _context.AddAsync(userLogin, cancellationToken);
                    await _context.SaveChangesAsync(cancellationToken);
                }

                await transaction.CommitAsync(cancellationToken);

                return _tokenService.CreateUserToken(user);
            } catch {
                await transaction.RollbackAsync(cancellationToken);
                throw;
            }
        }
    }
}
