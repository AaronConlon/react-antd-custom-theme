# React AntD Custom Theme

[![Pages Deploy](https://github.com/AaronConlon/react-antd-custom-theme/actions/workflows/deploy.yml/badge.svg)](https://github.com/AaronConlon/react-antd-custom-theme/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF.svg)](https://vitejs.dev/)
[![React 19](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)
[![Ant Design 6](https://img.shields.io/badge/Ant%20Design-6.0+-1677FF.svg)](https://ant.design/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178c6.svg)](https://www.typescriptlang.org/)

English · [中文说明](./README.zh-CN.md)

## Overview

**React AntD Custom Theme** is an opinionated admin shell that showcases how to push Ant Design's token system to the limit. It demonstrates:

- Multi-appearance presets (light/dark) with full TypeScript safety.
- Automated CSS variable generation synced with Ant Design tokens.
- Runtime theme switching with persisted user preferences.
- GitHub Pages ready out of the box.

**Live preview:** https://aaronconlon.github.io/react-antd-custom-theme/

More design background can be found in [docs/theme-system-overview.md](./docs/theme-system-overview.md).

## Feature Highlights

- 🎨 **Token-first theming** – dual-color presets per appearance (light / dark).
- ⚙️ **Scriptable CSS variables** – generate once, consume everywhere.
- 🌓 **Runtime mode detection** – system, light, and dark with persistence.
- 🔌 **Composable architecture** – Vite + React + Ant Design + Zustand.
- 🚀 **Automated deploy** – GitHub Actions builds & publishes static assets to Pages.

## Project Structure

```
├── src
│   ├── layouts           # Layout frame & theme switch panel
│   ├── styles            # Global styles & generated CSS variables
│   ├── theme             # Token presets & CSS variable mapping
│   ├── scripts           # End-user pages (Home / Test)
│   └── store             # Zustand stores (theme, layout state)
├── scripts
│   └── generate-css-variables.ts  # CLI to derive CSS vars from Ant tokens
├── docs
│   ├── theme-system-overview.md   # High level documentation (EN)
│   └── theme-architecture-notes.md# Implementation notes (CN)
└── .github/workflows/deploy.yml   # GitHub Pages deployment pipeline
```

## Tech Stack

| Layer        | Tools                                                                           |
| ------------ | -------------------------------------------------------------------------------- |
| Framework    | [React 19](https://react.dev/), [React Router 6](https://reactrouter.com/)       |
| UI & Theme   | [Ant Design 6](https://ant.design/), [Ant Design Tokens](https://ant.design/docs/spec/colors) |
| Build Tool   | [Vite 5](https://vitejs.dev/), [TypeScript 5](https://www.typescriptlang.org/)   |
| State Mgmt   | [Zustand](https://zustand-demo.pmnd.rs/)                                         |
| Styling      | CSS Modules, SCSS                                                               |
| Deployment   | GitHub Pages + GitHub Actions                                                    |

## Getting Started

```bash
# install dependencies
npm install

# run locally with hot reload
npm run dev

# generate theme css variables (must run after editing presets)
npm run generate:css-vars

# production build
npm run build
```

> ℹ️ The project ships with `package-lock.json`. Prefer `npm` unless you intentionally switch package managers.

## Theming Workflow

1. **Define presets** in [`src/theme/tokens.ts`](./src/theme/tokens.ts):
   - Each preset contains `colors.light/dark` for UI swatches.
   - `token.light/dark` merges with Ant Design's seed token to drive components.
2. **Map CSS variables** in [`src/theme/cssVariables.ts`](./src/theme/cssVariables.ts):
   - Declare semantic variables once (e.g. `--app-color-primary`).
   - Static layout variables are centralized (`--app-layout-header-height`).
3. **Generate CSS** using the script:
   ```bash
   npm run generate:css-vars
   ```
   Output is written to `src/styles/generated/theme-variables.css`.
4. **Consume variables** across styles (`global.scss`, `AdminLayout.module.scss`, etc.).

For a narrative walkthrough see [Theme System Overview](./docs/theme-system-overview.md).

## Deployment

GitHub Actions builds the site on every push to `main` and publishes it to GitHub Pages.

- Workflow: [.github/workflows/deploy.yml](./.github/workflows/deploy.yml)
- Hosted at: https://aaronconlon.github.io/react-antd-custom-theme/

To deploy elsewhere, run `npm run build` and host the `dist` folder on your preferred static hosting service.

## Contributing

1. Fork & clone the repository.
2. Create a feature branch.
3. Run `npm run generate:css-vars` if you modify theme presets.
4. Submit a PR — issues and enhancements are welcome!

## License

MIT © [Aaron Conlon](https://github.com/AaronConlon). See [LICENSE](./LICENSE) for details.
