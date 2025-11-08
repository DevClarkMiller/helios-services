using helios.identity.api.Commands;
using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using System;

namespace helios.identity.api.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IMediator mediator) : ControllerBase {
        [HttpGet("login-google")]
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
        public async Task<IActionResult> GoogleResponse([FromQuery] string returnUrl) {
            AuthenticateResult authResult = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            var command = new AuthResponseCommand { AuthenticationResult = authResult, ProviderId = 1 };
            var result = await mediator.Send(command);

            returnUrl = QueryHelpers.AddQueryString(returnUrl, "token", "THIS_IS_A_TOKEN");

            return Redirect(returnUrl);
        }
    }
}
