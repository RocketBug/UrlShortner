using Microsoft.EntityFrameworkCore;
using UrlShortnerBackend.Data;
using UrlShortnerBackend.Models;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                  policy =>
                  {
                      policy.AllowAnyOrigin()
                      .AllowAnyMethod()
                      .AllowAnyHeader();
                  });
});

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(connectionString));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseStaticFiles(); // 🔴 here it is
app.UseRouting(); // 🔴 here it is

app.UseCors(MyAllowSpecificOrigins);
app.UseHttpsRedirection();

app.MapPost("api/shorten", (UserUrlDto userUrlDto, AppDbContext db) =>
{
    var keyIsUnique = false;
    string urlKey = string.Empty;
    if (!Uri.IsWellFormedUriString(userUrlDto.Url, UriKind.Absolute))
    {
        return Results.BadRequest("Oops looks like you didn't enter a valid url.");
    }
    while (!keyIsUnique)
    {
        urlKey = GenerateUrlKey();
        keyIsUnique = !db.UrlMapping.Any(x => x.RedirectKey == urlKey);
    }
    var urlMapping = new UrlMapping
    {
        DateCreated = DateTime.Now,
        DateExpiry = DateTime.Now.AddMinutes(5),
        RedirectKey = urlKey,
        Url = userUrlDto.Url,
    };
    db.UrlMapping.Add(urlMapping);
    db.SaveChanges();
    return Results.Created("api/shorten", urlMapping);
})
.WithOpenApi();


app.MapGet("api/redirect-url/{key}", (string key, AppDbContext db) =>
{
    var urlMapping = db.UrlMapping.SingleOrDefault(x => x.RedirectKey == key);
    if (urlMapping == null)
    {
        return Results.NotFound();
    }
    return Results.Ok(urlMapping);
})
.WithOpenApi();

app.MapGet("api/hello-world", () =>
{
    return Results.Ok("Hello");
})
.WithOpenApi();


app.Run();

string GenerateUrlKey()
{
    Random random = new();
    int length = 6;
    const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var urlKey = new string(Enumerable.Repeat(chars, length)
        .Select(s => s[random.Next(s.Length)]).ToArray());
    return urlKey;
}