import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

import { THEME_COLORS_HEX } from "@/constants/ThemeColors";
import { useChildren } from "@/hooks/useChildren";
import { useEnrollments } from "@/hooks/useEnrollments";
import { useAppSelector } from "@/store";
import {
  selectChildren,
  selectChildrenLoading,
} from "@/store/slices/childrenSlice";
import {
  selectEnrollmentsLoading,
  selectTodayEnrollments,
} from "@/store/slices/enrollmentsSlice";
import { getCurrentDateInPolish } from "@/utils/date-fns-utils";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { AppointmentCard } from "./AppointmentCard";

type CalendarViewProps = {
  onEnrollmentPress: (enrollmentId: string) => void;
};

export const CalendarView = ({
  onEnrollmentPress: onAppointmentPress,
}: CalendarViewProps) => {
  const children = useAppSelector(selectChildren);
  const childrenLoading = useAppSelector(selectChildrenLoading);
  const { fetchChildren } = useChildren();

  const todayEnrollments = useAppSelector(selectTodayEnrollments);
  const enrollmentsLoading = useAppSelector(selectEnrollmentsLoading);
  const { fetchEnrollmentsForToday } = useEnrollments();

  const { day, month } = getCurrentDateInPolish();
  const formattedDoubleDigitDay = day.toString().padStart(2, "0");

  const { width: screenWidth } = useWindowDimensions();

  // Calculate optimal width for date container and appointments container
  const dateContainerWidth = screenWidth * 0.24; // ~24% of screen width for date

  useFocusEffect(
    useCallback(() => {
      if (!children || children.length === 0) {
        fetchChildren().then((children) =>
          fetchEnrollmentsForToday(children.map((child) => child.id)),
        );
      } else {
        fetchEnrollmentsForToday(children.map((child) => child.id));
      }
    }, [fetchChildren, fetchEnrollmentsForToday, children]),
  );

  return (
    <View className="w-full bg-beige rounded-lg" style={styles.container}>
      <View className="flex-row justify-between items-start">
        <View
          className="justify-center items-center"
          style={{ width: dateContainerWidth, marginLeft: scale(-5) }}
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

        {/* Appointments Container */}
        <View className="flex-1" style={styles.appointmentsContainer}>
          {enrollmentsLoading || childrenLoading ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color={THEME_COLORS_HEX[0]} />
            </View>
          ) : (
            todayEnrollments.map((enrollment, index) => (
              <AppointmentCard
                key={index}
                enrollment={enrollment}
                color={THEME_COLORS_HEX[index % todayEnrollments.length]}
                onPress={(enrollmentId) => onAppointmentPress(enrollmentId)}
              />
            ))
          )}
          {todayEnrollments.length === 0 && !enrollmentsLoading && (
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
