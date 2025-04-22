import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";

import { Background } from "@/components/Background";
import { KeyboardAwareContainer } from "@/components/KeyboardAwareContainer";
import { SearchBar } from "@/components/main/SearchBar";
import { useSession } from "@/context/AuthContext";
import ScreenBackground from "@/svg/background";
import { formatMessageTime } from "@/utils/utils";
import { ConversationWithDetails, useConversations } from "@/hooks/useConversations";


export default function MessagesScreen() {
  const { user } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const { 
    conversations, 
    loading, 
    error, 
    fetchConversations, 
    markAsRead, 
    createConversation 
  } = useConversations();

  // State for conversation modal
  const [modalVisible, setModalVisible] = useState(false);

  // Get unique schools from teachers
  // const schools = [...new Set(MOCK_TEACHERS.map((teacher) => teacher.school))];

  // Handle opening a chat with a teacher
  const handleOpenChat = (conversationId: string) => {
    // Mark conversation as read
    markAsRead(conversationId);

    // Navigate to the conversation screen
    router.push({
      pathname: "/(auth)/messages/conversation",
      params: { id: conversationId },
    });
  };

  // Handle creating a new conversation
  const handleNewConversation = () => {
    setModalVisible(true);
  };

  // Filter contacts based on search query
  const filteredConversations = conversations.filter((conv) => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    
    // Search through participant names
    return conv.participants?.some(p => 
      p.user?.firstName?.toLowerCase().includes(query) || 
      p.user?.lastName?.toLowerCase().includes(query)
    ) || false;
  });

  const getConversationName = (conv: ConversationWithDetails) => {
    if (conv.title) return conv.title;
    
    const otherParticipants = conv.participants?.filter(p => p.userId !== user?.id) || [];
    if (otherParticipants.length === 0) return "No participants";
    
    return otherParticipants
      .map(p => p.user?.firstName && p.user?.lastName ? `${p.user.firstName} ${p.user.lastName}` : "Unknown")
      .join(", ");
  };

  // Get subject for a teacher if available
  // const getTeacherSubject = (conv: ConversationWithDetails) => {
  //   const teacherParticipant = conv.participants?.find(p => 
  //     p.user?.userType === 'TEACHER' && p.userId !== user?.id
  //   );
    
  //   return teacherParticipant?.user?.teacher?.specialization || "";
  // };

  return (
    <View className="flex-1 bg-white relative">
      <Background BackgroundComponent={ScreenBackground} />

      <KeyboardAwareContainer>
        <ScrollView className="flex-1" style={styles.scrollView}>
          {/* Header */}
          <View style={styles.header}>
            <Text
              className="font-poppins-bold text-lightblue"
              style={styles.headerText}
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

          {/* Loading state */}
          {loading && (
            <View className="py-10 items-center">
              <Text className="font-poppins-regular text-gray-500">Ładowanie konwersacji...</Text>
            </View>
          )}

          {/* Error state */}
          {error && (
            <View className="py-10 items-center">
              <Text className="font-poppins-regular text-red-500">Wystąpił błąd podczas ładowania konwersacji</Text>
            </View>
          )}

          {/* Empty state */}
          {!loading && !error && filteredConversations.length === 0 && (
            <View className="py-10 items-center">
              <Text className="font-poppins-regular text-gray-500">
                {searchQuery ? "Brak wyników wyszukiwania" : "Brak konwersacji"}
              </Text>
            </View>
          )}

          {/* Contact List */}
          <View className="flex-1">
            {filteredConversations.map((conversation) => (
              <TouchableOpacity
                key={conversation.id}
                className="flex-row items-center py-3 border-b border-gray-100"
                onPress={() => handleOpenChat(conversation.id)}
                activeOpacity={0.7}
              >
                {/* Avatar */}
                <View className="relative">
                  <View className="bg-lightblue rounded-full overflow-hidden justify-center items-center"
                    style={styles.avatarContainer}
                  >
                    {/* <Image
                      source={conversation.participants?.[0]?.user?.profileImageUrl}
                      style={styles.avatar}
                    /> */}
                  </View>
                </View>

                {/* Message preview */}
                <View className="flex-1 ml-3" style={styles.messagePreview}>
                  <View className="flex-row justify-between items-center w-full">
                    <Text
                      className="font-poppins-bold text-lightblue"
                      style={styles.contactName}
                      numberOfLines={1}
                    >
                      {getConversationName(conversation)}
                    </Text>
                    {conversation.updatedAt && (
                      <Text
                        className="text-gray-400 font-poppins-regular shrink-0"
                        style={styles.messageTime}
                      >
                        {formatMessageTime(new Date(conversation.updatedAt))}
                      </Text>
                    )}
                  </View>

                  {/* Subject */}
                  {/* <Text
                    className="text-gray-500 font-poppins-regular"
                    style={styles.subjectText}
                  >
                    {conversation.subject}
                  </Text> */}

                  {conversation.lastMessage && (
                    <Text
                      className={`${
                        conversation.unread
                          ? "font-poppins-bold text-gray-800"
                          : "font-poppins-regular text-gray-500"
                      }`}
                      style={styles.lastMessage}
                      numberOfLines={1}
                    >
                      {conversation.lastMessage}
                    </Text>
                  )}
                </View>

                {/* Unread badge */}
                {conversation.unread && (
                  <View className="bg-lightblue rounded-full h-6 w-6 justify-center items-center ml-2">
                    <Text
                      className="text-white font-poppins-bold"
                      style={styles.unreadBadgeText}
                    >
                      {/* {teacher.unreadCount} */}
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
        style={styles.newConversationButton}
        onPress={handleNewConversation}
        activeOpacity={0.8}
      >
        <Ionicons
          name="chatbubble-ellipses-outline"
          size={scale(24)}
          color="white"
        />
      </TouchableOpacity>

      {/* Conversation Selection Modal */}
      {/* <ConversationSelectionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        schools={schools}
        teachers={MOCK_TEACHERS}
        onSelectTeacher={handleOpenChat}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: scale(8),
  },
  header: {
    marginBottom: verticalScale(5),
  },
  headerText: {
    fontSize: scale(24),
  },
  avatarContainer: {
    width: scale(34),
    height: scale(34),
  },
  avatar: {
    width: scale(32),
    height: scale(32),
  },
  messagePreview: {
    maxWidth: "75%",
  },
  contactName: {
    fontSize: scale(14),
    flex: 1,
    marginRight: scale(8),
  },
  messageTime: {
    fontSize: scale(12),
  },
  subjectText: {
    fontSize: scale(12),
  },
  lastMessage: {
    fontSize: scale(13),
  },
  unreadBadgeText: {
    fontSize: scale(12),
  },
  newConversationButton: {
    width: scale(56),
    height: scale(56),
    bottom: verticalScale(20),
    right: scale(20),
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
