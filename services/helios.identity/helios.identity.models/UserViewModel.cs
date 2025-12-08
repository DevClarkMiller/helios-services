namespace helios.identity.models {
    public class UserViewModel {
        public Guid Id { get; set; }
        public string? DisplayName { get; set; } = null;
        public string? FirstName { get; set; } = null;
        public string? LastName { get; set; } = null;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? LastLoginAt { get; set; } = null;
        public bool IsEmailVerified { get; set; } = false;
        public ICollection<UserLoginViewModel> Logins { get; set; } = new List<UserLoginViewModel>();
    }
}
