using backend.Middlewares;
using backend.Models.dto;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    // [Authorize] -> You can enforce authorization if you want
    public class RFQController : ControllerBase
    {
        private readonly RFQService _rfqService;

        public RFQController(RFQService rfqService)
        {
            _rfqService = rfqService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var rfqs = await _rfqService.GetAllRFQs();
                return Ok(rfqs);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            try
            {
                var rfq = await _rfqService.GetRFQById(id);
                return Ok(rfq);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateRFQDto dto)
        {
            try
            {
                // In a real application, you get this from HttpContext.User
                // For this hackathon version without auth context passed, we'll hardcode a fallback Procurement Officer
                // or you could pass it in the DTO if you prefer.
                
                // We'll use a hardcoded admin ID for now (or a seed user if present)
                // Let's assume the first admin user in the system.
                var procurementOfficerId = Guid.Parse("11111111-1111-1111-1111-111111111111");

                var rfq = await _rfqService.CreateRFQ(dto, procurementOfficerId);
                return CreatedAtAction(nameof(GetById), new { id = rfq.Id }, rfq);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }
    }
}
