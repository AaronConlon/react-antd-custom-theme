import React, { useMemo, useState } from 'react';
import {
  Badge,
  Button,
  Form,
  Input,
  Modal,
  Pagination,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd';
import type { BadgeProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import './index.scss';

const { Title } = Typography;

type OrderStatus = 'pending' | 'success' | 'failed';

type FilterStatus = 'all' | OrderStatus;

interface OrderRecord {
  key: number;
  orderNo: string;
  name: string;
  amount: number;
  status: OrderStatus;
  createdAt: string;
  remark: string;
}

interface FilterState {
  keyword: string;
  status: FilterStatus;
}

const statusMap: Record<OrderStatus, { text: string; status: BadgeProps['status']; color: string }> =
  {
    pending: { text: '待处理', status: 'processing', color: 'processing' },
    success: { text: '已完成', status: 'success', color: 'success' },
    failed: { text: '失败', status: 'error', color: 'error' },
  };

const statusKeys = Object.keys(statusMap) as OrderStatus[];

const generateMockData = (): OrderRecord[] =>
  Array.from({ length: 36 }).map((_, index) => {
    const status = statusKeys[index % statusKeys.length];
    return {
      key: index + 1,
      orderNo: `NO-${1000 + index}`,
      name: `测试用户 ${index + 1}`,
      amount: 199 + index,
      status,
      createdAt: dayjs().subtract(index, 'day').format('YYYY-MM-DD HH:mm'),
      remark: '这是一条测试记录，用来演示表格和弹窗联动。',
    };
  });

const mockData = generateMockData();

function TestPage() {
  const [filters, setFilters] = useState<FilterState>({ keyword: '', status: 'all' });
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(8);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = useState<OrderRecord | null>(null);

  const filteredData = useMemo<OrderRecord[]>(() => {
    return mockData.filter((item: OrderRecord) => {
      const matchKeyword = filters.keyword
        ? item.orderNo.includes(filters.keyword) || item.name.includes(filters.keyword)
        : true;
      const matchStatus = filters.status === 'all' ? true : item.status === filters.status;
      return matchKeyword && matchStatus;
    });
  }, [filters]);

  const paginatedData = useMemo<OrderRecord[]>(() => {
    const start = (current - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, current, pageSize]);

  const columns: ColumnsType<OrderRecord> = [
    { title: '订单号', dataIndex: 'orderNo', key: 'orderNo', width: 140 },
    { title: '客户名称', dataIndex: 'name', key: 'name' },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      render: (value: number) => `￥${value.toFixed(2)}`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (value: OrderStatus) => {
        const status = statusMap[value];
        return <Badge status={status.status} text={status.text} />;
      },
    },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt', width: 180 },
    {
      title: '操作',
      key: 'action',
      render: (_: unknown, record: OrderRecord) => (
        <Space>
          <Button type="link" onClick={() => handleOpenModal(record)}>
            查看详情
          </Button>
        </Space>
      ),
    },
  ];

  const handleOpenModal = (record: OrderRecord) => {
    setCurrentRecord(record);
    setOpenModal(true);
  };

  const handleFilterChange = (_: unknown, allValues: Partial<FilterState>) => {
    setFilters({
      keyword: allValues.keyword ?? '',
      status: (allValues.status as FilterStatus) ?? 'all',
    });
    setCurrent(1);
  };

  return (
    <div className="test-page">
      <Title level={3}>订单测试页</Title>
      <Form
        layout="inline"
        initialValues={{ keyword: '', status: 'all' }}
        onValuesChange={handleFilterChange}
        className="test-page__form"
      >
        <Form.Item label="关键词" name="keyword">
          <Input placeholder="订单号 / 客户名称" allowClear />
        </Form.Item>
        <Form.Item label="订单状态" name="status">
          <Select
            style={{ width: 160 }}
            options={[
              { value: 'all', label: '全部' },
              { value: 'pending', label: '待处理' },
              { value: 'success', label: '已完成' },
              { value: 'failed', label: '失败' },
            ]}
          />
        </Form.Item>
      </Form>

      <Table<OrderRecord>
        dataSource={paginatedData}
        columns={columns}
        pagination={false}
        rowKey="key"
        className="test-page__table"
      />

      <div className="test-page__pagination">
        <Pagination
          current={current}
          pageSize={pageSize}
          total={filteredData.length}
          showSizeChanger
          showTotal={(total) => `共 ${total} 条`}
          onChange={(page, size) => {
            setCurrent(page);
            setPageSize(size);
          }}
        />
      </div>

      <Modal
        open={openModal}
        title="订单详情"
        footer={<Button onClick={() => setOpenModal(false)}>关闭</Button>}
        onCancel={() => setOpenModal(false)}
      >
        {currentRecord && (
          <Space direction="vertical" size="middle">
            <div>
              <Tag color={statusMap[currentRecord.status].color}>
                {statusMap[currentRecord.status].text}
              </Tag>
            </div>
            <div>订单号：{currentRecord.orderNo}</div>
            <div>客户名称：{currentRecord.name}</div>
            <div>订单金额：￥{currentRecord.amount.toFixed(2)}</div>
            <div>创建时间：{currentRecord.createdAt}</div>
            <div>备注信息：{currentRecord.remark}</div>
          </Space>
        )}
      </Modal>
    </div>
  );
}

export default TestPage;
