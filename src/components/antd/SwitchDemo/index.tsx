import React, { useState } from 'react';
import { Switch } from 'antd';

function SwitchDemo() {
  const [checked, setChecked] = useState(true);

  return <Switch checked={checked} onChange={setChecked} checkedChildren="开" unCheckedChildren="关" />;
}

export default SwitchDemo;
