import { Attachment, Message } from "@/types/Message";
import * as FileSystem from "expo-file-system";
import { useStorageState } from "@/context/useStorageState";
import { useCallback } from "react";

/**
 * Utility function to save attachment files locally
 * Returns the updated attachment with local URI
 */
export const saveAttachmentLocally = async (attachment: Attachment): Promise<Attachment> => {
  try {
    if (!FileSystem.documentDirectory) {
      return attachment;
    }

    // Create attachments directory if it doesn't exist
    const attachmentsDir = `${FileSystem.documentDirectory}attachments/`;
    const dirInfo = await FileSystem.getInfoAsync(attachmentsDir);
    
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(attachmentsDir, { intermediates: true });
    }

    // Generate unique filename
    const fileExtension = attachment.name.split('.').pop() || '';
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExtension}`;
    const localUri = `${attachmentsDir}${fileName}`;

    // Copy file to local storage
    await FileSystem.copyAsync({
      from: attachment.uri,
      to: localUri
    });

    // Return updated attachment with local URI
    return {
      ...attachment,
      uri: localUri
    };
  } catch (error) {
    console.error("Error saving attachment locally:", error);
    return attachment;
  }
};

/**
 * Hook for managing messages with attachments in storage
 */
export const useMessagesWithAttachments = (teacherId: string) => {
  const storageKey = `messages_${teacherId}`;
  const [messages, setMessages, loading] = useStorageState<Message[]>(storageKey);

  const sendMessage = useCallback(
    async (text: string, attachments?: Attachment[]) => {
      try {
        let processedAttachments: Attachment[] | undefined = undefined;

        if (attachments && attachments.length > 0) {
          // Save attachments to local storage
          processedAttachments = await Promise.all(
            attachments.map(saveAttachmentLocally)
          );
        }

        const newMessage: Message = {
          id: Date.now().toString(),
          text,
          sender: "user",
          timestamp: new Date(),
          read: true,
          attachments: processedAttachments,
        };

        const updatedMessages = [...(messages || []), newMessage];
        await setMessages(updatedMessages);

        return newMessage;
      } catch (error) {
        console.error("Error sending message:", error);
        throw error;
      }
    },
    [messages, setMessages]
  );

  return {
    messages: messages || [],
    sendMessage,
    loading,
  };
}; 