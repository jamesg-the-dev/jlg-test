import { Component, input, output } from '@angular/core';

import { NavView } from '../../models/task.model';
import { APP_NAME, USER } from '../../constants/global.constant';

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
})
export class SidebarComponent {
  readonly view = input.required<NavView>();
  readonly taskCounts = input.required<Record<NavView, number>>();
  readonly viewChange = output<NavView>();
  readonly newTask = output<void>();

  protected readonly appName = APP_NAME;
  protected readonly name = `${USER.firstName} ${USER.lastName}`;
  protected readonly email = USER.email;

  protected readonly navItems: NavItem[] = [
    { id: 'all', label: 'All Tasks', icon: 'folder_open', shortLabel: 'Tasks' },
    { id: 'completed', label: 'Completed', icon: 'done_all', shortLabel: 'Done' },
  ];
}
