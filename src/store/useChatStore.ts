import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type IChat = {
  by: "system" | "user";
  msg: string;
} | null;

type State = {
  allChats: IChat[] | [];
};

type Action = {
  setMessage: (chat: IChat) => void;
  getAllMessages: () => IChat[];
  deleteChats: () => void;
};

const useAuthStore = create(
  persist<State & Action>(
    (set, get) => ({
      allChats: [],
      setMessage: (chat: IChat) => {
        set((state) => ({ allChats: [...state.allChats, chat] }));
      },
      getAllMessages: () => {
        return get().allChats;
      },
      deleteChats: () => {
        get().allChats = [];
      },
    }),
    {
      name: "chatStore",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
export default useAuthStore;
