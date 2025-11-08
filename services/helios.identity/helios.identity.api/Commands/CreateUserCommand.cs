using helios.identity.api.Models;
using helios.identity.models;
using MediatR;

namespace helios.identity.api.Commands {
    public class CreateUserCommand : CreateUserRequest, IRequest<IdentityResponse<string>> {
        public static CreateUserCommand From(CreateUserRequest request)
            => new() {
                Email = request.Email,
                Password = request.Password
            };
    }
}
