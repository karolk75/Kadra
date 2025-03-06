import { Attachment, Message } from "@/types/Message";
import { TeacherContact } from "@/types/TeacherContact";
import { formatMessageTime } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useRef, useState } from "react";
import {
  ActionSheetIOS,
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import { ImageViewer } from "./ImageViewer";

interface ConversationViewProps {
  teacher: TeacherContact;
  messages: Message[];
  onSendMessage: (text: string, attachments?: Attachment[]) => void;
  onBack: () => void;
}

export const ConversationView: React.FC<ConversationViewProps> = ({
  teacher,
  messages,
  onSendMessage,
  onBack,
}) => {
  const [message, setMessage] = useState("");
  const [pendingAttachments, setPendingAttachments] = useState<Attachment[]>(
    []
  );
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();

  const scrollToBottom = (animated: boolean) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated });
    }
  };

  const handleSendMessage = () => {
    if (!message.trim() && pendingAttachments.length === 0) return;

    // Even if text is empty, send message if there are attachments
    const messageText = message.trim();
    setMessage("");

    // Send message with attachments
    onSendMessage(
      messageText,
      pendingAttachments.length > 0 ? pendingAttachments : undefined
    );

    // Clear attachments after sending
    setPendingAttachments([]);

    setTimeout(() => {
      scrollToBottom(true);
    }, 100);
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
        multiple: true,
      });

      if (result.canceled) return;

      const newAttachments: Attachment[] = await Promise.all(
        result.assets.map(async (doc) => {
          // Get file info
          const fileInfo = await FileSystem.getInfoAsync(doc.uri);

          let fileSize: number | undefined = undefined;
          if (fileInfo.exists) {
            // Cast to any to avoid TypeScript errors with size property
            fileSize = (fileInfo as any).size;
          }

          return {
            id:
              Date.now().toString() +
              Math.random().toString(36).substring(2, 9),
            type: "file",
            uri: doc.uri,
            name: doc.name || "Unknown file",
            size: fileSize,
            mimeType: doc.mimeType,
          };
        })
      );

      setPendingAttachments((prev) => [...prev, ...newAttachments]);
    } catch (error) {
      console.error("Error picking document:", error);
      Alert.alert("Error", "Failed to pick document");
    }
  };

  const openImagePicker = async () => {
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Anuluj", "Zrób zdjęcie", "Wybierz z galerii"],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            takePhoto();
          } else if (buttonIndex === 2) {
            pickImage();
          }
        }
      );
    } else {
      Alert.alert("Wybierz opcję", "", [
        { text: "Anuluj", style: "cancel" },
        { text: "Zrób zdjęcie", onPress: takePhoto },
        { text: "Wybierz z galerii", onPress: pickImage },
      ]);
    }
  };

  const pickImage = async () => {
    try {
      // Request permission first
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Brak dostępu",
          "Proszę o udzielenie dostępu do biblioteki zdjęć w celu wybrania zdjęć"
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.8,
      });

      if (result.canceled) return;

      const newAttachments: Attachment[] = result.assets.map((asset) => ({
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
        type: "image",
        uri: asset.uri,
        name: asset.uri.split("/").pop() || "image.jpg",
        size: asset.fileSize,
      }));

      setPendingAttachments((prev) => [...prev, ...newAttachments]);
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const takePhoto = async () => {
    try {
      // Request permission first
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Brak dostępu",
          "Proszę o udzielenie dostępu do kamery w celu zrobienia zdjęć"
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
      });

      if (result.canceled) return;

      const newAttachment: Attachment = {
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
        type: "image",
        uri: result.assets[0].uri,
        name: result.assets[0].uri.split("/").pop() || "camera_image.jpg",
        size: result.assets[0].fileSize,
      };

      setPendingAttachments((prev) => [...prev, newAttachment]);
    } catch (error) {
      console.error("Error taking photo:", error);
      Alert.alert("Error", "Nie udało się zrobić zdjęcia");
    }
  };

  const removeAttachment = (id: string) => {
    setPendingAttachments((prev) =>
      prev.filter((attachment) => attachment.id !== id)
    );
  };

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom(true);
    }, 100);
  }, [messages]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        scrollToBottom(true);
      }
    );
    return () => {
      keyboardDidShowListener.remove();
    };
  }, [messages]);

  const headerPaddingTop = insets.top > 0 ? 0 : scale(8);

  // Function to render file or image thumbnail
  const renderAttachment = (
    attachment: Attachment,
    inMessage: boolean = false
  ) => {
    if (attachment.type === "image") {
      return (
        <View
          key={attachment.id}
          className="rounded-sm overflow-hidden border border-[#E5E5E5] relative"
          style={inMessage ? styles.inMessageImageContainer : styles.previewImageContainer}
        >
          <Image
            source={{ uri: attachment.uri }}
            style={inMessage ? styles.inMessageImage : styles.previewImage}
          />

          {!inMessage && (
            <TouchableOpacity
              className="absolute top-0 right-0 bg-black/60 rounded-full justify-center items-center"
              style={styles.removeButton}
              onPress={() => removeAttachment(attachment.id)}
            >
              <Ionicons name="close" size={scale(16)} color="white" />
            </TouchableOpacity>
          )}
        </View>
      );
    } else {
      // File attachment
      return (
        <View
          key={attachment.id}
          className="rounded-sm overflow-hidden border border-[#E5E5E5] relative bg-[#F5F5F5] justify-center items-center"
          style={inMessage ? styles.inMessageFileContainer : styles.previewFileContainer}
        >
          <Ionicons
            name="document-outline"
            size={inMessage ? scale(28) : scale(24)}
            color="#717171"
          />

          <Text
            numberOfLines={1}
            className="font-poppins-regular mt-1 text-[#717171]"
            style={inMessage ? styles.inMessageFileName : styles.previewFileName}
          >
            {attachment.name.length > 15
              ? attachment.name.substring(0, 12) + "..."
              : attachment.name}
          </Text>

          {!inMessage && (
            <TouchableOpacity
              className="absolute top-0 right-0 bg-black/60 rounded-full justify-center items-center"
              style={styles.removeButton}
              onPress={() => removeAttachment(attachment.id)}
            >
              <Ionicons name="close" size={scale(16)} color="white" />
            </TouchableOpacity>
          )}
        </View>
      );
    }
  };

  // Function to check if a message has only attachments and no text
  const hasOnlyAttachments = (msg: Message) => {
    return (
      (!msg.text || msg.text.trim() === "") &&
      msg.attachments &&
      msg.attachments.length > 0
    );
  };

  // Function to handle attachment taps
  const handleAttachmentPress = (attachment: Attachment) => {
    if (attachment.type === "image") {
      // Open image in fullscreen
      setFullscreenImage(attachment.uri);
    } else {
      // Handle file opening/downloading
      Alert.alert("Attachment", `Opening ${attachment.name}...`, [
        { text: "OK" },
      ]);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
      keyboardVerticalOffset={-Math.max(insets.bottom, scale(10)) + scale(5)}
    >
      <View className="flex-1">
        {/* Chat header */}
        <View
          className="flex-col justify-end bg-lightblue z-10"
          style={[styles.header, { height: insets.top + scale(60), paddingTop: headerPaddingTop }]}
        >
          <View
            className="flex-row items-center w-full"
            style={{ marginTop: insets.top }}
          >
            <TouchableOpacity onPress={onBack} className="mr-3 z-10">
              <Ionicons name="arrow-back" size={scale(24)} color="white" />
            </TouchableOpacity>

            <View
              className="bg-white rounded-full overflow-hidden justify-center items-center"
              style={styles.avatarContainer}
            >
              {teacher.avatar}
            </View>

            <View className="ml-2 flex-1">
              <Text
                className="font-poppins-bold text-white"
                style={styles.teacherName}
              >
                {teacher.name}
              </Text>
              <Text
                className="font-poppins-light text-white"
                style={styles.teacherSubject}
              >
                {teacher.subject}
              </Text>
            </View>
          </View>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          className="flex-1"
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg, index) => {
            const isUser = msg.sender === "user";
            const showTimestamp =
              index === 0 ||
              new Date(msg.timestamp).getTime() -
                new Date(messages[index - 1].timestamp).getTime() >
                15 * 60 * 1000;

            return (
              <View
                key={msg.id}
                className="mb-2 w-full"
                style={styles.messageWrapper}
              >
                {showTimestamp && (
                  <Text
                    className="text-center text-gray-400 font-poppins-regular"
                    style={styles.timestamp}
                  >
                    {formatMessageTime(msg.timestamp)}
                  </Text>
                )}

                <View
                  className={`${
                    isUser ? "bg-yellow self-end" : "bg-[#F3F4F6] self-start"
                  } max-w-[75%]`}
                  style={[
                    styles.messageBubble,
                    {
                      borderTopRightRadius: isUser ? scale(4) : scale(20),
                      borderTopLeftRadius: isUser ? scale(20) : scale(4),
                    },
                  ]}
                >
                  {/* Message attachments */}
                  {msg.attachments && msg.attachments.length > 0 && (
                    <View style={{ marginBottom: msg.text ? scale(8) : 0 }}>
                      {msg.attachments.map((attachment) => (
                        <TouchableOpacity
                          key={attachment.id}
                          onPress={() => handleAttachmentPress(attachment)}
                        >
                          {renderAttachment(attachment, true)}
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}

                  {/* Message text or placeholder for attachment-only messages */}
                  {msg.text ? (
                    <Text
                      className={`font-poppins-regular ${
                        isUser ? "text-white" : "text-gray-800"
                      }`}
                      style={styles.messageText}
                    >
                      {msg.text}
                    </Text>
                  ) : hasOnlyAttachments(msg) ? (
                    <Text
                      className={`font-poppins-italic text-center opacity-70 ${
                        isUser ? "text-white" : "text-gray-800"
                      }`}
                      style={styles.attachmentOnlyText}
                    >
                      Wysłane załączniki
                    </Text>
                  ) : null}
                </View>
              </View>
            );
          })}
        </ScrollView>

        {/* Attachment preview area */}
        {pendingAttachments.length > 0 && (
          <View
            className="bg-[#F9F9F9] border-t border-[#EEEEEE]"
            style={styles.attachmentPreviewContainer}
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                alignItems: "center",
              }}
            >
              {pendingAttachments.map((attachment) =>
                renderAttachment(attachment)
              )}
            </ScrollView>
          </View>
        )}

        {/* Message input */}
        <View
          className="flex-row items-center bg-white border-t border-[#EEEEEE]"
          style={[
            styles.inputContainer,
            { paddingBottom: Math.max(insets.bottom, scale(10)) }
          ]}
        >
          <TouchableOpacity className="mr-2" onPress={pickDocument}>
            <Ionicons name="attach" size={scale(24)} color="#A1A4B2" />
          </TouchableOpacity>

          <View
            className="flex-1 flex-row items-center bg-[#F2F2F2] rounded-full"
            style={styles.textInputWrapper}
          >
            <TextInput
              className="flex-1 text-gray-800 font-poppins-regular py-0"
              style={styles.textInput}
              placeholder="Napisz wiadomość..."
              placeholderTextColor="#A1A4B2"
              value={message}
              onChangeText={setMessage}
              multiline
            />

            <TouchableOpacity className="ml-2" onPress={openImagePicker}>
              <Ionicons name="camera" size={scale(22)} color="#A1A4B2" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleSendMessage}
            className="justify-center items-center ml-2 rounded-full"
            disabled={message.trim() === "" && pendingAttachments.length === 0}
            style={[
              styles.sendButton,
              {
                backgroundColor:
                  message.trim() || pendingAttachments.length > 0
                    ? "#89A8B2"
                    : "#DADCE0",
              },
            ]}
          >
            <Ionicons name="send" size={scale(18)} color="white" />
          </TouchableOpacity>
        </View>

        {/* Full-screen image viewer */}
        <ImageViewer
          imageUri={fullscreenImage}
          onClose={() => setFullscreenImage(null)}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: scale(16),
    paddingBottom: scale(12),
  },
  avatarContainer: {
    width: scale(40),
    height: scale(40),
  },
  teacherName: {
    fontSize: scale(18),
  },
  teacherSubject: {
    fontSize: scale(14),
  },
  messageList: {
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(16),
  },
  messageWrapper: {
    marginBottom: verticalScale(8),
  },
  timestamp: {
    marginVertical: verticalScale(8),
    fontSize: scale(12),
  },
  messageBubble: {
    paddingVertical: scale(12),
    paddingHorizontal: scale(16),
    borderRadius: scale(20),
  },
  messageText: {
    fontSize: scale(15),
    lineHeight: scale(20),
  },
  attachmentOnlyText: {
    fontSize: scale(13),
    marginTop: scale(4),
  },
  inMessageImageContainer: {
    width: "100%",
    marginBottom: scale(8),
    marginRight: 0,
  },
  previewImageContainer: {
    width: scale(60),
    height: scale(60),
    marginRight: scale(8),
    marginBottom: 0,
  },
  inMessageImage: {
    width: "100%",
    height: scale(200),
    resizeMode: "contain",
  },
  previewImage: {
    width: "100%",
    height: scale(60),
    resizeMode: "cover",
  },
  inMessageFileContainer: {
    width: "100%",
    marginBottom: scale(8),
    marginRight: 0,
    padding: scale(12),
  },
  previewFileContainer: {
    width: scale(60),
    height: scale(60),
    marginRight: scale(8),
    marginBottom: 0,
    padding: scale(4),
  },
  inMessageFileName: {
    fontSize: scale(14),
    marginTop: scale(1),
  },
  previewFileName: {
    fontSize: scale(10),
    marginTop: scale(1),
  },
  removeButton: {
    width: scale(24),
    height: scale(24),
  },
  attachmentPreviewContainer: {
    paddingHorizontal: scale(16),
    paddingVertical: scale(10),
  },
  inputContainer: {
    paddingHorizontal: scale(16),
    paddingTop: scale(10),
  },
  textInputWrapper: {
    paddingHorizontal: scale(16),
    paddingVertical: scale(8),
    height: scale(44),
  },
  textInput: {
    fontSize: scale(15),
  },
  sendButton: {
    marginLeft: scale(10),
    width: scale(44),
    height: scale(44),
  },
});
