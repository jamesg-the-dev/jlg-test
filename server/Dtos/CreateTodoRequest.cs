using System.ComponentModel.DataAnnotations;
using server.Models;

namespace server.Dtos;

public class CreateTodoRequest
{
    /// <summary>
    /// The title of the TODO item. Must be non-empty and at most 100 characters long.
    /// </summary>
    /// <example>Buy groceries</example>
    [Required]
    [MaxLength(TodoItem.TitleMaxLength)]
    public string Title { get; set; } = string.Empty;

    /// <summary>
    /// The due date of the TODO item. Optional.
    /// </summary>
    /// <example>2024-12-31</example>
    public DateOnly? DueDate { get; set; }

    /// <summary>
    /// The priority of the TODO item. Optional.
    /// </summary>
    /// <example>High</example>
    public TodoPriority? Priority { get; set; } = null!;

    /// <summary>
    /// The category of the TODO item. Optional.
    /// </summary>
    /// <example>Shopping</example>
    [MaxLength(TodoItem.CategoryMaxLength)]
    public string? Category { get; set; }
}
