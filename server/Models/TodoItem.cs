namespace server.Models;

public class TodoItem
{
    public const int TitleMaxLength = 200;
    public const int CategoryMaxLength = 50;

    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public bool IsCompleted { get; set; }
    public DateOnly? DueDate { get; set; }
    public TodoPriority Priority { get; set; } = TodoPriority.Medium;
    public string? Category { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}

public enum TodoPriority
{
    Low,
    Medium,
    High,
}
