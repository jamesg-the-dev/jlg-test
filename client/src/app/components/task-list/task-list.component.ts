import { Component, input, output } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
  standalone: true,
  templateUrl: './task-list.component.html',
  imports: [TaskCardComponent],
  selector: 'app-task-list',
})
export class TaskListComponent {
  readonly tasks = input.required<Task[]>();

  readonly completed = output<number>();
  readonly selected = output<Task>();
  readonly deleted = output<number>();
}
