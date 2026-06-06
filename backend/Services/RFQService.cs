using backend.Data;
using backend.Models.dto;
using backend.Models.Entities;
using backend.Models.Enums;
using backend.Repositories;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class RFQService
    {
        private readonly ILogger<RFQService> _logger;
        private readonly IRepository<RFQ> _rfqRepo;
        private readonly ApplicationDbContext _context;

        public RFQService(
            ILogger<RFQService> logger,
            IRepository<RFQ> rfqRepo,
            ApplicationDbContext context)
        {
            _logger = logger;
            _rfqRepo = rfqRepo;
            _context = context;
        }

        public async Task<IReadOnlyList<RFQResponseDto>> GetAllRFQs()
        {
            var rfqs = await _context.RFQs
                .Include(r => r.Items)
                .Include(r => r.RFQVendors).ThenInclude(rv => rv.Vendor)
                .Include(r => r.ProcurementOfficer)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();

            return rfqs.Select(MapToResponseDto).ToList();
        }

        public async Task<RFQResponseDto> GetRFQById(Guid id)
        {
            var rfq = await _context.RFQs
                .Include(r => r.Items)
                .Include(r => r.RFQVendors).ThenInclude(rv => rv.Vendor)
                .Include(r => r.ProcurementOfficer)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (rfq == null) throw new Exception("RFQ not found");

            return MapToResponseDto(rfq);
        }

        public async Task<RFQResponseDto> CreateRFQ(CreateRFQDto dto, Guid procurementOfficerId)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                var rfqCode = await GenerateRFQCode();

                var rfq = new RFQ
                {
                    Id = Guid.NewGuid(),
                    RFQNumber = rfqCode,
                    Title = dto.Title,
                    Description = dto.Description,
                    Deadline = dto.Deadline.ToUniversalTime(),
                    Status = RFQStatus.Published, // Publishing immediately for simplicity
                    ProcurementOfficerId = procurementOfficerId,
                    CreatedAt = DateTime.UtcNow
                };

                await _rfqRepo.AddAsync(rfq);

                foreach (var item in dto.Items)
                {
                    var rfqItem = new RFQItem
                    {
                        Id = Guid.NewGuid(),
                        RFQId = rfq.Id,
                        ItemName = item.ItemName,
                        Description = item.Description,
                        Quantity = item.Quantity,
                        Unit = item.Unit,
                        EstimatedUnitPrice = item.EstimatedUnitPrice,
                        CreatedAt = DateTime.UtcNow
                    };
                    await _context.RFQItems.AddAsync(rfqItem);
                }

                foreach (var vendorId in dto.VendorIds)
                {
                    var rfqVendor = new RFQVendor
                    {
                        RFQId = rfq.Id,
                        VendorId = vendorId,
                        InvitedAt = DateTime.UtcNow,
                        InvitationViewed = false
                    };
                    await _context.RFQVendors.AddAsync(rfqVendor);
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                _logger.LogInformation("RFQ created: {RFQNumber}", rfqCode);

                return await GetRFQById(rfq.Id);
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        private async Task<string> GenerateRFQCode()
        {
            var lastRfq = await _context.RFQs
                .IgnoreQueryFilters()
                .OrderByDescending(r => r.RFQNumber)
                .FirstOrDefaultAsync();

            if (lastRfq == null || string.IsNullOrEmpty(lastRfq.RFQNumber))
                return "RFQ-001";

            if (int.TryParse(lastRfq.RFQNumber.Replace("RFQ-", ""), out int lastNumber))
            {
                return $"RFQ-{(lastNumber + 1):D3}";
            }

            return $"RFQ-{DateTime.UtcNow.Ticks}"; // Fallback
        }

        private RFQResponseDto MapToResponseDto(RFQ rfq)
        {
            return new RFQResponseDto
            {
                Id = rfq.Id,
                RFQNumber = rfq.RFQNumber,
                Title = rfq.Title,
                Description = rfq.Description,
                Deadline = rfq.Deadline,
                Status = (int)rfq.Status,
                StatusLabel = rfq.Status.ToString(),
                ProcurementOfficerName = rfq.ProcurementOfficer != null 
                    ? $"{rfq.ProcurementOfficer.FirstName} {rfq.ProcurementOfficer.LastName}"
                    : null,
                CreatedAt = rfq.CreatedAt,
                Items = rfq.Items.Select(i => new RFQItemResponseDto
                {
                    Id = i.Id,
                    ItemName = i.ItemName,
                    Description = i.Description,
                    Quantity = i.Quantity,
                    Unit = i.Unit,
                    EstimatedUnitPrice = i.EstimatedUnitPrice
                }).ToList(),
                Vendors = rfq.RFQVendors.Select(v => new RFQVendorResponseDto
                {
                    VendorId = v.VendorId,
                    CompanyName = v.Vendor?.CompanyName ?? "Unknown",
                    VendorCode = v.Vendor?.VendorCode ?? "",
                    InvitedAt = v.InvitedAt
                }).ToList()
            };
        }
    }
}
