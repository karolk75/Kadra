import { Background } from "@/components/Background";
import { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Animated, { AnimatedStyle } from "react-native-reanimated";

import DatePicker from "@/components/calendar/DatePicker";
import HorizontalScrollPicker, {
  HorizontalScrollPickerRef,
} from "@/components/calendar/HorizontalScrollPicker";
import TimeCalendar from "@/components/calendar/TimeCalendar";
import TodayButton from "@/components/calendar/TodayButton";
import { SafeAreaContainer } from "@/components/SafeAreaContainer";
import { ScrollPickerColors } from "@/constants/ThemeColors";
import { SHORT_DAYS } from "@/constants/Days";
import ScreenBackground from "@/svg/background";
import { EnrollmentWithDetails } from "@/types/Enrollment";
import { Item } from "@/types/ScrollPicker";
import {
  createDate,
  createSpecificDate,
  DATE_FORMATS,
  formatDate,
  getDateOfMonth,
  getDaysInMonthForDate,
  getDisplayMonthName,
  getMonthItems,
  getMonthNumber,
  getYears,
  isToday,
} from "@/utils/date-fns-utils";
import OutsidePressHandler from "react-native-outside-press";
import { scale, verticalScale } from "react-native-size-matters";

interface DayItem {
  label: string;
  value: number;
  dayOfWeek: number;
  dayName: string;
  fullDate: string;
}

export default function CalendarScreen() {
  const today = new Date();
  const todaysDayIndex = getDateOfMonth(today) - 1;
  const monthItems = getMonthItems();
  const yearItems = getYears();
  const scrollPickerRef = useRef<HorizontalScrollPickerRef>(null);

  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);
  const [isYearPickerOpen, setIsYearPickerOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(
    getDisplayMonthName(today)
  );
  const [selectedYear, setSelectedYear] = useState(
    formatDate(today, DATE_FORMATS.YEAR)
  );
  const [todayButtonClicked, setTodayButtonClicked] = useState(false);

  // Days of the selected month
  const [daysInMonth, setDaysInMonth] = useState<DayItem[]>([]);

  // Selected date in YYYY-MM-DD format for TimeCalendar
  const [selectedDate, setSelectedDate] = useState<string>(
    formatDate(today, DATE_FORMATS.ISO)
  );

  // Update days when month or year changes or today button is clicked
  useEffect(() => {
    generateDaysForMonth(selectedMonth, selectedYear);

    if (todayButtonClicked) {
      setTodayButtonClicked(false);
    }
  }, [selectedMonth, selectedYear, todayButtonClicked]);

  // Function to generate days for selected month/year
  const generateDaysForMonth = (
    month: string,
    year: string,
    selectToday = false
  ) => {
    // Convert Polish month name to month index (1-12)
    const monthNumber = getMonthNumber(month);
    if (monthNumber === undefined) {
      console.error("Month not found:", month);
      return;
    }

    // Create a date for the 1st day of the selected month
    // Note: Month is 0-based in JavaScript Date, so we subtract 1
    const firstDayOfMonth = createSpecificDate(parseInt(year), monthNumber, 1);

    // Determine the number of days in the month
    const daysCount = getDaysInMonthForDate(firstDayOfMonth);

    // Get today's date
    const currentMonth = today.getMonth() + 1; // 1-based
    const currentYear = today.getFullYear();
    const isSameMonthYear =
      currentMonth === monthNumber && currentYear === parseInt(year);

    // Generate an array of day items
    const days: DayItem[] = [];
    for (let day = 1; day <= daysCount; day++) {
      const date = createSpecificDate(parseInt(year), monthNumber, day);
      const dayOfWeek = date.getDay(); // 0-6 (Sunday-Saturday)
      const dateString = formatDate(date, DATE_FORMATS.ISO);

      if (isToday(date)) {
        days.push({
          label: day.toString(),
          value: day,
          dayOfWeek: dayOfWeek,
          dayName: "Dziś",
          fullDate: dateString,
        });
      } else {
        days.push({
          label: day.toString(),
          value: day,
          dayOfWeek: dayOfWeek,
          dayName: SHORT_DAYS[dayOfWeek],
          fullDate: dateString,
        });
      }
    }

    setDaysInMonth(days);

    // Set selected day to today if in the same month/year and selectToday is true
    if (isSameMonthYear) {
      const todayIndex = today.getDate() - 1; // Convert from 1-based to 0-based index
      handleMoveTo(todayIndex);
      setSelectedDate(formatDate(today, DATE_FORMATS.ISO));
    } else if (!selectToday) {
      handleMoveTo(0);
      if (days.length > 0) {
        setSelectedDate(days[0].fullDate);
      }
    }
  };

  // TODAY BUTTON
  const selectTodayButton = () => {
    const today = new Date();
    const todayMonth = getDisplayMonthName(today);
    const todayYear = formatDate(today, DATE_FORMATS.YEAR);

    setSelectedMonth(todayMonth);
    setSelectedYear(todayYear);
    setTodayButtonClicked(true);
    setSelectedDate(formatDate(today, DATE_FORMATS.ISO));

    setIsMonthPickerOpen(false);
    setIsYearPickerOpen(false);
  };

  // DATE PICKERS
  const handleClosePickersPress = () => {
    if (isMonthPickerOpen || isYearPickerOpen) {
      setIsMonthPickerOpen(false);
      setIsYearPickerOpen(false);
    }
  };

  const toggleMonthPicker = () => {
    if (isYearPickerOpen) {
      setIsYearPickerOpen(false);
    }
    setIsMonthPickerOpen(!isMonthPickerOpen);
  };

  const toggleYearPicker = () => {
    if (isMonthPickerOpen) {
      setIsMonthPickerOpen(false);
    }
    setIsYearPickerOpen(!isYearPickerOpen);
  };

  // Handler for day selection
  const handleDaySelected = (day: number) => {
    const selectedDayItem = daysInMonth.find((d) => d.value === day);
    if (selectedDayItem) {
      setSelectedDay(createDate(selectedDayItem.fullDate));
      setSelectedDate(selectedDayItem.fullDate);
    } else {
      setSelectedDay(null);
    }
  };

  const handleMoveTo = (index: number) => {
    scrollPickerRef.current?.moveTo(index);
  };

  // Handler for appointment selections
  const handleAppointmentPress = (enrollment: EnrollmentWithDetails) => {
    Alert.alert(
      "Szczegóły zajęć",
      `Miejsce: ${enrollment.schedule.class.facility.name}\nZajęcia: ${enrollment.schedule.class.name}\nCzas: ${enrollment.schedule.startTime.split("T")[1]}:${enrollment.schedule.endTime.split("T")[1]}`,
      [{ text: "OK" }]
    );
  };

  return (
    <View className="flex-1 bg-white relative">
      <Background BackgroundComponent={ScreenBackground} />

      <SafeAreaContainer>
        <View className="flex-1">
          <View className="items-end" style={styles.todayButton}>
            <TodayButton onSelect={selectTodayButton} />
          </View>

          <OutsidePressHandler
            onOutsidePress={handleClosePickersPress}
            className="flex-row justify-center items-start z-10"
            style={styles.datesHeader}
          >
            <DatePicker
              title="Wybierz miesiąc"
              isOpen={isMonthPickerOpen}
              selectedValue={selectedMonth}
              items={monthItems}
              onSelect={(month) => {
                setSelectedMonth(month);
                handleClosePickersPress();
              }}
              togglePicker={toggleMonthPicker}
            />
            <DatePicker
              title="Wybierz rok"
              isOpen={isYearPickerOpen}
              selectedValue={selectedYear}
              items={yearItems}
              onSelect={(year) => {
                setSelectedYear(year);
                handleClosePickersPress();
              }}
              togglePicker={toggleYearPicker}
            />
          </OutsidePressHandler>

          <View
            style={styles.scrollPickerContainer}
            className="justify-center items-center"
          >
            {daysInMonth.length > 0 && (
              <HorizontalScrollPicker
                ref={scrollPickerRef}
                rowItems={7}
                initialIdx={todaysDayIndex}
                gap={4}
                items={daysInMonth}
                onSelect={(value: number) => handleDaySelected(value)}
                renderCustomItem={(
                  item: Item,
                  index: number,
                  isSelected: boolean,
                  relativePosition: number,
                  animatedStyle: AnimatedStyle<any>
                ) => {
                  const dayItem = item as unknown as DayItem;

                  const colorIndex = index % ScrollPickerColors.length;
                  const backgroundColor = ScrollPickerColors[colorIndex];

                  return (
                    <Animated.View
                      style={[
                        styles.dayItem,
                        {
                          backgroundColor,
                          width: scale(42),
                        },
                        animatedStyle,
                      ]}
                    >
                      <Text style={styles.dayName}>{dayItem.dayName}</Text>
                      <Text style={styles.dayNumber}>{dayItem.label}</Text>
                    </Animated.View>
                  );
                }}
              />
            )}
          </View>

          {/* Time Calendar Component */}
          <View style={styles.timeCalendarContainer}>
            <TimeCalendar
              selectedDate={selectedDate}
              onAppointmentPress={handleAppointmentPress}
            />
          </View>
        </View>
      </SafeAreaContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  todayButton: {
    paddingRight: scale(16),
    paddingTop: verticalScale(4),
  },
  datesHeader: {
    marginTop: verticalScale(18),
    gap: scale(10),
  },
  scrollPickerContainer: {
    marginTop: verticalScale(8),
    height: verticalScale(100),
  },
  timeCalendarContainer: {
    flex: 1,
    marginTop: verticalScale(-6),
    marginBottom: verticalScale(-28),
  },
  dayItem: {
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    paddingVertical: verticalScale(4),
    backgroundColor: "white",
  },
  dayName: {
    fontSize: 12,
    fontWeight: "500",
    color: "white",
    textAlign: "center",
    marginBottom: verticalScale(2),
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
  },
});
