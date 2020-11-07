import { ProductCategoryNames } from 'src/app/main/shared/general.models';

export enum NotificationLevels {
  Info = 1,
  Warning = 2,
  Error = 3,
}

export interface INotification {
  code: string;
  level: string;
  notificationLevel?: NotificationLevels;
  description: string;
  category: string;
  endDate?: Date;
}

export class NotificationWrapper {
  notifications: INotification[];

  constructor(notifications: Partial<INotification[]>) {
      this.notifications = (notifications || []).map(notification => {
          switch (notification.level) {
              case 'info':
                  notification.notificationLevel = NotificationLevels.Info;
                  break;
              case 'warning':
              case 'warn':
                  notification.notificationLevel = NotificationLevels.Warning;
                  break;
              case 'error':
                  notification.notificationLevel = NotificationLevels.Error;
                  break;
          }

          return notification;
      });
  }

  static getGreaterNotificationLevel(notifications: INotification[]): NotificationLevels {
      if (notifications && notifications.length > 0) {
          return notifications.sort((a, b) => a.notificationLevel < b.notificationLevel ? 1 : -1)[0].notificationLevel;
      }

      return null;
  }

  static getNotificationsByLevel(level: NotificationLevels, notifications: INotification[]): INotification[] {
      return notifications ? notifications.filter(notification => notification.notificationLevel === level) : [];
  }

  public getNotificationsByCategory(category: string): INotification[] {
      return this.notifications && this.notifications.filter(x => x.category.toUpperCase() === (category && category.toUpperCase()));
  }

  public getNotificationsHighestLevelByCategory(category: string): NotificationLevels {
      const notifications = this.getNotificationsByCategory(category);
      return NotificationWrapper.getGreaterNotificationLevel(notifications);
  }

  public getNotificationsHighestLevel(): NotificationLevels {
      return NotificationWrapper.getGreaterNotificationLevel(this.notifications);
  }

  public getNotificationsByCode(code: string): INotification {
      return this.notifications.find(notification => notification.code === code);
  }

  get communityNotifications() {
      return this.getNotificationsByCategory(ProductCategoryNames.Community);
  }
  get veteranNotifications() {
      return this.getNotificationsByCategory(ProductCategoryNames.VA);
  }
  get lisNotifications() {
      return this.getNotificationsByCategory(ProductCategoryNames.LIS);
  }
  get medicaidNotifications() {
      return this.getNotificationsByCategory(ProductCategoryNames.Medicaid);
  }
  get snapNotifications() {
      return this.getNotificationsByCategory(ProductCategoryNames.SNAP);
  }

}
