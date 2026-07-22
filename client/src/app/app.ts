import { Component, inject, OnInit } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';

import { Task } from './models/task.model';
import { TaskStore } from './services/task-store.service';
import { BottomTabBarComponent } from './components/bottom-tab-bar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/internal/operators/map';
import { USER } from './constants/global.constant';
import { TaskEmptyStateComponent } from "./components/task-empty-state/task-empty-state.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BottomTabBarComponent, SidebarComponent, TaskCardComponent, TaskEmptyStateComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly dialog = inject(Dialog);
  private breakpointObserver = inject(BreakpointObserver);

  protected readonly taskStore = inject(TaskStore);

  readonly isMobile = toSignal(
    this.breakpointObserver.observe(Breakpoints.Handset).pipe(map((r) => r.matches)),
    { initialValue: false },
  );

  readonly firstName = USER.firstName;

  protected openTaskDetailDialog(task: Task): void {
    this.taskStore.openTaskDetailDialog(task);
  }

  ngOnInit(): void {
    this.taskStore.loadTasks();
  }

  deleteTask(taskId: number) {
    this.taskStore.deleteTask(taskId).subscribe({
      error: () => {
        //todo handle error
      },
    });
  }
}
