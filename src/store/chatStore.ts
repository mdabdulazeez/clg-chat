import { create } from 'zustand';
import type { ChatSession, Message, User } from '../types/chat';

interface ChatStore {
  user: User | null;
  currentSession: ChatSession | null;
  setUser: (user: User | null) => void;
  setSession: (session: ChatSession | null) => void;
  addMessage: (message: Message) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  user: null,
  currentSession: null,
  setUser: (user) => set({ user }),
  setSession: (session) => set({ currentSession: session }),
  addMessage: (message) =>
    set((state) => ({
      currentSession: state.currentSession
        ? {
            ...state.currentSession,
            messages: [...state.currentSession.messages, message],
            messageCount: state.currentSession.messageCount + 1,
          }
        : null,
    })),
}));