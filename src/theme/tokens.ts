import type { SeedToken } from "antd/es/theme/interface";

type TRequiredSeedTokenKeys = "colorPrimary" | "colorInfo";
type TThemeAppearance = "light" | "dark";

type TThemeSeedOverrides = Pick<SeedToken, TRequiredSeedTokenKeys> &
  Partial<SeedToken>;

export interface IThemePreset<K extends string = string> {
  key: K;
  name: string;
  description: string;
  colors: Record<TThemeAppearance, string>;
  token: Record<TThemeAppearance, TThemeSeedOverrides>;
}

// 创建主题预设
/** 工厂函数也保持泛型返回值 */
const createThemePreset = <K extends string>(
  preset: IThemePreset<K>
) => preset;

export const THEME_PRESETS = [
  createThemePreset({
    key: "shadcn",
    name: "Shadcn",
    description: "Shadcn 主题",
    colors: {
      light: "oklch(12.9% 0.042 264.695)",
      dark: "oklch(78% 0.042 264.695)",
    },
    token: {
      light: {
        colorPrimary: "oklch(12.9% 0.042 264.695)",
        colorInfo: "oklch(12.9% 0.042 264.695)",
      },
      dark: {
        colorPrimary: "oklch(78% 0.042 264.695)",
        colorInfo: "oklch(78% 0.042 264.695)",
      },
    },
  }),
  createThemePreset({
    key: "purple",
    name: "酱紫 Purple",
    description: "艺术设计、创意类项目",
    colors: {
      light: "#722ed1",
      dark: "#9b6df0",
    },
    token: {
      light: {
        colorPrimary: "#722ed1",
        colorInfo: "#722ed1",
      },
      dark: {
        colorPrimary: "#9b6df0",
        colorInfo: "#9b6df0",
      },
    },
  }),
  // Tencent Design Blue
  createThemePreset({
    key: "td-blue",
    name: "Tencent Design Blue",
    description: "Tencent Design Blue 主题",
    colors: {
      light: "#1677ff",
      dark: "#3a8bff",
    },
    token: {
      light: {
        colorPrimary: "#1677ff",
        colorInfo: "#1677ff",
      },
      dark: {
        colorPrimary: "#3a8bff",
        colorInfo: "#3a8bff",
      },
    },
  }),
] as const satisfies readonly IThemePreset[];

export type TThemeKey = (typeof THEME_PRESETS)[number]["key"];

export const THEME_MAP = THEME_PRESETS.reduce((acc, preset) => {
  acc[preset.key] = preset;
  return acc;
}, {} as Record<TThemeKey, IThemePreset>);
