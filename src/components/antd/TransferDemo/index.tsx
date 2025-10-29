import React, { useState } from 'react';
import { Transfer } from 'antd';

const mockData = Array.from({ length: 10 }).map((_, i) => ({
  key: i.toString(),
  title: `内容 ${i + 1}`,
  description: `描述 ${i + 1}`,
}));

function TransferDemo() {
  const [targetKeys, setTargetKeys] = useState(['1', '4']);

  return (
    <Transfer
      dataSource={mockData}
      titles={['待选', '已选']}
      targetKeys={targetKeys}
      onChange={setTargetKeys}
      render={(item) => item.title}
    />
  );
}

export default TransferDemo;
