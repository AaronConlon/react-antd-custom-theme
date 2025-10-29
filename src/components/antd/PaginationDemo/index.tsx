import React, { useState } from 'react';
import { Pagination } from 'antd';

function PaginationDemo() {
  const [page, setPage] = useState(1);

  return (
    <Pagination current={page} onChange={setPage} total={200} showSizeChanger />
  );
}

export default PaginationDemo;
