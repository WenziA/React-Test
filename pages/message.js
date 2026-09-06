import { Row, Col, Card, Input, Select, Form, Button, Table, Avatar, message, Modal } from 'antd'
import { FolderOpenOutlined, InboxOutlined, BlockOutlined, CalendarOutlined, StarOutlined, ReloadOutlined, StarFilled, DeleteOutlined, ExportOutlined, LikeOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import request from './api/request'

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
  background-color: ${props => props.$active ? '#e6f7ff !important' : 'transparent !important'};
  color: ${props => props.$active ? '#1890ff !important' : '#000 !important'};
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
  { key: 'Starred', label: 'Starred Tickets', icon: <StarOutlined /> },
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
                {record.tag && record.archived===false ? (
                  <>
                    <StyleDot>● </StyleDot>
                    {record.tag}
                  </>
                ) : null}
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

    const [activeFolder, setActiveFolder] = useState(folderItems[0]?.key)
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedStarOption, setSelectedStarOption] = useState('')
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true)

    const loadData = async ()=>{
        setLoading(true)
        setActiveFolder(folderItems[0]?.key)
        setSelectedRowKeys([])  
        try {
          const res = await request.get('/api/getMsg')
          setTableData(res)
        } catch (error) {
          console.error('拉取消息失败', error)
        } finally {
          setLoading(false)
        }
    }

    useEffect(()=>{
      loadData();
    },[])

    
    const handleFolderClick = (item) => {
        setActiveFolder(item.key)
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys, selectedRows) => {

        setSelectedRowKeys(newSelectedRowKeys)
        console.log('选中id集合:', newSelectedRowKeys)
        console.log('选中完整行数据:', selectedRows)
      }
    };

    const filteredList = tableData.filter(item => {
        switch (activeFolder) {
            // 收件箱：已存档为 false
          case 'Inbox':
            return item.archived === false
            // 存档：已存档为 true
          case 'Archive':
            return item.archived === true
            // 标星：已标星为 true
          case 'Starred':
            return item.starred === true
          default:
            return true
        }
    })

    // ========= 批量标记归档 =========
    const handleArchive = () => {
      if (!selectedRowKeys || selectedRowKeys.length === 0) {
        message.warning('请先勾选要标记的数据')
        return
      }

      // 模拟接口调用
      // await request.post('/api/xxxxx', { ids: selectedRowKeys })

      // 修改字段 archived:true
      setTableData(prev => prev.map(item => {
        if (selectedRowKeys.includes(item.id)) {
          return { ...item, archived: true }
        }
        return item
      }))

      message.success(`已点赞${selectedRowKeys.length}条为已归档
        
        `)
      setSelectedRowKeys([]) // 清空勾选框
    }

    // ========= 批量点赞 =========
    const handleStar =(color)=> {
      if (!selectedRowKeys || selectedRowKeys.length === 0) {
        message.warning('请先勾选要标记的数据')
        return
      }

      // 模拟接口调用
      // await request.post('/api/xxxx', { ids: selectedRowKeys })

      // 修改字段 starred:true 和 starColor
      setTableData(prev => prev.map(item => {
        if (selectedRowKeys.includes(item.id)) {
          return { 
            ...item, 
            starred: true, 
            starColor: color || '#ff6b35' 
          }
        }
        return item
      }))

      message.success(`已为${selectedRowKeys.length}条消息点赞`)
      setSelectedRowKeys([]) // 清空勾选框
    }

    const handleDelete= () => {
      if (!selectedRowKeys || selectedRowKeys.length === 0) {
        message.warning('请先勾选要删除的数据')
        return
      }

      Modal.confirm({
        title: '确认删除',
        content: `确定要删除选中的 ${selectedRowKeys.length} 条消息吗？删除后无法恢复`,
        okText: '确认删除',
        cancelText: '取消',
        onOk: async () => {
          // -------- 如果需要调用后端删除接口写在这里 --------
          // await request.post('/api/xxxxx', { ids: selectedRowKeys })

          const newTableData = tableData.filter(row => !selectedRowKeys.includes(row.id))
          setTableData(newTableData)
          setSelectedRowKeys([])
          message.success('删除成功')
        }
      })
    }
    
    return (
        <Row gutter={16}>
            <Col span={4}>
                <StyleMarginBottomCard title="Folder" variant="borderless">
                    {folderItems.map(item => (
                        <StyleArchiveButton
                            key={item.key}
                            block
                            type= "text"
                            onClick={() => handleFolderClick({ key: item.key})}
                            $active={activeFolder === item.key}
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
                            <StyleRightButton type="primary" onClick={loadData}><ReloadOutlined />REFRESH</StyleRightButton>
                            <Button onClick={handleArchive}><InboxOutlined />Archive</Button>
                            <StyleSelect
                                placeholder={
                                    <StyleSpan>
                                        <StarOutlined />
                                        <span>Star</span>
                                    </StyleSpan>
                                }
                                dropdownMatchSelectWidth={false}
                                onChange={(value) => {
                                    const obj = starOptions.find(e => e.value === value)
                                    setSelectedStarOption(obj.color)
                                    handleStar(obj.color)
                                }}
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
                            <Button onClick={handleDelete}><DeleteOutlined />Delete</Button>
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