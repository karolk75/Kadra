import { TextStyle, ViewStyle } from "react-native";
import { AnimatedStyle } from "react-native-reanimated";

/**
 * Individual item structure for the scroll picker
 */
export interface Item {
  /**
   * Text displayed for the item
   */
  label: string;
  
  /**
   * Value associated with the item
   */
  value: any;
}

/**
 * Props for the HorizontalScrollPicker component
 */
export interface HorizontalScrollPickerProps {
  /**
   * Number of items visible in a row
   * @default 7
   */
  rowItems?: number;
  
  /**
   * Custom style for the container
   */
  containerStyle?: ViewStyle;
  
  /**
   * Custom style for each item
   */
  itemStyle?: ViewStyle;
  
  /**
   * Custom style for the text of each item
   */
  textStyle?: TextStyle;
  
  /**
   * Custom style for the text of the selected item
   */
  selectedTextStyle?: TextStyle;
  
  /**
   * Array of items to display in the picker
   */
  items: Item[];
  
  /**
   * Callback function called when an item is selected
   * @param value - The value of the selected item
   */
  onSelect: (value: any) => void;
  
  /**
   * Initial selected item index
   * @default 0
   */
  initialIdx: number;
  
  /**
   * Optional custom render function for items
   * @param item - The item to render
   * @param index - Index of the item in the array
   * @param isSelected - Whether the item is currently selected
   * @param relativePosition - Position relative to the center (0 = center)
   * @param animatedStyle - Pre-calculated animated style that can be applied
   */
  renderCustomItem?: (
    item: Item,
    index: number,
    isSelected: boolean,
    relativePosition: number,
    animatedStyle: AnimatedStyle<any>
  ) => React.ReactNode;
  
  /**
   * Gap between items in pixels
   * @default 2
   */
  gap?: number;
} 