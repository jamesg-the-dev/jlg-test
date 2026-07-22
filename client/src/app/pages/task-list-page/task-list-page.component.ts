import { Component, effect, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavView, Task } from '../../models/task.model';
import { TaskStore } from '../../services/task-store.service';
import { LoadingBarService } from '../../services/loading-bar.service';
import { NotificationService } from '../../services/notification.service';
import { TaskEmptyStateComponent } from '../../components/task-empty-state/task-empty-state.component';
import { USER } from '../../constants/global.constant';
import { TaskListComponent } from '../../components/task-list/task-list.component';

@Component({
  selector: 'app-task-list-page',
  standalone: true,
  imports: [TaskEmptyStateComponent, TaskListComponent],
  templateUrl: './task-list-page.component.html',
  providers: [TaskStore],
  host: {
    class: 'flex-1',
  },
})
export class TaskListPageComponent implements OnInit {
  protected readonly taskStore = inject(TaskStore);
  private readonly loadingBarService = inject(LoadingBarService);
  private readonly notificationService = inject(NotificationService);
  private readonly route = inject(ActivatedRoute);

  protected readonly firstName = USER.firstName;

  private wasLoadingMore = false;

  constructor() {
    effect(() => {
      const isLoadingMore = this.taskStore.isLoadingMore();
      if (isLoadingMore === this.wasLoadingMore) return;

      this.wasLoadingMore = isLoadingMore;
      if (isLoadingMore) {
        this.loadingBarService.show();
      } else {
        this.loadingBarService.hide();
      }
    });
  }

  ngOnInit(): void {
    const view = this.route.snapshot.data['view'] as NavView;
    this.taskStore.setView(view);

    this.taskStore.loadTasks(view).subscribe({
      next: () => {},
      error: () => {
        this.notificationService.error(
          'Error loading tasks',
          'Failed to load tasks. Please try again.',
        );
      },
    });
  }

  protected openTaskDetailDialog(task: Task): void {
    this.taskStore.openTaskDetailDialog(task);
  }

  protected deleteTask(taskId: number): void {
    this.taskStore.deleteTask(taskId).subscribe({
      error: () => {
        this.notificationService.error(
          'Error deleting task',
          'Failed to delete task. Please try again.',
        );
      },
    });
  }

  protected onScroll(event: Event): void {
    const target = event.target as HTMLElement;
    const scrollThreshold = 200;
    const reachedBottom =
      target.scrollTop + target.clientHeight >= target.scrollHeight - scrollThreshold;

    if (!reachedBottom) return;

    this.taskStore.loadMore().subscribe({
      error: () => {
        this.notificationService.error(
          'Error loading tasks',
          'Failed to load more tasks. Please try again.',
        );
      },
    });
  }
}
