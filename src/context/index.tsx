import {
  fetchAuthSession,
} from "aws-amplify/auth";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import {
  confirmSignUpUser,
  refreshSession,
  resendSignUpCode,
  selectAttributes,
  selectError,
  selectIsLoading,
  selectSession,
  selectUser,
  signInUser,
  signOutUser,
  signUpUser,
} from "../store/slices/authSlice";
import { AuthError, SessionData, UserData } from "@/types/Auth";

interface AuthContextType {
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string
  ) => Promise<boolean>;
  confirmSignUp: (email: string, code: string) => Promise<boolean>;
  resendCode: (username: string) => Promise<void>;
  signOut: () => Promise<void>;
  session?: SessionData | null;
  user?: UserData | null;
  attributes?: UserData | null;
  isLoading: boolean;
  error?: AuthError | null;
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  // Use Redux selectors for state management
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const attributes = useAppSelector(selectAttributes);
  const session = useAppSelector(selectSession);
  const isLoading = useAppSelector(selectIsLoading);
  const reduxError = useAppSelector(selectError);

  // Convert Redux error to AuthError if present
  const error = reduxError ? (reduxError as AuthError) : null;

  // Refresh the session only when the component mounts (app starts)
  useEffect(() => {
    if (session && user) {
      dispatch(refreshSession());
    }
  }, [dispatch]); // Only depends on dispatch, which is stable

  const value = {
    signIn: async (email: string, password: string) => {
      const resultAction = await dispatch(signInUser({ email, password }));
      return !signInUser.rejected.match(resultAction);
    },
    signUp: async (
      email: string,
      password: string,
      firstName: string,
      lastName: string,
      phoneNumber: string
    ) => {
      const resultAction = await dispatch(
        signUpUser({ email, password, firstName, lastName, phoneNumber })
      );
      return !signUpUser.rejected.match(resultAction);
    },
    confirmSignUp: async (email: string, code: string) => {
      const resultAction = await dispatch(confirmSignUpUser({ email, code }));
      return !confirmSignUpUser.rejected.match(resultAction);
    },
    resendCode: async (username: string) => {
      await dispatch(resendSignUpCode(username));
    },
    signOut: async () => {
      await dispatch(signOutUser());
    },
    session,
    user,
    attributes,
    isLoading,
    error,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
