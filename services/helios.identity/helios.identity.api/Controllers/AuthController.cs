using helios.identity.api.Commands;
using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using System.Security.Claims;

namespace helios.identity.api.Controllers {
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class AuthController(IMediator mediator) : ControllerBase {
        [HttpGet]
        public async Task<IActionResult> Index() {
            AuthenticateResult authResult = await HttpContext.AuthenticateAsync("Bearer");
            var claims = authResult.Principal!.Identities.FirstOrDefault()?.Claims;
            var userId = claims?.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            return Ok(userId);
        }

        [HttpGet("login-google")]
        [AllowAnonymous]
        public IActionResult LoginGoogle([FromQuery] string returnUrl) { 
            var redirectUrl = Url.Action("GoogleResponse", "Auth");

            var properties = new AuthenticationProperties {
                RedirectUri = QueryHelpers.AddQueryString(
                    Url.Action("GoogleResponse", "Auth")!,
                    "returnUrl", returnUrl
                )
            };

            return Challenge(properties, GoogleDefaults.AuthenticationScheme);
        }

        [HttpGet("google-response")]
        [AllowAnonymous]
        public async Task<IActionResult> GoogleResponse([FromQuery] string returnUrl) {
            AuthenticateResult authResult = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            var command = new AuthResponseCommand { AuthenticationResult = authResult, ProviderId = 1 };
            var token = await mediator.Send(command);

            returnUrl = QueryHelpers.AddQueryString(returnUrl, "token", token);

            return Redirect(returnUrl);
        }
    }
}
