import React from 'react';
import { Statistic, Row, Col } from 'antd';

const deadline = Date.now() + 1000 * 60 * 60 * 24;

function StatisticDemo() {
  return (
    <Row gutter={16}>
      <Col span={12}>
        <Statistic title="成交额" value={112893} prefix="￥" />
      </Col>
      <Col span={12}>
        <Statistic.Countdown title="距离截止" value={deadline} format="HH:mm:ss" />
      </Col>
    </Row>
  );
}

export default StatisticDemo;
