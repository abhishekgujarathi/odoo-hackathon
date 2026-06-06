using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models.Entities
{
    public abstract class BaseEntity
    {
        [Key]
        public Guid Id { get; set; }

        [Column("Created_At")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("Created_By_Id")]
        public Guid? CreatedById { get; set; }

        [Column("Updated_At")]
        public DateTime? UpdatedAt { get; set; }

        [Column("Updated_By_Id")]
        public Guid? UpdatedById { get; set; }

        [Column("Is_Deleted")]
        public bool IsDeleted { get; set; } = false;
    }
}
