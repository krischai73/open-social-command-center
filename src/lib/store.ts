
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  compactView: boolean;
  dashboardLayout: 'grid' | 'list';
  sidebarCollapsed: boolean;
}

interface AppState {
  userPreferences: UserPreferences;
  setUserPreference: <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => void;
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      userPreferences: {
        theme: 'system',
        compactView: false,
        dashboardLayout: 'grid',
        sidebarCollapsed: false,
      },
      setUserPreference: (key, value) =>
        set((state) => ({
          userPreferences: {
            ...state.userPreferences,
            [key]: value,
          },
        })),
      isOffline: false,
      setIsOffline: (offline) => set({ isOffline: offline }),
    }),
    {
      name: 'social-command-storage',
      partialize: (state) => ({ userPreferences: state.userPreferences }),
    }
  )
);

// Offline detection
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    useAppStore.getState().setIsOffline(false);
  });
  
  window.addEventListener('offline', () => {
    useAppStore.getState().setIsOffline(true);
  });
}
