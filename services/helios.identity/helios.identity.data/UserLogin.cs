using System.ComponentModel.DataAnnotations.Schema;

namespace helios.identity.data {
    public class UserLogin {
        public required Guid UserId { get; set; }
        public required int ProviderId { get; set; }
        [ForeignKey(nameof(UserId))]
        public User User { get; set; } = null!;
    }
}
