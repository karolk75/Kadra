export interface TeacherContact {
  id: string;
  name: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount: number;
  avatar: React.ReactNode;
  subject: string;
  school: string; // School the teacher belongs to
}
