import { THEME_COLORS_HEX } from "@/constants/ThemeColors";
import { formatDay } from "@/utils/utils";
import moment from "moment";
import React, { useCallback, useEffect, useRef } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { scale, verticalScale } from "react-native-size-matters";

// Enable layout animations for Android
if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface DateProps {
  date: moment.Moment;
  onSelectDate: (date: string) => void;
  selected: string | null;
  colorIndex: number;
  index?: number;
  visibleDatesCount?: number;
}

const DateComponent: React.FC<DateProps> = ({
  date,
  onSelectDate,
  selected,
  colorIndex,
  index = 0,
  visibleDatesCount = 0,
}) => {
  // Animation shared values
  const height = useSharedValue(verticalScale(60));
  const width = useSharedValue(scale(45));
  const marginTop = useSharedValue(verticalScale(20));
  const fontSize = useSharedValue(scale(18));

  // Previous selected state to detect changes
  const prevSelectedRef = useRef<string | null>(null);

  // Use moment to compare the date to today
  // If today, show 'Today', otherwise show day of the week e.g 'Mon', 'Tue', 'Wed'
  const day = formatDay(date);

  // Get the day number e.g 1, 2, 3, 4, 5, 6, 7
  const dayNumber = moment(date).format("D");

  // Get the full date e.g 2021-01-01 - we'll use this to compare the date to the selected date
  const fullDate = moment(date).format("YYYY-MM-DD");

  // Determine if this date is selected
  const isSelected = selected === fullDate;

  // Wrap the onSelectDate to make it safe for animation callbacks
  const handleSelectDate = useCallback(() => {
    onSelectDate(fullDate);
  }, [fullDate, onSelectDate]);

  // Calculate height and margin based on selection or distance from selected date
  const getStyleByPosition = () => {
    if (isSelected) {
      return {
        height: verticalScale(100),
        width: scale(55),
        marginTop: 0,
        fontSize: scale(26),
      };
    }

    // Check if we have a selected date in the current visible dates
    if (selected && visibleDatesCount > 0) {
      // Get the selected date's day of month (1-31)
      const selectedDay = moment(selected).date();

      // Check if selected date is from the same month
      const selectedMonth = moment(selected).month();
      const currentMonth = date.month();

      // Only apply varying heights if the selected date is in the current month view
      if (selectedMonth === currentMonth) {
        // Calculate the index of the selected date (0-based)
        const selectedIndex = selectedDay - 1;

        // Calculate distance from selected date
        const distance = Math.abs(index - selectedIndex);

        if (distance === 1) {
          return {
            height: verticalScale(80),
            width: scale(50),
            marginTop: verticalScale(10),
            fontSize: scale(22),
          };
        } else if (distance === 2) {
          return {
            height: verticalScale(70),
            width: scale(48),
            marginTop: verticalScale(15),
            fontSize: scale(20),
          };
        } else if (distance >= 3) {
          return {
            height: verticalScale(60),
            width: scale(45),
            marginTop: verticalScale(20),
            fontSize: scale(18),
          };
        }
      }
    }

    // Default style - uniform height when no selection in current month
    return {
      height: verticalScale(60),
      width: scale(45),
      marginTop: verticalScale(20),
      fontSize: scale(18),
    };
  };

  // Create animated styles
  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: height.value,
      width: width.value,
      marginTop: marginTop.value,
    };
  });

  const animatedTextStyles = useAnimatedStyle(() => {
    return {
      fontSize: fontSize.value,
      color: "#ffffff",
      fontWeight: isSelected ? "bold" : "normal",
    };
  });

  // Apply animations when selection changes
  useEffect(() => {
    // Only animate if selected state changed
    if (selected !== prevSelectedRef.current) {
      const newStyle = getStyleByPosition();

      // Configure spring animation properties
      const springConfig = {
        damping: 15,
        mass: 0.7,
        stiffness: 150,
        overshootClamping: false,
        restDisplacementThreshold: 0.005,
        restSpeedThreshold: 0.005,
      };

      // Animate to new values with spring physics
      height.value = withSpring(newStyle.height, springConfig);
      width.value = withSpring(newStyle.width, springConfig);
      marginTop.value = withSpring(newStyle.marginTop, springConfig);
      fontSize.value = withSpring(newStyle.fontSize, springConfig);

      // Update previous selected ref
      prevSelectedRef.current = selected;
    }
  }, [selected, index, date]);

  // Set initial values on mount
  useEffect(() => {
    const initialStyle = getStyleByPosition();
    height.value = initialStyle.height;
    width.value = initialStyle.width;
    marginTop.value = initialStyle.marginTop;
    fontSize.value = initialStyle.fontSize;
    prevSelectedRef.current = selected;
  }, []);

  return (
    <TouchableOpacity onPress={handleSelectDate} activeOpacity={0.7}>
      <Animated.View
        style={[
          styles.card,
          { backgroundColor: THEME_COLORS_HEX[colorIndex % 4] },
          animatedStyles,
        ]}
      >
        <Text
          style={[styles.dayText, isSelected && styles.selectedText]}
          className="font-poppins-bold"
        >
          {day}
        </Text>
        <View style={{ height: verticalScale(5) }} />
        <Animated.Text
          style={[animatedTextStyles]}
          className="font-poppins-bold"
        >
          {dayNumber}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default DateComponent;

const styles = StyleSheet.create({
  card: {
    borderRadius: scale(25),
    padding: scale(10),
    marginVertical: verticalScale(10),
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: scale(5),
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  touchable: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  dayText: {
    color: "#ffffff",
    fontSize: scale(12),
  },
  selectedText: {
    fontWeight: "bold",
    fontSize: scale(9),
  },
  dayNumber: {
    color: "#ffffff",
  },
  selectedDayNumber: {
    fontWeight: "bold",
  },
});
