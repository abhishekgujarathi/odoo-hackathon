using backend.Models.dto;
using backend.Models.Entities;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto dto)
        {
            try
            {
                var response = await _authService.Login(dto);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("verify")]
        public IActionResult Verify()
        {
            var user = (User?)HttpContext.Items["User"];
            if (user == null)
                return Unauthorized(new { message = "Token is invalid or expired" });

            return Ok(new
            {
                userId = user.Id.ToString(),
                username = user.Username,
                email = user.Email,
                jwtToken = Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last()
            });
        }
    }
}
