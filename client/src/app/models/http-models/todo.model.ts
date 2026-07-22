export type TodoPriority = 'Low' | 'Medium' | 'High';

export type TodoResponse = {
  id: number;
  title: string;
  isCompleted: boolean;
  dueDate: string | null;
  priority: TodoPriority | null;
  category: string | null;
  createdAtUtc: string;
};

export type CreateTodoRequest = {
  title: string;
  dueDate?: string | null;
  priority?: TodoPriority | null;
  category?: string | null;
};

export interface TodoCountsResponse {
  totalCount: number;
  completedCount: number;
}
