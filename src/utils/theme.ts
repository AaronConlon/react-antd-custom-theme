import {
  TCssVarName,
  TStaticCssVarName,
  THEME_ATTRIBUTE,
  THEME_MODE_ATTRIBUTE,
} from "@/theme/cssVariables";

export type TThemeMode = "light" | "dark" | "system";
export type TResolvedThemeMode = "light" | "dark";

// 解析主题模式
export const resolveThemeMode = (
  mode: TThemeMode,
  systemPrefersDark: boolean
): TResolvedThemeMode => {
  if (mode === "dark") return "dark";
  if (mode === "light") return "light";
  return systemPrefersDark ? "dark" : "light";
};

// 主题 DOM 功能方法
export const ThemeDom = {
  apply(root: HTMLElement, key: string, mode: TResolvedThemeMode) {
    root.setAttribute(THEME_ATTRIBUTE, key);
    root.setAttribute(THEME_MODE_ATTRIBUTE, mode);
  },
  clear(root: HTMLElement) {
    root.removeAttribute(THEME_ATTRIBUTE);
    root.removeAttribute(THEME_MODE_ATTRIBUTE);
  },
};

// 获取 CSS 变量值 (浏览器环境)
export const getCssVar = <TName extends TCssVarName | TStaticCssVarName>(
  name: TName,
  fallback = ""
): string => {
  if (typeof document === "undefined") {
    return fallback;
  }

  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();

  return value.length > 0 ? value : fallback;
};
