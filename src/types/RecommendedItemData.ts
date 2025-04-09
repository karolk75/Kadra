import { ImageSourcePropType } from "react-native";

export type RecommendedItemData = {
  id: string | number;
  title: string;
  subtitle: string;
  backgroundImage?: ImageSourcePropType;
  logoImage?: ImageSourcePropType;
  // Support for new data structure
  description?: string;
  category?: string;
  backgroundImageUrl?: string;
  logoUrl?: string;
  locationId?: string | null;
  relatedEntityType?: string;
  relatedEntityId?: string;
  priority?: number;
  expirationDate?: string;
  createdAt?: string;
  updatedAt?: string;
};
