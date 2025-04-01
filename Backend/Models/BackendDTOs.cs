using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace BackendDTOs
{
    public class OrvosCreateDto
    {
        public int id { get; set; }
        public string? vezeteknev { get; set; }
        public string? keresztnev { get; set; }
        public string? specialitás { get; set; }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class OrvosokController : ControllerBase
    {
        private readonly KorhazContexts _context;

        public OrvosokController(KorhazContexts context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        // PUT: api/Orvosok/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateOrvosNev(int id, [FromBody] OrvosCreateDto orvosDto)
        {
            if (orvosDto == null)
            {
                return BadRequest("Az orvos adatai nem lehetnek üresek.");
            }

            // Az orvos megkeresése az adatbázisban
            var orvos = _context.Orvosok.Find(id);

            if (orvos == null)
            {
                return NotFound("A megadott orvos nem található.");
            }

            // Az orvos nevének frissítése
            orvos.Vezeteknev = orvosDto.vezeteknev;
            orvos.Keresztnev = orvosDto.keresztnev;

            // Az adatbázis frissítése
            _context.Orvosok.Update(orvos);
            _context.SaveChanges();

            return Ok("Az orvos neve sikeresen frissítve.");
        }

        // Egyéb metódusok (pl. GET, POST, DELETE) ugyanúgy megtalálhatók itt
    }



}

