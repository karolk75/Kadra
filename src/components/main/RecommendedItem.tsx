import React from "react";
import { Image, Text, TouchableOpacity, View, ImageSourcePropType } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

export type RecommendedItemData = {
  id: number;
  title: string;
  subtitle: string;
  backgroundImage: ImageSourcePropType;
  logoImage: ImageSourcePropType;
};

type RecommendedItemProps = {
  item: RecommendedItemData;
  color: string;
  screenWidth: number;
  onPress?: (item: RecommendedItemData) => void;
};

export const RecommendedItem = ({
  item,
  color,
  screenWidth,
  onPress
}: RecommendedItemProps) => {
  return (
    <View
      className="flex-1 rounded-sm"
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
      }}
    >
      <TouchableOpacity
        className={`rounded-2xl overflow-hidden border-${color}`}
        style={{
          marginHorizontal: scale(8),
          width: scale(screenWidth * 0.55),
          height: scale(screenWidth * 0.55 * 0.7),
          borderWidth: scale(6),
        }}
        onPress={() => onPress?.(item)}
      >
        <View className="flex-1 relative">
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          >
            <Image
              source={item.backgroundImage}
              style={{
                width: "100%",
                height: "100%",
              }}
              resizeMode="cover"
            />
          </View>

          {/* Semi-transparent overlay */}
          <View
            className="absolute bottom-0 left-0 right-0 bg-white opacity-50"
            style={{ height: "30%" }}
          />

          {/* Logo */}
          <Image
            source={item.logoImage}
            className="absolute rounded-full z-10"
            style={{
              width: scale(screenWidth * 0.12),
              height: scale(screenWidth * 0.12),
              bottom: verticalScale(screenWidth * 0.01),
              left: scale(screenWidth * 0.01),
            }}
          />

          {/* Text content */}
          <View
            className="absolute z-10"
            style={{
              bottom: verticalScale(screenWidth * 0.03),
              left: scale(screenWidth * 0.15),
              right: scale(screenWidth * 0.02),
            }}
          >
            <Text
              className="font-poppins-bold"
              style={{
                fontSize: screenWidth * 0.030,
                lineHeight: screenWidth * 0.035,
              }}
              numberOfLines={1}
            >
              {item.title}
            </Text>
            <Text
              style={{
                fontSize: screenWidth * 0.027,
                lineHeight: screenWidth * 0.03,
              }}
              numberOfLines={1}
            >
              {item.subtitle}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}; 