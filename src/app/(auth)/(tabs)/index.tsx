import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, useWindowDimensions, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

import { Background } from "@/components/Background";
import { KeyboardAwareContainer } from "@/components/KeyboardAwareContainer";
import { CalendarView } from "@/components/main/CalendarView";
import { NavigationBox } from "@/components/main/NavigationBox";
import NotificationButton from "@/components/main/NotificationButton";
import { RecommendedSection } from "@/components/main/RecommendedSection";
import { SearchBar } from "@/components/main/SearchBar";
import { StarRating } from "@/components/main/StarRating";
import { selectAttributes } from "@/store/slices/authSlice";
import ScreenBackground from "@/svg/background";
import Offers from "@/svg/main/offers";
import Persons from "@/svg/main/persons";
import KadraLogo from "@/svg/pre-login/kadra-logo";
import { useSelector } from "react-redux";

export default function MainScreen() {
  const attributes = useSelector(selectAttributes);
  const [rating, setRating] = useState(0);
  const { width: screenWidth } = useWindowDimensions();

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    console.log(`${newRating} stars selected`);
  };

  const handleSearchIconPress = () => {
    console.log("Search icon pressed");
  };

  const navigateToPeople = () => {
    router.push("/(auth)/people/people");
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
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
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
            {/* Notification Button */}
            <NotificationButton />
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
              onPress={navigateToPeople}
            />

            {/* Calendar Box */}
            <CalendarView
              onEnrollmentPress={(enrollmentId) =>
                console.log("Appointment pressed:", enrollmentId)
              }
            />
          </View>

          {/* Search Bar */}
          <SearchBar
            onChangeText={(text) => console.log("Search text:", text)}
            onIconPress={handleSearchIconPress}
          />

          {/* Recommended Section  */}
          <View style={{ marginHorizontal: scale(-8) }}>
            <RecommendedSection
              // TODO: Add recommended items
              items={[]}
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
