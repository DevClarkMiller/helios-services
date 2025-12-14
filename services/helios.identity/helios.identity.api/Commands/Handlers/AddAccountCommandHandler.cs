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
                .FirstOrDefaultAsync(ul => ul.ProviderId == request.ProviderId && ul.Email == request.Email, cancellationToken);

            if (userLogin is null) return IdentityResponse.Fail("Account doesn't exist");

            User userToMerge = (await _context.Users.FirstOrDefaultAsync(u => u.Id == userLogin.UserId, cancellationToken))!;

            User originUser = (await _context.Users
                .Include(u => u.Logins)
                .FirstOrDefaultAsync(u => u.Id == request.UserId, cancellationToken))!;

            // We chillin now, so lets merge accounts :)
            // Send email to user which takes them the page asking if they'd like to merge, store token in URL of link to page

            string? email = userLogin.Email;
            var sentEmail = false;
            if (email is not null) 
                sentEmail = await _emailService.SendMergeRequestEmail(originUser, userToMerge, request.Email);

            if (sentEmail) return IdentityResponse.Success($"Sending email to ${email} to merge accounts");
            return IdentityResponse.Fail("Failed to send email requesting to merge accounts");
        }
    }
}
