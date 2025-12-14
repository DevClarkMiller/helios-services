using helios.identity.api.Models;
using helios.identity.api.Services;
using helios.identity.data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace helios.identity.api.Commands.Handlers {
    public class AddAccountCommandHandler : IRequestHandler<AddAccountCommand, IdentityResponse<string>> {
        private IEmailService _emailService;
        private IdentityContext _context;

        public AddAccountCommandHandler(IdentityContext identityContext, IEmailService emailService) {
            _context = identityContext;
            _emailService = emailService;
        }

        public async Task<IdentityResponse<string>> Handle(AddAccountCommand request, CancellationToken cancellationToken) {
            var userLogin = await _context.UserLogins
                .FirstOrDefaultAsync(ul => ul.ProviderId == request.ProviderId && ul.Email == request.Email);

            if (userLogin is null) return IdentityResponse.Fail("Account doesn't exist");

            var userToMerge = await _context.Users.FirstOrDefaultAsync(u => u.Id == userLogin.UserId);

            // We chillin now, so lets merge accounts :)

            // Send email to user which takes them the page asking if they'd like to merge, store token in URL of link to page

            string? email = userLogin.Email;
            if (email is not null) _emailService.SendMergeRequestEmail(request.UserId, userToMerge!.Id);

            return IdentityResponse.Success($"Sending email to ${email} to merge accounts");
        }
    }
}
