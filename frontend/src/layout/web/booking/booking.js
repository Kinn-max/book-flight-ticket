import { Button, Card, Col, Form, Input, message, Row, Steps } from "antd"
import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { getFlightById } from "../../../api/FlightApi"
import dayjs from "dayjs"

export default function Booking() {
  const location = useLocation()
  const [componentDisabled, setComponentDisabled] = useState(false)
  const flightData = location.state?.flight
  const selectedLuggage = location.state?.luggage
  const seatClass = location.state?.seatClass
  const [flightChecked, setFlightChecked] = useState(flightData)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  console.log("Dữ liệu chuyến bay:", flightData)
  console.log("Dữ liệu Luggage:", selectedLuggage)
  console.log("Dữ liệu seatClass:", seatClass)
  const handleNextPayment = () => {
    const bookingData = {
      fullName,
      email,
      phoneNumber,
      flight: flightChecked.id,
      luggage: selectedLuggage,
      seatClass: seatClass,
    }

    console.log("Dữ liệu gửi đi:", bookingData)
  }
  return (
    <div>
      <div class="container">
        <Steps
          size="small"
          current={1}
          items={[
            {
              title: "Chi tiết chuyến đi của bạn",
            },
            {
              title: "Thanh toán",
            },
          ]}
        />
        <div class="row">
          <div class="col-md-6">
            <Card
              bordered
              style={{
                borderRadius: "10px",
                margin: "10px 0",
              }}
            >
              <h3 style={{ fontSize: "18px" }}>
                Thông tin liên hệ (nhận vé/phiếu thanh toán)
              </h3>
              <div>
                <Form
                  labelCol={{
                    span: 4,
                  }}
                  wrapperCol={{
                    span: 14,
                  }}
                  layout="horizontal"
                  disabled={componentDisabled}
                  style={{
                    maxWidth: 600,
                    textAlign: "left",
                  }}
                >
                  <Form.Item label="Họ và tên">
                    <Input
                      style={{ padding: "8px" }}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </Form.Item>

                  <Form.Item label="Số điện thoại">
                    <Input
                      style={{
                        padding: "8px",
                      }}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </Form.Item>

                  <Form.Item label="Email">
                    <Input
                      style={{ padding: "8px" }}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Item>
                </Form>
              </div>
            </Card>
          </div>
          <div class="col-md-6">
            <Card
              bordered
              style={{
                borderRadius: "10px",
                margin: "10px 0",
              }}
            >
              <h3 style={{ fontSize: "16px" }}> Tóm tắt chuyến bay</h3>
              <Row
                align="middle"
                style={{
                  paddingBottom: "15px",
                }}
              >
                <Col span={4} style={{ textAlign: "center" }}>
                  <img
                    src={flightChecked?.logoAirline}
                    alt={flightChecked?.airline}
                    style={{ width: "100px", height: "auto" }}
                  />
                </Col>
                <Col span={20}>
                  <h3 className="text-start">{flightChecked.name}</h3>
                  <Row>
                    <Col span={8}>
                      <div>
                        {dayjs(flightChecked.departureTime)
                          .utc()
                          .format("HH:mm")}
                      </div>
                      <div style={{ color: "gray" }}>
                        {flightChecked.departureLocation}(
                        {flightChecked.codeDepartAirport})<br></br>
                        {dayjs(flightChecked.departureTime)
                          .locale("vi")
                          .format("ddd, D MMM YYYY")}
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
                        {flightChecked.arrivalLocation} (
                        {flightChecked.codeArriAirport})<br></br>
                        {dayjs(flightChecked.arrivalTime)
                          .locale("vi")
                          .format("ddd, D MMM YYYY")}
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row
                align="middle"
                style={{
                  paddingTop: "4px",
                  borderTop: "1px solid rgb(205, 208, 209)",
                }}
              >
                <Col span={4} style={{ textAlign: "center" }}>
                  <img
                    src="https://tse3.mm.bing.net/th?id=OIP.kklIaX3TV97u5KnjU_Kr4wHaHa&pid=Api&P=0&h=180"
                    alt="Vn pay"
                    style={{ width: "60px", height: "auto" }}
                  />
                </Col>
                <Col span={20}>
                  <h3 className="text-start">{flightChecked.name}</h3>
                  <Row>
                    <Col span={12}>
                      <div
                        style={{
                          fontSize: "17px",
                          fontWeight: "600",
                          paddingLeft: "20px",
                          textAlign: "left",
                        }}
                      >
                        Thanh toán bằng
                      </div>
                    </Col>
                    <Col span={12} style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontSize: "20px",
                          color: "rgb(255, 94, 31)",
                          fontWeight: "bold",
                        }}
                      >
                        3.021.000 VND
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </div>
        </div>
        <div>
          <Button
            type="primary"
            size="large"
            onClick={() => handleNextPayment()}
          >
            Tiếp theo
          </Button>
        </div>
      </div>
    </div>
  )
}
