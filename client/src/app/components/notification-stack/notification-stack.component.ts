import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-notification-stack',
  standalone: true,
  imports: [NotificationComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './notification-stack.component.html',
  styles: `
    .notification-stack {
      position: fixed;
      top: 1.25rem;
      right: 1.25rem;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 0.625rem;
      width: min(360px, calc(100vw - 2.5rem));
      pointer-events: none;
    }

    .notification-stack app-notification-item {
      pointer-events: auto;
    }
  `,
})
export class NotificationStackComponent {
  private readonly notificationService = inject(NotificationService);

  readonly notifications = this.notificationService.notifications;

  private readonly timers = new Map<string, ReturnType<typeof setTimeout>>();

  onDismissed(id: string): void {
    const timer = this.timers.get(id);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(id);
    }
    this.notificationService.dismiss(id);
  }

  scheduleAutoDismiss(id: string, duration: number): void {
    if (duration <= 0 || this.timers.has(id)) return;

    const timer = setTimeout(() => this.onDismissed(id), duration);
    this.timers.set(id, timer);
  }
}
