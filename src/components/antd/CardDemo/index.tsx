import React from 'react';
import { Card } from 'antd';

function CardDemo() {
  return (
    <Card
      title="卡片标题"
      extra={<a href="https://ant.design" target="_blank" rel="noreferrer">更多</a>}
      style={{ width: 300 }}
    >
      这里是卡片内容。通过 Card 可以搭建模块化的信息展示。
    </Card>
  );
}

export default CardDemo;
