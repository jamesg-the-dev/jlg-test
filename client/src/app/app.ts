import { Component, inject, OnInit } from '@angular/core';
import { Task } from './models/task.model';
import { TaskStore } from './services/task-store.service';
import { LoadingBarService } from './services/loading-bar.service';
import { BottomTabBarComponent } from './components/bottom-tab-bar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { USER } from './constants/global.constant';
import { TaskEmptyStateComponent } from './components/task-empty-state/task-empty-state.component';
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';
import { NotificationStackComponent } from './components/notification-stack/notification-stack.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    BottomTabBarComponent,
    SidebarComponent,
    TaskCardComponent,
    TaskEmptyStateComponent,
    LoadingBarComponent,
    NotificationStackComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly taskStore = inject(TaskStore);
  private readonly loadingBarService = inject(LoadingBarService);

  readonly firstName = USER.firstName;

  protected openTaskDetailDialog(task: Task): void {
    this.taskStore.openTaskDetailDialog(task);
  }

  ngOnInit(): void {
    this.loadingBarService.show();
    this.taskStore.loadCounts().subscribe();
    this.taskStore.loadTasks().subscribe({
      next: () => {
        this.loadingBarService.hide();
      },
      error: () => {
        this.loadingBarService.hide();
        //todo handle error
      },
    });
  }

  deleteTask(taskId: number) {
    this.taskStore.deleteTask(taskId).subscribe({
      error: () => {
        //todo handle error
      },
    });
  }
}
