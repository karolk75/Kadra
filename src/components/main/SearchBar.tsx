import { Feather } from "@expo/vector-icons";
import React from "react";
import { TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

type SearchBarProps = {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onIconPress?: () => void;
};

export const SearchBar = ({
  placeholder = "Wyszukaj...",
  value,
  onChangeText,
  onIconPress,
}: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <View className="relative bg-white rounded-lg overflow-hidden border border-darkblue">
        <TextInput
          placeholder={placeholder}
          className="text-darkblue font-poppins-light"
          style={styles.input}
          onChangeText={onChangeText}
          value={value}
          autoCorrect={false}
        />
        <TouchableOpacity
          className="absolute right-4 top-0 bottom-0 justify-center"
          onPress={onIconPress}
        >
          <Feather name="search" size={scale(24)} color="#89A8B2" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(5),
    marginBottom: verticalScale(15),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 8,
  },
  input: {
    fontSize: scale(16),
    paddingVertical: scale(10),
    paddingHorizontal: scale(16),
  },
});
