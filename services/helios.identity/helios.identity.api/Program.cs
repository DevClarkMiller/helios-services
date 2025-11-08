using helios.identity.data;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace helios.identity.api {
    public class Program {
        public static void Main(string[] args) {
            var builder = WebApplication.CreateBuilder(args);
            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'IdentityContextConnection' not found.");

            builder.Services.AddDbContext<IdentityContext>(options => options.UseSqlServer(connectionString));

            //builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = true).AddEntityFrameworkStores<IdentityContext>();
            LoadAppsettings(builder);

            // Add services to the container.
            builder.Services.AddDbContext<IdentityContext>(options =>
                options.UseSqlServer(connectionString));

            builder.Services.AddMediatR(config => {
                config.RegisterServicesFromAssembly(typeof(Program).Assembly);
            });

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var google = builder.Configuration.GetSection("Authentication:Google");

            builder.Services.AddAuthentication(options => {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
            })    
                // Enable cookie-based authentication
                .AddCookie()
                .AddGoogle(options => {
                    options.ClientId = google["ClientId"]!;
                    options.ClientSecret = google["ClientSecret"]!;
                    options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                    options.CallbackPath = "/signin-google";
                });

            var app = builder.Build();

            // Error handling config for prod envs
            if (!app.Environment.IsDevelopment()) {
                app.UseExceptionHandler("/Home/Error");
            }

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment()) {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }

        private static WebApplicationBuilder LoadAppsettings(WebApplicationBuilder builder) {
            builder.Configuration
                .AddJsonFile($"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")}.json");

            return builder;
        }
    }
}
