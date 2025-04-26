// conversationId: a.string().required(),
// senderId: a.string().required(),
// content: a.string().required(),
// status: a.ref("MessageStatus").required(),
// createdAt: a.datetime().required(),
// updatedAt: a.datetime(),
// // Relationships
// conversation: a.belongsTo("Conversation", "conversationId"),
// sender: a.belongsTo("User", "senderId"),
// attachments: a.hasMany("MessageAttachment", "messageId"),

import { Schema } from "amplify/data/resource";
import { SelectionSet } from "aws-amplify/api";

export type Message = Schema["Message"]["type"];

export const messagesWithDetailsSelectionSet = [
  "id",
  "status",
  "content",
  "createdAt",
  "updatedAt",
  "conversationId",
  "senderId",
  "conversation.id",
  "conversation.participants.id",
  "conversation.participants.userId",
  "conversation.participants.lastReadAt",
  "conversation.participants.updatedAt",
  "conversation.participants.user.id",
  "conversation.participants.user.firstName",
  "conversation.participants.user.lastName",
  "conversation.participants.user.profileImageUrl",
  "attachments.id",
  "attachments.uri",
  "attachments.name",
  "attachments.size",
  "attachments.createdAt",
  "attachments.updatedAt",
] as const;
export type MessageWithDetails = SelectionSet<
  Schema["Message"]["type"],
  typeof messagesWithDetailsSelectionSet
>;
