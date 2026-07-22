using server.Dtos;

namespace server.Services;

public interface ITodoService
{
    Task<PagedResult<TodoResponse>> GetAllAsync(
        int page,
        int pageSize,
        CancellationToken cancellationToken = default
    );

    Task<PagedResult<TodoResponse>> GetCompletedAsync(
        int page,
        int pageSize,
        CancellationToken cancellationToken = default
    );

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

    Task<TodoCountsResponse> GetCountsAsync(CancellationToken cancellationToken = default);
}
