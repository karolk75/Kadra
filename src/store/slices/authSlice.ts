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
  JWT
} from 'aws-amplify/auth';
import { RootState } from '..';
import { UserAttributes, UserData, SessionData, AuthError } from '@/types/Auth';

interface AuthState {
  user: UserData | null;
  attributes: UserAttributes | null;
  session: SessionData | null;
  error: AuthError | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  attributes: null,
  session: null,
  error: null,
  isLoading: false,
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

        const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
        const sessionObj = {
          accessToken,
          idToken,
        };

        const userAttributes = await fetchUserAttributes();
        const attributesObj = {
          id: userData.userId,
          email: userData.signInDetails?.loginId,
          username: userData.username,
          preferredName: userAttributes.preferred_username,
          familyName: userAttributes.family_name,
          phoneNumber: userAttributes.phone_number,
          avatar: require("assets/images/foto_boy.png"),
        };

        return {
          user: userObj,
          session: sessionObj,
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

export const refreshSession = createAsyncThunk(
  'auth/refreshSession',
  async (_, { rejectWithValue }) => {
    try {
      const authSession = await fetchAuthSession({ forceRefresh: true });
      
      return {
        identityId: authSession.identityId,
        userSub: authSession.userSub,
        tokens: authSession.tokens ? {
          // Extract only serializable parts from JWT objects
          accessToken: authSession.tokens.accessToken ? {
            payload: authSession.tokens.accessToken.payload
          } : undefined,
          idToken: authSession.tokens.idToken ? {
            payload: authSession.tokens.idToken.payload
          } : undefined
        } : undefined
      };
    } catch (error) {
      return rejectWithValue(parseAuthError(error));
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
    setSession: (state, action: PayloadAction<{accessToken?: JWT; idToken?: JWT} | null>) => {
      if (action.payload === null) {
        state.session = null;
        return;
      }
      
      // Extract only serializable parts from JWT objects
      state.session = {
        accessToken: action.payload.accessToken ? {
          payload: action.payload.accessToken.payload
        } : undefined,
        idToken: action.payload.idToken ? {
          payload: action.payload.idToken.payload
        } : undefined
      };
    },
    setError: (state, action: PayloadAction<AuthError | null>) => {
      state.error = action.payload;
    },
    resetAuth: (state) => {
      state.user = null;
      state.session = null;
      state.attributes = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle signIn
    builder
      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        
        // Extract only serializable parts from JWT objects
        const sessionPayload = action.payload.session;
        state.session = {
          accessToken: sessionPayload.accessToken ? {
            payload: sessionPayload.accessToken.payload
          } : undefined,
          idToken: sessionPayload.idToken ? {
            payload: sessionPayload.idToken.payload
          } : undefined
        };
        
        state.attributes = action.payload.attributes;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as AuthError;
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
        return initialState; // Reset entire state to initial values
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as AuthError;
        // Still reset auth state even if signing out failed
        state.user = null;
        state.session = null;
        state.attributes = null;
      })
      
      // Handle refresh session
      .addCase(refreshSession.fulfilled, (state, action) => {
        if (action.payload.tokens) {
          const { accessToken, idToken } = action.payload.tokens;
          state.session = {
            accessToken: accessToken || undefined,
            idToken: idToken || undefined
          };
          state.error = null;
        }
      });
  }
});

export const { 
  setLoading, 
  setUser, 
  setAttributes, 
  setSession, 
  setError,
  resetAuth
} = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const selectAttributes = (state: RootState) => state.auth.attributes;
export const selectSession = (state: RootState) => state.auth.session;
export const selectError = (state: RootState) => state.auth.error;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;

export default authSlice.reducer;