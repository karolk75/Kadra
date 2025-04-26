import { ConversationWithDetails } from "@/types/Conversation";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

interface ConversationsState {
  conversations: ConversationWithDetails[];
  selectedConversation: ConversationWithDetails | null;
  error: string | null;
  isLoading: boolean;
}

const initialState: ConversationsState = {
  conversations: [],
  selectedConversation: null,
  error: null,
  isLoading: false,
};

const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    setConversations: (state, action) => {
      if (state.conversations !== action.payload) {
        state.conversations = action.payload;
      }
    },
    setSelectedConversation: (state, action) => {
      if (state.selectedConversation !== action.payload) {
        state.selectedConversation = action.payload;
      }
    },
    readConversation: (state, action) => {
      const conversation = state.conversations.find(
        (c) => c.id === action.payload.conversationId
      );
      if (conversation) {
        const participant = conversation.participants?.find(
          (p) => p.user.id === action.payload.userId
        );
        if (participant) {
          participant.lastReadAt = new Date().toISOString();
        }
      }
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    resetAll: () => {
      return { ...initialState };
    },
  },
});

export const {
  setConversations,
  setSelectedConversation,
  readConversation,
  setError,
  setLoading,
  resetAll,
} = conversationsSlice.actions;

export const selectConversations = (state: RootState) =>
  state.conversations.conversations;
export const selectSelectedConversation = (state: RootState) =>
  state.conversations.selectedConversation;
export const selectConversationsError = (state: RootState) =>
  state.conversations.error;
export const selectConversationsLoading = (state: RootState) =>
  state.conversations.isLoading;

export default conversationsSlice.reducer;
