import { Task } from '../models/task.model';
import { CreateTodoRequest, TodoResponse } from '../models/http-models/todo.model';
import { upperFirst } from './string.util';
import {
  CATEGORY_COLORS,
  DEFAULT_CATEGORY_COLOR,
  PRIORITY_CONFIG,
  PriorityConfigObj,
} from '../constants/global.constant';

export const formatDate = (dateString: string): string => {
  if (!dateString) {
    return '';
  }

  return new Date(`${dateString}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

export const priorityToServer = (p: Task['priority']): CreateTodoRequest['priority'] => {
  if (!p) return null;
  return upperFirst(p) as CreateTodoRequest['priority'];
};

export const priorityFromServer = (p: TodoResponse['priority']): Task['priority'] => {
  if (!p) return null;
  return p.toLowerCase() as Task['priority'];
};

export const mapTodoResponseToTask = (todo: TodoResponse): Task => ({
  id: todo.id,
  title: todo.title,
  category: (todo.category ?? '') as Task['category'],
  dueDate: todo.dueDate ?? '',
  priority: priorityFromServer(todo.priority),
  done: todo.isCompleted,
});

export const getPriorityConfigObj = (priority: Task['priority']): PriorityConfigObj | undefined => {
  return priority ? PRIORITY_CONFIG[priority] : undefined;
};

export const getCategoryColor = (category: Task['category']): string => {
  return CATEGORY_COLORS[category] ?? DEFAULT_CATEGORY_COLOR;
};
