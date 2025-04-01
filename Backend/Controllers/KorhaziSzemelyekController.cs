using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using System.Collections.Generic;
using System.Linq;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KorhaziSzemelyekController : ControllerBase
    {
        private readonly KorhazContexts _context;

        public KorhaziSzemelyekController(KorhazContexts context)
        {
            _context = context;
        }

        // GET: api/KorhaziSzemelyek
        [HttpGet]
        public ActionResult<IEnumerable<KorhaziSzemelyek>> GetKorhaziSzemelyek()
        {
            var szemelyek = _context.KorhaziSzemelyek.ToList();
            return Ok(szemelyek);
        }

        // POST: api/KorhaziSzemelyek
        [HttpPost]
        public ActionResult<KorhaziSzemelyek> PostKorhaziSzemelyek(KorhaziSzemelyek szemely)
        {
            if (!IsAdmin()) // Admin jogosultság ellenőrzés
                return Forbid("Csak admin felhasználók végezhetnek ilyen műveleteket.");

            _context.KorhaziSzemelyek.Add(szemely);
            _context.SaveChanges();

            return CreatedAtAction("GetKorhaziSzemelyek", new { id = szemely.Id }, szemely);
        }

        // PUT: api/KorhaziSzemelyek/{id}
        [HttpPut("{id}")]
        public IActionResult PutKorhaziSzemelyek(int id, KorhaziSzemelyek updatedSzemely)
        {
            if (!IsAdmin()) // Admin jogosultság ellenőrzés
                return Forbid("Csak admin felhasználók végezhetnek ilyen műveleteket.");

            var existingSzemely = _context.KorhaziSzemelyek.Find(id);
            if (existingSzemely == null)
                return NotFound("A megadott személy nem található.");

            existingSzemely.Keresztnev = updatedSzemely.Vezeteknev;
            existingSzemely.felhasznalonev = updatedSzemely.felhasznalonev;
            _context.SaveChanges();

            return NoContent();
        }

        // DELETE: api/KorhaziSzemelyek/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteKorhaziSzemelyek(int id)
        {
            if (!IsAdmin()) // Admin jogosultság ellenőrzés
                return Forbid("Csak admin felhasználók végezhetnek ilyen műveleteket.");

            var szemely = _context.KorhaziSzemelyek.Find(id);
            if (szemely == null)
                return NotFound("A megadott személy nem található.");

            _context.KorhaziSzemelyek.Remove(szemely);
            _context.SaveChanges();

            return NoContent();
        }

        // Privát metódus az admin jogosultság ellenőrzésére
        private bool IsAdmin()
        {
            // Itt egyszerű ellenőrzés történik például "Role" alapján.
            // Valós környezetben token vagy hitelesítési mechanizmus alkalmazandó.
            return HttpContext.User.Claims.Any(c => c.Type == "Role" && c.Value == "Admin");
        }
    }
}
