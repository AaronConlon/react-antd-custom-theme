import React, { useState } from 'react';
import { Rate } from 'antd';

function RateDemo() {
  const [value, setValue] = useState(3);

  return <Rate value={value} onChange={setValue} allowHalf />;
}

export default RateDemo;
