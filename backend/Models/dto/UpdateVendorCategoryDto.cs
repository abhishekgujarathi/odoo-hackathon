using System.ComponentModel.DataAnnotations;

namespace backend.Models.dto
{
    public class UpdateVendorCategoryDto
    {
        [MaxLength(100)]
        public string? Name { get; set; }

        public string? Description { get; set; }
    }
}
