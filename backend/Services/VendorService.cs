using backend.Data;
using backend.Models.dto;
using backend.Models.Entities;
using backend.Models.Enums;
using backend.Repositories;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class VendorService
    {
        private readonly ILogger<VendorService> _logger;
        private readonly IRepository<Vendor> _vendorRepo;
        private readonly ApplicationDbContext _context;

        public VendorService(ILogger<VendorService> logger, IRepository<Vendor> vendorRepository, ApplicationDbContext context)
        {
            _logger = logger;
            _vendorRepo = vendorRepository;
            _context = context;
        }

        public async Task<IReadOnlyList<VendorResponseDto>> GetAllVendors()
        {
            var vendors = await _context.Vendors
                .Include(v => v.Category)
                .ToListAsync();

            return vendors.Select(MapToResponseDto).ToList();
        }

        public async Task<VendorResponseDto> GetVendorById(Guid id)
        {
            var vendor = await _context.Vendors
                .Include(v => v.Category)
                .FirstOrDefaultAsync(v => v.Id == id);

            if (vendor == null) throw new Exception("Vendor not found");

            return MapToResponseDto(vendor);
        }

        public async Task<VendorResponseDto> CreateVendor(CreateVendorDto dto)
        {
            // Check if email already exists
            var existingEmail = await _vendorRepo.FindAsync(v => v.Email == dto.Email);
            if (existingEmail != null) throw new Exception("Vendor with this email already exists");

            // Auto-generate vendor code
            var vendorCode = await GenerateVendorCode();

            var vendor = new Vendor
            {
                Id = Guid.NewGuid(),
                VendorCode = vendorCode,
                CompanyName = dto.CompanyName,
                GSTNumber = dto.GSTNumber,
                PANNumber = dto.PANNumber,
                Email = dto.Email,
                Phone = dto.Phone,
                Website = dto.Website,
                AddressLine1 = dto.AddressLine1,
                AddressLine2 = dto.AddressLine2,
                City = dto.City,
                State = dto.State,
                Country = dto.Country,
                PostalCode = dto.PostalCode,
                Status = VendorStatus.Pending,
                Rating = 0,
                CategoryId = dto.CategoryId,
                UserId = dto.UserId,
                CreatedAt = DateTime.UtcNow
            };

            await _vendorRepo.AddAsync(vendor);
            _logger.LogInformation("Vendor created with code: {VendorCode}", vendor.VendorCode);

            // Reload with Category navigation
            var created = await _context.Vendors
                .Include(v => v.Category)
                .FirstAsync(v => v.Id == vendor.Id);

            return MapToResponseDto(created);
        }

        public async Task<VendorResponseDto> UpdateVendor(Guid id, UpdateVendorDto dto)
        {
            var vendor = await _context.Vendors
                .Include(v => v.Category)
                .FirstOrDefaultAsync(v => v.Id == id);

            if (vendor == null) throw new Exception("Vendor not found");

            if (!string.IsNullOrEmpty(dto.CompanyName))
                vendor.CompanyName = dto.CompanyName;

            if (!string.IsNullOrEmpty(dto.Email))
            {
                var existingEmail = await _vendorRepo.FindAsync(v => v.Email == dto.Email);
                if (existingEmail != null && existingEmail.Id != id)
                    throw new Exception("Vendor with this email already exists");
                vendor.Email = dto.Email;
            }

            if (dto.GSTNumber != null) vendor.GSTNumber = dto.GSTNumber;
            if (dto.PANNumber != null) vendor.PANNumber = dto.PANNumber;
            if (dto.Phone != null) vendor.Phone = dto.Phone;
            if (dto.Website != null) vendor.Website = dto.Website;
            if (dto.AddressLine1 != null) vendor.AddressLine1 = dto.AddressLine1;
            if (dto.AddressLine2 != null) vendor.AddressLine2 = dto.AddressLine2;
            if (dto.City != null) vendor.City = dto.City;
            if (dto.State != null) vendor.State = dto.State;
            if (dto.Country != null) vendor.Country = dto.Country;
            if (dto.PostalCode != null) vendor.PostalCode = dto.PostalCode;
            if (dto.Status.HasValue) vendor.Status = dto.Status.Value;
            if (dto.Rating.HasValue) vendor.Rating = dto.Rating.Value;
            if (dto.CategoryId.HasValue) vendor.CategoryId = dto.CategoryId.Value;

            vendor.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            _logger.LogInformation("Vendor updated: {Id}", id);

            return MapToResponseDto(vendor);
        }

        public async Task DeleteVendor(Guid id)
        {
            var vendor = await _vendorRepo.GetByIdAsync(id);
            if (vendor == null) throw new Exception("Vendor not found");

            await _vendorRepo.DeleteAsync(vendor);
            _logger.LogInformation("Vendor deleted: {Id}", id);
        }

        // ================== HELPER METHODS ====================

        private async Task<string> GenerateVendorCode()
        {
            var lastVendor = await _context.Vendors
                .IgnoreQueryFilters()
                .OrderByDescending(v => v.VendorCode)
                .FirstOrDefaultAsync();

            if (lastVendor == null)
                return "VND-001";

            var lastNumber = int.Parse(lastVendor.VendorCode.Replace("VND-", ""));
            return $"VND-{(lastNumber + 1):D3}";
        }

        private VendorResponseDto MapToResponseDto(Vendor vendor)
        {
            return new VendorResponseDto
            {
                Id = vendor.Id,
                VendorCode = vendor.VendorCode,
                CompanyName = vendor.CompanyName,
                GSTNumber = vendor.GSTNumber,
                PANNumber = vendor.PANNumber,
                Email = vendor.Email,
                Phone = vendor.Phone,
                Website = vendor.Website,
                AddressLine1 = vendor.AddressLine1,
                AddressLine2 = vendor.AddressLine2,
                City = vendor.City,
                State = vendor.State,
                Country = vendor.Country,
                PostalCode = vendor.PostalCode,
                Status = vendor.Status,
                Rating = vendor.Rating,
                CategoryId = vendor.CategoryId,
                CategoryName = vendor.Category?.Name,
                UserId = vendor.UserId,
                CreatedAt = vendor.CreatedAt,
                UpdatedAt = vendor.UpdatedAt
            };
        }
    }
}
