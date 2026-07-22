import { Injectable, computed, inject, signal } from '@angular/core';
import { NavView, Task, TaskFormData, TaskSection } from '../models/task.model';
import { VIEW_LABELS } from '../constants/global.constant';
import { EMPTY_MESSAGES } from '../constants/messages.constant';
import { Dialog } from '@angular/cdk/dialog';
import {
  TaskFormDialogComponent,
  TaskFormDialogData,
  TaskFormDialogResult,
} from '../components/task-form-dialog/task-form-dialog.component';
import { TaskService } from './task.service';
import { Observable, tap } from 'rxjs';
import {
  TaskDetailDialogComponent,
  TaskDetailDialogData,
} from '../components/task-detail-dialog/task-detail-dialog.component';
import { GlobalPositionStrategy } from '@angular/cdk/overlay';

@Injectable({ providedIn: 'root' })
export class TaskStore {
  private readonly dialog = inject(Dialog);

  readonly tasks = signal<Task[]>([]);
  private readonly taskService = inject(TaskService);

  readonly view = signal<NavView>('projects');
  private readonly selectedTaskId = signal<number | null>(null);

  readonly viewLabel = computed(() => VIEW_LABELS[this.view()]);
  readonly emptyMessage = computed(() => EMPTY_MESSAGES[this.view()]);

  private readonly completedTasks = computed(() => this.tasks().filter((task) => task.done));

  readonly visibleTasks = computed(() => {
    switch (this.view()) {
      case 'projects':
        return this.tasks().filter((task) => !task.done);
      case 'completed':
        return this.completedTasks();
      default:
        return [];
    }
  });

  readonly taskCounts = computed<Record<NavView, number>>(() => ({
    projects: this.tasks().filter((task) => !task.done).length,
    completed: this.completedTasks().length,
  }));

  readonly groupedTasks = computed<TaskSection[]>(() => {
    return [{ label: this.viewLabel(), items: this.visibleTasks() }];
  });

  readonly selectedTask = computed(
    () => this.tasks().find((task) => task.id === this.selectedTaskId()) ?? null,
  );

  loadTasks() {
    this.taskService.getAll().subscribe((ts) => this.tasks.set(ts));
  }

  setView(view: NavView): void {
    this.view.set(view);
    this.selectedTaskId.set(null);
  }

  toggleTask(taskId: number): void {
    const task = this.tasks().find((t) => t.id === taskId);
    if (!task) return;

    const newDone = !task.done;
    this.taskService.setCompleted(taskId, newDone).subscribe((updated) => {
      this.tasks.update((tasks) => tasks.map((t) => (t.id === taskId ? updated : t)));
    });
  }

  selectTask(taskId: number): void {
    this.selectedTaskId.update((selectedId) => (selectedId === taskId ? null : taskId));
  }

  openNewTask(): void {
    const ref = this.dialog.open<TaskFormDialogResult, TaskFormDialogData>(
      TaskFormDialogComponent,
      {
        data: {
          taskData: null,
          isEditing: false,
        },
        maxWidth: '28rem',
        maxHeight: '90vh',
        panelClass: ['bg-white', 'rounded-lg'],
      },
    );
    ref.closed.subscribe(() => this.selectedTaskId.set(null));
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
