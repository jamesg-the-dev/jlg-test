import { inject, Injectable, signal } from '@angular/core';
import { NavView } from '../models/task.model';
import { TaskService } from './task.service';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskCountService {
  private taskService = inject(TaskService);

  readonly taskCounts = signal<Record<NavView, number>>({
    all: 0,
    completed: 0,
  });

  loadCounts() {
    return this.taskService.getCounts().pipe(
      tap((counts) => {
        this.taskCounts.set({
          all: counts.totalCount,
          completed: counts.completedCount,
        });
      }),
    );
  }
}
