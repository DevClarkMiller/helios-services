using helios.identity.data;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication;

namespace helios.identity.api.Services;

public class TokenService : ITokenService
{
	private readonly byte[] jwtKey;

	public TokenService(IConfiguration configuration){
		string jwtSecret = configuration.GetSection("AppSettings").GetValue<string>("Secret") 
			?? throw new Exception("Missing JWT Secret in appsettings");
	
		jwtKey = Encoding.ASCII.GetBytes(jwtSecret!);
	}

	public string CreateUserToken(User user, int daysToExpire = 7) {
		var tokenHandler = new JwtSecurityTokenHandler();

		var tokenDescriptor = new SecurityTokenDescriptor {
			Subject = new ClaimsIdentity(new Claim[]
			{
				new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
			}),
			Expires = DateTime.UtcNow.AddDays(daysToExpire),
			SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(jwtKey), 
				SecurityAlgorithms.HmacSha256Signature
			),
		};

		var token = tokenHandler.CreateToken(tokenDescriptor);
		return tokenHandler.WriteToken(token);
	}

	public async Task<IEnumerable<Claim>> GetClaims(HttpContext httpContext) {
		AuthenticateResult authResult = await httpContext.AuthenticateAsync("Bearer");
		return authResult.Principal!.Identities.FirstOrDefault()?.Claims!;
	}
}

public interface ITokenService
{
	string CreateUserToken(User user, int daysToExpire = 7);
	// string CreateServiceToken(int daysToExpire = 7);
	Task<IEnumerable<Claim>> GetClaims(HttpContext httpContext);
}
