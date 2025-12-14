namespace helios.identity.models {
    public class AddAccountRequest {
        public required string Email { get; set; }
        public required int ProviderId { get; set; }
    }
}
