import type { Priority, Category, NavView } from '../models/task.model';

export const APP_NAME = 'Todo App';

export type PriorityConfigObj = { label: string; color: string; background: string };
export type PriorityConfig = Record<Priority, PriorityConfigObj>;

export const PRIORITY_CONFIG: PriorityConfig = {
  low: { label: 'Low', color: '#7A9E7E', background: '#EAF2EA' },
  medium: { label: 'Medium', color: '#B07D3A', background: '#F5ECD8' },
  high: { label: 'High', color: '#C0514A', background: '#F5E5E4' },
};

export const CATEGORY_COLORS: Record<Category, string> = {
  Personal: '#8BA5C4',
  Work: '#7A9E7E',
  Health: '#C09060',
  Finance: '#A07A9E',
  Learning: '#C5A87A',
};

export const DEFAULT_CATEGORY_COLOR = '#8BA5C4';

export const CATEGORIES: Category[] = ['Personal', 'Work', 'Health', 'Finance', 'Learning'];

export const VIEW_LABELS: Record<NavView, string> = {
  all: 'All Tasks',
  completed: 'Completed',
};

export const USER = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
};

export const ROUTE_NAMES: Record<'All' | 'Completed', NavView> = {
  All: 'all',
  Completed: 'completed',
};
