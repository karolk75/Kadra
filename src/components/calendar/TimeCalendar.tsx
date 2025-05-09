import { AppointmentCard } from "@/components/calendar/AppointmentCard";
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
  selectSelectedEnrollments,
} from "@/store/slices/enrollmentsSlice";
import { EnrollmentWithDetails } from "@/types/Enrollment";
import { diffInMinutes, toLocalDate } from "@/utils/date-fns-utils";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

interface TimeCalendarProps {
  selectedDate: string; // Format: 'YYYY-MM-DD'
  startHour?: number; // Starting hour (24-hour format)
  endHour?: number; // Ending hour (24-hour format)
  onAppointmentPress?: (enrollment: EnrollmentWithDetails) => void;
}

interface AppointmentWithTimes {
  enrollment: EnrollmentWithDetails;
  startTime: Date;
  endTime: Date;
  top: number;
  height: number;
  color: string;
  columnIndex?: number; // Position in the collision group (horizontally)
  columnCount?: number; // Total count of columns in the collision group
  width?: number; // Width of the appointment
  left?: number; // Left position of the appointment
}

const HOUR_HEIGHT = verticalScale(60); // Height for each hour slot
const TIME_COLUMN_WIDTH = scale(50); // Width of the time column
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const APPOINTMENT_WIDTH = SCREEN_WIDTH - TIME_COLUMN_WIDTH - scale(20); // Width for appointments with some padding

export const TimeCalendar: React.FC<TimeCalendarProps> = ({
  selectedDate,
  startHour = 7,
  endHour = 22,
  onAppointmentPress,
}) => {
  const children = useAppSelector(selectChildren);
  const childrenLoading = useAppSelector(selectChildrenLoading);
  const { fetchChildren } = useChildren();

  const selectedEnrollments = useAppSelector(selectSelectedEnrollments);
  const enrollmentsLoading = useAppSelector(selectEnrollmentsLoading);
  const { fetchEnrollmentsForDate } = useEnrollments();

  useFocusEffect(
    useCallback(() => {
      if (!children || children.length === 0) {
        fetchChildren().then((children) =>
          fetchEnrollmentsForDate(
            children.map((child) => child.id),
            selectedDate
          )
        );
      } else {
        fetchEnrollmentsForDate(
          children.map((child) => child.id),
          selectedDate
        );
      }
    }, [fetchChildren, fetchEnrollmentsForDate, children, selectedDate])
  );

  // Generate array of hours to display
  const hours = Array.from(
    { length: endHour - startHour + 1 },
    (_, i) => startHour + i
  );

  // Check if two appointments overlap
  const doOverlap = (
    a: AppointmentWithTimes,
    b: AppointmentWithTimes
  ): boolean => {
    return a.startTime < b.endTime && b.startTime < a.endTime;
  };

  // Process appointments to calculate their position and height
  const processAppointments = (): AppointmentWithTimes[] => {
    // First, process basic properties for each appointment
    const processed = selectedEnrollments.map((enrollment, index) => {
      // Parse appointment time (format: ISO datetime string)
      const startTime = toLocalDate(enrollment.schedule.startTime);
      const endTime = toLocalDate(enrollment.schedule.endTime);

      // Calculate top position based on start time
      const startHourDecimal =
        startTime.getHours() + startTime.getMinutes() / 60;
      const top = (startHourDecimal - startHour) * HOUR_HEIGHT;

      // Calculate height based on duration
      const durationMinutes = diffInMinutes(endTime, startTime);
      const durationHours = durationMinutes / 60;
      const height = Math.max(durationHours * HOUR_HEIGHT, verticalScale(60)); // Ensure minimum height

      // Select a color for this appointment
      const color = THEME_COLORS_HEX[index % THEME_COLORS_HEX.length];

      return {
        enrollment,
        startTime,
        endTime,
        top,
        height,
        color,
      };
    });

    // Sort appointments by start time (and then by duration if same start time)
    processed.sort((a, b) => {
      // First compare start times
      const startComparison = a.startTime.getTime() - b.startTime.getTime();
      if (startComparison === 0) {
        // If start times are the same, compare duration
        const aDuration = a.endTime.getTime() - a.startTime.getTime();
        const bDuration = b.endTime.getTime() - b.startTime.getTime();
        return aDuration - bDuration;
      }
      return startComparison;
    });

    // Group overlapping appointments into collision groups
    const collisionGroups: AppointmentWithTimes[][] = [];

    for (const appointment of processed) {
      // Find a collision group where this appointment overlaps with any member
      let foundGroup = false;

      for (const group of collisionGroups) {
        // Check if this appointment overlaps with any appointment in this group
        if (group.some((groupApp) => doOverlap(groupApp, appointment))) {
          group.push(appointment);
          foundGroup = true;
          break;
        }
      }

      // If no overlapping group found, create a new one
      if (!foundGroup) {
        collisionGroups.push([appointment]);
      }
    }

    // Process each collision group to assign columnIndex and columnCount
    collisionGroups.forEach((group) => {
      // If only one appointment in group, no need to calculate columns
      if (group.length === 1) {
        const app = group[0];
        app.columnIndex = 0;
        app.columnCount = 1;
        app.width = APPOINTMENT_WIDTH;
        app.left = 0;
        return;
      }

      // For multiple appointments in a group, we need to determine column layout
      // This is a simplified algorithm - for each appointment, find the first available column
      const columns: AppointmentWithTimes[][] = [];

      for (const app of group) {
        // Find the first column where this appointment doesn't overlap with any existing one
        let columnFound = false;

        for (let i = 0; i < columns.length; i++) {
          const column = columns[i];
          const overlapsWithColumn = column.some((colApp) =>
            doOverlap(colApp, app)
          );

          if (!overlapsWithColumn) {
            column.push(app);
            app.columnIndex = i;
            columnFound = true;
            break;
          }
        }

        // If no column found, create a new one
        if (!columnFound) {
          columns.push([app]);
          app.columnIndex = columns.length - 1;
        }
      }

      // Now that we have the columns, update the columnCount for all appointments in this group
      const columnCount = columns.length;

      for (const app of group) {
        app.columnCount = columnCount;
        app.width = APPOINTMENT_WIDTH / columnCount;
        app.left =
          (app.columnIndex as number) * (APPOINTMENT_WIDTH / columnCount);
      }
    });

    return processed;
  };

  return (
    <View style={styles.container}>
      {enrollmentsLoading || childrenLoading ? (
        // Loading indicator
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={THEME_COLORS_HEX[0]} />
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.calendarContainer}>
            {/* Time column */}
            <View style={styles.timeColumn}>
              {hours.map((hour) => (
                <View key={`hour-${hour}`} style={styles.hourCell}>
                  <Text style={styles.hourText}>{`${hour}:00`}</Text>
                </View>
              ))}
              {/* Add extra space at the bottom for scrolling */}
              <View style={{ height: verticalScale(50) }} />
            </View>

            {/* Appointments container */}
            <View style={styles.appointmentsContainer}>
              {/* Hour grid lines */}
              {hours.map((hour) => (
                <View key={`grid-${hour}`} style={styles.gridLine} />
              ))}

              {/* Extra space at the bottom for scrolling */}
              <View style={{ height: verticalScale(50) }} />

              {/* Appointments */}
              {processAppointments().map((item, index) => (
                <View
                  key={`appointment-${index}`}
                  style={[
                    styles.appointmentWrapper,
                    {
                      top: item.top,
                      height: item.height,
                      width: item.width || APPOINTMENT_WIDTH,
                      left: scale(10) + (item.left || 0),
                      right: undefined, // Remove right positioning to avoid conflicts
                    },
                  ]}
                >
                  <AppointmentCard
                    enrollment={item.enrollment}
                    color={item.color}
                    onPress={() => onAppointmentPress?.(item.enrollment)}
                    avatarOnly={
                      item.columnCount !== undefined && item.columnCount > 2
                    }
                  />
                </View>
              ))}
            </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: scale(20),
  },
  loadingText: {
    marginTop: verticalScale(10),
    fontSize: scale(14),
    color: "#757575",
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
    backgroundColor: "#f8f8f8",
  },
  hourCell: {
    height: HOUR_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  hourText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#757575",
  },
  appointmentsContainer: {
    flex: 1,
    position: "relative",
  },
  gridLine: {
    height: HOUR_HEIGHT,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  appointmentWrapper: {
    position: "absolute",
    borderRadius: scale(8),
    overflow: "visible", // Changed to visible to show shadows properly
  },
});

export default TimeCalendar;
