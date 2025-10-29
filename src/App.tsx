import AdminLayout from "@/layouts/AdminLayout";
import HomePage from "@/pages/Home";
import TestPage from "@/pages/Test";
import useAppStore from "@/store/useAppStore";
import { THEME_MAP, THEME_PRESETS } from "@/theme/tokens";
import { App as AntdApp, theme as antdTheme, ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { resolveThemeMode, ThemeDom } from "./utils/theme";
const { defaultAlgorithm, darkAlgorithm } = antdTheme;

function App() {
  const themeKey = useAppStore((state) => state.themeKey);
  const themeMode = useAppStore((state) => state.themeMode);
  const themePreset = THEME_MAP[themeKey] ?? THEME_PRESETS[0];
  const setResolvedThemeMode = useAppStore(
    (state) => state.setResolvedThemeMode
  );

  const [systemPrefersDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const resolvedMode = resolveThemeMode(themeMode, systemPrefersDark);
  const isDarkMode = resolvedMode === "dark";

  useEffect(() => {
    // 设置 resolvedThemeMode
    setResolvedThemeMode(resolvedMode);

    if (typeof document === "undefined") {
      return;
    }
    const root = document.documentElement;
    ThemeDom.apply(root, themePreset.key, resolvedMode);

    // 清理
    return () => ThemeDom.clear(root);
  }, [resolvedMode, setResolvedThemeMode, themePreset.key]);

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        token: {
          borderRadius: 8,
          colorPrimary: themePreset.token[resolvedMode].colorPrimary,
          colorInfo: themePreset.token[resolvedMode].colorInfo,
        },
        // components: {
        //   Menu: {
        //     itemSelectedColor: "#ffffff",
        //   },
        // },
      }}
    >
      <AntdApp>
        <Routes>
          <Route element={<AdminLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/test" element={<TestPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
