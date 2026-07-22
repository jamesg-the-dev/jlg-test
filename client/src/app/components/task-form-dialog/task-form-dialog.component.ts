import { Component, inject, signal } from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';

import { Category, Priority, TaskFormData } from '../../models/task.model';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { CATEGORIES, PRIORITY_CONFIG } from '../../constants/global.constant';
import { TaskStore } from '../../services/task-store.service';
import { firstValueFrom } from 'rxjs';
import { TooltipDirective } from "../../directives/tooltip.directive";

export interface TaskFormDialogData {
  taskData: TaskFormData | null;
  isEditing: boolean;
}

export interface TaskFormDialogResult {
  taskData: TaskFormData;
}

@Component({
  selector: 'app-task-form-dialog',
  standalone: true,
  imports: [FormField, FormRoot, A11yModule, TooltipDirective],
  templateUrl: './task-form-dialog.component.html',
})
export class TaskFormDialogComponent {
  readonly dialogRef = inject(DialogRef<TaskFormDialogResult>);
  readonly dialogData = inject(DIALOG_DATA) as TaskFormDialogData;
  readonly taskStore = inject(TaskStore);

  protected readonly categories = CATEGORIES;
  protected readonly priorities: Priority[] = ['low', 'medium', 'high'];
  protected readonly priorityConfig = PRIORITY_CONFIG;

  private readonly taskModel = signal<TaskFormData>(
    this.dialogData.taskData ?? {
      category: '' as Category,
      dueDate: '',
      priority: '' as Priority,
      title: '',
    },
  );
  protected readonly taskForm = form(
    this.taskModel,
    (schema) => {
      required(schema.title, { message: 'Title is required.' });
    },
    {
      submission: {
        action: () => this.onSubmit(),
      },
    },
  );

  protected updatePriority(priority: Priority): void {
    this.taskForm.priority().value.set(priority);
  }

  protected async onSubmit() {
    const taskForm = this.taskForm();
    if (!taskForm.valid()) {
      //todo handle validation
      return;
    }

    await firstValueFrom(this.taskStore.saveTask(taskForm.value())).then((createdTask) => {
      this.dialogRef.close({ taskData: createdTask });
    });
  }
}
