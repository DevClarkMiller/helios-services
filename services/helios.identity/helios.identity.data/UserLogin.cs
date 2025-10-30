using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace helios.identity.data {
    public class UserLogin {
        public required Guid UserId { get; set; }
        public required int ProviderId { get; set; }
        [ForeignKey(nameof(UserId))]
        public User User { get; set; } = null!;
    }
}
