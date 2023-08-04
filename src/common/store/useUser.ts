import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserState = {
  isSignedIn: boolean;

  signIn: () => void;
  signOut: () => void;
};

export const useUserStore = create<UserState>()(
  persist<UserState>(
    (set) => ({
      isSignedIn: true,

      signIn: () => set(() => ({ isSignedIn: true })),
      signOut: () => set(() => ({ isSignedIn: false })),
    }),
    {
      name: "login", // name of item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default the 'localStorage' is used
    }
  )
);
