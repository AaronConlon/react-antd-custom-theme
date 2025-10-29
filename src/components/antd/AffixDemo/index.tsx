import React from 'react';
import { Affix, Button } from 'antd';

function AffixDemo() {
  return (
    <div style={{ height: 120 }}>
      <Affix offsetTop={10}>
        <Button type="primary">吸顶按钮</Button>
      </Affix>
    </div>
  );
}

export default AffixDemo;
