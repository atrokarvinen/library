namespace Borrowings.Models;

public record BorrowingDto(
    int Id,
    DateTime Start,
    DateTime End,
    int BookId,
    int BookItemId,
    int UserId
    );
