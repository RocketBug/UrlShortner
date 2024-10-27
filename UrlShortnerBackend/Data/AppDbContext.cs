using Microsoft.EntityFrameworkCore;
using UrlShortnerBackend.Models;

namespace UrlShortnerBackend.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<UrlMapping> UrlMapping { get; set; }
    }
}