import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  useWindowDimensions
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

import { THEME_COLORS_HEX } from "@/constants/ThemeColors";
import { useChildren } from "@/hooks/useChildren";
import { useEnrollments } from "@/hooks/useEnrollments";
import { getCurrentDateInPolish } from "@/utils/utils";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { AppointmentCard } from "./AppointmentCard";

type CalendarViewProps = {
  onEnrollmentPress: (enrollmentId: string) => void;
};

export const CalendarView = ({
  onEnrollmentPress: onAppointmentPress,
}: CalendarViewProps) => {
  const { day, month } = getCurrentDateInPolish();
  const formattedDoubleDigitDay = day.toString().padStart(2, "0");
  const { children, loading: childrenLoading, fetchChildren } = useChildren();
  const { enrollments, loading: enrollmentsLoading, fetchEnrollmentsByDay } = useEnrollments();
  const { width: screenWidth } = useWindowDimensions();

  // Calculate optimal width for date container and appointments container
  const dateContainerWidth = screenWidth * 0.24; // ~24% of screen width for date

  useFocusEffect(
    useCallback(() => {
      fetchChildren().then((children) =>
        fetchEnrollmentsByDay(children.map((child) => child.id), new Date())
      );
    }, [fetchChildren, fetchEnrollmentsByDay])
  );
  

  return (
    <View className="w-full bg-beige rounded-lg" style={styles.container}>
      <View className="flex-row justify-between items-start">
        <View
          className="justify-center items-center"
          style={{ width: dateContainerWidth, marginLeft: scale(-5)}}
        >
          <Text
            className="font-bold text-white"
            style={styles.dayText}
            numberOfLines={1}
          >
            {formattedDoubleDigitDay}
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
          {enrollmentsLoading || childrenLoading ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color={THEME_COLORS_HEX[0]} />
            </View>
          ) : (
            enrollments.map((enrollment, index) => (
              <AppointmentCard
                key={index}
                enrollment={enrollment}
                color={THEME_COLORS_HEX[index % enrollments.length]}
                onPress={(enrollmentId) => onAppointmentPress(enrollmentId)}
              />
            ))
          )}
          {enrollments.length === 0 && !enrollmentsLoading && (
            <Text className="text-center text-gray-500">Brak terminów</Text>
          )}
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
    fontSize: scale(52),
  },
  monthText: {
    fontSize: scale(16),
  },
  appointmentsContainer: {
    marginLeft: scale(8),
  },
});
