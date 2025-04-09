export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  relatedEntityType: string;
  relatedEntityId: string;
  isRead: boolean;
  createdAt: string;
  readAt: string | null;
}
