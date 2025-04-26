import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

import { Background } from "@/components/Background";
import { KeyboardAwareContainer } from "@/components/KeyboardAwareContainer";
import { SearchBar } from "@/components/main/SearchBar";
import { ThemeColors } from "@/constants/ThemeColors";
import { useConversations } from "@/hooks/useConversations";
import { useAppSelector } from "@/store";
import { selectAttributes } from "@/store/slices/authSlice";
import {
  selectConversations,
  selectConversationsError,
  selectConversationsLoading,
} from "@/store/slices/conversationsSlice";
import ScreenBackground from "@/svg/background";
import { ConversationWithDetails } from "@/types/Conversation";
import { formatMessageTime } from "@/utils/date-fns-utils";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { useSelector } from "react-redux";

export default function MessagesScreen() {
  const attributes = useSelector(selectAttributes);

  const conversations = useAppSelector(selectConversations);
  const loading = useAppSelector(selectConversationsLoading);
  const error = useAppSelector(selectConversationsError);
  const { fetchConversations, markConversationAsRead } = useConversations();

  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  // Get unique schools from teachers
  // const schools = [...new Set(MOCK_TEACHERS.map((teacher) => teacher.school))];

  useFocusEffect(
    useCallback(() => {
      fetchConversations();
    }, [fetchConversations])
  );

  // Handle opening a chat with a teacher
  const handleOpenChat = (conversation: ConversationWithDetails) => {
    // Mark conversation as read
    markConversationAsRead(conversation);

    // Navigate to the conversation screen
    router.push({
      pathname: "/(auth)/messages/conversation",
      params: { conversationId: conversation.id },
    });
  };

  // Handle creating a new conversation
  const handleNewConversation = () => {
    setModalVisible(true);
  };

  // Filter contacts based on search query
  const getFilteredConversations = useMemo(() => {
    if (!conversations || !Array.isArray(conversations)) return [];
    if (!searchQuery) return conversations;

    const query = searchQuery.toLowerCase();

    return conversations.filter((conv) =>
      conv.participants?.some(
        (p) =>
          p.user?.firstName?.toLowerCase().includes(query) ||
          p.user?.lastName?.toLowerCase().includes(query)
      )
    );
  }, [conversations, searchQuery]);

  const getConversationName = (conv: ConversationWithDetails) => {
    if (conv.title) return conv.title;

    const otherParticipants =
      conv.participants?.filter((p) => p.user.id !== attributes?.id) || [];
    if (otherParticipants.length === 0) return "No participants";

    return otherParticipants
      .map((p) =>
        p.user?.firstName && p.user?.lastName
          ? `${p.user.firstName} ${p.user.lastName}`
          : "Unknown"
      )
      .join(", ");
  };

  const getConversationProfileImage = (
    conversation: ConversationWithDetails
  ) => {
    return (
      conversation.participants?.find((p) => p.user.id !== attributes?.id)?.user
        .profileImageUrl ?? undefined
    );
  };

  const getConversationRead = (conversation: ConversationWithDetails) => {
    const lastRead = conversation.participants?.find(
      (p) => p.user.id === attributes?.id
    )?.lastReadAt;
    const updatedAt = conversation?.updatedAt
      ? new Date(conversation.updatedAt)
      : null;
    const lastReadDate = lastRead ? new Date(lastRead) : null;

    return lastReadDate && updatedAt && lastReadDate > updatedAt;
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
              <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color={ThemeColors.GOLD} />
              </View>
            </View>
          )}

          {/* Error state */}
          {error && (
            <View className="py-10 items-center">
              <Text className="font-poppins-regular text-red-500">
                Wystąpił błąd podczas ładowania konwersacji
              </Text>
            </View>
          )}

          {/* Empty state */}
          {!loading && !error && getFilteredConversations.length === 0 && (
            <View className="py-10 items-center">
              <Text className="font-poppins-regular text-gray-500">
                {searchQuery ? "Brak wyników wyszukiwania" : "Brak konwersacji"}
              </Text>
            </View>
          )}

          {/* Contact List */}
          <View className="flex-1">
            {Array.isArray(getFilteredConversations) &&
              !loading &&
              getFilteredConversations.map((conversation) => (
                <TouchableOpacity
                  key={conversation.id}
                  className="flex-row items-center py-3 border-b border-gray-100"
                  onPress={() => handleOpenChat(conversation)}
                  activeOpacity={0.7}
                >
                  {/* Avatar */}
                  <View className="relative">
                    <View
                      className="bg-lightblue rounded-full overflow-hidden justify-center items-center"
                      style={styles.avatarContainer}
                    >
                      <Image
                        source={{
                          uri: getConversationProfileImage(conversation),
                        }}
                        style={styles.avatar}
                      />
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

                    {conversation.lastMessage && (
                      <Text
                        className={`${
                          getConversationRead(conversation)
                            ? "font-poppins-regular text-gray-500"
                            : "font-poppins-bold text-gray-800"
                        }`}
                        style={styles.lastMessage}
                        numberOfLines={1}
                      >
                        {conversation.lastMessage}
                      </Text>
                    )}
                  </View>

                  {/* Unread badge */}
                  {/* {conversation.unread && (
                  <View className="bg-lightblue rounded-full h-6 w-6 justify-center items-center ml-2">
                    <Text
                      className="text-white font-poppins-bold"
                      style={styles.unreadBadgeText}
                    >
                      {teacher.unreadCount}
                    </Text>
                  </View>
                )} */}
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
    width: scale(36),
    height: scale(36),
  },
  avatar: {
    width: scale(34),
    height: scale(34),
    justifyContent: "center",
    alignItems: "center",
  },
  messagePreview: {
    maxWidth: "90%",
  },
  contactName: {
    fontSize: scale(15),
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
