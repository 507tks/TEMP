import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserGear } from "react-icons/fa6";
import ChangeRolePopup from "./components/ChangeRolePopup";
import PopupForm from "./components/popupForm";
import {  deleteUser, getAllUsers } from "@/redux/thunk/user";
import { DefaultPagination } from "@/utils/pagination";
import { filterActionsByAccess } from "@/utils/helpers";
import DeleteUserModal from "./components/DeleteUserModal";
import { FaTrashAlt } from "react-icons/fa";
import { DashboardNavbar } from "@/widgets/layout";
import UserTable from "./components/UserTable";


const User = () => {
  const tableData = useSelector((state) => state.UserSlice);
  const [selectedUser, setSelectedUser] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopupForm, setShowPopupForm] = useState(false);
  const [showChangeRolePopup, setShowChangeRolePopup] = useState(false);
   const [showDeleteModal, setShowDeleteModal] = useState(false);
  const role = useSelector((state) => state.userrole?.userRole); 
  const loggedInUserId = localStorage.getItem("userId");
 

  // const hasAddUsersPermission = hasAccess(role, "users", "ADD_USER");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers({ currentPage, pageSize }));
  }, [currentPage,dispatch]);

  

   const toggleChangeRoleModal = () => {
    setShowChangeRolePopup(!showChangeRolePopup)
    if (showChangeRolePopup) {
      dispatch(getAllUsers({ currentPage, pageSize }));
    }
   };
  
  const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal);
   const handleDeleteUser = async () => {
    if (selectedUser) {
      dispatch(deleteUser(selectedUser._id));
      dispatch(getAllUsers({ currentPage, pageSize })); 
      toggleDeleteModal(); 
    }
  };
  
  const pageSize = 25;

  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const totalPages = tableData.allUsers?.totalUsers ? Math.ceil(tableData.allUsers?.totalUsers / pageSize) : 0;

  const actions = [
      {
      icon: <FaUserGear size={20} color="#4D8DBD" className="cursor-pointer" />,
      id: "CHANGE_ROLE",
      tooltip: "Change Role",
      onClickFunction: (user) => {
        setShowChangeRolePopup(true)
        setSelectedUser(user);
      } // Trigger ChangeRolePopup
    },
     {
      icon: <FaTrashAlt size={20} color="#FF4D4D" className="cursor-pointer" />,
      id: 'DELETE_USER',
      tooltip: 'Delete User',
       onClickFunction: (user) => {
        setSelectedUser(user);
         
         toggleDeleteModal()
       }, 
    },
  ];

  const filteredActions = filterActionsByAccess(actions, role, "users");

  return (
    <div className="px-4 sm:px-6 bg-themeLight py-10">
      <DashboardNavbar
        inputField={
          <div className="text-black">
            <h1 className="font-bold text-2xl">Users List</h1>
          </div>
        }
      />

      <div className="flex py-4 flex-wrap gap-10 justify-between items-center text-right max-sm:flex-col max-sm:gap-5 max-sm:text-left bg-themeLight">
        <div className="flex gap-3.5 items-center self-stretch my-auto max-sm:justify-between max-sm:w-full">
          <button
            onClick={() => setShowPopupForm(true)}
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
      </div>
      <div>
        <UserTable
          loggedInUserId={loggedInUserId}
          userData={tableData?.allUsers?.users}
          actions={filteredActions}
          selectedRow={setSelectedUser}
          loading={tableData.loading}
          pageInfo={{ currentPage: currentPage - 1, pageSize }}
        />
        {/* <ActionTable
          heading={userHeading}
          keys={userKeys}
          tableData={tableData?.allUsers?.users}
          actions={filteredActions}
          selectedRow={setSelectedUser}
          loading={tableData.loading}
          pageInfo={{ currentPage: currentPage - 1, pageSize }}
          loggedInUserId={loggedInUserId}
        /> */}
        <div className="flex flex-row justify-center">
          <DefaultPagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </div>
      </div>
      {/* <PermissionModal open={showPermissionsModal} toggler={() => setShowPermissionModal(!showPermissionsModal)} user={selectedUser} currentPage={currentPage} pageSize={pageSize} /> */}
      <PopupForm
        open={showPopupForm}
        toggler={() => setShowPopupForm(!showPopupForm)}
        currentPage={currentPage}
        pageSize={pageSize}
      />
      <ChangeRolePopup
        open={showChangeRolePopup}
        toggler={toggleChangeRoleModal}
        userId={selectedUser._id}
      />
      <DeleteUserModal
        open={showDeleteModal}
        toggleModal={toggleDeleteModal}
        onDelete={handleDeleteUser}
      />
    </div>
  );
};

export default User;
