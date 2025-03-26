import { Tabs } from "expo-router";
import React from "react";
import { Dimensions, Platform } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

// Import custom SVG icons
import TabBarIcon from "@/components/TabBarIcon";
import CalendarIcon from "@/svg/tabs/calendar";
import MainIcon from "@/svg/tabs/main";
import MessagesIcon from "@/svg/tabs/messages";
import ProfileIcon from "@/svg/tabs/profile";

export const unstable_settings = {
  initialRouteName: "index",
};

const screenWidth = Dimensions.get("window").width;
const tabWidth = screenWidth / 4;

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#D4B97B",
        tabBarInactiveTintColor: "#9E9E9E",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "rgba(0, 0, 0, 0.1)",
          height: verticalScale(62),
          paddingBottom: Platform.OS === 'ios' ? verticalScale(20) : verticalScale(5),
          paddingTop: verticalScale(2),
          paddingHorizontal: scale(5),
          justifyContent: "center",
          alignItems: "center",
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarItemStyle: {
          height: verticalScale(55),
          marginHorizontal: scale(2),
          paddingVertical: verticalScale(5),
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Strona Główna",
          tabBarIcon: ({focused }) => (
            <TabBarIcon
              icon={MainIcon}
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
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              icon={CalendarIcon}
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
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              icon={MessagesIcon}
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
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              icon={ProfileIcon}
              focused={focused}
              label="Moje konto"
            />
          ),
        }}
      />
    </Tabs>
  );
}
