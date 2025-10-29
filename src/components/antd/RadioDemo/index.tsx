import React, { useState } from 'react';
import { Radio, Space } from 'antd';

function RadioDemo() {
  const [value, setValue] = useState('A');

  return (
    <Space direction="vertical">
      <Radio.Group value={value} onChange={(e) => setValue(e.target.value)}>
        <Radio value="A">选项 A</Radio>
        <Radio value="B">选项 B</Radio>
        <Radio value="C">选项 C</Radio>
      </Radio.Group>
      <div>当前选择：{value}</div>
    </Space>
  );
}

export default RadioDemo;
