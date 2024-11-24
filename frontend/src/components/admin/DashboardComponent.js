import { DatePicker, message, Space } from "antd";
import { Column } from "@ant-design/charts";
import Title from "antd/es/typography/Title";
import React, { useState, useEffect } from "react";
import Loading from "../../util/Loading";
import { getAllRevenueByDate, getAllRevenueByMonth } from "../../api/RevenueApi";

export default function DashboardComponent() {
  const [dailyData, setDailyData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [yearPick, setYearPick] = useState(2024);

  const fetchRevenueByDate = async () => {
    setLoading(true);
    try {
      const response = await getAllRevenueByDate();
      if (response) {
        const daily = response.map(item => ({
          name: new Date(item.createdAt).getHours() + ":00",
          value: item.totalRevenue,
        }));
        setDailyData(daily);
      }
    } catch (error) {
      message.error("Failed to fetch daily revenue data!");
    } finally {
      setLoading(false);
    }
  };

  const fetchRevenueByMonth = async (year) => {
    setLoading(true);
    try {
      const response = await getAllRevenueByMonth(year);
      if (response) {
        const monthly = response.monthlyRevenues.map(item => ({
          name: `Month ${item.month}`, 
          value: item.totalRevenue,
        }));
        setYearlyData(monthly);
      }
    } catch (error) {
      message.error("Failed to fetch monthly revenue data!");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchRevenueByDate();
    fetchRevenueByMonth(yearPick); 
  }, [yearPick]);

  if (loading) return <Loading />;

  const dailyConfig = {
    data: dailyData,
    xField: "name",
    yField: "value",
    label: {
      position: "top",
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    columnStyle: {
      fill: "#73d13d",
    },
    height: 300,
  };

  const monthlyConfig = {
    data: yearlyData,
    xField: "name",
    yField: "value",
    label: {
      position: "top",
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    columnStyle: {
      fill: "#fa5e8d",
    },
    height: 300,
  };

  return (
    <div style={{ padding: 20 }}>
      <Title level={3}>Doanh thu theo ngày</Title>
      <Space direction="vertical" size={20} style={{ width: "100%" }}>
        <div>
          <div style={{ marginTop: 20 }}>
            <Column {...dailyConfig} />
          </div>
        </div>

        <div>
        <Title level={3}>Doanh thu theo tháng ({yearPick})</Title>
          <DatePicker
            picker="year"
            onChange={(date) => {
              if (date) {
                setYearPick(date.year());
              }
            }}
            format="YYYY"
          />
          <div style={{ marginTop: 20 }}>
            <Column {...monthlyConfig} />
          </div>
        </div>
      </Space>
    </div>
  );
}
