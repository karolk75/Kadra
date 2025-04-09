import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useEffect } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { scale, verticalScale } from "react-native-size-matters";

interface PickerItem {
  label: string;
  value: string;
}

interface DatePickerProps {
  title: string;
  selectedValue: string;
  items: PickerItem[];
  onSelect: (value: string) => void;
  isOpen?: boolean;
  togglePicker?: () => void;
}

export default function DatePicker({
  title,
  selectedValue,
  items,
  onSelect,
  isOpen = false,
  togglePicker,
}: DatePickerProps) {
  // Calculate picker height based on platform
  const pickerHeight = 230;

  // Animation shared values
  const pickerAnimatedHeight = useSharedValue(0);
  const pickerOpacity = useSharedValue(0);

  // Watch for isOpen changes from parent component
  useEffect(() => {
    if (isOpen) {
      // Animate opening
      pickerAnimatedHeight.value = withSpring(pickerHeight, {
        damping: 20, // More damping for less oscillation
        stiffness: 200, // Higher stiffness for quicker response
        mass: 0.8, // Lower mass for faster movement
        overshootClamping: false,
      });
      pickerOpacity.value = withTiming(1, {
        duration: 150, // Faster animation
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      });
    } else {
      // Animate closing
      pickerAnimatedHeight.value = withTiming(0, {
        duration: 150, // Faster animation
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      });
      pickerOpacity.value = withTiming(0, {
        duration: 100, // Faster animation
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      });
    }
  }, [isOpen]);

  const handleValueChange = (value: string) => {
    if (value !== selectedValue) {
      onSelect(value);
    }
  };

  // Create animated style
  const pickerStyle = useAnimatedStyle(() => {
    return {
      height: pickerAnimatedHeight.value,
      opacity: pickerOpacity.value,
      overflow: "hidden",
      zIndex: pickerOpacity.value > 0 ? 9999 : 0,
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
    };
  });

  return (
    <View style={styles.pickerContainer}>
      <TouchableOpacity style={styles.pickerTrigger} onPress={togglePicker}>
        <Text style={styles.valueText}>{selectedValue}</Text>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={scale(16)}
          color="#A1A4B2"
          style={styles.pickerIcon}
        />
      </TouchableOpacity>

      <Animated.View style={[styles.expandedPicker, pickerStyle]}>
        <View style={styles.pickerHeader}>
          <Text style={styles.pickerHeaderText}>{title}</Text>
          <TouchableOpacity onPress={togglePicker} style={styles.closeButton}>
            <Ionicons name="close" size={scale(20)} color="#333" />
          </TouchableOpacity>
        </View>
        <Picker
          selectedValue={selectedValue}
          onValueChange={handleValueChange}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          {items.map((item) => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    alignItems: "center",
    minWidth: scale(120),
    zIndex: 20,
    position: "relative",
  },
  pickerTrigger: {
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(5),
    borderRadius: scale(15),
    backgroundColor: "#f5f5f5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 8,
  },
  valueText: {
    fontSize: scale(16),
    fontFamily: "Poppins-Medium",
    color: "#89A8B2",
    marginRight: scale(5),
  },
  pickerIcon: {
    marginLeft: scale(3),
  },
  expandedPicker: {
    backgroundColor: "#f5f5f5",
    borderRadius: scale(15),
    width: scale(150),
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: verticalScale(5),
    zIndex: 20,
    position: "absolute",
  },
  pickerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: scale(10),
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  pickerHeaderText: {
    fontSize: scale(14),
    fontFamily: "Poppins-Medium",
    color: "#89A8B2",
  },
  closeButton: {
    padding: scale(3),
  },
  picker: {
    width: "100%",
    marginTop: verticalScale(-14),
  },
  pickerItem: {
    fontSize: scale(14),
    fontFamily: "Poppins-Medium",
    color: "#89A8B2",
  },
});
