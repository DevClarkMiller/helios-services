using System.ComponentModel.DataAnnotations;

namespace helios.identity.models {
    public class ProviderViewModel {
        public required int Id { get; set; }
        public required string Name { get; set; }
    }
}
