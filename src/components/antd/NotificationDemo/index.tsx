import React from 'react';
import { Button, notification } from 'antd';

function NotificationDemo() {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.open({
      message: '通知提醒',
      description: '这是一个来自 notification 的消息提示。',
    });
  };

  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={openNotification}>
        打开通知
      </Button>
    </>
  );
}

export default NotificationDemo;
