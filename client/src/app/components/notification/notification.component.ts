import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { INotificationItem } from '../../models/notification.model';

const ICON_MAP: Record<INotificationItem['type'], { icon: string; color: string }> = {
  success: { icon: 'check_circle', color: 'text-green-700' },
  error: { icon: 'error', color: 'text-destructive' },
};

@Component({
  selector: 'app-notification-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './notification.component.html',
  host: {
    class: 'notification',
    '[class]': '"notification--" + item().type',
  },
})
export class NotificationComponent {
  item = input.required<INotificationItem>();
  leaving = input(false);
  dismissed = output<string>();

  readonly icon = ICON_MAP;

  onClose(): void {
    this.dismissed.emit(this.item().id);
  }
}
