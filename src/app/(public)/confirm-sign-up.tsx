import { router, useGlobalSearchParams } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { scale } from "react-native-size-matters";

import { Background } from "@/components/Background";
import { KeyboardAwareContainer } from "@/components/KeyboardAwareContainer";
import { AuthButton } from "@/components/auth/AuthButton";
import { AuthInput } from "@/components/auth/AuthInput";
import { AuthTitle } from "@/components/auth/AuthTitle";
import { BackButton } from "@/components/auth/BackButton";
import { BottomLink } from "@/components/auth/BottomLink";
import { ErrorMessage } from "@/components/auth/ErrorMessage";
import { SeparatorText } from "@/components/auth/SeparatorText";
import { useSession } from "@/context/AuthContext";
import LoginBackground from "@/svg/background";

export default function CustomConfirmSignUp() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const { email } = useGlobalSearchParams();
  const emailString = Array.isArray(email) ? email[0] : email;

  const { resendCode, confirmSignUp } = useSession();

  const onConfirmSuccess = () => {
    router.push("/(public)/sign-in");
  };

  const onResendCode = async () => {
    try {
      await resendCode(emailString);
    } catch (err: any) {
      setError(err?.message || "Błąd podczas ponownego wysyłania kodu");
    }
  };

  const handleConfirm = async () => {
    try {
      await confirmSignUp(emailString, code);
      onConfirmSuccess();
    } catch (err: any) {
      setError(err?.message || "Error confirming sign up");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }} className="relative">
      <Background BackgroundComponent={LoginBackground} />

      <KeyboardAwareContainer>
        <BackButton />
        <AuthTitle>Potwierdź rejestrację</AuthTitle>

        <SeparatorText
          style={{
            marginTop: scale(50),
            marginBottom: scale(100),
          }}
        >
          Na Twój adres e-mail został {"\n"} przesłany kod w celu {"\n"}{" "}
          weryfikacji, wpisz go poniżej
        </SeparatorText>

        <ErrorMessage message={error} />

        <AuthInput
          placeholder="6 - cyfrowy kod"
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
          style={{ marginBottom: scale(5) }}
        />

        <BottomLink
          question="MAIL NIE DOTARŁ?"
          linkText="WYŚLIJ PONOWNIE"
          onPress={onResendCode}
        />

        <AuthButton
          title="ZWERYFIKUJ"
          onPress={handleConfirm}
          style={{ marginTop: scale(107), marginBottom: scale(12) }}
          className="bg-darkblue"
          titleClassName="text-white text-center font-poppins-bold"
        />
      </KeyboardAwareContainer>
    </View>
  );
}
