import React from 'react';
import { Collapse } from 'antd';

const items = [
  {
    key: '1',
    label: '面板 1',
    children: <p>这是第一个面板内容。</p>,
  },
  {
    key: '2',
    label: '面板 2',
    children: <p>这是第二个面板内容。</p>,
  },
];

function CollapseDemo() {
  return <Collapse items={items} defaultActiveKey={['1']} />;
}

export default CollapseDemo;
