using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models.Entities
{
    [Table("Vendor_Categories")]
    public class VendorCategory : BaseEntity
    {
        [Required, MaxLength(100)]
        [Column("Name")]
        public string Name { get; set; } = string.Empty;

        [Column("Description")]
        public string? Description { get; set; }

        public ICollection<Vendor> Vendors { get; set; } = new List<Vendor>();
    }
}
