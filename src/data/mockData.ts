import { AppointmentData } from "../types/AppointmentData";
import { RecommendedItemData } from "../types/RecommendedItemData";
import { Message } from "../types/Message";
import { TeacherContact } from "../types/TeacherContact";

// Type definitions that require React components will be populated in the component file

// Avatar components need to be added at runtime since they're React components
export const getMockAppointments = (
  BoyAvatar: React.ReactNode,
  GirlAvatar: React.ReactNode
): AppointmentData[] => [
  {
    name: "Anna Nowak-Długie-Nazwisko",
    time: "10:00-11:30",
    location: "Centrum Edukacyjne Językowe Very Long Name",
    activity: "Angielski dla zaawansowanych z native speakerem",
    avatar: GirlAvatar,
  },
  {
    name: "Karol Kowalski",
    time: "18:30-19:15",
    location: "Szkoła Muzyki",
    activity: "Fortepian",
    avatar: GirlAvatar,
  },
  {
    name: "Jan Kowalski",
    time: "18:30-19:15",
    location: "Ninja Club",
    activity: "Karate",
    avatar: BoyAvatar,
  }
];

export const MOCK_RECOMMENDED_ITEMS: Omit<
  RecommendedItemData,
  "backgroundImage" | "logoImage"
>[] = [
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

// The global state would be better managed with proper app-wide state management
// For simplicity, we'll use these temporary mock data
export const getMockTeachers = (
  BoyAvatar: React.ReactNode,
  GirlAvatar: React.ReactNode
): TeacherContact[] => [
  {
    id: "1",
    name: "Anna Kowalska",
    lastMessage:
      "Dzień dobry, czy możemy przełożyć jutrzejsze zajęcia na późniejszą godzinę?",
    lastMessageTime: new Date(new Date().getTime() - 25 * 60 * 1000), // 25 min ago
    unreadCount: 2,
    avatar: GirlAvatar,
    subject: "Matematyka",
    school: "Szkoła Podstawowa nr 1",
  },
  {
    id: "2",
    name: "Tomasz Nowak",
    lastMessage: "Proszę o przygotowanie prezentacji na następny tydzień.",
    lastMessageTime: new Date(new Date().getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
    unreadCount: 0,
    avatar: BoyAvatar,
    subject: "Język Polski",
    school: "Szkoła Podstawowa nr 1",
  },
  {
    id: "3",
    name: "Magdalena Wiśniewska Długie-Nazwisko",
    lastMessage: "Sprawdzian z algebry zostanie przełożony na przyszły piątek.",
    lastMessageTime: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    unreadCount: 0,
    avatar: GirlAvatar,
    subject: "Fizyka",
    school: "Liceum Ogólnokształcące im. Stefana Żeromskiego nr 2",
  },
  {
    id: "4",
    name: "Piotr Zieliński",
    lastMessage: "Proszę o przesłanie zadania domowego do końca tygodnia.",
    lastMessageTime: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    unreadCount: 0,
    avatar: BoyAvatar,
    subject: "Chemia",
    school: "Liceum Ogólnokształcące nr 2",
  },
];

// Mock conversation data
export const MOCK_CONVERSATIONS: Record<string, Message[]> = {
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
    {
      id: "m3",
      text: "Czy moglibyśmy przełożyć jutrzejsze zajęcia na późniejszą godzinę?",
      sender: "user",
      timestamp: new Date(new Date().getTime() - 27 * 60 * 1000),
      read: true,
    },
    {
      id: "m4",
      text: "Dzień dobry, czy możemy przełożyć jutrzejsze zajęcia na późniejszą godzinę?",
      sender: "teacher",
      timestamp: new Date(new Date().getTime() - 25 * 60 * 1000),
      read: false,
    },
    {
      id: "m5",
      text: "Poproszę też o informację, jakie będą wymagane materiały na te zajęcia.",
      sender: "teacher",
      timestamp: new Date(new Date().getTime() - 25 * 60 * 1000),
      read: false,
    },
    {
      id: "m6",
      text: "Poproszę też o informację, jakie będą wymagane materiały na te zajęcia.",
      sender: "teacher",
      timestamp: new Date(new Date().getTime() - 24 * 60 * 1000),
      read: false,
    },
    {
      id: "m7",
      text: "Poproszę też o informację, jakie będą wymagane materiały na te zajęcia.",
      sender: "teacher",
      timestamp: new Date(new Date().getTime() - 23 * 60 * 1000),
      read: false,
    },
    {
      id: "m8",
      text: "Poproszę też o informację, jakie będą wymagane materiały na te zajęcia.",
      sender: "teacher",
      timestamp: new Date(new Date().getTime() - 22 * 60 * 1000),
      read: false,
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
};

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: 'message' | 'appointment' | 'info';
}

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Nowa wiadomość',
    message: 'Anna Kowalska wysłała nową wiadomość',
    timestamp: new Date(new Date().getTime() - 15 * 60 * 1000), // 15 minutes ago
    read: false,
    type: 'message'
  },
  {
    id: '2',
    title: 'Odwołane zajęcia',
    message: 'Zajęcia z angielskiego zostały odwołane',
    timestamp: new Date(new Date().getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false,
    type: 'appointment'
  },
  {
    id: '3',
    title: 'Zmiana harmonogramu',
    message: 'Zajęcia z matematyki zostały przesunięte na 15:30',
    timestamp: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    read: true,
    type: 'appointment'
  },
  {
    id: '4',
    title: 'Przypomnienie',
    message: 'Jutro o 10:00 zajęcia z karate',
    timestamp: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    read: true,
    type: 'info'
  },
  {
    id: '5',
    title: 'Przypomnienie',
    message: 'Jutro o 10:00 zajęcia z karate',
    timestamp: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    read: true,
    type: 'info'
  }
  ,
  {
    id: '6',
    title: 'Przypomnienie',
    message: 'Jutro o 10:00 zajęcia z karate',
    timestamp: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    read: true,
    type: 'info'
  }
  ,
  {
    id: '7',
    title: 'Przypomnienie',
    message: 'Jutro o 10:00 zajęcia z karate',
    timestamp: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    read: true,
    type: 'info'
  },
  {
    id: '8',
    title: 'Przypomnienie',
    message: 'Jutro o 10:00 zajęcia z karate',
    timestamp: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    read: true,
    type: 'info'
  },
  {
    id: '9',
    title: 'Przypomnienie',
    message: 'Jutro o 10:00 zajęcia z karate',
    timestamp: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    read: true,
    type: 'info'
  },
  {
    id: '10',
    title: 'Przypomnienie',
    message: 'Jutro o 10:00 zajęcia z karate',
    timestamp: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    read: true,
    type: 'info'
  },
  {
    id: '11',
    title: 'Przypomnienie',
    message: 'Jutro o 10:00 zajęcia z karate',
    timestamp: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    read: true,
    type: 'info'
  }
];
