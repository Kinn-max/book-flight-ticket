import React, { useState } from 'react';
import { Button, Carousel, Checkbox, Radio, Slider } from 'antd';

export default function Filter() {
  const timeRanges = [
    { label: 'Đêm đến Sáng', time: '00:00 - 06:00' },
    { label: 'Sáng đến Trưa', time: '06:00 - 12:00' },
    { label: 'Trưa đến Tối', time: '12:00 - 18:00' },
    { label: 'Tối đến Đêm', time: '18:00 - 24:00' },
  ];

  const [selectedTime, setSelectedTime] = useState(null);
  const [priceRange, setPriceRange] = useState([2000000, 4500000]);

  const handleTimeSelect = (range) => {
    console.log('Bạn đã chọn:', range);
    setSelectedTime(range);
  };

  const handlePriceChange = (newValue) => {
    console.log('Giá trị:', newValue);
    setPriceRange(newValue);
  };

  const handleCheckboxChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <div>
      <div >
        <Carousel autoplay >
          <div>
            <h3 className="contentStyle">1</h3>
          </div>
          <div>
            <h3 className="contentStyle">2</h3>
          </div>
          <div>
            <h3 className="contentStyle">3</h3>
          </div>
          <div>
            <h3 className="contentStyle">4</h3>
          </div>
        </Carousel>
      </div>

      <div className="text-start">
        <div className="d-flex">
          <h5>Bộ lọc</h5>
          <span>Đặt lại</span>
        </div>

        <div>
          <span>Số điểm dừng</span>
          <div className="" style={{ display: 'flex', flexDirection: 'column' }}>
            <Checkbox onChange={handleCheckboxChange}>Bay thẳng</Checkbox>
            <Checkbox onChange={handleCheckboxChange}>1 điểm dừng</Checkbox>
            <Checkbox onChange={handleCheckboxChange}>2 điểm dừng</Checkbox>
          </div>
        </div>

        <div>
          <span>Hãng máy bay</span>
          <div className="" style={{ display: 'flex', flexDirection: 'column' }}>
            <Checkbox onChange={handleCheckboxChange}>
              <div className="d-flex">
                <div style={{ width: 30, height: 30 }}>
                  <img
                    src="https://ik.imagekit.io/tvlk/image/imageResource/2020/02/19/1582084897287-d2de240a06eac5e3a70126425b62ee0b.png?tr=dpr-2,h-24,q-75"
                    alt="logo"
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <span className="fs-6"> Bamboo Airways</span>
                  <p className="fs-10">1.817.255 VND</p>
                </div>
              </div>
            </Checkbox>
          </div>
        </div>

        <div>
          <span>Giá từ</span>
          <Slider
            range
            min={0}
            max={5000000}
            step={10000}
            value={priceRange}
            onChange={handlePriceChange}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{priceRange[0].toLocaleString()} VND</span>
            <span>{priceRange[1].toLocaleString()} VND</span>
          </div>
        </div>

        <div>
          <span>Thời gian từ</span>
          <Radio.Group className="time-selector-group">
            {timeRanges.map((range, index) => (
              <Radio.Button
                key={index}
                value={range.time}
                className={`time-selector-button ${
                  selectedTime?.time === range.time ? 'time-selector-selected' : ''
                }`}
                onClick={() => handleTimeSelect(range)}
              >
                <div>
                  <div>{range.label}</div>
                  <div style={{ color: 'blue' }}>{range.time}</div>
                </div>
              </Radio.Button>
            ))}
          </Radio.Group>
        </div>
      </div>
    </div>
  );
}
