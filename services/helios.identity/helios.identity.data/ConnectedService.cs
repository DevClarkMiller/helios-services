using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace helios.identity.data {
    public class ConnectedService {
        [Key]
        public Guid Id { get; set; }
		public required string Name { get; set; }
		public required Guid UserId { get; set; }

		[ForeignKey(nameof(UserId))]
		public User User { get; set; } = null!;
	}
}
