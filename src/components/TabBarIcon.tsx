import { View, Text } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

export default function TabBarIcon({ 
  icon: Icon, 
  color, 
  focused,
  label
}: { 
  icon: React.ElementType; 
  color: string;
  focused: boolean;
  label: string;
}) {
  return (
    <View className="items-center justify-center" style={{ paddingTop: verticalScale(10), paddingBottom: verticalScale(5) }}>
      <Icon width={scale(50)} height={verticalScale(20)} color={focused ? "#D4B97B" : "#CCCCCC"} focused={focused} />
      <Text 
        className={focused ? "text-[#D4B97B] font-poppins-medium text" : "text-[#9E9E9E] font-poppins-regular"}
        style={{ fontSize: scale(10), marginTop: verticalScale(5) }}
      >
        {label}
      </Text>
    </View>
  );
}