import React, { useMemo } from "react";
import {
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  StyleSheet,
} from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  AnimatedStyle,
} from "react-native-reanimated";
import { verticalScale } from "react-native-size-matters";

import { Item } from "@/types/ScrollPicker";
import {
  ANIMATION_DURATION,
  CENTER_ITEM_HEIGHT,
  ADJACENT_ITEM_HEIGHT,
  MEDIUM_DISTANT_ITEM_HEIGHT,
  DISTANT_ITEM_HEIGHT,
} from "@/constants/ScrollPicker";

interface AnimatedItemProps {
  item: Item;
  index: number;
  isSelected: boolean;
  itemSize: number;
  gap: number;
  scrollPosition: SharedValue<number>;
  onPress: () => void;
  renderCustomItem?: (
    item: Item,
    index: number,
    isSelected: boolean,
    relativePosition: number,
    animatedStyle: AnimatedStyle<any>,
  ) => React.ReactNode;
  textStyle?: TextStyle;
  selectedTextStyle?: TextStyle;
  itemStyle?: ViewStyle;
}

export const AnimatedItem: React.FC<AnimatedItemProps> = React.memo(
  ({
    item,
    index,
    isSelected,
    itemSize,
    gap,
    scrollPosition,
    onPress,
    renderCustomItem,
    textStyle,
    selectedTextStyle,
    itemStyle,
  }) => {
    // Calculate item position once
    const itemCenterPosition = useMemo(() => {
      return index * (itemSize + gap) + itemSize / 2;
    }, [index, itemSize, gap]);

    // Create animated style using worklet
    const animatedStyle = useAnimatedStyle(() => {
      // Calculate the item's position relative to the scroll position
      const scrollPositionCenter = scrollPosition.value + itemSize / 2;
      const exactRelativePosition =
        (itemCenterPosition - scrollPositionCenter) / (itemSize + gap);
      const absPosition = Math.abs(exactRelativePosition);

      // Calculate animated height based on distance from center
      let targetHeight;
      if (absPosition < 0.5) {
        // Center item - tallest
        targetHeight = CENTER_ITEM_HEIGHT;
      } else if (absPosition < 1.5) {
        // Adjacent items - medium height
        targetHeight = ADJACENT_ITEM_HEIGHT;
      } else if (absPosition < 2.5) {
        // Further items - medium-short
        targetHeight = MEDIUM_DISTANT_ITEM_HEIGHT;
      } else {
        // Further items - shortest
        targetHeight = DISTANT_ITEM_HEIGHT;
      }

      // Use withTiming for smooth animation
      return {
        height: withTiming(targetHeight, {
          duration: ANIMATION_DURATION,
        }),
        opacity: interpolate(absPosition, [0, 3.5], [1, 0.6]),
        transform: [
          {
            scale: interpolate(absPosition, [0, 3.5], [1, 0.9]),
          },
        ],
      };
    });

    const relativePosition = useMemo(() => {
      return 0;
    }, []);

    return (
      <TouchableOpacity
        style={[
          styles.itemContainer,
          {
            width: itemSize,
            marginHorizontal: gap / 2,
          },
          itemStyle,
        ]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {renderCustomItem ? (
          renderCustomItem(
            item,
            index,
            isSelected,
            relativePosition,
            animatedStyle,
          )
        ) : (
          <Animated.View style={animatedStyle}>
            <Text
              style={[styles.item, textStyle, isSelected && selectedTextStyle]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.label}
            </Text>
          </Animated.View>
        )}
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 0,
    height: verticalScale(80),
  },
  item: {
    textAlign: "center",
    color: "#000",
    fontSize: 18,
  },
});
