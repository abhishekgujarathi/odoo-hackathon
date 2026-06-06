using backend.Data;
using backend.Models.dto;
using backend.Models.Entities;
using backend.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class QuotationService
    {
        private readonly ILogger<QuotationService> _logger;
        private readonly ApplicationDbContext _context;

        public QuotationService(ILogger<QuotationService> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        public async Task<IReadOnlyList<QuotationResponseDto>> GetAllQuotations()
        {
            var quotations = await _context.Quotations
                .Include(q => q.RFQ)
                .Include(q => q.Vendor)
                .Include(q => q.Items).ThenInclude(qi => qi.RFQItem)
                .OrderByDescending(q => q.CreatedAt)
                .ToListAsync();

            return quotations.Select(MapToResponseDto).ToList();
        }

        public async Task<QuotationResponseDto> GetQuotationById(Guid id)
        {
            var quotation = await _context.Quotations
                .Include(q => q.RFQ)
                .Include(q => q.Vendor)
                .Include(q => q.Items).ThenInclude(qi => qi.RFQItem)
                .FirstOrDefaultAsync(q => q.Id == id);

            if (quotation == null) throw new Exception("Quotation not found");

            return MapToResponseDto(quotation);
        }

        public async Task<IReadOnlyList<QuotationResponseDto>> GetQuotationsByRFQId(Guid rfqId)
        {
            var quotations = await _context.Quotations
                .Include(q => q.RFQ)
                .Include(q => q.Vendor)
                .Include(q => q.Items).ThenInclude(qi => qi.RFQItem)
                .Where(q => q.RFQId == rfqId)
                .OrderBy(q => q.TotalAmount)
                .ToListAsync();

            return quotations.Select(MapToResponseDto).ToList();
        }

        public async Task<QuotationResponseDto> CreateQuotation(CreateQuotationDto dto)
        {
            // Validate RFQ exists
            var rfq = await _context.RFQs.FindAsync(dto.RFQId);
            if (rfq == null) throw new Exception("RFQ not found");

            // Validate vendor exists
            var vendor = await _context.Vendors.FindAsync(dto.VendorId);
            if (vendor == null) throw new Exception("Vendor not found");

            // Check for duplicate
            var existing = await _context.Quotations
                .FirstOrDefaultAsync(q => q.RFQId == dto.RFQId && q.VendorId == dto.VendorId);
            if (existing != null) throw new Exception("Quotation already exists for this vendor and RFQ");

            var quotationNumber = await GenerateQuotationNumber();

            var quotation = new Quotation
            {
                Id = Guid.NewGuid(),
                QuotationNumber = quotationNumber,
                RFQId = dto.RFQId,
                VendorId = dto.VendorId,
                DeliveryDays = dto.DeliveryDays,
                Notes = dto.Notes,
                Status = QuotationStatus.Draft,
                CreatedAt = DateTime.UtcNow
            };

            // Create items and compute totals
            decimal subTotal = 0;
            decimal taxAmount = 0;

            foreach (var itemDto in dto.Items)
            {
                var lineTotal = itemDto.UnitPrice * itemDto.Quantity;
                var lineTax = lineTotal * itemDto.TaxPercentage / 100;

                var item = new QuotationItem
                {
                    Id = Guid.NewGuid(),
                    QuotationId = quotation.Id,
                    RFQItemId = itemDto.RFQItemId,
                    UnitPrice = itemDto.UnitPrice,
                    Quantity = itemDto.Quantity,
                    TaxPercentage = itemDto.TaxPercentage,
                    LineTotal = lineTotal,
                    CreatedAt = DateTime.UtcNow
                };

                quotation.Items.Add(item);
                subTotal += lineTotal;
                taxAmount += lineTax;
            }

            quotation.SubTotal = subTotal;
            quotation.TaxAmount = taxAmount;
            quotation.TotalAmount = subTotal + taxAmount;

            _context.Quotations.Add(quotation);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Quotation {Number} created for RFQ {RFQId}", quotationNumber, dto.RFQId);

            return await GetQuotationById(quotation.Id);
        }

        public async Task<QuotationResponseDto> UpdateQuotation(Guid id, UpdateQuotationDto dto)
        {
            var quotation = await _context.Quotations
                .Include(q => q.RFQ)
                .Include(q => q.Vendor)
                .Include(q => q.Items).ThenInclude(qi => qi.RFQItem)
                .FirstOrDefaultAsync(q => q.Id == id);

            if (quotation == null) throw new Exception("Quotation not found");

            if (dto.DeliveryDays.HasValue) quotation.DeliveryDays = dto.DeliveryDays.Value;
            if (dto.Notes != null) quotation.Notes = dto.Notes;
            if (dto.Status.HasValue)
            {
                quotation.Status = dto.Status.Value;
                if (dto.Status.Value == QuotationStatus.Submitted)
                    quotation.SubmittedAt = DateTime.UtcNow;
            }

            quotation.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            _logger.LogInformation("Quotation {Id} updated", id);
            return MapToResponseDto(quotation);
        }

        public async Task DeleteQuotation(Guid id)
        {
            var quotation = await _context.Quotations.FindAsync(id);
            if (quotation == null) throw new Exception("Quotation not found");

            quotation.IsDeleted = true;
            quotation.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            _logger.LogInformation("Quotation {Id} soft-deleted", id);
        }

        private async Task<string> GenerateQuotationNumber()
        {
            var last = await _context.Quotations
                .IgnoreQueryFilters()
                .OrderByDescending(q => q.QuotationNumber)
                .FirstOrDefaultAsync();

            if (last == null) return "QTN-001";

            var lastNumber = int.Parse(last.QuotationNumber.Replace("QTN-", ""));
            return $"QTN-{(lastNumber + 1):D3}";
        }

        private QuotationResponseDto MapToResponseDto(Quotation q)
        {
            return new QuotationResponseDto
            {
                Id = q.Id,
                QuotationNumber = q.QuotationNumber,
                SubTotal = q.SubTotal,
                TaxAmount = q.TaxAmount,
                TotalAmount = q.TotalAmount,
                DeliveryDays = q.DeliveryDays,
                Notes = q.Notes,
                Status = q.Status,
                SubmittedAt = q.SubmittedAt,
                RFQId = q.RFQId,
                RFQTitle = q.RFQ?.Title ?? "",
                VendorId = q.VendorId,
                VendorName = q.Vendor?.CompanyName ?? "",
                Items = q.Items.Select(i => new QuotationItemResponseDto
                {
                    Id = i.Id,
                    ItemName = i.RFQItem?.ItemName ?? "",
                    UnitPrice = i.UnitPrice,
                    Quantity = i.Quantity,
                    TaxPercentage = i.TaxPercentage,
                    LineTotal = i.LineTotal,
                    RFQItemId = i.RFQItemId
                }).ToList(),
                CreatedAt = q.CreatedAt,
                UpdatedAt = q.UpdatedAt
            };
        }
    }
}
