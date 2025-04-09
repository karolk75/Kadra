import {
  confirmSignUp,
  fetchAuthSession,
  fetchUserAttributes,
  getCurrentUser,
  JWT,
  resendSignUpCode,
  signIn,
  signOut,
  signUp,
} from "aws-amplify/auth";
import React from "react";
import { useStorageState } from "./useStorageState";

type AuthError = Error & { code?: string };

interface UserData {
  id: string;
  username?: string;
  email?: string;
  preferredName?: string;
}

export interface UserAttributes {
  id: string;
  email?: string;
  preferredName?: string;
  familyName?: string;
  phoneNumber?: string;
}

interface SessionData {
  accessToken?: JWT;
  idToken?: JWT;
}

interface AuthContextType {
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
  ) => Promise<boolean>;
  confirmSignUp: (email: string, code: string) => Promise<boolean>;
  resendCode: (username: string) => Promise<void>;
  signOut: () => Promise<void>;
  session?: SessionData | null;
  user?: UserData | null;
  isLoading: boolean;
  error?: AuthError | null;
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

const parseAuthError = (error: unknown): AuthError => {
  if (error instanceof Error) return error;
  return new Error(
    typeof error === "object" ? JSON.stringify(error) : String(error),
  );
};

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
  const [session, setSession, sessionLoading] =
    useStorageState<SessionData>("session");
  const [user, setUser, userLoading] = useStorageState<UserData>("user");
  const [attributes, setAttributes] =
    useStorageState<UserAttributes>("attributes");
  const [error, setError] = React.useState<AuthError | null>(null);

  const isLoading = sessionLoading || userLoading;

  if (session && user) fetchAuthSession({ forceRefresh: true });

  const handleAuthError = (error: unknown): AuthError => {
    const parsedError = parseAuthError(error);
    setError(parsedError);
    console.error(parsedError);
    return parsedError;
  };

  const value = {
    signIn: async (email: string, password: string) => {
      try {
        const { isSignedIn } = await signIn({ username: email, password });
        if (isSignedIn) {
          const userData = await getCurrentUser();
          const userObj = {
            id: userData.userId,
            email: userData.signInDetails?.loginId,
            username: userData.username,
          };

          const { accessToken, idToken } =
            (await fetchAuthSession()).tokens ?? {};
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
          };

          setSession(sessionObj);
          setUser(userObj);
          setAttributes(attributesObj);
          return true;
        }
        return false;
      } catch (error) {
        handleAuthError(error);
        // if (parsedError.name === "UserAlreadyAuthenticatedException") {
        //   console.log("User already authenticated");
        //   await signOut();
        // }
        return false;
      }
    },
    signUp: async (
      email: string,
      password: string,
      firstName: string,
      lastName: string,
      phoneNumber: string,
    ) => {
      try {
        await signUp({
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
        handleAuthError(error);
        return false;
      }
    },
    confirmSignUp: async (email: string, code: string) => {
      try {
        await confirmSignUp({ username: email, confirmationCode: code });
        return true;
      } catch (error) {
        handleAuthError(error);
        return false;
      }
    },
    resendCode: async (username: string) => {
      try {
        await resendSignUpCode({ username });
      } catch (error) {
        handleAuthError(error);
      }
    },
    signOut: async () => {
      try {
        await signOut({ global: true });
      } catch (error) {
        handleAuthError(error);
      } finally {
        setSession(null);
        setUser(null);
      }
    },
    session,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
