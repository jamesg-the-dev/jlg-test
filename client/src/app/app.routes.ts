import { Routes } from '@angular/router';
import { ROUTE_NAMES } from './constants/global.constant';

export const routes: Routes = [
  {
    path: 'all',
    title: 'All Tasks',
    loadComponent: () =>
      import('./pages/task-list-page/task-list-page.component').then(
        (m) => m.TaskListPageComponent,
      ),
    data: { view: ROUTE_NAMES.All },
  },
  {
    path: 'completed',
    title: 'Completed Tasks',
    loadComponent: () =>
      import('./pages/task-list-page/task-list-page.component').then(
        (m) => m.TaskListPageComponent,
      ),
    data: { view: ROUTE_NAMES.Completed },
  },
  { path: '**', redirectTo: 'all' },
];
