import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import moment from "moment";
import { THEME_COLORS_HEX } from "@/constants/ThemeColors";
import { useEnrollments } from "@/hooks/useEnrollments";
import { useAppSelector } from "@/store";
import {
  selectEnrollmentsLoading,
  selectSelectedEnrollments,
} from "@/store/slices/enrollmentsSlice";
import { EnrollmentWithDetails } from "@/types/Enrollment";

interface CompactChildCalendarProps {
  selectedDate: string;
  childId: string;
  startHour?: number;
  endHour?: number;
  onAppointmentPress?: (enrollment: EnrollmentWithDetails) => void;
}

const HOUR_HEIGHT = verticalScale(40); // Smaller height for hour slot
const TIME_COLUMN_WIDTH = scale(35); // Smaller width for time column
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const APPOINTMENT_WIDTH = SCREEN_WIDTH - TIME_COLUMN_WIDTH - scale(10); // Use full width

export const CompactChildCalendar: React.FC<CompactChildCalendarProps> = ({
  selectedDate,
  childId,
  startHour = 8,
  endHour = 20,
  onAppointmentPress,
}) => {
  const selectedEnrollments = useAppSelector(selectSelectedEnrollments);
  const enrollmentsLoading = useAppSelector(selectEnrollmentsLoading);
  const { fetchEnrollmentsForDate } = useEnrollments();

  useEffect(() => {
    if (childId) {
      fetchEnrollmentsForDate([childId], selectedDate);
    }
  }, [selectedDate, childId, fetchEnrollmentsForDate]);

  // Generate array of hours to display
  const hours = Array.from(
    { length: endHour - startHour + 1 },
    (_, i) => startHour + i,
  );

  // Process appointments
  const processAppointments = () => {
    return selectedEnrollments.map((enrollment, index) => {
      // Parse appointment time
      const startTime = moment(enrollment.schedule.startTime).utc(false);
      const endTime = moment(enrollment.schedule.endTime).utc(false);

      // Calculate top position based on start time
      const startHourDecimal = startTime.hour() + startTime.minutes() / 60;
      const top = (startHourDecimal - startHour) * HOUR_HEIGHT;

      // Calculate height based on duration
      const durationHours = endTime.diff(startTime, "minutes") / 60;
      const height = Math.max(durationHours * HOUR_HEIGHT, verticalScale(35)); // Smaller minimum height

      // Select a color
      const color = THEME_COLORS_HEX[index % THEME_COLORS_HEX.length];

      return {
        enrollment,
        top,
        height,
        color,
      };
    });
  };

  // Render content
  const renderContent = () => {
    const appointments = processAppointments();

    if (appointments.length === 0) {
      return (
        <View className="items-center justify-center py-6">
          <Text className="font-poppins-medium text-base text-gray-500 text-center">
            Brak zajęć do wyświetlenia
          </Text>
        </View>
      );
    }

    return (
      <>
        {/* Hour grid lines */}
        {hours.map((hour) => (
          <View key={`grid-${hour}`} style={styles.gridLine} />
        ))}

        {/* Appointments */}
        {appointments.map((item, index) => (
          <TouchableOpacity
            key={`appointment-${index}`}
            style={[
              styles.appointmentCard,
              {
                top: item.top,
                height: item.height,
                backgroundColor: item.color,
              },
            ]}
            onPress={() => onAppointmentPress?.(item.enrollment)}
          >
            <Text style={styles.appointmentTitle} numberOfLines={1}>
              {item.enrollment.schedule.class.name}
            </Text>
            <Text style={styles.appointmentTime} numberOfLines={1}>
              {item.enrollment.schedule.startTime} -
              {item.enrollment.schedule.endTime}
            </Text>
            <Text style={styles.appointmentLocation} numberOfLines={1}>
              {item.enrollment.schedule.class.facility.name}
            </Text>
          </TouchableOpacity>
        ))}
      </>
    );
  };

  return (
    <View style={styles.container}>
      {enrollmentsLoading ? (
        <View className="flex-1 items-center justify-center py-4">
          <ActivityIndicator size="small" color={THEME_COLORS_HEX[0]} />
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
          <View style={styles.calendarContainer}>
            {/* Time column */}
            <View style={styles.timeColumn}>
              {hours.map((hour) => (
                <View key={`hour-${hour}`} style={styles.hourCell}>
                  <Text style={styles.hourText}>{hour}</Text>
                </View>
              ))}
            </View>

            {/* Appointments container */}
            <View style={styles.appointmentsContainer}>{renderContent()}</View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  calendarContainer: {
    flexDirection: "row",
    flex: 1,
  },
  timeColumn: {
    width: TIME_COLUMN_WIDTH,
    backgroundColor: "#f9f9f9",
  },
  hourCell: {
    height: HOUR_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#e0e0e0",
  },
  hourText: {
    fontSize: scale(10),
    color: "#757575",
  },
  appointmentsContainer: {
    flex: 1,
    position: "relative",
  },
  gridLine: {
    height: HOUR_HEIGHT,
    width: "100%",
    borderBottomWidth: 0.5,
    borderBottomColor: "#e0e0e0",
  },
  appointmentCard: {
    position: "absolute",
    left: scale(2),
    right: scale(2),
    padding: scale(4),
    borderRadius: scale(6),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  appointmentTitle: {
    fontSize: scale(11),
    fontWeight: "bold",
    color: "white",
  },
  appointmentTime: {
    fontSize: scale(9),
    color: "white",
    opacity: 0.9,
  },
  appointmentLocation: {
    fontSize: scale(9),
    color: "white",
    opacity: 0.9,
  },
});

export default CompactChildCalendar;
