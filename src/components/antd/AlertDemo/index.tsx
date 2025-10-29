import React from 'react';
import { Alert, Space } from 'antd';

function AlertDemo() {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Alert message="成功提示" type="success" showIcon />
      <Alert message="信息提示" description="额外的信息描述" type="info" showIcon />
      <Alert message="警告提示" type="warning" showIcon />
      <Alert message="错误提示" type="error" showIcon closable />
    </Space>
  );
}

export default AlertDemo;
