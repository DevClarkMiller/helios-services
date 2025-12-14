using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace helios.identity.api.Models {
    public class IdentityResponse<T> {
        public bool Succeeded { get; set; }
        public string? Message { get; set; }
        public T? Data { get; set; }
        public string? ErrorCode { get; set; }

        public static IdentityResponse<T> Success(T data, string? message = null)
            => new () {
                Succeeded = true,
                Data = data,
                Message = message
            };

        public static IdentityResponse<T> Fail(string message, string? errorCode = null)
            => new() {
                Succeeded = false,
                Message = message,
                ErrorCode = errorCode
            };

        public static IdentityResponse<T> NotFound(string message = "Resource not found")
            => Fail(message, "NOT_FOUND");

        public static IdentityResponse<T> ValidationError(string message = "Validation failed")
            => Fail(message, "VALIDATION_ERROR");

        public static IdentityResponse<T> Unauthorized(string message = "Unauthorized access")
            => Fail(message, "UNAUTHORIZED");

        public IActionResult ToActionResult() {
            if (Succeeded)
                return new OkObjectResult(this);

            return ErrorCode switch {
                "NOT_FOUND" => new NotFoundObjectResult(this),
                "VALIDATION_ERROR" => new BadRequestObjectResult(this),
                "UNAUTHORIZED" => new UnauthorizedObjectResult(this),
                _ => new ObjectResult(this) {
                    StatusCode = StatusCodes.Status500InternalServerError
                }
            };
        }
    }

    public static class IdentityResponse {
        public static IdentityResponse<T> Success<T>(T data, string? message = null) => IdentityResponse<T>.Success(data, message);
        public static IdentityResponse<string> Fail(string message, string? errorCode = null) => IdentityResponse<string>.Fail(message, errorCode);
        public static IdentityResponse<string> NotFound(string message = "Resource not found") => IdentityResponse<string>.NotFound(message);
        public static IdentityResponse<string> ValidationError(string message = "Validation failed") => IdentityResponse<string>.ValidationError(message);
        public static IdentityResponse<string> Unauthorized(string message = "Unauthorized access") => IdentityResponse<string>.Unauthorized(message);
    }
}
