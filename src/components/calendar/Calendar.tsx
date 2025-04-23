import {
  createSpecificDate,
  DATE_FORMATS,
  formatDate,
  getCurrentYear,
  getDaysInMonthForDate,
  getDisplayMonthName,
  getMonthNames,
  getMonthNumber,
} from "@/utils/date-fns-utils";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
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
import DateComponent from "./Date";

// Enable layout animations for Android
if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface CalendarProps {
  onSelectDate: (date: string) => void;
  selected: string | null;
  numberOfDays?: number;
}

export interface CalendarHandles {
  scrollToToday: () => void;
  selectToday: () => void;
}

const Calendar = forwardRef<CalendarHandles, CalendarProps>(
  (
    {
      onSelectDate,
      selected,
      numberOfDays = 30, // Default to 30 days
    },
    ref
  ) => {
    const [dates, setDates] = useState<Date[]>([]);
    const [scrollPosition, setScrollPosition] = useState(0);
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState<string>(
      getDisplayMonthName(today)
    );
    const [currentYear, setCurrentYear] = useState<string>(
      formatDate(today, DATE_FORMATS.YEAR)
    );
    const [visibleMonths, setVisibleMonths] = useState<string[]>([]);
    const [visibleYears, setVisibleYears] = useState<string[]>([]);
    const [showMonthPicker, setShowMonthPicker] = useState(false);
    const [showYearPicker, setShowYearPicker] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);
    const isManualSelection = useRef(false);

    // Animation shared values
    const monthPickerHeight = useSharedValue(0);
    const yearPickerHeight = useSharedValue(0);
    const monthOpacity = useSharedValue(0);
    const yearOpacity = useSharedValue(0);

    // Calculate picker heights based on platform
    const pickerHeight =
      Platform.OS === "ios" ? verticalScale(180) : verticalScale(120);

    // Initialize months and years
    useEffect(() => {
      // Generate months
      const months = getMonthNames();
      setVisibleMonths(months);

      // Generate years (5 years before and after current year)
      const currentYearNum = getCurrentYear();
      const years = [];
      for (let i = currentYearNum - 5; i <= currentYearNum + 5; i++) {
        years.push(i.toString());
      }
      setVisibleYears(years);
    }, []);

    // Safe setState functions
    const safeSetShowMonthPicker = (value: boolean) => {
      setShowMonthPicker(value);
    };

    const safeSetShowYearPicker = (value: boolean) => {
      setShowYearPicker(value);
    };

    // Toggle month picker with animation
    const toggleMonthPicker = () => {
      if (showYearPicker) {
        // Hide year picker first
        yearPickerHeight.value = withTiming(0, {
          duration: 150, // Faster animation
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        });
        yearOpacity.value = withTiming(0, {
          duration: 100, // Faster animation
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        });
        setShowYearPicker(false);
      }

      if (!showMonthPicker) {
        setShowMonthPicker(true);
        // Animate opening
        monthPickerHeight.value = withSpring(pickerHeight, {
          damping: 20, // More damping for less oscillation
          stiffness: 200, // Higher stiffness for quicker response
          mass: 0.8, // Lower mass for faster movement
          overshootClamping: false,
        });
        monthOpacity.value = withTiming(1, {
          duration: 150, // Faster animation
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        });
      } else {
        // Animate closing
        monthPickerHeight.value = withTiming(0, {
          duration: 150, // Faster animation
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        });
        monthOpacity.value = withTiming(
          0,
          {
            duration: 100, // Faster animation
            easing: Easing.bezier(0.4, 0, 0.2, 1),
          },
          (finished) => {
            if (finished) {
              runOnJS(safeSetShowMonthPicker)(false);
            }
          }
        );
      }
    };

    // Toggle year picker with animation
    const toggleYearPicker = () => {
      if (showMonthPicker) {
        // Hide month picker first
        monthPickerHeight.value = withTiming(0, {
          duration: 150, // Faster animation
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        });
        monthOpacity.value = withTiming(0, {
          duration: 100, // Faster animation
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        });
        setShowMonthPicker(false);
      }

      if (!showYearPicker) {
        setShowYearPicker(true);
        // Animate opening
        yearPickerHeight.value = withSpring(pickerHeight, {
          damping: 20, // More damping for less oscillation
          stiffness: 200, // Higher stiffness for quicker response
          mass: 0.8, // Lower mass for faster movement
          overshootClamping: false,
        });
        yearOpacity.value = withTiming(1, {
          duration: 150, // Faster animation
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        });
      } else {
        // Animate closing
        yearPickerHeight.value = withTiming(0, {
          duration: 150, // Faster animation
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        });
        yearOpacity.value = withTiming(
          0,
          {
            duration: 100, // Faster animation
            easing: Easing.bezier(0.4, 0, 0.2, 1),
          },
          (finished) => {
            if (finished) {
              runOnJS(safeSetShowYearPicker)(false);
            }
          }
        );
      }
    };

    // Handle month selection
    const handleMonthChange = (month: string) => {
      if (month !== currentMonth) {
        isManualSelection.current = true;
        setCurrentMonth(month);

        // Clear the selected date when changing month
        if (onSelectDate) {
          onSelectDate("");
        }
      }

      // Animate closing the picker
      monthPickerHeight.value = withTiming(0, {
        duration: 150, // Faster animation
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      });
      monthOpacity.value = withTiming(
        0,
        {
          duration: 100, // Faster animation
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        },
        (finished) => {
          if (finished) {
            runOnJS(safeSetShowMonthPicker)(false);
          }
        }
      );
    };

    // Handle year selection
    const handleYearChange = (year: string) => {
      if (year !== currentYear) {
        isManualSelection.current = true;
        setCurrentYear(year);

        // Clear the selected date when changing year
        if (onSelectDate) {
          onSelectDate("");
        }
      }

      // Animate closing the picker
      yearPickerHeight.value = withTiming(0, {
        duration: 150, // Faster animation
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      });
      yearOpacity.value = withTiming(
        0,
        {
          duration: 100, // Faster animation
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        },
        (finished) => {
          if (finished) {
            runOnJS(safeSetShowYearPicker)(false);
          }
        }
      );
    };

    const screenWidth = Dimensions.get("window").width;

    // Get the dates for the selected month and year
    const getDatesForMonthYear = () => {
      const _dates: Date[] = [];
      const monthNumber = getMonthNumber(currentMonth);

      if (monthNumber === undefined) {
        console.error("Month not found:", currentMonth);
        return;
      }

      const year = parseInt(currentYear);

      // Create a date for the first day of the month
      const startDate = createSpecificDate(year, monthNumber, 1);

      // Get the number of days in the month
      const daysInMonth = getDaysInMonthForDate(startDate);

      // Add all days of the month
      for (let i = 0; i < daysInMonth; i++) {
        const date = createSpecificDate(year, monthNumber, i + 1);
        _dates.push(date);
      }

      setDates(_dates);

      // If dates were updated by picker selection, scroll to first day of month
      if (isManualSelection.current && _dates.length > 0) {
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({
            x: 0,
            animated: true,
          });
        }, 100);
        isManualSelection.current = false;
      }
    };

    // Function to scroll to today's date
    const scrollToToday = () => {
      const today = new Date();

      // Update current month and year to today's
      setCurrentMonth(getDisplayMonthName(today));
      setCurrentYear(formatDate(today, DATE_FORMATS.YEAR));
      isManualSelection.current = true;

      // After dates are updated, find today's date and scroll to it
      setTimeout(() => {
        // Recalculate dates array manually to avoid waiting for state update
        const todayMonth = today.getMonth() + 1; // 1-based month
        const year = today.getFullYear();

        // Create a temporary array of dates for the current month
        const tempDates: Date[] = [];
        const daysInMonth = getDaysInMonthForDate(
          createSpecificDate(year, todayMonth, 1)
        );

        for (let i = 0; i < daysInMonth; i++) {
          const date = createSpecificDate(year, todayMonth, i + 1);
          tempDates.push(date);
        }

        // Find today's index in this array
        const todayStr = formatDate(today, DATE_FORMATS.ISO);
        const todayIndex = tempDates.findIndex(
          (date) => formatDate(date, DATE_FORMATS.ISO) === todayStr
        );

        if (todayIndex >= 0 && scrollViewRef.current) {
          // Calculate the exact width of a date card including margins
          const dateCardWidth = scale(58); // width + margins

          // Use same calculation as the selected date scroll
          const screenWidth = Dimensions.get("window").width;
          const centerOffset = Math.max(
            0,
            dateCardWidth * todayIndex - screenWidth / 2 + dateCardWidth / 2
          );

          scrollViewRef.current.scrollTo({
            x: centerOffset,
            animated: true,
          });
        }
      }, 300); // Allow time for dates array to update
    };

    // Function to select today's date
    const selectToday = () => {
      const today = new Date();
      const todayStr = formatDate(today, DATE_FORMATS.ISO);

      // Call the selection handler to update the parent component's state
      if (onSelectDate) {
        onSelectDate(todayStr);
      }

      // Then scroll to today
      scrollToToday();
    };

    useImperativeHandle(ref, () => ({
      scrollToToday,
      selectToday,
    }));

    // Get dates when month or year changes
    useEffect(() => {
      getDatesForMonthYear();
    }, [currentMonth, currentYear]);

    // Update month/year based on scroll position
    const updateMonthYearFromScroll = () => {
      if (dates.length === 0) return;

      // Calculate which date is likely in view based on scroll position
      const dateCardWidth = scale(55) + scale(10); // width + margins
      const dateIndex = Math.floor(scrollPosition / dateCardWidth);

      if (dateIndex >= 0 && dateIndex < dates.length) {
        const newMonth = getDisplayMonthName(dates[dateIndex]);
        const newYear = formatDate(dates[dateIndex], DATE_FORMATS.YEAR);

        // Only update if changed and not during manual selection
        if (
          (newMonth !== currentMonth || newYear !== currentYear) &&
          !isManualSelection.current
        ) {
          setCurrentMonth(newMonth);
          setCurrentYear(newYear);
        }
      }
    };

    // Update month/year when scroll position changes
    useEffect(() => {
      updateMonthYearFromScroll();
    }, [scrollPosition, dates.length]);

    // Create animated styles
    const monthPickerStyle = useAnimatedStyle(() => {
      return {
        height: monthPickerHeight.value,
        opacity: monthOpacity.value,
        overflow: "hidden",
        zIndex: monthOpacity.value > 0 ? 9999 : 0,
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
      };
    });

    const yearPickerStyle = useAnimatedStyle(() => {
      return {
        height: yearPickerHeight.value,
        opacity: yearOpacity.value,
        overflow: "hidden",
        zIndex: yearOpacity.value > 0 ? 9999 : 0,
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
      };
    });

    return (
      <View style={{ zIndex: 1000 }}>
        <View style={[styles.headerContainer, { zIndex: 1000 }]}>
          <View style={[styles.monthYearContainer, { zIndex: 1000 }]}>
            <View style={[styles.pickerContainer, { zIndex: 1000 }]}>
              <TouchableOpacity
                style={styles.pickerTrigger}
                onPress={toggleMonthPicker}
              >
                <Text style={styles.monthText}>{currentMonth}</Text>
                <Ionicons
                  name={showMonthPicker ? "chevron-up" : "chevron-down"}
                  size={16}
                  color="#333"
                  style={styles.pickerIcon}
                />
              </TouchableOpacity>

              <Animated.View style={[styles.expandedPicker, monthPickerStyle]}>
                <View style={styles.pickerHeader}>
                  <Text style={styles.pickerHeaderText}>Select Month</Text>
                  <TouchableOpacity
                    onPress={toggleMonthPicker}
                    style={styles.closeButton}
                  >
                    <Ionicons name="close" size={20} color="#333" />
                  </TouchableOpacity>
                </View>
                <Picker
                  selectedValue={currentMonth}
                  onValueChange={handleMonthChange}
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                >
                  {visibleMonths.map((month) => (
                    <Picker.Item key={month} label={month} value={month} />
                  ))}
                </Picker>
              </Animated.View>
            </View>

            <View style={[styles.pickerContainer, { zIndex: 1000 }]}>
              <TouchableOpacity
                style={styles.pickerTrigger}
                onPress={toggleYearPicker}
              >
                <Text style={styles.yearText}>{currentYear}</Text>
                <Ionicons
                  name={showYearPicker ? "chevron-up" : "chevron-down"}
                  size={16}
                  color="#333"
                  style={styles.pickerIcon}
                />
              </TouchableOpacity>

              <Animated.View style={[styles.expandedPicker, yearPickerStyle]}>
                <View style={styles.pickerHeader}>
                  <Text style={styles.pickerHeaderText}>Select Year</Text>
                  <TouchableOpacity
                    onPress={toggleYearPicker}
                    style={styles.closeButton}
                  >
                    <Ionicons name="close" size={20} color="#333" />
                  </TouchableOpacity>
                </View>
                <Picker
                  selectedValue={currentYear}
                  onValueChange={handleYearChange}
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                >
                  {visibleYears.map((year) => (
                    <Picker.Item key={year} label={year} value={year} />
                  ))}
                </Picker>
              </Animated.View>
            </View>
          </View>
        </View>

        {/* Calendar always visible */}
        <View style={styles.calendarContainer}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={8}
            onScroll={(e) => setScrollPosition(e.nativeEvent.contentOffset.x)}
            decelerationRate="fast"
            snapToAlignment="center"
            contentContainerStyle={{ paddingHorizontal: scale(10) }}
          >
            {dates.map((date, index) => (
              <DateComponent
                key={index}
                date={date}
                onSelectDate={onSelectDate}
                selected={selected}
                colorIndex={index % 4} // Cycle through 4 colors
                index={index}
                visibleDatesCount={dates.length}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
);

export default Calendar;

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: verticalScale(10),
    alignItems: "center",
    zIndex: 20, // Ensure the header stays above other content
  },
  monthYearContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: scale(15),
    zIndex: 20, // Ensure the month/year pickers stay above other content
  },
  pickerContainer: {
    alignItems: "center",
    minWidth: scale(120),
    zIndex: 20, // Keep the picker container above other content
    position: "relative", // For absolute positioning of dropdown
  },
  pickerTrigger: {
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(5),
    borderRadius: scale(15),
    backgroundColor: "#f5f5f5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
    color: "#333",
  },
  closeButton: {
    padding: scale(3),
  },
  monthText: {
    fontSize: scale(16),
    fontFamily: "Poppins-Bold",
    color: "#333",
    marginRight: scale(5),
  },
  yearText: {
    fontSize: scale(16),
    fontFamily: "Poppins-Medium",
    color: "#333",
    marginRight: scale(5),
  },
  pickerIcon: {
    marginLeft: scale(3),
  },
  picker: {
    width: "100%",
    height: Platform.OS === "ios" ? verticalScale(150) : verticalScale(110),
  },
  pickerItem: {
    fontSize: scale(14),
    fontFamily: "Poppins-Medium",
  },
  calendarContainer: {
    height: verticalScale(120),
    marginBottom: verticalScale(15),
    zIndex: 10, // Lower than the pickers
  },
});
