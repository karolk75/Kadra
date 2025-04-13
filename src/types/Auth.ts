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
  // TODO: change it to url and set to s3 bucket where avatar is stored
  avatar: ImageSourcePropType;
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
