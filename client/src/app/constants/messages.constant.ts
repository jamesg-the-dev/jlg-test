import { NavView } from '../models/task.model';

export const EMPTY_MESSAGES: Record<NavView, string> = {
  projects: 'Your workspace is clear. Add a task to get started.',
  completed: 'No completed tasks yet. Finish something and celebrate it here.',
};
