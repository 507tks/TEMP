import { hasAccess } from "@/utils/helpers";
import { DashboardNavbar } from "@/widgets/layout";
import { useSelector } from "react-redux";

const PatientHeader = ({
  setAddPatientModel,
  count,
  sortField,
  sortType,
  setSortField,
  setSortType,
  setSearchValue,
}) => {
  const role = useSelector((state) => state.userrole?.userRole);

  const hasAddPatientPermission = hasAccess(role, "patients", "ADD_PATIENT");

  return (
    <div className="">
      <div className="flex items-center justify-between bg-themeLight ">
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
                placeholder="Find a patient"
                color="blue"
                className="bg-transparent focus:outline-none text-black placeholder-gray-500 w-full"
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          }
        />
      </div>
      <h1 className="font-bold text-xl bg-themeLight  mt-1">
        Patient List ({count})
      </h1>

      {/* <div className="flex items-center justify-between p-4 bg-themeLight">
        <div className="flex items-center space-x-2">
          {hasAddPatientPermission && (
            <button
              type="button"
              className="text-center bg-blue-800 text-white p-2 rounded-md max-w-full truncate"
              onClick={() => setAddPatientModel(true)}
            >
              <span>Add new</span>
            </button>
          )}
        </div>

        <div className="flex items-center space-x-4 sm:space-x-6">
          <span className="text-black text-xl font-medium truncate">
            Sort By:
          </span>

          <div className="flex  w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <select
                onChange={(e) => setSortField(e.target.value)}
                id="sortField"
                value={sortField}
                className="w-full sm:w-auto p-2 bg-transparent border-[0.5px] border-black rounded-l-md shadow-sm focus:outline-none"
              >
                <option value="createdAt">Date</option>
                <option value="name">Name</option>
                <option value="gender">Gender</option>
                <option value="age">Age</option>
                <option value="state">State</option>
                <option value="city">City</option>
                <option value="departments">Departments</option>
                <option value="phone">Phone</option>
              </select>
            </div>

            <div className="relative w-full sm:w-auto">
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
      </div> */}
      <div className="flex py-4 flex-wrap gap-10 justify-between items-center text-right max-sm:flex-col max-sm:gap-5 max-sm:text-left bg-themeLight">
        <div className="flex gap-3.5 items-center self-stretch my-auto max-sm:justify-between max-sm:w-full">
          {hasAddPatientPermission && (
            <button
              onClick={() => setAddPatientModel(true)}
              className="flex gap-1.5 justify-center items-center self-stretch px-1.5 py-3 my-auto text-xs font-medium tracking-wide text-white bg-blue-900 rounded min-h-[37px] w-[104px]"
            >
              Add new
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/67f19f7059b508b3ded2421c2d9793935ad486cd4634f6b39e184f8832d9097b?placeholderIfAbsent=true&apiKey=155bea4768f7487c8e7bd8197884b9dd"
                alt=""
                className="object-contain shrink-0 self-stretch my-auto w-2.5 aspect-[0.91]"
              />
            </button>
          )}
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
              <option value="name">Name</option>
              <option value="gender">Gender</option>
              <option value="age">Age</option>
              <option value="state">State</option>
              <option value="city">City</option>
              <option value="departments">Departments</option>
              <option value="phone">Phone</option>
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
    </div>
  );
};

export default PatientHeader;
