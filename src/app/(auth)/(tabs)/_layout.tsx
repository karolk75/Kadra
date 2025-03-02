import React from "react";
import { Tabs } from "expo-router";
import { useColorScheme } from "@/src/hooks/useColorScheme";
import Colors from "@/src/constants/Colors";
import { View, Text, Dimensions } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

// Import custom SVG icons
import MainIcon from "@/src/svg/tabs/main";
import CalendarIcon from "@/src/svg/tabs/calendar";
import MessagesIcon from "@/src/svg/tabs/messages";
import ProfileIcon from "@/src/svg/tabs/profile";
import TabBarIcon from "@/src/components/TabBarIcon";

export const unstable_settings = {
  initialRouteName: 'index',
};

// Get screen width to calculate tab width
const screenWidth = Dimensions.get('window').width;
// Calculate tab width based on available space
const tabWidth = screenWidth / 4;

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#D4B97B",
        tabBarInactiveTintColor: "#9E9E9E",
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: scale(1),
          borderTopColor: '#F0F0F0',
          height: verticalScale(65),
          paddingBottom: verticalScale(10),
          paddingHorizontal: scale(15),
          justifyContent: 'center',
        },
        tabBarItemStyle: {
          width: tabWidth,
          maxWidth: tabWidth,
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Strona Główna",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              icon={MainIcon} 
              color={color} 
              focused={focused} 
              label="Strona Główna" 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Kalendarz",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              icon={CalendarIcon} 
              color={color} 
              focused={focused} 
              label="Kalendarz" 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Wiadomości",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              icon={MessagesIcon} 
              color={color} 
              focused={focused} 
              label="Wiadomości" 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Moje konto",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon 
              icon={ProfileIcon} 
              color={color} 
              focused={focused} 
              label="Moje konto" 
            />
          ),
        }}
      />
    </Tabs>
  );
}
