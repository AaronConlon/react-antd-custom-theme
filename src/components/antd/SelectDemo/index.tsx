import React, { useState } from 'react';
import { Select } from 'antd';

const options = [
  { value: 'apple', label: '苹果' },
  { value: 'pear', label: '梨子' },
  { value: 'orange', label: '橙子' },
];

function SelectDemo() {
  const [value, setValue] = useState('apple');

  return (
    <Select
      style={{ width: 200 }}
      value={value}
      onChange={setValue}
      options={options}
      placeholder="选择水果"
    />
  );
}

export default SelectDemo;
