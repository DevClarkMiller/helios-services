using helios.identity.api.Models;
using MediatR;

namespace helios.identity.api.Commands.Handlers {
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, IdentityResponse<string>> {
        public Task<IdentityResponse<string>> Handle(CreateUserCommand request, CancellationToken cancellationToken) {
            throw new NotImplementedException();
        }
    }
}
