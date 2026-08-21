import { Row, Col, Card, Input, Select, Form, Button, Table, Avatar } from 'antd'
import { FolderOpenOutlined, InboxOutlined, BlockOutlined, CalendarOutlined, StarOutlined, ReloadOutlined, StarFilled, DeleteOutlined, ExportOutlined } from '@ant-design/icons'
import { useState } from 'react'

const folderItems = [
  { key: 'Inbox', label: 'Inbox', icon: <FolderOpenOutlined /> },
  { key: 'Archive', label: 'Archive', icon: <InboxOutlined /> },
  { key: 'starred', label: 'Starred Tickets', icon: <StarOutlined /> },
  { key: 'Booking', label: 'Booking confirmed', icon: <CalendarOutlined /> },
  { key: 'All', label: 'All Messages' ,icon: <BlockOutlined />},
]

const selectOptions = [
  { value: '1', label: 'Jack' },
  { value: '2', label: 'Lucy' },
  { value: '3', label: 'Tom' },
]

const starOptions = [
  { value: 'red', label: 'red', color: '#f00' },
  { value: 'yellow', label: 'yellow', color: '#d4ff00' },
  { value: 'green', label: 'green', color: '#20ff03' },
]

const columns = [
  { title: <StarOutlined />, dataIndex: 'star', key: 'star', width: 50 },
  {
    title: 'User',
    dataIndex: 'user',
    key: 'user',
    render: (value, record) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Avatar src={record.avatar} />
        <div>
          <div>{value}</div>
          <div style={{ fontSize: 12, color: '#666' }}>
            {record.tag && (
              <>
                <span style={{ color: '#006eff'}}>● </span>
                {record.tag}
              </>
            )}
          </div>
        </div>
      </div>
    ),
  },
  { 
    title: 'Property Name', 
    dataIndex: 'property', 
    key: 'property',
    render:(value,record)=>(
        <div>
            <a href=''>{value}</a>
            <p style={{ margin: 0, fontSize: 12, color: '#666' }}>{record.propertyInfo}</p>
        </div>
    ),
  },
  { title: 'Checkin', dataIndex: 'checkin', key: 'checkin' },
  { title: 'Checkout', dataIndex: 'checkout', key: 'checkout' },
  { 
    title: 'Description', 
    dataIndex: 'desc', 
    key: 'desc',
    render:(value,record)=>(
        <div>
            <a href=''>{value}</a>
            <p style={{ margin: 0, fontSize: 12, color: '#666' }}>{record.descDetail}</p>
        </div>
    ),
  },
  { 
    title: 'Update',
    dataIndex: 'update', 
    key: 'update',
    render:(value)=>(
      <div style={{textAlign: 'center'}}>
        <a><ExportOutlined /></a>
        <p style={{ margin: 0, color: '#666' }}>{value}</p>
      </div>
    )
  },
]

const tableData = [
  {
    id: 1,
    avatar: "https://mdn.alipayobjects.com/huamei_vmgq1x/afts/img/A*yHnhRL4x1DEAAAAAQBAAAAgAeh6VAQ/original",
    user: "Suya Xu",
    tag:"Inbox",
    property: "GR1",
    propertyInfo: "#GR1 Light Filled 2 BR Ikebukuro Large Apartment",
    checkin: "Dec 30 2019",
    checkout: "Jan 1 2020",
    desc: "GR1 (12月30日 2019) ~ 1月1日 2020 @airbnb2 ",
    descDetail: "Can you please restart the device? and try again.",
    update: "a month ago",
    star: <StarFilled style={{ color: '#f00'}} />,
    archived: false, 
    starred: true
  },
  {
    id: 2,
    avatar: "https://mdn.alipayobjects.com/huamei_vmgq1x/afts/img/A*Z4-4Q67SG5UAAAAAQLAAAAgAeh6VAQ/original",
    user: "Stanley",
    tag:"Inbox",
    property: "2M11",
    propertyInfo: "",
    checkin: "Feb 15 2020",
    checkout: "Feb 15 2020",
    desc: "Airbnb2 Inquiry:Stanley",
    descDetail: "Yes,it on basement without windows but there's ventilation fan.There's an elevator as well as stairs going to the room.",
    update: "2 month ago",
    star: <StarFilled style={{ color: '#d4ff00' }} />,
    archived: false, 
    starred: false
  },
  {
    id: 3,
    avatar: "https://mdn.alipayobjects.com/huamei_vmgq1x/afts/img/A*SXcuQYBZ6oQAAAAAQJAAAAgAeh6VAQ/original",
    user: "Suya Xu",
    tag:"Inbox",
    property: "GR1",
    propertyInfo: "#GR1 Light Filled 2 BR Ikebukuro Large Apartment",
    checkin: "Dec 30 2019",
    checkout: "Jan 1 2020",
    desc: "GR1 (12月30日 2019) ~ 1月1日 2020 @airbnb2 ",
    descDetail: "Can you please restart the device? and try again.",
    update: "a month ago",
    star: <StarFilled style={{ color: '#20ff03'}} />,
    archived: true, 
    starred: true
  },
  {
    id: 4,
    avatar: "https://mdn.alipayobjects.com/huamei_vmgq1x/afts/img/A*yHnhRL4x1DEAAAAAQBAAAAgAeh6VAQ/original",
    user: "Suya Xu",
    tag:"",
    property: "GR1",
    propertyInfo: "#GR1 Light Filled 2 BR Ikebukuro Large Apartment",
    checkin: "Dec 30 2019",
    checkout: "Jan 1 2020",
    desc: "GR1 (12月30日 2019) ~ 1月1日 2020 @airbnb2 ",
    descDetail: "Can you please restart the device? and try again.",
    update: "a month ago",
    star: <StarFilled style={{ color: '#007bff' }} />,
    archived: false, 
    starred: true
  }
]

export default function  Message() {
    const [activeFolder, setActiveFolder] = useState('Inbox')
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    
    const handleFolderClick = (item) => {
        setActiveFolder(item.key)
    }

    const onSelectChange = newSelectedRowKeys => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const filteredList = tableData.filter(item => {
        switch (activeFolder) {
            // 收件箱：已存档为 false
          case 'Inbox':
            return item.archived === false
            // 存档：已存档为 true
          case 'archive':
            return item.archived === true
            // 标星：已标星为 true
          case 'starred':
            return item.starred === true
          default:
            return true
        }
    })
    
    return (
        <Row gutter={16}>
            <Col span={4}>
                <Card title="Folder" variant="borderless" style={{ marginBottom: 16 }}>
                    {folderItems.map(item => (
                        <Button
                            key={item.key}
                            block
                            type= "text"
                            onClick={() => handleFolderClick({ key: item.key })}
                            style={{
                                textAlign: 'left',
                                background: activeFolder === item.key ? '#e6f7ff' : 'transparent',
                                color: activeFolder === item.key ? '#387ccf' : '#000'
                            }}
                        >
                            {item.icon}
                            {item.label}
                        </Button>
                        ))}
                </Card>
                <Card title="Filters" variant="borderless" >
                    <form>
                        <Form.Item name="selectOptions">
                            <Select
                                style={{ width: '100%' }}
                                placeholder="Property Name"
                                options={selectOptions}
                            />
                        </Form.Item>
                        <Form.Item name="propertyTags">
                            <Input placeholder="Property Tags" />
                        </Form.Item>
                        <Form.Item name="confirmNumber">
                            <Input placeholder="Confirm number" />
                        </Form.Item>
                        <Form.Item name="search">
                            <Button type="primary" block>
                                Search
                            </Button>
                        </Form.Item>
                    </form>
                </Card>
            </Col>
            <Col span={20}>
                <Card 
                    title="Messages List" 
                    variant="borderless" 
                    extra={
                        <>
                            <Button style={{ marginRight: 8 }} type="primary"><ReloadOutlined />REFRESH</Button>
                            <Button><InboxOutlined />Archive</Button>
                            <Select
                                placeholder={
                                    <span style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: 12,
                                    }}>
                                        <StarOutlined />
                                        <span>Star</span>
                                    </span>
                                }
                                style={{ width: 110, marginLeft: 8 }}
                                dropdownMatchSelectWidth={false}
                                >
                                {starOptions.map((item) => (
                                    <Select.Option key={item.value} value={item.value}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <StarFilled style={{ color: item.color}} />
                                        <span>{item.label}</span>
                                    </span>
                                    </Select.Option>
                                ))}
                            </Select>
                            <Button style={{ marginLeft: 8 }}><DeleteOutlined />Delete</Button>
                        </>
                    }
                >
                    <Table 
                        rowKey="id"
                        rowSelection={rowSelection}
                        dataSource={filteredList} 
                        columns={columns} 
                    />
                </Card>
            </Col>
        </Row>
    )
}