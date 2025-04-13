import { useData } from "@/context/DataContext";
import { Schema } from "amplify/data/resource";
import { generateClient } from "aws-amplify/api";

const client = generateClient<Schema>();

export class ConversationService {
  /**
   * Get a conversation by ID
   */
  static async getConversationById(id: string) {
    try {
      return await client.models.Conversation.get({ id });
    } catch (error) {
      console.error("Error getting conversation:", error);
      throw error;
    }
  }

  /**
   * List conversations for a user
   */
  static async listUserConversations(userId: string) {
    try {
      // Get conversation participants for this user
      const { data: participants } =
        await client.models.ConversationParticipant.list({
          filter: { userId: { eq: userId } },
        });

      // Get the conversation IDs
      const conversationIds = participants.map((p) => p.conversationId);

      if (conversationIds.length === 0) {
        return { data: [] };
      }

      // Get the conversations
      return await client.models.Conversation.list({
        filter: { or: conversationIds.map((id) => ({ id: { eq: id } })) },
      });
    } catch (error) {
      console.error("Error listing user conversations:", error);
      throw error;
    }
  }

  /**
   * Create a new conversation
   */
  static async createConversation(data: {
    title?: string;
    participantIds: string[];
  }) {
    try {
      // Create the conversation
      const conversation = await client.models.Conversation.create({
        title: data.title,
        createdAt: new Date().toISOString(),
      });

      if (!conversation.data) {
        throw new Error("Conversation not created");
      }

      const conversationId = conversation.data.id;

      // Add participants
      const participantPromises = data.participantIds.map((userId) =>
        client.models.ConversationParticipant.create({
          conversationId,
          userId,
          createdAt: new Date().toISOString(),
        })
      );

      await Promise.all(participantPromises);

      return conversation;
    } catch (error) {
      console.error("Error creating conversation:", error);
      throw error;
    }
  }

  /**
   * Add a participant to a conversation
   */
  static async addParticipant(conversationId: string, userId: string) {
    try {
      return await client.models.ConversationParticipant.create({
        conversationId,
        userId,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error adding participant:", error);
      throw error;
    }
  }

  /**
   * Remove a participant from a conversation
   */
  static async removeParticipant(conversationId: string, userId: string) {
    try {
      // Find the participant
      const { data: participants } =
        await client.models.ConversationParticipant.list({
          filter: {
            and: [
              { conversationId: { eq: conversationId } },
              { userId: { eq: userId } },
            ],
          },
          limit: 1,
        });

      if (participants.length === 0) {
        throw new Error("Participant not found");
      }

      // Delete the participant
      return await client.models.ConversationParticipant.delete({
        id: participants[0].id,
      });
    } catch (error) {
      console.error("Error removing participant:", error);
      throw error;
    }
  }

  /**
   * Get conversation participants
   */
  static async getConversationParticipants(conversationId: string) {
    try {
      return await client.models.ConversationParticipant.list({
        filter: { conversationId: { eq: conversationId } },
      });
    } catch (error) {
      console.error("Error getting conversation participants:", error);
      throw error;
    }
  }

  /**
   * Send a message to a conversation
   */
  static async sendMessage(data: {
    conversationId: string;
    senderId: string;
    content: string;
  }) {
    try {
      return await client.models.Message.create({
        conversationId: data.conversationId,
        senderId: data.senderId,
        content: data.content,
        status: "SENT",
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  }

  /**
   * Get messages for a conversation
   */
  static async getConversationMessages(conversationId: string, limit?: number) {
    try {
      const result = await client.models.Message.list({
        filter: { conversationId: { eq: conversationId } },
        limit,
      });

      // Sort the messages by createdAt in descending order (newest first)
      const sortedData = [...result.data].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      return {
        ...result,
        data: sortedData,
      };
    } catch (error) {
      console.error("Error getting conversation messages:", error);
      throw error;
    }
  }

  /**
   * Update message status
   */
  static async updateMessageStatus(
    messageId: string,
    status: "SENT" | "DELIVERED" | "READ"
  ) {
    try {
      return await client.models.Message.update({
        id: messageId,
        status,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error updating message status:", error);
      throw error;
    }
  }

  /**
   * Add an attachment to a message
   */
  static async addMessageAttachment(data: {
    messageId: string;
    type: "FILE" | "IMAGE" | "AUDIO" | "VIDEO";
    uri: string;
    name: string;
    size?: number;
  }) {
    try {
      return await client.models.MessageAttachment.create({
        messageId: data.messageId,
        type: data.type,
        uri: data.uri,
        name: data.name,
        size: data.size,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error adding message attachment:", error);
      throw error;
    }
  }

  /**
   * Mark conversation as read for a user
   */
  static async markConversationAsRead(conversationId: string, userId: string) {
    try {
      // Find the participant
      const { data: participants } =
        await client.models.ConversationParticipant.list({
          filter: {
            and: [
              { conversationId: { eq: conversationId } },
              { userId: { eq: userId } },
            ],
          },
          limit: 1,
        });

      if (participants.length === 0) {
        throw new Error("Participant not found");
      }

      // Update the last read time
      return await client.models.ConversationParticipant.update({
        id: participants[0].id,
        lastReadAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error marking conversation as read:", error);
      throw error;
    }
  }
}
