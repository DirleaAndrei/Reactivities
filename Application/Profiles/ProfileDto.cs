using System.ComponentModel.DataAnnotations;

namespace Application.Profiles
{
    public class ProfileDto
    {
        [Required]
        public string DisplayName { get; set; }
        public string Bio { get; set; }
    }
}