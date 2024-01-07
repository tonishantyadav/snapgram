import { Models } from 'appwrite';
import { create } from 'zustand';

interface UserStore {
  user: Models.Document | null;
  isAuthenticated: boolean;
  setUser: (user: Models.Document | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}));
  
export default useUserStore;
