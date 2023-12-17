namespace Borrowings.Models;

public record BorrowingHistoryItemDto(
    int Id,
    DateTime Start,
    DateTime End,
    int BookId,
    int UserId
    );
