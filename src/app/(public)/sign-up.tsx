import { router, useGlobalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Dimensions, View } from "react-native";
import { verticalScale } from "react-native-size-matters";

import { BackButton } from "@/src/components/auth/BackButton";
import { ErrorMessage } from "@/src/components/auth/ErrorMessage";
import { KeyboardAwareContainer } from "@/src/components/KeyboardAwareContainer";
import { Background } from "@/src/components/Background";
import { AuthButton } from "@/src/components/auth/AuthButton";
import { AuthInput } from "@/src/components/auth/AuthInput";
import { AuthTitle } from "@/src/components/auth/AuthTitle";
import { useSession } from "@/src/context";
import LoginBackground from "@/src/svg/background";

export default function CustomSignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { email } = useGlobalSearchParams();

  const { signUp } = useSession();

  const onSignUpSuccess = (email: string) => {
    router.push({ pathname: "/(public)/confirm-sign-up", params: { email } });
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      if (typeof email === "string") {
        await signUp(email, password, firstName, lastName, phoneNumber);
        onSignUpSuccess(email);
      } else {
        setError("Invalid email format.");
      }
    } catch (err: any) {
      setError(err?.message || "Error signing up");
    }
  };

  return (
    <View className="flex-1 relative bg-white">
      <Background BackgroundComponent={LoginBackground} />

      <KeyboardAwareContainer>
        <BackButton />
        <AuthTitle>Dołącz do nas!</AuthTitle>

        {error ? <ErrorMessage message={error} /> : null}

        <AuthInput
          placeholder="Imię"
          value={firstName}
          onChangeText={setFirstName}
          autoCapitalize="words"
          style={{
            marginBottom: verticalScale(16),
            marginTop: verticalScale(16),
          }}
        />

        <AuthInput
          placeholder="Nazwisko"
          value={lastName}
          onChangeText={setLastName}
          autoCapitalize="words"
          style={{ marginBottom: verticalScale(16) }}
        />

        <AuthInput
          placeholder="Numer telefonu"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          style={{ marginBottom: verticalScale(16) }}
        />

        <AuthInput
          placeholder="Hasło"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{ marginBottom: verticalScale(16) }}
        />

        <AuthInput
          placeholder="Potwierdź hasło"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={{ marginBottom: verticalScale(16) }}
        />

        <AuthButton
          title="ZAREJESTRUJ SIĘ"
          onPress={handleSignUp}
          style={{
            marginTop: verticalScale(44),
            marginBottom: verticalScale(8),
          }}
          className="bg-darkblue"
          titleClassName="text-white text-center font-poppins-bold"
        />
      </KeyboardAwareContainer>
    </View>
  );
}
