import React from 'react';
import { Card, Typography, Row, Col, Divider } from 'antd';
import {
  AffixDemo,
  AlertDemo,
  AnchorDemo,
  AutoCompleteDemo,
  AvatarDemo,
  BackTopDemo,
  BadgeDemo,
  BreadcrumbDemo,
  ButtonDemo,
  CalendarDemo,
  CardDemo,
  CarouselDemo,
  CascaderDemo,
  CheckboxDemo,
  CollapseDemo,
  ColorPickerDemo,
  DatePickerDemo,
  DescriptionsDemo,
  DividerDemo,
  DrawerDemo,
  DropdownDemo,
  EmptyDemo,
  FlexDemo,
  FloatButtonDemo,
  FormDemo,
  GridDemo,
  ImageDemo,
  InputDemo,
  InputNumberDemo,
  ListDemo,
  MentionsDemo,
  MessageDemo,
  NotificationDemo,
  PaginationDemo,
  PopoverDemo,
  ProgressDemo,
  QRCodeDemo,
  RadioDemo,
  RateDemo,
  ResultDemo,
  SegmentedDemo,
  SelectDemo,
  SkeletonDemo,
  SliderDemo,
  SpaceDemo,
  SpinDemo,
  StatisticDemo,
  StepsDemo,
  SwitchDemo,
  TabsDemo,
  TagDemo,
  TimelineDemo,
  TimePickerDemo,
  TooltipDemo,
  TransferDemo,
  TreeDemo,
  TreeSelectDemo,
  TypographyDemo,
  UploadDemo,
  WatermarkDemo,
} from '@/components/antd';
import './index.scss';

const { Title, Paragraph } = Typography;

interface SectionItem {
  key: string;
  title: string;
  component: React.ReactNode;
}

interface Section {
  key: string;
  title: string;
  description: string;
  items: SectionItem[];
}

const sections: Section[] = [
  {
    key: 'general',
    title: '通用',
    description: '基础样式与布局组件。',
    items: [
      { key: 'button', title: 'Button 按钮', component: <ButtonDemo /> },
      { key: 'typography', title: 'Typography 排版', component: <TypographyDemo /> },
      { key: 'divider', title: 'Divider 分割线', component: <DividerDemo /> },
      { key: 'space', title: 'Space 间距', component: <SpaceDemo /> },
      { key: 'flex', title: 'Flex 弹性布局', component: <FlexDemo /> },
    ],
  },
  {
    key: 'layout',
    title: '布局',
    description: '页面级布局与定位。',
    items: [
      { key: 'grid', title: 'Grid 栅格', component: <GridDemo /> },
      { key: 'affix', title: 'Affix 固钉', component: <AffixDemo /> },
      { key: 'anchor', title: 'Anchor 锚点', component: <AnchorDemo /> },
      { key: 'backtop', title: 'BackTop 返回顶部', component: <BackTopDemo /> },
      { key: 'floatbutton', title: 'FloatButton 浮动按钮', component: <FloatButtonDemo /> },
    ],
  },
  {
    key: 'navigation',
    title: '导航',
    description: '引导用户在页面中进行跳转。',
    items: [
      { key: 'breadcrumb', title: 'Breadcrumb 面包屑', component: <BreadcrumbDemo /> },
      { key: 'dropdown', title: 'Dropdown 下拉菜单', component: <DropdownDemo /> },
      { key: 'pagination', title: 'Pagination 分页', component: <PaginationDemo /> },
      { key: 'steps', title: 'Steps 步骤条', component: <StepsDemo /> },
      { key: 'tabs', title: 'Tabs 标签页', component: <TabsDemo /> },
    ],
  },
  {
    key: 'data-entry',
    title: '数据录入',
    description: '表单与交互输入组件（排除 Table 与 Modal）。',
    items: [
      { key: 'autocomplete', title: 'AutoComplete 自动完成', component: <AutoCompleteDemo /> },
      { key: 'cascader', title: 'Cascader 级联选择', component: <CascaderDemo /> },
      { key: 'checkbox', title: 'Checkbox 多选框', component: <CheckboxDemo /> },
      { key: 'colorpicker', title: 'ColorPicker 颜色选择器', component: <ColorPickerDemo /> },
      { key: 'datepicker', title: 'DatePicker 日期选择', component: <DatePickerDemo /> },
      { key: 'form', title: 'Form 表单', component: <FormDemo /> },
      { key: 'input', title: 'Input 输入框', component: <InputDemo /> },
      { key: 'inputnumber', title: 'InputNumber 计数器', component: <InputNumberDemo /> },
      { key: 'mentions', title: 'Mentions 提及', component: <MentionsDemo /> },
      { key: 'radio', title: 'Radio 单选框', component: <RadioDemo /> },
      { key: 'rate', title: 'Rate 评分', component: <RateDemo /> },
      { key: 'segmented', title: 'Segmented 分段控制', component: <SegmentedDemo /> },
      { key: 'select', title: 'Select 选择器', component: <SelectDemo /> },
      { key: 'slider', title: 'Slider 滑块', component: <SliderDemo /> },
      { key: 'switch', title: 'Switch 开关', component: <SwitchDemo /> },
      { key: 'timepicker', title: 'TimePicker 时间选择', component: <TimePickerDemo /> },
      { key: 'transfer', title: 'Transfer 穿梭框', component: <TransferDemo /> },
      { key: 'treeselect', title: 'TreeSelect 树选择', component: <TreeSelectDemo /> },
      { key: 'upload', title: 'Upload 上传', component: <UploadDemo /> },
    ],
  },
  {
    key: 'data-display',
    title: '数据展示',
    description: '信息展示与媒体组件。',
    items: [
      { key: 'alert', title: 'Alert 警告提示', component: <AlertDemo /> },
      { key: 'avatar', title: 'Avatar 头像', component: <AvatarDemo /> },
      { key: 'badge', title: 'Badge 徽标数', component: <BadgeDemo /> },
      { key: 'calendar', title: 'Calendar 日历', component: <CalendarDemo /> },
      { key: 'card', title: 'Card 卡片', component: <CardDemo /> },
      { key: 'carousel', title: 'Carousel 走马灯', component: <CarouselDemo /> },
      { key: 'collapse', title: 'Collapse 折叠面板', component: <CollapseDemo /> },
      { key: 'descriptions', title: 'Descriptions 描述列表', component: <DescriptionsDemo /> },
      { key: 'empty', title: 'Empty 空状态', component: <EmptyDemo /> },
      { key: 'image', title: 'Image 图片', component: <ImageDemo /> },
      { key: 'list', title: 'List 列表', component: <ListDemo /> },
      { key: 'popover', title: 'Popover 气泡卡片', component: <PopoverDemo /> },
      { key: 'progress', title: 'Progress 进度条', component: <ProgressDemo /> },
      { key: 'qrcode', title: 'QRCode 二维码', component: <QRCodeDemo /> },
      { key: 'result', title: 'Result 结果', component: <ResultDemo /> },
      { key: 'skeleton', title: 'Skeleton 骨架屏', component: <SkeletonDemo /> },
      { key: 'statistic', title: 'Statistic 统计数值', component: <StatisticDemo /> },
      { key: 'tag', title: 'Tag 标签', component: <TagDemo /> },
      { key: 'timeline', title: 'Timeline 时间轴', component: <TimelineDemo /> },
      { key: 'tooltip', title: 'Tooltip 文字提示', component: <TooltipDemo /> },
      { key: 'tree', title: 'Tree 树形控件', component: <TreeDemo /> },
      { key: 'watermark', title: 'Watermark 水印', component: <WatermarkDemo /> },
    ],
  },
  {
    key: 'feedback',
    title: '反馈',
    description: '与用户交互的即时反馈组件。',
    items: [
      { key: 'drawer', title: 'Drawer 抽屉', component: <DrawerDemo /> },
      { key: 'message', title: 'Message 全局提示', component: <MessageDemo /> },
      { key: 'notification', title: 'Notification 通知提醒框', component: <NotificationDemo /> },
      { key: 'spin', title: 'Spin 加载中', component: <SpinDemo /> },
    ],
  },
];

function HomePage() {
  return (
    <div className="home-page">
      <Title level={2}>Ant Design 组件速览</Title>
      <Paragraph type="secondary">
        以下示例覆盖 Ant Design 中除 Table 与 Modal 之外的主要组件，便于快速查看效果与状态。
      </Paragraph>
      {sections.map((section) => (
        <section key={section.key} className="home-page__section">
          <div className="home-page__section-header">
            <Title level={4}>{section.title}</Title>
            <Paragraph type="secondary">{section.description}</Paragraph>
          </div>
          <Row gutter={[16, 16]}>
            {section.items.map((item) => (
              <Col xs={24} md={12} xl={8} key={item.key}>
                <Card title={item.title} size="small" bordered={false} className="home-page__card">
                  <div className="home-page__card-body">{item.component}</div>
                </Card>
              </Col>
            ))}
          </Row>
          <Divider />
        </section>
      ))}
    </div>
  );
}

export default HomePage;
