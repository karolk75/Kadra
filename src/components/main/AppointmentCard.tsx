import { EnrollmentWithDetails } from "@/types/Enrollment";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { scale } from "react-native-size-matters";

type AppointmentCardProps = {
  enrollment: EnrollmentWithDetails;
  color: string;
  onPress: (enrollmentId: string) => void;
};

export const AppointmentCard = ({
  enrollment,
  color,
  onPress,
}: AppointmentCardProps) => {
  const { width: screenWidth } = useWindowDimensions();

  // Calculate text container width - adjust based on parent container and avatar size
  const textContainerMaxWidth = screenWidth * 0.5; // Limit to approximately half screen width

  const childAvatar = enrollment.child.profileImageUrl;

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
    <View
      className={`bg-white rounded-lg shadow-sm`}
      style={[
        {
          borderWidth: scale(3),
          borderColor: color,
        },
        styles.cardContainer,
      ]}
    >
      <TouchableOpacity
        className="flex-row items-center"
        onPress={() => onPress(enrollment.id)}
      >
        <View
          className={`rounded-full`}
          style={{
            width: scale(34),
            height: scale(34),
            marginRight: scale(6),
            marginLeft: scale(4),
            backgroundColor: color,
          }}
        >
          {childAvatar && (
            <Image source={{ uri: childAvatar }} style={styles.avatarImage} />
          )}
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
      </TouchableOpacity>
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
    backgroundColor: "white",
  },
  nameText: {
    fontSize: scale(10),
  },
  timeText: {
    fontSize: scale(10),
  },
  locationText: {
    fontSize: scale(9),
  },
  activityText: {
    fontSize: scale(8),
  },
  avatarImage: {
    resizeMode: "cover",
    top: scale(1),
    left: scale(1),
    width: scale(32),
    height: scale(32),
  },
});
