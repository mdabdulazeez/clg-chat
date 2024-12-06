export type Gender = 'male' | 'female';

export interface User {
  id: string;
  gender: Gender;
  email: string;
  verified: boolean;
}

export interface Message {
  id: string;
  content: string;
  timestamp: number;
  senderId: string;
}

export interface ChatSession {
  id: string;
  participants: User[];
  messages: Message[];
  messageCount: number;
}