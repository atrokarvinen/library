using Borrowings.Models;
using Borrowings.Services;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace Borrowings.Controllers;

[ApiController]
[Route("[controller]")]
public class BorrowingController : ControllerBase
{
    private readonly ILogger<BorrowingController> _logger;
    private readonly BorrowingService _borrowingService;

    public BorrowingController(
        ILogger<BorrowingController> logger,
        BorrowingService borrowingService
        )
    {
        _logger = logger;
        _borrowingService = borrowingService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<BorrowingDto>>> GetBorrowings()
    {
        var borrowings = await _borrowingService.GetBorrowings();
        var dtos = borrowings.Select(ApiMapper.BorrowingToDto);
        return Ok(borrowings);
    }

    [HttpGet]
    [Route("user")]
    public async Task<ActionResult<IEnumerable<BorrowingDto>>> GetBorrowingsByUser()
    {
        var userId = GetUserId();
        var borrowings = await _borrowingService.GetBorrowingsByUser(userId);
        var dtos = borrowings.Select(ApiMapper.BorrowingToDto);
        return Ok(borrowings);
    }

    [HttpGet]
    [Route("book/{bookId}")]
    public async Task<ActionResult<IEnumerable<BorrowingDto>>> GetBorrowingsByBook(int bookId)
    {
        var borrowings = await _borrowingService.GetBorrowingsByBook(bookId);
        var dtos = borrowings.Select(ApiMapper.BorrowingToDto);
        return Ok(borrowings);
    }

    [HttpGet]
    [Route("history")]
    public async Task<ActionResult<IEnumerable<BorrowingHistoryItemDto>>> GetHistory()
    {
        var userId = GetUserId();
        var history = await _borrowingService.GetHistory(userId);
        var dtos = history.Select(ApiMapper.HistoryItemToDto);
        return Ok(history);
    }

    [HttpPost]
    public async Task<ActionResult<IEnumerable<BorrowingDto>>> CreateBorrowing([FromBody] CreateBorrowingDto dto)
    {
        var userId = GetUserId();
        var toCreate = ApiMapper.CreateDtoToBorrowing(dto, userId);
        Console.WriteLine("Creating borrowing: " + JsonSerializer.Serialize(toCreate));
        var createdBorrowing = await _borrowingService.CreateBorrowing(toCreate);
        return Ok(createdBorrowing);
    }

    [HttpPut]
    [Route("{id}")]
    public async Task<ActionResult<IEnumerable<BorrowingDto>>> ExtendBorrowing(int id)
    {
        var userId = GetUserId();
        var borrowings = await _borrowingService.GetBorrowingsByUser(userId);
        var borrowing = borrowings.FirstOrDefault(borrowing => borrowing.Id == id);
        if (borrowing is null)
        {
            return NotFound("Borrowing not found");
        }
        var newEnd = borrowing.End.AddDays(14);
        borrowing.End = newEnd;
        var updatedBorrowing = await _borrowingService.UpdateBorrowing(borrowing);
        var dto = ApiMapper.BorrowingToDto(updatedBorrowing);
        return Ok(dto);
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<ActionResult<IEnumerable<BorrowingDto>>> DeleteBorrowing(int id)
    {
        var deletedBorrowing = await _borrowingService.DeleteBorrowing(id);
        Console.WriteLine("Deleted item " + JsonSerializer.Serialize(deletedBorrowing));
        var historyItem = ApiMapper.BorrowingToHistory(deletedBorrowing);
        var createdHistoryItem = await _borrowingService.CreateHistoryItem(historyItem);
        Console.WriteLine("Created history item " + JsonSerializer.Serialize(createdHistoryItem));
        return Ok(deletedBorrowing);
    }

    private int GetUserId()
    {
        Request.Cookies.TryGetValue("userId", out var strUserId);
        Console.WriteLine("User id: " + strUserId);
        if (!int.TryParse(strUserId, out var userId))
        {
            throw new Exception("User id not parsed");
        }
        return userId;
    }
}
