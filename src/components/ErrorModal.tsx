import React from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { Ionicons } from '@expo/vector-icons';
import { ThemeColors } from '@/constants/ThemeColors';
import { useError } from '@/context/ErrorContext';

interface ErrorModalProps {
  // Optional additional props if needed
}

// Helper function to format error source for display
const formatErrorSource = (source?: string): string => {
  if (!source) return '';
  
  // Capitalize first letter and add a colon
  return source.charAt(0).toUpperCase() + source.slice(1) + ': ';
};

const ErrorModal: React.FC<ErrorModalProps> = () => {
  // Use the error context hook
  const { error, clearError } = useError();
  
  // Check if there's an error to display
  const hasError = error !== null;
  
  // Handle closing the modal and clearing the error
  const handleClose = () => {
    clearError();
  };

  return (
    <Modal
      visible={hasError}
      transparent={true}
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View
          className="w-11/12 bg-white rounded-3xl overflow-hidden"
          style={styles.modalView}
        >
          {/* Header */}
          <View
            style={styles.header}
            className="flex-row items-center justify-between border-b border-[#E8E8E8]"
          >
            <View style={styles.placeholder} />
            <Text
              style={styles.title}
              className="flex-1 text-center font-poppins-bold text-darkblue"
            >
              Błąd
            </Text>
            <TouchableOpacity
              onPress={handleClose}
              style={styles.closeButton}
              className="items-center"
            >
              <Ionicons
                name="close"
                size={scale(24)}
                color={ThemeColors.BRICK_RED}
              />
            </TouchableOpacity>
          </View>

          {/* Error content */}
          <View className="p-4 items-center">
            <Ionicons
              name="alert-circle"
              size={scale(48)}
              color={ThemeColors.BRICK_RED}
              style={styles.icon}
            />
            {error?.code && (
              <Text
                style={styles.errorCode}
                className="font-poppins-medium text-center"
              >
                Error code: {error.code}
              </Text>
            )}
            <Text
              style={styles.errorText}
              className="font-poppins-medium text-center mt-2"
            >
              {formatErrorSource(error?.source)}
              {error?.message || 'Wystąpił nieznany błąd'}
            </Text>
          </View>

          {/* Close button */}
          <TouchableOpacity
            onPress={handleClose}
            style={styles.button}
            className="bg-[#0B3954] mx-4 mb-4 rounded-full items-center justify-center"
          >
            <Text className="text-white font-poppins-medium" style={styles.buttonText}>
              Zamknij
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(16),
  },
  title: {
    fontSize: scale(18),
  },
  placeholder: {
    width: scale(32),
  },
  closeButton: {
    padding: scale(4),
    width: scale(32),
  },
  icon: {
    marginBottom: verticalScale(8),
  },
  errorCode: {
    fontSize: scale(14),
    color: '#666',
    marginBottom: verticalScale(4),
  },
  errorText: {
    fontSize: scale(16),
    marginBottom: verticalScale(16),
  },
  button: {
    height: verticalScale(50),
  },
  buttonText: {
    fontSize: scale(16),
  },
});

export default ErrorModal; 