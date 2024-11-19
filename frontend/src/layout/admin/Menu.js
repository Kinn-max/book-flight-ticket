import React from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Menu, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return { key, icon, children, label };
}

const items = [
  getItem('Quản lý chuyến bay', '/flight', <PieChartOutlined />),
  getItem('Quản lý sân bay', '/airport', <DesktopOutlined />),
  getItem('Files', '3', <FileOutlined />),
];

const SidebarComponent = ({ collapsed, onCollapse }) => {
  const navigate = useNavigate();

  const handleMenuClick = ({ key }) => {
    navigate(`/admin${key}`); 
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div>
        <img 
          src='https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/9/97f3e7a54e9c6987283b78e016664776.svg' 
          alt='Logo'
        />
      </div>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        defaultSelectedKeys={['/admin/flight']} 
        onClick={handleMenuClick} 
        mode="inline"
        items={items}
      />
    </Sider>
  );
};

export default SidebarComponent;
