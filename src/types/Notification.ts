import { Schema } from "amplify/data/resource";

export const notificationSelectionSet = [
  "id",
  "userId",
  "title",
  "content",
  "isRead",
  "type",
  "relatedId",
  "createdAt",
  "updatedAt",
] as const;
export type Notification = Schema["Notification"]["type"];
