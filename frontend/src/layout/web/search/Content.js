import React, { useEffect, useState } from "react"
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
  Timeline,
  Flex,
  message,
  Spin,
} from "antd"
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  InfoCircleOutlined,
  LeftOutlined,
  LoadingOutlined,
  RightOutlined,
  SearchOutlined,
} from "@ant-design/icons"
import { getDataSearchHome } from "../../../api/HomeApi"
import { searchByUser } from "../../../api/FlightApi"
import LoadingGuest from "../../../util/LoadingGuest"
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
  const rows = ["A", "B", "C", "D"]
  const columns = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
  const items = [
    {
      key: "1",
      label: (
        <span>
          <InfoCircleOutlined style={{ marginRight: "5px" }} />
          Chi tiết
        </span>
      ),
      children: (
        <Timeline mode="left">
          <Timeline.Item
            label="22:05"
            dot={
              <ClockCircleOutlined
                style={{ fontSize: "16px", color: "#1890ff" }}
              />
            }
          >
            <div>
              <strong>Hà Nội (HAN)</strong>
              <div style={{ color: "#888" }}>Sân bay Nội Bài</div>
              <div>
                <img
                  src="https://ik.imagekit.io/tvlk/image/imageResource/2020/02/19/1582084897287-d2de240a06eac5e3a70126425b62ee0b.png"
                  alt="Vietravel Airlines"
                  style={{ height: "20px", marginRight: "8px" }}
                />
                <strong>Vietravel Airlines</strong> - VU-797 • Khuyến mãi
              </div>
              <div style={{ color: "#777", fontSize: "12px" }}>
                Hành lý 0kg (mua khi đặt chỗ) • Hành lý xách tay 7kg
              </div>
              <a href="/" style={{ color: "#1890ff" }}>
                Xem giá hành lý mua thêm
              </a>
            </div>
          </Timeline.Item>

          <Timeline.Item label="2h 15m">
            <div>Thời gian bay: 2 giờ 15 phút</div>
          </Timeline.Item>
          <Timeline.Item
            label="00:20"
            dot={
              <ClockCircleOutlined
                style={{ fontSize: "16px", color: "#52c41a" }}
              />
            }
          >
            <div>
              <strong>TP HCM (SGN)</strong>
              <div style={{ color: "#888" }}>Sân bay Tân Sơn Nhất</div>
              <div>
                <strong>Airbus A321-100/200</strong>
              </div>
            </div>
          </Timeline.Item>
        </Timeline>
      ),
    },
    {
      key: "2",
      label: (
        <span>
          <CheckCircleOutlined style={{ marginRight: "5px" }} />
          Chọn vị trí ngồi
        </span>
      ),
      children: (
        <div
          style={{
            backgroundColor: "#34495e",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          {rows.map((row) => (
            <Row key={row} gutter={[8, 18]} justify="center">
              {columns.map((col) => (
                <Col key={`${row}${col}`}>
                  <Button
                    type="primary"
                    shape="round"
                    style={{
                      width: 30,
                      height: 30,
                      textAlign: "center",
                      lineHeight: "60px",
                      fontWeight: "bold",
                    }}
                  >
                    {`${row}${col}`}
                  </Button>
                </Col>
              ))}
            </Row>
          ))}
          <Flex gap="middle" wrap>
            <div style={{}}>
              <Button variant="solid">N</Button>
            </div>
            <Button className="" variant="solid">
              Y
            </Button>
          </Flex>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <span>
          <InfoCircleOutlined style={{ marginRight: "5px" }} />
          Khuyến mãi
        </span>
      ),
      children: <p>Các chương trình khuyến mãi hiện có...</p>,
    },
  ]
  const [activeTabKey, setActiveTabKey] = useState("1")
  const [showTab, setShowTab] = useState(false)
  const [open, setOpen] = useState(false)
  const [openRight, setOpenRight] = useState(false)
  const [form] = Form.useForm()
  const [listAirport, setListAirport] = useState([])
  const [seatClasses, setSeatClasses] = useState([])
  const [loading, setLoading] = useState(false)
  const handleCardClick = () => {
    setActiveTabKey("1")
  }
  const fetchDataSearchHome = async () => {
    try {
      const response = await getDataSearchHome()
      if (response.ok) {
        const result = await response.json()
        setListAirport(result.airportResponses)
        setSeatClasses(result.seatClasses)
        console.log(result)
      }
    } catch (error) {
      message.error("Failed to fetch airlines!")
    }
  }
  useEffect(() => {
    fetchDataSearchHome()
  }, [])
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
  if (loading) return <LoadingGuest />
  const nextSlide = () => {
    carouselRef.current.next()
  }

  const prevSlide = () => {
    carouselRef.current.prev()
  }
  const showDrawerRight = () => {
    setOpenRight(true)
    setShowTab(true)
  }
  const onCloseRight = () => {
    setOpenRight(false)
    setShowTab(false)
  }
  const searchBySearch = (values) => {
    const { departure, arrival, departureDate, seatClass } = values
    if (!departure) {
      message.error("Sân bay đi không được để trống!")
      return
    }

    if (!arrival) {
      message.error("Sân bay đến không được để trống!")
      return
    }

    if (!departureDate) {
      message.error("Ngày đi không được để trống!")
      return
    }

    if (!seatClass) {
      message.error("Hạng ghế không được để trống!")
      return
    }

    const data = {
      departure_airport: departure,
      arrival_airport: arrival,
      departure_time: departureDate.format("DD-MM-YYYY"),
      seat_class: seatClass,
    }

    const fetchSearchByUser = async () => {
      try {
        setLoading(true)
        const response = await searchByUser(data)
        if (response.ok) {
          const result = await response.json()
          console.log(result)
          onClose()
        }
      } catch (error) {
        message.error("Failed to fetch airlines!")
      }
      setLoading(false)
    }
    fetchSearchByUser()
  }
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
                <div className="d-flex justify-content-between text-start align-items-center">
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
                height: "320px",
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
                onFinish={searchBySearch}
              >
                <h4 className="pb-4 text-capitalize">
                  Tìm chuyến bay bạn muốn đến
                </h4>
                <div className="row g-3">
                  <div className="col-md-6">
                    <Form.Item label="Sân bay đi" name="departure">
                      <Select placeholder="Chọn sân bay đi">
                        {listAirport.map((item, index) => (
                          <Select.Option key={index} value={item.id}>
                            {item.name} ({item.code})
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="col-md-6">
                    <Form.Item label="Sân bay đến" name="arrival">
                      <Select placeholder="Chọn sân bay đến">
                        {listAirport.map((item, index) => (
                          <Select.Option key={index} value={item.id}>
                            {item.name} ({item.code})
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                </div>
                <div className="row g-3">
                  <div className="col-md-6">
                    <Form.Item label="Ngày đi" name="departureDate">
                      <DatePicker
                        format="DD-MM-YYYY"
                        placeholder="Chọn ngày đi"
                      />
                    </Form.Item>
                  </div>
                  <div className="col-md-6">
                    <Form.Item label="Hạng ghế" name="seatClass">
                      <Select placeholder="Chọn hạng ghế">
                        {seatClasses.map((item, index) => (
                          <Select.Option key={index} value={item}>
                            {item}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                </div>
                <div className="d-flex justify-content-end mt-4">
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ padding: "20px 30px", fontSize: "18px" }}
                    danger
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-search"
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
              title="Thông tin chuyến bay"
              placement="right"
              closable={false}
              onClose={onCloseRight}
              open={openRight}
              width={800}
              key="right"
            >
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
                  <Col span={20}>
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
                </Row>
              </Card>
              <Tabs
                activeKey={activeTabKey}
                onChange={setActiveTabKey}
                items={items}
                style={{
                  marginTop: "10px",
                  fontSize: "12px",
                }}
              />
              <Card
                bordered
                style={{
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  position: "fixed",
                  bottom: 0,
                  width: "100%",
                  maxWidth: "1200px",
                  backgroundColor: "#f8f9fa",
                  height: "200px",
                }}
              >
                <div
                  className="row w-100 justify-content-between align-items-center"
                  style={{ gap: "10px" }}
                >
                  <div className="col-6">
                    <h5 style={{ margin: 0, fontWeight: "600", color: "#333" }}>
                      Tổng cộng cho 1 khách
                    </h5>
                    <span style={{ color: "#555" }}>
                      Giá vé: <b>1.000.000</b>
                    </span>
                    <br />
                    <span style={{ color: "#555" }}>
                      Hành lý ký gửi: <b>0</b>
                    </span>
                    <br />
                    <span style={{ color: "#555" }}>
                      Ví trí ngồi: <b>A1</b>
                    </span>
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#007bff",
                        marginTop: "10px",
                      }}
                    >
                      Tổng: <b>1.000.000</b>
                    </div>
                  </div>
                  <div className="col-6 text-end">
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{
                        padding: "25px 30px",
                        fontSize: "18px",
                        fontWeight: "600",
                        borderRadius: "8px",
                      }}
                      danger
                    >
                      Tiếp tục đặt chỗ
                    </Button>
                  </div>
                </div>
              </Card>
            </Drawer>
          </Row>
        </Card>
      </div>
    </div>
  )
}
