import { router } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

import { BackButton } from "@/src/components/auth/BackButton";
import { BottomLink } from "@/src/components/auth/BottomLink";
import { ErrorMessage } from "@/src/components/auth/ErrorMessage";
import { KeyboardAwareContainer } from "@/src/components/KeyboardAwareContainer";
import { SeparatorText } from "@/src/components/auth/SeparatorText";
import { Background } from "@/src/components/Background";
import { AuthButton } from "@/src/components/auth/AuthButton";
import { AuthInput } from "@/src/components/auth/AuthInput";
import {
  AuthSocialButton,
  Social,
} from "@/src/components/auth/AuthSocialButton";
import { AuthTitle } from "@/src/components/auth/AuthTitle";
import { useSession } from "@/src/context";
import LoginBackground from "@/src/svg/background";

export default function CustomSignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = useSession();

  const onSwitchToSignUp = () => {
    router.push("/(public)/sign-up-email-check");
  };

  const onSignInSuccess = () => {
    router.replace("/(auth)/(tabs)");
  };

  const handleSignIn = async () => {
    if (!validateEmail(username)) {
      setError("Nieprawidłowy adres e-mail.");
      return;
    }

    try {
      await signIn(username, password);
      onSignInSuccess();
    } catch (err: any) {
      setError(err?.message || "Błąd logowania");
    }
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
        <AuthTitle>Witaj ponownie!</AuthTitle>

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
            marginBottom: verticalScale(40),
          }}
        >
          lub zaloguj się przez{"\n"}adres e-mail
        </SeparatorText>

        {error ? <ErrorMessage message={error} /> : null}

        <AuthInput
          placeholder="Adres e-mail"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          style={{ marginBottom: verticalScale(12) }}
        />

        <AuthInput
          placeholder="Hasło"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          style={{ marginBottom: verticalScale(12) }}
        />

        <AuthButton
          title="ZALOGUJ SIĘ"
          onPress={handleSignIn}
          style={{ marginTop: verticalScale(40) }}
          className="bg-darkblue"
          titleClassName="text-white text-center font-poppins-bold"
        />

        {/* Forgot Password link */}
        <TouchableOpacity style={{ marginBottom: verticalScale(10) }}>
          <Text
            style={{ fontSize: scale(14) }}
            className="text-[#9c9c9c] text-center font-poppins-bold"
          >
            Zapomniałeś hasła?
          </Text>
        </TouchableOpacity>

        {/* Bottom link */}
        <BottomLink
          question="NIE POSIADASZ KONTA?"
          linkText="ZAREJESTRUJ SIĘ"
          onPress={onSwitchToSignUp}
        />
      </KeyboardAwareContainer>
    </View>
  );
}
