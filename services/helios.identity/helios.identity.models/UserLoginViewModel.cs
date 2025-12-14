namespace helios.identity.models {
    public class UserLoginViewModel {
        public required Guid UserId { get; set; }
        public required int ProviderId { get; set; }
        //public required string? ProviderKey { get; set; } = null; // Users shouldn't see this at all
        public required string? Email { get; set; } = null;
        public required string? PhoneNumber { get; set; } = null;
    }
}
