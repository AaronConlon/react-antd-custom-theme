import React from 'react';
import { Watermark, Card } from 'antd';

function WatermarkDemo() {
  return (
    <Watermark content="Ant Design">
      <Card>带水印的内容区域</Card>
    </Watermark>
  );
}

export default WatermarkDemo;
