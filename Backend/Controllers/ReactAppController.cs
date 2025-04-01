using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReactAppController : ControllerBase
    {
        private readonly KorhazContexts _context;

        public ReactAppController(KorhazContexts context)
        {
            _context = context;
        }

    }
}
