import React, { ReactNode } from "react";
import { Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { scale } from "react-native-size-matters";

export type AppointmentData = {
  name: string;
  time: string;
  location: string;
  activity: string;
  avatar: ReactNode;
};

type AppointmentCardProps = {
  appointment: AppointmentData;
  colorIndex: number;
  colors: string[];
  onPress?: () => void;
};

export const AppointmentCard = ({
  appointment,
  colorIndex,
  colors,
  onPress
}: AppointmentCardProps) => {
  const { width: screenWidth } = useWindowDimensions();
  const color = colors[colorIndex % colors.length];
  
  // Calculate text container width - adjust based on parent container and avatar size
  const textContainerMaxWidth = screenWidth * 0.5; // Limit to approximately half screen width

  return (
    <View
      className={`rounded-lg shadow-sm`}
      style={{
        padding: scale(4),
        marginBottom: scale(8),
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
      <View
        className={`bg-white rounded-md border-${color}`}
        style={{
          borderWidth: scale(3),
        }}
      >
        <TouchableOpacity 
          className="flex-row items-center"
          onPress={onPress}
        >
          <View
            className={`rounded-lg bg-${color}`}
            style={{
              width: scale(32),
              height: scale(32),
              marginRight: scale(8),
              marginLeft: scale(8),
            }}
          >
            {appointment.avatar}
          </View>
          <View style={{ maxWidth: textContainerMaxWidth, flex: 1, paddingRight: scale(8) }}>
            <Text
              className="font-poppins-light text-black"
              style={{ fontSize: scale(12) }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {appointment.name}
            </Text>
            <Text
              className="font-poppins-medium text-black"
              style={{ fontSize: scale(12) }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {appointment.time}
            </Text>
            <Text
              className="font-poppins-medium text-black"
              style={{ fontSize: scale(11) }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {appointment.location}
            </Text>
            <Text
              className="font-poppins-italic text-black"
              style={{ fontSize: scale(10) }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {appointment.activity}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}; 