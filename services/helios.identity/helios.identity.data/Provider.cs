using System.ComponentModel.DataAnnotations;

namespace helios.identity.data {
    public class Provider {
        [Key]
        public required int Id { get; set; }
        [MaxLength(128)]
        public required string Name { get; set; }
    }
}
