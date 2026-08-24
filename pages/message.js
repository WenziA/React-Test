import { Row, Col, Card, Input, Select, Form, Button, Table, Avatar } from 'antd'
import { FolderOpenOutlined, InboxOutlined, BlockOutlined, CalendarOutlined, StarOutlined, ReloadOutlined, StarFilled, DeleteOutlined, ExportOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import styled from 'styled-components'

const StyleStar = styled(StarFilled)`
  color: ${props => props.color};
`

const StyleUser = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const StyleTag = styled.div`
  font-size: 12px;
  color: #666;
`

const StyleDot = styled.span`
  color: #006eff;
`

const StyleDiv = styled.div`
  margin: 0;
  font-size: 12px;
  color: #666;
`

const StyleCenter = styled.div`
  text-align: center;
`

const StyleMarginBottomCard = styled(Card)`
  margin-bottom: 16px;
`

const StyleArchiveButton = styled(Button)`
  text-align: left;
  background: ${props => props.active ? '#e6f7ff' : 'transparent'};
  color: ${props => props.active ? '#387ccf' : '#000'};
`

const StyleSpan = styled.span`
  display: flex;
  align-items: center;
  gap: 12px;
`

const StyleRightButton = styled(Button)`
  margin-right: 8px;
`

const StyleSelect = styled(Select)`
  width: 110px;
  margin: 0 8px;
`

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

export default function  Message() {
    const columns = [
      { title: <StarOutlined />, dataIndex: 'star', key: 'star', width: 50 ,render: (value, record) => (
        <StyleStar color={record.starColor} />
      )},
      {
        title: 'User',
        dataIndex: 'user',
        key: 'user',
        render: (value, record) => (
          <StyleUser>
            <Avatar src={record.avatar} />
            <div>
              <div>{value}</div>
              <StyleTag>
                {record.tag && (
                  <>
                    <StyleDot>● </StyleDot>
                    {record.tag}
                  </>
                )}
              </StyleTag>
            </div>
          </StyleUser>
        ),
      },
      { 
        title: 'Property Name', 
        dataIndex: 'property', 
        key: 'property',
        render:(value,record)=>(
            <div>
                <a href=''>{value}</a>
                <StyleDiv>{record.propertyInfo}</StyleDiv>
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
                <StyleDiv>{record.descDetail}</StyleDiv>
            </div>
        ),
      },
      { 
        title: 'Update',
        dataIndex: 'update', 
        key: 'update',
        render:(value)=>(
          <StyleCenter>
            <a><ExportOutlined /></a>
            <StyleDiv>{value}</StyleDiv>
          </StyleCenter>
        )
      },
    ]

    const [activeFolder, setActiveFolder] = useState('Inbox')
    const [selectedRowKeys, setSelectedRowKeys] = useState();
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
      const tableData = async ()=>{
        try {
            const res = await fetch("/api/getMsg")
            const result = await res.json()
            setTableData(result)
        } catch (err) {
            console.error("请求失败：", err)
        } finally {
            setLoading(false)
        }
      }
      tableData();
    },[])

    
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
                <StyleMarginBottomCard title="Folder" variant="borderless">
                    {folderItems.map(item => (
                        <StyleArchiveButton
                            key={item.key}
                            block
                            type= "text"
                            onClick={() => handleFolderClick({ key: item.key })}
                        >
                            {item.icon}
                            {item.label}
                        </StyleArchiveButton>
                        ))}
                </StyleMarginBottomCard>
                <Card title="Filters" variant="borderless" >
                    <form>
                        <Form.Item name="selectOptions">
                            <Select
                                width="100%"
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
                            <StyleRightButton type="primary"><ReloadOutlined />REFRESH</StyleRightButton>
                            <Button><InboxOutlined />Archive</Button>
                            <StyleSelect
                                placeholder={
                                    <StyleSpan>
                                        <StarOutlined />
                                        <span>Star</span>
                                    </StyleSpan>
                                }
                                dropdownMatchSelectWidth={false}
                                >
                                {starOptions.map((item) => (
                                    <Select.Option key={item.value} value={item.value}>
                                        <StyleSpan>
                                            <StyleStar color={item.color} />
                                            <span>{item.label}</span>
                                        </StyleSpan>
                                    </Select.Option>
                                ))}
                            </StyleSelect>
                            <Button><DeleteOutlined />Delete</Button>
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