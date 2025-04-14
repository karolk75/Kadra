import { ReactNode } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

type NavigationBoxProps = {
  title: string;
  icon: ReactNode;
  subtitle?: string[];
  onPress?: () => void;
};

export const NavigationBox = ({
  title,
  icon,
  subtitle,
  onPress,
}: NavigationBoxProps) => {
  return (
    <View className="w-[48%] rounded-lg" style={styles.container}>
      <TouchableOpacity
        className="w-full bg-lightblue rounded-lg overflow-hidden relative"
        style={styles.touchableBox}
        activeOpacity={0.8}
        onPress={onPress}
      >
        <View className="flex-1">
          {icon}
          <View
            className="absolute top-0 left-0"
            style={styles.contentContainer}
          >
            {subtitle
              ? subtitle.map((line, index) => (
                  <Text
                    key={index}
                    className="text-[#A1A4B2] font-poppins-medium"
                    style={styles.subtitleText}
                    numberOfLines={1}
                  >
                    {line}
                  </Text>
                ))
              : null}

            <View
              className={subtitle ? "absolute left-0 right-0" : ""}
              style={{
                top: subtitle ? moderateScale(135, 0.5) : 0,
                padding: subtitle ? scale(10) : 0,
                paddingTop: 0,
              }}
            >
              <Text
                className="text-white font-poppins-bold"
                style={styles.titleText}
                // numberOfLines={1}
              >
                {title}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(12),
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
  touchableBox: {
    height: moderateScale(170, 0.5),
  },
  contentContainer: {
    padding: scale(10),
  },
  subtitleText: {
    fontSize: scale(10),
  },
  titleText: {
    fontSize: scale(16),
  },
});
