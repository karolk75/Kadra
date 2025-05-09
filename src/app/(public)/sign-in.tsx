import { router } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

import { AuthButton } from "@/components/auth/AuthButton";
import { AuthInput } from "@/components/auth/AuthInput";
import { AuthSocialButton, Social } from "@/components/auth/AuthSocialButton";
import { AuthTitle } from "@/components/auth/AuthTitle";
import { BackButton } from "@/components/auth/BackButton";
import { BottomLink } from "@/components/auth/BottomLink";
import { ErrorMessage } from "@/components/auth/ErrorMessage";
import { SeparatorText } from "@/components/auth/SeparatorText";
import { Background } from "@/components/Background";
import { KeyboardAwareContainer } from "@/components/KeyboardAwareContainer";
import { useSession } from "@/context/AuthContext";
import LoginBackground from "@/svg/background";

export default function CustomSignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = useSession();

  const onSwitchToSignUp = () => {
    router.push("/(public)/sign-up-email-check");
  };

  const handleSignIn = async () => {
    if (!validateEmail(username)) {
      setError("Nieprawidłowy adres e-mail.");
      return;
    }

    try {
      const result = await signIn(username, password);
      if (!result) {
        setError("Błędny adres e-mail lub hasło.");
      }
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

        <ErrorMessage message={error} />

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
