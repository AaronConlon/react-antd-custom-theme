import React from 'react';
import { Result, Button } from 'antd';

function ResultDemo() {
  return (
    <Result
      status="success"
      title="操作成功"
      subTitle="预计 2 秒后自动跳转"
      extra={[<Button type="primary" key="again">再来一次</Button>]}
    />
  );
}

export default ResultDemo;
