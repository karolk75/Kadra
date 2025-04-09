import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import { verticalScale } from "react-native-size-matters";

import { AnimatedItem } from "./AnimatedItem";
import {
  DEFAULT_ROW_ITEMS,
  ANIMATION_DURATION,
} from "../../constants/ScrollPicker";
import { HorizontalScrollPickerProps, Item } from "../../types/ScrollPicker";

const { width } = Dimensions.get("window");

export type HorizontalScrollPickerRef = {
  moveTo: (index: number) => void;
};

/**
 * A horizontal scroll picker component with smooth animations and item snapping.
 * Supports custom item rendering and programmatic control.
 */
const HorizontalScrollPicker = forwardRef<
  HorizontalScrollPickerRef,
  HorizontalScrollPickerProps
>(
  (
    {
      rowItems = DEFAULT_ROW_ITEMS,
      containerStyle,
      itemStyle,
      textStyle,
      selectedTextStyle,
      items = [],
      onSelect,
      initialIdx = 0,
      renderCustomItem,
      gap = 2,
    },
    ref,
  ) => {
    // State management
    const [selected, setSelected] = useState(initialIdx);
    const [normalizedScrollPosition, setNormalizedScrollPosition] = useState(0);

    // Animation values
    const animatedScrollPosition = useSharedValue(0);

    // Refs for tracking scroll behavior
    const scrollViewRef = useRef<ScrollView>(null);
    const scrollOffset = useRef(0);
    const isParking = useRef(false);
    const isDirectClick = useRef(false);
    const isScrollingAfterDirectClick = useRef(false);
    const hasHandledScrollEnd = useRef(false);
    const directClickTargetIndex = useRef<number | null>(null);
    const isProgrammaticScroll = useRef(false);

    // Calculated dimensions and boundaries
    const { itemSize, minScrollPosition, maxScrollPosition, sideItems } =
      useMemo(() => {
        const calculatedItemSize = width / rowItems - gap;
        return {
          itemSize: calculatedItemSize,
          minScrollPosition: 0,
          maxScrollPosition: Math.max(
            0,
            (items.length - 1) * (calculatedItemSize + gap),
          ),
          sideItems: (rowItems - 1) / 2,
        };
      }, [rowItems, gap, items.length]);

    /**
     * Exposes the moveTo method to programmatically scroll to an item
     */
    useImperativeHandle(
      ref,
      () => ({
        moveTo: (index: number) => {
          if (items.length === 0) return;

          // Validate the index to ensure it's within bounds
          const validIndex = Math.max(0, Math.min(index, items.length - 1));

          // Only proceed if the index is different from the current selection
          // This prevents unnecessary scrolling and selection events
          if (validIndex === selected) return;

          isDirectClick.current = true;
          isScrollingAfterDirectClick.current = true;
          directClickTargetIndex.current = validIndex;
          hasHandledScrollEnd.current = false;
          isProgrammaticScroll.current = true;

          const newPosition = validIndex * (itemSize + gap);
          setSelected(validIndex);

          // Scroll to the position
          requestAnimationFrame(() => {
            scrollViewRef.current?.scrollTo({
              x: newPosition,
              y: 0,
              animated: true,
            });
            setNormalizedScrollPosition(newPosition);
            animatedScrollPosition.value = newPosition;

            // Reset flags after animation completes
            setTimeout(() => {
              isDirectClick.current = false;
              setTimeout(() => {
                isScrollingAfterDirectClick.current = false;
                directClickTargetIndex.current = null;
                isProgrammaticScroll.current = false;
              }, 200);
            }, ANIMATION_DURATION);
          });
        },
      }),
      [items, itemSize, gap, animatedScrollPosition, selected],
    );

    /**
     * Calculate the selected item index based on scroll position
     */
    const calculateSelectedItem = useCallback(() => {
      if (items.length === 0) return selected;

      const exactPosition = scrollOffset.current;
      const normalizedPosition = exactPosition + itemSize / 2;
      const idx = Math.floor(normalizedPosition / (itemSize + gap));
      return Math.max(0, Math.min(idx, items.length - 1));
    }, [itemSize, gap, items.length, selected]);

    /**
     * Ensure scroll position stays within bounds
     */
    const validateScrollPosition = useCallback(
      (position: number) => {
        return Math.max(
          minScrollPosition,
          Math.min(position, maxScrollPosition),
        );
      },
      [minScrollPosition, maxScrollPosition],
    );

    /**
     * Initialize scroll position when component mounts
     */
    const initializeScrollPosition = useCallback(() => {
      if (items.length === 0) {
        return;
      }

      const safeInitialIdx = Math.min(Math.max(0, selected), items.length - 1);
      onSelect(items[safeInitialIdx].value);
      const initialPos = safeInitialIdx * (itemSize + gap);

      scrollViewRef.current?.scrollTo({ x: initialPos, y: 0, animated: false });
      setNormalizedScrollPosition(initialPos);
      animatedScrollPosition.value = initialPos;
    }, [items.length, selected, itemSize, gap, animatedScrollPosition]);

    /**
     * Handle item selection based on scroll position
     */
    useEffect(() => {
      if (items.length === 0) {
        return;
      }

      // Skip automated selection during direct clicks
      if (isDirectClick.current || isScrollingAfterDirectClick.current) {
        return;
      }

      const timeoutId = setTimeout(() => {
        if (!isDirectClick.current && !isScrollingAfterDirectClick.current) {
          const selectedIndex = calculateSelectedItem();
          const endThreshold = itemSize * 0.75;

          if (scrollOffset.current <= minScrollPosition + endThreshold) {
            if (selected !== 0) {
              setSelected(0);
              onSelect(items[0].value);
            }
          } else if (scrollOffset.current >= maxScrollPosition - endThreshold) {
            if (selected !== items.length - 1) {
              setSelected(items.length - 1);
              onSelect(items[items.length - 1].value);
            }
          } else if (selectedIndex !== selected) {
            setSelected(selectedIndex);
            onSelect(items[selectedIndex].value);
          }
        }
      }, 150);

      return () => clearTimeout(timeoutId);
    }, [
      normalizedScrollPosition,
      items,
      calculateSelectedItem,
      itemSize,
      minScrollPosition,
      maxScrollPosition,
      selected,
      onSelect,
    ]);

    /**
     * Handle direct item selection via press
     */
    const handleItemPress = useCallback(
      (idx: number) => {
        isDirectClick.current = true;
        isScrollingAfterDirectClick.current = true;
        directClickTargetIndex.current = idx;
        hasHandledScrollEnd.current = false;
        isProgrammaticScroll.current = true;

        const newPosition = idx * (itemSize + gap);
        setSelected(idx);

        requestAnimationFrame(() => {
          scrollViewRef.current?.scrollTo({
            x: newPosition,
            y: 0,
            animated: true,
          });
          setNormalizedScrollPosition(newPosition);
          animatedScrollPosition.value = newPosition;

          // Reset flags after animation completes
          setTimeout(() => {
            isDirectClick.current = false;
            setTimeout(() => {
              isScrollingAfterDirectClick.current = false;
              directClickTargetIndex.current = null;
              isProgrammaticScroll.current = false;
            }, 200);
          }, ANIMATION_DURATION);
        });
      },
      [itemSize, gap, items, animatedScrollPosition],
    );

    /**
     * Handle scroll event
     */
    const handleScroll = useCallback(
      (event: any) => {
        const newOffset = event.nativeEvent.contentOffset.x;

        // Update the animated value
        animatedScrollPosition.value = newOffset;

        if (isDirectClick.current) {
          return;
        }

        hasHandledScrollEnd.current = false;

        if (Math.abs(newOffset - scrollOffset.current) > 1) {
          hasHandledScrollEnd.current = false;
        }

        // Store the raw offset even if it's out of bounds to better track user intent
        scrollOffset.current = newOffset;

        if (newOffset >= minScrollPosition && newOffset <= maxScrollPosition) {
          setNormalizedScrollPosition(newOffset);

          if (isScrollingAfterDirectClick.current) {
            return;
          }

          // Quick check for edges during fast scrolling
          const endThreshold = 20;
          if (newOffset <= minScrollPosition + endThreshold) {
            setSelected(0);
          } else if (newOffset >= maxScrollPosition - endThreshold) {
            setSelected(items.length - 1);
          } else if (!isDirectClick.current && !isParking.current) {
            const newSelectedIndex = calculateSelectedItem();
            if (newSelectedIndex !== selected) {
              setSelected(newSelectedIndex);
            }
          }
        } else {
          // Still update normalized position to track user intent, but clamp within valid range
          setNormalizedScrollPosition(
            Math.max(minScrollPosition, Math.min(newOffset, maxScrollPosition)),
          );

          // If scrolling beyond the maximum boundary, select the last item
          if (newOffset > maxScrollPosition) {
            setSelected(items.length - 1);
          }
          // If scrolling before the minimum boundary, select the first item
          else if (newOffset < minScrollPosition) {
            setSelected(0);
          }
        }
      },
      [
        minScrollPosition,
        maxScrollPosition,
        calculateSelectedItem,
        selected,
        items.length,
        animatedScrollPosition,
      ],
    );

    /**
     * Handle scroll begin event
     */
    const handleScrollBegin = useCallback(() => {
      if (!isDirectClick.current && !isScrollingAfterDirectClick.current) {
        isParking.current = false;
        hasHandledScrollEnd.current = false;
      }
    }, []);

    /**
     * Handle scroll end event
     */
    const handleScrollEnd = useCallback(
      (event: any) => {
        const contentOffset = event.nativeEvent.contentOffset.x;

        if (isDirectClick.current) {
          return;
        }

        // Handle scroll end after direct click
        if (
          isScrollingAfterDirectClick.current &&
          directClickTargetIndex.current !== null
        ) {
          const targetIdx = directClickTargetIndex.current;
          const targetPosition = targetIdx * (itemSize + gap);

          setSelected(targetIdx);

          // Call onSelect for programmatic scrolls since we removed it from moveTo
          if (isProgrammaticScroll.current) {
            onSelect(items[targetIdx].value);
          }

          scrollViewRef.current?.scrollTo({
            x: targetPosition,
            y: 0,
            animated: false,
          });
          setNormalizedScrollPosition(targetPosition);
          animatedScrollPosition.value = targetPosition;
          return;
        }

        // Prevent duplicate processing
        if (hasHandledScrollEnd.current) {
          return;
        }
        hasHandledScrollEnd.current = true;

        // Increase end threshold to better detect intent to scroll to boundaries
        const endThreshold = 50;

        // Check if user was trying to scroll beyond the max position
        // Use scrollOffset.current which tracks the actual position including out-of-bounds values
        const wasScrollingBeyondMax = scrollOffset.current > maxScrollPosition;

        // Handle boundary cases
        if (
          contentOffset <= minScrollPosition + endThreshold ||
          (wasScrollingBeyondMax === false &&
            contentOffset - minScrollPosition < endThreshold)
        ) {
          scrollViewRef.current?.scrollTo({
            x: minScrollPosition,
            y: 0,
            animated: false,
          });
          setNormalizedScrollPosition(minScrollPosition);
          animatedScrollPosition.value = minScrollPosition;
          setSelected(0);
          onSelect(items[0].value);
          return;
        } else if (
          contentOffset >= maxScrollPosition - endThreshold ||
          wasScrollingBeyondMax
        ) {
          scrollViewRef.current?.scrollTo({
            x: maxScrollPosition,
            y: 0,
            animated: false,
          });
          setNormalizedScrollPosition(maxScrollPosition);
          animatedScrollPosition.value = maxScrollPosition;
          setSelected(items.length - 1);
          onSelect(items[items.length - 1].value);
          return;
        }

        // Normal selection
        const selectedIndex = calculateSelectedItem();
        onSelect(items[selectedIndex].value);

        const exactPosition = selectedIndex * (itemSize + gap);
        const validPosition = validateScrollPosition(exactPosition);

        scrollViewRef.current?.scrollTo({
          x: validPosition,
          y: 0,
          animated: false,
        });
        setNormalizedScrollPosition(validPosition);
        animatedScrollPosition.value = validPosition;
      },
      [
        itemSize,
        gap,
        calculateSelectedItem,
        validateScrollPosition,
        minScrollPosition,
        maxScrollPosition,
        items,
        onSelect,
        animatedScrollPosition,
        selected,
      ],
    );

    /**
     * Handle drag end event
     */
    const handleDragEnd = useCallback(() => {
      if (isDirectClick.current || isScrollingAfterDirectClick.current) {
        return;
      }

      isParking.current = true;

      // Check if scrolling past max boundary
      let selectedIndex = calculateSelectedItem();

      // Adjust the selection if we're scrolling beyond boundaries
      const wasScrollingBeyondMax = scrollOffset.current > maxScrollPosition;
      const wasScrollingBeforeMin = scrollOffset.current < minScrollPosition;

      if (wasScrollingBeyondMax) {
        selectedIndex = items.length - 1;
      } else if (wasScrollingBeforeMin) {
        selectedIndex = 0;
      }

      const exactPosition = selectedIndex * (itemSize + gap);

      setTimeout(() => {
        if (isParking.current) {
          isParking.current = false;
          scrollViewRef.current?.scrollTo({
            y: 0,
            x: exactPosition,
            animated: false,
          });
          setNormalizedScrollPosition(exactPosition);
          animatedScrollPosition.value = exactPosition;
          setSelected(selectedIndex);
        }
      }, 100);
    }, [
      itemSize,
      gap,
      calculateSelectedItem,
      items.length,
      minScrollPosition,
      maxScrollPosition,
      animatedScrollPosition,
    ]);

    return (
      <View
        style={[
          styles.container,
          { width: rowItems * (itemSize + gap) },
          containerStyle,
        ]}
      >
        <ScrollView
          horizontal
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
          onLayout={() => {
            initializeScrollPosition();
          }}
          snapToInterval={itemSize + gap}
          snapToAlignment="center"
          decelerationRate={0.5}
          directionalLockEnabled={true}
          onScroll={handleScroll}
          onTouchEnd={handleDragEnd}
          onScrollEndDrag={handleDragEnd}
          scrollEventThrottle={16}
          onMomentumScrollBegin={handleScrollBegin}
          onMomentumScrollEnd={handleScrollEnd}
          bounces={false}
          shouldCancelWhenOutside={false}
          contentContainerStyle={{
            paddingLeft: (itemSize + gap) * sideItems,
            paddingRight: (itemSize + gap) * sideItems,
          }}
        >
          {items.map((item: Item, idx: number) => (
            <AnimatedItem
              key={`item-${idx}-${item.value}`}
              item={item}
              index={idx}
              isSelected={selected === idx}
              itemSize={itemSize}
              gap={gap}
              scrollPosition={animatedScrollPosition}
              onPress={() => handleItemPress(idx)}
              renderCustomItem={renderCustomItem}
              textStyle={textStyle}
              selectedTextStyle={selectedTextStyle}
              itemStyle={itemStyle}
            />
          ))}
        </ScrollView>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    flexDirection: "row",
  },
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
  selectedItem: {
    flex: 1,
    position: "absolute",
    top: 0,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 12,
  },
});

export default HorizontalScrollPicker;
