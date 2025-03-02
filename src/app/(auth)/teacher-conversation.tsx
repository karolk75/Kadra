import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ConversationView } from "@/src/components/messages/ConversationView";
import { Background } from "@/src/components/Background";
import ScreenBackground from "@/src/svg/background";
import BoyAvatar from "@/src/svg/avatars/boyAvatar";
import GirlAvatar from "@/src/svg/avatars/girlAvatar";
import { KeyboardAwareContainer } from "@/src/components/KeyboardAwareContainer";

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

// The global state would be better managed with proper app-wide state management
// For simplicity, we'll use these temporary mock data
const MOCK_TEACHERS: TeacherContact[] = [
  {
    id: "1",
    name: "Anna Kowalska",
    subject: "Matematyka",
    unreadCount: 0,
    avatar: <GirlAvatar />,
    isOnline: true,
  },
  {
    id: "2",
    name: "Tomasz Nowak",
    subject: "Język Polski",
    unreadCount: 0,
    avatar: <BoyAvatar />,
    isOnline: false,
  },
  {
    id: "3",
    name: "Magdalena Wiśniewska",
    subject: "Fizyka",
    unreadCount: 0,
    avatar: <GirlAvatar />,
    isOnline: true,
  },
  {
    id: "4",
    name: "Piotr Zieliński",
    subject: "Chemia",
    unreadCount: 0,
    avatar: <BoyAvatar />,
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
  "3": [
    {
      id: "m1", 
      text: "Dzień dobry, czy mogę prosić o wyjaśnienie ostatniego zadania domowego?",
      sender: "user",
      timestamp: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000),
      read: true,
    }
  ],
  "4": [
    {
      id: "m1",
      text: "Dzień dobry, kiedy odbędzie się następny sprawdzian?",
      sender: "user",
      timestamp: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000),
      read: true,
    }
  ]
};

export default function TeacherConversationScreen() {
  const router = useRouter();
  const { teacherId } = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [teacher, setTeacher] = useState<TeacherContact | null>(null);

  useEffect(() => {
    // Find the teacher
    const foundTeacher = MOCK_TEACHERS.find(t => t.id === teacherId);
    if (foundTeacher) {
      setTeacher(foundTeacher);
    }

    // Get the messages for this teacher
    const foundMessages = MOCK_CONVERSATIONS[teacherId as string] || [];
    setMessages(foundMessages);
  }, [teacherId]);

  const handleSendMessage = (text: string) => {
    if (!text || !teacher) return;

    // Create new message
    const newMessage: Message = {
      id: `m${Date.now()}`,
      text,
      sender: "user",
      timestamp: new Date(),
      read: true,
    };

    // Add to messages
    setMessages(prev => [...prev, newMessage]);

    // Simulate teacher response after delay
    setTimeout(() => {
      const teacherResponse: Message = {
        id: `m${Date.now() + 1}`,
        text: "Dziękuję za wiadomość. Odezwę się wkrótce.",
        sender: "teacher",
        timestamp: new Date(),
        read: true,
      };
      
      setMessages(prev => [...prev, teacherResponse]);
    }, 1500);
  };

  const handleBack = () => {
    router.back();
  };

  if (!teacher) {
    return <View className="flex-1" />;
  }

  return (
    <View className="flex-1 bg-white relative">
      <Background BackgroundComponent={ScreenBackground} />
      
      <KeyboardAwareContainer>
        <ConversationView
          teacher={teacher}
          messages={messages}
          onSendMessage={handleSendMessage}
          onBack={handleBack}
        />
      </KeyboardAwareContainer>
    </View>
  );
} 