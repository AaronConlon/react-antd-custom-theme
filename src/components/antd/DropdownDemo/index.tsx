import React from 'react';
import { Button, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const items = [
  {
    key: '1',
    label: '菜单一',
  },
  {
    key: '2',
    label: '菜单二',
  },
  {
    key: '3',
    danger: true,
    label: '禁用项',
    disabled: true,
  },
];

function DropdownDemo() {
  return (
    <Dropdown menu={{ items }}>
      <Button>
        下拉菜单 <DownOutlined />
      </Button>
    </Dropdown>
  );
}

export default DropdownDemo;
