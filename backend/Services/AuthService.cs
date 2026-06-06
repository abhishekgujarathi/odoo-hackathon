using backend.Data;
using backend.Helpers;
using backend.Models.dto;
using backend.Models.Entities;
using backend.Services.Authorization;

namespace backend.Services
{
    public class AuthService
    {
        private readonly ILogger<AuthService> _logger;
        private readonly ApplicationDbContext _context;
        private readonly JwtUtils _jwtUtils;

        public AuthService(ILogger<AuthService> logger, ApplicationDbContext context, JwtUtils jwtUtils)
        {
            _logger = logger;
            _context = context;
            _jwtUtils = jwtUtils;
        }

        public async Task<LoginResponseDto> Login(LoginRequestDto dto)
        {
            var user = _context.Users.SingleOrDefault(x => x.Email == dto.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            {
                throw new AppException("Invalid email or password");
            }

            if (!user.IsActive)
            {
                throw new AppException("Account is deactivated. Please contact administrator.");
            }

            user.LastLoginAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            var jwtToken = _jwtUtils.GenerateJwtToken(user);

            _logger.LogInformation("User logged in: {Email}", user.Email);
            return new LoginResponseDto(user.Id.ToString(), user.FirstName, user.LastName, user.Email, user.Role.ToString(), jwtToken);
        }
    }
}
