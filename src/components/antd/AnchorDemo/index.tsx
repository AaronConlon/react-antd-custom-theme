import React from 'react';
import { Anchor, Typography } from 'antd';

const items = [
  {
    key: 'part-1',
    href: '#anchor-part-1',
    title: '章节 1',
  },
  {
    key: 'part-2',
    href: '#anchor-part-2',
    title: '章节 2',
  },
];

function AnchorDemo() {
  return (
    <div>
      <Anchor direction="horizontal" items={items} />
      <Typography.Paragraph id="anchor-part-1" style={{ marginTop: 16 }}>
        章节 1 内容
      </Typography.Paragraph>
      <Typography.Paragraph id="anchor-part-2" style={{ marginTop: 32 }}>
        章节 2 内容
      </Typography.Paragraph>
    </div>
  );
}

export default AnchorDemo;
