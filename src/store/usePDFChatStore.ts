import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type IChat = {
  by: "system" | "user";
  msg: string;
} | null;

type State = {
  allChats: IChat[] | [];
  pdfPath: string;
};

type Action = {
  setMessage: (chat: IChat) => void;
  setPdfPath: (path: string) => void;
  getAllMessages: () => IChat[];
  deleteChats: () => void;
  deletePdfPath: () => void;
};

const usePDFChatStore = create(
  persist<State & Action>(
    (set, get) => ({
      allChats: [],
      pdfPath: "",
      setPdfPath: (path: string) => {
        set({ pdfPath: path });
      },
      setMessage: (chat: IChat) => {
        set((state) => ({ allChats: [...state.allChats, chat] }));
      },
      getAllMessages: () => {
        return get().allChats;
      },
      deleteChats: () => {
        get().allChats = [];
      },
      deletePdfPath: () => set({ pdfPath: "" }),
    }),
    {
      name: "PDFChatStore",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
export default usePDFChatStore;
