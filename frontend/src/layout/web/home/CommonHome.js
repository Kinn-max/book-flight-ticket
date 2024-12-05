/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import {
  Form,
  Select,
  DatePicker,
  Button,
  Carousel,
  Col,
  Card,
  Row,
  message,
} from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import images from "../../../assets/image/home";
import { getDataSearchHome } from "../../../api/HomeApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlaneArrival,
  faPlaneDeparture,
} from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as SeatIcon } from "../../../assets/icon/seat.svg";
import "./style.css";
dayjs.extend(customParseFormat);

const { Option } = Select;

export default function CommonHome() {
  const [listAirport, setListAirport] = useState([]);
  const [listSeat, setListSeat] = useState([]);

  const disabledDate = (current) => {
    return current < dayjs().startOf("day");
  };

  const fetchHomeData = async () => {
    try {
      const response = await getDataSearchHome();
      if (response.ok) {
        const result = await response.json();
        setListAirport(result.airportResponses);
        setListSeat(result.seatClasses);
      }
    } catch (error) {
      message.error("Failed to fetch airlines!");
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  return (
    <div style={{ backgroundColor: "#f0f2f5", padding: "20px" }}>
      <Carousel autoplay style={{ marginBottom: "20px" }}>
        <div>
          <img
            src={images.carousel1}
            style={{ width: "100%", borderRadius: "5px" }}
          />
        </div>
        <div>
          <img
            src={images.carousel2}
            style={{ width: "100%", borderRadius: "5px" }}
          />
        </div>
        <div>
          <img
            src={images.carousel3}
            style={{ width: "100%", borderRadius: "5px" }}
          />
        </div>
        <div>
          <img
            src={images.carousel4}
            style={{ width: "100%", borderRadius: "5px" }}
          />
        </div>
      </Carousel>

      <Card
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          width: "70%",
          margin: "0 auto",
        }}
      >
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Từ">
                <Select
                  prefix={<FontAwesomeIcon icon={faPlaneDeparture} />}
                  placeholder="Chọn điểm đi"
                  className="no-border-select"
                >
                  {
                  listAirport.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.name} ({item.code})
                    </Option>
                  ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Đến">
                <Select
                  prefix={<FontAwesomeIcon icon={faPlaneArrival} />}
                  placeholder="Chọn điểm đến"
                  className="no-border-select"
                >
                  {
                  listAirport.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.name} ({item.code})
                    </Option>
                  ))
                  }
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Ngày đi" style={{ flex: 1 }}>
                <DatePicker
                  prefix={<CalendarOutlined />}
                  suffixIcon={[]}
                  placeholder="Chọn ngày"
                  disabledDate={disabledDate}
                  format="DD/MM/YYYY"
                  style={{ width: "100%" }}
                  className="no-border-date"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Hạng ghế" style={{ flex: 1 }}>
                <Select
                  prefix={<SeatIcon width={18} height={18} />}
                  placeholder="Chọn hạng ghế"
                  className="no-border-select"
                >
                  {
                  listSeat.map((item, index) => (
                    <Option key={index} value={item}>
                      {item}
                    </Option>
                  ))
                  }
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Button type="primary" style={{ width: "100%" }}>
              Tìm chuyến bay
            </Button>
          </Row>
        </Form>
      </Card>
    </div>
  );
}
