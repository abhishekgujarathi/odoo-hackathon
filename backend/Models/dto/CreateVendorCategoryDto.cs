using System.ComponentModel.DataAnnotations;

namespace backend.Models.dto
{
    public class CreateVendorCategoryDto
    {
        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }
    }
}
