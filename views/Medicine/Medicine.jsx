import { useEffect, useState } from "react";
import { FaEdit, FaExchangeAlt, FaTrash } from "react-icons/fa";
import { RiSortNumberDesc } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

import {
  getMedicineThunk,
  searchMedicinesThunk,
} from "../../redux/thunk/medicine";
import { DefaultPagination } from "../../utils/pagination";
import AddMedicineModal from "./AddMedicineModal";
import DeleteConfirmationModal from "./DeleteConfirmationMedicine";
import UpdateMedicineModal from "./UpdateMedicineModal";

import { filterActionsByAccess } from "@/utils/helpers";
import UpdateStateModal from "./UpdateStateModal";
import UpdateStockModal from "./UpdateStockModal";
import ViewDetails from "./ViewDetails";
import { DashboardNavbar } from "@/widgets/layout";
import MedicineDataTable from "./MedicineDataTable";

const Medicine = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openUpdateStockModal, setOpenUpdateStockModal] = useState(false);
  const [openUpdateStateModal, setOpenUpdateStateModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("brandName");
  const [sortType, setSortType] = useState("-1");

  const [searchQuery, setSearchQuery] = useState("");
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const pageSize = 10;
  const { medicineList } = useSelector((state) => state.medicine);
  const dispatch = useDispatch();
  const role = useSelector((state) => state.userrole?.userRole);

  useEffect(() => {
    if (searchQuery) {
      dispatch(
        searchMedicinesThunk({
          query: searchQuery,
          limit: pageSize,
          sortField,
          sortType,
        }),
      );
    } else {
      dispatch(
        getMedicineThunk({
          limit: pageSize,
          page: currentPage,
          sortField,
          sortType,
        }),
      );
    }
  }, [dispatch, currentPage, pageSize, sortField, searchQuery, sortType]);

  useEffect(() => {
    if (
      !openAddModal &&
      !openDeleteModal &&
      !openUpdateModal &&
      !openUpdateStockModal &&
      !openUpdateStateModal
    ) {
      dispatch(
        getMedicineThunk({
          limit: pageSize,
          page: currentPage,
          sortField,
          sortType,
        }),
      );
    }
  }, [
    openAddModal,
    openDeleteModal,
    openUpdateModal,
    openUpdateStockModal,
    openUpdateStateModal,
    dispatch,
    currentPage,
    pageSize,
    sortField,
    sortType,
  ]);

  const toggleAddModal = () => {
    setOpenAddModal(!openAddModal);
    if (openAddModal) {
      dispatch(
        getMedicineThunk({
          limit: pageSize,
          page: currentPage,
          sortField,
          sortType,
        }),
      );
    }
  };

  const toggleUpdateModal = (medicine = null) => {
    setSelectedMedicine(medicine);
    setOpenUpdateModal(!openUpdateModal);
    if (openUpdateModal) {
      dispatch(
        getMedicineThunk({
          limit: pageSize,
          page: currentPage,
          sortField,
          sortType,
        }),
      );
    }
  };

  const toggleUpdateStockModal = (medicine = null) => {
    setSelectedMedicine(medicine);
    setOpenUpdateStockModal(!openUpdateStockModal);
    if (openUpdateStockModal) {
      dispatch(
        getMedicineThunk({
          limit: pageSize,
          page: currentPage,
          sortField,
          sortType,
        }),
      );
    }
  };

  const toggleUpdateStateModal = (medicine = null) => {
    setSelectedMedicine(medicine);
    setOpenUpdateStateModal(!openUpdateStateModal);
    if (openUpdateStateModal) {
      dispatch(
        getMedicineThunk({
          limit: pageSize,
          page: currentPage,
          sortField,
          sortType,
        }),
      );
    }
  };

  const toggleDeleteModal = (medicine = null) => {
    setSelectedMedicine(medicine);
    setOpenDeleteModal(!openDeleteModal);
    if (openDeleteModal) {
      dispatch(
        getMedicineThunk({
          limit: pageSize,
          page: currentPage,
          sortField,
          sortType,
        }),
      );
    }
  };

  const actions = [
  
    {
      icon: <FaEdit size={18} className="cursor-pointer text-blue-500" />,
      id: "UPDATE_MEDICINE",
      tooltip: "Update Medicine",
      onClickFunction: (medicine) => {
        setSelectedMedicine(medicine);

        toggleUpdateModal(medicine);
      },
    },
    {
      icon: (
        <RiSortNumberDesc size={18} className="cursor-pointer text-blue-500" />
      ),
      id: "UPDATE_STOCK",
      tooltip: "Update Stock",
      onClickFunction: (medicine) => {
        setSelectedMedicine(medicine);
        toggleUpdateStockModal(medicine);
      },
    },
    {
      icon: (
        <FaExchangeAlt size={18} className="cursor-pointer text-blue-500" />
      ),
      id: "UPDATE_STATE",
      tooltip: "Update State",
      onClickFunction: (medicine) => {
        setSelectedMedicine(medicine);  
      toggleUpdateStateModal(medicine)
      },
    },
    {
      icon: <FaTrash size={18} className="cursor-pointer text-red-500" />,
      id: "DELETE_MEDICINE",
      tooltip: "Delete Medicine",
      onClickFunction: (medicine) => {
        setSelectedMedicine(medicine);  
        toggleDeleteModal(medicine)
      },
    },
  ];
  const filteredActions = filterActionsByAccess(actions, role, "medicines");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const totalPages = Math.ceil((medicineList?.totalMedicines || 0) / pageSize);

  return (
    <div className="relative w-full px-7 py-10">
      <div className="bg-themeLight py-4">
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
                placeholder="Find a Medicine"
                color="blue"
                className="bg-transparent focus:outline-none text-black placeholder-gray-500 w-full"
                onChange={handleSearchChange}
                value={searchQuery}
              />
            </div>
          }
        />
      </div>

      <div className="bg-themeLight py-4 ">
        <h1 className="text-2xl font-bold  ">
          Medicine Inventory({medicineList.totalMedicines})
        </h1>
      </div>
      <div className="flex py-4 flex-wrap gap-10 justify-between items-center text-right max-sm:flex-col max-sm:gap-5 max-sm:text-left bg-themeLight">
        <div className="flex gap-3.5 items-center self-stretch my-auto max-sm:justify-between max-sm:w-full">
          <button
            onClick={toggleAddModal}
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
              <option value="brandName">Brand Name</option>

              <option value="expiryDate">Expiry Date</option>
              <option value="strength">Strength</option>
              <option value="createdAt">createdAt</option>
              <option value="quantity">quantity</option>
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
      <div className="overflow-x-auto">
        <MedicineDataTable
          medicineData={medicineList.medicines || []}
          actions={filteredActions}
          selectedRow={setSelectedMedicine}
          pageInfo={{ currentPage: currentPage - 1, pageSize }}
        />
        {/* <ActionTable
            heading={medicineHeading}
            keys={medicinekeys}
            tableData={medicineList.medicines || []}
            actions={filteredActions}
            selectedRow={setSelectedMedicine}
            loading={false}
            pageInfo={{ currentPage: currentPage - 1, pageSize }}
          /> */}
      </div>
      <div className="flex flex-row justify-center mt-4">
        <DefaultPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage} // Update the current page state
        />
      </div>
      <ViewDetails
        open={showDetailsModal}
        toggleModal={() => setShowDetailsModal(false)}
        selectedMedicine={selectedMedicine}
      />
      <AddMedicineModal open={openAddModal} toggleModal={toggleAddModal} />
      <UpdateMedicineModal
        open={openUpdateModal}
        toggleModal={toggleUpdateModal}
        selectedMedicine={selectedMedicine}
      />
      <UpdateStockModal
        open={openUpdateStockModal}
        toggleModal={toggleUpdateStockModal}
        selectedMedicine={selectedMedicine}
      />
      <UpdateStateModal
        open={openUpdateStateModal}
        toggleModal={toggleUpdateStateModal}
        selectedMedicine={selectedMedicine}
      />
      <DeleteConfirmationModal
        open={openDeleteModal}
        toggleModal={toggleDeleteModal}
        medicineName={selectedMedicine?.name || ""}
        medicineId={selectedMedicine?._id || ""}
      />
    </div>
  );
};

export default Medicine;
