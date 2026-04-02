/**
 * @file pages/Dashboard/Dashboard.tsx
 * @author leon.wang
 */
import React, { FC } from 'react';
import { Card, Row, Col, Statistic } from '@derbysoft/neat-design';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { EChartsWrapper } from '~/components/EChartsWrapper';
import { EChartsOption } from 'echarts';
import { useTranslation } from 'react-i18next';

import './Dashboard.scss';

const Dashboard: FC = () => {
  const { t } = useTranslation();

  // 模拟数据
  const stats = {
    totalUsers: { value: 8846, growth: 12.5 },
    totalOrders: { value: 3256, growth: -3.2 },
    totalRevenue: { value: 52846, growth: 8.7 },
    pageViews: { value: 128640, growth: 15.3 },
  };

  // 折线图配置 - 销售趋势
  const lineChartOption: EChartsOption = {
    title: {
      text: t('pages.dashboard:salesTrendTitle'),
      left: 'center',
      top: 0,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    legend: {
      data: [t('pages.dashboard:sales'), t('pages.dashboard:profit')],
      top: 30,
      left: 'center',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月',
      ],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: t('pages.dashboard:sales'),
        type: 'line',
        smooth: true,
        data: [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 290, 330],
        areaStyle: {
          opacity: 0.3,
        },
      },
      {
        name: t('pages.dashboard:profit'),
        type: 'line',
        smooth: true,
        data: [220, 182, 191, 234, 290, 330, 310, 201, 154, 190, 330, 410],
        areaStyle: {
          opacity: 0.3,
        },
      },
    ],
  };

  // 柱状图配置 - 分类销售
  const barChartOption: EChartsOption = {
    title: {
      text: t('pages.dashboard:categorySalesTitle'),
      left: 'center',
      top: 0,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      top: 30,
      left: 'center',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: ['电子产品', '服装', '食品', '图书', '家居', '运动'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: t('pages.dashboard:sales'),
        type: 'bar',
        data: [320, 302, 301, 334, 390, 330],
        itemStyle: {
          color: '#5470c6',
        },
      },
    ],
  };

  // 饼图配置 - 用户来源
  const pieChartOption: EChartsOption = {
    title: {
      text: t('pages.dashboard:userSourceTitle'),
      left: 'center',
      top: 0,
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 50,
    },
    series: [
      {
        name: t('pages.dashboard:userSource'),
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: '直接访问' },
          { value: 735, name: '搜索引擎' },
          { value: 580, name: '社交媒体' },
          { value: 484, name: '邮件营销' },
          { value: 300, name: '其他' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  // 雷达图配置 - 产品评分
  const radarChartOption: EChartsOption = {
    title: {
      text: t('pages.dashboard:productScoreTitle'),
      left: 'center',
      top: 0,
    },
    legend: {
      top: 30,
      left: 'center',
    },
    radar: {
      indicator: [
        { name: '质量', max: 100 },
        { name: '价格', max: 100 },
        { name: '服务', max: 100 },
        { name: '物流', max: 100 },
        { name: '包装', max: 100 },
        { name: '体验', max: 100 },
      ],
    },
    series: [
      {
        name: '产品评分',
        type: 'radar',
        data: [
          {
            value: [85, 90, 78, 88, 82, 92],
            name: '产品 A',
          },
          {
            value: [78, 85, 92, 80, 88, 85],
            name: '产品 B',
          },
        ],
      },
    ],
  };

  // 热力图配置 - 活跃时段
  const heatmapOption: EChartsOption = {
    title: {
      text: t('pages.dashboard:activeTimeTitle'),
      left: 'center',
    },
    tooltip: {
      position: 'top',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: (params: any) => {
        return `${params.name}: ${params.value[2]}`;
      },
    },
    grid: {
      height: '50%',
      top: '10%',
    },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      splitArea: {
        show: true,
      },
    },
    yAxis: {
      type: 'category',
      data: ['0-4', '4-8', '8-12', '12-16', '16-20', '20-24'],
      splitArea: {
        show: true,
      },
    },
    visualMap: {
      min: 0,
      max: 100,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '5%',
    },
    series: [
      {
        name: '活跃度',
        type: 'heatmap',
        data: [
          [0, 0, 5],
          [0, 1, 10],
          [0, 2, 45],
          [0, 3, 78],
          [0, 4, 92],
          [0, 5, 56],
          [1, 0, 8],
          [1, 1, 12],
          [1, 2, 50],
          [1, 3, 85],
          [1, 4, 88],
          [1, 5, 60],
          [2, 0, 6],
          [2, 1, 15],
          [2, 2, 52],
          [2, 3, 82],
          [2, 4, 90],
          [2, 5, 58],
          [3, 0, 7],
          [3, 1, 14],
          [3, 2, 48],
          [3, 3, 80],
          [3, 4, 95],
          [3, 5, 62],
          [4, 0, 9],
          [4, 1, 16],
          [4, 2, 55],
          [4, 3, 88],
          [4, 4, 98],
          [4, 5, 65],
          [5, 0, 15],
          [5, 1, 25],
          [5, 2, 60],
          [5, 3, 70],
          [5, 4, 75],
          [5, 5, 70],
          [6, 0, 20],
          [6, 1, 30],
          [6, 2, 65],
          [6, 3, 75],
          [6, 4, 80],
          [6, 5, 72],
        ],
        label: {
          show: false,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  // 仪表盘配置 - 完成率
  const gaugeOption: EChartsOption = {
    title: {
      text: t('pages.dashboard:completionRateTitle'),
      left: 'center',
    },
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        splitNumber: 10,
        axisLine: {
          lineStyle: {
            width: 6,
            color: [
              [0.3, '#FF6E76'],
              [0.7, '#FDDD60'],
              [1, '#58D9F9'],
            ],
          },
        },
        pointer: {
          icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length: '12%',
          width: 20,
          offsetCenter: [0, '-60%'],
          itemStyle: {
            color: 'auto',
          },
        },
        axisTick: {
          length: 12,
          lineStyle: {
            color: 'auto',
            width: 2,
          },
        },
        splitLine: {
          length: 20,
          lineStyle: {
            color: 'auto',
            width: 5,
          },
        },
        axisLabel: {
          color: '#464646',
          fontSize: 12,
          distance: -60,
        },
        title: {
          offsetCenter: [0, '-20%'],
          fontSize: 16,
        },
        detail: {
          fontSize: 30,
          offsetCenter: [0, '0%'],
          valueAnimation: true,
          formatter: '{value}%',
          color: 'auto',
        },
        data: [
          {
            value: 78.5,
            name: t('pages.dashboard:completionRate'),
          },
        ],
      },
    ],
  };

  return (
    <div className="dashboard">
      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={t('pages.dashboard:totalUsers')}
              value={stats.totalUsers.value}
              precision={0}
              valueStyle={{
                color: stats.totalUsers.growth > 0 ? '#3f8600' : '#cf1322',
              }}
              prefix={<UserOutlined />}
              suffix={
                <span style={{ fontSize: 14, marginLeft: 8 }}>
                  {stats.totalUsers.growth > 0 ? (
                    <ArrowUpOutlined />
                  ) : (
                    <ArrowDownOutlined />
                  )}
                  {Math.abs(stats.totalUsers.growth)}%
                </span>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={t('pages.dashboard:totalOrders')}
              value={stats.totalOrders.value}
              precision={0}
              valueStyle={{
                color: stats.totalOrders.growth > 0 ? '#3f8600' : '#cf1322',
              }}
              prefix={<ShoppingCartOutlined />}
              suffix={
                <span style={{ fontSize: 14, marginLeft: 8 }}>
                  {stats.totalOrders.growth > 0 ? (
                    <ArrowUpOutlined />
                  ) : (
                    <ArrowDownOutlined />
                  )}
                  {Math.abs(stats.totalOrders.growth)}%
                </span>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={t('pages.dashboard:totalRevenue')}
              value={stats.totalRevenue.value}
              precision={0}
              valueStyle={{
                color: stats.totalRevenue.growth > 0 ? '#3f8600' : '#cf1322',
              }}
              prefix={<DollarOutlined />}
              suffix={
                <span style={{ fontSize: 14, marginLeft: 8 }}>
                  {stats.totalRevenue.growth > 0 ? (
                    <ArrowUpOutlined />
                  ) : (
                    <ArrowDownOutlined />
                  )}
                  {Math.abs(stats.totalRevenue.growth)}%
                </span>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title={t('pages.dashboard:pageViews')}
              value={stats.pageViews.value}
              precision={0}
              valueStyle={{
                color: stats.pageViews.growth > 0 ? '#3f8600' : '#cf1322',
              }}
              prefix={<EyeOutlined />}
              suffix={
                <span style={{ fontSize: 14, marginLeft: 8 }}>
                  {stats.pageViews.growth > 0 ? (
                    <ArrowUpOutlined />
                  ) : (
                    <ArrowDownOutlined />
                  )}
                  {Math.abs(stats.pageViews.growth)}%
                </span>
              }
            />
          </Card>
        </Col>
      </Row>

      {/* 图表 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card>
            <EChartsWrapper option={lineChartOption} height={400} />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card>
            <EChartsWrapper option={pieChartOption} height={400} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <Card>
            <EChartsWrapper option={barChartOption} height={400} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card>
            <EChartsWrapper option={radarChartOption} height={400} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={16}>
          <Card>
            <EChartsWrapper option={heatmapOption} height={450} />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card>
            <EChartsWrapper option={gaugeOption} height={450} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
