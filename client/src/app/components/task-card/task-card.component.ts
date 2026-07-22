import { Component, computed, input, output } from '@angular/core';

import { Task } from '../../models/task.model';
import { formatDate, getPriorityConfigObj } from '../../utilities/task.util';
import { CheckTaskButtonComponent } from '../check-task-button/check-task-button.component';
import { CATEGORY_COLORS, DEFAULT_CATEGORY_COLOR } from '../../constants/global.constant';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CheckTaskButtonComponent],
  templateUrl: './task-card.component.html',
  host: {
    class: 'block',
  },
})
export class TaskCardComponent {
  readonly task = input.required<Task>();
  readonly completed = output<number>();
  readonly selected = output<Task>();
  readonly deleted = output<number>();

  protected readonly priority = computed(() => getPriorityConfigObj(this.task().priority!));
  protected readonly categoryColor = computed(
    () => CATEGORY_COLORS[this.task().category!] ?? DEFAULT_CATEGORY_COLOR,
  );
  protected readonly formattedDueDate = computed(() => formatDate(this.task().dueDate ?? ''));

  protected onCompleted(): void {
    this.completed.emit(this.task().id);
  }

  protected onDelete(event: Event): void {
    event.stopPropagation();
    this.deleted.emit(this.task().id);
  }
}
