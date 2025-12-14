namespace helios.identity.api.Services {
    public class EmailService : IEmailService {
        public bool SendMergeRequestEmail(Guid originUserId, Guid destinationUserId) {
            return true;
        }
    }

    public interface IEmailService {
        bool SendMergeRequestEmail(Guid originUserId, Guid requestedUserId);
    }
}
