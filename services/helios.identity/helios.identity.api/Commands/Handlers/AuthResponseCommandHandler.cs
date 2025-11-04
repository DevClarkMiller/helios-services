using MediatR;
using System.Security.Claims;
using helios.identity.data;

namespace helios.identity.api.Commands.Handlers {
    public class AuthResponseCommandHandler : IRequestHandler<AuthResponseCommand, User> {
        public async Task<User> Handle(AuthResponseCommand request, CancellationToken cancellationToken) {
            var claims = request.AuthenticationResult.Principal!.Identities.FirstOrDefault()?.Claims;

            string email = claims?.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value!;

            return new User() { Email = email };
        }
    }
}
