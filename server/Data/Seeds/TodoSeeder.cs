using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data.Seeds;

public static class TodoSeeder
{
    private const string SeedFileRelativePath = "Data/Seeds/TodoSeeds.json";

    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNameCaseInsensitive = true,
        Converters = { new JsonStringEnumConverter() },
    };

    public static async Task SeedAsync(TodoDbContext context)
    {
        if (await context.TodoItems.AnyAsync())
        {
            return;
        }

        var seedFilePath = Path.Combine(AppContext.BaseDirectory, SeedFileRelativePath);

        if (!File.Exists(seedFilePath))
        {
            return;
        }

        var json = await File.ReadAllTextAsync(seedFilePath);
        var seedItems = JsonSerializer.Deserialize<List<TodoSeedItem>>(json, JsonOptions);

        if (seedItems is null || seedItems.Count == 0)
        {
            return;
        }

        var createdAtUtc = DateTime.UtcNow;
        var todoItems = seedItems.Select(seed => new TodoItem
        {
            Title = seed.Title,
            IsCompleted = seed.IsCompleted,
            DueDate = seed.DueDate,
            Priority = seed.Priority,
            Category = seed.Category,
            CreatedAtUtc = createdAtUtc,
        });

        context.TodoItems.AddRange(todoItems);
        await context.SaveChangesAsync();
    }

    private sealed record TodoSeedItem(
        string Title,
        bool IsCompleted,
        DateOnly? DueDate,
        TodoPriority? Priority,
        string? Category
    );
}
