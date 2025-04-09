import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { router } from "expo-router";

import { Background } from "@/components/Background";
import { KeyboardAwareContainer } from "@/components/KeyboardAwareContainer";
import { PersonCard } from "@/components/people/PersonCard";
import { PersonForm } from "@/components/people/PersonForm";
import ScreenBackground from "@/svg/background";
import KadraLogo from "@/svg/pre-login/kadra-logo";

type Person = {
  id: string;
  name: string;
  relation: string;
};

export default function PeopleScreen() {
  const [people, setPeople] = useState<Person[]>([]);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);

  const handleAddPerson = (personData: Omit<Person, "id">) => {
    const newPerson: Person = {
      id: Date.now().toString(),
      ...personData,
    };

    setPeople([...people, newPerson]);
  };

  const handleDeletePerson = (id: string) => {
    setPeople(people.filter(person => person.id !== id));
  };

  const handleEditPerson = (id: string) => {
    const personToEdit = people.find(person => person.id === id);
    if (personToEdit) {
      setEditingPerson(personToEdit);
    }
  };

  const handleUpdatePerson = (personData: Omit<Person, "id">) => {
    if (!editingPerson) return;
    
    setPeople(people.map(person => 
      person.id === editingPerson.id 
        ? { ...person, ...personData } 
        : person
    ));
    
    setEditingPerson(null);
  };

  const cancelEditing = () => {
    setEditingPerson(null);
  };

  return (
    <View className="flex-1 bg-white relative">
      <Background BackgroundComponent={ScreenBackground} />

      <KeyboardAwareContainer>
        <ScrollView className="flex-1" style={{ paddingHorizontal: scale(16) }}>
          {/* Header */}
          <View className="flex-row items-center justify-between" style={{ marginBottom: verticalScale(20) }}>
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="font-poppins-medium text-lightblue" style={{ fontSize: scale(16) }}>
                Powrót
              </Text>
            </TouchableOpacity>
            <View className="items-center">
              <KadraLogo />
            </View>
            <View style={{ width: scale(50) }} />
          </View>

          {/* Title */}
          <Text 
            className="font-poppins-bold text-lightblue text-center" 
            style={{ fontSize: scale(24), marginBottom: verticalScale(20) }}
          >
            Osoby
          </Text>

          {/* Form to add/edit person */}
          {editingPerson ? (
            <>
              <PersonForm 
                onSubmit={handleUpdatePerson}
                initialData={{ name: editingPerson.name, relation: editingPerson.relation }}
                buttonText="Zapisz zmiany"
                title="Edytuj Osobę"
              />
              <TouchableOpacity 
                onPress={cancelEditing}
                className="items-center mb-4"
              >
                <Text className="font-poppins-medium text-[#A1A4B2]">
                  Anuluj edycję
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <PersonForm onSubmit={handleAddPerson} />
          )}

          {/* List of added people */}
          <Text 
            className="font-poppins-medium text-lightblue" 
            style={{ fontSize: scale(18), marginBottom: verticalScale(10) }}
          >
            Lista Osób
          </Text>
          
          {people.length === 0 ? (
            <View className="items-center justify-center py-8">
              <Text className="font-poppins-light text-[#A1A4B2]" style={{ fontSize: scale(16) }}>
                Brak dodanych osób
              </Text>
            </View>
          ) : (
            people.map((person) => (
              <PersonCard
                key={person.id}
                id={person.id}
                name={person.name}
                relation={person.relation}
                onDelete={handleDeletePerson}
                onEdit={handleEditPerson}
              />
            ))
          )}
        </ScrollView>
      </KeyboardAwareContainer>
    </View>
  );
} 