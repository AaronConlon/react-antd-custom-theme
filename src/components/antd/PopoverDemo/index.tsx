import React from 'react';
import { Button, Popover } from 'antd';

function PopoverDemo() {
  return (
    <Popover content={<span>更多操作内容</span>} title="气泡卡片" trigger="hover">
      <Button>悬浮查看</Button>
    </Popover>
  );
}

export default PopoverDemo;
