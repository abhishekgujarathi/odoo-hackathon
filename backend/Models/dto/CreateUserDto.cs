using System.ComponentModel.DataAnnotations;

namespace backend.Models.dto
{
    public class CreateUserDto
    {
        [Required, MaxLength(50)]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        [Required, EmailAddress(ErrorMessage = "Enter a valid email address")]
        public string Email { get; set; } = string.Empty;
    }
}
