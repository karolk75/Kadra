import { conversationsWithDetailsSelectionSet } from "@/types/Conversation";
import { Schema } from "amplify/data/resource";
import { generateClient } from "aws-amplify/api";

export class ConversationService {
  private client: ReturnType<typeof generateClient<Schema>>;

  constructor(client: ReturnType<typeof generateClient<Schema>>) {
    this.client = client;
  }

  /**
   * List conversations for a user
   */
  public async listUserConversations(userId: string) {
    try {
      // Get conversation participants for this user
      const { data: conversationIds, errors } =
        await this.client.models.ConversationParticipant.list({
          filter: { userId: { eq: userId } },
          selectionSet: ["conversationId"],
        });

      if (errors) {
        throw new Error(errors.map((error) => error.message).join(", "));
      }

      if (conversationIds.length === 0) {
        return { data: [] };
      }

      // Get the conversations
      const { data: conversations, errors: conversationsErrors } =
        await this.client.models.Conversation.list({
          filter: {
            or: conversationIds.map((id) => ({
              id: { eq: id.conversationId },
            })),
          },
          selectionSet: conversationsWithDetailsSelectionSet,
        });

      if (conversationsErrors) {
        throw new Error(
          conversationsErrors.map((error) => error.message).join(", ")
        );
      }

      return conversations;
    } catch (error) {
      console.error("Error listing user conversations:", error);
      throw error;
    }
  }

  /**
   * Mark a conversation as read for a user
   */
  public async markConversationAsRead(conversationId: string, userId: string) {
    try {
      const { data, errors } = await this.client.models.ConversationParticipant.update({
        id: conversationId,
        userId: userId,
        lastReadAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error marking conversation as read:", error);
      throw error;
    }
  }

  /**
   * Update the last message of a conversation
   */
  public async updateLastMessage(conversationId: string, message: string) {
    try {
      const { data, errors } = await this.client.models.Conversation.update({
        id: conversationId,
        lastMessage: message,
      });

      if (errors) {
        throw new Error(errors.map((error) => error.message).join(", "));
      }

      return data;
    } catch (error) {
      console.error("Error updating conversation lastMessage:", error);
      throw error;
    }
  }
}
