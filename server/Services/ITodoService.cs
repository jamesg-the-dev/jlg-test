using server.Dtos;

namespace server.Services;

public interface ITodoService
{
    Task<IReadOnlyList<TodoResponse>> GetAllAsync(CancellationToken cancellationToken = default);

    Task<TodoResponse> CreateAsync(
        CreateTodoRequest request,
        CancellationToken cancellationToken = default
    );

    Task<TodoResponse?> SetCompletedAsync(
        int id,
        bool isCompleted,
        CancellationToken cancellationToken = default
    );

    Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default);
}
