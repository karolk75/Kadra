import React from "react";
import { Text, View, useWindowDimensions } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

import { AppointmentCard, AppointmentData } from "./AppointmentCard";

type CalendarViewProps = {
  day: string;
  month: string;
  appointments: AppointmentData[];
  colors: string[];
  onAppointmentPress?: (appointment: AppointmentData) => void;
};

export const CalendarView = ({
  day,
  month,
  appointments,
  colors,
  onAppointmentPress
}: CalendarViewProps) => {
  const { width: screenWidth } = useWindowDimensions();

  // Calculate optimal width for date container and appointments container
  const dateContainerWidth = screenWidth * 0.20; // ~18% of screen width for date
  
  return (
    <View
      className="w-full bg-beige rounded-lg"
      style={{
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
      }}
    >
      <View className="flex-row justify-between items-start">
        <View 
          className="justify-center items-center"
          style={{ width: dateContainerWidth }}
        >
          <Text
            className="font-bold text-white"
            style={{ fontSize: scale(52) }}
            numberOfLines={1}
          >
            {day}
          </Text>
          <Text
            className="font-poppins-bold text-white"
            style={{ fontSize: scale(16) }}
            numberOfLines={1}
          >
            {month}
          </Text>
        </View>

        <View className="flex-1" style={{ marginLeft: scale(8) }}>
          {appointments.map((appointment, index) => (
            <AppointmentCard
              key={index}
              appointment={appointment}
              colorIndex={index}
              colors={colors}
              onPress={() => onAppointmentPress?.(appointment)}
            />
          ))}
        </View>
      </View>
    </View>
  );
}; 