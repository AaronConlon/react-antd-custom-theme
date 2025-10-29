# 主题系统优化建议

本文档整理了近期讨论的 Ant Design Token 与 CSS 变量管理相关的优化方向，方便后续分阶段落地。

## 1. 主题预设（Theme Preset）

- 引入 `createPreset` 工具函数，用 `satisfies` 断言保证每个预设至少补全 `SeedToken` 中的关键字段（`colorPrimary`、`colorInfo` 等）。
- 导出 `ThemeKey` 类型（`type ThemeKey = typeof THEME_PRESETS[number]['key']`），供 Store、脚本与业务组件复用，提升自动补全与类型安全。

## 2. CSS 变量映射

- 将 `CSS_VARIABLE_TOKEN_MAPPINGS` 拆分为按功能分组的常量，通过 `defineCssVars` 辅助函数输出 `readonly` 数组并统一汇总。
- 基于映射生成 `CssVarName` 联合类型，给 SCSS/TS 使用者提供可枚举的变量名称，避免拼写错误。
- 在映射结构中支持 `transform` 回调，用于自定义值（例如添加透明度、统一格式化）。

## 3. DOM 主题状态同步

- 抽象 `ThemeDom` 工具，集中处理 `data-theme-key`、`data-theme-mode` 的设置与清理，避免在多处重复操作 DOM。
- 提供 `resolveThemeMode(themeMode, systemPrefersDark)` 等纯函数，供 ConfigProvider 以及其他逻辑共用。

## 4. 静态变量与文档化

- 为静态布局变量编写 `defineStaticVars` 工具，生成带名字的常量映射，保持脚本与样式文件一致。
- 通过 JSDoc 或注释为分组变量添加中文说明，生成 CSS 时同时输出注释，方便在 DevTools 中快速理解含义。

## 5. 校验与自动化

- 在生成脚本中校验 token 是否存在、CSS 变量是否重复，并输出友好的错误信息。
- 考虑增加自定义 ESLint 规则或校验脚本，确保样式文件只引用已定义的 CSS 变量，使主题系统更稳定。

## 6. 后续落地建议

1. 先实现 `ThemeDom`、`resolveThemeMode` 等纯函数，减少 `App.tsx` 中的副作用分散。
2. 随后重构 `CSS_VARIABLE_TOKEN_MAPPINGS` 为分组结构，并生成对应的类型导出。
3. 最后为生成脚本加入校验与注释输出，逐步完善文档与测试，确保改动风险可控。

> 以上方案可以逐条实施，每完成一个阶段即可获得更清晰的主题资产与更高的可维护性。
