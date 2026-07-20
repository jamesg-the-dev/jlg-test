using Microsoft.AspNetCore.Mvc;
using server.Dtos;
using server.Services;

namespace server.Controllers;

[ApiController]
[Route("api/todos")]
public class TodoController(ITodoService todoService) : ControllerBase
{
    private readonly ITodoService _todoService = todoService;

    /// <summary>
    /// Gets all TODO items.
    /// </summary>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<TodoResponse>>> GetAll(
        CancellationToken cancellationToken
    )
    {
        var todos = await _todoService.GetAllAsync(cancellationToken);
        return Ok(todos);
    }

    /// <summary>Creates a new TODO item.</summary>
    /// <returns></returns>
    [HttpPost]
    public async Task<ActionResult<TodoResponse>> Create(
        CreateTodoRequest request,
        CancellationToken cancellationToken
    )
    {
        var created = await _todoService.CreateAsync(request, cancellationToken);
        return Created($"/api/todos/{created.Id}", created);
    }

    /// <summary>
    /// Marks a TODO item as completed.
    /// </summary>
    /// <param name="id"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [HttpPatch("{id:int}/complete")]
    public async Task<ActionResult<TodoResponse>> Complete(
        int id,
        CancellationToken cancellationToken
    )
    {
        var updated = await _todoService.SetCompletedAsync(id, true, cancellationToken);
        return updated is null ? NotFound() : Ok(updated);
    }

    /// <summary>
    /// Marks a TODO item as incomplete.
    /// </summary>
    /// <param name="id"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [HttpPatch("{id:int}/incomplete")]
    public async Task<ActionResult<TodoResponse>> Incomplete(
        int id,
        CancellationToken cancellationToken
    )
    {
        var updated = await _todoService.SetCompletedAsync(id, false, cancellationToken);
        return updated is null ? NotFound() : Ok(updated);
    }

    /// <summary>
    /// Deletes a TODO item.
    /// </summary>
    /// <param name="id"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
    {
        var deleted = await _todoService.DeleteAsync(id, cancellationToken);
        return deleted ? NoContent() : NotFound();
    }
}
