import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appointmentThunk } from "../../redux/thunk/appointments";

import { getTimestampFromYYYYMMDD } from "../../utils/dateHelper";
import { clearFilters, setFilters } from "@/redux/slice/appointment";
import { DashboardNavbar } from "@/widgets/layout";

const AppointmentHeader = ({
  payload,
  pageSize,
  pageIndex,
  count,
  setCurrentPage,
}) => {
  const dispatch = useDispatch();


  const {
    search: storedSearch,
    date: storedDate,
    status: storedStatus,
  } = useSelector((state) => state.AppointmentSlice);

  // Set local states for filters, initializing with stored values from Redux
  const [searchValue, setSearchValue] = useState(storedSearch || "");
  const [dateFilter, setDateFilter] = useState("");
  const [status, setStatus] = useState(storedStatus || "");
  const [sortField, setSortField] = useState("date");
  const [sortType, setSortType] = useState("-1");

  useEffect(() => {
    const debouncer = setTimeout(() => {
      dispatch(
        appointmentThunk({
          ...payload,
          search: searchValue,
          status: status,
          pageSize,
          pageIndex,
          sortBy: sortField,
          sortType: sortType,
          date: dateFilter,
        }),
      );
    }, 500);
    return () => clearTimeout(debouncer);
  }, [searchValue, status, pageIndex, payload, dispatch, sortField, sortType, pageSize, dateFilter]);

  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case "date":
        const timestamp = getTimestampFromYYYYMMDD(value);
        setDateFilter(value);
        dispatch(
          setFilters({
            search: searchValue,
            date: timestamp,
            status, // Keep status intact
          }),
        );
        setCurrentPage(1);
        break;

      case "search":
        setSearchValue(value);
        dispatch(
          setFilters({
            search: value,
            date: storedDate,
            status, // Keep status intact
          }),
        );
        setCurrentPage(1);
        break;

      case "status":
        setStatus(value); // Update local status state
        dispatch(
          setFilters({
            search: searchValue,
            date: storedDate,
            status: value, // Set the new status value
          }),
        );
        setCurrentPage(1);
        break;

      case "sortBy":
        setSortField(value); // Update local sort field state
        break;
      default:
        break;
    }
  };

  const filterHandler = () => {
    // Clear all filters
    dispatch(clearFilters());
    setSearchValue("");
    setDateFilter("");
    setStatus("");
    setSortField("date");
    setCurrentPage(1);
  };

  return (
    <>
      <div className="flex items-center justify-between bg-themeLight px-1">
        <DashboardNavbar
          inputField={
            <div className="flex items-center space-x-2 border-2 border-gray-300 bg-transparent rounded focus:border-blue-500 px-4 py-2 w-80">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 2a8 8 0 105.293 14.293l4.707 4.707a1 1 0 001.414-1.414l-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 100 12A6 6 0 0010 4z"
                  clip-rule="evenodd"
                />
              </svg>
              <input
                label="Search"
                placeholder="Find a Appointment"
                color="blue"
                className="bg-transparent focus:outline-none text-black placeholder-gray-500 w-full"
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </div>
          }
        />
      </div>
      <div className="flex justify-between bg-themeLight px-1 items-center">
        <h1 className="font-bold flex flex-col items-center justify-center text-xl sm:text-[23px] ">
          Appointment List ({count})
        </h1>
        <button
          type="button"
          className="border h-10 bg-blue-900 text-white px-4 text-sm rounded-md w-32"
          onClick={filterHandler}
        >
          Clear filter
        </button>
      </div>

      <div className="flex px-2 py-4 flex-wrap gap-10 justify-between items-center text-right max-sm:flex-col max-sm:gap-5 max-sm:text-left bg-themeLight">
        <div className="flex gap-3.5 items-center self-stretch my-auto max-sm:justify-between max-sm:w-full">
          <p className="self-stretch my-auto  text-base font-medium leading-loose">
            Filter:
          </p>
          <div className="flex items-center space-x-2 flex-wrap w-full sm:w-auto">
            <div>
              <input
                label="Date"
                type="date"
                color="blue"
                id="dateFilter"
                value={dateFilter}
                onChange={(e) => handleFilterChange("date", e.target.value)}
                className="p-1 rounded bg-transparent border-[0.5px] border-black w-full sm:w-auto"
              />
            </div>
            <div>
              <select
                label="Status"
                onChange={(e) => handleFilterChange("status", e.target.value)}
                id="status"
                value={status}
                className="w-full sm:w-auto p-2 bg-transparent border-[0.5px] border-black rounded-md shadow-sm focus:outline-none"
              >
                <option value="">All</option>
                <option value="Completed">Completed</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex gap-5 items-center self-stretch my-auto tracking-wide text-black min-w-[240px] max-sm:flex-col max-sm:gap-2.5 max-sm:items-start max-sm:min-w-full">
          <p className="self-stretch my-auto  text-base font-medium leading-loose">
            Sort By:
          </p>
          <div className="flex items-center self-stretch my-auto text-xs leading-6 max-sm:w-full">
            <select
              onChange={(e) => setSortField(e.target.value)}
              id="sortField"
              value={sortField}
              // className="flex gap-2.5 justify-center items-center self-stretch px-2.5 py-1.5 my-auto whitespace-nowrap rounded-md border border-black border-solid"
              className="w-full sm:w-auto p-2 bg-transparent border-[0.5px] border-black rounded-l-md shadow-sm focus:outline-none"
            >
              <option value="createdAt">Date</option>
              <option value="patient.name">Name</option>
              <option value="patient.gender">Gender</option>
              <option value="patient.age">Age</option>
              <option value="patient.state">State</option>
              <option value="patient.city">City</option>
              <option value="departments">Departments</option>
              <option value="patient.phone">Phone</option>
            </select>
            <select
              onChange={(e) => setSortType(e.target.value)}
              id="sortType"
              value={sortType}
              className="w-full sm:w-auto p-2 bg-transparent border-[0.5px] border-black border-l-0 rounded-r-md shadow-sm focus:outline-none"
            >
              <option value="-1">Descending</option>
              <option value="1">Ascending</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentHeader;
