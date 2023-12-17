using Borrowings.Models;

namespace Borrowings.Services;

public static class ApiMapper
{
    public static BorrowingDto BorrowingToDto(Borrowing borrowing)
    {
        return new BorrowingDto(
            Id: borrowing.Id,
            Start: borrowing.Start,
            End: borrowing.End,
            BookId: borrowing.BookId,
            BookItemId: borrowing.BookItemId,
            UserId: borrowing.UserId
        );
    }

    public static BorrowingHistoryItemDto HistoryItemToDto(BorrowingHistoryItem item)
    {
        return new BorrowingHistoryItemDto(
            Id: item.Id,
            Start: item.Start,
            End: item.End,
            BookId: item.BookId,
            UserId: item.UserId
        );
    }

    public static Borrowing CreateDtoToBorrowing(CreateBorrowingDto dto, int userId)
    {
        return new Borrowing()
        {
            BookItemId = dto.BookItemId,
            BookId = dto.BookId,
            Start = dto.Start,
            End = dto.End,
            UserId = userId,
        };
    }

    public static BorrowingHistoryItem BorrowingToHistory(Borrowing deletedBorrowing)
    {
        return new BorrowingHistoryItem()
        {
            BookId = deletedBorrowing.BookId,
            End = deletedBorrowing.End,
            Start = deletedBorrowing.Start,
            UserId = deletedBorrowing.UserId,
        };
    }
}
