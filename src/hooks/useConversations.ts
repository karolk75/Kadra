import { useSession } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { ConversationService } from "@/services/ConversationService";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  readConversation,
  selectConversations,
  setConversations,
  setError,
  setLoading,
} from "@/store/slices/conversationsSlice";
import { ConversationWithDetails } from "@/types/Conversation";
import { useCallback } from "react";

export function useConversations() {
  const { user, isAuthenticated } = useSession();
  const { client } = useData();
  const dispatch = useAppDispatch();
  const conversationsService = new ConversationService(client);
  const conversations = useAppSelector(selectConversations);

  // Fetch all conversations for the current user
  const fetchConversations = useCallback(async () => {
    if (!user?.id || !isAuthenticated) return [];

    try {
      if (!conversations || conversations.length === 0) {
        dispatch(setLoading(true));
      }
      dispatch(setError(null));

      const fetchedConversations =
        await conversationsService.listUserConversations(user.id);

      dispatch(setConversations(fetchedConversations));
      return fetchedConversations;
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to fetch conversations");
      dispatch(setError(error));
      console.error("Error fetching conversations:", err);
      return [];
    } finally {
      dispatch(setLoading(false));
    }
  }, [user?.id]);

  const markConversationAsRead = useCallback(
    async (conversation: ConversationWithDetails) => {
      if (!user?.id || !isAuthenticated) return;

      const conversationParticipant = conversation.participants?.find(
        (p) => p.user.id === user.id
      );

      if (!conversationParticipant) return;

      try {
        await conversationsService.markConversationAsRead(
          conversationParticipant.id,
          user.id
        );
        dispatch(
          readConversation({ conversationId: conversation.id, userId: user.id })
        );
      } catch (err) {
        const error =
          err instanceof Error
            ? err
            : new Error("Failed to mark conversation as read");
        dispatch(setError(error));
        console.error("Error marking conversation as read:", err);
      }
    },
    [user?.id]
  );

  const updateLastMessage = useCallback(
    async (conversation: ConversationWithDetails, message: string) => {
      if (!user?.id || !isAuthenticated) return null;

      try {
        const updatedConversation =
          await conversationsService.updateLastMessage(
            conversation.id,
            message
          );

        await markConversationAsRead(conversation);

        // Refresh conversations after update
        await fetchConversations();

        return updatedConversation;
      } catch (err) {
        const error =
          err instanceof Error
            ? err
            : new Error("Failed to update conversation last message");
        dispatch(setError(error));
        console.error("Error updating conversation last message:", err);
        return null;
      }
    },
    [user?.id, fetchConversations]
  );

  return {
    conversations,
    fetchConversations,
    markConversationAsRead,
    updateLastMessage,
  };
}
