import React from 'react';
import { Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';

function AvatarDemo() {
  return (
    <Space size="large">
      <Avatar icon={<UserOutlined />} />
      <Avatar shape="square" size="large">U</Avatar>
      <Avatar src="https://avatars.githubusercontent.com/u/810438?v=4" />
    </Space>
  );
}

export default AvatarDemo;
