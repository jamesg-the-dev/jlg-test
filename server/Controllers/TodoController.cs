using Microsoft.AspNetCore.Mvc;
using server.Dtos;
using server.Services;

namespace server.Controllers;

[ApiController]
[Route("api/todos")]
public class TodoController(ITodoService todoService) : ControllerBase
{
    private readonly ITodoService _todoService = todoService;

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<TodoResponse>>> GetAll(
        CancellationToken cancellationToken
    )
    {
        var todos = await _todoService.GetAllAsync(cancellationToken);
        return Ok(todos);
    }

    [HttpPost]
    public async Task<ActionResult<TodoResponse>> Create(
        CreateTodoRequest request,
        CancellationToken cancellationToken
    )
    {
        var created = await _todoService.CreateAsync(request, cancellationToken);
        return Created($"/api/todos/{created.Id}", created);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
    {
        var deleted = await _todoService.DeleteAsync(id, cancellationToken);
        return deleted ? NoContent() : NotFound();
    }
}
