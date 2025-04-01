using BackendDTOs;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrvosokController : ControllerBase
    {
        private readonly KorhazContexts _context;

        public OrvosokController(KorhazContexts context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        // GET: api/Orvosok
        [HttpGet]
        public ActionResult<IEnumerable<Orvos>> GetOrvosok()
        {
            var orvosok = _context.Orvosok.ToList(); // Az összes orvos lekérdezése az adatbázisból

            if (!orvosok.Any())
            {
                return NotFound("Az orvosok listája üres."); // Ha nincs orvos, 404-et ad vissza
            }

            return Ok(orvosok); // Ha vannak orvosok, visszaadja a listát
        }

        // POST: api/Orvosok
        [HttpPost]
        public ActionResult<Orvos> AddOrvos([FromBody] OrvosCreateDto orvosDto)
        {
            if (orvosDto == null)
            {
                return BadRequest("Az orvos adatai nem lehetnek üresek.");
            }

            var orvos = new Orvos
            {
                Id = orvosDto.id,
                Vezeteknev = orvosDto.vezeteknev,
                Keresztnev = orvosDto.keresztnev,
                Specialitas = orvosDto.specialitás
            };

            _context.Orvosok.Add(orvos);
            _context.SaveChanges();

            return CreatedAtAction(nameof(AddOrvos), new { id = orvos.Id }, orvos);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteOrvos(int id)
        {
            var orvos = _context.Orvosok.Find(id);

            if (orvos == null)
            {
                return NotFound("A megadott orvos nem található.");
            }

            _context.Orvosok.Remove(orvos);
            _context.SaveChanges();

            return Ok("Az orvos sikeresen törölve.");
        }
    }
}
