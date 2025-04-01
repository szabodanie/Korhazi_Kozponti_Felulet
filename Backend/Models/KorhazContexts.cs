using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Models
{
    public class KorhazContexts : DbContext
    {
        public KorhazContexts()
        {
        }

        public KorhazContexts(DbContextOptions<KorhazContexts> options) : base(options)
        {
        }

        // Jelenlegi entitások
        public DbSet<Orvos> Orvosok { get; set; }
        public virtual DbSet<KorhaziSzemelyek> KorhaziSzemelyek { get; set; }
        public DbSet<User> Users { get; set; } // User entitás megmarad
        public DbSet<Appointment> Appointments { get; set; } // Hozzáadjuk az Appointment entitást

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Táblák konfigurálása
            modelBuilder.Entity<User>().ToTable("users"); // User tábla
            modelBuilder.Entity<Appointment>().ToTable("appointments"); // Appointments tábla
            modelBuilder.Entity<Orvos>().ToTable("orvosok");
            modelBuilder.Entity<KorhaziSzemelyek>().ToTable("korhazi_szemelyek");
        }
    }
}
