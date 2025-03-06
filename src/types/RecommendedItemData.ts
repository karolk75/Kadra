import { ImageSourcePropType } from "react-native";

export type RecommendedItemData = {
    id: number;
    title: string;
    subtitle: string;
    backgroundImage: ImageSourcePropType;
    logoImage: ImageSourcePropType;
  };