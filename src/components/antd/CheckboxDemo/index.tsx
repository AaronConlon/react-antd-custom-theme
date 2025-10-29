import React, { useState } from 'react';
import { Checkbox, Space } from 'antd';

const plainOptions = ['Apple', 'Pear', 'Orange'];

function CheckboxDemo() {
  const [checkedList, setCheckedList] = useState(['Apple']);

  return (
    <Space direction="vertical">
      <Checkbox.Group options={plainOptions} value={checkedList} onChange={setCheckedList} />
      <div>已选择：{checkedList.join('、') || '无'}</div>
    </Space>
  );
}

export default CheckboxDemo;
