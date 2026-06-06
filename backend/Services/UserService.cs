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
            // Check if username already exists
            var existingUser = await _userRepo.FindAsync(u => u.Username == dto.Username);
            if (existingUser != null) throw new Exception("Username already exists");

            // Check if email already exists
            var existingEmail = await _userRepo.FindAsync(u => u.Email == dto.Email);
            if (existingEmail != null) throw new Exception("Email already exists");

            var user = new User
            {
                Id = Guid.NewGuid(),
                Username = dto.Username,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Email = dto.Email,
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

            if (!string.IsNullOrEmpty(dto.Username))
            {
                var existingUser = await _userRepo.FindAsync(u => u.Username == dto.Username);
                if (existingUser != null && existingUser.Id != id)
                    throw new Exception("Username already exists");
                user.Username = dto.Username;
            }

            if (!string.IsNullOrEmpty(dto.Email))
            {
                var existingEmail = await _userRepo.FindAsync(u => u.Email == dto.Email);
                if (existingEmail != null && existingEmail.Id != id)
                    throw new Exception("Email already exists");
                user.Email = dto.Email;
            }

            if (!string.IsNullOrEmpty(dto.Password))
            {
                user.Password = BCrypt.Net.BCrypt.HashPassword(dto.Password);
            }

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
                Username = user.Username,
                Email = user.Email,
                CreatedAt = user.CreatedAt,
                UpdatedAt = user.UpdatedAt
            };
        }
    }
}
