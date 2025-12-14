using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace helios.identity.data {
    public class MergeRequest {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public required Guid OriginUserId { get; set; }
        public required Guid RequestedUserId { get; set; }
        public DateTime RequestedAt { get; set; } = DateTime.UtcNow;
        [ForeignKey(nameof(OriginUserId))]
        public User OriginUser { get; set; } = null!;
        [ForeignKey(nameof(RequestedUserId))]
        public User RequestedUser { get; set; } = null!;
    }
}
