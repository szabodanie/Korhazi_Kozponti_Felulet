namespace Backend.Models
{
    public class Appointment
    {
        public int Id { get; set; }
        public string? Orvosnev { get; set; }
        public string? Betegneve { get; set; }
        public string? Statusz { get; set; }
        public string? Panasz { get; set; }
    }
}
