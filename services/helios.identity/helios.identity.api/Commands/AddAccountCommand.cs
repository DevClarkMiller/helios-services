using helios.identity.api.Models;
using helios.identity.models;
using FreeMediator;

namespace helios.identity.api.Commands {
    public class AddAccountCommand : AddAccountRequest, IRequest<IdentityResponse<string>>{ 
        public required Guid UserId { get; set; }
    }
}
