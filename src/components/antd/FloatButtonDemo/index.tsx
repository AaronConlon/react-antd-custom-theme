import React from 'react';
import { FloatButton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function FloatButtonDemo() {
  return <FloatButton icon={<PlusOutlined />} tooltip="快捷操作" />;
}

export default FloatButtonDemo;
