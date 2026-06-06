using backend.Models.dto;
using backend.Models.Enums;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class QuotationController : ControllerBase
    {
        private readonly QuotationService _quotationService;

        public QuotationController(QuotationService quotationService)
        {
            _quotationService = quotationService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var quotations = await _quotationService.GetAllQuotations();
                return Ok(quotations);
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
                var quotation = await _quotationService.GetQuotationById(id);
                return Ok(quotation);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }

        [HttpGet("rfq/{rfqId}")]
        public async Task<IActionResult> GetByRFQ(Guid rfqId)
        {
            try
            {
                var quotations = await _quotationService.GetQuotationsByRFQId(rfqId);
                return Ok(quotations);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateQuotationDto dto)
        {
            try
            {
                var quotation = await _quotationService.CreateQuotation(dto);
                return CreatedAtAction(nameof(GetById), new { id = quotation.Id }, quotation);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateQuotationDto dto)
        {
            try
            {
                var quotation = await _quotationService.UpdateQuotation(id, dto);
                return Ok(quotation);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }

        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateStatus(Guid id, [FromBody] UpdateQuotationDto dto)
        {
            try
            {
                var quotation = await _quotationService.UpdateQuotation(id, dto);
                return Ok(quotation);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                await _quotationService.DeleteQuotation(id);
                return Ok(new { message = "Quotation deleted successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }
    }
}
