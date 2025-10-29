import React from 'react';
import { Space, Button, Switch } from 'antd';

function SpaceDemo() {
  return (
    <Space size="middle" align="center">
      <Button type="primary">操作 A</Button>
      <Button>操作 B</Button>
      <Switch defaultChecked />
    </Space>
  );
}

export default SpaceDemo;
