import React, { useMemo, useState } from 'react';
import { AutoComplete } from 'antd';

function AutoCompleteDemo() {
  const [value, setValue] = useState('');
  const options = useMemo(
    () =>
      !value
        ? []
        : [
            { value: `${value}@gmail.com` },
            { value: `${value}@qq.com` },
            { value: `${value}@outlook.com` },
          ],
    [value],
  );

  return (
    <AutoComplete
      style={{ width: 240 }}
      value={value}
      options={options}
      onChange={setValue}
      placeholder="输入邮箱"
    />
  );
}

export default AutoCompleteDemo;
