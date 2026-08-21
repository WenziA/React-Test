import { Layout, Menu, Breadcrumb } from 'antd'
import { MailOutlined, DesktopOutlined, UserOutlined, TeamOutlined, FileOutlined, HomeOutlined } from '@ant-design/icons'
import { useState } from 'react'
import Message from './message'

const { Sider, Header, Content, Footer } = Layout

const headerStyle = {
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  fontSize: '24px',
  fontWeight: 'bold'
};
const contentStyle = {
  color: '#000',
  padding: '16px',
};
const siderStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff'
};

function getItem(label, key, icon, children) {
  return { key, icon, children, label }
}
const items = [
  getItem('Mail Setting', '1', <MailOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];

export default function Home() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header theme="dark" style={headerStyle}>AIRHOST</Header>
        <Content style={contentStyle}>
          <Breadcrumb style={{ marginBottom: 16 }}>
            <Breadcrumb.Item>
              <HomeOutlined /> Home
            </Breadcrumb.Item>
            <Breadcrumb.Item>Message</Breadcrumb.Item>
          </Breadcrumb>
          <Message />
        </Content>
      </Layout>
    </Layout>
  )
}