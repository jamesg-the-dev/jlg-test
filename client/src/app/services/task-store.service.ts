import { Injectable, computed, inject, signal } from '@angular/core';
import { NavView, Task, TaskFormData } from '../models/task.model';
import { VIEW_LABELS } from '../constants/global.constant';
import { Dialog } from '@angular/cdk/dialog';
import { TaskService } from './task.service';
import { catchError, delay, finalize, map, Observable, of, tap, throwError } from 'rxjs';
import {
  TaskDetailDialogComponent,
  TaskDetailDialogData,
} from '../components/task-detail-dialog/task-detail-dialog.component';
import { GlobalPositionStrategy } from '@angular/cdk/overlay';
import { NotificationService } from './notification.service';
import { PagedData } from '../models/http-models/paged-result';

@Injectable()
export class TaskStore {
  private readonly dialog = inject(Dialog);
  private readonly notificationService = inject(NotificationService);

  readonly tasks = signal<Task[]>([]);
  private readonly taskService = inject(TaskService);

  readonly view = signal<NavView>('all');
  private readonly selectedTaskId = signal<number | null>(null);

  readonly viewLabel = computed(() => VIEW_LABELS[this.view()]);

  readonly paginationData = signal<PagedData<Task>>(PagedData.empty<Task>());
  readonly isLoadingMore = signal<boolean>(false);

  readonly taskCounts = signal<Record<NavView, number>>({
    all: 0,
    completed: 0,
  });

  readonly selectedTask = computed(
    () => this.tasks().find((task) => task.id === this.selectedTaskId()) ?? null,
  );

  loadTasks(view: NavView) {
    this.isLoadingMore.set(true);
    return this.fetchPage(view, 1).pipe(
      catchError((error) => {
        this.isLoadingMore.set(false);
        return throwError(() => error);
      }),
      tap((response) => {
        this.paginationData.set(new PagedData(response));
        this.tasks.set(response.items);
        this.isLoadingMore.set(false);
      }),
    );
  }

  loadMore(): Observable<void> {
    const pagination = this.paginationData();
    if (!pagination.hasNextPage || this.isLoadingMore()) {
      return of(undefined);
    }

    this.isLoadingMore.set(true);
    const nextPage = pagination.page + 1;

    return this.fetchPage(this.view(), nextPage).pipe(
      tap((response) => {
        this.paginationData.set(new PagedData(response));
        this.tasks.update((tasks) => [...tasks, ...response.items]);
      }),
      map(() => undefined),
      finalize(() => this.isLoadingMore.set(false)),
    );
  }

  private fetchPage(view: NavView, page: number) {
    const requestObs$ =
      view === 'completed' ? this.taskService.getCompleted(page) : this.taskService.getAll(page);
    return requestObs$.pipe(
      delay(1000), //add artificial delay to simulate loading state
    );
  }

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

  setView(view: NavView): void {
    this.view.set(view);
    this.selectedTaskId.set(null);
  }

  toggleTask(taskId: number): void {
    const task = this.tasks().find((t) => t.id === taskId);
    if (!task) return;

    const newDone = !task.done;
    this.taskService.setCompleted(taskId, newDone).subscribe({
      next: (updated) => {
        this.tasks.update((tasks) => tasks.map((t) => (t.id === taskId ? updated : t)));
        this.notificationService.success(
          'Task updated',
          `Task "${updated.title}" marked as ${updated.done ? 'completed' : 'incomplete'}.`,
        );
      },
      error: () => {
        this.notificationService.error(
          'Error updating task',
          `Failed to update task "${task.title}". Please try again.`,
        );
      },
    });
  }

  selectTask(taskId: number): void {
    this.selectedTaskId.update((selectedId) => (selectedId === taskId ? null : taskId));
  }

  openTaskDetailDialog(task: Task): void {
    this.selectTask(task.id);

    this.dialog.open<unknown, TaskDetailDialogData, TaskDetailDialogComponent>(
      TaskDetailDialogComponent,
      {
        maxWidth: '28rem',
        width: '100%',
        panelClass: ['bg-white'],
        positionStrategy: new GlobalPositionStrategy().right(),
        data: {
          task,
          onCompleted: (taskId) => this.toggleTask(taskId),
          onDelete: (taskId) => this.deleteTask(taskId),
        },
      },
    );
  }

  saveTask(formData: TaskFormData): Observable<Task> {
    return this.taskService.create(formData).pipe(
      tap((created) => {
        this.tasks.update((tasks) => [...tasks, created]);
        this.selectedTaskId.set(created.id);
      }),
    );
  }

  deleteTask(taskId: number): Observable<void> {
    return this.taskService.delete(taskId).pipe(
      tap(() => {
        this.tasks.update((tasks) => tasks.filter((task) => task.id !== taskId));

        if (this.selectedTaskId() === taskId) {
          this.selectedTaskId.set(null);
        }
      }),
    );
  }
}
