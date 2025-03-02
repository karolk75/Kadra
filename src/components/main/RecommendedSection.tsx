import React from "react";
import { ScrollView, Text, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

import { RecommendedItem, RecommendedItemData } from "./RecommendedItem";

type RecommendedSectionProps = {
  title?: string;
  items: RecommendedItemData[];
  colors: string[];
  screenWidth: number;
  onItemPress?: (item: RecommendedItemData) => void;
};

export const RecommendedSection = ({
  title = "Rekomendowane dla Ciebie",
  items,
  colors,
  screenWidth,
  onItemPress
}: RecommendedSectionProps) => {
  return (
    <View className="mb-6">
      <Text
        className="font-bold"
        style={{
          fontSize: scale(18),
          marginLeft: scale(10),
          marginTop: verticalScale(20),
          marginBottom: verticalScale(5),
        }}
        numberOfLines={1}
      >
        {title}
      </Text>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: scale(10),
          paddingVertical: verticalScale(15),
        }}
      >
        {items.map((item, index) => {
          const color = colors[index % colors.length];
          return (
            <RecommendedItem
              key={item.id}
              item={item}
              color={color}
              screenWidth={screenWidth}
              onPress={onItemPress}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}; 