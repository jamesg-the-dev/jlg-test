import { Injectable, signal } from '@angular/core';
import { INotificationItem, NotificationInput } from '../models/notification.model';

const DEFAULT_DURATION = 5000;

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly _notifications = signal<INotificationItem[]>([]);
  readonly notifications = this._notifications.asReadonly();

  show(notification: NotificationInput): string {
    const id = crypto.randomUUID();

    this._notifications.update((items) => [
      ...items,
      { ...notification, id, duration: notification.duration ?? DEFAULT_DURATION },
    ]);

    return id;
  }

  success(title: string, message: string, duration = DEFAULT_DURATION): string {
    return this.show({ type: 'success', title, message, duration });
  }

  error(title: string, message: string, duration = DEFAULT_DURATION): string {
    return this.show({ type: 'error', title, message, duration });
  }

  dismiss(id: string): void {
    this._notifications.update((items) => items.filter((item) => item.id !== id));
  }

  clear(): void {
    this._notifications.set([]);
  }
}
