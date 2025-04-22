import { useState, useEffect, useCallback } from "react";
import { useSession } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { ConversationService } from "@/services/ConversationService";
import { Schema } from "amplify/data/resource";

// Define types for objects with detailed relationship data
export interface MessageWithDetails {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  status: "SENT" | "DELIVERED" | "READ";
  createdAt: string;
  updatedAt?: string;
  sender?: Schema["User"]["type"];
  attachments?: Schema["MessageAttachment"]["type"][];
}

export interface ConversationWithDetails {
  id: string;
  title?: string;
  lastMessage?: string;
  createdAt: string;
  updatedAt?: string;
  participants?: Array<{
    id: string;
    conversationId: string;
    userId: string;
    lastReadAt?: string;
    createdAt: string;
    updatedAt?: string;
    user?: Schema["User"]["type"];
  }>;
  unread?: boolean;
}

export function useConversations() {
  const { user } = useSession();
  const { client } = useData();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [conversations, setConversations] = useState<ConversationWithDetails[]>(
    [],
  );
  const [currentConversation, setCurrentConversation] =
    useState<ConversationWithDetails | null>(null);
  const [messages, setMessages] = useState<MessageWithDetails[]>([]);

  // Fetch all conversations for the current user
  const fetchConversations = useCallback(async () => {
    console.log("fetchConversations");
    if (!user?.id) return [];

    setLoading(true);
    setError(null);
    try {
      const userConversations = await ConversationService.listUserConversations(
        user.id,
      );

      // Enrich conversations with participant details and unread message count
      const enrichedConversations = await Promise.all(
        userConversations.data.map(async (conversation) => {
          try {
            // Get participants
            const participantsResult =
              await ConversationService.getConversationParticipants(
                conversation.id,
              );

            // Get participants with user details
            const participantsWithUsers = await Promise.all(
              participantsResult.data.map(async (participant) => {
                const userResult = await client.models.User.get({
                  id: participant.userId,
                });
                return {
                  ...participant,
                  user: userResult?.data,
                };
              }),
            );

            // Calculate unread count
            const currentUserParticipant = participantsResult.data.find(
              (p) => p.userId === user.id,
            );
            const unread =
              currentUserParticipant?.lastReadAt < conversation?.updatedAt;

            const enrichedConversation: ConversationWithDetails = {
              ...conversation,
              participants: participantsWithUsers,
              unread,
            };

            return enrichedConversation;
          } catch (err) {
            console.error(
              `Error enriching conversation ${conversation.id}:`,
              err,
            );
            // Fallback with basic conversation data
            return {
              id: conversation.id,
              title: conversation.title,
              createdAt: conversation.createdAt,
              updatedAt: conversation.updatedAt,
            };
          }
        }),
      );

      setConversations(enrichedConversations);
      return enrichedConversations;
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to fetch conversations");
      setError(error);
      console.error("Error fetching conversations:", err);
      return [];
    } finally {
      setLoading(false);
    }
  }, [user?.id, client]);

  // Get a single conversation with details
  const getConversation = async (conversationId: string) => {
    console.log("getConversation");
    setLoading(true);
    setError(null);
    try {
      const conversationResult =
        await ConversationService.getConversationById(conversationId);
      if (!conversationResult.data) {
        throw new Error("Conversation not found");
      }

      // Get participants
      const participantsResult =
        await ConversationService.getConversationParticipants(conversationId);

      // Get participants with user details
      const participantsWithUsers = await Promise.all(
        participantsResult.data.map(async (participant) => {
          const userResult = await client.models.User.get({
            id: participant.userId,
          });
          return {
            ...participant,
            user: userResult?.data,
          };
        }),
      );

      // Get messages for this conversation
      const messagesResult =
        await ConversationService.getConversationMessages(conversationId);

      // Enrich messages with sender details
      const messagesWithSenders = await Promise.all(
        messagesResult.data.map(async (message) => {
          const senderResult = await client.models.User.get({
            id: message.senderId,
          });

          // Get message attachments
          const attachmentsResult = await client.models.MessageAttachment.list({
            filter: { messageId: { eq: message.id } },
          });

          const enrichedMessage: MessageWithDetails = {
            ...message,
            sender: senderResult?.data,
            attachments: attachmentsResult.data,
          };

          return enrichedMessage;
        }),
      );

      const conversationWithDetails: ConversationWithDetails = {
        id: conversationResult.data.id,
        title: conversationResult.data.title,
        createdAt: conversationResult.data.createdAt,
        updatedAt: conversationResult.data.updatedAt,
        participants: participantsWithUsers,
        messages: messagesWithSenders,
      };

      setCurrentConversation(conversationWithDetails);
      setMessages(messagesWithSenders);

      // Mark conversation as read
      if (user?.id) {
        await ConversationService.markConversationAsRead(
          conversationId,
          user.id,
        );
      }

      return conversationWithDetails;
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to get conversation");
      setError(error);
      console.error("Error getting conversation:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Create a new conversation
  const createConversation = async (data: {
    title?: string;
    participantIds: string[];
  }) => {
    if (!user?.id) {
      throw new Error("User not authenticated");
    }

    setLoading(true);
    setError(null);
    try {
      // Make sure current user is included in participants
      const participants = new Set(data.participantIds);
      participants.add(user.id);

      const result = await ConversationService.createConversation({
        title: data.title,
        participantIds: Array.from(participants),
      });

      // Refresh the conversations list
      fetchConversations();

      return result;
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to create conversation");
      setError(error);
      console.error("Error creating conversation:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Send a message
  const sendMessage = async (conversationId: string, content: string) => {
    if (!user?.id) {
      throw new Error("User not authenticated");
    }

    setLoading(true);
    setError(null);
    try {
      const result = await ConversationService.sendMessage({
        conversationId,
        senderId: user.id,
        content,
      });

      // Refresh messages
      if (currentConversation?.id === conversationId) {
        getConversation(conversationId);
      }

      return result;
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to send message");
      setError(error);
      console.error("Error sending message:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Upload an attachment and add it to a message
  const addAttachment = async (
    messageId: string,
    file: {
      type: "FILE" | "IMAGE" | "AUDIO" | "VIDEO";
      uri: string;
      name: string;
      size?: number;
    },
  ) => {
    setLoading(true);
    setError(null);
    try {
      const result = await ConversationService.addMessageAttachment({
        messageId,
        ...file,
      });

      // Refresh current conversation if needed
      if (currentConversation) {
        getConversation(currentConversation.id);
      }

      return result;
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to add attachment");
      setError(error);
      console.error("Error adding attachment:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Mark a conversation as read
  const markAsRead = async (conversationId: string) => {
    if (!user?.id) return null;

    try {
      const result = await ConversationService.markConversationAsRead(
        conversationId,
        user.id,
      );

      // Update local state to reflect read status
      setConversations((prevConversations) =>
        prevConversations.map((conv) =>
          conv.id === conversationId ? { ...conv, unread: false } : conv,
        ),
      );

      return result;
    } catch (err) {
      console.error("Error marking conversation as read:", err);
      return null;
    }
  };

  // Add a participant to a conversation
  const addParticipant = async (conversationId: string, userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await ConversationService.addParticipant(
        conversationId,
        userId,
      );

      // Refresh the current conversation if needed
      if (currentConversation?.id === conversationId) {
        getConversation(conversationId);
      }

      return result;
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to add participant");
      setError(error);
      console.error("Error adding participant:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Remove a participant from a conversation
  const removeParticipant = async (conversationId: string, userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await ConversationService.removeParticipant(
        conversationId,
        userId,
      );

      // Refresh the current conversation if needed
      if (currentConversation?.id === conversationId) {
        getConversation(conversationId);
      }

      return result;
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to remove participant");
      setError(error);
      console.error("Error removing participant:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // // Load conversations when the component mounts or user changes
  // useEffect(() => {
  //   if (user?.id) {
  //     fetchConversations();
  //   }
  // }, [user?.id, fetchConversations]);

  return {
    conversations,
    currentConversation,
    messages,
    loading,
    error,
    fetchConversations,
    getConversation,
    createConversation,
    sendMessage,
    addAttachment,
    markAsRead,
    addParticipant,
    removeParticipant,
  };
}
