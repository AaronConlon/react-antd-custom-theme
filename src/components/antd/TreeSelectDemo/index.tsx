import React, { useState } from 'react';
import { TreeSelect } from 'antd';

const treeData = [
  {
    title: '节点 1',
    value: '0-0',
    children: [
      {
        title: '子节点 1',
        value: '0-0-0',
      },
      {
        title: '子节点 2',
        value: '0-0-1',
      },
    ],
  },
];

function TreeSelectDemo() {
  const [value, setValue] = useState<string | undefined>();

  return (
    <TreeSelect
      style={{ width: 240 }}
      value={value}
      dropdownStyle={{ maxHeight: 240, overflow: 'auto' }}
      treeData={treeData}
      placeholder="请选择"
      treeDefaultExpandAll
      onChange={setValue}
    />
  );
}

export default TreeSelectDemo;
