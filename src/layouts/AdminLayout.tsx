import useAppStore from "@/store/useAppStore";
import { THEME_PRESETS } from "@/theme/tokens";
import {
  CheckOutlined,
  DesktopOutlined,
  ExperimentOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoonOutlined,
  SettingOutlined,
  SunOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps, SegmentedProps } from "antd";
import {
  Avatar,
  Button,
  Drawer,
  Dropdown,
  Layout,
  Menu,
  Segmented,
  Space,
  theme as antdTheme,
} from "antd";
import type { SegmentedValue } from "antd/es/segmented";
import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./AdminLayout.module.scss";

const { Header, Sider, Content } = Layout;

const menuItems: MenuProps["items"] = [
  {
    key: "/",
    icon: <HomeOutlined />,
    label: "首页",
  },
  {
    key: "/test",
    icon: <ExperimentOutlined />,
    label: "测试页",
  },
];

const avatarMenuItems: MenuProps["items"] = [
  {
    key: "profile",
    label: "个人中心",
  },
  {
    key: "logout",
    label: "退出登录",
  },
];

const themeModeOptions: SegmentedProps["options"] = [
  {
    label: (
      <span className={styles["admin-layout__mode-label"]}>
        <MoonOutlined />
        <span>Dark</span>
      </span>
    ),
    value: "dark",
  },
  {
    label: (
      <span className={styles["admin-layout__mode-label"]}>
        <SunOutlined />
        <span>Light</span>
      </span>
    ),
    value: "light",
  },
  {
    label: (
      <span className={styles["admin-layout__mode-label"]}>
        <DesktopOutlined />
        <span>System</span>
      </span>
    ),
    value: "system",
  },
];

function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const collapsed = useAppStore((state) => state.collapsed);
  const toggleCollapsed = useAppStore((state) => state.toggleCollapsed);
  const settingsOpen = useAppStore((state) => state.settingsOpen);
  const openSettings = useAppStore((state) => state.openSettings);
  const closeSettings = useAppStore((state) => state.closeSettings);
  const themeKey = useAppStore((state) => state.themeKey);
  const setThemeKey = useAppStore((state) => state.setThemeKey);
  const themeMode = useAppStore((state) => state.themeMode);
  const resolvedThemeMode = useAppStore((state) => state.resolvedThemeMode);
  const setThemeMode = useAppStore((state) => state.setThemeMode);
  const {
    token: { colorBgContainer, colorPrimary },
  } = antdTheme.useToken();
  const menuTheme: "light" | "dark" =
    resolvedThemeMode === "dark" ? "dark" : "light";

  return (
    <Layout className={styles["admin-layout"]}>
      <Header
        className={styles["admin-layout__header"]}
        style={{ background: colorBgContainer }}
      >
        <div className={styles["admin-layout__header-left"]}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapsed}
            className={styles["admin-layout__trigger"]}
          />
          <span className={styles["admin-layout__logo"]}>React Antd Admin</span>
        </div>
        <div className={styles["admin-layout__header-right"]}>
          <Segmented
            options={themeModeOptions}
            value={themeMode}
            onChange={(value: SegmentedValue) => {
              if (typeof value === "string") {
                setThemeMode(value);
              }
            }}
            className={styles["admin-layout__mode-switch"]}
          />
          <Button
            type="text"
            icon={<SettingOutlined />}
            onClick={openSettings}
          />
          <Dropdown menu={{ items: avatarMenuItems }} trigger={["click"]}>
            <Avatar style={{ cursor: "pointer" }} icon={<UserOutlined />} />
          </Dropdown>
        </div>
      </Header>
      <Layout className={styles["admin-layout__body"]}>
        <Sider
          width={220}
          collapsible
          collapsed={collapsed}
          trigger={null}
          theme={menuTheme}
          className={styles["admin-layout__sider"]}
        >
          <Menu
            theme={menuTheme}
            selectedKeys={[location.pathname]}
            mode="inline"
            items={menuItems}
            onClick={({ key }) => navigate(String(key))}
          />
        </Sider>
        <Content
          className={styles["admin-layout__content"]}
          style={{ background: colorBgContainer }}
        >
          <Outlet />
        </Content>
      </Layout>
      <Drawer
        title="主题设置"
        placement="right"
        width={320}
        onClose={closeSettings}
        open={settingsOpen}
      >
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          {THEME_PRESETS.map((preset) => {
            const isActive = preset.key === themeKey;
            const swatchColor =
              preset.colors[resolvedThemeMode] ?? preset.colors.light;
            return (
              <div
                key={preset.key}
                style={{
                  borderColor: swatchColor,
                }}
                className={[styles["admin-layout__theme-option"]]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => setThemeKey(preset.key)}
                role="button"
                tabIndex={0}
                onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
                  if (event.key === "Enter" || event.key === " ") {
                    setThemeKey(preset.key);
                  }
                }}
              >
                <Space size="middle" align="center">
                  <span
                    className={styles["admin-layout__theme-swatch"]}
                    style={{ background: swatchColor }}
                  />
                  <div className={styles["admin-layout__theme-text"]}>
                    <div className={styles["admin-layout__theme-name"]}>
                      {preset.name}
                    </div>
                    <div className={styles["admin-layout__theme-desc"]}>
                      {preset.description}
                    </div>
                  </div>
                </Space>
                {isActive ? (
                  <CheckOutlined
                    className={styles["admin-layout__theme-check"]}
                  />
                ) : null}
              </div>
            );
          })}
        </Space>
      </Drawer>
    </Layout>
  );
}

export default AdminLayout;
