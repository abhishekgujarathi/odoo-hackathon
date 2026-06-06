using backend.Data.Seeds;
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

        // Existing
        public DbSet<User> Users { get; set; }
        public DbSet<Vendor> Vendors { get; set; }
        public DbSet<VendorCategory> VendorCategories { get; set; }

        // RFQ
        public DbSet<RFQ> RFQs { get; set; }
        public DbSet<RFQItem> RFQItems { get; set; }
        public DbSet<RFQAttachment> RFQAttachments { get; set; }
        public DbSet<RFQVendor> RFQVendors { get; set; }

        // Quotations
        public DbSet<Quotation> Quotations { get; set; }
        public DbSet<QuotationItem> QuotationItems { get; set; }

        // Approvals
        public DbSet<ApprovalWorkflow> ApprovalWorkflows { get; set; }
        public DbSet<ApprovalStep> ApprovalSteps { get; set; }

        // Purchase Orders
        public DbSet<PurchaseOrder> PurchaseOrders { get; set; }
        public DbSet<PurchaseOrderItem> PurchaseOrderItems { get; set; }

        // Invoices
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<InvoiceItem> InvoiceItems { get; set; }

        // Supporting
        public DbSet<EmailLog> EmailLogs { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<ActivityLog> ActivityLogs { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }

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

            // ================== RFQs ====================
            modelBuilder.Entity<RFQ>()
                .HasIndex(r => r.RFQNumber)
                .IsUnique();

            modelBuilder.Entity<RFQ>()
                .HasOne(r => r.ProcurementOfficer)
                .WithMany()
                .HasForeignKey(r => r.ProcurementOfficerId)
                .OnDelete(DeleteBehavior.Restrict);

            // ================== RFQ ITEMS ====================
            modelBuilder.Entity<RFQItem>()
                .HasOne(ri => ri.RFQ)
                .WithMany(r => r.Items)
                .HasForeignKey(ri => ri.RFQId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<RFQItem>()
                .Property(ri => ri.Quantity)
                .HasPrecision(18, 4);

            modelBuilder.Entity<RFQItem>()
                .Property(ri => ri.EstimatedUnitPrice)
                .HasPrecision(18, 2);

            // ================== RFQ ATTACHMENTS ====================
            modelBuilder.Entity<RFQAttachment>()
                .HasOne(ra => ra.RFQ)
                .WithMany(r => r.Attachments)
                .HasForeignKey(ra => ra.RFQId)
                .OnDelete(DeleteBehavior.Cascade);

            // ================== RFQ VENDORS (Junction) ====================
            modelBuilder.Entity<RFQVendor>()
                .HasKey(rv => new { rv.RFQId, rv.VendorId });

            modelBuilder.Entity<RFQVendor>()
                .HasOne(rv => rv.RFQ)
                .WithMany(r => r.RFQVendors)
                .HasForeignKey(rv => rv.RFQId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<RFQVendor>()
                .HasOne(rv => rv.Vendor)
                .WithMany()
                .HasForeignKey(rv => rv.VendorId)
                .OnDelete(DeleteBehavior.Restrict);

            // ================== QUOTATIONS ====================
            modelBuilder.Entity<Quotation>()
                .HasIndex(q => q.QuotationNumber)
                .IsUnique();

            modelBuilder.Entity<Quotation>()
                .HasIndex(q => new { q.RFQId, q.VendorId })
                .IsUnique();

            modelBuilder.Entity<Quotation>()
                .HasOne(q => q.RFQ)
                .WithMany(r => r.Quotations)
                .HasForeignKey(q => q.RFQId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Quotation>()
                .HasOne(q => q.Vendor)
                .WithMany()
                .HasForeignKey(q => q.VendorId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Quotation>()
                .Property(q => q.SubTotal).HasPrecision(18, 2);
            modelBuilder.Entity<Quotation>()
                .Property(q => q.TaxAmount).HasPrecision(18, 2);
            modelBuilder.Entity<Quotation>()
                .Property(q => q.TotalAmount).HasPrecision(18, 2);

            // ================== QUOTATION ITEMS ====================
            modelBuilder.Entity<QuotationItem>()
                .HasOne(qi => qi.Quotation)
                .WithMany(q => q.Items)
                .HasForeignKey(qi => qi.QuotationId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<QuotationItem>()
                .HasOne(qi => qi.RFQItem)
                .WithMany(ri => ri.QuotationItems)
                .HasForeignKey(qi => qi.RFQItemId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<QuotationItem>()
                .Property(qi => qi.UnitPrice).HasPrecision(18, 2);
            modelBuilder.Entity<QuotationItem>()
                .Property(qi => qi.Quantity).HasPrecision(18, 4);
            modelBuilder.Entity<QuotationItem>()
                .Property(qi => qi.TaxPercentage).HasPrecision(5, 2);
            modelBuilder.Entity<QuotationItem>()
                .Property(qi => qi.LineTotal).HasPrecision(18, 2);

            // ================== APPROVAL WORKFLOWS ====================
            modelBuilder.Entity<ApprovalWorkflow>()
                .HasOne(aw => aw.RFQ)
                .WithMany()
                .HasForeignKey(aw => aw.RFQId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ApprovalWorkflow>()
                .HasOne(aw => aw.SelectedQuotation)
                .WithMany()
                .HasForeignKey(aw => aw.SelectedQuotationId)
                .OnDelete(DeleteBehavior.Restrict);

            // ================== APPROVAL STEPS ====================
            modelBuilder.Entity<ApprovalStep>()
                .HasOne(s => s.Workflow)
                .WithMany(w => w.Steps)
                .HasForeignKey(s => s.WorkflowId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ApprovalStep>()
                .HasOne(s => s.Approver)
                .WithMany()
                .HasForeignKey(s => s.ApproverId)
                .OnDelete(DeleteBehavior.Restrict);

            // ================== PURCHASE ORDERS ====================
            modelBuilder.Entity<PurchaseOrder>()
                .HasIndex(po => po.PONumber)
                .IsUnique();

            modelBuilder.Entity<PurchaseOrder>()
                .HasOne(po => po.Vendor)
                .WithMany()
                .HasForeignKey(po => po.VendorId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<PurchaseOrder>()
                .HasOne(po => po.Quotation)
                .WithMany()
                .HasForeignKey(po => po.QuotationId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<PurchaseOrder>()
                .Property(po => po.SubTotal).HasPrecision(18, 2);
            modelBuilder.Entity<PurchaseOrder>()
                .Property(po => po.TaxAmount).HasPrecision(18, 2);
            modelBuilder.Entity<PurchaseOrder>()
                .Property(po => po.TotalAmount).HasPrecision(18, 2);

            // ================== PURCHASE ORDER ITEMS ====================
            modelBuilder.Entity<PurchaseOrderItem>()
                .HasOne(pi => pi.PurchaseOrder)
                .WithMany(po => po.Items)
                .HasForeignKey(pi => pi.PurchaseOrderId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PurchaseOrderItem>()
                .Property(pi => pi.Quantity).HasPrecision(18, 4);
            modelBuilder.Entity<PurchaseOrderItem>()
                .Property(pi => pi.UnitPrice).HasPrecision(18, 2);
            modelBuilder.Entity<PurchaseOrderItem>()
                .Property(pi => pi.TaxPercentage).HasPrecision(5, 2);
            modelBuilder.Entity<PurchaseOrderItem>()
                .Property(pi => pi.TotalAmount).HasPrecision(18, 2);

            // ================== INVOICES ====================
            modelBuilder.Entity<Invoice>()
                .HasIndex(i => i.InvoiceNumber)
                .IsUnique();

            modelBuilder.Entity<Invoice>()
                .HasOne(i => i.PurchaseOrder)
                .WithMany(po => po.Invoices)
                .HasForeignKey(i => i.PurchaseOrderId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Invoice>()
                .Property(i => i.SubTotal).HasPrecision(18, 2);
            modelBuilder.Entity<Invoice>()
                .Property(i => i.TaxAmount).HasPrecision(18, 2);
            modelBuilder.Entity<Invoice>()
                .Property(i => i.TotalAmount).HasPrecision(18, 2);

            // ================== INVOICE ITEMS ====================
            modelBuilder.Entity<InvoiceItem>()
                .HasOne(ii => ii.Invoice)
                .WithMany(i => i.Items)
                .HasForeignKey(ii => ii.InvoiceId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<InvoiceItem>()
                .Property(ii => ii.Quantity).HasPrecision(18, 4);
            modelBuilder.Entity<InvoiceItem>()
                .Property(ii => ii.UnitPrice).HasPrecision(18, 2);
            modelBuilder.Entity<InvoiceItem>()
                .Property(ii => ii.TaxPercentage).HasPrecision(5, 2);
            modelBuilder.Entity<InvoiceItem>()
                .Property(ii => ii.TotalAmount).HasPrecision(18, 2);

            // ================== EMAIL LOGS ====================
            modelBuilder.Entity<EmailLog>()
                .HasOne(e => e.Invoice)
                .WithMany(i => i.EmailLogs)
                .HasForeignKey(e => e.InvoiceId)
                .OnDelete(DeleteBehavior.SetNull);

            // ================== NOTIFICATIONS ====================
            modelBuilder.Entity<Notification>()
                .HasOne(n => n.User)
                .WithMany()
                .HasForeignKey(n => n.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // ================== ACTIVITY LOGS ====================
            modelBuilder.Entity<ActivityLog>()
                .HasOne(a => a.User)
                .WithMany()
                .HasForeignKey(a => a.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ActivityLog>()
                .HasIndex(a => a.EntityId);

            modelBuilder.Entity<ActivityLog>()
                .HasIndex(a => new { a.EntityName, a.EntityId });

            // ================== REFRESH TOKENS ====================
            modelBuilder.Entity<RefreshToken>()
                .HasIndex(rt => rt.Token)
                .IsUnique();

            modelBuilder.Entity<RefreshToken>()
                .HasOne(rt => rt.User)
                .WithMany()
                .HasForeignKey(rt => rt.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // ================== GLOBAL QUERY FILTERS ====================
            modelBuilder.Entity<User>()
                .HasQueryFilter(u => !u.IsDeleted);

            modelBuilder.Entity<Vendor>()
                .HasQueryFilter(v => !v.IsDeleted);

            modelBuilder.Entity<VendorCategory>()
                .HasQueryFilter(c => !c.IsDeleted);

            modelBuilder.Entity<RFQ>()
                .HasQueryFilter(r => !r.IsDeleted);

            modelBuilder.Entity<RFQItem>()
                .HasQueryFilter(ri => !ri.IsDeleted);

            modelBuilder.Entity<RFQAttachment>()
                .HasQueryFilter(ra => !ra.IsDeleted);

            modelBuilder.Entity<Quotation>()
                .HasQueryFilter(q => !q.IsDeleted);

            modelBuilder.Entity<QuotationItem>()
                .HasQueryFilter(qi => !qi.IsDeleted);

            modelBuilder.Entity<ApprovalWorkflow>()
                .HasQueryFilter(aw => !aw.IsDeleted);

            modelBuilder.Entity<ApprovalStep>()
                .HasQueryFilter(s => !s.IsDeleted);

            modelBuilder.Entity<PurchaseOrder>()
                .HasQueryFilter(po => !po.IsDeleted);

            modelBuilder.Entity<PurchaseOrderItem>()
                .HasQueryFilter(pi => !pi.IsDeleted);

            modelBuilder.Entity<Invoice>()
                .HasQueryFilter(i => !i.IsDeleted);

            modelBuilder.Entity<InvoiceItem>()
                .HasQueryFilter(ii => !ii.IsDeleted);

            modelBuilder.Entity<EmailLog>()
                .HasQueryFilter(e => !e.IsDeleted);

            modelBuilder.Entity<Notification>()
                .HasQueryFilter(n => !n.IsDeleted);

            modelBuilder.Entity<ActivityLog>()
                .HasQueryFilter(a => !a.IsDeleted);

            // ================== SEED DATA ====================
            UserSeed.Seed(modelBuilder);
            VendorSeed.Seed(modelBuilder);
        }
    }
}
