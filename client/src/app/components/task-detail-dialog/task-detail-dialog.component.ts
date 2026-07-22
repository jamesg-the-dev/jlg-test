import { Component, computed, inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

import { Task } from '../../models/task.model';
import { formatDate, getCategoryColor, getPriorityConfigObj } from '../../utilities/task.util';
import { CheckTaskButtonComponent } from '../check-task-button/check-task-button.component';
import { PriorityConfigObj } from '../../constants/global.constant';
import { TooltipDirective } from '../../directives/tooltip.directive';

export interface TaskDetailDialogData {
  task: Task | null;
  onCompleted: (taskId: number) => void;
  onDelete: (taskId: number) => void;
}

@Component({
  selector: 'app-task-detail-dialog',
  standalone: true,
  imports: [CheckTaskButtonComponent, TooltipDirective],
  templateUrl: './task-detail-dialog.component.html',
  host: {
    class: 'flex flex-col gap-3 p-6 h-full',
  },
})
export class TaskDetailDialogComponent {
  protected readonly data = inject<TaskDetailDialogData>(DIALOG_DATA);
  protected readonly dialogRef = inject(DialogRef);

  protected task = computed(() => this.data.task);

  protected readonly priority = computed<PriorityConfigObj | undefined>(() => {
    const task = this.task();
    return task?.priority ? getPriorityConfigObj(task.priority) : undefined;
  });

  protected readonly categoryColor = computed<string>(() => {
    const task = this.task();
    return task ? getCategoryColor(task.category) : '';
  });

  protected readonly dueDate = computed(() => {
    const task = this.task();
    return task ? formatDate(task.dueDate) : '';
  });

  protected readonly formattedDueDate = computed(() => {
    const task = this.task();
    return task ? formatDate(task.dueDate) : '';
  });

  protected close(): void {
    this.dialogRef.close();
  }
}
