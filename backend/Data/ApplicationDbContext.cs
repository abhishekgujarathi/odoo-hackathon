using backend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        private readonly ILogger<ApplicationDbContext> _logger;

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, ILogger<ApplicationDbContext> logger) : base(options)
        {
            _logger = logger;
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Vendor> Vendors { get; set; }
        public DbSet<VendorCategory> VendorCategories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ================== USERS ====================
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // ================== VENDORS ====================
            modelBuilder.Entity<Vendor>()
                .HasIndex(v => v.VendorCode)
                .IsUnique();

            modelBuilder.Entity<Vendor>()
                .HasIndex(v => v.Email)
                .IsUnique();

            modelBuilder.Entity<Vendor>()
                .HasOne(v => v.Category)
                .WithMany(c => c.Vendors)
                .HasForeignKey(v => v.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Vendor>()
                .HasOne(v => v.User)
                .WithMany()
                .HasForeignKey(v => v.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Vendor>()
                .Property(v => v.Rating)
                .HasPrecision(3, 2);

            // ================== VENDOR CATEGORIES ====================
            modelBuilder.Entity<VendorCategory>()
                .HasIndex(c => c.Name)
                .IsUnique();

            // ================== GLOBAL FILTERS ====================
            modelBuilder.Entity<User>()
                .HasQueryFilter(u => !u.IsDeleted);

            modelBuilder.Entity<Vendor>()
                .HasQueryFilter(v => !v.IsDeleted);

            modelBuilder.Entity<VendorCategory>()
                .HasQueryFilter(c => !c.IsDeleted);
        }
    }
}
