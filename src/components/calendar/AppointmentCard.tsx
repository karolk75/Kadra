import { AppointmentData } from "@/types/AppointmentData";
import React, { ReactNode } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { scale } from "react-native-size-matters";

type AppointmentCardProps = {
  appointment: AppointmentData;
  color: string;
  onPress?: () => void;
  containerStyle?: ViewStyle;
  avatarOnly?: boolean;
};

export const AppointmentCard = ({
  appointment,
  color,
  onPress,
  containerStyle,
  avatarOnly = false,
}: AppointmentCardProps) => {
  const { width: screenWidth } = useWindowDimensions();

  // Calculate text container width - adjust based on parent container and avatar size
  // Increased the width to prevent text cutting
  const textContainerMaxWidth = screenWidth * 0.7;

  return (
    <View
      className={`rounded-lg shadow-sm`}
      style={[styles.cardContainer, containerStyle]}
    >
      <View
        className={`bg-white rounded-md`}
        style={{
          borderWidth: scale(3),
          borderColor: color,
          justifyContent: avatarOnly ? "center" : "flex-start",
          paddingVertical: avatarOnly ? scale(4) : 0,
        }}
      >
        <TouchableOpacity
          className={
            avatarOnly ? "justify-center items-center" : "flex-row items-center"
          }
          onPress={onPress}
          style={styles.touchableContent}
        >
          <View
            className={`rounded-lg`}
            style={{
              width: avatarOnly ? scale(46) : scale(32),
              height: avatarOnly ? scale(46) : scale(32),
              marginLeft: avatarOnly ? 0 : scale(8),
              marginRight: avatarOnly ? 0 : scale(8),
              backgroundColor: color,
            }}
          >
            {appointment.avatar}
          </View>
          {!avatarOnly && (
            <View
              style={{
                maxWidth: textContainerMaxWidth,
                flex: 1,
                paddingRight: scale(8),
                paddingVertical: scale(4), // Add vertical padding for better text alignment
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
          )}
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
    height: "100%",
  },
  touchableContent: {
    height: "100%",
    alignItems: "center",
  },
  nameText: {
    fontSize: scale(12),
    width: "100%", // Ensure text takes full width of container
  },
  timeText: {
    fontSize: scale(12),
    width: "100%", // Ensure text takes full width of container
  },
  locationText: {
    fontSize: scale(11),
    width: "100%", // Ensure text takes full width of container
  },
  activityText: {
    fontSize: scale(10),
    width: "100%", // Ensure text takes full width of container
  },
});
