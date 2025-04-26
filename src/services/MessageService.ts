import { messagesWithDetailsSelectionSet } from "@/types/Message";
import { Schema } from "amplify/data/resource";
import { generateClient } from "aws-amplify/api";

export class MessageService {
  private client: ReturnType<typeof generateClient<Schema>>;

  constructor(client: ReturnType<typeof generateClient<Schema>>) {
    this.client = client;
  }

  /**
   * List messages for a conversation
   */
  public async listMessages(conversationId: string) {
    try {
      const { data: messages, errors } = await this.client.models.Message.list({
        filter: { conversationId: { eq: conversationId } },
        selectionSet: messagesWithDetailsSelectionSet,
      });

      if (errors) {
        throw new Error(errors.map((error) => error.message).join(", "));
      }

      return messages;
    } catch (error) {
      console.error("Error listing user messages:", error);
      throw error;
    }
  }

  /**
   * Send a message to a conversation
   */
  public async sendMessage(
    conversationId: string,
    senderId: string,
    content: string,
    attachments?: Array<{
      type: "IMAGE" | "FILE" | "AUDIO" | "VIDEO";
      uri: string;
      name: string;
      size?: number;
    }>
  ) {
    try {
      // Create the message
      const { data: message, errors } = await this.client.models.Message.create({
        conversationId,
        senderId,
        content,
        status: "SENT",
        createdAt: new Date().toISOString(),
      });

      if (errors) {
        throw new Error(errors.map((error) => error.message).join(", "));
      }

      if (!message) {
        throw new Error("Failed to create message");
      }

      // Create attachments if provided
      if (attachments && attachments.length > 0) {
        const attachmentPromises = attachments.map(attachment => {
          return this.client.models.MessageAttachment.create({
            messageId: message.id,
            type: attachment.type,
            uri: attachment.uri,
            name: attachment.name,
            size: attachment.size,
            createdAt: new Date().toISOString(),
          });
        });

        await Promise.all(attachmentPromises);
      }

      // Return message with details
      const { data: messageWithDetails } = await this.client.models.Message.get({
        id: message.id
      }, {
        selectionSet: messagesWithDetailsSelectionSet
      });

      return messageWithDetails;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  }
}
