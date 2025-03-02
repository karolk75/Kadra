import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

type StarRatingProps = {
  title?: string;
  maxStars?: number;
  rating: number;
  onRatingChange: (rating: number) => void;
};

export const StarRating = ({
  title = "Oceń nas!",
  maxStars = 5,
  rating,
  onRatingChange
}: StarRatingProps) => {
  return (
    <View 
      className="items-center" 
      style={{ 
        marginBottom: verticalScale(40)
      }}
    >
      <Text 
        className="text-darkblue font-poppins-bold"
        style={{ 
          fontSize: scale(20), 
          marginBottom: verticalScale(10) 
        }}
        numberOfLines={1}
      >
        {title}
      </Text>
      <View className="flex-row">
        {Array.from({ length: maxStars }, (_, index) => index + 1).map((star) => (
          <TouchableOpacity 
            key={star} 
            onPress={() => onRatingChange(star)}
            style={{ 
              marginHorizontal: scale(4) 
            }}
          >
            <Feather 
              name="star" 
              size={scale(28)} 
              color={star <= rating ? "#FFD700" : "#D3D3D3"} 
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}; 