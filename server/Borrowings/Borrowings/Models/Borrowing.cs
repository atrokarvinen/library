namespace Borrowings.Models;

public class Borrowing
{
    public int Id { get; set; }
    public DateTime Start { get; set; }
    public DateTime End { get; set; }
    public int BookId { get; set; }
    public int BookItemId { get; set; }
    public int UserId { get; set; }
}
