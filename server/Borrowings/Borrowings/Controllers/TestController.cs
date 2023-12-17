using Borrowings.Services;
using Microsoft.AspNetCore.Mvc;

namespace Borrowings.Controllers;

[ApiController]
[Route("[controller]")]
public class TestController : ControllerBase
{
    private readonly BorrowingService _borrowingService;

    public TestController(BorrowingService borrowingService)
    {
        _borrowingService = borrowingService;
    }

    [HttpDelete]
    [Route("reset")]
    public async Task<ActionResult> Reset()
    {
        await _borrowingService.Reset();
        return Ok();
    }
}
