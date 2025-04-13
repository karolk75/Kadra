import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  StyleSheet,
} from "react-native";
import { scale } from "react-native-size-matters";

type PersonCardProps = {
  id: string;
  name: string;
  surname: string;
  relation: string;
  avatarPath: ImageSourcePropType;
  backgroundColor: string;
  onPress: (id: string) => void;
};

export const PersonCard = ({
  id,
  name,
  surname,
  relation,
  avatarPath,
  backgroundColor,
  onPress,
}: PersonCardProps) => {
  return (
    <TouchableOpacity
      className={`relative`}
      style={styles.personContainer}
      onPress={() => onPress(id)}
    >
      {/* Circle and stripe */}
      <View
        className="flex-row items-center"
        style={styles.circleStripeContainer}
      >
        <View
          className={`rounded-full shadow-md`}
          style={[styles.personCircle, { backgroundColor }]}
        />
        <View
          className={`flex-1 rounded-r-lg justify-center`}
          style={[styles.personStripe, { backgroundColor }]}
        >
          {/* Name and surname */}
          <Text
            className="font-poppins-bold text-white"
            style={styles.personName}
          >
            {name.toUpperCase()}
          </Text>
          <Text
            className="font-poppins-bold text-white"
            style={styles.personSurname}
          >
            {surname.toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Avatar */}
      <View
        className="absolute rounded-full overflow-hidden justify-center items-center"
        style={styles.avatarContainer}
      >
        <Image source={avatarPath} style={styles.avatarImage} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  personContainer: {
    marginLeft: scale(-32),
    marginBottom: scale(14),
  },
  circleStripeContainer: {
    marginRight: scale(12),
  },
  personCircle: {
    width: scale(120),
    height: scale(120),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,
    elevation: 8,
  },
  personStripe: {
    marginLeft: scale(-60),
    height: scale(70),
    paddingLeft: scale(50),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,
    elevation: 8,
  },
  personName: {
    fontSize: scale(20),
    marginLeft: scale(16),
  },
  personSurname: {
    fontSize: scale(16),
    marginLeft: scale(16),
  },
  avatarContainer: {
    width: scale(105),
    height: scale(105),
    top: scale(8),
    left: scale(6),
  },
  avatarImage: {
    width: scale(120),
    height: scale(120),
    resizeMode: "cover",
  },
});
