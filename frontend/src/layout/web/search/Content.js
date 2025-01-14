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
  CalendarOutlined,
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
import { useLocation } from "react-router-dom"
import dayjs from "dayjs"
import "dayjs/locale/vi"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)
export default function Content() {
  const generateFlightItems = (flightChecked) => [
    {
      key: "1",
      label: (
        <span>
          <InfoCircleOutlined style={{ marginRight: "5px" }} />
          Chi tiết
        </span>
      ),
      children: flightChecked ? (
        <Timeline mode="left">
          <Timeline.Item
            label={dayjs(flightChecked.departureTime).utc().format("HH:mm")}
            dot={
              <ClockCircleOutlined
                style={{ fontSize: "16px", color: "#1890ff" }}
              />
            }
          >
            <div>
              <strong>
                {flightChecked.departureLocation} (
                {flightChecked.codeDepartAirport})
              </strong>
              <div style={{ color: "#888" }}>
                Sân bay {flightChecked.departureAirport}
              </div>
              <div>
                <img
                  src={flightChecked.logoAirline}
                  alt={flightChecked.airline}
                  style={{ height: "20px", marginRight: "8px" }}
                />
                <strong>{flightChecked.airline}</strong> -{" "}
                {flightChecked.codeFlight} • Khuyến mãi
              </div>
              <div style={{ color: "#777", fontSize: "12px" }}>
                Hành lý 0kg (mua khi đặt chỗ) • Hành lý xách tay 7kg
              </div>
              <a href="#" style={{ color: "#1890ff" }}>
                Xem giá hành lý mua thêm
              </a>
            </div>
          </Timeline.Item>
          <Timeline.Item label="Thời gian bay">
            {(() => {
              const departure = dayjs(flightChecked.departureTime).utc()
              const arrival = dayjs(flightChecked.arrivalTime).utc()
              const duration = arrival.diff(departure, "minute")
              const hours = Math.floor(duration / 60)
              const minutes = duration % 60
              return `${hours}h ${minutes}m`
            })()}
          </Timeline.Item>
          <Timeline.Item
            label={dayjs(flightChecked.arrivalTime).utc().format("HH:mm")}
            dot={
              <ClockCircleOutlined
                style={{ fontSize: "16px", color: "#52c41a" }}
              />
            }
          >
            <div>
              <strong>
                {flightChecked.arrivalLocation} ({flightChecked.codeArriAirport}
                )
              </strong>
              <div style={{ color: "#888" }}>
                Sân bay {flightChecked.arrivalAirport}{" "}
              </div>
              <div>
                <strong>Máy bay {flightChecked.plane.name} </strong>
              </div>
            </div>
          </Timeline.Item>
        </Timeline>
      ) : (
        <div>Không có dữ liệu</div>
      ),
    },
    {
      key: "2",
      label: (
        <span>
          <InfoCircleOutlined style={{ marginRight: "5px" }} />
          Khuyến mãi
        </span>
      ),
      children: <p>Các chương trình khuyến mãi hiện có...</p>,
    },
  ]

  const disabledDate = (current) => {
    return current < dayjs().startOf("day")
  }
  const location = useLocation()
  const [activeTabKey, setActiveTabKey] = useState("1")
  const [showTab, setShowTab] = useState(false)
  const [carouselItems, setCarouselItems] = useState([])
  const [open, setOpen] = useState(false)
  const [openRight, setOpenRight] = useState(false)
  const [titleSearch, setTitleSearch] = useState({
    fromTo: "",
    date: "",
  })
  const [currentIndex, setCurrentIndex] = useState(0)
  const totalSlides = carouselItems.length
  const [form] = Form.useForm()
  const [listAirport, setListAirport] = useState([])
  const [seatClasses, setSeatClasses] = useState([])
  const [listFlight, setListFlight] = useState([])
  const [loading, setLoading] = useState(false)
  const [flightChecked, setFlightChecked] = useState(null)
  const handleCardClick = () => {
    setActiveTabKey("1")
  }
  const getDataFlightByHomeSearch = () => {
    const queryParams = new URLSearchParams(location.search)
    const departure = parseInt(queryParams.get("departure"), 10)
    const arrival = parseInt(queryParams.get("arrival"), 10)
    const departureDate = queryParams.get("departureDate")
    const seatClass = queryParams.get("seatClass")

    if (!departure || !arrival || !departureDate || !seatClass) {
      message.error("Thiếu thông tin tìm kiếm!")
      return
    }

    const values = { departure, arrival, departureDate, seatClass }
    searchBySearch(values)
  }

  const fetchDataSearchHome = async () => {
    try {
      const response = await getDataSearchHome()
      if (response.ok) {
        const result = await response.json()
        setListAirport(result.airportResponses)
        setSeatClasses(result.seatClasses)
      }
    } catch (error) {
      message.error("Không thể lấy dữ liệu sân bay!")
    }
  }

  useEffect(() => {
    fetchDataSearchHome()
  }, [])
  useEffect(() => {
    getDataFlightByHomeSearch()
  }, [listAirport])

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
    const dateObject = new Date(departureDate)
    const departureTime = dayjs(dateObject).format("DD-MM-YYYY")
    let form = ""
    let to = ""
    listAirport.forEach((airport) => {
      if (airport.id === departure) {
        form = `${airport.location} (${airport.code})`
      }
      if (airport.id === arrival) {
        to = `${airport.location} (${airport.code})`
      }
    })
    const formattedDate = dayjs(dateObject)
      .locale("vi")
      .format("dddd, DD [th] MM YYYY")
      .replace(/^th/, "Th")
      .replace(/^ch/, "Ch")

    const formTo = `${form} -> ${to}`
    let nextDays = []
    dayjs.locale("vi")
    for (let i = 0; i < 7; i++) {
      const nextDay = dayjs(dateObject).add(i, "day")
      const formattedNextDay = nextDay
        .format("dddd")
        .replace(/^th/, "Th")
        .replace(/^ch/, "Ch")
      const formattedNextDay2 = nextDay
        .format("DD [tháng] M")
        .replace(/^th/, "Th")
        .replace(/^ch/, "Ch")
      nextDays.push({
        day: formattedNextDay,
        price: `${formattedNextDay2}`,
      })
    }
    setCarouselItems(nextDays)
    setTitleSearch((prevState) => ({
      ...prevState,
      fromTo: formTo,
      date: formattedDate,
    }))
    console.log(formTo, formattedDate)
    const data = {
      departureAirport: departure,
      arrivalAirport: arrival,
      departureTime: departureTime,
      seatClass: seatClass,
    }
    const fetchSearchByUser = async () => {
      try {
        setLoading(true)
        const response = await searchByUser(data)
        if (response.ok) {
          const result = await response.json()
          setListFlight(result)
          console.log(result)
          onClose()
        }
      } catch (error) {
        console.log("Lỗi tìm kiếm!")
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
                    <div className="fs-5 fw-bold">{titleSearch.fromTo}</div>
                    <div>{titleSearch.date}</div>
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
                        disabledDate={disabledDate}
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
                          width: "125px",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: "bold",
                            width: "125px",
                            display: "block",
                          }}
                        >
                          {item.day}
                        </span>
                        <span style={{ display: "block" }}>{item.price}</span>
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
                    disabled={currentIndex === 0}
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
                    disabled={currentIndex === totalSlides - 1}
                  />
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Card>
      <h5>Tất cả chuyến bay</h5>
      <div>
        {listFlight.map((item, index) => (
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
                  src={item.logoAirline}
                  alt={item.airline}
                  style={{ width: "100px", height: "auto" }}
                />
              </Col>
              <Col span={12}>
                <h3 className="text-start">{item.name}</h3>
                <Row>
                  <Col span={8}>
                    <div>{dayjs(item.departureTime).utc().format("HH:mm")}</div>
                    <div style={{ color: "gray" }}>
                      {item.codeDepartAirport}
                    </div>
                  </Col>
                  <Col span={8} style={{ textAlign: "center" }}>
                    <div>
                      {(() => {
                        const departure = dayjs(item.departureTime).utc()
                        const arrival = dayjs(item.arrivalTime).utc()
                        const duration = arrival.diff(departure, "minute")
                        const hours = Math.floor(duration / 60)
                        const minutes = duration % 60
                        return `${hours}h ${minutes}m`
                      })()}
                    </div>
                    <div className="process-flight"></div>
                    <div style={{ fontSize: "12px", color: "gray" }}>
                      Bay thẳng
                    </div>
                  </Col>
                  <Col span={8} style={{ textAlign: "right" }}>
                    <div>{dayjs(item.arrivalTime).utc().format("HH:mm")}</div>
                    <div style={{ color: "gray" }}>{item.codeArriAirport}</div>
                  </Col>
                </Row>
              </Col>
              <Col span={8} style={{ textAlign: "right" }}>
                <div className="d-flex align-items-center justify-content-end">
                  <div style={{ fontSize: "20px", color: "red" }}>
                    {item.ecoPrice.toLocaleString("vi-VN")} VND
                  </div>
                  <div style={{ fontSize: "15px", color: "gray" }}>/khách</div>
                </div>
                <Button
                  type="primary"
                  style={{ borderRadius: "5px" }}
                  onClick={() => {
                    setFlightChecked(item)
                    showDrawerRight()
                  }}
                >
                  Chọn
                </Button>
              </Col>
            </Row>
          </Card>
        ))}
        <Drawer
          title="Thông tin chuyến bay"
          placement="right"
          closable={false}
          onClose={onCloseRight}
          open={openRight}
          width={800}
          key="right"
        >
          {flightChecked && (
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
                    src={flightChecked.logoAirline}
                    alt={flightChecked.airline}
                    style={{ width: "100px", height: "auto" }}
                  />
                </Col>
                <Col span={12}>
                  <h3 className="text-start">{flightChecked.name}</h3>
                  <Row>
                    <Col span={8}>
                      <div>
                        {dayjs(flightChecked.departureTime)
                          .utc()
                          .format("HH:mm")}
                      </div>
                      <div style={{ color: "gray" }}>
                        {flightChecked.codeDepartAirport}
                      </div>
                    </Col>
                    <Col span={8} style={{ textAlign: "center" }}>
                      <div>
                        {(() => {
                          const departure = dayjs(
                            flightChecked.departureTime
                          ).utc()
                          const arrival = dayjs(flightChecked.arrivalTime).utc()
                          const duration = arrival.diff(departure, "minute")
                          const hours = Math.floor(duration / 60)
                          const minutes = duration % 60
                          return `${hours}h ${minutes}m`
                        })()}
                      </div>
                      <div className="process-flight"></div>
                      <div style={{ fontSize: "12px", color: "gray" }}>
                        Bay thẳng
                      </div>
                    </Col>
                    <Col span={8} style={{ textAlign: "right" }}>
                      <div>
                        {dayjs(flightChecked.arrivalTime).utc().format("HH:mm")}
                      </div>
                      <div style={{ color: "gray" }}>
                        {flightChecked.codeArriAirport}
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col span={8} style={{ textAlign: "right" }}>
                  <div className="d-flex align-flightCheckeds-center justify-content-end">
                    <div style={{ fontSize: "20px", color: "red" }}>
                      {flightChecked.ecoPrice.toLocaleString("vi-VN")} VND
                    </div>
                    <div style={{ fontSize: "15px", color: "gray" }}>
                      /khách
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>
          )}
          <Tabs
            activeKey={activeTabKey}
            onChange={setActiveTabKey}
            items={generateFlightItems(flightChecked)}
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
      </div>
    </div>
  )
}
