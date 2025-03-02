import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

import { Background } from "@/src/components/Background";
import { CalendarView } from "@/src/components/main/CalendarView";
import { KeyboardAwareContainer } from "@/src/components/KeyboardAwareContainer";
import { NavigationBox } from "@/src/components/main/NavigationBox";
import { RecommendedSection } from "@/src/components/main/RecommendedSection";
import { SearchBar } from "@/src/components/main/SearchBar";
import { StarRating } from "@/src/components/main/StarRating";
import { UserAttributes } from "@/src/context";
import { useStorageState } from "@/src/context/useStorageState";
import {
  getMockAppointments,
  MOCK_RECOMMENDED_ITEMS,
  THEME_COLORS,
} from "@/src/data/mockData";
import BoyAvatar from "@/src/svg/avatars/boyAvatar";
import GirlAvatar from "@/src/svg/avatars/girlAvatar";
import ScreenBackground from "@/src/svg/background";
import Offers from "@/src/svg/main/offers";
import Persons from "@/src/svg/main/persons";
import KadraLogo from "@/src/svg/pre-login/kadra-logo";
import { getCurrentDateInPolish } from "@/src/utils/utils";

export default function MainScreen() {
  const [attributes] = useStorageState<UserAttributes>("attributes");
  const [rating, setRating] = useState(0);
  const { width: screenWidth } = useWindowDimensions();

  const { day, month } = getCurrentDateInPolish();
  // Format day as double digit
  const formattedDay = day.toString().padStart(2, "0");

  // Mock appointments with avatar components
  const appointments = getMockAppointments(<BoyAvatar />, <GirlAvatar />);

  // Mock recommended items with images
  const recommendedItems = MOCK_RECOMMENDED_ITEMS.map((item) => ({
    ...item,
    backgroundImage:
      item.id === 1
        ? require("@/assets/images/school-background.png")
        : require("@/assets/images/ballet-background1.png"),
    logoImage:
      item.id === 1
        ? require("@/assets/images/school-logo.png")
        : require("@/assets/images/ballet-logo.png"),
  }));

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    console.log(`${newRating} stars selected`);
  };

  const handleSearchIconPress = () => {
    console.log("Search icon pressed");
  };

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

          {/* Welcome message */}
          <View
            style={{
              marginBottom: verticalScale(20),
            }}
          >
            <Text
              className="font-poppins-bold text-lightblue"
              style={{ fontSize: scale(24) }}
              numberOfLines={1}
            >
              Witaj, {attributes?.preferredName}
            </Text>
            <Text
              className="font-poppins-light text-[#A1A4B2]"
              style={{ fontSize: scale(16) }}
              numberOfLines={1}
            >
              Miłego dnia
            </Text>
          </View>

          {/* Grid of boxes */}
          <View className="flex-row flex-wrap justify-between">
            {/* Offers Box */}
            <NavigationBox
              title="Oferty Placówek"
              icon={<Offers />}
              onPress={() => console.log("Offers pressed")}
            />

            {/* Persons Box */}
            <NavigationBox
              title="Osoby"
              icon={<Persons />}
              subtitle={[
                "Kliknij, aby dodać",
                "osoby lub sprawdzić",
                "plan zajęć",
              ]}
              onPress={() => console.log("Persons pressed")}
            />

            {/* Calendar Box */}
            <CalendarView
              day={formattedDay}
              month={month}
              appointments={appointments}
              colors={THEME_COLORS}
              onAppointmentPress={(appointment) =>
                console.log("Appointment pressed:", appointment.name)
              }
            />
          </View>

          {/* Search Bar */}
          <SearchBar
            onChangeText={(text) => console.log("Search text:", text)}
            onIconPress={handleSearchIconPress}
          />

          {/* Recommended Section - positioned to extend edge to edge */}
          <View style={{ marginHorizontal: -scale(8) }}>
            <RecommendedSection
              items={recommendedItems}
              colors={THEME_COLORS}
              screenWidth={screenWidth}
              onItemPress={(item) => console.log("Item pressed:", item.title)}
            />
          </View>

          {/* Rating section */}
          <StarRating rating={rating} onRatingChange={handleRatingChange} />
        </ScrollView>
      </KeyboardAwareContainer>
    </View>
  );
}
