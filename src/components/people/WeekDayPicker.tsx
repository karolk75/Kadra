import { SHORT_DAYS } from "@/constants/Days";
import { ScrollPickerColors } from "@/constants/ThemeColors";
import {
  DATE_FORMATS,
  formatDate,
  getDateOfMonth,
  isToday,
} from "@/utils/date-fns-utils";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

interface WeekDayPickerProps {
  selectedDayIndex: number;
  onSelectDay: (index: number, date: string) => void;
}

export const WeekDayPicker: React.FC<WeekDayPickerProps> = ({
  selectedDayIndex,
  onSelectDay,
}) => {
  // Generate the current week days
  const generateWeekDays = () => {
    const today = new Date();
    const currentDayOfWeek = today.getDay(); // 0-6 (Sunday-Saturday)

    // Calculate the date for Monday of current week (first day)
    const mondayDiff = currentDayOfWeek === 0 ? -6 : -(currentDayOfWeek - 1);
    const currentMonday = new Date(today);
    currentMonday.setDate(today.getDate() + mondayDiff);

    const days = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(currentMonday);
      date.setDate(currentMonday.getDate() + i);

      const dayOfWeek = date.getDay(); // 0-6 (Sunday-Saturday)
      const dateString = formatDate(date, DATE_FORMATS.ISO);
      const isCurrentDay = isToday(date);

      days.push({
        label: getDateOfMonth(date).toString(), // Day number
        dayOfWeek: dayOfWeek,
        dayName: isCurrentDay ? "Dziś" : SHORT_DAYS[dayOfWeek],
        fullDate: dateString,
        isToday: isCurrentDay,
      });
    }

    return days;
  };

  const weekDays = generateWeekDays();

  return (
    <View style={styles.container}>
      {weekDays.map((day, index) => {
        const isSelected = index === selectedDayIndex;
        const colorIndex = index % ScrollPickerColors.length;
        const backgroundColor = ScrollPickerColors[colorIndex];

        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayItem,
              { backgroundColor },
              isSelected && styles.selectedDay,
            ]}
            onPress={() => onSelectDay(index, day.fullDate)}
          >
            <Text style={styles.dayName}>{day.dayName}</Text>
            <Text style={styles.dayNumber}>{day.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(8),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10),
  },
  dayItem: {
    width: scale(36),
    height: scale(55),
    borderRadius: scale(15),
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  selectedDay: {
    transform: [{ scale: 1.15 }],
    shadowOpacity: 0.2,
    elevation: 3,
  },
  dayName: {
    fontSize: scale(10),
    fontWeight: "500",
    color: "white",
    textAlign: "center",
  },
  dayNumber: {
    fontSize: scale(14),
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginTop: verticalScale(2),
  },
});

export default WeekDayPicker;
