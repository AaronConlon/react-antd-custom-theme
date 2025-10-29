import React from 'react';
import { Tabs } from 'antd';

const items = [
  { key: '1', label: '选项卡一', children: '内容一' },
  { key: '2', label: '选项卡二', children: '内容二' },
  { key: '3', label: '选项卡三', children: '内容三' },
];

function TabsDemo() {
  return <Tabs defaultActiveKey="1" items={items} />;
}

export default TabsDemo;
