import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { signIn } from 'aws-amplify/auth';
import { SafeAreaView } from 'react-native-safe-area-context';

// Icons from Expo Vector Icons
import { Ionicons, FontAwesome } from '@expo/vector-icons';

// Wave background from your svg/logowanie folder
import LogowanieBackground from '@/src/svg/logowanie/background';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Animated, { useSharedValue, runOnJS } from 'react-native-reanimated';



interface SignInProps {
  onSwitchToSignUp: () => void;
  onSignInSuccess: () => void;
  onBackPress: () => void;
}

export function CustomSignIn({
  onSwitchToSignUp,
  onSignInSuccess,
  onBackPress,
}: SignInProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const translationX = useSharedValue(0);

  const { width, height } = Dimensions.get('window');

  const handleSignIn = async () => {
    try {
      await signIn({ username, password });
      onSignInSuccess();
    } catch (err: any) {
      setError(err.message || 'Błąd logowania');
    }
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translationX.value = event.translationX;
    })
    .onEnd(() => {
      if (translationX.value > 100) {
        runOnJS(onBackPress)();
      }
      translationX.value = 0;
    });

  return (
    <GestureDetector gesture={panGesture}>
      <View className="flex-1 relative bg-white">
        {/* Wave background behind everything */}
        <View className="absolute w-full h-full">
          <LogowanieBackground
            width={width}
            height={height}
            preserveAspectRatio="xMinYMin slice"
          />
        </View>

        <KeyboardAwareScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: scale(20),
            paddingTop: verticalScale(20),
            paddingBottom: verticalScale(20),
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <SafeAreaView style={{ flex: 1 }}>
            {/* Back arrow button */}
            <TouchableOpacity
              onPress={onBackPress}
              style={{
                marginBottom: verticalScale(10),
              }}
            >
              <Ionicons name="arrow-back" size={scale(24)} color="#000" />
            </TouchableOpacity>

            {/* Main content */}
            <View>
              {/* Title */}
              <Text
                style={{
                  fontSize: scale(24),
                  marginBottom: verticalScale(20),
                }}
                className="self-center font-poppins-bold text-center"
              >
                Witaj ponownie!
              </Text>

              {/* Facebook Button */}
              <TouchableOpacity
                style={{
                  paddingVertical: verticalScale(14),
                  borderRadius: scale(25),
                  marginBottom: verticalScale(8),
                }}
                className="flex-row items-center justify-center bg-[#615EEE]"
              >
                <FontAwesome
                  name="facebook"
                  size={scale(20)}
                  color="#fff"
                  style={{ marginRight: scale(8) }}
                />
                <Text
                  style={{ fontSize: scale(14) }}
                  className="text-white font-poppins-medium"
                >
                  KONTYNUUJ PRZEZ FACEBOOKA
                </Text>
              </TouchableOpacity>

              {/* Google Button */}
              <TouchableOpacity
                style={{
                  paddingVertical: verticalScale(14),
                  borderRadius: scale(25),
                  marginBottom: verticalScale(16),
                }}
                className="flex-row items-center justify-center bg-[#FAF8F5] border border-gray-200"
              >
                <FontAwesome
                  name="google"
                  size={scale(20)}
                  color="#DB4437"
                  style={{ marginRight: scale(8) }}
                />
                <Text
                  style={{ fontSize: scale(14), color: '#333' }}
                  className="font-poppins-medium"
                >
                  KONTYNUUJ PRZEZ GOOGLE
                </Text>
              </TouchableOpacity>

              {/* Separator text */}
              <Text
                style={{
                  fontSize: scale(14),
                  marginTop: verticalScale(8),
                  marginBottom: verticalScale(30),
                }}
                className="text-center text-[#A1A4B2] font-poppins-bold"
              >
                lub zaloguj się przez {'\n'} adres e-mail
              </Text>

              {/* Error message */}
              {error ? (
                <Text
                  style={{
                    fontSize: scale(12),
                    marginBottom: verticalScale(10),
                  }}
                  className="text-red-500 text-center"
                >
                  {error}
                </Text>
              ) : null}

              {/* Email field */}
              <TextInput
                placeholder="Adres e-mail"
                placeholderTextColor="#9c9c9c"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                style={{
                  borderRadius: scale(8),
                  padding: scale(14),
                  marginBottom: verticalScale(16),
                  fontSize: scale(14),
                }}
                className="border border-[#C9C9C9] bg-[#F2F3F7] text-[#A1A4B2] font-poppins-light"
              />

              {/* Password field */}
              <TextInput
                placeholder="Hasło"
                placeholderTextColor="#9c9c9c"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                style={{
                  borderRadius: scale(8),
                  padding: scale(14),
                  marginBottom: verticalScale(12),
                  fontSize: scale(14),
                }}
                className="border border-[#C9C9C9] bg-[#F2F3F7] text-[#A1A4B2] font-poppins-light"
              />

              {/* Sign In button */}
              <TouchableOpacity
                onPress={handleSignIn}
                style={{
                  paddingVertical: verticalScale(14),
                  borderRadius: scale(25),
                  marginTop: verticalScale(10),
                  marginBottom: verticalScale(12),
                }}
                className="bg-darkblue"
              >
                <Text
                  style={{ fontSize: scale(14) }}
                  className="text-white text-center font-poppins-bold"
                >
                  ZALOGUJ SIĘ
                </Text>
              </TouchableOpacity>

              {/* Forgot Password link */}
              <TouchableOpacity
                style={{ marginBottom: verticalScale(30) }}
              >
                <Text
                  style={{ fontSize: scale(14) }}
                  className="text-[#9c9c9c] text-center font-poppins-bold"
                >
                  Zapomniałeś hasła?
                </Text>
              </TouchableOpacity>

              {/* Bottom link */}
              <View className="flex-row justify-center">
                <Text
                  style={{ fontSize: scale(14) }}
                  className="text-[#9c9c9c] mr-1 font-poppins-regular"
                >
                  NIE POSIADASZ KONTA?
                </Text>
                <TouchableOpacity onPress={onSwitchToSignUp}>
                  <Text
                    style={{ fontSize: scale(14) }}
                    className="text-darkblue font-poppins-bold"
                  >
                    ZAREJESTRUJ SIĘ
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </KeyboardAwareScrollView>
      </View>
    </GestureDetector>
  );
}
