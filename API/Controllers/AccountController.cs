using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Entities.DTO;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : BaseApiController
    {
        ITokenService _tokenService;
        DataContext _context;
        public AccountController(DataContext dataContext, ITokenService tokenService)
        {
            this._tokenService = tokenService;
            this._context = dataContext;
        }


        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(string UserName, string password)
        {
            using var hmac = new HMACSHA512();

            if (_context.AppUsers.Any(s => s.UserName.ToLower() == UserName.ToLower()))
            {
                return BadRequest("User already exists!");
            }
            var user = new AppUser
            {
                UserName = UserName,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password)),
                PasswordSalt = hmac.Key
            };



            await _context.AppUsers.AddAsync(user);
            _context.SaveChanges();

            return new UserDto
            {
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }


        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {

            var user = _context.AppUsers.FirstOrDefault(s => s.UserName.ToLower() == loginDto.username.ToLower());
            if (user == null)
            {
                return Unauthorized("Invalid username!");
            }

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.password));
            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password!");
            }

            return new UserDto
            {
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user)
            };



        }
    }
}