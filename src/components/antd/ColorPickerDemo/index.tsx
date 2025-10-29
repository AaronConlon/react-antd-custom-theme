import React, { useState } from 'react';
import { ColorPicker } from 'antd';

function ColorPickerDemo() {
  const [color, setColor] = useState('#1677ff');

  return <ColorPicker value={color} onChange={(_, hex) => setColor(hex)} />;
}

export default ColorPickerDemo;
