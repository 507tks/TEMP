import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppointmentAnalyticsthunk,
  AppointmentCardAnalyticsthunk,
  dashboardThunk,
  DepartmentAnalyticsthunk,
  PatientRegisterationThunk,
  revenuethunk,
  totalMessageCountThunk
} from "../../redux/thunk/dashboard";
import {
  Button,
  Card,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Option,
  Select,
} from "@material-tailwind/react";
import { CalendarIcon } from "lucide-react";
import StatisticChart from "./StatisticChart";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { StatisticsCard } from "@/widgets/cards";
import { DashboardNavbar } from "@/widgets/layout";
import InlineBarGraph from "./ProgressCard";


// const formatDate = (date) => {
//   if (!date) return "";
//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const year = date.getFullYear();
//   return `${day}/${month}/${year}`;
// };



const Dashboard = () => {
  const [filterDashboard, setFilterDashboard] = useState("today");
  const [displayValue, setDisplayValue] = useState("Today");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const handleFilterChange = (value, label) => {
    setFilterDashboard(value);
    setDisplayValue(label);
    setStartDate(null);
    setEndDate(null);
  };
  const dispatch = useDispatch();

  const handleDateChange = () => {

    if (startDate && endDate) {

      const formattedStartDate = startDate.toISOString().split("T")[0];
      const formattedEndDate = endDate.toISOString().split("T")[0];
      const customFilter = {
        option: "custom",
        start: formattedStartDate,
        end: formattedEndDate,
      };

      dispatch(dashboardThunk(customFilter));
      dispatch(AppointmentCardAnalyticsthunk(customFilter));
      dispatch(revenuethunk(customFilter));
      dispatch(AppointmentAnalyticsthunk(customFilter));
      dispatch(PatientRegisterationThunk(customFilter));
      dispatch(DepartmentAnalyticsthunk(customFilter));
      dispatch(totalMessageCountThunk(customFilter));

      setDisplayValue("custom")
      setIsDateModalOpen(false)
    }
  };

  const cardData = useSelector(
    (state) => state.dashboardSlice?.cardData?.data?.appointmentCards || [],
  );
  const messageCounts = useSelector(
    (state) => state.dashboardSlice.totalMessageCounts || []
  );


  const chartData = useSelector((state) => ({
    appointmentData:
      state.dashboardSlice?.appointmentsData?.data?.dashboardData || [],
    revenueData: state.dashboardSlice?.revenueData?.revenueData || [],
    patientRegisterationData:
      state.dashboardSlice?.PatientRegisterationData?.data?.dashboardData || [],
    donutChartData:
      state.dashboardSlice.departmentData?.data?.departmentCards || [],
  }));

  useEffect(() => {
    if (!startDate && !endDate) {
      dispatch(dashboardThunk({ option: filterDashboard }));
      dispatch(AppointmentCardAnalyticsthunk({ option: filterDashboard }));
      dispatch(revenuethunk({ option: filterDashboard }));
      dispatch(AppointmentAnalyticsthunk({ option: filterDashboard }));
      dispatch(PatientRegisterationThunk({ option: filterDashboard }));
      dispatch(DepartmentAnalyticsthunk({ option: filterDashboard }));
      dispatch(totalMessageCountThunk({ option: filterDashboard }));
    }
  }, [filterDashboard, startDate, endDate, dispatch]);

  
  const total = cardData?.find((item) => item.title === "Total")?.value;


  return (
    <div className="relative  w-full  sm:px-6 py-6 sm:py-10">
      <div className="flex items-center justify-between ">
        <DashboardNavbar
          inputField={
            <div className="flex items-center space-x-2   bg-transparent  px-4 py-2 w-80">
              <Select
                label="Filter"
                color="blue"
                name="Filter"
                value={displayValue}
              >
                <Option
                  onClick={() => handleFilterChange("today", "Today")}
                  value="today"
                >
                  Today
                </Option>
                <Option
                  onClick={() =>
                    handleFilterChange("last_7_days", "Last 7 Days")
                  }
                  value="last_7_days"
                >
                  Last 7 Days
                </Option>
                <Option
                  onClick={() =>
                    handleFilterChange("last_30_days", "Last 30 Days")
                  }
                  value="last_30_days"
                >
                  Last 30 Days
                </Option>
                <Option
                  onClick={() =>
                    handleFilterChange("last_12_months", "Last 12 Months")
                  }
                  value="last_12_months"
                >
                  Last 12 Months
                </Option>
                <Option onClick={() => setIsDateModalOpen(true)} value="custom">
                  Custom Date Range
                </Option>
              </Select>
            </div>
          }
        />
      </div>
      <div className="flex flex-col bg-gray-100 justify-center sm:px-4 px-5 py-6 rounded-2xl bg-zinc-300">
        <div className="flex justify-start lg:justify-start  sm:justify-center  flex-wrap  gap-5 items-center max-md:max-w-full">
          <StatisticsCard
            title="Patient Registered"
            value={`${
              chartData?.patientRegisterationData?.counts?.reduce(
                (sum, num) => sum + num,
                0,
              ) || 0
            }`}
          />
          <StatisticsCard
            title="Generated Revenue"
            value={`${Math.round(
              chartData?.revenueData?.revenues?.reduce(
                (sum, num) => sum + num,
                0,
              ) || 0,
            )}`}
          />
        </div>
      </div>
    
      <StatisticChart
        progressCard={
          <Card className="bg-themeLight w-full grid sm:grid-cols-1 md:grid-cols-2  shadow-sm gap-4 ">
            <InlineBarGraph
              title="Appointments Summary"
              items={cardData.filter((item) => item.title !== "Total")}
              max={total}
            />
            <InlineBarGraph
              title="Message Summary"
              items={messageCounts.filter((item) => item.title !== "Total")}
              max={500}
            />
          </Card>
        }
        chartData={chartData}
      />

      <Dialog open={isDateModalOpen} handler={setIsDateModalOpen}>
        <DialogHeader className="text-lg font-semibold text-gray-800">
          Select Custom Date Range
        </DialogHeader>
        <DialogBody divider>
          <div className="flex flex-col space-y-4">
            {/* Start Date Picker */}
            <div className="flex items-center">
              <label className="text-gray-700 font-medium mr-2">
                Start Date:
              </label>
              <div className="relative flex items-center border rounded-md shadow-sm">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Select Start Date"
                  className="p-3 rounded-l-md border-none focus:ring-0 w-full"
                />
                <CalendarIcon className="absolute right-3 h-6 w-6 text-gray-500" />
              </div>
            </div>

            {/* End Date Picker */}
            <div className="flex items-center">
              <label className="text-gray-700 font-medium mr-2">
                End Date:
              </label>
              <div className="relative flex items-center border rounded-md shadow-sm">
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  placeholderText="Select End Date"
                  className="p-3 rounded-l-md border-none focus:ring-0 w-full"
                />
                <CalendarIcon className="absolute right-3 h-6 w-6 text-gray-500" />
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setIsDateModalOpen(false)}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handleDateChange}
            className="shadow-lg"
          >
            Apply
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Dashboard;