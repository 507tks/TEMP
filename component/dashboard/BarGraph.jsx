// eslint-disable-next-line
import { ArcElement, CategoryScale, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const BarGraph = ({ dashboardData }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!dashboardData) return;

    const dataValues = dashboardData.data;
    const maxIndex = dataValues.indexOf(Math.max(...dataValues));

    const backgroundColors = Array(dataValues.length).fill("rgba(108, 63, 242, 0.5)");
    backgroundColors[maxIndex] = "rgba(108, 63, 242, 1)";

    const dataSet = {
      labels: dashboardData.labels,
      datasets: [
        {
          label: "Total Count/Value",
          data: dataValues,
          backgroundColor: backgroundColors,
          borderColor: "rgba(108, 63, 242, 0.5)",
          borderWidth: 0.5
        }
      ]
    };

    setChartData(dataSet);
  }, [dashboardData]);

  return (
    <div>
      <h2 className="mb-2">Average Patient Visits</h2>
      <div className="mb-0">{chartData && <Bar style={{ height: 350 }} data={chartData} />}</div>
    </div>
  );
};

export default BarGraph;
