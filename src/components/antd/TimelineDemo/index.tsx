import React from 'react';
import { Timeline } from 'antd';

function TimelineDemo() {
  return (
    <Timeline
      items={[
        { color: 'green', children: '创建项目' },
        { color: 'blue', children: '功能开发' },
        { color: 'red', children: '问题修复' },
        { color: 'gray', children: '发布上线' },
      ]}
    />
  );
}

export default TimelineDemo;
