import type { MapToken } from "antd/es/theme/interface";
import type { TThemeKey } from "./tokens";

export const THEME_ATTRIBUTE = "data-theme-key";
export const THEME_MODE_ATTRIBUTE = "data-theme-mode";
export const THEME_MODES = ["light", "dark"] as const;

export type TThemeDomMode = (typeof THEME_MODES)[number];

// CSS 变量映射
export interface ICssVariableTokenMapping {
  name: `--${string}`;
  token: keyof MapToken;
  description?: string;
}

// 通用的定义 CSS 变量组函数
const defineCssVars = <T extends readonly ICssVariableTokenMapping[]>(
  group: T
) => group;

export interface IStaticCssVariable {
  name: `--${string}`;
  value: string;
  description?: string;
}

const defineStaticVars = <T extends readonly IStaticCssVariable[]>(vars: T) =>
  vars;

// 分组定义变量

const COLOR_VARS = defineCssVars([
  {
    name: "--app-color-primary",
    token: "colorPrimary",
    description: "主色",
  },
  {
    name: "--app-color-primary-hover",
    token: "colorPrimaryHover",
    description: "主色 hover",
  },
  {
    name: "--app-color-primary-active",
    token: "colorPrimaryActive",
    description: "主色 active",
  },
  {
    name: "--app-color-primary-text",
    token: "colorPrimaryText",
    description: "主色文本",
  },
  {
    name: "--app-color-link",
    token: "colorLink",
    description: "链接色",
  },
  {
    name: "--app-color-link-hover",
    token: "colorLinkHover",
    description: "链接色 hover",
  },
  {
    name: "--app-color-link-active",
    token: "colorLinkActive",
    description: "链接色 active",
  },
  {
    name: "--app-color-text",
    token: "colorText",
    description: "文本色",
  },
  {
    name: "--app-color-text-secondary",
    token: "colorTextSecondary",
    description: "文本色 secondary",
  },
  {
    name: "--app-color-border",
    token: "colorBorder",
    description: "边框色",
  },
  {
    name: "--app-color-border-secondary",
    token: "colorBorderSecondary",
    description: "边框色 secondary",
  },
] as const);

const BACKGROUND_VARS = defineCssVars([
  {
    name: "--app-bg-layout",
    token: "colorBgLayout",
    description: "布局背景色",
  },
  {
    name: "--app-bg-container",
    token: "colorBgContainer",
    description: "容器背景色",
  },
  {
    name: "--app-color-fill",
    token: "colorFill",
    description: "填充色",
  },
  {
    name: "--app-color-fill-secondary",
    token: "colorFillSecondary",
    description: "填充色 secondary",
  },
] as const);

export const CSS_VARIABLE_TOKEN_MAPPINGS = [
  ...COLOR_VARS,
  ...BACKGROUND_VARS,
] as const;

// 构建主题选择器 (生成 css 代码)
export const buildThemeSelector = (
  presetKey: TThemeKey,
  mode: TThemeDomMode
) => {
  return `:root[data-theme-key='${presetKey}'][data-theme-mode='${mode}']`;
};

export const STATIC_CSS_VARIABLES = defineStaticVars([
  {
    name: "--app-layout-header-height",
    value: "64px",
    description: "头部高度",
  },
  { name: "--app-layout-sider-width", value: "220px", description: "侧栏宽度" },
] satisfies readonly IStaticCssVariable[]);

// css 变量类型
export type TCssVarName = (typeof CSS_VARIABLE_TOKEN_MAPPINGS)[number]["name"];
export type TStaticCssVarName = (typeof STATIC_CSS_VARIABLES)[number]["name"];
