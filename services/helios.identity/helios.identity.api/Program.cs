using helios.identity.api.Mappings;
using helios.identity.data;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

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

            builder.Services.AddAutoMapper(options => {
                options.AddProfile<UserProfile>();
            });

            builder.Services.AddCors(options => {
                options.AddPolicy("AllowAnyOrigin",
                builder => {
                    builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                });
            });

            var appSettings = builder.Configuration.GetSection("AppSettings").GetValue<string>("Secret");
            var key = Encoding.ASCII.GetBytes(appSettings!);

            var google = builder.Configuration.GetSection("Authentication:Google");

            builder.Services.AddAuthentication(options => {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(options => {
                    options.RequireHttpsMetadata = false;
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                })
                // Enable cookie-based authentication
                .AddCookie()
                .AddGoogle(options => {
                    options.ClientId = google["ClientId"]!;
                    options.ClientSecret = google["ClientSecret"]!;
                    options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                    options.CallbackPath = "/api/identity/signin-google";
                });

            var app = builder.Build();

            // Error handling config for prod envs
            if (!app.Environment.IsDevelopment()) {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseSwagger(c =>
            {
                // This changes the JSON endpoint
                c.RouteTemplate = "api/identity/swagger/{documentName}/swagger.json";
            });

            app.UseSwaggerUI(c =>
            {
                // This changes the UI path
                c.SwaggerEndpoint("/api/identity/swagger/v1/swagger.json", "My API V1");

                // Serve the UI at /api/identity/swagger
                c.RoutePrefix = "api/identity/swagger";
            });

            app.UseHttpsRedirection();
            app.UseRouting();

            app.UseCors("AllowAnyOrigin");

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
