import { ImageSourcePropType } from "react-native";

import { AppointmentData } from "../components/main/AppointmentCard";
import { RecommendedItemData } from "../components/main/RecommendedItem";

// Type definitions that require React components will be populated in the component file

export const THEME_COLORS = ["yellow", "darkblue", "red", "beige"];

// Avatar components need to be added at runtime since they're React components
export const getMockAppointments = (BoyAvatar: React.ReactNode, GirlAvatar: React.ReactNode): AppointmentData[] => [
  {
    name: "Karol Kowalski",
    time: "13:00-13:45",
    location: "Szkoła Muzyki",
    activity: "Fortepian",
    avatar: GirlAvatar,
  },
  {
    name: "Jan Kowalski",
    time: "18:15-19:15",
    location: "Ninja Club",
    activity: "Karate",
    avatar: BoyAvatar,
  },
  {
    name: "Anna Nowak-Długie-Nazwisko",
    time: "10:00-11:30",
    location: "Centrum Edukacyjne Językowe Very Long Name",
    activity: "Angielski dla zaawansowanych z native speakerem",
    avatar: GirlAvatar,
  }
];

export const MOCK_RECOMMENDED_ITEMS: Omit<RecommendedItemData, 'backgroundImage' | 'logoImage'>[] = [
  {
    id: 1,
    title: "Szkoła Językowa Akcent",
    subtitle: "1.3 km od Ciebie",
  },
  {
    id: 2,
    title: "Szkoła tańca Puenta",
    subtitle: "4.2 km od Ciebie",
  },
];

// We'll populate the actual images in the component since they require import statements 