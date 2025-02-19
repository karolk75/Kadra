import { confirmSignUp } from "aws-amplify/auth";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface ConfirmSignUpProps {
    email: string;
    onConfirmSuccess: () => void;
    onResendCode: () => void;
}

export function CustomConfirmSignUp({
    email,
    onConfirmSuccess,
    onResendCode,
}: ConfirmSignUpProps) {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const handleConfirm = async () => {
        try {
        await confirmSignUp({username: email, confirmationCode: code});
        onConfirmSuccess();
        } catch (err: any) {
        setError(err.message || 'Error confirming sign up');
        }
    };

    return (
        <SafeAreaView className="flex-1 justify-center items-center bg-gray-100 p-6">
            <View className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <Text className="text-2xl font-bold mb-4 text-center">Potwierdź rejestrację</Text>
                <Text className="text-center mb-4">Kod weryfikacyjny został wysłany do {email}</Text>
                {error ? <Text className="text-red-500 text-center mb-2">{error}</Text> : null}
                <TextInput
                placeholder="Wpisz kod weryfikacyjny"
                value={code}
                onChangeText={setCode}
                keyboardType="number-pad"
                className="border border-gray-300 rounded p-3 mb-4"
                />
                <TouchableOpacity onPress={handleConfirm} className="bg-purple-500 rounded p-3">
                <Text className="text-white text-center font-semibold">Potwierdź</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onResendCode} className="mt-4">
                <Text className="text-blue-500 text-center">Wyślij ponownie kod</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}