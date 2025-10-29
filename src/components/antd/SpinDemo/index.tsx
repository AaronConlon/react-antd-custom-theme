import React from 'react';
import { Spin, Alert } from 'antd';

function SpinDemo() {
  return (
    <Spin tip="加载中...">
      <Alert
        message="异步请求"
        description="结合 Spin 可以模拟加载状态。"
        type="info"
      />
    </Spin>
  );
}

export default SpinDemo;
