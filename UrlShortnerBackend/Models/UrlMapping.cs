namespace UrlShortnerBackend.Models
{
    public class UrlMapping
    {
        public int Id { get; set; }
        public string Url { get; set; } = string.Empty;
        public string RedirectKey { get; set; } = string.Empty;
        public DateTime DateCreated { get; set; }
        public DateTime DateExpiry { get; set; }
    }
}