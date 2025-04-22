import { notificationSelectionSet } from "@/types/Notification";
import { Schema } from "amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import { Notification } from "@/types/Notification";

export class NotificationService {
  private client: ReturnType<typeof generateClient<Schema>>;

  constructor(client: ReturnType<typeof generateClient<Schema>>) {
    this.client = client;
  }

  /**
   * Get all notifications for a user
   */
  public async getNotificationsForUser(userId: string) {
    try {
      const { data: notifications, errors } =
        await this.client.models.Notification.list({
          filter: { userId: { eq: userId } },
          selectionSet: notificationSelectionSet,
        });
      if (errors) {
        throw new Error(errors.map((error) => error.message).join(", "));
      }
      return notifications;
    } catch (error) {
      console.error("Error getting notifications:", error);
      throw error;
    }
  }

  /**
   * Update notifications as read and return the updated notifications
   */
  public async updateNotificationsAsRead(notificationsIds: string[]) {
    try {
      const updatePromises = notificationsIds.map(async (notificationId) => {
        const { data: result, errors } =
          await this.client.models.Notification.update(
            {
              id: notificationId,
              isRead: true,
            },
            // {
            //   selectionSet: notificationSelectionSet,
            // }
          );
        if (errors) {
          throw new Error(errors.map((error) => error.message).join(", "));
        }
        return result;
      });

      return await Promise.all(updatePromises);
    } catch (error) {
      console.error("Error updating notifications:", error);
      throw error;
    }
  }
}
