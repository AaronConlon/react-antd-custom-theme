import { theme as antdTheme } from "antd";
import { promises as fs } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  CSS_VARIABLE_TOKEN_MAPPINGS,
  STATIC_CSS_VARIABLES,
  THEME_MODES,
  buildThemeSelector,
} from "../src/theme/cssVariables";
import { THEME_PRESETS } from "../src/theme/tokens";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 输出路径
const OUTPUT_PATH = resolve(
  __dirname,
  "..",
  "src/styles/generated/theme-variables.css"
);
// 缩进
const INDENT = "  ";

// Ant Design Token 算法
const { defaultAlgorithm, darkAlgorithm, defaultSeed } = antdTheme;

const ALGORITHMS = {
  light: defaultAlgorithm,
  dark: darkAlgorithm,
} as const;

async function ensureDirectory(filePath: string): Promise<void> {
  await fs.mkdir(dirname(filePath), { recursive: true });
}

async function writeCssFile(content: string): Promise<void> {
  await ensureDirectory(OUTPUT_PATH);
  await fs.writeFile(OUTPUT_PATH, content, "utf8");
}

const formatStaticBlock = (): string => {
  const declarations = STATIC_CSS_VARIABLES.map(
    ({ name, value, description }) => {
      const comment = description ? `${INDENT}/* ${description} */\n` : "";
      return `${comment}${INDENT}${name}: ${value};`;
    }
  );

  return [":root {", declarations.join("\n"), "}", ""].join("\n");
};

const formatThemeBlocks = (): string => {
  const blocks: string[] = [];

  for (const mode of THEME_MODES) {
    const algorithm = ALGORITHMS[mode];
    if (!algorithm) {
      throw new Error(`No algorithm configured for theme mode "${mode}".`);
    }

    for (const preset of THEME_PRESETS) {
      const seedOverrides =
        preset.token[mode] ?? preset.token.light ?? preset.token.dark;
      const seed = { ...defaultSeed, ...seedOverrides };
      const mapToken = algorithm(seed);

      const declarations = CSS_VARIABLE_TOKEN_MAPPINGS.map(
        ({ name, token, description }) => {
          // 如果 modeScope 存在且不包含当前模式，则跳过

          const rawValue = mapToken[token];
          if (rawValue === undefined) {
            throw new Error(
              `Token "${token}" is undefined for preset "${preset.key}" in mode "${mode}".`
            );
          }
          const comment = description ? `${INDENT}/* ${description} */\n` : "";
          return `${comment}${INDENT}${name}: ${String(rawValue)};`;
        }
      );

      const selector = buildThemeSelector(preset.key, mode);
      blocks.push(`${selector} {\n${declarations.join("\n")}\n}`);
    }
  }

  return blocks.join("\n\n");
};

const validateMappings = (): void => {
  const names = new Set<string>();
  for (const { name } of CSS_VARIABLE_TOKEN_MAPPINGS) {
    if (names.has(name)) {
      throw new Error(`Duplicate CSS variable detected: "${name}".`);
    }
    names.add(name);
  }
};

async function main(): Promise<void> {
  validateMappings();

  const sections = [formatStaticBlock(), formatThemeBlocks()].filter(Boolean);
  const cssContent = `${sections.join("\n")}\n`;

  await writeCssFile(cssContent);
  const relativePath = relative(process.cwd(), OUTPUT_PATH);
  console.log(`Generated CSS variables at ${relativePath}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
