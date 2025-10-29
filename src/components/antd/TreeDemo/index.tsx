import React, { useState } from 'react';
import { Tree } from 'antd';

const treeData = [
  {
    title: '父节点 1',
    key: '0-0',
    children: [
      {
        title: '子节点 1-0',
        key: '0-0-0',
        children: [
          { title: '叶子节点 1-0-0', key: '0-0-0-0' },
          { title: '叶子节点 1-0-1', key: '0-0-0-1' },
        ],
      },
      {
        title: '子节点 1-1',
        key: '0-0-1',
        children: [
          { title: '叶子节点 1-1-0', key: '0-0-1-0' },
        ],
      },
    ],
  },
];

function TreeDemo() {
  const [expandedKeys, setExpandedKeys] = useState(['0-0']);

  return (
    <Tree
      treeData={treeData}
      expandedKeys={expandedKeys}
      onExpand={setExpandedKeys}
      checkable
      defaultCheckedKeys={['0-0-0']}
    />
  );
}

export default TreeDemo;
