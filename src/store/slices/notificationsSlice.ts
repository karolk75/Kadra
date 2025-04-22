import { Notification } from "@/types/Notification";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

interface NotificationsState {
  notifications: Notification[];
  error: string | null;
  isLoading: boolean;
}

const initialState: NotificationsState = {
  notifications: [],
  error: null,
  isLoading: false,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      if (state.notifications !== action.payload) {
        state.notifications = action.payload;
      }
    },
    updateNotifications: (state, action) => {
      state.notifications = state.notifications
        ? state.notifications.map((notification) =>
            notification.id === action.payload.id
              ? action.payload
              : notification,
          )
        : [];
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
  setNotifications,
  updateNotifications,
  setError,
  setLoading,
  resetAll,
} = notificationsSlice.actions;

export const selectNotifications = (state: RootState) =>
  state.notifications.notifications;
export const selectNotificationsLoading = (state: RootState) =>
  state.notifications.isLoading;
export const selectNotificationsError = (state: RootState) =>
  state.notifications.error;

export default notificationsSlice.reducer;
