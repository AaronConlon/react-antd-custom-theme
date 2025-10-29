import React from 'react';
import { Breadcrumb } from 'antd';

function BreadcrumbDemo() {
  return (
    <Breadcrumb
      items={[
        { title: '首页' },
        { title: '列表页' },
        { title: <span>详情页</span> },
      ]}
    />
  );
}

export default BreadcrumbDemo;
