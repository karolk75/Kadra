import { useSession } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { MessageService } from "@/services/MessageService";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectConversations, setConversations, setError, setLoading } from "@/store/slices/conversationsSlice";
import { selectMessages, setMessages } from "@/store/slices/messagesSlice";
import { useCallback } from "react";
import { useConversations } from "./useConversations";
import { ConversationWithDetails } from "./useConversations";
export function useMessages() {
  const { user, isAuthenticated } = useSession();
  const { client } = useData();
  const dispatch = useAppDispatch();
  const messagesService = new MessageService(client);
  const messages = useAppSelector(selectMessages);
  const { updateLastMessage } = useConversations();

  const conversations = useAppSelector(selectConversations);
  
  // Fetch all conversations for the current user
  const fetchMessages = useCallback(
    async (conversationId: string) => {
      if (!user?.id || !isAuthenticated) return [];

      try {
        dispatch(setLoading(true));
        dispatch(setError(null));

        const fetchedMessages =
          await messagesService.listMessages(conversationId);

        // Sort messages by createdAt
        fetchedMessages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

        dispatch(setMessages(fetchedMessages));
        return fetchedMessages;
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Failed to fetch messages");
        dispatch(setError(error));
        console.error("Error fetching messages:", err);
        return [];
      } finally {
        dispatch(setLoading(false));
      }
    },
    [user?.id]
  );

  // Send a message to a conversation
  const sendMessage = useCallback(
    async (
      conversation: ConversationWithDetails,
      content: string,
      attachments?: Array<{
        type: "IMAGE" | "FILE" | "AUDIO" | "VIDEO";
        uri: string;
        name: string;
        size?: number;
      }>
    ) => {
      if (!user?.id || !isAuthenticated) return null;

      try {
        
        const newMessage = await messagesService.sendMessage(
          conversation.id,
          user.id,
          content,
          attachments
        );
        
        if (newMessage) {
          // Update the messages in Redux
          dispatch(setMessages([...messages, newMessage]));
          
          // Update the conversation's lastMessage
          if (updateLastMessage) {
            await updateLastMessage(conversation, newMessage.content);
          }
        }
        
        return newMessage;
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Failed to send message");
        dispatch(setError(error));
        console.error("Error sending message:", err);
        return null;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [user?.id, messages, updateLastMessage]
  );

  return {
    messages,
    fetchMessages,
    sendMessage,
  };
}
