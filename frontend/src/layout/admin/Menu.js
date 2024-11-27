import React from "react"
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
} from "@ant-design/icons"
import { Menu, Layout } from "antd"
import { useNavigate } from "react-router-dom"
import logo from "../../assets/image/logo_flight.png"

const { Sider } = Layout

function getItem(label, key, icon, children) {
  return { key, icon, children, label }
}

const items = [
  getItem("Quản lý Doanh thu", "/dashboard", <DesktopOutlined />),
  getItem("Quản lý máy bay", "/plane", <DesktopOutlined />),
  getItem("Quản lý sân bay", "/airport", <DesktopOutlined />),
  getItem("Quản lý hãng máy bay", "/airline", <FileOutlined />),
  getItem("Quản lý chuyến bay", "/flight", <PieChartOutlined />),
]

const SidebarComponent = ({ collapsed, onCollapse }) => {
  const navigate = useNavigate()

  const handleMenuClick = ({ key }) => {
    navigate(`/admin${key}`)
  }

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
     <div class="demo-logo">
        <img src={logo} style={{width: "50px"}}/>
     </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={["/admin/flight"]}
        onClick={handleMenuClick}
        mode="inline"
        items={items}
      />
    </Sider>
  )
}

export default SidebarComponent
