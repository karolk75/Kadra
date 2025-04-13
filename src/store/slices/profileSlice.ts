import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Example of non-sensitive user data
export interface ProfileState {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: boolean;
  lastSeen: string;
  // Could include other non-sensitive preferences
}

const initialState: ProfileState = {
  theme: 'system',
  language: 'en',
  notifications: true,
  lastSeen: new Date().toISOString(),
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    toggleNotifications: (state) => {
      state.notifications = !state.notifications;
    },
    updateLastSeen: (state) => {
      state.lastSeen = new Date().toISOString();
    },
  },
});

export const { 
  setTheme, 
  setLanguage, 
  toggleNotifications,
  updateLastSeen
} = profileSlice.actions;

export default profileSlice.reducer; 