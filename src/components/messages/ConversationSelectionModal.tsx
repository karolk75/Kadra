import { SearchBar } from "@/components/main/SearchBar";
import { ThemeColors } from "@/constants/ThemeColors";
import { TeacherContact } from "@/types/TeacherContact";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

type ConversationSelectionModalProps = {
  visible: boolean;
  onClose: () => void;
  schools: string[];
  teachers: TeacherContact[];
  onSelectTeacher: (teacherId: string) => void;
};

export const ConversationSelectionModal: React.FC<
  ConversationSelectionModalProps
> = ({ visible, onClose, schools, teachers, onSelectTeacher }) => {
  const [step, setStep] = useState<"schools" | "teachers">("schools");
  const [selectedSchool, setSelectedSchool] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSchools, setFilteredSchools] = useState<string[]>([]);
  const [filteredTeachers, setFilteredTeachers] = useState<TeacherContact[]>(
    [],
  );

  // Reset state when modal opens
  useEffect(() => {
    if (visible) {
      setStep("schools");
      setSelectedSchool("");
      setSearchQuery("");
      setFilteredSchools(schools);
      setFilteredTeachers([]);
    }
  }, [visible, schools]);

  // Handle search for schools
  useEffect(() => {
    if (step === "schools") {
      if (!searchQuery) {
        setFilteredSchools(schools);
      } else {
        const query = searchQuery.toLowerCase();
        setFilteredSchools(
          schools.filter((school) => school.toLowerCase().includes(query)),
        );
      }
    }
  }, [searchQuery, step, schools]);

  // Handle search for teachers
  useEffect(() => {
    if (step === "teachers" && selectedSchool) {
      const schoolTeachers = teachers.filter(
        (teacher) => teacher.school === selectedSchool,
      );

      if (!searchQuery) {
        setFilteredTeachers(schoolTeachers);
      } else {
        const query = searchQuery.toLowerCase();
        setFilteredTeachers(
          schoolTeachers.filter(
            (teacher) =>
              teacher.name.toLowerCase().includes(query) ||
              teacher.subject.toLowerCase().includes(query),
          ),
        );
      }
    }
  }, [searchQuery, step, selectedSchool, teachers]);

  const handleSchoolSelect = (school: string) => {
    setSelectedSchool(school);
    setStep("teachers");
    setSearchQuery("");

    const schoolTeachers = teachers.filter(
      (teacher) => teacher.school === school,
    );
    setFilteredTeachers(schoolTeachers);
  };

  const handleTeacherSelect = (teacherId: string) => {
    onSelectTeacher(teacherId);
    onClose();
  };

  const handleBackToSchools = () => {
    setStep("schools");
    setSelectedSchool("");
    setSearchQuery("");
    setFilteredSchools(schools);
  };

  const renderSchoolItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.item}
      className="flex-row items-center justify-between border-b border-[#E8E8E8]"
      onPress={() => handleSchoolSelect(item)}
      activeOpacity={0.7}
    >
      <View className="flex-row items-center flex-1">
        <Ionicons
          name="school-outline"
          size={scale(20)}
          color="#89A8B2"
          style={styles.icon}
        />
        <Text
          style={styles.itemText}
          className="font-poppins-regular text-gray-700"
        >
          {item}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={scale(18)} color="#89A8B2" />
    </TouchableOpacity>
  );

  const renderTeacherItem = ({ item }: { item: TeacherContact }) => (
    <TouchableOpacity
      style={styles.item}
      className="flex-row items-center justify-between border-b border-[#E8E8E8]"
      onPress={() => handleTeacherSelect(item.id)}
      activeOpacity={0.7}
    >
      <View className="flex-row items-center flex-1">
        <View
          style={styles.avatarContainer}
          className="bg-[#89A8B2] overflow-hidden justify-center items-center"
        >
          {item.avatar}
        </View>
        <View className="flex-1">
          <Text
            style={styles.teacherName}
            className="font-poppins-normal text-grey-700"
          >
            {item.name}
          </Text>
          <Text
            style={styles.teacherSubject}
            className="font-poppins-regular text-[#89A8B2]"
          >
            {item.subject}
          </Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={scale(18)} color="#89A8B2" />
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View
          className="w-11/12 h-4/6 bg-white rounded-3xl overflow-hidden"
          style={styles.modalView}
        >
          {/* Header */}
          <View
            style={styles.header}
            className="flex-row items-center justify-between border-b border-[#E8E8E8]"
          >
            {step === "teachers" ? (
              <TouchableOpacity
                onPress={handleBackToSchools}
                style={styles.backButton}
                className="items-center"
              >
                <Ionicons name="arrow-back" size={scale(24)} color="#0B3954" />
              </TouchableOpacity>
            ) : (
              <View style={styles.backButton} className="items-center" />
            )}
            <Text
              style={styles.title}
              className="flex-1 text-center font-poppins-bold text-darkblue"
            >
              {step === "schools" ? "Wybierz szkołę" : "Wybierz nauczyciela"}
            </Text>
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeButton}
              className="items-center"
            >
              <Ionicons
                name="close"
                size={scale(24)}
                color={ThemeColors.BRICK_RED}
              />
            </TouchableOpacity>
          </View>

          {/* Search */}
          <View style={styles.searchContainer}>
            <SearchBar
              placeholder={
                step === "schools"
                  ? "Wyszukaj szkołę..."
                  : "Wyszukaj nauczyciela..."
              }
              onChangeText={setSearchQuery}
              value={searchQuery}
            />
          </View>

          {/* List container */}
          <View style={styles.listWrapper} className="flex-1">
            {step === "schools" ? (
              <FlatList
                data={filteredSchools}
                renderItem={renderSchoolItem}
                keyExtractor={(item) => item}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={true}
                ListEmptyComponent={
                  <View style={styles.emptyContainer} className="items-center">
                    <Text
                      style={styles.emptyText}
                      className="font-poppins-regular text-[#89A8B2]"
                    >
                      Nie znaleziono szkół
                    </Text>
                  </View>
                }
              />
            ) : (
              <FlatList
                data={filteredTeachers}
                renderItem={renderTeacherItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={true}
                ListEmptyComponent={
                  <View style={styles.emptyContainer} className="items-center">
                    <Text
                      style={styles.emptyText}
                      className="font-poppins-regular text-[#89A8B2]"
                    >
                      Nie znaleziono nauczycieli
                    </Text>
                  </View>
                }
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(16),
  },
  title: {
    fontSize: scale(18),
  },
  backButton: {
    padding: scale(4),
    width: scale(32),
  },
  closeButton: {
    padding: scale(4),
    width: scale(32),
  },
  searchContainer: {
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(2),
  },
  listWrapper: {
    marginBottom: verticalScale(16),
  },
  listContent: {
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(8),
    paddingBottom: verticalScale(20),
  },
  item: {
    paddingVertical: verticalScale(12),
  },
  icon: {
    marginRight: scale(12),
  },
  itemText: {
    fontSize: scale(16),
  },
  avatarContainer: {
    height: scale(40),
    width: scale(40),
    borderRadius: scale(20),
    marginRight: scale(12),
  },
  teacherName: {
    fontSize: scale(16),
  },
  teacherSubject: {
    fontSize: scale(14),
  },
  emptyContainer: {
    padding: verticalScale(20),
  },
  emptyText: {
    fontSize: scale(16),
  },
});
