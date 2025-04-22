import ProfileIconBackground from "@/svg/profile/profile-icon-background";
import { Image, StyleSheet, Text, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

type ProfileHeaderProps = {
  name: string;
  profileImage: string | undefined;
};

export const ProfileHeader = ({ name, profileImage }: ProfileHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{name}</Text>
      </View>
      <View>
        <View
          style={{
            width: scale(120),
            height: verticalScale(120),
            marginRight: scale(-25),
          }}
        >
          <ProfileIconBackground />
          <View
            style={{
              position: "absolute",
              top: verticalScale(16),
              left: scale(12),
              width: scale(85),
              height: scale(85),
              borderRadius: scale(40),
              overflow: "hidden",
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={
                profileImage
                  ? { uri: profileImage }
                  : require("assets/images/foto_boy.png")
              }
              style={{ width: scale(85), height: scale(85) }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(10),
  },
  textContainer: {
    flex: 1,
  },
  nameText: {
    fontFamily: "Poppins-Bold",
    fontSize: scale(24),
    color: "#7B8794", // Light blue color from design
  },
  avatarContainer: {
    marginLeft: scale(10),
  },
});
