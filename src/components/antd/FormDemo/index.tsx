import React from 'react';
import { Form, Input, Button } from 'antd';

function FormDemo() {
  return (
    <Form layout="inline" initialValues={{ username: 'admin' }}>
      <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
        <Input placeholder="用户名" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
}

export default FormDemo;
