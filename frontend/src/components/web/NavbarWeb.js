import { Layout, Menu } from "antd"
import { Header } from "antd/es/layout/layout"
import React, { useEffect, useState } from "react"
import { Button, Modal, Checkbox, Form, Input, Flex } from "antd"
import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { login } from "../../api/UserApi"
import Loading from "../../util/Loading"
import { jwtDecode } from "jwt-decode"

const items1 = ["Chuyến bay", "Săn vé rẻ", "Blog du lịch"].map(
  (key, index) => ({
    key: index,
    label: key,
  })
)
export default function NavbarWeb() {
  const [open, setOpen] = useState(false)
  const [openRegister, setOpenRegister] = useState(false)
  const showModalRegister = () => {
    setOpenRegister(true)
  }
  const showModal = () => {
    setOpen(true)
  }
  const handleOk = (e) => {
    setOpen(false)
  }
  const handleOkRegister = (e) => {
    setOpenRegister(false)
  }
  const handleCancel = (e) => {
    setOpen(false)
  }
  const handleCancelRegister = (e) => {
    setOpenRegister(false)
  }
  const onFinish = async (values) => {
    const data = {
      email: values.username,
      password: values.password,
    }
    try {
      const result = await login(data)
      if (result) {
        const token = localStorage.getItem("jwtToken")
        if (token) {
          const userData = jwtDecode(token)
          if (userData && userData.role) {
            console.log(userData.role)
            if (userData.role === "ADMIN" || userData.role === "STAFF") {
              setTimeout(() => {
                window.location.href = "/admin/dashboard"
              }, 2000)
            } else {
              setTimeout(() => {
                window.location.href = "/"
              }, 2000)
            }
          }
        }
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <div>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo">
          <img
            src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/9/97f3e7a54e9c6987283b78e016664776.svg"
            style={{ width: 150 }}
          />
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["0"]}
          items={items1}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
        <div>
          <Button type="primary" onClick={showModal}>
            Đăng nhập
          </Button>
          <Button type="primary" onClick={showModalRegister}>
            Đăng ký
          </Button>
          <Modal
            title="Đăng nhập ngay!"
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <Form
              name="login"
              initialValues={{
                remember: true,
              }}
              style={{
                maxWidth: "100%",
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your Username!",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Flex justify="space-between" align="center">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                  <a href="">Forgot password</a>
                </Flex>
              </Form.Item>
              <Form.Item>
                <Button block type="primary" htmlType="submit">
                  Log in
                </Button>
                or <a href="">Register now!</a>
              </Form.Item>
            </Form>
          </Modal>
          <Modal
            title="Đăng ký ngay!"
            open={openRegister}
            onOk={handleOkRegister}
            onCancel={handleCancelRegister}
            footer={null}
          >
            <Form
              name="login"
              initialValues={{
                remember: true,
              }}
              style={{
                maxWidth: "100%",
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your Username!",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" />
              </Form.Item>
              <Form.Item
                name="Số điện thoại"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined />}
                  type="number"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item
                name="Email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined />}
                  type="text"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item
                name="Mật khẩu"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item
                name="Nhập lại mật khẩu"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Button block type="primary" htmlType="submit">
                  Register
                </Button>
                or <a href="">Login now!</a>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </Header>
    </div>
  )
}
