import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// SVG imports
import Background from '@/src/svg/pre-logowanie/background';
import KadraLogo from '@/src/svg/pre-logowanie/kadra-logo';
import { router } from 'expo-router';


export default function PreLogin() {
  const { width, height } = Dimensions.get('window');

  const onSignInPress = () => {
    router.push("/(public)/sign-in");
  }

  const onSignUpPress = () => {
    router.push("/(public)/sign-up");
  }

  return (
    <View className="flex-1 relative bg-white">
    {/* Background absolutely positioned behind everything */}
      <View className="absolute w-full h-full">
        <Background
          width={width}
          height={height}
          preserveAspectRatio="xMinYMin slice"
        />
        {/* Kadra logo pinned at a consistent spot over the wave */}
        <View className="absolute top-16 self-center">
          <KadraLogo />
        </View>
      </View>

      <SafeAreaView className="flex-1 ">
        <View className="flex-1 items-center justify-end px-4 pb-12">
          <Text className="text-[#DAC081] text-2xl font-poppins-bold text-center mb-2">
            ODKRYJ SWOJĄ PASJĘ
          </Text>
          <Text className="text-[#A1A4B2] text-base text-center font-poppins-light mb-20">
            Znajdz zajecia dla siebie {'\n'}i rob to, co kochasz
          </Text>

          <TouchableOpacity
            onPress={onSignInPress}
            className="bg-[#89A8B2] rounded-full py-4 px-16 mb-6"
          >
            <Text className="text-white font-poppins-extrabold text-center text-base">
              ZALOGUJ SIĘ
            </Text>
          </TouchableOpacity>

          <View className="flex-row justify-center">
            <Text className="text-[#A1A4B2] mr-1 font-poppins-regular">NIE POSIADASZ KONTA?</Text>
            <TouchableOpacity onPress={onSignUpPress}>
              <Text className="text-[#89A8B2] font-poppins-bold">ZAREJESTRUJ SIĘ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
