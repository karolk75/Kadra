import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";

import { Background } from "@/components/Background";
import { KeyboardAwareContainer } from "@/components/KeyboardAwareContainer";
import { SearchBar } from "@/components/main/SearchBar";
import { UserAttributes } from "@/context";
import { useStorageState } from "@/context/useStorageState";
import { getMockTeachers } from "@/data/mockData";
import BoyAvatar from "@/svg/avatars/boyAvatar";
import GirlAvatar from "@/svg/avatars/girlAvatar";
import ScreenBackground from "@/svg/background";
import { TeacherContact } from "@/types/TeacherContact";
import { formatMessageTime } from "@/utils/utils";
import { ConversationSelectionModal } from "@/components/messages/ConversationSelectionModal";

const MOCK_TEACHERS: TeacherContact[] = getMockTeachers(
  <BoyAvatar />,
  <GirlAvatar />
);

export default function MessagesScreen() {
  const [attributes] = useStorageState<UserAttributes>("attributes");
  const [contacts, setContacts] = useState(MOCK_TEACHERS);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  
  // State for conversation modal
  const [modalVisible, setModalVisible] = useState(false);
  
  // Get unique schools from teachers
  const schools = [...new Set(MOCK_TEACHERS.map(teacher => teacher.school))];

  // Handle opening a chat with a teacher
  const handleOpenChat = (teacherId: string) => {
    // Mark all messages from this teacher as read
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === teacherId ? { ...contact, unreadCount: 0 } : contact
      )
    );

    // Navigate to the teacher conversation screen
    router.push({
      pathname: "/(auth)/conversation",
      params: { id: teacherId },
    });
  };

  // Handle creating a new conversation
  const handleNewConversation = () => {
    setModalVisible(true);
  };

  // Filter contacts based on search query
  const filteredContacts = contacts.filter((teacher) => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    return (
      teacher.name.toLowerCase().includes(query) ||
      teacher.subject.toLowerCase().includes(query)
    );
  });

  return (
    <View className="flex-1 bg-white relative">
      <Background BackgroundComponent={ScreenBackground} />

      <KeyboardAwareContainer>
        <ScrollView className="flex-1" style={{ paddingHorizontal: scale(8) }}>
          {/* Header */}
          <View style={{ marginBottom: verticalScale(5) }}>
            <Text
              className="font-poppins-bold text-lightblue"
              style={{ fontSize: scale(24) }}
              numberOfLines={1}
            >
              Wiadomości
            </Text>
          </View>

          {/* Search Box */}
          <SearchBar
            placeholder="Wyszukaj..."
            onChangeText={setSearchQuery}
            onIconPress={() => console.log("Search pressed")}
          />

          {/* Contact List */}
          <View className="flex-1">
            {filteredContacts.map((teacher) => (
              <TouchableOpacity
                key={teacher.id}
                className="flex-row items-center py-3 border-b border-gray-100"
                onPress={() => handleOpenChat(teacher.id)}
                activeOpacity={0.7}
              >
<<<<<<< HEAD
                {/* Avatar with online indicator */}
=======
                {/* Avatar */}
>>>>>>> feature/messages-tab
                <View className="relative">
                  <View className="h-12 w-12 bg-lightblue rounded-full overflow-hidden justify-center items-center">
                    {teacher.avatar}
                  </View>
                </View>

                {/* Message preview */}
                <View className="flex-1 ml-3" style={{ maxWidth: "75%" }}>
                  <View className="flex-row justify-between items-center w-full">
                    <Text
                      className="font-poppins-bold text-lightblue"
                      style={{
<<<<<<< HEAD
                        fontSize: scale(15),
=======
                        fontSize: scale(14),
>>>>>>> feature/messages-tab
                        flex: 1,
                        marginRight: scale(8),
                      }}
                      numberOfLines={1}
                    >
                      {teacher.name}
                    </Text>
                    {teacher.lastMessageTime && (
                      <Text
                        className="text-gray-400 font-poppins-regular shrink-0"
                        style={{ fontSize: scale(12) }}
                      >
                        {formatMessageTime(teacher.lastMessageTime)}
                      </Text>
                    )}
                  </View>

                  <Text
                    className="text-gray-500 font-poppins-regular"
                    style={{ fontSize: scale(12) }}
                  >
                    {teacher.subject}
                  </Text>

                  {teacher.lastMessage && (
                    <Text
                      className={`${
                        teacher.unreadCount > 0
                          ? "font-poppins-bold text-gray-800"
                          : "font-poppins-regular text-gray-500"
                      }`}
                      style={{ fontSize: scale(13) }}
                      numberOfLines={1}
                    >
                      {teacher.lastMessage}
                    </Text>
                  )}
                </View>

                {/* Unread badge */}
                {teacher.unreadCount > 0 && (
                  <View className="bg-lightblue rounded-full h-6 w-6 justify-center items-center ml-2">
                    <Text
                      className="text-white font-poppins-bold"
                      style={{ fontSize: scale(12) }}
                    >
                      {teacher.unreadCount}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </KeyboardAwareContainer>

      {/* New Conversation Button */}
      <TouchableOpacity
        className="absolute bg-lightblue rounded-full justify-center items-center shadow-md"
        style={{
          width: scale(56),
          height: scale(56),
          bottom: verticalScale(20),
          right: scale(20),
          elevation: 4,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}
        onPress={handleNewConversation}
        activeOpacity={0.8}
      >
        <Ionicons name="chatbubble-ellipses-outline" size={scale(24)} color="white" />
      </TouchableOpacity>

      {/* Conversation Selection Modal */}
      <ConversationSelectionModal 
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        schools={schools}
        teachers={MOCK_TEACHERS}
        onSelectTeacher={handleOpenChat}
      />
    </View>
  );
}
