# React AntD 自定义主题项目

[![Pages Deploy](https://github.com/AaronConlon/react-antd-custom-theme/actions/workflows/deploy.yml/badge.svg)](https://github.com/AaronConlon/react-antd-custom-theme/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Vite](https://img.shields.io/badge/构建-Vite-646CFF.svg)](https://vitejs.dev/)
[![React 19](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)
[![Ant Design 6](https://img.shields.io/badge/Ant%20Design-6.0+-1677FF.svg)](https://ant.design/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178c6.svg)](https://www.typescriptlang.org/)

中文版 · [English Version](./README.md)

## 项目简介

**React AntD Custom Theme** 旨在演示如何在 Ant Design 6 中实现高级主题系统，涵盖：

- 支持明 / 暗双外观的主题预设，具备严格的 TypeScript 约束。
- 自动生成 CSS 变量并与 Ant Design Token 完整同步。
- 运行时主题切换与持久化用户偏好。
- 原生支持 GitHub Pages 部署。

**在线预览：** https://aaronconlon.github.io/react-antd-custom-theme/

更完整的主题设计思路见 [docs/theme-system-overview.md](./docs/theme-system-overview.md)。

## 亮点特性

- 🎨 **Token 驱动**：每个主题可独立配置明 / 暗主色。
- ⚙️ **脚本生成**：一键生成 CSS 变量，避免手工维护。
- 🌓 **运行时切换**：系统、亮色、暗色随意切换并持久化。
- 🔌 **现代架构**：Vite + React 19 + Ant Design 6 + Zustand。
- 🚀 **自动部署**：GitHub Actions + GitHub Pages 全流程自动化。

## 项目结构

```
├── src
│   ├── layouts           # 布局框架与主题面板
│   ├── styles            # 全局样式与生成的 CSS 变量
│   ├── theme             # 主题预设与 CSS 变量映射
│   ├── pages             # 业务页面 (Home / Test)
│   └── store             # Zustand 状态管理
├── scripts
│   └── generate-css-variables.ts  # 将 Ant Token 转换为 CSS 变量的脚本
├── docs
│   ├── theme-system-overview.md   # 英文主题设计说明
│   └── theme-architecture-notes.md# 中文实现笔记
└── .github/workflows/deploy.yml   # GitHub Pages 自动部署流程
```

## 技术栈

| 层级       | 选型                                                                 |
| ---------- | -------------------------------------------------------------------- |
| 框架       | [React 19](https://react.dev/)、[React Router 6](https://reactrouter.com/) |
| UI / 主题  | [Ant Design 6](https://ant.design/)、Ant Design Token                |
| 构建工具   | [Vite 5](https://vitejs.dev/)、[TypeScript 5](https://www.typescriptlang.org/) |
| 状态管理   | [Zustand](https://zustand-demo.pmnd.rs/)                             |
| 样式       | CSS Modules、SCSS                                                    |
| 部署       | GitHub Pages + GitHub Actions                                        |

## 快速开始

```bash
# 安装依赖
npm install

# 本地开发
npm run dev

# 更新主题后重新生成 CSS 变量
npm run generate:css-vars

# 构建产物
npm run build
```

> 提供了 `package-lock.json`，建议使用 `npm` 保持一致。

## 主题工作流

1. **定义主题预设**：[`src/theme/tokens.ts`](./src/theme/tokens.ts)
   - `colors.light / colors.dark` 用于展示色块。
   - `token.light / token.dark` 会覆盖 Ant Design 的 Seed Token。
2. **声明 CSS 变量**：[`src/theme/cssVariables.ts`](./src/theme/cssVariables.ts)
   - 统一维护语义化变量，例如 `--app-color-primary`。
   - 固定布局变量也集中到一起（如 `--app-layout-header-height`）。
3. **生成 CSS**：
   ```bash
   npm run generate:css-vars
   ```
   输出文件：`src/styles/generated/theme-variables.css`。
4. **在样式中消费变量**：如 `global.scss`、`AdminLayout.module.scss`。

详细说明可参考 [Theme System Overview](./docs/theme-system-overview.md)。

## 部署

GitHub Actions 会在 `main` 分支发生变更时自动执行构建并发布到 GitHub Pages。

- 工作流定义：[.github/workflows/deploy.yml](./.github/workflows/deploy.yml)
- 访问地址：https://aaronconlon.github.io/react-antd-custom-theme/

若部署到其他平台，只需执行 `npm run build` 并托管 `dist` 目录即可。

## 贡献方式

1. Fork 本仓库并克隆到本地。
2. 创建新的功能分支。
3. 若调整主题，请记得运行 `npm run generate:css-vars`。
4. 提交 Pull Request，欢迎反馈与改进建议！

## 许可证

[MIT License](./LICENSE) © [Aaron Conlon](https://github.com/AaronConlon)。
