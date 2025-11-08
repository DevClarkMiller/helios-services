using Microsoft.EntityFrameworkCore;

namespace helios.identity.data {
    public class IdentityContext : DbContext {
        public DbSet<User> Users { get; set; }
        public DbSet<UserLogin> UserLogins { get; set; }

        public DbSet<Provider> Providers { get; set; }

        public IdentityContext(DbContextOptions<IdentityContext> options) : base(options) {}

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(u => u.Id)
                      .HasDefaultValueSql("NEWID()");

                entity.HasMany(u => u.Logins)
                      .WithOne(l => l.User)
                      .HasForeignKey(l => l.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

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
