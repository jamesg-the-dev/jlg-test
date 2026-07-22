import { Component, inject, OnInit } from '@angular/core';

import { NavView } from '../../models/task.model';
import { ROUTE_NAMES } from '../../constants/global.constant';
import { APP_NAME, USER } from '../../constants/global.constant';
import { TaskCountService } from '../../services/task-count.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import {
  TaskFormDialogResult,
  TaskFormDialogData,
  TaskFormDialogComponent,
} from '../task-form-dialog/task-form-dialog.component';

interface NavItem {
  id: NavView;
  label: string;
  icon: string;
  shortLabel: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  imports: [RouterLink, RouterLinkActive],
})
export class SidebarComponent implements OnInit {
  private readonly taskCountService = inject(TaskCountService);
  private readonly dialog = inject(Dialog);

  protected readonly appName = APP_NAME;
  protected readonly name = `${USER.firstName} ${USER.lastName}`;
  protected readonly email = USER.email;

  protected readonly navItems: NavItem[] = [
    {
      id: ROUTE_NAMES.All as NavView,
      label: 'All Tasks',
      icon: 'folder_open',
      shortLabel: 'Tasks',
    },
    {
      id: ROUTE_NAMES.Completed as NavView,
      label: 'Completed',
      icon: 'done_all',
      shortLabel: 'Done',
    },
  ];

  protected readonly taskCounts = this.taskCountService.taskCounts;

  ngOnInit(): void {
    this.taskCountService.loadCounts().subscribe();
  }

  protected openNewTask(): void {
    this.dialog.open<TaskFormDialogResult, TaskFormDialogData>(TaskFormDialogComponent, {
      data: { taskData: null },
      maxWidth: '28rem',
      maxHeight: '90vh',
      panelClass: ['bg-white', 'rounded-lg'],
    });
  }
}
