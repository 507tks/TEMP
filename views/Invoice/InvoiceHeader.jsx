import { DashboardNavbar } from "@/widgets/layout";

const InvoiceHeader = ({
  searchHandler,
  totalInvoices,
    setSortField,
  sortField,sortType,setSortType
}) => {
  // const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQueryChange = (event) => {
    // setSearchQuery(event.target.value);
    searchHandler(event.target.value);
  };

  return (
    <div className="">
      <div className="bg-themeLight py-2">
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
                placeholder="Find a Invoice"
                color="blue"
                className="bg-transparent focus:outline-none text-black placeholder-gray-500 w-full"
                onChange={handleSearchQueryChange}
              />
            </div>
          }
        />
      </div>

      <div className="flex py-4 flex-wrap gap-10 justify-between items-center text-right max-sm:flex-col max-sm:gap-5 max-sm:text-left bg-themeLight">
        <div className="flex gap-3.5 items-center self-stretch my-auto max-sm:justify-between max-sm:w-full">
         
          <h1 className="font-bold text-[23px] ">
            Invoice List ({totalInvoices})
          </h1>
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
              <option value="customerName">Name</option>
              <option value="invoiceNumber">invoiceNumber</option>
              <option value="invoiceDate">Invoice Date</option>
              <option value="invoiceDueDate">Invoice Due Date</option>
              <option value="totalAmount">Amount</option>
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

export default InvoiceHeader
