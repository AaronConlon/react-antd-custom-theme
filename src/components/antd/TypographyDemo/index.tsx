import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

function TypographyDemo() {
  return (
    <Typography>
      <Title level={3}>排版</Title>
      <Paragraph>
        Ant Design 提供了一套优雅、整洁和现代化的文字排版系统，帮助你快速搭建页面。
      </Paragraph>
      <Paragraph>
        <Text type="secondary">辅助文字</Text>
      </Paragraph>
      <Paragraph>
        <Text mark>标记文字</Text> <Text code>code</Text> <Text keyboard>⌘ + K</Text>
      </Paragraph>
      <Paragraph>
        <Link href="https://ant.design" target="_blank">
          前往官网了解更多
        </Link>
      </Paragraph>
    </Typography>
  );
}

export default TypographyDemo;
