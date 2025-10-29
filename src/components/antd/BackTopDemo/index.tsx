import React, { useRef } from 'react';
import { FloatButton } from 'antd';

function BackTopDemo() {
  const containerRef = useRef(null);

  return (
    <div
      ref={containerRef}
      style={{ height: 200, overflow: 'auto', border: '1px solid #f0f0f0', padding: 16 }}
    >
      <div style={{ height: 600 }}>滚动区域内容，向下滚动查看返回顶部按钮。</div>
      <FloatButton.BackTop visibilityHeight={50} target={() => containerRef.current} />
    </div>
  );
}

export default BackTopDemo;
