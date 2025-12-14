using helios.email.api.Config;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;

namespace helios.email.api.Services {
    public class EmailService(IOptions<EmailOptions> options) : IEmailService {
        private readonly EmailOptions _options = options.Value;

        public async Task<bool> SendEmailAsync(IEnumerable<string> to, string subject, string body, bool isHtml, IEnumerable<string>? cc = null, IEnumerable<string>? bcc = null) {
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

        public async Task<bool> SendEmailAsync(string to, string subject, string body, bool isHtml, IEnumerable<string>? cc = null, IEnumerable<string>? bcc = null) =>
            await SendEmailAsync([to], subject, body, isHtml, cc, bcc);
    }

    public interface IEmailService {
        Task<bool> SendEmailAsync(IEnumerable<string> to, string subject, string body, bool isHtml, IEnumerable<string>? cc = null, IEnumerable<string>? bcc = null);
        Task<bool> SendEmailAsync(string to, string subject, string body, bool isHtml, IEnumerable<string>? cc = null, IEnumerable<string>? bcc = null);
    }
}
