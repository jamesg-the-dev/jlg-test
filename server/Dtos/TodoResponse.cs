using server.Models;

namespace server.Dtos;

public record TodoResponse(
    int Id,
    string Title,
    bool IsCompleted,
    DateOnly? DueDate,
    TodoPriority Priority,
    string? Category,
    DateTime CreatedAtUtc
);
