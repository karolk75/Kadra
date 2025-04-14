import { Background } from "@/components/Background";
import moment, { Moment } from "moment";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { AnimatedStyle } from "react-native-reanimated";

import DatePicker from "@/components/calendar/DatePicker";
import HorizontalScrollPicker, {
  HorizontalScrollPickerRef,
} from "@/components/calendar/HorizontalScrollPicker";
import TimeCalendar from "@/components/calendar/TimeCalendar";
import TodayButton from "@/components/calendar/TodayButton";
import { SafeAreaContainer } from "@/components/SafeAreaContainer";
import { SHORT_DAYS } from "@/constants/Days";
import {
  getMonthInPolish,
  getMonthItems,
  getMonthNumber,
} from "@/constants/Months";
import { ScrollPickerColors } from "@/constants/ThemeColors";
import { getYears } from "@/constants/Years";
import ScreenBackground from "@/svg/background";
import { Item } from "@/types/ScrollPicker";
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
  const todaysDayIndex = moment().date() - 1;
  const monthItems = getMonthItems();
  const yearItems = getYears();
  const scrollPickerRef = useRef<HorizontalScrollPickerRef>(null);

  const [selectedDay, setSelectedDay] = useState<Moment | null>(null);
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);
  const [isYearPickerOpen, setIsYearPickerOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(
    getMonthInPolish(moment().format("MMMM")),
  );
  const [selectedYear, setSelectedYear] = useState(moment().format("YYYY"));
  const [todayButtonClicked, setTodayButtonClicked] = useState(false);

  // Days of the selected month
  const [daysInMonth, setDaysInMonth] = useState<DayItem[]>([]);

  // Selected date in YYYY-MM-DD format for TimeCalendar
  const [selectedDate, setSelectedDate] = useState<string>(
    moment().format("YYYY-MM-DD"),
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
    selectToday = false,
  ) => {
    // Convert Polish month name to month index (0-11)
    // This assumes the month provided is the Polish name of the month
    const monthNumber = getMonthNumber(month);
    if (monthNumber === undefined) return;

    // Month number from getMonthNumber is 1-based, but moment expects 0-based
    const monthIndex = monthNumber - 1;

    // Create a moment instance for the 1st day of the selected month
    const firstDayOfMonth = moment()
      .year(parseInt(year))
      .month(monthIndex)
      .date(1);

    // Determine the number of days in the month
    const daysCount = firstDayOfMonth.daysInMonth();

    // Get today's date
    const today = moment();
    const isSameMonthYear =
      today.month() === monthIndex && today.year() === parseInt(year);

    // Generate an array of day items
    const days: DayItem[] = [];
    for (let day = 1; day <= daysCount; day++) {
      const date = moment().year(parseInt(year)).month(monthIndex).date(day);
      const dayOfWeek = date.day(); // 0-6 (Sunday-Saturday)

      if (date.format("YYYY-MM-DD") === today.format("YYYY-MM-DD")) {
        days.push({
          label: day.toString(),
          value: day,
          dayOfWeek: dayOfWeek,
          dayName: "Dziś",
          fullDate: date.format("YYYY-MM-DD"),
        });
      } else {
        days.push({
          label: day.toString(),
          value: day,
          dayOfWeek: dayOfWeek,
          dayName: SHORT_DAYS[dayOfWeek],
          fullDate: date.format("YYYY-MM-DD"),
        });
      }
    }

    setDaysInMonth(days);

    // Set selected day to today if in the same month/year and selectToday is true
    if (isSameMonthYear) {
      const todayIndex = today.date() - 1; // Convert from 1-based to 0-based index
      handleMoveTo(todayIndex);
      setSelectedDate(today.format("YYYY-MM-DD"));
    } else if (!selectToday) {
      handleMoveTo(0);
      if (days.length > 0) {
        setSelectedDate(days[0].fullDate);
      }
    }
  };

  // TODAY BUTTON
  const selectTodayButton = () => {
    const today = moment();
    const todayMonth = getMonthInPolish(today.format("MMMM"));
    const todayYear = today.format("YYYY");

    setSelectedMonth(todayMonth);
    setSelectedYear(todayYear);
    setTodayButtonClicked(true);
    setSelectedDate(today.format("YYYY-MM-DD"));

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
      setSelectedDay(moment(selectedDayItem.fullDate));
      setSelectedDate(selectedDayItem.fullDate);
    } else {
      setSelectedDay(null);
    }
  };

  const handleMoveTo = (index: number) => {
    scrollPickerRef.current?.moveTo(index);
  };

  // Handler for appointment selections
  const handleAppointmentPress = (schedule: Schedule) => {
    // Alert.alert(
    //   "Appointment Details",
    //   `Name: ${schedule.name}\nTime: ${schedule.time}\nLocation: ${schedule.location}\nActivity: ${schedule.activity}`,
    //   [{ text: "OK" }],
    // );
    console.log("Appointment pressed:", schedule);
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
                  animatedStyle: AnimatedStyle<any>,
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
              enrollments={enrollments}
              // startHour={8}
              // endHour={20}
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
