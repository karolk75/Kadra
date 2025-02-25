import React from "react";
import { TextInput, TextInputProps } from "react-native";
import { scale } from "react-native-size-matters";

export const AuthInput: React.FC<TextInputProps> = (props) => (
  <TextInput
    {...props}
    style={[
      {
        borderRadius: scale(8),
        padding: scale(14),
        fontSize: scale(14),
      },
      props.style,
    ]}
    placeholderTextColor="#9c9c9c"
    className="
      bg-[#F2F3F7]
      text-[#111] 
      font-poppins-light 
      shadow-sm
    "
  />
);
