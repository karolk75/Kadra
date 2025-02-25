import { Text, TextInput, TextInputProps, View } from "react-native";

export const FormInput = ({
  label,
  error,
  ...props
}: TextInputProps & { label?: string; error?: string }) => (
  <View className="mb-4">
    {label && <Text className="text-sm font-medium mb-1">{label}</Text>}
    <TextInput
      className={`border rounded-lg p-3 ${
        error ? "border-red-500" : "border-gray-300"
      }`}
      {...props}
    />
    {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
  </View>
);
