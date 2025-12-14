using FreeMediator;
using helios.email.api.Config;
using helios.email.api.Services;
using Microsoft.AspNetCore.Identity;

namespace helios.email.api
{
    public class Program {
        public static void Main(string[] args) {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddMediator(options => {
                options.RegisterServicesFromAssemblyContaining<Program>();
            });

            builder.Services.AddSingleton<IEmailService, EmailService>();
            builder.Services.Configure<EmailOptions>(builder.Configuration.GetSection("Email"));

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment()) {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseSwagger(c => {
                // This changes the JSON endpoint
                c.RouteTemplate = "api/identity/swagger/{documentName}/swagger.json";
            });

            app.UseSwaggerUI(c => {
                // This changes the UI path
                c.SwaggerEndpoint("/api/identity/swagger/v1/swagger.json", "My API V1");

                // Serve the UI at /api/identity/swagger
                c.RoutePrefix = "api/identity/swagger";
            });

            app.UseHttpsRedirection();

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
