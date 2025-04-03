using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MimeKit;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Cors;
using System.Text.Json;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ContactController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("Contact")]
        [EnableCors("AllowSpecificOrigin")]
        public async Task<IActionResult> Contact([FromBody] ContactFormModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                // Log the incoming model
                Console.WriteLine($"Received model: {JsonSerializer.Serialize(model)}");
                
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress(model.Name, model.Email));
                message.To.Add(new MailboxAddress("Admin", _configuration["EmailTo"]));
                message.Subject = model.Subject;

                message.Body = new TextPart("plain")
                {
                    Text = $"Name: {model.Name}\nEmail: {model.Email}\nMessage: {model.Message}"
                };

                using (var client = new SmtpClient())
                {
                    await client.ConnectAsync(_configuration["SmtpServer"], 465, true);
                    await client.AuthenticateAsync(_configuration["SmtpUser"], _configuration["SmtpPass"]);
                    await client.SendAsync(message);
                    await client.DisconnectAsync(true);
                }

                return Ok(new { Message = "Message sent successfully!" });
            }
            catch (System.Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}"); // Log the error message
                return StatusCode(500, new { Message = "Failed to send message. Please try again later.", Error = ex.Message });
            }
        }
    }

    public class ContactFormModel
    {
        [System.ComponentModel.DataAnnotations.Required]
        public required string Name { get; set; }

        [System.ComponentModel.DataAnnotations.Required]
        [System.ComponentModel.DataAnnotations.EmailAddress]
        public required string Email { get; set; }

        [System.ComponentModel.DataAnnotations.Required]
        public required string Subject { get; set; }

        [System.ComponentModel.DataAnnotations.Required]
        public required string Message { get; set; }
    }
}
