import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Typography } from "@material-tailwind/react";
import { StatisticsChart } from "@/widgets/charts";
import { chartsConfig } from "@/configs";

const StatisticChart = ({ chartData ,progressCard}) => {
  const {
    appointmentData,
    revenueData,
    patientRegisterationData,
    donutChartData,
  } = chartData;

  const [chartOptions, setChartOptions] = useState({
    chart: { type: "pie" },
    labels: [],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: { width: 300 },
          legend: { position: "bottom" },
          plotOptions: {
            pie: {
              startAngle: 0,
              customScale: 1,
              expandOnClick: false,
            },
          },
        },
      },
    ],
  });

  const [chartSeries, setChartSeries] = useState([]);

  useEffect(() => {
    const labels = donutChartData?.map((data) => data.title) || [];
    const values = donutChartData?.map((data) => data.value) || [];
    setChartOptions((prevOptions) => ({ ...prevOptions, labels }));
    setChartSeries(values);
  }, [donutChartData]);

 const createChartConfig = (type, seriesData, categories, name, colors) => ({
   type,
   height: 220,
   series: [{ name: name, data: seriesData }],
   options: {
     ...chartsConfig,
     colors: colors,
     xaxis: {
       ...chartsConfig.xaxis,
       categories: categories || [],
       labels: {
         rotate: -45,
         style: {
           fontSize: "10px",
         },
         hideOverlappingLabels: true,
       },
       tickAmount: Math.min(categories.length, 15),
     },
     yaxis: {
       labels: {
         formatter: (value) => value.toFixed(0),
       },
       tickAmount: 5,
     },
     dataLabels: {
       enabled: false,
     },
     stroke: {
       curve: "straight",
       width: 2,
     },
     ...(type === "bar" && {
       plotOptions: { bar: { columnWidth: "50%", borderRadius: 3 } },
     }),
     tooltip: {
       shared: true,
       intersect: false,
     },
     grid: {
       show: true,
     },
   },
 });



 const AppointmentsChart = createChartConfig(
   "area",
   appointmentData?.counts || [],
   appointmentData?.labels?.map((label) => label.slice(0, -5)) || [],
   "Appointments",
   ["#1B998B", "#2E294E", "#F46036", "#E71D36", "#C5D86D"],
 );

  const RevenueChart = createChartConfig(
    "area",
    revenueData?.revenues?.map((r) => parseInt(r)) || [],
    revenueData?.labels?.map((label) => label.slice(0, -5)) || [],
    "Revenue",
    ["#00A3E0", "#00BFFF", "#1E90FF", "#4682B4", "#5F9EA0"],
  );

  const PatientChart = createChartConfig(
    "area", 
    patientRegisterationData?.counts || [],
    patientRegisterationData?.labels?.map((label) => label.slice(0, -5)) || [],
    "Patients Registered",
    ["#00A3E0", "#00BFFF", "#1E90FF", "#4682B4", "#5F9EA0"],
  );
  
  return (
    <div className="py-6 sm:px-4 px-5 mt-4 bg-themeLight rounded-2xl grid grid-cols-1 gap-y-12 gap-x-2 md:grid-cols-2 xl:grid-cols-2">
      {progressCard}
      <StatisticsChart
        color="white"
        chart={AppointmentsChart}
        title="Appointments"
        description="Overview of Appointments"
        footer={
          <Typography
            variant="small"
            className="flex items-center font-normal text-blue-gray-600"
          >
            &nbsp;Updated just now
          </Typography>
        }
      />
      <StatisticsChart
        color="white"
        chart={RevenueChart}
        title="Revenue"
        description="Overview of Revenue generated"
        footer={
          <Typography
            variant="small"
            className="flex items-center font-normal text-blue-gray-600"
          >
            &nbsp;Updated just now
          </Typography>
        }
      />
      <StatisticsChart
        color="white"
        chart={PatientChart}
        title="Patients Registered"
        description="Overview of Patients registered"
        footer={
          <Typography
            variant="small"
            className="flex items-center font-normal text-blue-gray-600"
          >
            &nbsp;Updated just now
          </Typography>
        }
      />

      {/* Donut Chart */}
      {donutChartData.length !== 0 ? (
        <div className="border bg-white border-gray-900 shadow-sm rounded-lg p-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Appointment Count by Department
          </h2>
          <ReactApexChart
            options={chartOptions}
            series={chartSeries}
            type="donut"
            width={380}
          />
        </div>
      ) : (
        <div className="border bg-white border-gray-900 shadow-sm rounded-lg p-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Appointment Count by Department
          </h2>
          <div className="text-gray-500">No data available</div>
        </div>
      )}
    </div>
  );
};

export default StatisticChart;
