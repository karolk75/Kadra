import { ImageSourcePropType } from "react-native";

export interface UserData {
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
  profileImageUrl?: string;
}

export interface SessionData {
  accessToken?: {
    payload: Record<string, any>;
    // Exclude non-serializable methods like toString
  };
  idToken?: {
    payload: Record<string, any>;
    // Exclude non-serializable methods like toString
  };
}

export interface AuthError {
  message: string;
  code?: string;
}
