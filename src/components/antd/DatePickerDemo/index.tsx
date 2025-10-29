import React from 'react';
import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

function DatePickerDemo() {
  return (
    <Space direction="vertical">
      <DatePicker placeholder="选择日期" />
      <RangePicker placeholder={['开始时间', '结束时间']} />
    </Space>
  );
}

export default DatePickerDemo;
