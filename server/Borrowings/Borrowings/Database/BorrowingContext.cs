using Borrowings.Models;
using Microsoft.EntityFrameworkCore;

namespace Borrowings.Database;

public class BorrowingContext : DbContext
{
    private readonly IConfiguration _configuration;
    public DbSet<Borrowing> Borrowings { get; set; }
    public DbSet<BorrowingHistoryItem> BorrowingHistory { get; set; }

    public BorrowingContext(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        var cs = _configuration.GetConnectionString("postgresql");
        options.UseNpgsql(cs);
    }
}
