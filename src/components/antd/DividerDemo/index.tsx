import React from 'react';
import { Divider } from 'antd';

function DividerDemo() {
  return (
    <div>
      <div>内容块 1</div>
      <Divider orientation="left">分割线</Divider>
      <div>内容块 2</div>
      <Divider dashed />
      <div>内容块 3</div>
    </div>
  );
}

export default DividerDemo;
