import { Layout, Menu, Breadcrumb } from 'antd'
import { MailOutlined, DesktopOutlined, UserOutlined, TeamOutlined, FileOutlined, HomeOutlined } from '@ant-design/icons'
import { useState } from 'react'
import Message from './message'
import styled from 'styled-components'

const { Sider, Header, Content, Footer } = Layout

const StyledHeader = styled(Header)`
  color: #fff;
  height: 64px;
  padding-inline: 48px;
  line-height: 64px;
  font-size: 24px;
  font-weight: bold;
  padding-left: 20px;
`;

const StyledContent = styled(Content)`
  color: #000;
  padding: 16px;
`;

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
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <StyledHeader theme="dark">AIRHOST</StyledHeader>
        <StyledContent>
          <Breadcrumb style={{ marginBottom: 16 }}>
            <Breadcrumb.Item>
              <HomeOutlined /> Home
            </Breadcrumb.Item>
            <Breadcrumb.Item>Message</Breadcrumb.Item>
          </Breadcrumb>
          <Message />
        </StyledContent>
      </Layout>
    </Layout>
  )
}