using System.ComponentModel.DataAnnotations;

namespace backend.Models.dto
{
    public class UpdateUserDto
    {
        [MaxLength(50)]
        public string? Username { get; set; }

        [EmailAddress(ErrorMessage = "Enter a valid email address")]
        public string? Email { get; set; }

        public string? Password { get; set; }
    }
}
