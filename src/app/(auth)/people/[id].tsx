import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
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
import { ActivitiesTabContent } from "@/components/people/ActivitiesTabContent";
import { DataTabContent } from "@/components/people/DataTabContent";
import { PersonTabType, PersonTabs } from "@/components/people/PersonTabs";
import { ThemeColors } from "@/constants/ThemeColors";
import { useAppSelector } from "@/store";
import {
  selectChildren,
  selectChildrenLoading,
} from "@/store/slices/childrenSlice";
import ScreenBackground from "@/svg/background";
import { Child } from "@/types/Child";

export default function PersonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const children = useAppSelector(selectChildren);
  const childrenLoading = useAppSelector(selectChildrenLoading);
  const [child, setChild] = useState<Child | null>(null);
  const [activeTab, setActiveTab] = useState<PersonTabType>("data");

  useEffect(() => {
    if (children && id) {
      const foundChild = children.find((child) => child.id === id);
      if (foundChild) {
        setChild(foundChild);
      }
    }
  }, [children, id]);

  if (childrenLoading) {
    return (
      <View className="flex-1 bg-white relative">
        <Background BackgroundComponent={ScreenBackground} />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={ThemeColors.GOLD} />
        </View>
      </View>
    );
  }

  if (!child) {
    return (
      <View className="flex-1 bg-white relative">
        <Background BackgroundComponent={ScreenBackground} />
        <View className="flex-1 items-center justify-center">
          <Text className="font-poppins-medium text-lg">
            Nie znaleziono osoby
          </Text>
          <TouchableOpacity
            className="mt-4 px-4 py-2 rounded-lg bg-lightblue"
            onPress={() => router.back()}
          >
            <Text className="font-poppins-medium text-white">Powrót</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const handleEditPress = () => {
    // TODO: Implement edit functionality
    console.log(`Edit person: ${child.id}`);
  };

  return (
    <View className="flex-1 bg-white relative">
      <Background BackgroundComponent={ScreenBackground} />

      <View
        style={{
          flexGrow: 1,
          paddingHorizontal: scale(20),
          paddingTop: verticalScale(66),
          paddingBottom: verticalScale(20),
        }}
      >
        {/* Header */}
        <View>
          {/* Back Button */}
          <TouchableOpacity
            className="bg-white rounded-full items-center justify-center shadow-sm z-10"
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text className="text-2xl">&larr;</Text>
          </TouchableOpacity>

          {/* Person Profile Header */}
          <View className="flex-row items-center justify-center">
            {/* Outer Circle */}
            <View
              className="rounded-full shadow-md"
              style={styles.outerCircle}
            />

            {/* create name and surname on top of outer circle */}
            <View
              className="absolute items-center justify-center z-10"
              style={styles.nameContainer}
            >
              <Text className="text-white text-4xl font-poppins-bold">
                {child.firstName}
              </Text>
              <Text className="text-white text-3xl font-poppins-bold">
                {child.lastName}
              </Text>
            </View>

            {/* Person Circle */}
            <View
              className="absolute rounded-full shadow-md"
              style={styles.personCircle}
            />

            {/* Person avatar */}
            <View
              className="absolute rounded-full overflow-hidden justify-center items-center"
              style={styles.avatarContainer}
            >
              {child.profileImageUrl && (
                <Image
                  source={{ uri: child.profileImageUrl }}
                  style={styles.avatarImage}
                />
              )}
            </View>
          </View>
        </View>

        {/* Tab Navigation */}
        <PersonTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab Content */}
        <ScrollView style={styles.detailsContainer}>
          {activeTab === "data" ? (
            <DataTabContent child={child} onEditPress={handleEditPress} />
          ) : (
            <ActivitiesTabContent childId={child.id} />
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    width: scale(40),
    height: scale(40),
  },
  outerCircle: {
    width: scale(430),
    height: scale(400),
    marginTop: scale(-330),
    marginBottom: scale(70),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
    backgroundColor: ThemeColors.CREAM,
  },
  nameContainer: {
    top: scale(-55),
  },
  personCircle: {
    width: scale(130),
    height: scale(130),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
    backgroundColor: ThemeColors.CREAM,
  },
  avatarContainer: {
    top: scale(20),
    width: scale(110),
    height: scale(110),
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  detailsContainer: {
    marginBottom: scale(10),
    maxHeight: "65%",
    borderRadius: scale(15),
  },
});
