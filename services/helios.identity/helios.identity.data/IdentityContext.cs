using Microsoft.EntityFrameworkCore;

namespace helios.identity.data {
    public class IdentityContext : DbContext {
        public DbSet<User> Users { get; set; }
        public DbSet<UserLogin> UserLogins { get; set; }

        public DbSet<Provider> Providers { get; set; }

        public IdentityContext(DbContextOptions<IdentityContext> options) : base(options) {}

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<User>()
                .Property(ul => ul.Id)
                .HasDefaultValueSql("NEWID()");

            modelBuilder.Entity<UserLogin>()
                .HasKey(ul => new { ul.UserId, ul.ProviderKey });

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
