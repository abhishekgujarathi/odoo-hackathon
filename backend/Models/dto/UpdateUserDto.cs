using System.ComponentModel.DataAnnotations;
using backend.Models.Enums;

namespace backend.Models.dto
{
    public class UpdateUserDto
    {
        [MaxLength(50)]
        public string? FirstName { get; set; }

        [MaxLength(50)]
        public string? LastName { get; set; }

        [EmailAddress(ErrorMessage = "Enter a valid email address")]
        public string? Email { get; set; }

        public string? Password { get; set; }

        public string? PhoneNumber { get; set; }

        public UserRole? Role { get; set; }

        public bool? IsActive { get; set; }
    }
}
