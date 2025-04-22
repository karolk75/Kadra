import { EnrollmentWithDetails } from "@/types/Enrollment";
import React, { ReactNode } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  StyleSheet,
  ViewStyle,
  Image,
} from "react-native";
import { scale } from "react-native-size-matters";

type AppointmentCardProps = {
  enrollment: EnrollmentWithDetails;
  color: string;
  onPress?: () => void;
  avatarOnly?: boolean;
};

export const AppointmentCard = ({
  enrollment,
  color,
  onPress,
  avatarOnly = false,
}: AppointmentCardProps) => {
  const { width: screenWidth } = useWindowDimensions();

  // Calculate text container width - adjust based on parent container and avatar size
  // Increased the width to prevent text cutting
  const textContainerMaxWidth = screenWidth * 0.7;

  const enrollmentTime = () => {
    const startTimeString = enrollment.schedule.startTime;
    const endTimeString = enrollment.schedule.endTime;

    // Extract hour and minute directly from ISO strings
    const startHour = startTimeString.split("T")[1].split(":")[0];
    const startMinute = startTimeString.split("T")[1].split(":")[1];

    const endHour = endTimeString.split("T")[1].split(":")[0];
    const endMinute = endTimeString.split("T")[1].split(":")[1];

    return `${startHour}:${startMinute} - ${endHour}:${endMinute}`;
  };

  return (
    <View className={`rounded-lg shadow-sm`} style={styles.cardContainer}>
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
            className={`rounded-full`}
            style={{
              width: avatarOnly ? scale(46) : scale(32),
              height: avatarOnly ? scale(46) : scale(32),
              marginLeft: avatarOnly ? 0 : scale(8),
              marginRight: avatarOnly ? 0 : scale(8),
              backgroundColor: color,
            }}
          >
            {enrollment!.child!.profileImageUrl && (
              <Image
                source={{ uri: enrollment!.child!.profileImageUrl }}
                style={{
                  resizeMode: "cover",
                  top: scale(1),
                  left: scale(1),
                  width: avatarOnly ? scale(44) : scale(30),
                  height: avatarOnly ? scale(44) : scale(30),
                }}
              />
            )}
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
                {`${enrollment.child.firstName} ${enrollment.child.lastName}`}
              </Text>
              <Text
                className="font-poppins-medium text-black"
                style={styles.timeText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {enrollmentTime()}
              </Text>
              <Text
                className="font-poppins-medium text-black"
                style={styles.locationText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {enrollment.schedule.class.facility.name}
              </Text>
              <Text
                className="font-poppins-italic text-black"
                style={styles.activityText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {enrollment.schedule.class.name}
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    height: "100%",
    padding: 0,
    margin: 0,
    marginBottom: 0,
    backgroundColor: "white",
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
  avatarImage: {
    resizeMode: "cover",
    width: scale(32),
    height: scale(32),
  },
});
