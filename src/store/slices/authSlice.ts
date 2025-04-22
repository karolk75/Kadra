import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  signIn as amplifySignIn,
  signUp as amplifySignUp,
  confirmSignUp as amplifyConfirmSignUp,
  resendSignUpCode as amplifyResendSignUpCode,
  signOut as amplifySignOut,
  fetchAuthSession,
  fetchUserAttributes,
  getCurrentUser,
} from 'aws-amplify/auth';
import { RootState } from '..';
import { UserAttributes, UserData, AuthError } from '@/types/Auth';

interface AuthState {
  user: UserData | null;
  attributes: UserAttributes | null;
  isAuthenticated: boolean;
  error: AuthError | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  attributes: null,
  isAuthenticated: false,
  error: null,
  isLoading: true, // Start with true to show loading on initial auth check
};

// Helper function to parse auth errors
const parseAuthError = (error: unknown): AuthError => {
  if (error instanceof Error) return error as AuthError;
  return {
    message: typeof error === "object" ? JSON.stringify(error) : String(error)
  };
};

// Create async thunks for authentication actions
export const signInUser = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { isSignedIn } = await amplifySignIn({ username: email, password });
      
      if (isSignedIn) {
        const userData = await getCurrentUser();
        const userObj = {
          id: userData.userId,
          email: userData.signInDetails?.loginId,
          username: userData.username,
        };

        const userAttributes = await fetchUserAttributes();
        const attributesObj = {
          id: userData.userId,
          email: userData.signInDetails?.loginId,
          username: userData.username,
          preferredName: userAttributes.preferred_username,
          familyName: userAttributes.family_name,
          phoneNumber: userAttributes.phone_number,
          profileImageUrl: userAttributes.profile_image_url,
        };

        return {
          user: userObj,
          attributes: attributesObj
        };
      }
      
      return rejectWithValue({ message: "Sign in failed" });
    } catch (error) {
      return rejectWithValue(parseAuthError(error));
    }
  }
);

export const signUpUser = createAsyncThunk(
  'auth/signUp',
  async ({ 
    email, 
    password, 
    firstName, 
    lastName, 
    phoneNumber 
  }: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
  }, { rejectWithValue }) => {
    try {
      await amplifySignUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            preferred_username: firstName,
            family_name: lastName,
            phone_number: phoneNumber,
          },
        },
      });
      return true;
    } catch (error) {
      return rejectWithValue(parseAuthError(error));
    }
  }
);

export const confirmSignUpUser = createAsyncThunk(
  'auth/confirmSignUp',
  async ({ email, code }: { email: string; code: string }, { rejectWithValue }) => {
    try {
      await amplifyConfirmSignUp({ username: email, confirmationCode: code });
      return true;
    } catch (error) {
      return rejectWithValue(parseAuthError(error));
    }
  }
);

export const resendSignUpCode = createAsyncThunk(
  'auth/resendCode',
  async (username: string, { rejectWithValue }) => {
    try {
      await amplifyResendSignUpCode({ username });
      return true;
    } catch (error) {
      return rejectWithValue(parseAuthError(error));
    }
  }
);

export const signOutUser = createAsyncThunk(
  'auth/signOut',
  async (_, { rejectWithValue }) => {
    try {
      await amplifySignOut({ global: true });
      return true;
    } catch (error) {
      return rejectWithValue(parseAuthError(error));
    }
  }
);

export const checkAuthState = createAsyncThunk(
  'auth/checkAuthState',
  async (_, { rejectWithValue }) => {
    try {
      // First check if we have a valid session - handle any potential errors
      const session = await fetchAuthSession().catch(() => ({ tokens: null }));
      
      if (!session.tokens) {
        // No valid tokens, return quickly
        return { isAuthenticated: false };
      }
      
      // Try to get user data - if this fails, the session is invalid
      try {
        // If we have tokens, fetch the user data
        const userData = await getCurrentUser();
        const userObj = {
          id: userData.userId,
          email: userData.signInDetails?.loginId,
          username: userData.username,
        };
  
        const userAttributes = await fetchUserAttributes();
        const attributesObj = {
          id: userData.userId,
          email: userData.signInDetails?.loginId,
          username: userData.username,
          preferredName: userAttributes.preferred_username,
          familyName: userAttributes.family_name,
          phoneNumber: userAttributes.phone_number,
          profileImageUrl: userAttributes.picture,
        };
  
        return {
          isAuthenticated: true,
          user: userObj,
          attributes: attributesObj
        };
      } catch (error) {
        // If user data fetch fails, session is invalid
        console.log("Failed to get user data:", error);
        return { isAuthenticated: false };
      }
    } catch (error) {
      console.log("Auth check error:", error);
      return { isAuthenticated: false };
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action: PayloadAction<UserData | null>) => {
      state.user = action.payload;
    },
    setAttributes: (state, action: PayloadAction<UserAttributes | null>) => {
      state.attributes = action.payload;
    },
    setError: (state, action: PayloadAction<AuthError | null>) => {
      state.error = action.payload;
    },
    resetAuth: () => {
      return { ...initialState, isLoading: false };
    },
  },
  extraReducers: (builder) => {
    // Handle checkAuthState
    builder
      .addCase(checkAuthState.pending, (state) => {
        // if silent auth is true, don't show loading
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuthState.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.isAuthenticated;
        state.user = action.payload.user || null;
        state.attributes = action.payload.attributes || null;
      })
      .addCase(checkAuthState.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
      })
      
    // Handle signIn
      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.attributes = action.payload.attributes;
        state.isAuthenticated = true;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as AuthError;
        state.isAuthenticated = false;
      })
      
      // Handle signUp
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as AuthError;
      })
      
      // Handle confirmSignUp
      .addCase(confirmSignUpUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(confirmSignUpUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(confirmSignUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as AuthError;
      })
      
      // Handle resendCode
      .addCase(resendSignUpCode.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resendSignUpCode.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resendSignUpCode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as AuthError;
      })
      
      // Handle signOut
      .addCase(signOutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.user = null;
        state.attributes = null;
        state.isAuthenticated = false;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as AuthError;
        // Still reset auth state even if signing out failed
        state.user = null;
        state.attributes = null;
        state.isAuthenticated = false;
      });
  }
});

export const { 
  setLoading, 
  setUser, 
  setAttributes, 
  setError,
  resetAuth
} = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const selectAttributes = (state: RootState) => state.auth.attributes;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectError = (state: RootState) => state.auth.error;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;

export default authSlice.reducer;