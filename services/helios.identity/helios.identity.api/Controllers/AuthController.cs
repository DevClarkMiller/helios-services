using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.Cookies;
using MediatR;
using helios.identity.api.Commands;

namespace helios.identity.api.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IMediator mediator) : ControllerBase {
        [HttpGet("login-google")]
        public IActionResult LoginGoogle() { 
            var redirectUrl = Url.Action("GoogleResponse", "Auth");
            var properties = new AuthenticationProperties { RedirectUri = redirectUrl };
            return Challenge(properties, GoogleDefaults.AuthenticationScheme);
        }

        [HttpGet("google-response")]
        public async Task<IActionResult> GoogleResponse() {
            AuthenticateResult authResult = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            var command = new AuthResponseCommand { AuthenticationResult = authResult, ProviderId = 1 };
            var result = await mediator.Send(command);
            return Ok(result);
        }
    }
}
