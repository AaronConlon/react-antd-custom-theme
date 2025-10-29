import React from 'react';
import { List, Avatar } from 'antd';

const data = [
  {
    title: '列表项 1',
  },
  {
    title: '列表项 2',
  },
  {
    title: '列表项 3',
  },
];

function ListDemo() {
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />}
            title={item.title}
            description="这里是描述信息"
          />
        </List.Item>
      )}
    />
  );
}

export default ListDemo;
