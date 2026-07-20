using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using server.Models;

namespace server.Data;

public class TodoItemConfiguration : IEntityTypeConfiguration<TodoItem>
{
    public void Configure(EntityTypeBuilder<TodoItem> builder)
    {
        builder.HasKey(t => t.Id);

        builder.Property(t => t.Title).IsRequired().HasMaxLength(TodoItem.TitleMaxLength);

        builder.Property(t => t.IsCompleted).HasDefaultValue(false);

        builder.Property(t => t.Category).HasMaxLength(TodoItem.CategoryMaxLength);

        builder.Property(t => t.CreatedAtUtc).IsRequired();
    }
}
