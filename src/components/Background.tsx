import React from "react";
import { Dimensions, View } from "react-native";

type AuthBackgroundProps = {
  BackgroundComponent: React.ComponentType<any>;
};

export const Background: React.FC<AuthBackgroundProps> = ({
  BackgroundComponent,
}) => {
  const { width, height } = Dimensions.get("window");
  return (
    <View className="absolute w-full h-full">
      <BackgroundComponent
        width={width}
        height={height}
        preserveAspectRatio="xMinYMin slice"
      />
    </View>
  );
};
