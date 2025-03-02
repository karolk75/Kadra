import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { scale } from "react-native-size-matters";

type BottomLinkProps = {
  question: string;
  linkText: string;
  onPress: () => void;
};

export const BottomLink: React.FC<BottomLinkProps> = ({
  question,
  linkText,
  onPress,
}) => (
  <View className="flex-row justify-center mt-4">
    <Text
      style={{ fontSize: scale(14) }}
      className="text-[#9c9c9c] mr-1 font-poppins-light"
    >
      {question}
    </Text>
    <TouchableOpacity onPress={onPress}>
      <Text
        style={{ fontSize: scale(14) }}
        className="text-darkblue font-poppins-bold"
      >
        {linkText}
      </Text>
    </TouchableOpacity>
  </View>
);
