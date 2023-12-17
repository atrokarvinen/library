namespace Borrowings.Models;

public record CreateBorrowingDto(int BookId, int BookItemId, DateTime Start, DateTime End);
