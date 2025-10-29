import React, { useState } from 'react';
import { Slider } from 'antd';

function SliderDemo() {
  const [value, setValue] = useState(30);

  return <Slider value={value} onChange={setValue} />;
}

export default SliderDemo;
