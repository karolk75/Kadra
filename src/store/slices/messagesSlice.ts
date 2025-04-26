import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { MessageWithDetails } from "@/types/Message";

interface MessagesState {
  messages: MessageWithDetails[];
  error: string | null;
  isLoading: boolean;
}

const initialState: MessagesState = {
  messages: [],
  error: null,
  isLoading: false,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      if (state.messages !== action.payload) {
        state.messages = action.payload;
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
  setMessages,
  setError,
  setLoading,
  resetAll,
} = messagesSlice.actions;

export const selectMessages = (state: RootState) =>
  state.messages.messages;
export const selectMessagesError = (state: RootState) =>
  state.messages.error;
export const selectMessagesLoading = (state: RootState) =>
  state.messages.isLoading;

export default messagesSlice.reducer;
