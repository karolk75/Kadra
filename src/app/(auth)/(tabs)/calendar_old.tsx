import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";

// Import components and utilities
import { Background } from "@/components/Background";
import Calendar, { CalendarHandles } from "@/components/calendar/Calendar";
import { AppointmentCard } from "@/components/main/AppointmentCard";
import { DAYS } from "@/constants/Days";
import { THEME_COLORS_HEX } from "@/constants/ThemeColors";
import { getMockAppointments } from "@/data/mockData";
import BoyAvatar from "@/svg/avatars/boyAvatar";
import GirlAvatar from "@/svg/avatars/girlAvatar";
import ScreenBackground from "@/svg/background";

export default function OldCalendarScreen() {
  const { width: screenWidth, height: windowHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const calendarRef = useRef<CalendarHandles>(null);
  const appointmentsScrollViewRef = useRef<ScrollView>(null);
  const hasInitialized = useRef(false);

  // Animation values for today's date button
  const todayScale = useSharedValue(1);
  const todayRotate = useSharedValue(0);

  // Initialize on first render
  useLayoutEffect(() => {
    if (!hasInitialized.current && calendarRef.current) {
      // Use a short timeout to ensure the calendar is fully rendered
      setTimeout(() => {
        calendarRef.current?.selectToday();
        hasInitialized.current = true;
      }, 500);
    }
  }, []);

  // Get current date information
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<string>(
    moment().format("YYYY-MM-DD")
  );

  // Mock appointments
  const appointments = getMockAppointments(<BoyAvatar />, <GirlAvatar />);

  // Generate hours for calendar (7:00 - 22:00)
  const generateHours = () => {
    const hours = [];
    for (let i = 7; i <= 22; i++) {
      hours.push(`${i}:00`);
    }
    return hours;
  };

  // Get formatted current day and date for header
  const getCurrentDayAndDate = () => {
    const dayName = DAYS[today.getDay()];
    const dayNumber = today.getDate();
    const month = today.getMonth() + 1; // Months are 0-indexed
    const year = today.getFullYear();

    return `${dayName}, ${dayNumber.toString().padStart(2, "0")}.${month
      .toString()
      .padStart(2, "0")}.${year}`;
  };

  // Get appointments for the selected date (simulating different appointments for different days)
  const getAppointmentsForDate = (dateString: string) => {
    // This is just a simulation - in a real app, you'd filter from a database
    const date = moment(dateString).toDate();
    const dayOfMonth = date.getDate();

    // Return regular appointments for even days, empty array for odd days
    return dayOfMonth % 2 === 0 ? appointments : appointments.slice(0, 1);
  };

  const hours = generateHours();
  const selectedDateAppointments = getAppointmentsForDate(selectedDate);

  // Handle date selection from the calendar
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);

    // After state is updated and appointments are fetched, scroll to the first appointment
    setTimeout(() => {
      const appointments = getAppointmentsForDate(date);

      if (appointments.length > 0 && appointmentsScrollViewRef.current) {
        // Get the time of the first appointment
        const firstAppointmentTime = appointments[0].time;

        // Extract just the hour
        const firstAppointmentHour = parseInt(
          firstAppointmentTime.split(":")[0]
        );

        // Find the corresponding hour block's index
        const hourIndex = hours.findIndex((hour) => {
          const hourValue = parseInt(hour.split(":")[0]);
          return hourValue === firstAppointmentHour;
        });

        if (hourIndex >= 0) {
          // Calculate the approximate position of the hour block
          // Each hour block has a fixed height plus margin
          const hourHeight = verticalScale(60); // Height of each hour row
          const marginBottom = verticalScale(16); // Bottom margin of each row
          const padding = verticalScale(20); // Additional padding for context

          // Use window height from the top-level hook
          const offsetPercentage = 0.22; // Show 10% of screen above the appointment

          // Calculate the target scroll position
          const scrollPosition = Math.max(
            0,
            hourIndex * (hourHeight + marginBottom) -
              windowHeight * offsetPercentage
          );

          // Perform the scroll with animation
          appointmentsScrollViewRef.current.scrollTo({
            y: scrollPosition,
            animated: true,
          });
        }
      }
    }, 1);
  };

  // Scroll to today's date when screen comes into focus (for subsequent visits)
  useFocusEffect(
    React.useCallback(() => {
      if (hasInitialized.current && calendarRef.current) {
        calendarRef.current.selectToday();
      }
    }, [])
  );

  // Safe function to call scrollToToday that can be used with runOnJS
  const scrollToTodaySafe = useCallback(() => {
    if (calendarRef.current) {
      calendarRef.current.selectToday();
      
      // We don't need to set selectedDate here anymore since selectToday will do it
    }
  }, [calendarRef]);

  // Animate Today button when pressed using worklet
  const animateTodayButton = () => {
    // Reset values first
    todayScale.value = 1;
    todayRotate.value = 0;

    // We don't need to set the date manually here anymore
    // as scrollToTodaySafe will call selectToday which does it for us

    // Sequence: slightly shrink → grow a bit larger → back to normal
    todayScale.value = withSequence(
      withTiming(0.9, { duration: 30 }), // Even faster animation
      withSpring(1.1, { damping: 12, stiffness: 180, mass: 0.6 }),
      withSpring(1, { damping: 12, stiffness: 180, mass: 0.6 }, (finished) => {
        if (finished) {
          // Call the scroll function safely after animation completes
          runOnJS(scrollToTodaySafe)();
        }
      })
    );

    // Add a very slight wobble effect (using degrees instead of turns)
    todayRotate.value = withSequence(
      withTiming(2, { duration: 30 }), // Faster animation
      withTiming(-2, { duration: 40 }), // Faster animation
      withTiming(0, { duration: 30 }) // Faster animation
    );
  };

  // Create animated styles for today button
  const todayAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: todayScale.value },
        { rotate: `${todayRotate.value}deg` }, // Use degrees instead of turns
      ],
    };
  });

  return (
    <View className="flex-1 bg-white relative">
      <Background BackgroundComponent={ScreenBackground} />

      <View className="flex-1" style={{ paddingTop: insets.top }}>
        <View className="pt-4 flex-1">
          {/* Today's date in top right */}
          <TouchableOpacity
            onPress={animateTodayButton}
            className="items-end px-4"
          >
            <Animated.View style={todayAnimatedStyle}>
              <Text
                className="font-poppins-bold text-darkblue"
                style={{ fontSize: scale(16) }}
              >
                Dziś
              </Text>
              <Text
                className="font-poppins-medium text-darkblue"
                style={{ fontSize: scale(14) }}
              >
                {getCurrentDayAndDate()}
              </Text>
            </Animated.View>
          </TouchableOpacity>

          {/* Calendar Component */}
          <View className="mt-3" style={{ zIndex: 1000 }}>
            <Calendar
              ref={calendarRef}
              onSelectDate={handleDateSelect}
              selected={selectedDate}
              numberOfDays={40} // Show more days for more scrolling
            />
          </View>

          {/* Calendar with Hours and Appointments */}
          <View className="flex-1 px-4" style={{ zIndex: 10 }}>
            <ScrollView ref={appointmentsScrollViewRef}>
              {hours.map((hour, index) => (
                <View key={index} className="flex-row mb-4">
                  {/* Hour display on the left */}
                  <View className="w-16 pr-2 justify-start items-end">
                    <Text
                      className="font-poppins-medium text-gray-500"
                      style={{ fontSize: scale(14) }}
                    >
                      {hour}
                    </Text>
                  </View>

                  {/* Appointment container for this hour */}
                  <View className="flex-1 border-l border-gray-300 pl-2">
                    {/* Show appointments for this hour (if any) */}
                    {selectedDateAppointments
                      .filter((apt) => apt.time.startsWith(hour.split(":")[0]))
                      .map((appointment, aptIndex) => (
                        <AppointmentCard
                          key={aptIndex}
                          appointment={appointment}
                          color={THEME_COLORS_HEX[aptIndex % 4]}
                          onPress={() =>
                            console.log(
                              `Pressed appointment: ${appointment.name}`
                            )
                          }
                        />
                      ))}
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
}
