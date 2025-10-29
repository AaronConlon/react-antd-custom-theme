import React from 'react';
import { Tag } from 'antd';

function TagDemo() {
  return (
    <div>
      <Tag color="success">成功</Tag>
      <Tag color="processing">处理中</Tag>
      <Tag color="warning">警告</Tag>
      <Tag color="error">错误</Tag>
    </div>
  );
}

export default TagDemo;
