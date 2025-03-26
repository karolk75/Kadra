import { useState } from "react";
import {
  ScrollView,
  Text,
  useWindowDimensions,
  View
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

import { Background } from "@/components/Background";
import { KeyboardAwareContainer } from "@/components/KeyboardAwareContainer";
import { CalendarView } from "@/components/main/CalendarView";
import { NavigationBox } from "@/components/main/NavigationBox";
import NotificationButton from "@/components/main/NotificationButton";
import { RecommendedSection } from "@/components/main/RecommendedSection";
import { SearchBar } from "@/components/main/SearchBar";
import { StarRating } from "@/components/main/StarRating";
import { UserAttributes } from "@/context";
import { useStorageState } from "@/context/useStorageState";
import {
  getMockAppointments,
  MOCK_RECOMMENDED_ITEMS,
} from "@/data/mockData";
import BoyAvatar from "@/svg/avatars/boyAvatar";
import GirlAvatar from "@/svg/avatars/girlAvatar";
import ScreenBackground from "@/svg/background";
import Offers from "@/svg/main/offers";
import Persons from "@/svg/main/persons";
import KadraLogo from "@/svg/pre-login/kadra-logo";
import { getCurrentDateInPolish } from "@/utils/utils";

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
        ? require("assets/images/school-background.png")
        : require("assets/images/ballet-background1.png"),
    logoImage:
      item.id === 1
        ? require("assets/images/school-logo.png")
        : require("assets/images/ballet-logo.png"),
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
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
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
              onPress={() => console.log("Persons pressed")}
            />

            {/* Calendar Box */}
            <CalendarView
              day={formattedDay}
              month={month}
              appointments={appointments}
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
