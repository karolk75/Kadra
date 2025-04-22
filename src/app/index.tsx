import { useSession } from "@/context/AuthContext";
import { Redirect } from "expo-router";

export default function Root() {
  const { isAuthenticated, isLoading } = useSession();

  if (isLoading) {
    return null;
  }

  // Direct to the appropriate route based on authentication status
  return isAuthenticated ? (
    <Redirect href="/(auth)/(tabs)" />
  ) : (
    <Redirect href="/(public)/pre-login" />
  );
}
