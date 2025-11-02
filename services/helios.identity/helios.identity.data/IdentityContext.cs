using Microsoft.EntityFrameworkCore;

namespace helios.identity.data {
    public class IdentityContext : DbContext {
        public DbSet<User> Users { get; set; }
        public DbSet<UserLogin> UserLogins { get; set; }

        public DbSet<Provider> Providers { get; set; }

        public IdentityContext(DbContextOptions<IdentityContext> options) : base(options) {}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<Provider>().HasData([
                new Provider { 
                    Id = 1,
                    Name = "google"
                },
                new Provider { 
                    Id = 2,
                    Name = "microsoft"
                },
                new Provider { 
                    Id = 3,
                    Name = "helios"
                },
            ]);
        }
    }
}
