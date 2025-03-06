import { ScrollView, Text, View, StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

import { THEME_COLORS_HEX } from "@/constants/ThemeColors";
import { RecommendedItemData } from "@/types/RecommendedItemData";
import { RecommendedItem } from "./RecommendedItem";

type RecommendedSectionProps = {
  title?: string;
  items: RecommendedItemData[];
  screenWidth: number;
  onItemPress?: (item: RecommendedItemData) => void;
};

export const RecommendedSection = ({
  title = "Rekomendowane dla Ciebie",
  items,
  screenWidth,
  onItemPress,
}: RecommendedSectionProps) => {
  return (
    <View className="mb-6">
      <Text
        className="font-bold"
        style={styles.sectionTitle}
        numberOfLines={1}
      >
        {title}
      </Text>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {items.map((item, index) => (
          <RecommendedItem
            key={item.id}
            item={item}
            color={THEME_COLORS_HEX[index % items.length]}
            screenWidth={screenWidth}
            onPress={onItemPress}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: scale(18),
    marginLeft: scale(10),
    marginTop: verticalScale(20),
    marginBottom: verticalScale(5),
  },
  scrollContent: {
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(15),
  },
});
