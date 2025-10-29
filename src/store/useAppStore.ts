import {
  THEME_MAP,
  THEME_PRESETS,
  type IThemePreset,
  type TThemeKey,
} from "@/theme/tokens";
import { TResolvedThemeMode, TThemeMode } from "@/utils/theme";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface AppState {
  collapsed: boolean;
  toggleCollapsed: () => void;
  settingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  toggleSettings: () => void;
  themeKey: TThemeKey;
  setThemeKey: (key: TThemeKey) => void;
  themeMode: TThemeMode;
  setThemeMode: (mode: TThemeMode) => void;
  resolvedThemeMode: TResolvedThemeMode;
  setResolvedThemeMode: (mode: TResolvedThemeMode) => void;
  getThemePreset: () => IThemePreset;
}

const DEFAULT_THEME_KEY =
  THEME_PRESETS.find((preset) => preset.key === "shadcn")?.key ??
  THEME_PRESETS[0]?.key ??
  "shadcn";

const createNoopStorage = (): Storage => ({
  getItem: () => null,
  setItem: (_key: TThemeKey, _value: string) => undefined,
  removeItem: (_key: TThemeKey) => undefined,
  clear: () => undefined,
  key: (_index: number) => null,
  length: 0,
});

const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      collapsed: false,
      toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
      settingsOpen: false,
      openSettings: () => set({ settingsOpen: true }),
      closeSettings: () => set({ settingsOpen: false }),
      toggleSettings: () =>
        set((state) => ({ settingsOpen: !state.settingsOpen })),

      themeKey: DEFAULT_THEME_KEY,
      setThemeKey: (key) => {
        if (!THEME_MAP[key]) return;
        set({ themeKey: key });
      },

      themeMode: "system",
      setThemeMode: (mode) => {
        const allowedThemeModes: TThemeMode[] = ["light", "dark", "system"];
        if (!allowedThemeModes.includes(mode)) return;
        set({ themeMode: mode });
      },

      resolvedThemeMode: "light",
      setResolvedThemeMode: (mode) => {
        const allowedResolvedModes: TResolvedThemeMode[] = ["light", "dark"];
        if (!allowedResolvedModes.includes(mode)) return;
        set({ resolvedThemeMode: mode });
      },

      getThemePreset: () => {
        const key = get().themeKey;
        return THEME_MAP[key] ?? THEME_PRESETS[0];
      },
    }),
    {
      name: "app-settings",
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? window.localStorage
          : createNoopStorage()
      ),
      partialize: (state) => ({
        themeKey: state.themeKey,
        themeMode: state.themeMode,
      }),
    }
  )
);

export default useAppStore;
