using System.Text.Json.Serialization;

namespace backend.Models.dto
{
    public class LoginResponseDto
    {
        public LoginResponseDto(string userId, string username, string email, string jwtToken)
        {
            UserId = userId;
            Username = username;
            Email = email;
            JwtToken = jwtToken;
        }

        public string UserId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string JwtToken { get; set; }
    }
}
