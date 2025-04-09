import { RecommendedItemData } from "@/types/RecommendedItemData";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

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
  onPress,
}: RecommendedItemProps) => {
  // TODO: Remove this once we have the real data
  // images will be stored in bucket
  // data will point to the bucket
  const backgroundSource = item.backgroundImage || 
    (item.id === "rec1" ? require("assets/images/school-background.png") : 
    require("assets/images/ballet-background1.png"));
  
  const logoSource = item.logoImage || 
    (item.id === "rec1" ? require("assets/images/school-logo.png") : 
    require("assets/images/ballet-logo.png"));

  return (
    <View className="flex-1 rounded-sm" style={styles.container}>
      <TouchableOpacity
        className="rounded-2xl overflow-hidden"
        style={{
          marginHorizontal: scale(8),
          width: scale(screenWidth * 0.55),
          height: scale(screenWidth * 0.55 * 0.7),
          borderWidth: scale(6),
          borderColor: color,
        }}
        onPress={() => onPress?.(item)}
      >
        <View className="flex-1 relative">
          <View className="w-full h-full absolute">
            <Image
              source={backgroundSource}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

          {/* Semi-transparent overlay */}
          <View className="absolute bottom-0 left-0 right-0 bg-white opacity-50 h-1/3" />

          {/* Logo */}
          <Image
            source={logoSource}
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
                fontSize: screenWidth * 0.03,
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

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
