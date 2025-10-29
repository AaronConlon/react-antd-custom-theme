import React from 'react';
import { Button, Space } from 'antd';

function ButtonDemo() {
  return (
    <Space wrap>
      <Button type="primary">主按钮</Button>
      <Button>默认按钮</Button>
      <Button type="dashed">虚线按钮</Button>
      <Button type="text">文字按钮</Button>
      <Button type="link">链接按钮</Button>
      <Button danger>危险按钮</Button>
    </Space>
  );
}

export default ButtonDemo;
