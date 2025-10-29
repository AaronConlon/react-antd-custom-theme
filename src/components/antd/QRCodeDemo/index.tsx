import React from 'react';
import { QRCode, Space, Input } from 'antd';

function QRCodeDemo() {
  const [text, setText] = React.useState('https://ant.design');

  return (
    <Space direction="vertical">
      <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="输入二维码内容" />
      <QRCode value={text || ' '} />
    </Space>
  );
}

export default QRCodeDemo;
