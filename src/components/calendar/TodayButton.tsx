import { DAYS } from "@/constants/Days";
import { Text, TouchableOpacity } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { scale } from "react-native-size-matters";

interface TodayButtonProps {
  onSelect: () => void;
}

export default function TodayButton({ onSelect }: TodayButtonProps) {
  const today = new Date();
  const todayScale = useSharedValue(1);
  const todayRotate = useSharedValue(0);

  // Get formatted current day and date
  const getCurrentDayAndDate = () => {
    const dayName = DAYS[today.getDay()];
    const dayNumber = today.getDate();
    const month = today.getMonth() + 1; // Months are 0-indexed
    const year = today.getFullYear();

    return `${dayName}, ${dayNumber.toString().padStart(2, "0")}.${month
      .toString()
      .padStart(2, "0")}.${year}`;
  };

  const todayAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: todayScale.value },
        { rotate: `${todayRotate.value}deg` }, // Use degrees instead of turns
      ],
    };
  });

  const animateTodayButton = () => {
    // Reset values first
    todayScale.value = 1;
    todayRotate.value = 0;

    onSelect();

    // Sequence: slightly shrink → grow a bit larger → back to normal
    todayScale.value = withSequence(
      withTiming(0.9, { duration: 60 }),
      withSpring(1.1, { damping: 12, stiffness: 180, mass: 0.6 }),
      withSpring(1, { damping: 12, stiffness: 180, mass: 0.6 }),
    );

    // Add a very slight wobble effect
    todayRotate.value = withSequence(
      withTiming(2, { duration: 120 }),
      withTiming(-2, { duration: 140 }),
      withTiming(0, { duration: 120 }),
    );
  };

  return (
    <TouchableOpacity onPress={animateTodayButton}>
      <Animated.View style={todayAnimatedStyle} className="items-end">
        <Text
          className="font-poppins-bold text-darkblue"
          style={{ fontSize: scale(16) }}
        >
          Dziś
        </Text>
        <Text
          className="font-poppins-medium text-darkblue"
          style={{ fontSize: scale(14) }}
        >
          {getCurrentDayAndDate()}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
}
