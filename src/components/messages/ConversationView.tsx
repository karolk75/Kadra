import React, { useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Dimensions,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";

// Types
interface Message {
  id: string;
  text: string;
  sender: "user" | "teacher";
  timestamp: Date;
  read: boolean;
}

interface TeacherContact {
  id: string;
  name: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount: number;
  avatar: React.ReactNode;
  subject: string;
  isOnline: boolean;
}

// Format timestamp
export const formatMessageTime = (date: Date) => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    // Today, show hour:minute
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } else if (diffDays === 1) {
    // Yesterday
    return "Wczoraj";
  } else if (diffDays < 7) {
    // Days of week
    const days = [
      "Niedziela",
      "Poniedziałek",
      "Wtorek",
      "Środa",
      "Czwartek",
      "Piątek",
      "Sobota",
    ];
    return days[date.getDay()];
  } else {
    // More than a week ago, show date
    return date.toLocaleDateString();
  }
};

interface ConversationViewProps {
  teacher: TeacherContact;
  messages: Message[];
  onSendMessage: (text: string) => void;
  onBack: () => void;
}

export const ConversationView: React.FC<ConversationViewProps> = ({
  teacher,
  messages,
  onSendMessage,
  onBack,
}) => {
  const [message, setMessage] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);
  const { width: screenWidth } = Dimensions.get("window");

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Clear input
    const messageText = message.trim();
    setMessage("");

    // Send message to parent component
    onSendMessage(messageText);

    // Scroll to bottom
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    }, 100);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Chat header */}
      <View
        className="flex-row items-center px-4 py-3"
        style={styles.headerContainer}
      >
        <TouchableOpacity onPress={onBack} className="mr-2">
          <Ionicons name="arrow-back" size={scale(24)} color="white" />
        </TouchableOpacity>

        <View className="h-10 w-10 bg-white rounded-full overflow-hidden justify-center items-center">
          {teacher.avatar}
        </View>

        <View className="ml-3 flex-1">
          <Text
            className="font-poppins-bold text-white"
            style={{ fontSize: scale(16) }}
          >
            {teacher.name}
          </Text>
          <Text
            className="font-poppins-light text-white"
            style={{ fontSize: scale(12) }}
          >
            {teacher.subject}
          </Text>
        </View>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingVertical: verticalScale(16) }}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((msg, index) => {
          const isUser = msg.sender === "user";
          const showTimestamp =
            index === 0 ||
            new Date(msg.timestamp).getTime() -
              new Date(messages[index - 1].timestamp).getTime() >
              15 * 60 * 1000;

          return (
            <View key={msg.id} className="mb-3 px-4">
              {showTimestamp && (
                <Text
                  className="text-center text-gray-400 my-2 font-poppins-regular"
                  style={{ fontSize: scale(12) }}
                >
                  {formatMessageTime(msg.timestamp)}
                </Text>
              )}

              <View
                className={`rounded-2xl p-3 max-w-[80%] ${
                  isUser
                    ? "bg-lightblue self-end rounded-tr-none"
                    : "bg-gray-100 self-start rounded-tl-none"
                }`}
                style={{
                  alignSelf: isUser ? "flex-end" : "flex-start",
                  marginLeft: isUser ? 50 : 0,
                  marginRight: isUser ? 0 : 50,
                }}
              >
                <Text
                  className={isUser ? "text-white" : "text-gray-800"}
                  style={{ fontSize: scale(14) }}
                >
                  {msg.text}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Message input */}
      <View className="flex-row items-center px-4 py-2 border-t border-gray-200 bg-white">
        <TouchableOpacity className="mr-2">
          <Ionicons name="attach" size={scale(24)} color="#A1A4B2" />
        </TouchableOpacity>

        <View className="flex-1 bg-gray-100 rounded-full px-3 py-2 flex-row items-center">
          <TextInput
            className="flex-1 font-poppins-regular"
            placeholder="Napisz wiadomość..."
            placeholderTextColor="#A1A4B2"
            style={{ fontSize: scale(14) }}
            value={message}
            onChangeText={setMessage}
            multiline
          />

          <TouchableOpacity className="ml-2">
            <Ionicons name="camera" size={scale(24)} color="#A1A4B2" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className={`ml-2 rounded-full ${
            message.trim() ? "bg-lightblue" : "bg-gray-300"
          }`}
          style={{ padding: scale(8) }}
          onPress={handleSendMessage}
          disabled={!message.trim()}
        >
          <Ionicons name="send" size={scale(20)} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#B5C7D1", // Light blue color from screenshot
    width: "100%",
  },
});
