import React from 'react';
import { Badge, Space, Avatar } from 'antd';
import { BellOutlined, UserOutlined } from '@ant-design/icons';

function BadgeDemo() {
  return (
    <Space size="large">
      <Badge count={5}>
        <Avatar shape="square" size="large" icon={<UserOutlined />} />
      </Badge>
      <Badge dot>
        <BellOutlined style={{ fontSize: 20 }} />
      </Badge>
      <Badge status="processing" text="处理中" />
    </Space>
  );
}

export default BadgeDemo;
