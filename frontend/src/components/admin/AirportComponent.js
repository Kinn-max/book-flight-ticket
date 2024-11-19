import React, { useEffect, useState } from 'react'
import { Button, Table, Tooltip, Popconfirm, message, Form, Input } from 'antd';
import { addAirport, getAllAirport } from '../../api/AirportApi';
import Loading from '../../util/Loading';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Modal } from 'antd';
export default function AirportComponent() {

  const columns = [
    {
      title: 'Stt',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Option',
      key: 'option',
      render: (_, record) => (
        <span>
          
          <Tooltip title="Edit">
            <Button 
              type="default" 
              shape="circle" 
              icon={<EditOutlined />} 
              onClick={() => handleEdit(record)} 
            />
          </Tooltip>
          |
          <Popconfirm
            title="Delete the airport?"
            description="Are you sure you want to delete this airport?"
            onConfirm={() => handleDelete(record)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete">
              <Button 
                type="danger" 
                shape="round" 
                icon={<DeleteOutlined />} 
              />
            </Tooltip>
          </Popconfirm>
        </span>
      ),
    },
  ];
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [reload, setReload] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const apiData = await getAllAirport();
        if (apiData) {
          const tableData = apiData.map((airport, index) => ({
            key: airport.id, 
            stt: index + 1,
            name: airport.name,
            location: airport.location,
          }));
          setData(tableData);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [reload]);

  if (loading) return <Loading />;

  const handleEdit = (record) => {
   
    console.log('Edit airport: ', record);
  };

  const handleDelete = (record) => {
   
    console.log('Delete airport: ', record);
    message.success('Airport deleted successfully!');
   
  };

  const cancel = () => {
    message.error('Action cancelled');
  };
  //form
  const handleCancel = () => {
    setOpen(false);
  };
  const onFinish = async() => {
    const data = {
      name:name,
      location:location
    }
    try {   
        const result = await addAirport(data);
        form.resetFields();
        setName("")
        setLocation("")
        setReload(prev => !prev);
        message.success(result)
      } catch (error) {
        console.error('Error:', error);
      }
  };
  return (
    <div>
      <div className='d-flex justify-content-between align-items-center' >
        <h1 className=''>Airport Information</h1>
        <span onClick={() => setOpen(true)} style={{cursor:"pointer"}}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-badge-plus"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><line x1="12" x2="12" y1="8" y2="16"/><line x1="8" x2="16" y1="12" y2="12"/></svg></span>
      </div>
      <Modal
        title="Tùy chọn  sân bay"
        centered
        open={open}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
      <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
          labelAlign="right" 
          form={form}
        >
        <Form.Item
          label="Tên sân bay"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your name !',
            },
          ]}
          
          className='text-start'
        >
          <Input value={name} onChange={(e)=>setName(e.target.value)}/>
        </Form.Item>

        <Form.Item
          label="Địa điểm sân bay"
          name="location"
          rules={[
            {
              required: true,
              message: 'Please input your location!',
            },
          ]}
        >
          <Input  value={location} onChange={(e)=>setLocation(e.target.value)}/>
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      </Modal>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
