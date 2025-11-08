using helios.identity.data;
using MediatR;
using Microsoft.AspNetCore.Authentication;

namespace helios.identity.api.Commands {
    public class AuthResponseCommand : IRequest<string> {
        public required AuthenticateResult AuthenticationResult;
        public required int ProviderId { get; set; }
    }
}
