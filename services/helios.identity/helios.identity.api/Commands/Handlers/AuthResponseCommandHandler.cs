using MediatR;
using System.Security.Claims;
using helios.identity.data;
using Microsoft.EntityFrameworkCore;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace helios.identity.api.Commands.Handlers {
    public class AuthResponseCommandHandler : IRequestHandler<AuthResponseCommand, User> {
        private IdentityContext _context;
        public AuthResponseCommandHandler(IdentityContext identityContext) {
            _context = identityContext;
        }
        
        public async Task<User> Handle(AuthResponseCommand request, CancellationToken cancellationToken) {
            var claims = request.AuthenticationResult.Principal!.Identities.FirstOrDefault()?.Claims;

            var providerKey = claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
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

                    // Do an update for the user based off the claims
                    await _context.SaveChangesAsync(cancellationToken);

                } else {
                    // TODO: FIND A WAY TO CHECK IF THE USER ALREADY EXISTS

                    // Create the user
                    user = new User {
                        FirstName = firstName,
                        LastName = lastName,
                        LastLoginAt = DateTime.UtcNow
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
                return user;
            } catch {
                await transaction.RollbackAsync(cancellationToken);
                throw;
            }
        }
    }
}
