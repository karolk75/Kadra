import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { scale } from "react-native-size-matters";

import { Background } from "@/components/Background";
import { KeyboardAwareContainer } from "@/components/KeyboardAwareContainer";
import { PersonCard } from "@/components/people/PersonCard";
import { THEME_COLORS, THEME_COLORS_HEX } from "@/constants/ThemeColors";
import { useChildren } from "@/hooks/useChildren";
import { useAppSelector } from "@/store";
import { selectChildren, selectChildrenLoading } from "@/store/slices/childrenSlice";
import ScreenBackground from "@/svg/background";

export default function PeopleScreen() {
  const children = useAppSelector(selectChildren);
  const childrenLoading = useAppSelector(selectChildrenLoading);
  const { fetchChildren } = useChildren();

  useFocusEffect(
    useCallback(() => {
      fetchChildren();
    }, [fetchChildren])
  );

  const handlePersonClick = (id: string) => {
    // Navigate to person detail or handle click
    console.log(`Person clicked: ${id}`);
    // router.push(`/person/${id}`);
  };

  const handleAddPerson = () => {
    // For now just log, since add-person page doesn't exist
    console.log("Navigate to add person form");
    // TODO: Create add-person page and implement navigation
  };

  return (
    <View className="flex-1 bg-white relative">
      <Background BackgroundComponent={ScreenBackground} />

      <KeyboardAwareContainer>
        {/* Header */}
        <View className="flex-row flex-wrap justify-between">
          {/* Back Button */}
          <View className="items-start">
            <TouchableOpacity
              className="bg-white rounded-full items-center justify-center shadow-sm"
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Text className="text-2xl">&larr;</Text>
            </TouchableOpacity>
          </View>

          {/* Moje Osoby Title */}
          <View className="items-end mr-2">
            <Text
              className="font-poppins-bold text-lightblue"
              style={styles.titleText}
            >
              Moje
            </Text>
            <Text
              className="font-poppins-bold text-lightblue"
              style={styles.titleText}
            >
              Osoby
            </Text>
          </View>
        </View>

        {/* Description */}
        <View className="items-end" style={styles.descriptionContainer}>
          <Text
            className="font-poppins-light text-lightblue text-right"
            style={styles.descriptionText}
          >
            Dodaj osoby, dla których poszukujesz zajęć
          </Text>
        </View>

        {/* List of People */}
        {childrenLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color={THEME_COLORS_HEX[0]} />
          </View>
        ) : (
          children &&
          children.map((child, index) => {
            const colorIndex = index % THEME_COLORS.length;
            const bgColorHex = THEME_COLORS_HEX[colorIndex];

            return (
              <PersonCard
                key={child.id}
                child={child}
                backgroundColor={bgColorHex}
                onPress={handlePersonClick}
              />
            );
          })
        )}

        {/* Add Person Button */}
        <TouchableOpacity
          className={`relative`}
          style={styles.personContainer}
          onPress={handleAddPerson}
        >
          {/* Circle and stripe - same structure as person cards */}
          <View
            className="flex-row items-center"
            style={styles.circleStripeContainer}
          >
            <View
              className={`rounded-full shadow-md`}
              style={[
                styles.personCircle,
                {
                  backgroundColor:
                    THEME_COLORS_HEX[
                      children ? children.length % THEME_COLORS.length : 0
                    ],
                },
              ]}
            />
            <View
              className={`flex-1 rounded-r-lg justify-center`}
              style={[
                styles.personStripe,
                {
                  backgroundColor:
                    THEME_COLORS_HEX[
                      children ? children.length % THEME_COLORS.length : 0
                    ],
                },
              ]}
            >
              <Text
                className="font-poppins-bold text-white"
                style={styles.addPersonText}
              >
                Dodaj osobę
              </Text>
            </View>
          </View>

          {/* White circle with plus sign */}
          <View
            className="absolute bg-white rounded-full justify-center items-center"
            style={styles.addIconContainer}
          >
            <Ionicons
              name="add"
              size={scale(65)}
              color={
                THEME_COLORS_HEX[
                  children ? children.length % THEME_COLORS.length : 0
                ]
              }
            />
          </View>
        </TouchableOpacity>
      </KeyboardAwareContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    width: scale(40),
    height: scale(40),
  },
  titleText: {
    fontSize: scale(26),
  },
  descriptionContainer: {
    marginTop: scale(6),
    marginBottom: scale(12),
  },
  descriptionText: {
    fontSize: scale(14),
    maxWidth: "70%",
  },
  personContainer: {
    marginLeft: scale(-32),
    marginBottom: scale(14),
  },
  circleStripeContainer: {
    marginRight: scale(12),
  },
  personCircle: {
    width: scale(120),
    height: scale(120),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,
    elevation: 8,
  },
  personStripe: {
    marginLeft: scale(-60),
    height: scale(70),
    paddingLeft: scale(50),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4.65,
    elevation: 8,
  },
  addPersonText: {
    fontSize: scale(18),
    marginLeft: scale(16),
  },
  addIconContainer: {
    width: scale(105),
    height: scale(105),
    top: scale(8),
    left: scale(6),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
