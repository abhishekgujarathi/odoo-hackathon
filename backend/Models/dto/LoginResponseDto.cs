namespace backend.Models.dto
{
    public class LoginResponseDto
    {
        public LoginResponseDto(string userId, string firstName, string lastName, string email, string role, string jwtToken)
        {
            UserId = userId;
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            Role = role;
            JwtToken = jwtToken;
        }

        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string JwtToken { get; set; }
    }
}
