using System.ComponentModel.DataAnnotations;

namespace helios.identity.data {
    public class User {
        [Key]
        public Guid Id { get; set; }
        [MaxLength(255)]
        public string? DisplayName { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }

        [MaxLength(512)]
        public string? PasswordHash { get; set; } // null if using only external login

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? LastLoginAt { get; set; }
        public bool IsEmailVerified { get; set; } = false;
        public ICollection<UserLogin> Logins = new List<UserLogin>();
    }
}
