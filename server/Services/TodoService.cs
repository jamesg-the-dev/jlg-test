using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dtos;
using server.Exceptions;
using server.Models;

namespace server.Services;

public class TodoService(TodoDbContext dbContext) : ITodoService
{
    private readonly TodoDbContext _dbContext = dbContext;

    public async Task<IReadOnlyList<TodoResponse>> GetAllAsync(
        CancellationToken cancellationToken = default
    )
    {
        return await _dbContext
            .TodoItems.OrderBy(t => t.Id)
            .Select(t => new TodoResponse(
                t.Id,
                t.Title,
                t.IsCompleted,
                t.DueDate,
                t.Priority,
                t.Category,
                t.CreatedAtUtc
            ))
            .ToListAsync(cancellationToken);
    }

    public async Task<TodoResponse> CreateAsync(
        CreateTodoRequest request,
        CancellationToken cancellationToken = default
    )
    {
        var title = ValidateAndNormalizeTitle(request.Title);

        var entity = new TodoItem
        {
            Title = title,
            DueDate = request.DueDate,
            Priority = request.Priority,
            Category = request.Category,
            CreatedAtUtc = DateTime.UtcNow,
        };

        _dbContext.TodoItems.Add(entity);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return ToResponse(entity);
    }

    public async Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var entity = await _dbContext.TodoItems.FindAsync([id], cancellationToken);
        if (entity is null)
        {
            return false;
        }

        _dbContext.TodoItems.Remove(entity);
        await _dbContext.SaveChangesAsync(cancellationToken);
        return true;
    }

    private static string ValidateAndNormalizeTitle(string? title)
    {
        if (string.IsNullOrWhiteSpace(title))
        {
            throw new TodoValidationException("Title is required.");
        }

        var trimmed = title.Trim();
        if (trimmed.Length > TodoItem.TitleMaxLength)
        {
            throw new TodoValidationException(
                $"Title must not exceed {TodoItem.TitleMaxLength} characters."
            );
        }

        return trimmed;
    }

    private static TodoResponse ToResponse(TodoItem entity) =>
        new(
            entity.Id,
            entity.Title,
            entity.IsCompleted,
            entity.DueDate,
            entity.Priority,
            entity.Category,
            entity.CreatedAtUtc
        );
}
