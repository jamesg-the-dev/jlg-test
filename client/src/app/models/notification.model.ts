export type NotificationType = 'success' | 'error';

export interface INotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  duration: number;
}

export type NotificationInput = Omit<INotificationItem, 'id'>;
