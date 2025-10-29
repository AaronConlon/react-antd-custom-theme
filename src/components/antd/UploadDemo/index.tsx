import React from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function UploadDemo() {
  return (
    <Upload
      name="file"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      onChange={(info) => {
        if (info.file.status === 'done') {
          message.success(`${info.file.name} 上传成功`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 上传失败`);
        }
      }}
    >
      <Button icon={<UploadOutlined />}>点击上传</Button>
    </Upload>
  );
}

export default UploadDemo;
