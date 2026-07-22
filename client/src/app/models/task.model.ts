import type { TodoPriority } from './http-models/todo.model';

export type Priority = Lowercase<TodoPriority>;

export type Category = 'Personal' | 'Work' | 'Health' | 'Finance' | 'Learning';

export type NavView = 'all' | 'completed';

export interface Task {
  id: number;
  title: string;
  dueDate: string;
  priority: Priority | null;
  category: Category;
  done: boolean;
}

export interface TaskFormData {
  title: string;
  dueDate: string;
  priority: Priority | null;
  category: Category;
}

export interface TaskSection {
  label: string;
  items: Task[];
}
