using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities.DTO
{
    public class LoginDto
    {   
        [Required]
        [MinLength(3)]
        public string username { get; set; }
        [Required]
        [MinLength(6)]
        public string password { get; set; }
    }

    public class RegisterDto
    {
        [Required]
        [MinLength(3)]
        public string username { get; set; }

        [Required]
        [MinLength(6)]
        public string password { get; set; }
    }
}