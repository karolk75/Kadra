import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
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
      style={styles.questionText}
      className="text-[#9c9c9c] mr-1 font-poppins-light"
    >
      {question}
    </Text>
    <TouchableOpacity onPress={onPress}>
      <Text
        style={styles.linkText}
        className="text-darkblue font-poppins-bold"
      >
        {linkText}
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  questionText: {
    fontSize: scale(14)
  },
  linkText: {
    fontSize: scale(14)
  }
});
