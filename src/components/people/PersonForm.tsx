import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

type Person = {
  id: string;
  name: string;
  relation: string;
};

type PersonFormProps = {
  onSubmit: (person: Omit<Person, "id">) => void;
  initialData?: Omit<Person, "id">;
  buttonText?: string;
  title?: string;
};

export const PersonForm = ({ 
  onSubmit, 
  initialData = { name: "", relation: "" },
  buttonText = "Dodaj",
  title = "Dodaj Osobę"
}: PersonFormProps) => {
  const [name, setName] = useState(initialData.name);
  const [relation, setRelation] = useState(initialData.relation);

  const handleSubmit = () => {
    if (name.trim() === "") {
      Alert.alert("Błąd", "Proszę podać imię");
      return;
    }

    onSubmit({
      name: name.trim(),
      relation: relation.trim() || "Nie określono",
    });

    // Reset form if not editing
    if (!initialData.name) {
      setName("");
      setRelation("");
    }
  };

  return (
    <View 
      className="bg-white rounded-lg p-4 shadow-md" 
      style={{ marginBottom: verticalScale(20) }}
    >
      <Text 
        className="font-poppins-medium text-lightblue" 
        style={{ fontSize: scale(18), marginBottom: verticalScale(10) }}
      >
        {title}
      </Text>
      
      <TextInput
        className="border border-[#E5E5E5] rounded-lg p-3 font-poppins-regular"
        style={{ marginBottom: verticalScale(10) }}
        placeholder="Imię i nazwisko"
        value={name}
        onChangeText={setName}
      />
      
      <TextInput
        className="border border-[#E5E5E5] rounded-lg p-3 font-poppins-regular"
        style={{ marginBottom: verticalScale(15) }}
        placeholder="Relacja (np. dziecko, rodzic)"
        value={relation}
        onChangeText={setRelation}
      />
      
      <TouchableOpacity 
        className="bg-lightblue rounded-lg items-center justify-center p-3"
        onPress={handleSubmit}
      >
        <Text className="font-poppins-medium text-white" style={{ fontSize: scale(16) }}>
          {buttonText}
        </Text>
      </TouchableOpacity>
    </View>
  );
}; 