using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class ResetPasswordDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [MinLength(4, ErrorMessage = "Minimum number of characters is 4!")]
        [MaxLength(20, ErrorMessage = "Maximum number of characters is 20!")]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,20}$", ErrorMessage = "Password must be complex!")]
        public string Password { get; set; }
        public string Token { get; set; }
    }
}