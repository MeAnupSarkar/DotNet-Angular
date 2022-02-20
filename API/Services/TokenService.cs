using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Diagnostics;

namespace API.Services
{
    public class TokenService : ITokenService
    {
        // Symmetric -Same key used for encrypt and decrypt
        // Asymmetric - Opposite
        private readonly SymmetricSecurityKey _key;
        public TokenService(IConfiguration config)
        {
            var key = String.IsNullOrEmpty(config["TokenKey"]) ? "SECRETKEYSECRETKEYSECRETKEYSECRETKEYSECRETKEY " : config["TokenKey"];
            Debug.WriteLine(key);
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
        }
        public string CreateToken(AppUser user)
        {
            var claims = new List<Claim>{
                new Claim(JwtRegisteredClaimNames.NameId,user.UserName)
            };

            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);


        }
    }
}