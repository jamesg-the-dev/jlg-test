using System.ComponentModel.DataAnnotations;
using server.Models;

namespace server.Dtos;

public class CreateTodoRequest
{
    [Required]
    [MaxLength(TodoItem.TitleMaxLength)]
    public string Title { get; set; } = string.Empty;

    public DateOnly? DueDate { get; set; }

    public TodoPriority? Priority { get; set; } = null!;

    [MaxLength(TodoItem.CategoryMaxLength)]
    public string? Category { get; set; }
}
