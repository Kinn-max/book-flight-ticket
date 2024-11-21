import React, { useEffect, useState } from 'react';
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Select,
} from 'antd';
import { getAllAirport } from '../../../api/AirportApi';
import { getAllPlane } from '../../../api/PlaneApi';

export default function FlightDetail() {
  const [airport, setAirport] = useState([]);
  const [planes, setPlane] = useState([]);
  const [form] = Form.useForm(); // Để quản lý form

  // Fetch airport data
  const fetchAirport = async () => {
    try {
      const response = await getAllAirport();
      if (response) {
        console.log(response);
        setAirport(response);
      }
    } catch (error) {
      message.error('Failed to fetch airports!');
    }
  };

  // Fetch plane data
  const fetchData = async () => {
    try {
      const apiData = await getAllPlane();
      if (apiData) {
        console.log(apiData);
        setPlane(apiData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAirport();
    fetchData();
  }, []);

  const onFinish = (values) => {
    console.log(values);
    // Handle form submission here
  };

  return (
    <Form
      form={form}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: 'middle',
      }}
      size="middle"
      style={{
        maxWidth: 1200,
        margin: '0 auto',
      }}
      onFinish={onFinish} // Khi submit form
    >
      <Form.Item label="Mã máy bay" name="planeCode">
        <Input />
      </Form.Item>
      <Form.Item label="Sân bay đi" name="departureAirport" rules={[{ required: true, message: 'Please select a departure airport!' }]}>
        <Select>
          {airport.map((airport) => (
            <Select.Option key={airport.id} value={airport.id}>
              {airport.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Sân bay đến" name="arrivalAirport" rules={[{ required: true, message: 'Please select an arrival airport!' }]}>
        <Select>
          {airport.map((airport) => (
            <Select.Option key={airport.id} value={airport.id}>
              {airport.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Thời gian khởi hành" name="departureTime" rules={[{ required: true, message: 'Please select a departure time!' }]}>
        <DatePicker showTime />
      </Form.Item>
      <Form.Item label="Thời gian đến" name="arrivalTime" rules={[{ required: true, message: 'Please select an arrival time!' }]}>
        <DatePicker showTime />
      </Form.Item>
      <Form.Item label="Giá ghế thường" name="economySeatPrice" rules={[{ required: true, message: 'Please input the economy seat price!' }]}>
        <InputNumber min={0} />
      </Form.Item>
      <Form.Item label="Giá ghế thương gia" name="businessSeatPrice" rules={[{ required: true, message: 'Please input the business seat price!' }]}>
        <InputNumber min={0} />
      </Form.Item>
      <Form.Item label="Thuộc máy bay" name="planeId" rules={[{ required: true, message: 'Please select a plane!' }]}>
        <Select>
          {planes.map((plane) => (
            <Select.Option key={plane.id} value={plane.id}>
              {plane.name}({plane.nameAirline})
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <div style={{ textAlign: 'center' }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
}
