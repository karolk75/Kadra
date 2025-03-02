import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { useRouter } from "expo-router";

import { Background } from "@/src/components/Background";
import { KeyboardAwareContainer } from "@/src/components/KeyboardAwareContainer";
import { SearchBar } from "@/src/components/main/SearchBar";
import { formatMessageTime } from "@/src/components/messages/ConversationView";
import { UserAttributes } from "@/src/context";
import { useStorageState } from "@/src/context/useStorageState";
import ScreenBackground from "@/src/svg/background";
import KadraLogo from "@/src/svg/pre-login/kadra-logo";
import BoyAvatar from "@/src/svg/avatars/boyAvatar";
import GirlAvatar from "@/src/svg/avatars/girlAvatar";

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

// Mock data for teachers
const MOCK_TEACHERS: TeacherContact[] = [
  {
    id: "1",
    name: "Anna Kowalska",
    lastMessage:
      "Dzień dobry, czy możemy przełożyć jutrzejsze zajęcia na późniejszą godzinę?",
    lastMessageTime: new Date(new Date().getTime() - 25 * 60 * 1000), // 25 min ago
    unreadCount: 2,
    avatar: <GirlAvatar />,
    subject: "Matematyka",
    isOnline: true,
  },
  {
    id: "2",
    name: "Tomasz Nowak",
    lastMessage: "Proszę o przygotowanie prezentacji na następny tydzień.",
    lastMessageTime: new Date(new Date().getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
    unreadCount: 0,
    avatar: <BoyAvatar />,
    subject: "Język Polski",
    isOnline: false,
  },
  {
    id: "3",
    name: "Magdalena Wiśniewska Długie-Nazwisko",
    lastMessage: "Sprawdzian z algebry zostanie przełożony na przyszły piątek.",
    lastMessageTime: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    unreadCount: 0,
    avatar: <GirlAvatar />,
    subject: "Fizyka",
    isOnline: true,
  },
  {
    id: "4",
    name: "Piotr Zieliński",
    lastMessage: "Proszę o przesłanie zadania domowego do końca tygodnia.",
    lastMessageTime: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    unreadCount: 0,
    avatar: <BoyAvatar />,
    subject: "Chemia",
    isOnline: false,
  },
];

// Mock conversation data
const MOCK_CONVERSATIONS: Record<string, Message[]> = {
  "1": [
    {
      id: "m1",
      text: "Dzień dobry, mam pytanie odnośnie jutrzejszych zajęć.",
      sender: "user",
      timestamp: new Date(new Date().getTime() - 30 * 60 * 1000),
      read: true,
    },
    {
      id: "m2",
      text: "Dzień dobry, o co chodzi?",
      sender: "teacher",
      timestamp: new Date(new Date().getTime() - 28 * 60 * 1000),
      read: true,
    },
    {
      id: "m3",
      text: "Czy moglibyśmy przełożyć jutrzejsze zajęcia na późniejszą godzinę?",
      sender: "user",
      timestamp: new Date(new Date().getTime() - 27 * 60 * 1000),
      read: true,
    },
    {
      id: "m4",
      text: "Dzień dobry, czy możemy przełożyć jutrzejsze zajęcia na późniejszą godzinę?",
      sender: "teacher",
      timestamp: new Date(new Date().getTime() - 25 * 60 * 1000),
      read: false,
    },
    {
      id: "m5",
      text: "Poproszę też o informację, jakie będą wymagane materiały na te zajęcia.",
      sender: "teacher",
      timestamp: new Date(new Date().getTime() - 25 * 60 * 1000),
      read: false,
    },
  ],
  "2": [
    {
      id: "m1",
      text: "Dzień dobry, jakie materiały są potrzebne na następne zajęcia?",
      sender: "user",
      timestamp: new Date(new Date().getTime() - 4 * 60 * 60 * 1000),
      read: true,
    },
    {
      id: "m2",
      text: "Proszę o przygotowanie prezentacji na następny tydzień.",
      sender: "teacher",
      timestamp: new Date(new Date().getTime() - 2 * 60 * 60 * 1000),
      read: true,
    },
  ],
};

export default function MessagesScreen() {
  const [attributes] = useStorageState<UserAttributes>("attributes");
  const [contacts, setContacts] = useState(MOCK_TEACHERS);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

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
      pathname: "/(auth)/teacher-conversation",
      params: { teacherId },
    });
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
          {/* Logo */}
          <View
            className="items-center"
            style={{ marginBottom: verticalScale(10) }}
          >
            <KadraLogo />
          </View>

          {/* Header */}
          <View
            style={{
              marginTop: verticalScale(5),
              marginBottom: verticalScale(5),
            }}
          >
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
            placeholder="Wyszukaj nauczyciela..."
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
                {/* Avatar with online indicator */}
                <View className="relative">
                  <View className="h-12 w-12 bg-lightblue rounded-full overflow-hidden justify-center items-center">
                    {teacher.avatar}
                  </View>
                  {teacher.isOnline && (
                    <View className="absolute right-0 bottom-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </View>

                {/* Message preview */}
                <View className="flex-1 ml-3" style={{ maxWidth: "75%" }}>
                  <View className="flex-row justify-between items-center w-full">
                    <Text
                      className="font-poppins-bold text-lightblue"
                      style={{
                        fontSize: scale(15),
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
    </View>
  );
}
