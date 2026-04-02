/**
 * @file src/pages/Hooks/UseDsTableExample.tsx
 * @author leon.wang
 */

import React, { useState } from 'react';
import {
  Card,
  Table,
  Button,
  Form,
  Input,
  Space,
  Select,
  Tag,
  Typography,
  Avatar,
  Tooltip,
  Badge,
  Progress,
  Statistic,
  Row,
  Col,
  Dropdown,
  Modal,
  message,
  Alert,
} from 'antd';
import {
  SearchOutlined,
  ReloadOutlined,
  UserOutlined,
  TableOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ThunderboltOutlined,
  RocketOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
  FireOutlined,
} from '@ant-design/icons';
import useDsTable from '~/hooks/useDsTable';
import type { ObjectType, ResponseDataType } from '~/hooks/useDsTable';
import './UseDsTableExample.scss';

const { Title, Paragraph, Text } = Typography;

/**
 * Mock API - Simulate backend data fetching with enhanced user data
 */
const mockUserData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'active',
    department: 'Engineering',
    joinDate: '2023-01-15',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    performance: 95,
    projects: 12,
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'User',
    status: 'active',
    department: 'Marketing',
    joinDate: '2023-03-20',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    performance: 88,
    projects: 8,
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'User',
    status: 'inactive',
    department: 'Sales',
    joinDate: '2022-11-10',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    performance: 62,
    projects: 4,
  },
  {
    id: 4,
    name: 'Alice Williams',
    email: 'alice.williams@example.com',
    role: 'Manager',
    status: 'active',
    department: 'Engineering',
    joinDate: '2022-08-05',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    performance: 92,
    projects: 15,
  },
  {
    id: 5,
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    role: 'User',
    status: 'active',
    department: 'HR',
    joinDate: '2023-05-12',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
    performance: 78,
    projects: 6,
  },
  {
    id: 6,
    name: 'Diana Prince',
    email: 'diana.prince@example.com',
    role: 'Admin',
    status: 'active',
    department: 'Engineering',
    joinDate: '2021-12-01',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diana',
    performance: 98,
    projects: 20,
  },
  {
    id: 7,
    name: 'Edward Norton',
    email: 'edward.norton@example.com',
    role: 'User',
    status: 'inactive',
    department: 'Sales',
    joinDate: '2023-02-28',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Edward',
    performance: 55,
    projects: 3,
  },
  {
    id: 8,
    name: 'Fiona Green',
    email: 'fiona.green@example.com',
    role: 'Manager',
    status: 'active',
    department: 'Marketing',
    joinDate: '2022-07-15',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fiona',
    performance: 85,
    projects: 11,
  },
  {
    id: 9,
    name: 'George Harris',
    email: 'george.harris@example.com',
    role: 'User',
    status: 'active',
    department: 'Engineering',
    joinDate: '2023-04-10',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=George',
    performance: 82,
    projects: 9,
  },
  {
    id: 10,
    name: 'Helen Taylor',
    email: 'helen.taylor@example.com',
    role: 'User',
    status: 'active',
    department: 'HR',
    joinDate: '2023-06-22',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Helen',
    performance: 76,
    projects: 5,
  },
  {
    id: 11,
    name: 'Ivan Martinez',
    email: 'ivan.martinez@example.com',
    role: 'Admin',
    status: 'active',
    department: 'Engineering',
    joinDate: '2022-09-18',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ivan',
    performance: 94,
    projects: 18,
  },
  {
    id: 12,
    name: 'Julia Anderson',
    email: 'julia.anderson@example.com',
    role: 'User',
    status: 'inactive',
    department: 'Sales',
    joinDate: '2023-01-30',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Julia',
    performance: 58,
    projects: 2,
  },
  {
    id: 13,
    name: 'Kevin White',
    email: 'kevin.white@example.com',
    role: 'Manager',
    status: 'active',
    department: 'Marketing',
    joinDate: '2022-10-05',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin',
    performance: 89,
    projects: 13,
  },
  {
    id: 14,
    name: 'Laura Davis',
    email: 'laura.davis@example.com',
    role: 'User',
    status: 'active',
    department: 'HR',
    joinDate: '2023-03-15',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Laura',
    performance: 80,
    projects: 7,
  },
  {
    id: 15,
    name: 'Michael Lee',
    email: 'michael.lee@example.com',
    role: 'User',
    status: 'active',
    department: 'Engineering',
    joinDate: '2022-12-20',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    performance: 84,
    projects: 10,
  },
];

/**
 * Mock API request function
 */
const fetchUserList = (
  params: ObjectType
): Promise<{ data: ResponseDataType }> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      const { pageNum = 0, pageSize = 10, name, role, status, sorts } = params;

      // Filter data
      let filteredData = [...mockUserData];

      if (name) {
        filteredData = filteredData.filter((user) =>
          user.name.toLowerCase().includes((name as string).toLowerCase())
        );
      }

      if (role) {
        filteredData = filteredData.filter((user) => user.role === role);
      }

      if (status) {
        filteredData = filteredData.filter((user) => user.status === status);
      }

      // Sort data
      if (sorts && Array.isArray(sorts) && sorts.length > 0) {
        const { property, direction } = sorts[0];
        filteredData.sort((a, b) => {
          const aValue = a[property];
          const bValue = b[property];
          if (direction === 'ASC') {
            return aValue > bValue ? 1 : -1;
          } else {
            return aValue < bValue ? 1 : -1;
          }
        });
      }

      // Pagination
      const start = (pageNum as number) * (pageSize as number);
      const end = start + (pageSize as number);
      const paginatedData = filteredData.slice(start, end);

      // Return mock response
      resolve({
        data: {
          result: 'success',
          timestamp: Date.now(),
          data: {
            totals: filteredData.length,
            totalPages: Math.ceil(filteredData.length / (pageSize as number)),
            pageSize: pageSize as number,
            pageNum: pageNum as number,
            records: paginatedData,
          },
        },
      });
    }, 600); // 600ms delay to simulate network
  });
};

/**
 * UseDsTableExample component - Demonstrates useDsTable hook usage with enhanced visuals
 */
const UseDsTableExample: React.FC = () => {
  const [requestCount, setRequestCount] = useState(0);
  const [lastSearchTime, setLastSearchTime] = useState<string>('');

  const { tableProps, form, submit, reset } = useDsTable(
    (params) => {
      setRequestCount((prev) => prev + 1);
      setLastSearchTime(new Date().toLocaleTimeString());
      return fetchUserList(params) as any;
    },
    // Optional: Transform form values before sending to API
    (formValues) => {
      console.log('🔍 Searching with values:', formValues);
      return formValues;
    },
    // Optional: Transform response data
    (data: any) => {
      console.log('📊 Response data:', data);
      return {
        total: data.totals,
        list: data.records,
      };
    }
  );

  // Calculate statistics
  const stats = {
    total: mockUserData.length,
    active: mockUserData.filter((u) => u.status === 'active').length,
    inactive: mockUserData.filter((u) => u.status === 'inactive').length,
    admins: mockUserData.filter((u) => u.role === 'Admin').length,
  };

  // Handle actions
  const handleEdit = (record: any) => {
    Modal.info({
      title: '✏️ Edit User',
      content: (
        <div>
          <p>
            <strong>Name:</strong> {record.name}
          </p>
          <p>
            <strong>Email:</strong> {record.email}
          </p>
          <p>
            <strong>Department:</strong> {record.department}
          </p>
          <Alert
            message="Demo Mode"
            description="This is a demonstration - no actual changes will be made"
            type="info"
            showIcon
            style={{ marginTop: 16 }}
          />
        </div>
      ),
    });
  };

  const handleDelete = (record: any) => {
    Modal.confirm({
      title: '🗑️ Delete User',
      content: (
        <div>
          <p>
            Are you sure you want to delete <strong>{record.name}</strong>?
          </p>
          <Alert
            message="This action cannot be undone"
            type="warning"
            showIcon
            style={{ marginTop: 8 }}
          />
        </div>
      ),
      okText: 'Delete',
      okType: 'danger',
      onOk: () => {
        message.success(
          `✅ User ${record.name} deleted successfully (demo only)`
        );
      },
    });
  };

  const columns = [
    {
      title: 'User Info',
      dataIndex: 'name',
      key: 'name',
      width: 280,
      sorter: true,
      render: (text: string, record: any) => (
        <Space>
          <Badge
            count={
              record.status === 'active' ? (
                <CheckCircleOutlined style={{ color: '#52c41a' }} />
              ) : (
                <CloseCircleOutlined style={{ color: '#ff4d4f' }} />
              )
            }
            offset={[-5, 35]}
          >
            <Avatar src={record.avatar} size={48}>
              {text.charAt(0)}
            </Avatar>
          </Badge>
          <div>
            <div>
              <Text strong style={{ fontSize: 14 }}>
                {text}
              </Text>
              {record.performance >= 90 && (
                <FireOutlined style={{ color: '#ff4d4f', marginLeft: 4 }} />
              )}
            </div>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {record.email}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: 120,
      sorter: true,
      render: (role: string) => {
        const config: Record<string, { color: string; icon: React.ReactNode }> =
          {
            Admin: { color: 'red', icon: <TrophyOutlined /> },
            Manager: { color: 'blue', icon: <RocketOutlined /> },
            User: { color: 'green', icon: <UserOutlined /> },
          };
        return (
          <Tag color={config[role].color} icon={config[role].icon}>
            {role}
          </Tag>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 130,
      sorter: true,
      render: (status: string) => (
        <Badge
          status={status === 'active' ? 'processing' : 'default'}
          text={
            <Text
              strong
              style={{ color: status === 'active' ? '#52c41a' : '#999' }}
            >
              {status.toUpperCase()}
            </Text>
          }
        />
      ),
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      width: 140,
      render: (dept: string) => <Tag icon={<TeamOutlined />}>{dept}</Tag>,
    },
    {
      title: 'Performance',
      dataIndex: 'performance',
      key: 'performance',
      width: 180,
      sorter: true,
      render: (performance: number) => (
        <Tooltip title={`Performance: ${performance}%`}>
          <Progress
            percent={performance}
            size="small"
            strokeColor={{
              '0%':
                performance >= 90
                  ? '#52c41a'
                  : performance >= 75
                  ? '#1890ff'
                  : '#faad14',
              '100%':
                performance >= 90
                  ? '#95de64'
                  : performance >= 75
                  ? '#69c0ff'
                  : '#ffd666',
            }}
            format={(percent) => (
              <span style={{ fontSize: 11 }}>
                {percent}%{percent && percent >= 90 && ' 🔥'}
              </span>
            )}
          />
        </Tooltip>
      ),
    },
    {
      title: 'Projects',
      dataIndex: 'projects',
      key: 'projects',
      width: 100,
      sorter: true,
      align: 'center' as const,
      render: (projects: number) => (
        <Tooltip title={`${projects} active projects`}>
          <Badge
            count={projects}
            showZero
            style={{
              backgroundColor:
                projects >= 15
                  ? '#ff4d4f'
                  : projects >= 10
                  ? '#52c41a'
                  : '#1890ff',
            }}
            overflowCount={99}
          />
        </Tooltip>
      ),
    },
    {
      title: 'Join Date',
      dataIndex: 'joinDate',
      key: 'joinDate',
      width: 130,
      sorter: true,
      render: (date: string) => (
        <Text>
          <ClockCircleOutlined style={{ marginRight: 4 }} />
          {date}
        </Text>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      align: 'center' as const,
      fixed: 'right' as const,
      render: (_: any, record: any) => (
        <Dropdown
          menu={{
            items: [
              {
                key: 'edit',
                label: 'Edit',
                icon: <EditOutlined />,
                onClick: () => handleEdit(record),
              },
              {
                key: 'delete',
                label: 'Delete',
                icon: <DeleteOutlined />,
                danger: true,
                onClick: () => handleDelete(record),
              },
            ],
          }}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="use-ds-table-example">
      <div className="use-ds-table-example__header">
        <Title level={2}>
          <TableOutlined /> useDsTable Hook - Interactive Demo
        </Title>
        <Paragraph>
          <Tag color="blue" icon={<ThunderboltOutlined />}>
            Live Demo
          </Tag>
          <Tag color="green">Mock Data</Tag>
          <Tag color="purple">Real-time Updates</Tag>
        </Paragraph>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={6} lg={6} sm={12}>
          <Card className="use-ds-table-example__stat-card use-ds-table-example__stat-card--blue">
            <Statistic
              title="Total Users"
              value={stats.total}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} md={6} lg={6} sm={12}>
          <Card className="use-ds-table-example__stat-card use-ds-table-example__stat-card--green">
            <Statistic
              title="Active Users"
              value={stats.active}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} md={6} lg={6} sm={12}>
          <Card className="use-ds-table-example__stat-card use-ds-table-example__stat-card--orange">
            <Statistic
              title="Inactive Users"
              value={stats.inactive}
              prefix={<CloseCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} md={6} lg={6} sm={12}>
          <Card className="use-ds-table-example__stat-card use-ds-table-example__stat-card--red">
            <Statistic
              title="Administrators"
              value={stats.admins}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Request Info */}
      <Alert
        message={
          <Space>
            <Text>
              API Requests: <Text strong>{requestCount}</Text>
            </Text>
            {lastSearchTime && (
              <>
                <Text>|</Text>
                <Text>
                  Last Request: <Text code>{lastSearchTime}</Text>
                </Text>
              </>
            )}
          </Space>
        }
        type="info"
        style={{ marginBottom: 16 }}
        showIcon
        icon={<ThunderboltOutlined />}
      />

      {/* Main Table Card */}
      <Card
        title={
          <Space>
            <UserOutlined />
            <span>User Management Table</span>
          </Space>
        }
        extra={
          <Space>
            <Tag color="processing">Live Data</Tag>
            <Tag color="cyan">600ms Latency</Tag>
          </Space>
        }
      >
        {/* Search Form */}
        <Form form={form} className="use-ds-table-example__search-form">
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item name="name" style={{ marginBottom: 0 }}>
                <Input
                  placeholder="Search by name..."
                  prefix={<SearchOutlined />}
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="role" style={{ marginBottom: 0 }}>
                <Select
                  placeholder="Select role"
                  allowClear
                  options={[
                    { label: '👑 Admin', value: 'Admin' },
                    { label: '🚀 Manager', value: 'Manager' },
                    { label: '👤 User', value: 'User' },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="status" style={{ marginBottom: 0 }}>
                <Select
                  placeholder="Select status"
                  allowClear
                  options={[
                    { label: '✅ Active', value: 'active' },
                    { label: '⭕ Inactive', value: 'inactive' },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Space>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={submit}
                >
                  Search
                </Button>
                <Button icon={<ReloadOutlined />} onClick={reset}>
                  Reset
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>

        {/* Table */}
        <Table
          {...tableProps}
          columns={columns}
          rowKey="id"
          style={{ marginTop: 16 }}
          bordered
          rowClassName={(record: any) =>
            record.performance >= 90
              ? 'use-ds-table-example__row--high-performer'
              : ''
          }
        />
      </Card>

      {/* Code Example */}
      <Card
        title="📝 Code Example"
        style={{ marginTop: 24 }}
        className="use-ds-table-example__code-card"
      >
        <pre className="use-ds-table-example__code">
          {`// 1. Import the hook
import useDsTable from '~/hooks/useDsTable';

// 2. Use the hook in component
const MyComponent = () => {
  const { tableProps, form, submit, reset } = useDsTable(
    fetchUserList,  // API function
    (formValues) => formValues,  // Transform form values (optional)
    (data) => ({  // Transform response (optional)
      total: data.totals,
      list: data.records,
    })
  );

  return (
    <>
      {/* Search Form */}
      <Form form={form}>
        <Form.Item name="keyword">
          <Input placeholder="Search..." />
        </Form.Item>
        <Button onClick={submit}>Search</Button>
        <Button onClick={reset}>Reset</Button>
      </Form>

      {/* Table */}
      <Table {...tableProps} columns={columns} rowKey="id" />
    </>
  );
};`}
        </pre>
      </Card>
    </div>
  );
};

export default UseDsTableExample;
