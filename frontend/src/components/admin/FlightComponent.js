
import React, { useEffect, useState } from 'react'
import { Button, Card, Flex, Form, List, message, Modal, Space, Spin, Switch, Table, Tag, Tooltip } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import Loading from '../../util/Loading';
import { getAllFlights, getFlightById } from '../../api/FlightApi';
import { EditOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import { Link, useLocation } from 'react-router-dom';
import IconContext from '@ant-design/icons/lib/components/Context';


export default function FlightComponent() {
  const columns = [
    {
      title: 'Stt',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Airline',
      dataIndex: 'airline',
      key: 'airline',
    },
    {
      title: 'Departure Time',
      dataIndex: 'departureTime',
      key: 'departureTime',
    },
    {
      title: 'Arrival Time',
      dataIndex: 'arrivalTime',
      key: 'arrivalTime',
    },
    {
      title: 'Departure Airport',
      dataIndex: 'departureAirport',
      key: 'departureAirport',
    },
    {
      title: 'Arrival Airport',
      dataIndex: 'arrivalAirport',
      key: 'arrivalAirport',
    },
    {
      title: 'Show/Hidden',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => (
        <span>
          <Form.Item label="Switch" valuePropName="checked">
            <Switch 
              checked={record.status} 
              onChange={(checked) => handleStatusChange(checked, record.key)} 
            />
          </Form.Item>
        </span>
      ),
    },  
    {
      title: 'Option',
      key: 'option',
      render: (_, record) => (
          <span>
              <Tooltip title="Edit">
                  <Button type="default" shape="circle" icon={<EditOutlined />} />
              </Tooltip>
              |
              <Tooltip title="Search">
                  <Button type="default" shape="circle" icon={<SearchOutlined />}  onClick={() => showModal(record)} />
              </Tooltip>
          </span>
      ),
  },
  ];
  const location = useLocation();
  const newPath = `${location.pathname}/create`;
  const [data, setData] = useState([]);
  const [dataSeat, setDataSeat] = useState([]);
  const [flightInfo, setFlightInfo] = useState({});
  const [loading,setLoading] = useState(false)
  const [open, setOpen] = useState(false);
  const fetchFlight = async () => {
      setLoading(true);
      try {
          const response = await  getAllFlights();
          console.log(response)
          if(response){
              const tableData = response.map((flight, index) => ({
                  key: flight.id,
                  stt: index + 1,
                  code: flight.codeFlight,
                  airline: flight.airline,
                  departureTime: new Date(flight.departureTime).toLocaleString(), 
                  arrivalTime: new Date(flight.arrivalTime).toLocaleString(),
                  departureAirport:flight.departureAirport,
                  arrivalAirport:flight.arrivalAirport,
                  status:flight.status
              }));
              setData(tableData);

          }
      } catch (error) {
          message.error('Failed to fetch airlines!');
      } finally {
          setLoading(false);
      }
  };
  useEffect(() => {
    fetchFlight();
  }, []);
   if(loading) return(
         <Loading/>
    )
    const handleStatusChange = (checked, key) => {
      console.log(key,checked)
  }
  const handleSearch = (record)=>{
    console.log(record)
  }

  const showModal = (record) => {
    const fetchFlight = async () => {
      setLoading(true);
      try {
          const response = await  getFlightById(record.key);
          console.log(response)
          if(response){
            setFlightInfo({
              code: response.codeFlight,
              airline: response.airline,
              departureTime: new Date(response.departureTime).toLocaleString(),
              arrivalTime: new Date(response.arrivalTime).toLocaleString(),
              departureAirport: response.departureAirport,
              arrivalAirport: response.arrivalAirport,           
              busPrice: response.busPrice.toLocaleString() + " VND",
              ecoPrice: response.ecoPrice.toLocaleString() + " VND",   
              busClass: response.plane.busClass,      
              ecoClass: response.plane.ecoClass, 
              planeName:response.plane.name,
              logoAirline: response.logoAirline
            });
            setDataSeat(response.seats);
            console.log(flightInfo)
          }
      } catch (error) {
          message.error('Failed to fetch airlines!');
      } finally {
          setLoading(false);
      }
    };
    fetchFlight()
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const onSearch = (value, _e, info) => console.log(info?.source, value);
  return (
    <div>
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h1>Flight Information</h1>
          <Link to={newPath}>
            <Button type="primary" icon={<PlusOutlined />} >
                Add Flight
            </Button>
          </Link>
        </div>
      <div className='d-flex justify-content-end pb-4'>
         <Search
            placeholder="Search by flight code!"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
            style={{
              width: 500,
            }}
          />
      </div>
      <Table columns={columns} dataSource={data} />;
      <Modal
        open={open}
        title="Flight Information"
        onCancel={handleCancel}
        footer={null}
        className="custom-modal"
        width={1200}
      >
        <div className='d-flex'>
          <div className='col-6'>
            {flightInfo&& (<Card
              title= {`Chuyến bay ${flightInfo.code}`}
              bordered={false}
              style={{
                width: '100%', 
                boxShadow: 'none'
              }}
            >
              <div className='d-flex justify-content-center align-items-center pb-5'>
                <img style={{ width: "100px", height: "100px" }} src={flightInfo.logoAirline} alt="Logo Airline" />
              </div>
               <div className='d-flex justify-content-between px-5'>
                 <p>Hãng máy bay: {flightInfo.airline}</p>
                 <p >Tên máy bay: {flightInfo.planeName}</p>
               </div>
             <div className='d-flex justify-content-between px-5'>
                <p>Sân bay đi: {flightInfo.departureAirport}</p>
                <p>Thời gian đi: {flightInfo.departureTime}</p>
              </div>
             <div className='d-flex justify-content-between px-5'>
                <p >Sân bay đến: {flightInfo.arrivalAirport}</p>
                <p>Thời gian đến: {flightInfo.arrivalTime}</p>
              </div>
             <div className='d-flex justify-content-between px-5'>
                <p >Giá vé thường: {(flightInfo.ecoPrice)}</p>
                <p>Giá vé thương gia: {flightInfo.busPrice}</p>
              </div>
             <div className='d-flex justify-content-between px-5'>
                <p >Số ghế thường: {flightInfo.ecoClass} ghế</p>
                <p>Số ghế thương gia: {flightInfo.busClass} ghế</p>
              </div>
            </Card>)}
          </div>
          <div className='col-6'>
            <List
              itemLayout="vertical"
              size="small"
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 5,
              }}
              dataSource={dataSeat}
              renderItem={(item) => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                      title={ <>
                        Tên ghế: {item.seatNumber} / Thuộc loại: {item.seatClass} <br />
                        Trạng thái:{" "}
                        <span
                          className={`badge ${!item.available ? 'bg-success' : 'bg-danger'} rounded-pill`}
                        >
                          {!item.available ? "Đã đặt" : "Đang trống"}
                        </span>
                      </>}
                  />
                </List.Item>
              )}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}

