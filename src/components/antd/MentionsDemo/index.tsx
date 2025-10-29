import React from 'react';
import { Mentions } from 'antd';

function MentionsDemo() {
  return (
    <Mentions style={{ width: '100%' }} placeholder="@ 某人">
      <Mentions.Option value="张三">张三</Mentions.Option>
      <Mentions.Option value="李四">李四</Mentions.Option>
      <Mentions.Option value="王五">王五</Mentions.Option>
    </Mentions>
  );
}

export default MentionsDemo;
