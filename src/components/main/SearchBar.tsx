import { Feather } from "@expo/vector-icons";
import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { scale } from "react-native-size-matters";

type SearchBarProps = {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  onIconPress?: () => void;
};

export const SearchBar = ({ 
  placeholder = "Wyszukaj...", 
  onChangeText,
  onIconPress 
}: SearchBarProps) => {
  return (
    <View
      style={{
        marginBottom: 24,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4.65,
        elevation: 8,
      }}
    >
      <View className="relative bg-white rounded-lg overflow-hidden border border-darkblue">
        <TextInput
          placeholder={placeholder}
          className="text-darkblue font-poppins-light"
          style={{
            fontSize: scale(16),
            paddingVertical: scale(10),
            paddingHorizontal: scale(16),
          }}
          onChangeText={onChangeText}
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