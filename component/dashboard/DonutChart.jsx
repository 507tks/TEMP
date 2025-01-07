import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
// eslint-disable-next-line
import Chart from "chart.js/auto";

const backgroundColor = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"];
const hoverBackgroundColor = ["#B12644", "#186DA5", "#A87F17", "#1B8E1F"];

const DonutChart = ({ dashboardData }) => {
  const [chartData, setChartData] = useState({
    labels: ["Diabetic", "High BP", "Chronic", "Asthmatic"],
    datasets: [
      {
        data: [0, 0, 0, 0],
        backgroundColor,
        hoverBackgroundColor
      }
    ]
  });

  useEffect(() => {
    const dataName = [];
    const dataValue = [];

    if (chartData) {
      dashboardData.map((obj) => {
        dataName.push(obj.name);
        dataValue.push(obj.count);
      });
      setChartData({
        labels: dataName,
        datasets: [
          {
            data: dataValue,
            backgroundColor,
            hoverBackgroundColor
          }
        ]
      });
    }
  }, [dashboardData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutoutPercentage: 50 // Adjust this value to control the size of the center hole (0 for a pie chart, 50 for a donut chart)
  };

  return <div style={{ height: 400 }}>{dashboardData && <Doughnut data={chartData} options={options} />}</div>;
};

export default DonutChart;
