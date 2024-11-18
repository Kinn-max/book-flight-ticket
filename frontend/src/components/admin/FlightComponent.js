
import React, { useEffect, useState } from 'react'
import { Flex, Space, Spin, Table, Tag } from 'antd';
import { getAllAirport } from '../../api/AirportApi';
import Loading from '../../util/Loading';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
export default function FlightComponent() {
    const [loading,setLoading] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
        setLoading(true)
            try {
                const data = await getAllAirport();
                if (data) {
                    console.log(data)
                }
            } catch (error) {
              console.log(error)
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
   if(loading) return(
         <Loading/>
    )
  return (
    <div>
        
      <h1>Airport Information</h1>
      <Table columns={columns} dataSource={data} />;
    </div>
  )
}
