import { documentDirectory, EncodingType } from "expo-file-system";
import { createExpoFileSystemStorage } from "redux-persist-expo-file-system-storage";

// Create storage based on platform
const ExpoFileSystemStorage = createExpoFileSystemStorage({
  // Optimize path for faster access
  storagePath: `${documentDirectory}redux-persist/`,
  encoding: EncodingType.UTF8,
  // Debug only in development
  debug: false,
});

export default ExpoFileSystemStorage;
