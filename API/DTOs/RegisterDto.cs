using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [MinLength(4, ErrorMessage = "Minimum number of characters is 4!")]
        [MaxLength(20, ErrorMessage = "Maximum number of characters is 20!")]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage = "Password must be complex!")]        
        public string Password { get; set; }
        [Required]
        public string DisplayName { get; set; }
        public string Username { get; set; }
    }
}