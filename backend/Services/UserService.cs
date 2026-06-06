using backend.Models.dto;
using backend.Models.Entities;
using backend.Repositories;

namespace backend.Services
{
    public class UserService
    {
        private readonly ILogger<UserService> _logger;
        private readonly IRepository<User> _userRepo;

        public UserService(ILogger<UserService> logger, IRepository<User> userRepository)
        {
            _logger = logger;
            _userRepo = userRepository;
        }

        public async Task<IReadOnlyList<UserResponseDto>> GetAllUsers()
        {
            var users = await _userRepo.GetAllAsync();
            return users.Select(MapToResponseDto).ToList();
        }

        public async Task<UserResponseDto> GetUserById(Guid id)
        {
            var user = await _userRepo.GetByIdAsync(id);
            if (user == null) throw new Exception("User not found");

            return MapToResponseDto(user);
        }

        public async Task<UserResponseDto> CreateUser(CreateUserDto dto)
        {
            // Check if email already exists
            var existingEmail = await _userRepo.FindAsync(u => u.Email == dto.Email);
            if (existingEmail != null) throw new Exception("Email already exists");

            var user = new User
            {
                Id = Guid.NewGuid(),
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                PhoneNumber = dto.PhoneNumber,
                Role = dto.Role,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };

            await _userRepo.AddAsync(user);
            _logger.LogInformation("User created with Id: {UserId}", user.Id);

            return MapToResponseDto(user);
        }

        public async Task<UserResponseDto> UpdateUser(Guid id, UpdateUserDto dto)
        {
            var user = await _userRepo.GetByIdAsync(id);
            if (user == null) throw new Exception("User not found");

            if (!string.IsNullOrEmpty(dto.FirstName))
                user.FirstName = dto.FirstName;

            if (!string.IsNullOrEmpty(dto.LastName))
                user.LastName = dto.LastName;

            if (!string.IsNullOrEmpty(dto.Email))
            {
                var existingEmail = await _userRepo.FindAsync(u => u.Email == dto.Email);
                if (existingEmail != null && existingEmail.Id != id)
                    throw new Exception("Email already exists");
                user.Email = dto.Email;
            }

            if (!string.IsNullOrEmpty(dto.Password))
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            if (!string.IsNullOrEmpty(dto.PhoneNumber))
                user.PhoneNumber = dto.PhoneNumber;

            if (dto.Role.HasValue)
                user.Role = dto.Role.Value;

            if (dto.IsActive.HasValue)
                user.IsActive = dto.IsActive.Value;

            user.UpdatedAt = DateTime.UtcNow;

            await _userRepo.UpdateAsync(user);
            _logger.LogInformation("User updated with Id: {UserId}", user.Id);

            return MapToResponseDto(user);
        }

        public async Task DeleteUser(Guid id)
        {
            var user = await _userRepo.GetByIdAsync(id);
            if (user == null) throw new Exception("User not found");

            await _userRepo.DeleteAsync(user);
            _logger.LogInformation("User deleted with Id: {UserId}", user.Id);
        }

        private UserResponseDto MapToResponseDto(User user)
        {
            return new UserResponseDto
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Role = user.Role,
                IsActive = user.IsActive,
                LastLoginAt = user.LastLoginAt,
                CreatedAt = user.CreatedAt,
                UpdatedAt = user.UpdatedAt
            };
        }
    }
}
