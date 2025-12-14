using helios.identity.api.Commands;
using helios.identity.api.Queries;
using helios.identity.models;
using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace helios.identity.api.Controllers {
    [Route("api/identity/[controller]")]
    [Authorize]
    [ApiController]
    public class UserController(IMediator mediator) : ControllerBase {
        [HttpGet]
        public async Task<IActionResult> GetUser() {
            AuthenticateResult authResult = await HttpContext.AuthenticateAsync("Bearer");
            var claims = authResult.Principal!.Identities.FirstOrDefault()?.Claims;
            string userId = claims?.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value!;

            var command = new GetUserQuery { UserId = Guid.Parse(userId) };
            var result = await mediator.Send(command);
            return result.ToActionResult();
        }

        [HttpPost]
        public async Task<IActionResult> AddAccount([FromBody] AddAccountRequest request) {
            AuthenticateResult authResult = await HttpContext.AuthenticateAsync("Bearer");
            var claims = authResult.Principal!.Identities.FirstOrDefault()?.Claims;

            string userId = claims?.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value!;
            bool validUserId = Guid.TryParse(userId, out Guid parsedUserId);

            if (!validUserId) return BadRequest("Invalid User ID");

            var command = new AddAccountCommand { Email = request.Email, ProviderId = request.ProviderId, UserId = parsedUserId };
            var result = await mediator.Send(command);
            return result.ToActionResult();
        }
    }
}
