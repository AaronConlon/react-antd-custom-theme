import React from 'react';
import { Flex, Card } from 'antd';

function FlexDemo() {
  return (
    <Flex gap="small" wrap="wrap">
      {[1, 2, 3].map((item) => (
        <Card key={item} size="small" title={`区块 ${item}`} style={{ width: 120 }}>
          Flex 布局
        </Card>
      ))}
    </Flex>
  );
}

export default FlexDemo;
