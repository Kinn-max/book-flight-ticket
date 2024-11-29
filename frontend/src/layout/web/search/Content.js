import React, { useState } from "react"
import {
  Card,
  Button,
  Row,
  Col,
  Tag,
  Tabs,
  Tooltip,
  Drawer,
  Form,
  Select,
  DatePicker,
  Carousel,
} from "antd"
import {
  CheckCircleOutlined,
  InfoCircleOutlined,
  LeftOutlined,
  RightOutlined,
  SearchOutlined,
} from "@ant-design/icons"
const carouselItems = [
  {
    day: "Thứ 6, 29 thg 11",
    price: "2.622.000 VND",
  },
  {
    day: "Thứ 7, 30 thg 11",
    price: "2.157.000 VND",
  },
  {
    day: "CN, 1 thg 12",
    price: "2.093.000 VND",
  },
  {
    day: "Thứ 2, 2 thg 12",
    price: "1.779.000 VND",
  },
  {
    day: "Thứ 3, 3 thg 12",
    price: "1.726.000 VND",
  },
]
export default function Content() {
  const items = [
    {
      key: "1",
      label: (
        <span>
          <InfoCircleOutlined style={{ marginRight: "5px" }} />
          Chi tiết
        </span>
      ),
      children: <p>Thông tin chi tiết chuyến bay...</p>,
    },
    {
      key: "2",
      label: (
        <span>
          <CheckCircleOutlined style={{ marginRight: "5px" }} />
          Các lợi ích đi kèm
        </span>
      ),
      children: <p>Các lợi ích đi kèm với vé...</p>,
    },
    {
      key: "3",
      label: (
        <span>
          <InfoCircleOutlined style={{ marginRight: "5px" }} />
          Hoàn vé
        </span>
      ),
      children: <p>Chính sách hoàn vé...</p>,
    },
    {
      key: "4",
      label: (
        <span>
          <InfoCircleOutlined style={{ marginRight: "5px" }} />
          Đổi lịch
        </span>
      ),
      children: <p>Chính sách đổi lịch chuyến bay...</p>,
    },
    {
      key: "5",
      label: (
        <span>
          <InfoCircleOutlined style={{ marginRight: "5px" }} />
          Khuyến mãi
        </span>
      ),
      children: <p>Các chương trình khuyến mãi hiện có...</p>,
    },
  ]
  const items2 = [
    {
      key: "1",
      label: (
        <span className="">
          <InfoCircleOutlined style={{ marginRight: "5px" }} />
          Chi tiết
        </span>
      ),
    },
    {
      key: "2",
      label: (
        <span>
          <CheckCircleOutlined style={{ marginRight: "5px" }} />
          Các lợi ích đi kèm
        </span>
      ),
    },
    {
      key: "3",
      label: (
        <span>
          <InfoCircleOutlined style={{ marginRight: "5px" }} />
          Hoàn vé
        </span>
      ),
    },
    {
      key: "4",
      label: (
        <span>
          <InfoCircleOutlined style={{ marginRight: "5px" }} />
          Đổi lịch
        </span>
      ),
    },
    {
      key: "5",
      label: (
        <span>
          <InfoCircleOutlined style={{ marginRight: "5px" }} />
          Khuyến mãi
        </span>
      ),
    },
  ]
  const [activeTabKey, setActiveTabKey] = useState("1")
  const [showTab, setShowTab] = useState(false)
  const [open, setOpen] = useState(false)
  const [openRight, setOpenRight] = useState(false)
  const [form] = Form.useForm()
  const handleCardClick = () => {
    setActiveTabKey("1")
  }
  const handleShowTab = () => {
    setShowTab((pre) => !pre)
  }
  const onClose = () => {
    setOpen(false)
  }
  const showDrawer = () => {
    setOpen(true)
  }
  const carouselRef = React.useRef(null)

  const nextSlide = () => {
    carouselRef.current.next()
  }

  const prevSlide = () => {
    carouselRef.current.prev()
  }
  const showDrawerRight = () => {
    setOpenRight(true)
  }
  const onCloseRight = () => {
    setOpenRight(false)
  }
  const onFinish = async (values) => {}
  return (
    <div>
      <Card
        bordered
        style={{
          borderRadius: "10px",
          margin: "10px 0",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="background_title-search">
          <Row align="middle">
            <Col span={16}>
              <Card
                bordered
                style={{
                  borderRadius: "10px",
                  margin: "0px 0",
                }}
              >
                <div className="d-flex justify-content-between text-start">
                  <div>
                    <div className="fs-5 fw-bold">
                      TP HCM (SGN) → Hà Nội (HAN)
                    </div>
                    <div>Thứ 7, 30 th 11 2024 | Phổ thông</div>
                  </div>
                  <Tooltip title="Search" onClick={showDrawer}>
                    <Button
                      type="default"
                      shape="circle"
                      icon={<SearchOutlined />}
                    />
                  </Tooltip>
                </div>
              </Card>
            </Col>
            <Drawer
              placement="top"
              closable={false}
              onClose={onClose}
              open={open}
              key="top"
              className="d-flex "
              style={{
                width: "1000px",
                margin: "0 auto",
                marginTop: "100px",
                borderRadius: "10px",
              }}
            >
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
                  size: "middle",
                }}
                size="middle"
                style={{
                  maxWidth: 1200,
                  margin: "0 auto",
                }}
                onFinish={onFinish} // Khi submit form
              >
                <div>
                  <Form.Item label="Sân bay đi" name="departure">
                    <Select>
                      <Select.Option key={0} value={"1"}>
                        hi
                      </Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Sân bay đến" name="arrival">
                    <Select>
                      <Select.Option key={0} value={"1"}>
                        hi
                      </Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Ngày đi" name="time">
                    <DatePicker />
                  </Form.Item>
                  <Button
                    type="primary"
                    className="d-flex justify-content-end"
                    danger
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg>
                    Tìm chuyến bay
                  </Button>
                </div>
              </Form>
            </Drawer>
            <Col span={24}>
              <Card
                bordered
                style={{
                  borderRadius: "10px",
                  margin: "10px 0",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    margin: "0 auto",
                  }}
                >
                  <Carousel
                    ref={carouselRef}
                    dots={false}
                    slidesToShow={6}
                    slidesToScroll={1}
                    style={{
                      backgroundColor: "#1976d2",
                      padding: "20px",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  >
                    {carouselItems.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          textAlign: "center",
                          padding: "10px",
                          background: "#fff",
                          color: "#1976d2",
                          borderRadius: "8px",
                          margin: "5px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ fontWeight: "bold" }}>{item.day}</span>
                        <span>{item.price}</span>
                      </div>
                    ))}
                  </Carousel>

                  <Button
                    onClick={prevSlide}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "-40px",
                      transform: "translateY(-50%)",
                      backgroundColor: "#0056b3",
                      color: "#fff",
                      border: "none",
                    }}
                    icon={<LeftOutlined />}
                  />

                  <Button
                    onClick={nextSlide}
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "-40px",
                      transform: "translateY(-50%)",
                      backgroundColor: "#0056b3",
                      color: "#fff",
                      border: "none",
                    }}
                    icon={<RightOutlined />}
                  />
                </div>
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
            borderRadius: "10px",
            margin: "10px 0",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
          onClick={handleShowTab}
        >
          <Row align="middle">
            <Col span={4} style={{ textAlign: "center" }}>
              <img
                src="https://ik.imagekit.io/tvlk/image/imageResource/2020/02/19/1582084897287-d2de240a06eac5e3a70126425b62ee0b.png"
                alt="Bamboo Airways"
                style={{ width: "50px", height: "auto" }}
              />
            </Col>
            <Col span={12}>
              <h3 className="text-start">Bamboo Airways</h3>
              <Row>
                <Col span={8}>
                  <div>23:20</div>
                  <div style={{ color: "gray" }}>SGN</div>
                </Col>
                <Col span={8} style={{ textAlign: "center" }}>
                  <div>2h 5m</div>
                  <div className="process-flight"></div>
                  <div style={{ fontSize: "12px", color: "gray" }}>
                    Bay thẳng
                  </div>
                </Col>
                <Col span={8} style={{ textAlign: "right" }}>
                  <div>01:25</div>
                  <div style={{ color: "gray" }}>HAN</div>
                </Col>
              </Row>
            </Col>
            <Col span={8} style={{ textAlign: "right" }}>
              <div className="d-flex align-items-center justify-content-end">
                <div style={{ fontSize: "20px", color: "red" }}>
                  2.019.985 VND
                </div>
                <div style={{ fontSize: "15px", color: "gray" }}>/khách</div>
              </div>
              <Button
                type="primary"
                style={{ borderRadius: "5px" }}
                onClick={showDrawerRight}
              >
                Chọn
              </Button>
            </Col>
            <Drawer
              title="Basic Drawer"
              placement="right"
              closable={false}
              onClose={onCloseRight}
              open={openRight}
              key="right"
            >
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </Drawer>
          </Row>
          {!showTab && (
            <Tabs
              onClick={handleShowTab}
              activeKey={null}
              onChange={setActiveTabKey}
              items={items2}
              style={{ marginTop: "10px", fontSize: "12px" }}
            />
          )}
          {showTab && (
            <Tabs
              activeKey={activeTabKey}
              onChange={setActiveTabKey}
              items={items}
              style={{ marginTop: "10px", fontSize: "12px" }}
            />
          )}
        </Card>
      </div>
    </div>
  )
}
