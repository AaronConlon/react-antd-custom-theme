import React from 'react';
import { Tooltip, Button } from 'antd';

function TooltipDemo() {
  return (
    <Tooltip title="提示信息">
      <Button>悬浮提示</Button>
    </Tooltip>
  );
}

export default TooltipDemo;
