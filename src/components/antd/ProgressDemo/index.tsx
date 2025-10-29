import React from 'react';
import { Progress, Space } from 'antd';

function ProgressDemo() {
  return (
    <Space size="large">
      <Progress type="circle" percent={75} />
      <Progress percent={50} status="active" />
      <Progress percent={100} status="success" />
    </Space>
  );
}

export default ProgressDemo;
