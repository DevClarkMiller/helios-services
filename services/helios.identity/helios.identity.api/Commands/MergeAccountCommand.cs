using MediatR;
using helios.identity.api.Models;
using helios.identity.models;

namespace helios.identity.api.Commands {
    public class MergeAccountCommand : MergeAccountRequest, IRequest<IdentityResponse<string>> {
        public static MergeAccountCommand From(MergeAccountRequest request) =>
            new() { DeleteRequested = request.DeleteRequested, OriginUserId = request.OriginUserId, RequestedUserId = request.RequestedUserId };
    }
}
