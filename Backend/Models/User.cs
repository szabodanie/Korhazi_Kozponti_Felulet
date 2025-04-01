namespace Backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string Role { get; set; } // "user" vagy "admin"
        public string? Email { get; set; }
        public string? Specialty { get; set; } // Csak admin esetén
    }
}
