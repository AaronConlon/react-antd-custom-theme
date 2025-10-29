import React from 'react';
import { Row, Col, Card } from 'antd';

function GridDemo() {
  return (
    <Row gutter={16}>
      {[1, 2, 3, 4].map((item) => (
        <Col xs={12} md={6} key={item}>
          <Card bordered={false}>栅格 {item}</Card>
        </Col>
      ))}
    </Row>
  );
}

export default GridDemo;
