// id
// title: a.string(),
// lastMessage: a.string(),
// createdAt: a.datetime().required(),
// updatedAt: a.datetime(),
// // Relationships
// participants: a.hasMany("ConversationParticipant", "conversationId"),

import { Schema } from "amplify/data/resource";
import { SelectionSet } from "aws-amplify/api";

export type Conversation = Schema["Conversation"]["type"];

export const conversationsWithDetailsSelectionSet = [
  "id",
  "title",
  "lastMessage",
  "createdAt",
  "updatedAt",
  "participants.user.firstName",
  "participants.user.lastName",
  "participants.user.id",
  "participants.user.profileImageUrl",
  "participants.lastReadAt",
  "participants.id",
] as const;
export type ConversationWithDetails = SelectionSet<
  Schema["Conversation"]["type"],
  typeof conversationsWithDetailsSelectionSet
>;
