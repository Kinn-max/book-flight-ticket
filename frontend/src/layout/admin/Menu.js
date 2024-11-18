
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
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse} 
    >
      <div className="demo-logo-vertical " />
      <Menu
        theme="dark"
        defaultSelectedKeys={['/admin/flights']}
        onClick={handleMenuClick} 
        mode="inline"
        items={items}
      />
    </Sider>
  );
};

export default SidebarComponent;
