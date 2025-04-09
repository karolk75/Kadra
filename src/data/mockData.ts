import { AppointmentData } from "../types/AppointmentData";
import { RecommendedItemData } from "../types/RecommendedItemData";
import { Message } from "../types/Message";
import { TeacherContact } from "../types/TeacherContact";
import { Notification } from "../types/Notification";

// New imports based on the database schema structure
import { Schema } from "../../amplify/data/resource";

// Type definitions to map our database schema to React components
type User = Omit<Schema["User"]["type"], "student" | "teacher" | "sentMessages" | "notifications" | "conversations" | "preferences" | "givenReviews"> & {
  avatar?: React.ReactNode;
};

type Student = Omit<Schema["Student"]["type"], "user" | "parent" | "school" | "appointments">;

type Teacher = Omit<Schema["Teacher"]["type"], "user" | "subjects" | "schools" | "appointments" | "availability"> & {
  avatar?: React.ReactNode;
};

type School = Omit<Schema["School"]["type"], "teachers" | "students" | "activities" | "locations">;

type Subject = Omit<Schema["Subject"]["type"], "teachers" | "activities">;

type Activity = Omit<Schema["Activity"]["type"], "subject" | "school" | "appointments">;

type Location = Omit<Schema["Location"]["type"], "school" | "appointments" | "recommendedItems">;

type Appointment = Omit<Schema["Appointment"]["type"], "student" | "teacher" | "activity" | "location" | "createdBy" | "parentAppointment" | "childAppointments">;

type Conversation = Omit<Schema["Conversation"]["type"], "participants" | "messages">;

type ConversationParticipant = Omit<Schema["ConversationParticipant"]["type"], "conversation" | "user">;

// Mock User Data
export const MOCK_USERS: User[] = [
  {
    id: "user1",
    email: "jan.kowalski@example.com",
    passwordHash: "hashed_password_1",
    userType: "student",
    firstName: "Jan",
    lastName: "Kowalski",
    timezone: "Europe/Warsaw",
    locale: "pl-PL",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    lastLoginAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    isActive: true,
    verificationStatus: "verified",
  },
  {
    id: "user2",
    email: "anna.nowak@example.com",
    passwordHash: "hashed_password_2",
    userType: "student",
    firstName: "Anna",
    lastName: "Nowak-Długie-Nazwisko",
    timezone: "Europe/Warsaw",
    locale: "pl-PL",
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    lastLoginAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    isActive: true,
    verificationStatus: "verified",
  },
  {
    id: "user3",
    email: "karol.kowalski@example.com",
    passwordHash: "hashed_password_3",
    userType: "student",
    firstName: "Karol",
    lastName: "Kowalski",
    timezone: "Europe/Warsaw",
    locale: "pl-PL",
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    lastLoginAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    isActive: true,
    verificationStatus: "verified",
  },
  {
    id: "teacher1",
    email: "anna.kowalska@teacher.edu.pl",
    passwordHash: "hashed_password_4",
    userType: "teacher",
    firstName: "Anna",
    lastName: "Kowalska",
    timezone: "Europe/Warsaw",
    locale: "pl-PL",
    createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    lastLoginAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    isActive: true,
    verificationStatus: "verified",
  },
  {
    id: "teacher2",
    email: "tomasz.nowak@teacher.edu.pl",
    passwordHash: "hashed_password_5",
    userType: "teacher",
    firstName: "Tomasz",
    lastName: "Nowak",
    timezone: "Europe/Warsaw",
    locale: "pl-PL",
    createdAt: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    lastLoginAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    isActive: true,
    verificationStatus: "verified",
  },
  {
    id: "teacher3",
    email: "magdalena.wisniewska@teacher.edu.pl",
    passwordHash: "hashed_password_6",
    userType: "teacher",
    firstName: "Magdalena",
    lastName: "Wiśniewska Długie-Nazwisko",
    timezone: "Europe/Warsaw",
    locale: "pl-PL",
    createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    lastLoginAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    isActive: true,
    verificationStatus: "verified",
  },
  {
    id: "teacher4",
    email: "piotr.zielinski@teacher.edu.pl",
    passwordHash: "hashed_password_7",
    userType: "teacher",
    firstName: "Piotr",
    lastName: "Zieliński",
    timezone: "Europe/Warsaw",
    locale: "pl-PL",
    createdAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    lastLoginAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
    isActive: true,
    verificationStatus: "verified",
  },
  {
    id: "parent1",
    email: "katarzyna.kowalska@example.com",
    passwordHash: "hashed_password_8",
    userType: "parent",
    firstName: "Katarzyna",
    lastName: "Kowalska",
    timezone: "Europe/Warsaw",
    locale: "pl-PL",
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    lastLoginAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    isActive: true,
    verificationStatus: "verified",
  },
  {
    id: "admin1",
    email: "admin@platform.edu.pl",
    passwordHash: "hashed_password_9",
    userType: "admin",
    firstName: "Admin",
    lastName: "System",
    timezone: "Europe/Warsaw",
    locale: "pl-PL",
    createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    lastLoginAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    isActive: true,
    verificationStatus: "verified",
  },
];

// Mock Student Data
export const MOCK_STUDENTS: Student[] = [
  {
    id: "student1",
    userId: "user1",
    dateOfBirth: "2010-01-15",
    gradeLevel: "7",
    parentId: "parent1",
    schoolId: "school1",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "student2",
    userId: "user2",
    dateOfBirth: "2008-05-20",
    gradeLevel: "9",
    parentId: "parent1",
    schoolId: "school2",
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "student3",
    userId: "user3",
    dateOfBirth: "2012-09-10",
    gradeLevel: "5",
    parentId: null,
    schoolId: "school1",
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

// Mock Teacher Data
export const MOCK_TEACHERS: Teacher[] = [
  {
    id: "teacherProfile1",
    userId: "teacher1",
    bio: "Doświadczona nauczycielka matematyki z ponad 10-letnim stażem pracy w szkole podstawowej i liceum.",
    yearsOfExperience: 10,
    education: "Uniwersytet Warszawski, Wydział Matematyki",
    specializations: ["matematyka", "fizyka"],
    hourlyRate: 80,
    availabilitySettings: {
      weekdays: [1, 2, 3, 4, 5],
      weekendAvailable: false,
    },
    createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "teacherProfile2",
    userId: "teacher2",
    bio: "Nauczyciel języka polskiego z pasją do literatury i historii.",
    yearsOfExperience: 8,
    education: "Uniwersytet Jagielloński, Wydział Filologii Polskiej",
    specializations: ["język polski", "historia literatury"],
    hourlyRate: 70,
    availabilitySettings: {
      weekdays: [1, 3, 5],
      weekendAvailable: true,
    },
    createdAt: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "teacherProfile3",
    userId: "teacher3",
    bio: "Fizyk z doświadczeniem akademickim, specjalizacja w mechanice kwantowej.",
    yearsOfExperience: 15,
    education: "Politechnika Warszawska, Wydział Fizyki",
    specializations: ["fizyka", "matematyka zaawansowana"],
    hourlyRate: 100,
    availabilitySettings: {
      weekdays: [2, 4],
      weekendAvailable: true,
    },
    createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "teacherProfile4",
    userId: "teacher4",
    bio: "Chemik i biolog z zamiłowaniem do eksperymentów i nauki laboratoryjnej.",
    yearsOfExperience: 12,
    education: "Uniwersytet Medyczny, Wydział Chemii i Biologii",
    specializations: ["chemia", "biologia"],
    hourlyRate: 90,
    availabilitySettings: {
      weekdays: [1, 2, 3, 4, 5],
      weekendAvailable: false,
    },
    createdAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

// Type definitions that require React components will be populated in the component file

// Mock Activities
export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: "activity1",
    name: "Matematyka dla zaawansowanych",
    description: "Zajęcia z matematyki na poziomie rozszerzonym dla uczniów liceum przygotowujących się do matury.",
    category: "edukacja",
    subjectId: "subject1",
    schoolId: "school1",
    logoUrl: "/assets/activities/math-logo.png",
    createdAt: new Date(Date.now() - 300 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "activity2",
    name: "Angielski dla zaawansowanych z native speakerem",
    description: "Konwersacje z języka angielskiego z nauczycielem z Wielkiej Brytanii.",
    category: "języki obce",
    subjectId: "subject5",
    schoolId: "school3",
    logoUrl: "/assets/activities/english-logo.png",
    createdAt: new Date(Date.now() - 250 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "activity3",
    name: "Fortepian",
    description: "Indywidualne lekcje gry na fortepianie dla początkujących i średnio zaawansowanych.",
    category: "muzyka",
    subjectId: "subject6",
    schoolId: "school4",
    logoUrl: "/assets/activities/piano-logo.png",
    createdAt: new Date(Date.now() - 280 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "activity4",
    name: "Karate",
    description: "Grupowe zajęcia karate dla dzieci i młodzieży w różnym wieku.",
    category: "sport",
    subjectId: "subject7",
    schoolId: "school5",
    logoUrl: "/assets/activities/karate-logo.png",
    createdAt: new Date(Date.now() - 320 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Mock Locations
export const MOCK_LOCATIONS: Location[] = [
  {
    id: "location1",
    name: "Sala lekcyjna nr 101",
    address: "ul. Szkolna 1",
    city: "Warszawa",
    state: "Mazowieckie",
    postalCode: "00-001",
    country: "Polska",
    latitude: 52.237049,
    longitude: 21.017532,
    schoolId: "school1",
    createdAt: new Date(Date.now() - 1000 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "location2",
    name: "Centrum Edukacyjne Językowe Very Long Name",
    address: "ul. Językowa 3",
    city: "Warszawa",
    state: "Mazowieckie",
    postalCode: "00-003",
    country: "Polska",
    latitude: 52.217049,
    longitude: 21.007532,
    schoolId: "school3",
    createdAt: new Date(Date.now() - 800 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "location3",
    name: "Sala Muzyczna",
    address: "ul. Muzyczna 4",
    city: "Warszawa",
    state: "Mazowieckie",
    postalCode: "00-004",
    country: "Polska",
    latitude: 52.227049,
    longitude: 21.037532,
    schoolId: "school4",
    createdAt: new Date(Date.now() - 900 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "location4",
    name: "Ninja Club",
    address: "ul. Sportowa 5",
    city: "Warszawa",
    state: "Mazowieckie",
    postalCode: "00-005",
    country: "Polska",
    latitude: 52.247049,
    longitude: 21.047532,
    schoolId: "school5",
    createdAt: new Date(Date.now() - 700 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Mock Appointments
export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: "appointment1",
    studentId: "student2",
    teacherId: null,
    activityId: "activity2",
    locationId: "location2",
    startTime: new Date(new Date().setHours(10, 0, 0, 0)).toISOString(),
    endTime: new Date(new Date().setHours(17, 30, 0, 0)).toISOString(),
    status: "confirmed",
    notes: "Zajęcia grupowe z języka angielskiego",
    recurringPattern: null,
    parentAppointmentId: null,
    createdById: "parent1",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "appointment2",
    studentId: "student3",
    teacherId: null,
    activityId: "activity3",
    locationId: "location3",
    startTime: new Date(new Date().setHours(19, 15, 0, 0)).toISOString(),
    endTime: new Date(new Date().setHours(19, 30, 0, 0)).toISOString(),
    status: "confirmed",
    notes: "Indywidualne zajęcia gry na fortepianie",
    recurringPattern: {
      frequency: "weekly",
      daysOfWeek: [2], // Tuesday
    },
    parentAppointmentId: null,
    createdById: "parent1",
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "appointment3",
    studentId: "student1",
    teacherId: null,
    activityId: "activity4",
    locationId: "location4",
    startTime: new Date(new Date().setHours(15, 15, 0, 0)).toISOString(),
    endTime: new Date(new Date().setHours(18, 15, 0, 0)).toISOString(),
    status: "confirmed",
    notes: "Zajęcia karate dla grupy początkującej",
    recurringPattern: {
      frequency: "weekly",
      daysOfWeek: [1, 3, 5], // Monday, Wednesday, Friday
    },
    parentAppointmentId: null,
    createdById: "parent1",
    createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Avatar components need to be added at runtime since they're React components
export const getMockAppointments = (
  BoyAvatar: React.ReactNode,
  GirlAvatar: React.ReactNode,
): AppointmentData[] => {
  // Map our database model to the UI component model
  return [
    {
      name: "Anna Nowak-Długie-Nazwisko",
      time: "10:00-17:30",
      location: "Centrum Edukacyjne Językowe Very Long Name",
      activity: "Angielski dla zaawansowanych z native speakerem",
      avatar: GirlAvatar,
    },
    {
      name: "Karol Kowalski",
      time: "19:15-19:30",
      location: "Szkoła Muzyki",
      activity: "Fortepian",
      avatar: GirlAvatar,
    },
    {
      name: "Jan Kowalski",
      time: "15:15-18:15",
      location: "Ninja Club",
      activity: "Karate",
      avatar: BoyAvatar,
    },
  ];
};

// Mock Conversations
export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "conv1",
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    lastMessageAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
  },
  {
    id: "conv2",
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    lastMessageAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "conv3",
    createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    lastMessageAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "conv4",
    createdAt: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    lastMessageAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Mock Conversation Participants
export const MOCK_CONVERSATION_PARTICIPANTS: ConversationParticipant[] = [
  // Conversation 1 participants
  {
    id: "cp1",
    conversationId: "conv1",
    userId: "user2", // Anna Nowak
    lastReadAt: new Date(Date.now() - 27 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "cp2",
    conversationId: "conv1",
    userId: "teacher1", // Anna Kowalska
    lastReadAt: new Date(Date.now() - 26 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
  },
  
  // Conversation 2 participants
  {
    id: "cp3",
    conversationId: "conv2",
    userId: "user1", // Jan Kowalski
    lastReadAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "cp4",
    conversationId: "conv2",
    userId: "teacher2", // Tomasz Nowak
    lastReadAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
  },
  
  // Conversation 3 participants
  {
    id: "cp5",
    conversationId: "conv3",
    userId: "user1", // Jan Kowalski
    lastReadAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "cp6",
    conversationId: "conv3",
    userId: "teacher3", // Magdalena Wiśniewska
    lastReadAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
  },
  
  // Conversation 4 participants
  {
    id: "cp7",
    conversationId: "conv4",
    userId: "user3", // Karol Kowalski
    lastReadAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "cp8",
    conversationId: "conv4",
    userId: "teacher4", // Piotr Zieliński
    lastReadAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Original MOCK_CONVERSATIONS data structure (maintain for backward compatibility)
export const MOCK_CONVERSATIONS_LEGACY: Record<string, Message[]> = {
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

// Mock Messages using new data structure
export const MOCK_MESSAGES = [
  // Conversation 1 messages
  {
    id: "msg1",
    conversationId: "conv1",
    senderId: "user2", // Anna Nowak
    text: "Dzień dobry, mam pytanie odnośnie jutrzejszych zajęć.",
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: "msg2",
    conversationId: "conv1",
    senderId: "teacher1", // Anna Kowalska
    text: "Dzień dobry, o co chodzi?",
    createdAt: new Date(Date.now() - 28 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 28 * 60 * 1000).toISOString(),
  },
  {
    id: "msg3",
    conversationId: "conv1",
    senderId: "user2", // Anna Nowak
    text: "Czy moglibyśmy przełożyć jutrzejsze zajęcia na późniejszą godzinę?",
    createdAt: new Date(Date.now() - 27 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 27 * 60 * 1000).toISOString(),
  },
  {
    id: "msg4",
    conversationId: "conv1",
    senderId: "teacher1", // Anna Kowalska
    text: "Dzień dobry, czy możemy przełożyć jutrzejsze zajęcia na późniejszą godzinę?",
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
  },
  
  // Conversation 2 messages
  {
    id: "msg5",
    conversationId: "conv2",
    senderId: "user1", // Jan Kowalski
    text: "Dzień dobry, jakie materiały są potrzebne na następne zajęcia?",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "msg6",
    conversationId: "conv2",
    senderId: "teacher2", // Tomasz Nowak
    text: "Proszę o przygotowanie prezentacji na następny tydzień.",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  
  // Conversation 3 messages
  {
    id: "msg7",
    conversationId: "conv3",
    senderId: "teacher3", // Magdalena Wiśniewska
    text: "Sprawdzian z algebry zostanie przełożony na przyszły piątek.",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  
  // Conversation 4 messages
  {
    id: "msg8",
    conversationId: "conv4",
    senderId: "teacher4", // Piotr Zieliński
    text: "Proszę o przesłanie zadania domowego do końca tygodnia.",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Mock Message Read Status
export const MOCK_MESSAGE_READ_STATUS = [
  {
    id: "mrs1",
    messageId: "msg1",
    userId: "user2",
    readAt: new Date(Date.now() - 29 * 60 * 1000).toISOString(),
  },
  {
    id: "mrs2",
    messageId: "msg1",
    userId: "teacher1",
    readAt: new Date(Date.now() - 28 * 60 * 1000).toISOString(),
  },
  {
    id: "mrs3",
    messageId: "msg2",
    userId: "user2",
    readAt: new Date(Date.now() - 27 * 60 * 1000).toISOString(),
  },
  {
    id: "mrs4",
    messageId: "msg2",
    userId: "teacher1",
    readAt: new Date(Date.now() - 27 * 60 * 1000).toISOString(),
  },
  {
    id: "mrs5",
    messageId: "msg3",
    userId: "user2",
    readAt: new Date(Date.now() - 26 * 60 * 1000).toISOString(),
  },
  {
    id: "mrs6",
    messageId: "msg3",
    userId: "teacher1",
    readAt: new Date(Date.now() - 26 * 60 * 1000).toISOString(),
  },
  // Message 4 has not been read by Anna Nowak yet
  {
    id: "mrs7",
    messageId: "msg4",
    userId: "teacher1",
    readAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
  },
];

// Mock Recommended Items (without images, which will be added at runtime)
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

// New recommended items data structure based on database schema
export const MOCK_RECOMMENDED_ITEMS_NEW = [
  {
    id: "rec1",
    title: "Szkoła Językowa Akcent",
    subtitle: "1.3 km od Ciebie",
    description: "Nowoczesna szkoła językowa oferująca kursy angielskiego, niemieckiego i hiszpańskiego.",
    category: "school",
    backgroundImageUrl: "/assets/images/school-background.png",
    logoUrl: "/assets/images/school-logo.png",
    locationId: null,
    relatedEntityType: "school",
    relatedEntityId: "school3",
    priority: 10,
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "rec2",
    title: "Szkoła tańca Puenta",
    subtitle: "4.2 km od Ciebie",
    description: "Kursy tańca klasycznego, nowoczesnego i towarzyskiego dla dzieci, młodzieży i dorosłych.",
    category: "school",
    backgroundImageUrl: "/assets/images/ballet-background1.png",
    logoUrl: "/assets/images/ballet-logo.png",
    locationId: null,
    relatedEntityType: "school",
    relatedEntityId: "school2",
    priority: 8,
    expirationDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const MOCK_NOTIFICATIONS = [
  {
    id: "notif1",
    userId: "user1", // Jan Kowalski
    title: "Nowa wiadomość",
    message: "Anna Kowalska wysłała nową wiadomość",
    type: "message",
    relatedEntityType: "message",
    relatedEntityId: "msg4",
    isRead: false,
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    readAt: null,
  },
  {
    id: "notif2",
    userId: "user2", // Anna Nowak
    title: "Odwołane zajęcia",
    message: "Zajęcia z angielskiego zostały odwołane",
    type: "appointment",
    relatedEntityType: "appointment",
    relatedEntityId: "appointment1",
    isRead: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    readAt: null,
  },
  {
    id: "notif3",
    userId: "user3", // Karol Kowalski
    title: "Zmiana harmonogramu",
    message: "Zajęcia z matematyki zostały przesunięte na 15:30",
    type: "appointment",
    relatedEntityType: "appointment",
    relatedEntityId: "appointment2",
    isRead: true,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    readAt: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "notif4",
    userId: "user1", // Jan Kowalski
    title: "Przypomnienie",
    message: "Jutro o 10:00 zajęcia z karate",
    type: "info",
    relatedEntityType: "appointment",
    relatedEntityId: "appointment3",
    isRead: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    readAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(),
  },
];

// Original teacher contacts function - keeping for backwards compatibility
export const getMockTeachers = (
  BoyAvatar: React.ReactNode,
  GirlAvatar: React.ReactNode,
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

// New function to get rich teacher data from our new schema
export const getEnrichedTeachers = (
  BoyAvatar: React.ReactNode,
  GirlAvatar: React.ReactNode,
) => {
  // This function would combine data from users, teachers, conversations, and messages
  // to create rich teacher contact objects with their last messages
  
  // For now, we'll return the original data to maintain backward compatibility
  return getMockTeachers(BoyAvatar, GirlAvatar);
};

// Mock School Data
export const MOCK_SCHOOLS: School[] = [
  {
    id: "school1",
    name: "Szkoła Podstawowa nr 1",
    type: "primary",
    address: "ul. Szkolna 1",
    city: "Warszawa",
    state: "Mazowieckie",
    postalCode: "00-001",
    country: "Polska",
    phone: "+48 22 123 45 67",
    email: "sekretariat@sp1.edu.pl",
    website: "https://sp1.edu.pl",
    logoUrl: "/assets/schools/school1-logo.png",
    latitude: 52.237049,
    longitude: 21.017532,
    createdAt: new Date(Date.now() - 1000 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "school2",
    name: "Liceum Ogólnokształcące im. Stefana Żeromskiego nr 2",
    type: "high",
    address: "ul. Licealista 2",
    city: "Warszawa",
    state: "Mazowieckie",
    postalCode: "00-002",
    country: "Polska",
    phone: "+48 22 234 56 78",
    email: "sekretariat@lo2.edu.pl",
    website: "https://lo2.edu.pl",
    logoUrl: "/assets/schools/school2-logo.png",
    latitude: 52.257049,
    longitude: 21.027532,
    createdAt: new Date(Date.now() - 1200 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "school3",
    name: "Centrum Edukacyjne Językowe",
    type: "language",
    address: "ul. Językowa 3",
    city: "Warszawa",
    state: "Mazowieckie",
    postalCode: "00-003",
    country: "Polska",
    phone: "+48 22 345 67 89",
    email: "kontakt@cej.edu.pl",
    website: "https://cej.edu.pl",
    logoUrl: "/assets/schools/school3-logo.png",
    latitude: 52.217049,
    longitude: 21.007532,
    createdAt: new Date(Date.now() - 800 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "school4",
    name: "Szkoła Muzyki",
    type: "music",
    address: "ul. Muzyczna 4",
    city: "Warszawa",
    state: "Mazowieckie",
    postalCode: "00-004",
    country: "Polska",
    phone: "+48 22 456 78 90",
    email: "kontakt@szkolamuzyki.pl",
    website: "https://szkolamuzyki.pl",
    logoUrl: "/assets/schools/school4-logo.png",
    latitude: 52.227049,
    longitude: 21.037532,
    createdAt: new Date(Date.now() - 900 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "school5",
    name: "Ninja Club",
    type: "sport",
    address: "ul. Sportowa 5",
    city: "Warszawa",
    state: "Mazowieckie",
    postalCode: "00-005",
    country: "Polska",
    phone: "+48 22 567 89 01",
    email: "kontakt@ninjaclub.pl",
    website: "https://ninjaclub.pl",
    logoUrl: "/assets/schools/school5-logo.png",
    latitude: 52.247049,
    longitude: 21.047532,
    createdAt: new Date(Date.now() - 700 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Mock Subject Data
export const MOCK_SUBJECTS: Subject[] = [
  {
    id: "subject1",
    name: "Matematyka",
    category: "ścisłe",
    iconUrl: "/assets/subjects/math-icon.png",
    createdAt: new Date(Date.now() - 1500 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "subject2",
    name: "Język Polski",
    category: "humanistyczne",
    iconUrl: "/assets/subjects/polish-icon.png",
    createdAt: new Date(Date.now() - 1500 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "subject3",
    name: "Fizyka",
    category: "ścisłe",
    iconUrl: "/assets/subjects/physics-icon.png",
    createdAt: new Date(Date.now() - 1500 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "subject4",
    name: "Chemia",
    category: "ścisłe",
    iconUrl: "/assets/subjects/chemistry-icon.png",
    createdAt: new Date(Date.now() - 1500 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "subject5",
    name: "Angielski",
    category: "języki obce",
    iconUrl: "/assets/subjects/english-icon.png",
    createdAt: new Date(Date.now() - 1500 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "subject6",
    name: "Fortepian",
    category: "muzyka",
    iconUrl: "/assets/subjects/piano-icon.png",
    createdAt: new Date(Date.now() - 1500 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "subject7",
    name: "Karate",
    category: "sport",
    iconUrl: "/assets/subjects/karate-icon.png",
    createdAt: new Date(Date.now() - 1500 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Mock Teacher-Subject Relationships
export const MOCK_TEACHER_SUBJECTS = [
  {
    id: "ts1",
    teacherId: "teacherProfile1",
    subjectId: "subject1",
    proficiencyLevel: "expert",
    createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "ts2",
    teacherId: "teacherProfile1",
    subjectId: "subject3",
    proficiencyLevel: "intermediate",
    createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "ts3",
    teacherId: "teacherProfile2",
    subjectId: "subject2",
    proficiencyLevel: "advanced",
    createdAt: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "ts4",
    teacherId: "teacherProfile3",
    subjectId: "subject3",
    proficiencyLevel: "expert",
    createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "ts5",
    teacherId: "teacherProfile3",
    subjectId: "subject1",
    proficiencyLevel: "advanced",
    createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "ts6",
    teacherId: "teacherProfile4",
    subjectId: "subject4",
    proficiencyLevel: "expert",
    createdAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Mock Teacher-School Relationships
export const MOCK_TEACHER_SCHOOLS = [
  {
    id: "tsc1",
    teacherId: "teacherProfile1",
    schoolId: "school1",
    position: "Nauczyciel matematyki",
    department: "Matematyka",
    startDate: "2013-09-01",
    endDate: null,
    isCurrent: true,
    createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "tsc2",
    teacherId: "teacherProfile2",
    schoolId: "school1",
    position: "Nauczyciel języka polskiego",
    department: "Język polski",
    startDate: "2015-09-01",
    endDate: null,
    isCurrent: true,
    createdAt: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "tsc3",
    teacherId: "teacherProfile3",
    schoolId: "school2",
    position: "Nauczyciel fizyki",
    department: "Fizyka",
    startDate: "2008-09-01",
    endDate: null,
    isCurrent: true,
    createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "tsc4",
    teacherId: "teacherProfile4",
    schoolId: "school2",
    position: "Nauczyciel chemii",
    department: "Chemia",
    startDate: "2011-09-01",
    endDate: null,
    isCurrent: true,
    createdAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Mock User Preferences
export const MOCK_USER_PREFERENCES = [
  {
    id: "pref1",
    userId: "user1",
    notificationPreferences: {
      appointment: {
        email: true,
        push: true,
        sms: false,
      },
      message: {
        email: false,
        push: true,
        sms: false,
      },
      info: {
        email: true,
        push: true,
        sms: false,
      },
    },
    privacySettings: {
      shareProfile: true,
      shareContact: false,
      allowRecommendations: true,
    },
    theme: "default",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "pref2",
    userId: "user2",
    notificationPreferences: {
      appointment: {
        email: true,
        push: true,
        sms: true,
      },
      message: {
        email: true,
        push: true,
        sms: false,
      },
      info: {
        email: true,
        push: true,
        sms: false,
      },
    },
    privacySettings: {
      shareProfile: true,
      shareContact: true,
      allowRecommendations: true,
    },
    theme: "light",
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "pref3",
    userId: "user3",
    notificationPreferences: {
      appointment: {
        email: true,
        push: true,
        sms: false,
      },
      message: {
        email: true,
        push: true,
        sms: false,
      },
      info: {
        email: false,
        push: true,
        sms: false,
      },
    },
    privacySettings: {
      shareProfile: false,
      shareContact: false,
      allowRecommendations: true,
    },
    theme: "dark",
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Mock Reviews
export const MOCK_REVIEWS = [
  {
    id: "review1",
    reviewerId: "user1",
    entityType: "teacher",
    entityId: "teacherProfile1",
    rating: 4.5,
    comment: "Świetny nauczyciel matematyki, wyjaśnia trudne koncepcje w przystępny sposób.",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "review2",
    reviewerId: "user2",
    entityType: "school",
    entityId: "school3",
    rating: 5.0,
    comment: "Wspaniała szkoła językowa, zawsze miła atmosfera i profesjonalni nauczyciele.",
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "review3",
    reviewerId: "user3",
    entityType: "activity",
    entityId: "activity3",
    rating: 4.0,
    comment: "Dobry kurs fortepianu, choć czasem tempo jest zbyt szybkie dla początkujących.",
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Mock Availability
export const MOCK_AVAILABILITY = [
  // Anna Kowalska's availability
  {
    id: "avail1",
    teacherId: "teacherProfile1",
    dayOfWeek: 1, // Monday
    startTime: new Date().setHours(9, 0, 0, 0),
    endTime: new Date().setHours(17, 0, 0, 0),
    isRecurring: true,
    createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "avail2",
    teacherId: "teacherProfile1",
    dayOfWeek: 2, // Tuesday
    startTime: new Date().setHours(9, 0, 0, 0),
    endTime: new Date().setHours(17, 0, 0, 0),
    isRecurring: true,
    createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "avail3",
    teacherId: "teacherProfile1",
    dayOfWeek: 3, // Wednesday
    startTime: new Date().setHours(9, 0, 0, 0),
    endTime: new Date().setHours(17, 0, 0, 0),
    isRecurring: true,
    createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  
  // Tomasz Nowak's availability
  {
    id: "avail4",
    teacherId: "teacherProfile2",
    dayOfWeek: 1, // Monday
    startTime: new Date().setHours(14, 0, 0, 0),
    endTime: new Date().setHours(20, 0, 0, 0),
    isRecurring: true,
    createdAt: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "avail5",
    teacherId: "teacherProfile2",
    dayOfWeek: 3, // Wednesday
    startTime: new Date().setHours(14, 0, 0, 0),
    endTime: new Date().setHours(20, 0, 0, 0),
    isRecurring: true,
    createdAt: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "avail6",
    teacherId: "teacherProfile2",
    dayOfWeek: 5, // Friday
    startTime: new Date().setHours(14, 0, 0, 0),
    endTime: new Date().setHours(20, 0, 0, 0),
    isRecurring: true,
    createdAt: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  
  // Non-recurring availabilities for special dates
  {
    id: "avail7",
    teacherId: "teacherProfile3",
    dayOfWeek: null,
    startTime: new Date(new Date().setDate(new Date().getDate() + 7)).setHours(10, 0, 0, 0),
    endTime: new Date(new Date().setDate(new Date().getDate() + 7)).setHours(16, 0, 0, 0),
    isRecurring: false,
    specificDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

/*
 * This file provides mock data structures for the application that align with
 * the database schema defined in amplify/data/resource.ts. The data structures include:
 *
 * - Users (students, teachers, parents, admin)
 * - Students with their academic information
 * - Teachers with their profiles and specializations
 * - Schools of various types
 * - Subjects taught at these schools
 * - Teacher-Subject relationships (what subjects teachers teach)
 * - Teacher-School relationships (which schools teachers work at)
 * - Activities offered at schools
 * - Locations where activities take place
 * - Appointments for students
 * - Conversations between users
 * - Messages within conversations
 * - Recommended items for users
 * - Notifications for users
 * - User preferences
 * - Reviews of teachers, schools, and activities
 * - Teacher availability
 *
 * Legacy functions and data structures are maintained for backward compatibility
 * with existing components while the application is being migrated to the new 
 * data structure.
 */
