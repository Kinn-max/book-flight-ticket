
import React, { useEffect, useState } from 'react'
import { Button, Flex, Form, message, Space, Spin, Switch, Table, Tag, Tooltip } from 'antd';
import Loading from '../../util/Loading';
import { getAllFlights } from '../../api/FlightApi';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import { Link, useLocation } from 'react-router-dom';

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
              <Tooltip title="Search">
                  <Button type="default" shape="circle" icon={<EditOutlined />}  onClick={() => handleSearch(record)} />
              </Tooltip>
          </span>
      ),
  },
  ];
  const location = useLocation();
  const newPath = `${location.pathname}/create`;
  const [data, setData] = useState([]);
  const [loading,setLoading] = useState(false)
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
  const openModal = (record = null) => {
    
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
    </div>
  )
}

