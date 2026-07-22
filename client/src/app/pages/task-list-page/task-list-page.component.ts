import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavView, Task } from '../../models/task.model';
import { TaskStore } from '../../services/task-store.service';
import { LoadingBarService } from '../../services/loading-bar.service';
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
  private readonly route = inject(ActivatedRoute);

  protected readonly firstName = USER.firstName;

  ngOnInit(): void {
    const view = this.route.snapshot.data['view'] as NavView;
    this.taskStore.setView(view);

    this.loadingBarService.show();
    this.taskStore.loadTasks(view).subscribe({
      next: () => {
        this.loadingBarService.hide();
      },
      error: () => {
        this.loadingBarService.hide();
        //todo handle error
      },
    });
  }

  protected openTaskDetailDialog(task: Task): void {
    this.taskStore.openTaskDetailDialog(task);
  }

  protected deleteTask(taskId: number): void {
    this.taskStore.deleteTask(taskId).subscribe({
      error: () => {
        //todo handle error
      },
    });
  }
}
