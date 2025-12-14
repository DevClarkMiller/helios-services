using helios.identity.api.Config;
using helios.identity.data;
using MailKit.Net.Smtp;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MimeKit;
using System.Collections.Specialized;
using System.Text;
using System.Web;

namespace helios.identity.api.Services {
    public class EmailService(IOptions<EmailOptions> options, IConfiguration config, IdentityContext identityContext) : IEmailService {
        private readonly EmailOptions _options = options.Value;
        private readonly IConfiguration _config = config;
        private readonly IdentityContext _context = identityContext;

        private const string MERGE_EMAIL_PATH = @"Emails/MergeEmail.html";

        public async Task<bool> SendEmailAsync(IEnumerable<string> to, string subject, string body, bool isHtml = false, IEnumerable<string>? cc = null, IEnumerable<string>? bcc = null) {
            try {
                var email = new MimeMessage();
                email.From.Add(MailboxAddress.Parse(_options.Username));

                // Add recipients
                foreach (var emailTo in to)
                    email.To.Add(MailboxAddress.Parse(emailTo));

                // Add CC
                if (cc != null)
                    foreach (var emailCc in cc)
                        email.Cc.Add(MailboxAddress.Parse(emailCc));

                // Add BCC
                if (bcc != null)
                    foreach (var emailBcc in bcc)
                        email.Bcc.Add(MailboxAddress.Parse(emailBcc));

                // Set body
                email.Body = new TextPart(isHtml ? MimeKit.Text.TextFormat.Html : MimeKit.Text.TextFormat.Plain) {
                    Text = body
                };

                // Send email
                using var smtp = new SmtpClient();
                await smtp.ConnectAsync(_options.SmtpServer, _options.Port, MailKit.Security.SecureSocketOptions.StartTls);
                await smtp.AuthenticateAsync(_options.Username, _options.Password);
                await smtp.SendAsync(email);
                await smtp.DisconnectAsync(true);

                return true;
            } catch {
                // log error here if needed
                return false;
            }
        }

        public async Task<bool> SendEmailAsync(string to, string subject, string body, bool isHtml = false, IEnumerable<string>? cc = null, IEnumerable<string>? bcc = null) =>
            await SendEmailAsync([to], subject, body, isHtml, cc, bcc);

        public async Task<bool> SendMergeRequestEmail(User originUser, User requestedUser, string requestedEmail) {
            var html = await File.ReadAllTextAsync(MERGE_EMAIL_PATH);
            html = html.Replace("{{originUserId}}", originUser.Id.ToString());
            html = html.Replace("{{integratedAccounts}}", await BuildMergeRequestEmailIntegratedAccounts(originUser));

            var clientUrl = _config.GetSection("Client").GetValue<string>("Url")!;
            
            var mergeUriBuilder = new UriBuilder($"{clientUrl}/merge");
            NameValueCollection query = HttpUtility.ParseQueryString(mergeUriBuilder.Query);
            query["originUserId"] = originUser.Id.ToString();
            query["requestedUserId"] = requestedUser.Id.ToString();
            mergeUriBuilder.Query = query.ToString();

            html = html.Replace("{{mergeUrl}}", mergeUriBuilder.ToString());

            var subject = "Helios-Identity Account Merge Request";
            return await SendEmailAsync(requestedEmail, subject, html, true);
        }

        private async Task<Dictionary<int, Provider>> getProviderDictAsync() =>
             await _context.Providers.ToDictionaryAsync(p => p.Id, p => p);

        private string getIntegratedAccountRow(string header, string body) =>
            $"<td width=\"30%\" style=\"font-weight: 600\">{header}</td><td>{body}</td>";

        private async Task<string> BuildMergeRequestEmailIntegratedAccounts(User user) {
            var sb = new StringBuilder();

            var providerDict = await getProviderDictAsync();

            foreach (var ul in user.Logins) {
                Provider provider = providerDict[ul.ProviderId];

                sb.AppendLine("<tr><td class=\"nested-card\"><table style=\"width: 100%;\" >");
                sb.AppendLine("<tbody><tr>");
                sb.AppendLine(getIntegratedAccountRow("Type", provider.Name));
                if (ul.Email is not null)
                    sb.AppendLine(getIntegratedAccountRow("Email", ul.Email));
                if (ul.PhoneNumber is not null)
                    sb.AppendLine(getIntegratedAccountRow("Phone Number", ul.PhoneNumber));
                sb.AppendLine("</tr></tbody>");
                sb.AppendLine(" </table></td></tr>");
            }

            return sb.ToString();
        }
    }

    public interface IEmailService {
        Task<bool> SendMergeRequestEmail(User originUser, User requestedUser, string requestedEmail);
        Task<bool> SendEmailAsync(IEnumerable<string> to, string subject, string body, bool isHtml = false, IEnumerable<string>? cc = null, IEnumerable<string>? bcc = null);
        Task<bool> SendEmailAsync(string to, string subject, string body, bool isHtml = false, IEnumerable<string>? cc = null, IEnumerable<string>? bcc = null);
    }
}
