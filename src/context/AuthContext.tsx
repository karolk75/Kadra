import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import {
  confirmSignUpUser,
  checkAuthState,
  resendSignUpCode,
  selectAttributes,
  selectError,
  selectIsLoading,
  selectIsAuthenticated,
  selectUser,
  signInUser,
  signOutUser,
  signUpUser,
} from "../store/slices/authSlice";
import { AuthError, UserData } from "@/types/Auth";
import { router } from "expo-router";

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
  refreshSession: () => Promise<void>;
  user?: UserData | null;
  attributes?: UserData | null;
  isAuthenticated: boolean;
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
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectIsLoading);
  const reduxError = useAppSelector(selectError);

  // Convert Redux error to AuthError if present
  const error = reduxError ? (reduxError as AuthError) : null;

  // Check authentication state when the component mounts
  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);

  const value = {
    signIn: async (email: string, password: string) => {
      const resultAction = await dispatch(signInUser({ email, password }));
      const success = !signInUser.rejected.match(resultAction);
      
      if (success) {
        // If sign-in was successful, navigate to authenticated routes
        router.replace("/(auth)/(tabs)");
      }
      
      return success;
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
      // When signing out, navigate to public routes
      router.replace("/(public)/pre-login");
    },
    refreshSession: async () => {
      await dispatch(checkAuthState());
    },
    isAuthenticated,
    user,
    attributes,
    isLoading,
    error,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
