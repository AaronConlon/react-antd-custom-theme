import React from 'react';
import { Steps } from 'antd';

function StepsDemo() {
  return (
    <Steps
      current={1}
      items={[
        { title: '登录' },
        { title: '填写信息' },
        { title: '完成' },
      ]}
    />
  );
}

export default StepsDemo;
