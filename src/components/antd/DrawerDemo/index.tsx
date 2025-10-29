import React, { useState } from 'react';
import { Drawer, Button, Space } from 'antd';

function DrawerDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Space>
        <Button type="primary" onClick={() => setOpen(true)}>
          打开抽屉
        </Button>
      </Space>
      <Drawer
        title="基础抽屉"
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
      >
        抽屉内容可以放置表单、列表等组件。
      </Drawer>
    </>
  );
}

export default DrawerDemo;
