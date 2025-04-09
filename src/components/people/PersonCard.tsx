import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { scale } from "react-native-size-matters";

type PersonCardProps = {
  id: string;
  name: string;
  relation: string;
  onDelete: (id: string) => void;
  onEdit?: (id: string) => void;
};

export const PersonCard = ({ id, name, relation, onDelete, onEdit }: PersonCardProps) => {
  return (
    <View 
      className="bg-white rounded-lg p-4 mb-3 shadow-sm flex-row justify-between items-center"
    >
      <View>
        <Text className="font-poppins-medium" style={{ fontSize: scale(16) }}>
          {name}
        </Text>
        <Text className="font-poppins-light text-[#A1A4B2]" style={{ fontSize: scale(14) }}>
          {relation}
        </Text>
      </View>
      <View className="flex-row">
        {onEdit && (
          <TouchableOpacity 
            className="bg-blue-100 rounded-full p-2 mr-2" 
            onPress={() => onEdit(id)}
          >
            <Text className="font-poppins-medium text-lightblue">
              Edytuj
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity 
          className="bg-red-100 rounded-full p-2" 
          onPress={() => onDelete(id)}
        >
          <Text className="font-poppins-medium text-red-500">
            Usuń
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}; 