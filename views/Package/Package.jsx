import { DashboardNavbar } from "@/widgets/layout";
import React, { useEffect, useState } from "react";
import PackageDataTable from "./PackageDataTable";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addPackageThunk, deletePackageThunk, getAllPackagesThunk, updatePackageThunk } from "@/redux/thunk/package";
import AddPackageModal from "./AddPAckageModal";
import { MdDelete } from "react-icons/md";
import DeletePackageModal from "./DeletePackageModal";
import UpdatePackageModal from "./UpdatePackageModal";
import { DefaultPagination } from "@/utils/pagination";
function Package() {
  const [selectedPackage, setselectedPackage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("createdAt");
  const [sortType, setSortType] = useState("1");
  const [addPackageDialogOpen, setAddPackageDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
   const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const dispatch = useDispatch();
  const pageSize = 10;

  const packageData = useSelector(
    (state) => state?.packageSlice?.packages?.packages || [],
  );
   const totalPackages = useSelector(
     (state) => state?.packageSlice?.packages?.count || 0,
   );
  const totalPages = totalPackages ? Math.ceil(totalPackages / pageSize) : 0;
  
 const onPageChange = (page) => {
   setCurrentPage(page);
 };
  useEffect(() => {
    dispatch(
      getAllPackagesThunk({
        limit: pageSize,
        page: currentPage,
        sortField,
        sortType,
      }),
    );
  }, [pageSize, currentPage, sortField, sortType]);
 
  const toggleDeleteModal = () => setDeleteDialogOpen(!deleteDialogOpen);
  const toggleAddModal = () => setAddPackageDialogOpen(!addPackageDialogOpen);
const toggleUpdateModal=()=> setUpdateModalOpen(!updateModalOpen)
  const Addpackagehandler = (formData) => {
    dispatch(addPackageThunk(formData))
      .unwrap()
      .then(() => {
        dispatch(
          getAllPackagesThunk({
            limit: pageSize,
            page: currentPage,
            sortField,
            sortType,
          }),
        );
        toggleAddModal();
      });
  };
  const handleDeletePackage = () => {
    if (!selectedPackage) return;
    dispatch(deletePackageThunk({packageId:selectedPackage?._id}))
      .unwrap()
      .then(() => {
        setDeleteDialogOpen(false);
        dispatch(
          getAllPackagesThunk({
            limit: pageSize,
            page: currentPage,
            sortField,
            sortType,
          }),
        );
        toggleDeleteModal();
      });
  };
  const handleUpdatePackage = (updatedData) => {
  
     
      dispatch(updatePackageThunk(updatedData))
        .unwrap()
        .then(() => {
          dispatch(
            getAllPackagesThunk({
              limit: pageSize,
              page: currentPage,
              sortField,
              sortType,
            }),
          );
       
        });
     setUpdateModalOpen(false);
   };
  const actions = [
    {
      icon: <FaEdit size={20} className="cursor-pointer text-blue-500" />,
      id: "UPDATE_PACKAGE",
      tooltip: "Update Package",
      onClickFunction: (packageData) => {
        setselectedPackage(packageData);
        toggleUpdateModal();
      },
    },
    {
      icon: <MdDelete size={20} className="cursor-pointer text-red-500" />,
      id: "DELETE_PACKAGE",
      tooltip: "Delete Package",
      onClickFunction: (data) => {
        setselectedPackage(data);
        setDeleteDialogOpen(true);
      },
      // onClickFunction: (medicine) => {
      //   setSelectedMedicine(medicine);

      //   toggleUpdateModal(medicine);
      // },
    },
  ];

  const handleOpen = () => setAddPackageDialogOpen(!addPackageDialogOpen);

  return (
    <div className="px-6 min-h-screen">
      {" "}
      <div className="bg-themeLight py-4">
        <DashboardNavbar
          inputField={
            <div className="text-black">
              <h1 className="font-bold text-2xl">Package Manager</h1>
            </div>
          }
        />
      </div>
      <div className="flex py-4 flex-wrap gap-10 justify-between items-center text-right max-sm:flex-col max-sm:gap-5 max-sm:text-left bg-themeLight">
        <div className="flex gap-3.5 items-center self-stretch my-auto max-sm:justify-between max-sm:w-full">
          <button
            onClick={handleOpen}
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
              <option value="name">Name</option>
              <option value="totalSessions">Total sessions</option>
              <option value="totalPrice">Pricing</option>
              <option value="createdAt">created at</option>
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
      
      <PackageDataTable
        packageData={packageData}
        actions={actions}
        selectedRow={setselectedPackage}
        pageInfo={{ currentPage: currentPage - 1, pageSize }}
      />
      <div className="flex justify-center mt-6">
        <DefaultPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
      <AddPackageModal
        open={addPackageDialogOpen}
        handleClose={handleOpen}
        onSubmit={Addpackagehandler}
      />
      <DeletePackageModal
        open={deleteDialogOpen}
        handleClose={toggleDeleteModal}
        handleDelete={handleDeletePackage}
      />
      <UpdatePackageModal
        open={updateModalOpen}
        handleClose={toggleUpdateModal}
        packageData={selectedPackage}
        onSubmit={handleUpdatePackage}
      />
    </div>
  );
}

export default Package;
