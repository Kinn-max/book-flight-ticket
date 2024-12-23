import React, { useState } from "react"
import { Button, Card, Carousel, Checkbox, Menu, Radio, Slider } from "antd"
import { SettingOutlined } from "@ant-design/icons"
import SubMenu from "antd/es/menu/SubMenu"

export default function Filter() {
  const timeRanges = [
    { label: "Đêm đến Sáng", time: "00:00 - 06:00" },
    { label: "Sáng đến Trưa", time: "06:00 - 12:00" },
    { label: "Trưa đến Tối", time: "12:00 - 18:00" },
    { label: "Tối đến Đêm", time: "18:00 - 24:00" },
  ]

  const [selectedTime, setSelectedTime] = useState(null)
  const [priceRange, setPriceRange] = useState([2000000, 4500000])

  const handleTimeSelect = (range) => {
    console.log("Bạn đã chọn:", range)
    setSelectedTime(range)
  }

  const handlePriceChange = (newValue) => {
    console.log("Giá trị:", newValue)
    setPriceRange(newValue)
  }

  const handleCheckboxChange = (e) => {
    console.log(`checked = ${e.target.checked}`)
  }
  const items = [
    {
      key: "sub4",
      label: "Hãng hàng không",
      children: [
        {
          key: "9",
          label: "Vietravel Airlines",
          price: 1200000,
        },
        {
          key: "10",
          label: "Vietravel Airlines",
          price: 1200000,
        },
        {
          key: "11",
          label: "Vietravel Airlines",
          price: 1200000,
        },
        {
          key: "12",
          label: "Vietravel Airlines",
          price: 1200000,
        },
      ],
    },
  ]
  const onClick = (e) => {
    console.log("click ", e)
  }

  const renderChildren = (children) => {
    return children.map((child) => (
      <div
        key={child.key}
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "8px",
          margin: "0 10px",
        }}
      >
        <Checkbox onChange={handleCheckboxChange}>
          <div className="d-flex">
            <div
              style={{
                width: 30,
                height: 30,
                marginRight: "8px",
                borderRadius: "10px",
              }}
            >
              <img
                src="https://ik.imagekit.io/tvlk/image/imageResource/2020/02/19/1582084897287-d2de240a06eac5e3a70126425b62ee0b.png?tr=dpr-2,h-24,q-75"
                alt="logo"
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <span className="fs-6">{child.label}</span>
              <p className="fs-10">{child.price}</p>
            </div>
          </div>
        </Checkbox>
      </div>
    ))
  }
  return (
    <div>
      <div>
        <Carousel autoplay>
          <div style={{ width: "350px", height: "160px" }}>
            <img
              style={{ width: "100%", height: "100%" }}
              src="https://tse2.mm.bing.net/th?id=OIP.Jc42CWDK7HH0I14bw3I5HQHaEW&pid=Api&P=0&h=180"
            />
          </div>
        </Carousel>
      </div>
      <Card>
        <div className="text-start">
          <div className="d-flex justify-content-between">
            <h5>Bộ lọc:</h5>
            <span style={{ color: "#48a0f2" }}>Đặt lại</span>
          </div>
          <div>
            <Menu
              mode="inline"
              style={{ padding: "0" }}
              defaultOpenKeys={["sub4"]}
            >
              <SubMenu key="sub4" className="fs-6" title="Hãng hàng không">
                {renderChildren(items[0].children)}
              </SubMenu>
            </Menu>
          </div>

          <div>
            <label className="fs-6 px-1">Giá từ</label>
            <Slider
              range
              min={0}
              max={5000000}
              step={10000}
              value={priceRange}
              onChange={handlePriceChange}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>{priceRange[0].toLocaleString()} VND</span>
              <span>{priceRange[1].toLocaleString()} VND</span>
            </div>
          </div>
          <div className="pt-3">
            <label className="fs-6 px-1">Thời gian từ</label>
            <Radio.Group className="time-selector-group">
              {timeRanges.map((range, index) => (
                <Radio.Button
                  key={index}
                  value={range.time}
                  className={`time-selector-button ${
                    selectedTime?.time === range.time
                      ? "time-selector-selected"
                      : ""
                  }`}
                  onClick={() => handleTimeSelect(range)}
                >
                  <div>
                    <div>{range.label}</div>
                    <div style={{ color: "blue" }}>{range.time}</div>
                  </div>
                </Radio.Button>
              ))}
            </Radio.Group>
          </div>
        </div>
      </Card>
    </div>
  )
}
