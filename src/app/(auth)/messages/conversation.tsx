import { Background } from "@/components/Background";
import { ConversationView } from "@/components/messages/ConversationView";
import { MessageWithDetails } from "@/hooks/useConversations";
import ScreenBackground from "@/svg/background";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { StatusBar, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function TeacherConversationScreen() {
  const params = useLocalSearchParams();
  const teacherId = params.id as string;
  const router = useRouter();

  const [messages, setMessages] = useState<MessageWithDetails[]>([]);

  // Handle sending message with attachments
  // const handleSendMessage = (text: string, attachments?: Attachment[]) => {
  //   // Create user message with attachments if any
  //   const userMessage: Message = {
  //     id: `u${Date.now()}`,
  //     text,
  //     sender: "user",
  //     timestamp: new Date(),
  //     read: true,
  //     attachments,
  //   };

  //   setMessages((prev) => [...prev, userMessage]);

  //   // Simulate teacher response after a delay
  //   setTimeout(() => {
  //     const teacherResponse: Message = {
  //       id: `t${Date.now()}`,
  //       text: "Za tydzień we wtorek. Proszę się przygotować z tematów 1-5.",
  //       sender: "teacher",
  //       timestamp: new Date(),
  //       read: true,
  //     };

  //     setMessages((prev) => [...prev, teacherResponse]);
  //   }, 1500);
  // };

  const handleBack = () => {
    router.back();
  };

  // if (!teacher) {
  //   return <View className="flex-1" />;
  // }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#B5C7D1" />
      <View className="flex-1 bg-white">
        <Background BackgroundComponent={ScreenBackground} />
        {/* <ConversationView
          teacher={teacher}
          messages={messages}
          onSendMessage={handleSendMessage}
          onBack={handleBack}
        /> */}
      </View>
    </SafeAreaProvider>
  );
}
