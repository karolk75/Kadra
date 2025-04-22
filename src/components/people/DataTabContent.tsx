import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { scale } from "react-native-size-matters";

import { ThemeColors } from "@/constants/ThemeColors";
import { Child } from "@/types/Child";
import { format } from "date-fns";

interface DataTabContentProps {
  child: Child;
  onEditPress: () => void;
}

export const DataTabContent: React.FC<DataTabContentProps> = ({
  child,
  onEditPress,
}) => {
  const birthDateDisplay = child.birthDate
    ? format(new Date(child.birthDate), "dd.MM.yyyy")
    : "Brak danych";

  return (
    <View style={styles.container}>
      <View className="mb-4">
        <Text className="font-poppins-medium text-gray-500">Imię</Text>
        <Text className="font-poppins-regular text-black text-lg">
          {child.firstName}
        </Text>
      </View>

      <View className="mb-4">
        <Text className="font-poppins-medium text-gray-500">Nazwisko</Text>
        <Text className="font-poppins-regular text-black text-lg">
          {child.lastName}
        </Text>
      </View>

      <View className="mb-4">
        <Text className="font-poppins-medium text-gray-500">
          Data urodzenia
        </Text>
        <Text className="font-poppins-regular text-black text-lg">
          {birthDateDisplay}
        </Text>
      </View>

      {child.notes && (
        <View className="mb-4">
          <Text className="font-poppins-medium text-gray-500">Notatki</Text>
          <Text className="font-poppins-regular text-black text-lg">
            {child.notes}
          </Text>
        </View>
      )}

      {/* Edit Button */}
      <TouchableOpacity
        className="mt-6 py-3 rounded-xl flex-row justify-center items-center"
        style={styles.editButton}
        onPress={onEditPress}
      >
        <Ionicons
          name="pencil"
          size={scale(20)}
          color="white"
          style={{ marginRight: 8 }}
        />
        <Text
          className="font-poppins-bold text-white"
          style={styles.editButtonText}
        >
          Edytuj dane
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(10),
    borderRadius: scale(10),
    marginTop: scale(10),
  },
  editButton: {
    minHeight: scale(50),
    borderRadius: scale(10),
    backgroundColor: ThemeColors.BLUE_GRAY,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 4,
  },
  editButtonText: {
    fontSize: scale(18),
  },
});
