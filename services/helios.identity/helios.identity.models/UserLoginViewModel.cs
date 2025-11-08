namespace helios.identity.models {
    public class UserLoginViewModel {
        public required Guid UserId { get; set; }
        public required int ProviderId { get; set; }
        public required string? ProviderKey { get; set; } = null;
        public required string? Email { get; set; } = null;
    }
}
