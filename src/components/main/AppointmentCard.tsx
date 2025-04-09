import { AppointmentData } from "@/types/AppointmentData";
import React, { ReactNode } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import { scale } from "react-native-size-matters";

type AppointmentCardProps = {
  appointment: AppointmentData;
  color: string;
  onPress?: () => void;
};

export const AppointmentCard = ({
  appointment,
  color,
  onPress,
}: AppointmentCardProps) => {
  const { width: screenWidth } = useWindowDimensions();

  // Calculate text container width - adjust based on parent container and avatar size
  const textContainerMaxWidth = screenWidth * 0.5; // Limit to approximately half screen width

  return (
    <View className={`rounded-lg shadow-sm`} style={styles.cardContainer}>
      <View
        className={`bg-white rounded-md`}
        style={{
          borderWidth: scale(3),
          borderColor: color,
        }}
      >
        <TouchableOpacity className="flex-row items-center" onPress={onPress}>
          <View
            className={`rounded-lg`}
            style={{
              width: scale(32),
              height: scale(32),
              marginRight: scale(8),
              marginLeft: scale(8),
              backgroundColor: color,
            }}
          >
            {appointment.avatar}
          </View>
          <View
            style={{
              maxWidth: textContainerMaxWidth,
              flex: 1,
              paddingRight: scale(8),
            }}
          >
            <Text
              className="font-poppins-light text-black"
              style={styles.nameText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {appointment.name}
            </Text>
            <Text
              className="font-poppins-medium text-black"
              style={styles.timeText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {appointment.time}
            </Text>
            <Text
              className="font-poppins-medium text-black"
              style={styles.locationText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {appointment.location}
            </Text>
            <Text
              className="font-poppins-italic text-black"
              style={styles.activityText}
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

const styles = StyleSheet.create({
  cardContainer: {
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
  },
  nameText: {
    fontSize: scale(12),
  },
  timeText: {
    fontSize: scale(12),
  },
  locationText: {
    fontSize: scale(11),
  },
  activityText: {
    fontSize: scale(10),
  },
});
