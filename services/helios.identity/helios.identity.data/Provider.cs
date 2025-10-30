using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace helios.identity.data {
    public class Provider {
        [Key]
        public required int Id { get; set; }
        [MaxLength(128)]
        public required string Name { get; set; }
    }
}
