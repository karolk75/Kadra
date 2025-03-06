import { View, Text, StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

export default function TabBarIcon({ 
  icon: Icon, 
  focused,
  label
}: { 
  icon: React.ElementType; 
  focused: boolean;
  label: string;
}) {
  return (
    <View className="items-center justify-center w-[25vw] h-full" style={styles.container}>
      <Icon 
        width={scale(30)} 
        height={verticalScale(24)} 
        color={focused ? "#D4B97B" : "#CCCCCC"} 
        focused={focused} 
      />
      <Text 
        className={focused ? "text-gold font-poppins-medium" : "text-gray font-poppins-regular text-center"}
        style={styles.label}
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: verticalScale(7)
  },
  label: {
    fontSize: scale(10),
    marginTop: verticalScale(2),
    lineHeight: verticalScale(13)
  }
});