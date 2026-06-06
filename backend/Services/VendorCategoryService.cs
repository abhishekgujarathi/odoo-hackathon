using backend.Models.dto;
using backend.Models.Entities;
using backend.Repositories;

namespace backend.Services
{
    public class VendorCategoryService
    {
        private readonly ILogger<VendorCategoryService> _logger;
        private readonly IRepository<VendorCategory> _categoryRepo;

        public VendorCategoryService(ILogger<VendorCategoryService> logger, IRepository<VendorCategory> categoryRepository)
        {
            _logger = logger;
            _categoryRepo = categoryRepository;
        }

        public async Task<IReadOnlyList<VendorCategoryResponseDto>> GetAll()
        {
            var categories = await _categoryRepo.GetAllAsync();
            return categories.Select(MapToResponseDto).ToList();
        }

        public async Task<VendorCategoryResponseDto> GetById(Guid id)
        {
            var category = await _categoryRepo.GetByIdAsync(id);
            if (category == null) throw new Exception("Vendor category not found");

            return MapToResponseDto(category);
        }

        public async Task<VendorCategoryResponseDto> Create(CreateVendorCategoryDto dto)
        {
            var existing = await _categoryRepo.FindAsync(c => c.Name == dto.Name);
            if (existing != null) throw new Exception("Category with this name already exists");

            var category = new VendorCategory
            {
                Id = Guid.NewGuid(),
                Name = dto.Name,
                Description = dto.Description,
                CreatedAt = DateTime.UtcNow
            };

            await _categoryRepo.AddAsync(category);
            _logger.LogInformation("Vendor category created: {Name}", category.Name);

            return MapToResponseDto(category);
        }

        public async Task<VendorCategoryResponseDto> Update(Guid id, UpdateVendorCategoryDto dto)
        {
            var category = await _categoryRepo.GetByIdAsync(id);
            if (category == null) throw new Exception("Vendor category not found");

            if (!string.IsNullOrEmpty(dto.Name))
            {
                var existing = await _categoryRepo.FindAsync(c => c.Name == dto.Name);
                if (existing != null && existing.Id != id)
                    throw new Exception("Category with this name already exists");
                category.Name = dto.Name;
            }

            if (dto.Description != null)
                category.Description = dto.Description;

            category.UpdatedAt = DateTime.UtcNow;

            await _categoryRepo.UpdateAsync(category);
            _logger.LogInformation("Vendor category updated: {Id}", id);

            return MapToResponseDto(category);
        }

        public async Task Delete(Guid id)
        {
            var category = await _categoryRepo.GetByIdAsync(id);
            if (category == null) throw new Exception("Vendor category not found");

            await _categoryRepo.DeleteAsync(category);
            _logger.LogInformation("Vendor category deleted: {Id}", id);
        }

        private VendorCategoryResponseDto MapToResponseDto(VendorCategory category)
        {
            return new VendorCategoryResponseDto
            {
                Id = category.Id,
                Name = category.Name,
                Description = category.Description,
                CreatedAt = category.CreatedAt,
                UpdatedAt = category.UpdatedAt
            };
        }
    }
}
