import React from 'react';
import { Descriptions } from 'antd';

function DescriptionsDemo() {
  return (
    <Descriptions title="用户信息" bordered size="small">
      <Descriptions.Item label="姓名">张三</Descriptions.Item>
      <Descriptions.Item label="手机号">13800000000</Descriptions.Item>
      <Descriptions.Item label="所在地">上海</Descriptions.Item>
      <Descriptions.Item label="备注">黄金会员</Descriptions.Item>
    </Descriptions>
  );
}

export default DescriptionsDemo;
