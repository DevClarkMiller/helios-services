using helios.identity.api.Queries;
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
    }
}
