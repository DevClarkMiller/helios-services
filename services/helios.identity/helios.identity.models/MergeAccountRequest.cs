namespace helios.identity.models {
    public class MergeAccountRequest {
        public required bool DeleteRequested { get; set; }
        public required Guid OriginUserId { get; set; } 
        public required Guid RequestedUserId { get; set; }
    }
}
