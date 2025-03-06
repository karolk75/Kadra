import { Text, View, useWindowDimensions, StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

import { THEME_COLORS_HEX } from "@/constants/ThemeColors";
import { AppointmentData } from "@/types/AppointmentData";
import { AppointmentCard } from "./AppointmentCard";

type CalendarViewProps = {
  day: string;
  month: string;
  appointments: AppointmentData[];
  onAppointmentPress?: (appointment: AppointmentData) => void;
};

export const CalendarView = ({
  day,
  month,
  appointments,
  onAppointmentPress,
}: CalendarViewProps) => {
  const { width: screenWidth } = useWindowDimensions();

  // Calculate optimal width for date container and appointments container
  const dateContainerWidth = screenWidth * 0.2; // ~18% of screen width for date

  return (
    <View
      className="w-full bg-beige rounded-lg"
      style={styles.container}
    >
      <View className="flex-row justify-between items-start">
        <View
          className="justify-center items-center"
          style={{ width: dateContainerWidth }}
        >
          <Text
            className="font-bold text-white"
            style={styles.dayText}
            numberOfLines={1}
          >
            {day}
          </Text>
          <Text
            className="font-poppins-bold text-white"
            style={styles.monthText}
            numberOfLines={1}
          >
            {month}
          </Text>
        </View>

        <View className="flex-1" style={styles.appointmentsContainer}>
          {appointments.map((appointment, index) => (
            <AppointmentCard
              key={index}
              appointment={appointment}
              color={THEME_COLORS_HEX[index % appointments.length]}
              onPress={() => onAppointmentPress?.(appointment)}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: scale(12),
    marginBottom: verticalScale(12),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  dayText: {
    fontSize: scale(52)
  },
  monthText: {
    fontSize: scale(16)
  },
  appointmentsContainer: {
    marginLeft: scale(8)
  }
});
