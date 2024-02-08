import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IUserAuthStore } from "../@types";

type State = {
  authenticated: boolean;
  userInfo: IUserAuthStore | null;
};

type Action = {
  login: (userData: IUserAuthStore | null) => boolean;
  logout: () => void;
};

const useAuthStore = create(
  persist<State & Action>(
    (set) => ({
      authenticated: false,
      userInfo: null,

      login: (userData: IUserAuthStore | null) => {
        if (userData) {
          set({
            authenticated: true,
            userInfo: userData,
          });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ authenticated: false, userInfo: null });
      },
    }),
    {
      name: "authStore",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
export default useAuthStore;
