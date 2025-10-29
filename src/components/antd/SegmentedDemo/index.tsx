import React, { useState } from 'react';
import { Segmented } from 'antd';

function SegmentedDemo() {
  const [value, setValue] = useState('日');

  return <Segmented options={['日', '周', '月']} value={value} onChange={setValue} />;
}

export default SegmentedDemo;
