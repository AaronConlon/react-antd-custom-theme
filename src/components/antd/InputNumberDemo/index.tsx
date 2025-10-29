import React, { useState } from 'react';
import { InputNumber } from 'antd';

function InputNumberDemo() {
  const [value, setValue] = useState(3);

  return (
    <InputNumber min={1} max={10} value={value} onChange={setValue} />
  );
}

export default InputNumberDemo;
