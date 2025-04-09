import React from "react";
import {
  View,
  Modal,
  Image,
  TouchableOpacity,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { scale, verticalScale } from "react-native-size-matters";
import * as FileSystem from "expo-file-system";

interface ImageViewerProps {
  imageUri: string | null;
  onClose: () => void;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({
  imageUri,
  onClose,
}) => {
  const downloadImage = async () => {
    if (!imageUri) return;

    try {
      // Get permissions
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

      if (!permissions.granted) {
        Alert.alert("Error", "Brak uprawnień do zapisu pliku");
        return;
      }

      // Generate filename
      const filename = `image_${Date.now()}.jpg`;

      // Get the destination URI
      const destinationUri =
        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          filename,
          "image/jpeg",
        );

      // Download and save the file
      await FileSystem.copyAsync({
        from: imageUri,
        to: destinationUri,
      });

      Alert.alert("Sukces", `Zdjęcie zostało pobrane pomyślnie.`);
    } catch (error) {
      console.error("Error downloading image:", error);
      Alert.alert("Error", "Nie udało się pobrać zdjęcia");
    }
  };

  return (
    <Modal
      visible={imageUri !== null}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/90 justify-center items-center">
        {/* Close button */}
        <TouchableOpacity
          className="absolute z-10"
          style={styles.closeButton}
          onPress={onClose}
        >
          <Ionicons name="close" size={scale(28)} color="white" />
        </TouchableOpacity>

        {/* Download button */}
        <TouchableOpacity
          className="absolute z-10"
          style={styles.downloadButton}
          onPress={downloadImage}
        >
          <Ionicons name="download" size={scale(28)} color="white" />
        </TouchableOpacity>

        {/* Image */}
        <Pressable
          className="w-full h-full justify-center items-center"
          onPress={onClose}
        >
          {imageUri && (
            <Image
              source={{ uri: imageUri }}
              className="w-full h-4/5"
              resizeMode="contain"
            />
          )}
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    top: verticalScale(50),
    right: scale(10),
    padding: scale(5),
  },
  downloadButton: {
    top: verticalScale(50),
    left: scale(10),
    padding: scale(5),
  },
});
