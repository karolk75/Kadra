import * as SecureStore from "expo-secure-store";
import { useCallback, useEffect, useState } from "react";
import { Platform } from "react-native";

type UseStorageState<T> = [
  T | null,
  (value: T | null) => Promise<void>,
  boolean
];

export const useStorageState = <T>(key: string): UseStorageState<T> => {
  const [state, setState] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadValue = async () => {
      try {
        const storedValue =
          Platform.OS === "web"
            ? localStorage.getItem(key)
            : await SecureStore.getItemAsync(key);

        setState(storedValue ? JSON.parse(storedValue) : null);
      } catch (error) {
        console.error("Storage load error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadValue();
  }, [key]);

  const setValue = useCallback(
    async (newValue: T | null) => {
      try {
        setLoading(true);
        const valueToStore = JSON.stringify(newValue);

        if (Platform.OS === "web") {
          localStorage.setItem(key, valueToStore);
        } else {
          await SecureStore.setItemAsync(key, valueToStore);
        }

        setState(newValue);
      } catch (error) {
        console.error("Storage save error:", error);
      } finally {
        setLoading(false);
      }
    },
    [key]
  );

  return [state, setValue, loading];
};
