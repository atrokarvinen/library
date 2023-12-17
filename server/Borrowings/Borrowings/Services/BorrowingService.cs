using Borrowings.Database;
using Borrowings.Models;
using Microsoft.EntityFrameworkCore;

namespace Borrowings.Services;

public class BorrowingService
{
    BorrowingContext _context;

    public BorrowingService(BorrowingContext context)
    {
        _context = context;
    }

    public Task<List<Borrowing>> GetBorrowings()
    {
        return _context.Borrowings.OrderBy(x => x.Id).ToListAsync();
    }

    public Task<List<Borrowing>> GetBorrowingsByUser(int userId)
    {
        return _context.Borrowings
            .Where(x => x.UserId == userId)
            .OrderBy(x => x.Id)
            .ToListAsync();
    }

    public Task<List<Borrowing>> GetBorrowingsByBook(int bookId)
    {
        return _context.Borrowings.Where(x => x.BookId == bookId).ToListAsync();
    }

    public Task<List<BorrowingHistoryItem>> GetHistory(int userId)
    {
        return _context.BorrowingHistory
            .Where(x => x.UserId == userId)
            .OrderByDescending(x => x.Id) 
            .ToListAsync();
    }

    public async Task<Borrowing> CreateBorrowing(Borrowing borrowing)
    {
        var entity = await _context.Borrowings.AddAsync(borrowing);
        await _context.SaveChangesAsync();
        return entity.Entity;
    }

    public async Task<Borrowing> UpdateBorrowing(Borrowing borrowing)
    {
        var entityToUpdate = await _context.Borrowings.FirstOrDefaultAsync(x =>  x.Id == borrowing.Id);
        if (entityToUpdate == null)
        {
            throw new ArgumentNullException(nameof(entityToUpdate));
        }
        entityToUpdate.End = borrowing.End;
        await _context.SaveChangesAsync();
        return entityToUpdate;
    }

    public async Task<Borrowing> DeleteBorrowing(int id)
    {
        var entityToDelete = await _context.Borrowings.FirstOrDefaultAsync(x => x.Id == id);
        if (entityToDelete == null)
        {
            throw new ArgumentNullException(nameof(entityToDelete));
        }
        _context.Remove(entityToDelete);
        await _context.SaveChangesAsync();
        return entityToDelete;
    }

    public async Task<BorrowingHistoryItem> CreateHistoryItem(BorrowingHistoryItem item)
    {
        var created = await _context.BorrowingHistory.AddAsync(item);
        await _context.SaveChangesAsync();
        return created.Entity; 
    }
}
