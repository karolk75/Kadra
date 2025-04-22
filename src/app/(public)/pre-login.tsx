import { router } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";

// SVG imports
import { Background } from "@/components/Background";
import { AuthButton } from "@/components/auth/AuthButton";
import { BottomLink } from "@/components/auth/BottomLink";
import PreLoginBackground from "@/svg/pre-login/background";
import KadraLogo from "@/svg/pre-login/kadra-logo";

export default function PreLogin() {
  const onSignInPress = () => {
    router.push("/(public)/sign-in");
  };

  const onSignUpPress = () => {
    router.push("/(public)/sign-up-email-check");
  };

  return (
    <View className="flex-1 relative bg-white">
      <Background BackgroundComponent={PreLoginBackground} />

      <View className="absolute top-16 self-center">
        <KadraLogo />
      </View>

      <SafeAreaView className="flex-1">
        <View
          style={{
            paddingHorizontal: scale(20),
            paddingBottom: verticalScale(60),
          }}
          className="flex-1 items-center justify-end"
        >
          <Text className="text-[#DAC081] text-2xl font-poppins-bold text-center mb-2">
            ODKRYJ SWOJĄ PASJĘ
          </Text>

          <Text
            style={{ marginBottom: verticalScale(20) }}
            className="text-[#A1A4B2] text-base text-center font-poppins-light"
          >
            Znajdz zajecia dla siebie {"\n"}i rob to, co kochasz
          </Text>

          <AuthButton
            title="ZALOGUJ SIĘ"
            onPress={onSignInPress}
            style={{
              marginBottom: verticalScale(10),
              paddingHorizontal: scale(100),
              paddingVertical: verticalScale(14),
            }}
            className="bg-[#89A8B2]"
            titleClassName="text-white font-poppins-extrabold text-center"
          />

          <BottomLink
            question="NIE POSIADASZ KONTA?"
            linkText="ZAREJESTRUJ SIĘ"
            onPress={onSignUpPress}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
