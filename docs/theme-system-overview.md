# 主题系统改造全景指南（给忙碌的小白看也不怕）

这篇文档用尽量轻松的方式，带你把现在的主题体系从“为什么要这么做”一路串到“真实的代码是怎样运转的”。看完它，你就能在脑海里勾勒出这套系统的全过程：预设 → Token → CSS 变量 → 页面应用 → 生成脚本 → 运行时同步。

---

## 热身：从最简单的主题方案说起

开始前先回顾一下大家最容易想到的做法，帮助你把这套体系的“前世今生”串起来：

1. **字符串配置 Ant Design Theme**  
   最初我们只需在 `ConfigProvider` 里写个对象：
   ```ts
   <ConfigProvider
     theme={{
       token: {
         colorPrimary: '#1677ff',
         colorBgLayout: '#f5f5f5',
       },
     }}
   >
   ```
   这种写法简单直观，但它只影响 Ant Design 组件，普通样式文件里的颜色、间距依旧得手动维护，一旦换主题就得处处搜字符串。

2. **引入一个 CSS 变量做兜底**  
   于是我们可能会想到在全局样式里写：
   ```css
   :root {
     --app-primary: #1677ff;
   }
   ```
   自己的组件可以用 `var(--app-primary)`，比硬编码好一点。但变量少、结构散乱，随着主题变多还是会失控：不同文件各自声明变量、缺乏注释、没有类型提示，团队协作很快陷入混乱。

3. **需求升级，开始寻找系统化思路**  
   当需要支持多套主题、明暗模式、甚至运行时切换时，就不得不思考：
   - 这些颜色、尺寸到底从哪来？  
   - Ant Design 的 token 怎么复用到我们的样式里？  
   - 有没有办法让主题列表、变量名称都能自动补全，减少低级错误？

带着这些痛点，我们才走向下一节——打造一套类型化、自动化、统一管理的主题体系。

---

## 1. 目标：为什么要这么折腾？

1. **告别硬编码**：以前的 SCSS 变量写死在文件里，换主题得全局搜一遍。现在把基础设计变量全部放进 TypeScript，让 IDE 帮我们补全并提示错误。
2. **统一管理**：一份预设数据 + 一套生成脚本，就能衍生出所有模式（Light / Dark）与项目自定义主题，不再担心某个文件忘记更新。
3. **类型安全**：Token 名称、CSS 变量名、DOM 属性统统“有类型”，手残都打不出错误的变量名。
4. **扩展友好**：未来要加新主题、变更 Token、添加动态变换逻辑（transform）都很容易，只改一处即可触发全链路联动。

---

## 2. 数据源：主题预设（`src/theme/tokens.ts`）

最核心的就是定义好“主题预设”：

```ts
// src/theme/tokens.ts
import type { SeedToken } from 'antd/es/theme/interface';

type TRequiredSeedTokenKeys = 'colorPrimary' | 'colorInfo';
type TThemeAppearance = 'light' | 'dark';

type TThemeSeedOverrides = Pick<SeedToken, TRequiredSeedTokenKeys> &
  Partial<SeedToken>;

export interface IThemePreset<K extends string = string> {
  key: K;
  name: string;
  description: string;
  colors: Record<TThemeAppearance, string>;
  token: Record<TThemeAppearance, TThemeSeedOverrides>;
}

const createThemePreset = <K extends string>(preset: IThemePreset<K>) => preset;

export const THEME_PRESETS = [
  createThemePreset({
    key: 'shadcn',
    name: 'Shadcn',
    description: 'Shadcn 主题',
    colors: {
      light: 'oklch(12.9% 0.042 264.695)',
      dark: 'oklch(78% 0.042 264.695)',
    },
    token: {
      light: {
        colorPrimary: 'oklch(12.9% 0.042 264.695)',
        colorInfo: 'oklch(12.9% 0.042 264.695)',
      },
      dark: {
        colorPrimary: 'oklch(78% 0.042 264.695)',
        colorInfo: 'oklch(78% 0.042 264.695)',
      },
    },
  }),
  createThemePreset({
    key: 'purple',
    name: '酱紫 Purple',
    description: '艺术设计、创意类项目',
    colors: {
      light: '#722ed1',
      dark: '#9b6df0',
    },
    token: {
      light: {
        colorPrimary: '#722ed1',
        colorInfo: '#722ed1',
      },
      dark: {
        colorPrimary: '#9b6df0',
        colorInfo: '#9b6df0',
      },
    },
  }),
] as const;

export type TThemeKey = (typeof THEME_PRESETS)[number]['key'];
```

然后我们把它整理成一个 Map，方便查找：

```ts
export const THEME_MAP = THEME_PRESETS.reduce((acc, preset) => {
  acc[preset.key] = preset;
  return acc;
}, {} as Record<TThemeKey, IThemePreset>);

// 使用示例
const selected = useAppStore((state) => state.themeKey);
const themePreset = THEME_MAP[selected];
```

- `colors.light / colors.dark` 提供主题面板展示色，切换模式时色块同步更新；
- `token[light] / token[dark]` 喂给 Ant Design 生成完整 MapToken，保障组件主色一致；
- 如果只配置了 light，生成脚本会自动退回该值作为所有模式的默认。

**好处**：新增主题时有范可循，缺字段直接在编译阶段报错。

---

## 3. CSS 变量映射（`src/theme/cssVariables.ts`）

这个文件是整个改造的核心，做了几件事：

1. **定义常量**：  
   ```ts
   // src/theme/cssVariables.ts
   export const THEME_ATTRIBUTE = 'data-theme-key';
   export const THEME_MODE_ATTRIBUTE = 'data-theme-mode';
   export const THEME_MODES = ['light', 'dark'] as const;
   export type TThemeDomMode = (typeof THEME_MODES)[number];
   ```
   页面和脚本都用同一个常量，不怕手写拼错。

2. **分组列出所有要生成的 CSS 变量**：  
   ```ts
   const COLOR_VARS = defineCssVars(
     [
       { name: '--app-color-primary', token: 'colorPrimary', description: '主色' },
       { name: '--app-color-link', token: 'colorLink', description: '链接色' },
       { name: '--app-color-text', token: 'colorText', description: '文本色' },
     ] as const,
   );

   const BACKGROUND_VARS = defineCssVars(
     [
       { name: '--app-bg-layout', token: 'colorBgLayout', description: '布局背景色' },
       { name: '--app-color-fill', token: 'colorFill', description: '填充色' },
     ] as const,
   );

   export const CSS_VARIABLE_TOKEN_MAPPINGS = [
     ...COLOR_VARS,
     ...BACKGROUND_VARS,
   ] as const;
   ```
   `defineCssVars` + `as const` + `satisfies` 保留了变量名、映射 token 的字面量信息，后面 TypeScript 就能推导出 `TCssVarName`。

3. **静态变量同样类型化**：  
   ```ts
   export const STATIC_CSS_VARIABLES = defineStaticVars([
     { name: '--app-layout-header-height', value: '64px', description: '头部高度' },
     // ...
   ]);
   export type TStaticCssVarName = (typeof STATIC_CSS_VARIABLES)[number]['name'];
   ```
   这些变量不随主题变化，但我们让它们也有注释、有类型。

4. **辅助函数**：  
   `buildThemeSelector(presetKey, mode)` 可以返回 `:root[data-theme-key='purple'][data-theme-mode='dark']`，脚本直接拿来用。

**好处**：
- 任何地方需要 `--app-color-primary` 都能自动补全；
- 新增变量时顺手填 `description`，生成的 CSS 会带上注释，便于 DevTools 快速了解用途；
- 静态变量和动态变量全部集中管理，真正做到“一本账”。
- 生成出来的 CSS 样子也更清晰，例如：
  ```css
  :root[data-theme-key='purple'][data-theme-mode='light'] {
    /* 主色 */
    --app-color-primary: #722ed1;
    --app-color-link: #722ed1;
    /* 布局背景色 */
    --app-bg-layout: #f5f5f5;
  }
  ```

---

## 4. 运行时代码（`src/utils/theme.ts` & `src/App.tsx`）

### `src/utils/theme.ts`

- `resolveThemeMode(themeMode, systemPrefersDark)`：把 store 里的 “light / dark / system” 转成真正的 `light` 或 `dark`。
  ```ts
  export const resolveThemeMode = (
    mode: TThemeMode,
    systemPrefersDark: boolean,
  ): TResolvedThemeMode => {
    if (mode === 'dark') return 'dark';
    if (mode === 'light') return 'light';
    return systemPrefersDark ? 'dark' : 'light';
  };
  ```
- `ThemeDom.apply(root, key, mode)`：往 `<html>`（我们用 document.documentElement）写入 `data-theme-key` 和 `data-theme-mode`；`clear` 用来卸载时清理。
  ```ts
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
  ```
- `getCssVar(name, fallback)`：  
  ```ts
  export const getCssVar = <TName extends TCssVarName | TStaticCssVarName>(
    name: TName,
    fallback = '',
  ): string => {
    if (typeof document === 'undefined') return fallback;
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(name)
      .trim();
    return value.length > 0 ? value : fallback;
  };
  ```
  - 支持类型联合 `TCssVarName | TStaticCssVarName`；  
  - 使用 `getComputedStyle` 拿最终样式；  
  - 没有值就返回 `fallback`。

### `src/App.tsx`

- 读取 store 中的主题 key / 模式，配合 `resolveThemeMode` 算出最终模式；
- 通过 `useEffect` 调用 `ThemeDom.apply`，DOM 与 store 始终保持同步：
  ```tsx
  const resolvedMode = resolveThemeMode(themeMode, systemPrefersDark);

  useEffect(() => {
    setResolvedThemeMode(resolvedMode);
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    ThemeDom.apply(root, themePreset.key, resolvedMode);
    return () => ThemeDom.clear(root);
  }, [resolvedMode, themePreset.key, setResolvedThemeMode]);
  ```
- `ConfigProvider` 使用主题预设中的 token，Ant Design 组件自动跟着换色：
  ```tsx
  <ConfigProvider
    theme={{
      algorithm: resolvedMode === 'dark' ? darkAlgorithm : defaultAlgorithm,
      token: {
        colorPrimary: themePreset.token[resolvedMode].colorPrimary,
        colorInfo: themePreset.token[resolvedMode].colorInfo,
      },
    }}
  >
    <AntdApp>{/* ... */}</AntdApp>
  </ConfigProvider>
  ```
- 主题设置面板可以使用 `preset.colors[resolvedMode]` 作为预览色块：
  ```tsx
  const swatch = themePreset.colors[resolvedMode] ?? themePreset.colors.light;
  <span style={{ background: swatch }} className={styles['theme-swatch']} />
  ```
- `ThemeDom.clear` 确保热更新或卸载时不会留下陈旧属性。

**好处**：主题切换的状态流转完全可控，既更新 UI，又更新 DOM 属性，CSS 变量自然生效。

---

## 5. 生成脚本（`scripts/generate-css-variables.ts`）

核心逻辑非常集中，可以用这段代码概括：

```ts
const formatThemeBlocks = (): string => {
  const blocks: string[] = [];

  for (const mode of THEME_MODES) {
    const algorithm = ALGORITHMS[mode];
    for (const preset of THEME_PRESETS) {
      const seedOverrides =
        preset.token[mode] ?? preset.token.light ?? preset.token.dark;
      const seed = { ...defaultSeed, ...seedOverrides };
      const mapToken = algorithm(seed);

      const declarations = CSS_VARIABLE_TOKEN_MAPPINGS.map(({ name, token, description }) => {
        const rawValue = mapToken[token];
        const comment = description ? `${INDENT}/* ${description} */\n` : '';
        return `${comment}${INDENT}${name}: ${String(rawValue)};`;
      });

      const selector = buildThemeSelector(preset.key, mode);
      blocks.push(`${selector} {\n${declarations.join('\n')}\n}`);
    }
  }

  return blocks.join('\n\n');
};
```

执行 `npm run generate:css-vars` 后，就会得到包含所有主题/模式变量的 `src/styles/generated/theme-variables.css`，暗色模式也会使用你在预设里定义的专属主色。

- 如果某个主题没有提供特定模式的 seed，脚本会依次回退到 `light` 或 `dark` 的配置，避免生成空值。

**好处**：
- 任何变量增加/删除只动这一个 TypeScript 文件；
- 生成文件带注释，方便排查；
- 有重复变量名会直接抛错，避免覆盖。

---

## 6. 样式引用（`src/styles/global.scss` 等）

- 统一使用 `var(--app-xxx)` 提取主题色；
- 通过 `npm run generate:css-vars` 产生的 CSS 被 `src/main.tsx` 引入；
- 页面结构中的具体样式（如 `AdminLayout.module.scss`）只负责消费这些变量，不关心它们如何生成。

```scss
/* src/styles/global.scss */
:root {
  --layout-bg: var(--app-color-bg-layout);
  --text-color: var(--app-color-text);
  --card-border-color: var(--app-color-border-secondary);
}

[data-theme-mode='dark'] {
  color-scheme: dark;
}
```

```scss
/* src/layouts/AdminLayout.module.scss */
.admin-layout__theme-option {
  background: var(--card-bg);
  border: 1px solid var(--card-border-color);
  &:hover {
    border-color: color-mix(in srgb, var(--app-color-primary) 40%, transparent);
  }
}
```

**好处**：把“主题”这件事变成模块化的基础设施，新增页面只管引用变量，实现风格统一与换肤自如。

---

## 7. 常见操作流程

1. **新增主题**
   - 在 `THEME_PRESETS` 里加一项，同时补全 `colors.light/dark` 与 `token.light/dark`；
   - `npm run generate:css-vars` → 得到新主题下的 CSS 变量；
   - 重启/刷新即可使用。

2. **新增 CSS 变量**
   - 在 `cssVariables.ts` 对应分组里补一行；
   - 需要的话在组件/样式中引用这个新变量；
   - 跑生成脚本即可。

3. **读取变量值**
   ```ts
   import { getCssVar } from '@/utils/theme';

   const primary = getCssVar('--app-color-primary', '#1677ff');
   const headerHeight = getCssVar('--app-layout-header-height', '64px');
   ```
   - 如果变量不存在会返回你传入的默认值。

---

## 8. 这套流水线的好处总结

- **统一入口**：所有主题数据和变量都在 `src/theme` 下维护，清晰可控。
- **类型守护**：`TThemeKey`、`TCssVarName`、`TStaticCssVarName` 等类型让 TS 帮你防止拼写错误。
- **自动生成**：脚本帮你把 Antd Token 转成 CSS 变量，不需要手动写多份颜色/布局参数。
- **扩展简单**：未来要实现 transform、modeScope 或更多模式，只要在映射里新增字段，脚本就能处理。
- **易于协作**：有了注释、分组、文档，后续同事加入项目也能快速理解主线。

---

## 9. 推荐的命令清单

| 命令 | 作用 |
| ---- | ---- |
| `npm run generate:css-vars` | 根据预设生成最新 CSS 变量 |
| `npm run build` | 构建项目，顺带验证类型和主题流程是否正常 |
| `npm run dev` | 开发模式，浏览器里实时查看主题效果 |

建议在修改主题相关逻辑后，至少执行一次 `generate:css-vars` + `build`，确保链路完整无误。

---

## 10. 接下来还可以做什么？

- 编写简单的 lint 脚本，检测样式文件里使用的 `var(--xxx)` 是否都存在于类型定义中；
- 补充 transform / modeScope（之前预留的字段）以支持特殊处理，如暗色模式下再加一层透明度；
- 把 THEME_PRESETS 和 CSS 变量映射拆成更细的模块，编写 Storybook 文档展示主题效果。

只要按照上面的流程维护，你就拥有了一套健壮、可扩展、可协作的主题解决方案。祝玩得开心！
