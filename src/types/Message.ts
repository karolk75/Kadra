export interface Message {
  id: string;
  text: string;
  sender: "user" | "teacher";
  timestamp: Date;
  read: boolean;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  type: "file" | "image";
  uri: string;
  name: string;
  size?: number;
  mimeType?: string;
}
