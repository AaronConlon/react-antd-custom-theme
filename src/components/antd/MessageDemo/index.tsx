import React from 'react';
import { Button, message, Space } from 'antd';

function MessageDemo() {
  const handleClick = (type) => {
    message[type](`这是一条 ${type} 提示`);
  };

  return (
    <Space>
      <Button onClick={() => handleClick('info')}>信息</Button>
      <Button onClick={() => handleClick('success')}>成功</Button>
      <Button danger onClick={() => handleClick('error')}>
        错误
      </Button>
    </Space>
  );
}

export default MessageDemo;
