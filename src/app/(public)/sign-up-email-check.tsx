// TODO: Create lambda function that will check if email already exists in Cognito
// If user exist and confirmed, redirect to sign-in
// If user exist and not confirmed, redirect to confirm-sign-up
// If user does not exist, redirect to sign-up

import { router } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { verticalScale } from "react-native-size-matters";

import { Background } from "@/src/components/Background";
import { AuthButton } from "@/src/components/auth/AuthButton";
import { AuthInput } from "@/src/components/auth/AuthInput";
import {
  AuthSocialButton,
  Social,
} from "@/src/components/auth/AuthSocialButton";
import { AuthTitle } from "@/src/components/auth/AuthTitle";
import { BackButton } from "@/src/components/auth/BackButton";
import { BottomLink } from "@/src/components/auth/BottomLink";
import { ErrorMessage } from "@/src/components/auth/ErrorMessage";
import { KeyboardAwareContainer } from "@/src/components/KeyboardAwareContainer";
import { SeparatorText } from "@/src/components/auth/SeparatorText";
import LoginBackground from "@/src/svg/background";

export default function EmailCheckScreen() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleCheckEmail = async () => {
    setError("");

    if (!email) {
      setError("Proszę wprowadzić adres e-mail.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Proszę wprowadzić poprawny adres e-mail.");
      return;
    }

    router.push({
      pathname: "/(public)/sign-up",
      params: { email },
    });

    // try {
    //   await signUp(email, 'randomPasswordThatShouldFail123!', 'test', 'test', '+01123456789');
    //   router.push('/(public)/sign-in');
    // } catch (err: any) {
    //   console.log("Error", err);
    //   console.log("Error code", err.code);
    //   if (err.code === 'UserNotFoundException') {
    //     // Użytkownik nie istnieje -> przenieś na nowy ekran rejestracji
    //     router.push({
    //       pathname: '/(public)/sign-up',
    //       params: { email },
    //     });
    //   } else if (err.code === 'NotAuthorizedException') {
    //     router.push('/(public)/sign-in');
    //   } else {
    //     setError(err?.message || 'Wystąpił błąd. Spróbuj ponownie.');
    //   }
    // }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <View className="flex-1 bg-white relative">
      <Background BackgroundComponent={LoginBackground} />

      <KeyboardAwareContainer>
        <BackButton />
        <AuthTitle>Dołącz do nas!</AuthTitle>

        <AuthSocialButton
          title="KONTYNUUJ PRZEZ FACEBOOKA"
          iconName={Social.FACEBOOK}
          iconColor="#fff"
          textColor="#FAF8F5"
          style={{ marginBottom: verticalScale(8) }}
          className="flex-row items-center justify-center bg-[#615EEE]"
          onPress={() => {}}
        />

        <AuthSocialButton
          title="KONTYNUUJ PRZEZ GOOGLE"
          iconName={Social.GOOGLE}
          iconColor="#DB4437"
          textColor="#333"
          style={{ marginBottom: verticalScale(16) }}
          className="flex-row items-center justify-center bg-[#FAF8F5] border border-gray-200"
          onPress={() => {}}
        />

        <SeparatorText
          style={{
            marginTop: verticalScale(14),
            marginBottom: verticalScale(70),
          }}
        >
          lub zarejstruj się przez {"\n"} adres e-mail
        </SeparatorText>

        {error ? <ErrorMessage message={error} /> : null}

        <AuthInput
          placeholder="Adres e-mail"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={{ marginBottom: verticalScale(12) }}
        />

        <AuthButton
          title="KONTYNUUJ"
          onPress={handleCheckEmail}
          style={{
            marginTop: verticalScale(65),
            marginBottom: verticalScale(37),
          }}
          className="bg-darkblue"
          titleClassName="text-white text-center font-poppins-bold"
        />

        <BottomLink
          question="MASZ JUŻ KONTO?"
          linkText="ZALOGUJ SIĘ"
          onPress={() => router.push("/(public)/sign-in")}
        />
      </KeyboardAwareContainer>
    </View>
  );
}
