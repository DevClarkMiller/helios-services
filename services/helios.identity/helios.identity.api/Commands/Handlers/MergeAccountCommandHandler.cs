using helios.identity.api.Models;
using helios.identity.data;
using FreeMediator;
using Microsoft.EntityFrameworkCore;

namespace helios.identity.api.Commands.Handlers {
    public class MergeAccountCommandHandler(IdentityContext identityContext) : IRequestHandler<MergeAccountCommand, IdentityResponse<string>> {
        private readonly IdentityContext _context = identityContext;
        
        public async Task<IdentityResponse<string>> Handle(MergeAccountCommand request, CancellationToken cancellationToken) {
            var originUser = await _context.Users
                .Include(u => u.Logins)
                .FirstOrDefaultAsync(u => u.Id == request.OriginUserId, cancellationToken);

            if (originUser is null) return IdentityResponse.NotFound("Origin user not found");

            var requestedUser = await _context.Users
                .Include(u => u.Logins)
                .FirstOrDefaultAsync(u => u.Id == request.RequestedUserId, cancellationToken);

            if (requestedUser is null) return IdentityResponse.NotFound("Requested user not found");

            var mergeRequest = await _context.MergeRequests
                .FirstOrDefaultAsync(mr => mr.OriginUserId == originUser.Id && mr.RequestedUserId == requestedUser.Id, cancellationToken);

            if (mergeRequest is null) return IdentityResponse.NotFound("No merge request found");

            // Let the login begin
            // Grab the user logins from the requested user, append them on the origin user
            using var transaction = await _context.Database.BeginTransactionAsync(cancellationToken);

            try {
                foreach (var ul in requestedUser.Logins) {
                    var transferedUl = new UserLogin() {
                        UserId = originUser.Id,
                        ProviderId = ul.ProviderId,
                        ProviderKey = ul.ProviderKey,
                        Email = ul.Email,
                        PhoneNumber = ul.PhoneNumber,
                    };

                    originUser.Logins.Add(transferedUl);
                }

                if (request.DeleteRequested) 
                    _context.Remove(requestedUser);

                await _context.SaveChangesAsync(cancellationToken);
                await transaction.CommitAsync(cancellationToken);
                return IdentityResponse.Success("Successfully merged accounts");
            } catch (Exception ex) {
                Console.WriteLine($"Error merging accounts: {ex.Message}");
                await transaction.RollbackAsync(cancellationToken);
                return IdentityResponse.Fail("Failed to merge accounts");
            }
        }
    }
}
