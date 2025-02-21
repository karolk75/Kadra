import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { signUp } from 'aws-amplify/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

// Wave background
import LogowanieBackground from '@/src/svg/logowanie/background';

// react-native-size-matters
import { scale, verticalScale } from 'react-native-size-matters';
import { router } from 'expo-router';
import { useAuth } from '@/src/context/AuthProvider';


export default function CustomSignUp() {
  const [email, setEmail] = useState('');
  const [preferredName, setPreferredName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();

  const { width, height } = Dimensions.get('window');

  const onSwitchToSignIn = () => {
    router.push("/(public)/sign-in");
  }

  const onSignUpSuccess = (email: string) => {
    router.push({pathname: "/(public)/confirm-sign-up", params: { email }});
  }

  const onBackPress = () => {
    router.back();
  }

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      await register(email, password, preferredName);
      onSignUpSuccess(email);
    } catch (err: any) {
      setError(err.message || 'Error signing up');
    }
  };

  return (
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
          {/* Back arrow button (only if you want it) */}
          {onBackPress && (
            <TouchableOpacity
              onPress={onBackPress}
              style={{
                marginBottom: verticalScale(10),
              }}
            >
              <Ionicons name="arrow-back" size={scale(24)} color="#000" />
            </TouchableOpacity>
          )}

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
              Dołącz do nas!
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
                marginBottom: verticalScale(20),
              }}
              className="text-center text-[#A1A4B2] font-poppins-bold"
            >
              lub zarejestruj się przez {'\n'} adres e-mail
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

            {/* Name field */}
            <TextInput
              placeholder="Imię"
              placeholderTextColor="#9c9c9c"
              value={preferredName}
              onChangeText={setPreferredName}
              autoCapitalize="words"
              style={{
                borderRadius: scale(8),
                padding: scale(14),
                marginBottom: verticalScale(12),
                fontSize: scale(14),
              }}
              className="border border-[#C9C9C9] bg-[#F2F3F7] text-[#A1A4B2] font-poppins-light"
            />

            {/* Email field */}
            <TextInput
              placeholder="Adres e-mail"
              placeholderTextColor="#9c9c9c"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              style={{
                borderRadius: scale(8),
                padding: scale(14),
                marginBottom: verticalScale(12),
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
              style={{
                borderRadius: scale(8),
                padding: scale(14),
                marginBottom: verticalScale(12),
                fontSize: scale(14),
              }}
              className="border border-[#C9C9C9] bg-[#F2F3F7] text-[#A1A4B2] font-poppins-light"
            />

            {/* Confirm Password field */}
            <TextInput
              placeholder="Potwierdź hasło"
              placeholderTextColor="#9c9c9c"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              style={{
                borderRadius: scale(8),
                padding: scale(14),
                marginBottom: verticalScale(12),
                fontSize: scale(14),
              }}
              className="border border-[#C9C9C9] bg-[#F2F3F7] text-[#A1A4B2] font-poppins-light"
            />

            {/* Sign Up button */}
            <TouchableOpacity
              onPress={handleSignUp}
              style={{
                paddingVertical: verticalScale(14),
                borderRadius: scale(25),
                marginTop: verticalScale(10),
                marginBottom: verticalScale(8),
              }}
              className="bg-darkblue"
            >
              <Text
                style={{ fontSize: scale(14) }}
                className="text-white text-center font-poppins-bold"
              >
                KONTYNUUJ
              </Text>
            </TouchableOpacity>

            {/* Bottom link */}
            <View className="flex-row justify-center mt-4">
              <Text
                style={{ fontSize: scale(14) }}
                className="text-[#9c9c9c] mr-1 font-poppins-regular"
              >
                MASZ JUŻ KONTO?
              </Text>
              <TouchableOpacity onPress={onSwitchToSignIn}>
                <Text
                  style={{ fontSize: scale(14) }}
                  className="text-darkblue font-poppins-bold"
                >
                  ZALOGUJ SIĘ
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </View>
  );
}
