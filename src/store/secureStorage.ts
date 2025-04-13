import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Create a storage object that conforms to the redux-persist storage interface
const ExpoSecureStore = {
  async getItem(key: string) {
    try {
      const value = await SecureStore.getItemAsync(key);
      return value;
    } catch (error) {
      console.error('Error reading from storage:', error);
      return null;
    }
  },
  
  async setItem(key: string, value: string) {
    try {
    
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error('Error writing to storage:', error);
    }
  },
  
  async removeItem(key: string) {
    try {
      if (Platform.OS === 'web') {
        localStorage.removeItem(key);
        return;
      }
      
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error('Error removing from storage:', error);
    }
  }
};

export default ExpoSecureStore;