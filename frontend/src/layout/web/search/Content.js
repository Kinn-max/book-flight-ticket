import React, { useState } from 'react'
import { Card, Button, Row, Col, Tag, Tabs, Tooltip, Drawer } from 'antd';
import { CheckCircleOutlined, InfoCircleOutlined, SearchOutlined } from '@ant-design/icons';
export default function Content() {
  const items = [
    {
      key: '1',
      label: (
        <span>
          <InfoCircleOutlined style={{ marginRight: '5px' }} />
          Chi tiết
        </span>
      ),
      children: <p>Thông tin chi tiết chuyến bay...</p>,
    },
    {
      key: '2',
      label: (
        <span>
          <CheckCircleOutlined style={{ marginRight: '5px' }} />
          Các lợi ích đi kèm
        </span>
      ),
      children: <p>Các lợi ích đi kèm với vé...</p>,
    },
    {
      key: '3',
      label: (
        <span>
          <InfoCircleOutlined style={{ marginRight: '5px' }} />
          Hoàn vé
        </span>
      ),
      children: <p>Chính sách hoàn vé...</p>,
    },
    {
      key: '4',
      label: (
        <span>
          <InfoCircleOutlined style={{ marginRight: '5px' }} />
          Đổi lịch
        </span>
      ),
      children: <p>Chính sách đổi lịch chuyến bay...</p>,
    },
    {
      key: '5',
      label: (
        <span>
          <InfoCircleOutlined style={{ marginRight: '5px' }} />
          Khuyến mãi
        </span>
      ),
      children: <p>Các chương trình khuyến mãi hiện có...</p>,
    },
  ];
  const items2 = [
    {
      key: '1',
      label: (
        <span className='' >
          <InfoCircleOutlined style={{ marginRight: '5px' }} />
          Chi tiết
        </span>
      ),
    },
    {
      key: '2',
      label: (
        <span>
          <CheckCircleOutlined style={{ marginRight: '5px' }} />
          Các lợi ích đi kèm
        </span>
      ),
     
    },
    {
      key: '3',
      label: (
        <span>
          <InfoCircleOutlined style={{ marginRight: '5px' }} />
          Hoàn vé
        </span>
      ),
    
    },
    {
      key: '4',
      label: (
        <span>
          <InfoCircleOutlined style={{ marginRight: '5px' }} />
          Đổi lịch
        </span>
      ),

    },
    {
      key: '5',
      label: (
        <span>
          <InfoCircleOutlined style={{ marginRight: '5px' }} />
          Khuyến mãi
        </span>
      ),
  
    },
  ];
  const [activeTabKey, setActiveTabKey] = useState('1');
  const [showTab,setShowTab] = useState(false)
  const [open, setOpen] = useState(false);
  const handleCardClick = () => {
    setActiveTabKey('1'); 
  };
  const handleShowTab = ()=>{
    setShowTab(pre=>!pre)
  }
  const onClose = () => {
    setOpen(false);
  };
  const showDrawer = () => {
    setOpen(true);
  };
  return (
    <div>
        <Card
          bordered
          style={{
            borderRadius: '10px',
            margin: '10px 0',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div className='background_title-search'>
            <Row align="middle" >
                <Col span={12}>
                  <Card
                    bordered
                    style={{
                      borderRadius: '10px',
                      margin: '10px 0',
                    }}
                  >
                  <div>TP HCM (SGN) → Hà Nội (HAN)</div>
                  <Tooltip title="Search" onClick={showDrawer}>
                      <Button type="default" shape="circle" icon={<SearchOutlined />}  />
                  </Tooltip>
                  </Card>
                </Col>
                <Col span={16} >
                  <Card
                    bordered
                    style={{
                      borderRadius: '10px',
                      margin: '10px 0',
                    }}
                  >
                  <div>Thứ 3, 26th11</div>
                  <span>2.190.262 vnd</span>
                  </Card>
                </Col>
            </Row>
          </div>
        </Card>
        <h5>Tất cả chuyến bay</h5>
        <div>
        <Card
          bordered
          style={{
            borderRadius: '10px',
            margin: '10px 0',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
          onClick={handleShowTab}
        >
          <Row align="middle">
            <Col span={4} style={{ textAlign: 'center' }}>
              <img
                src="https://ik.imagekit.io/tvlk/image/imageResource/2020/02/19/1582084897287-d2de240a06eac5e3a70126425b62ee0b.png"
                alt="Bamboo Airways"
                style={{ width: '50px', height: 'auto' }}
              />
            </Col>
            <Col span={12}>
              <h3 className='text-start'>Bamboo Airways</h3>
              <Row>
                <Col span={8}>
                  <div>23:20</div>
                  <div style={{ color: 'gray' }}>SGN</div>
                </Col>
                <Col span={8} style={{ textAlign: 'center' }}>
                  <div>2h 5m</div>
                  <div className='process-flight'></div>
                  <div style={{ fontSize: '12px', color: 'gray' }}>Bay thẳng</div>
                </Col>
                <Col span={8} style={{ textAlign: 'right' }}>
                  <div>01:25</div>
                  <div style={{ color: 'gray' }}>HAN</div>
                </Col>
              </Row>
            </Col>
            <Col span={8} style={{ textAlign: 'right' }}>
              <div className='d-flex align-items-center justify-content-end'>
                <div style={{ fontSize: '20px', color: 'red' }}>
                  2.019.985 VND
                </div>
                <div style={{ fontSize: '15px', color: 'gray' }}>/khách</div>
              </div>
              <Button type="primary" style={{ borderRadius: '5px' }}>
                Chọn
              </Button>
            </Col>
          </Row>
          {!showTab &&(<Tabs
                onClick={handleShowTab}
                activeKey={null} 
                onChange={setActiveTabKey} 
                items={items2}
                style={{ marginTop: '10px', fontSize: '12px' }}
            />)}
          {showTab &&(<Tabs
                activeKey={activeTabKey} 
                onChange={setActiveTabKey} 
                items={items}
                style={{ marginTop: '10px', fontSize: '12px' }}
            />)}

        </Card>
        <Drawer
          placement="top"
          closable={false}
          onClose={onClose}
          open={open}
          key="top"
          className='d-flex '
          style={{width:"1000px", margin:"0 auto" ,marginTop:"100px",borderRadius:"10px"}}
        >
          <p>Từ</p>
          <p>Đến</p>
          <p>Ngày</p>
          <p>Hạng ghế</p>
          <Button>
            Tìm
          </Button>
        </Drawer>
        </div>
    </div>
  )
}