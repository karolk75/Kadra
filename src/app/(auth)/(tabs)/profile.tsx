import { Background } from "@/components/Background";
import { KeyboardAwareContainer } from "@/components/KeyboardAwareContainer";
import { SafeAreaContainer } from "@/components/SafeAreaContainer";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileMenuItem } from "@/components/profile/ProfileMenuItem";
import { useSession } from "@/context";
import ScreenBackground from "@/svg/background";
import GirlAvatar from "@/svg/avatars/girlAvatar";
import UserDataIcon from "@/svg/profile/data-icon";
import HomeworkIcon from "@/svg/profile/homework-icon";
import MoneyIcon from "@/svg/profile/money-icon";
import SettingsIcon from "@/svg/profile/settings-icon";
import { ScrollView, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { useMemo } from "react";
import { UserAttributes } from "@/context";
import { useStorageState } from "@/context/useStorageState";

export default function ProfileScreen() {
  const { signOut } = useSession();
  const [attributes] = useStorageState<UserAttributes>("attributes");

  // Format the user's name in uppercase or use placeholder if not available
  const displayName = useMemo(() => {
    if (attributes?.preferredName && attributes?.familyName) {
      return `${attributes.preferredName.toUpperCase()} ${attributes.familyName.toUpperCase()}`;
    }
    return "IMIĘ NAZWISKO";
  }, [attributes]);

  const menuItems = useMemo(
    () => [
      {
        id: "user-data",
        icon: <UserDataIcon />,
        title: "Moje dane",
        subtitle: "Prywatność, zmiana hasła",
        onPress: () => console.log("User data pressed"),
      },
      {
        id: "payments",
        icon: <MoneyIcon />,
        title: "Płatności",
        subtitle: "Rachunki, faktury",
        onPress: () => console.log("Payments pressed"),
      },
      {
        id: "homework",
        icon: <HomeworkIcon />,
        title: "Prace domowe",
        subtitle: "Zadania zlecone przez nauczyciela",
        onPress: () => console.log("Homework pressed"),
      },
      {
        id: "settings",
        icon: <SettingsIcon />,
        title: "Ustawienia",
        subtitle: "Wyloguj się, usuń konto",
        onPress: signOut,
      },
    ],
    [signOut]
  );

  return (
    <View className="flex-1 bg-white relative">
      <Background BackgroundComponent={ScreenBackground} />

      <KeyboardAwareContainer>
        <ScrollView
          style={{
            paddingHorizontal: scale(16),
            paddingTop: verticalScale(20),
          }}
          showsVerticalScrollIndicator={false}
        >
          <ProfileHeader name={displayName} avatarComponent={<GirlAvatar />} />

          {menuItems.map((item) => (
            <ProfileMenuItem
              key={item.id}
              icon={item.icon}
              title={item.title}
              subtitle={item.subtitle}
              onPress={item.onPress}
            />
          ))}
        </ScrollView>
      </KeyboardAwareContainer>
    </View>
  );
}
