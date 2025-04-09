import React, { useRef, useState, useEffect, ReactNode } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");
const DEFAULT_ROW_ITEMS = 5;

interface Item {
  label: string;
  value: any;
}

interface HorizontalScrollPickerProps {
  rowItems?: number;
  containerStyle?: ViewStyle;
  itemStyle?: ViewStyle;
  selectorStyle?: ViewStyle;
  textStyle?: TextStyle;
  selectedTextStyle?: TextStyle;
  items: Item[];
  onSelect: (value: any) => void;
  initialIdx: number;
  renderCustomItem?: (
    item: Item,
    index: number,
    isSelected: boolean,
  ) => ReactNode;
}

const HorizontalScrollPicker: React.FC<HorizontalScrollPickerProps> = ({
  rowItems = DEFAULT_ROW_ITEMS,
  containerStyle,
  itemStyle,
  selectorStyle,
  textStyle,
  selectedTextStyle,
  items = [],
  onSelect,
  initialIdx = 0,
  renderCustomItem,
}) => {
  const size = width / rowItems;
  const [selected, setSelected] = useState(initialIdx);
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollOffset = useRef(0);
  const isParking = useRef(false);

  useEffect(() => {
    // Set initial scroll position when component mounts
    const timeout = setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        x: initialIdx * size,
        y: 0,
        animated: false,
      });
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  const calculateLayout = () => {
    scrollViewRef.current?.scrollTo({
      x: initialIdx * size,
      y: 0,
      animated: false,
    });
  };

  const renderItem = (item: Item, idx: number) => {
    const isSelected = selected === idx;

    if (renderCustomItem) {
      return (
        <View
          key={`item-${idx}-${item.value}`}
          style={[
            styles.itemContainer,
            {
              width: size,
            },
            itemStyle,
          ]}
        >
          {renderCustomItem(item, idx, isSelected)}
        </View>
      );
    }

    return (
      <View
        key={`item-${idx}-${item.value}`}
        style={[
          styles.itemContainer,
          {
            width: size,
          },
          itemStyle,
        ]}
      >
        <Text style={[styles.item, textStyle, isSelected && selectedTextStyle]}>
          {item.label}
        </Text>
      </View>
    );
  };

  const handleScroll = (event: any) => {
    scrollOffset.current = event.nativeEvent.contentOffset.x;
  };

  const handleParking = () => {
    isParking.current = true;

    setTimeout(() => {
      if (isParking.current) {
        const selectedIndex = selectItem();
        isParking.current = false;
        scrollViewRef.current?.scrollTo({
          y: 0,
          x: size * selectedIndex,
          animated: true,
        });
      }
    }, 150);
  };

  const cancelParking = () => {
    isParking.current = false;
  };

  const selectItem = () => {
    const idx = Math.abs(Math.round(scrollOffset.current / size));
    const selectedIndex = idx >= items.length ? items.length - 1 : idx;

    setSelected(selectedIndex);
    onSelect(items[selectedIndex].value);
    return selectedIndex;
  };

  const sideItems = (rowItems - 1) / 2;

  return (
    <View
      style={[
        styles.timelineContainer,
        { width: rowItems * size },
        containerStyle,
      ]}
    >
      <View
        style={[
          styles.selectedItem,
          {
            left: sideItems * size,
            width: size,
          },
          selectorStyle,
        ]}
      />
      <ScrollView
        horizontal
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        onLayout={calculateLayout}
        snapToInterval={size}
        onScroll={handleScroll}
        onTouchEnd={handleParking}
        onScrollEndDrag={handleParking}
        scrollEventThrottle={16}
        onMomentumScrollBegin={cancelParking}
        onMomentumScrollEnd={selectItem}
        shouldCancelWhenOutside={false}
        contentContainerStyle={{
          paddingLeft: size * sideItems,
          paddingRight: size * sideItems,
        }}
      >
        {items.map((item, idx) => renderItem(item, idx))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  timelineContainer: {
    flexGrow: 0,
    flexDirection: "row",
  },
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 0,
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
