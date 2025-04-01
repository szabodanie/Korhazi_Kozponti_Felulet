using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly KorhazContexts _context;
        private readonly IConfiguration _configuration;

        public AuthController(KorhazContexts context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // REGISZTRÁCIÓ: POST /api/auth/register
        [HttpPost("register")]
        public async Task<IActionResult> Register(User user)
        {
            if (await _context.Users.AnyAsync(u => u.Username == user.Username))
            {
                return BadRequest(new { message = "A felhasználónév már foglalt." });
            }

            // Ellenőrizd a Role mezőt, és állítsd be alapértelmezett értékként "user"-t
            if (string.IsNullOrEmpty(user.Role))
            {
                user.Role = "user";
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Sikeres regisztráció!" });
        }


        // BEJELENTKEZÉS: POST /api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest loginRequest)
        {
            // Felhasználó keresése az adatbázisban
            var user = await _context.Users.FirstOrDefaultAsync(u =>
                u.Username == loginRequest.Username && u.Password == loginRequest.Password);

            if (user == null)
            {
                return Unauthorized(new { message = "Érvénytelen felhasználónév vagy jelszó." });
            }

            // Ellenőrzés: Username és Role mezők megléte
            if (string.IsNullOrEmpty(user.Username) || string.IsNullOrEmpty(user.Role))
            {
                return BadRequest(new { message = "Hibás felhasználói adatok: username vagy role hiányzik." });
            }

            // JWT Token generálása
            var token = GenerateJwtToken(user);

            // Szerepkör visszaadása
            return Ok(new
            {
                token,
                username = user.Username,
                role = user.Role,
                message = "Sikeres bejelentkezés!"
            });
        }

        // JWT Token generálás
        private string GenerateJwtToken(User user)
        {
            // Ellenőrzés: Username és Role mezők megléte token generálás előtt
            if (string.IsNullOrEmpty(user.Username) || string.IsNullOrEmpty(user.Role))
            {
                throw new ArgumentException("Hibás felhasználói adatok: username vagy role hiányzik.");
            }

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Username),
                new Claim("role", user.Role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

    // LoginRequest osztály
    public class LoginRequest
    {
        public string? Username { get; set; }
        public string? Password { get; set; }
    }
}
