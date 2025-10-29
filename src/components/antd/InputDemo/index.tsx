import React from 'react';
import { Input, Space } from 'antd';

const { Search, TextArea } = Input;
const Password = Input.Password;

function InputDemo() {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Input placeholder="基本输入框" />
      <Password placeholder="密码输入框" />
      <Search placeholder="搜索" enterButton />
      <TextArea rows={3} placeholder="多行输入" />
    </Space>
  );
}

export default InputDemo;
