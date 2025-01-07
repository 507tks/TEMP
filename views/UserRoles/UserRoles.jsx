import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import DeleteRoleConfirmationModal from "./components/DeleteRoleConfirmationModal";
import UpdateRoleModal from "./components/UpdateRoleModal";
import AddRoleModal from "./components/AddRoleModal";
import { getAllRoles } from "@/redux/thunk/userrole";

import { filterActionsByAccess } from "@/utils/helpers";
import { DashboardNavbar } from "@/widgets/layout";
import UserRoleTable from "./components/UserRoleTable";

function UserRoles() {
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [showUpdateRoleModal, setShowUpdateRoleModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const dispatch = useDispatch();
const role = useSelector((state) => state.userrole?.userRole); 
  const toggleUpdateModal = (role = null) => {
    setSelectedRole(role);
    setShowUpdateRoleModal(!showUpdateRoleModal);
    if (showUpdateRoleModal) {
      dispatch(getAllRoles());
    }
  };

  const toggleDeleteModal = (role = null) => {
    setSelectedRole(role);
    setShowDeleteModal(!showDeleteModal);
    if (showDeleteModal) {
      dispatch(getAllRoles());
    }
  };

  const toggleAddRoleModal = () => {
    setShowAddRoleModal(!showAddRoleModal);
    if (showAddRoleModal) {
      dispatch(getAllRoles());
    }
  };

  const refreshRoles = () => {
    dispatch(getAllRoles());
  };

  useEffect(() => {
    dispatch(getAllRoles());
  }, [dispatch]);

  const allRole = useSelector((state) => state.userrole?.allRoles);

  const actions = [
    {
      icon: <FaEdit size={20} color="#4D8DBD" className="cursor-pointer" />,
      id: "EDIT_ROLE",
      tooltip: "Edit Role",
      onClickFunction: (role) => {
        setSelectedRole(role);
        toggleUpdateModal(role);
      }
    },
    {
      icon: <FaTrashAlt size={20} color="#FF4D4D" className="cursor-pointer" />,
      id: "DELETE_ROLE",
      tooltip: "Delete Role",
      onClickFunction: (role) => {
        setSelectedRole(role);
        toggleDeleteModal(role);
      }
    }
  ];
  const filteredActions = filterActionsByAccess(actions, role, "userroles");
  
  return (
    <div className="px-4 sm:px-6 bg-themeLight py-10">
      <DashboardNavbar
        inputField={
          <div className="text-black">
            <h1 className="font-bold text-2xl">User access control</h1>
          </div>
        }
      />

      <div className="flex py-4 flex-wrap gap-10 justify-between items-center text-right max-sm:flex-col max-sm:gap-5 max-sm:text-left bg-themeLight">
        <div className="flex gap-3.5 items-center self-stretch my-auto max-sm:justify-between max-sm:w-full">
          <button
            onClick={toggleAddRoleModal}
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
        <UserRoleTable
          roleData={allRole}
          actions={filteredActions}
          selectedRow={setSelectedRole}
          pageInfo={{ currentPage: 0, pageSize: 10 }}
        />

        {/* <ActionTable
          heading={userRoleHeading}
          keys={userRoleKeys}
          tableData={allRole}
          actions={filteredActions}
          selectedRow={setSelectedRole}
          loading={false} // Replace with actual loading state if available
          pageInfo={{ currentPage: 0, pageSize: 10 }} // Adjust as needed
          loggedInUserId={localStorage.getItem("userId")}
        /> */}
      </div>

      <AddRoleModal
        open={showAddRoleModal}
        onClose={() => setShowAddRoleModal(false)}
        onAdd={refreshRoles}
      />
      <UpdateRoleModal
        open={showUpdateRoleModal}
        onClose={toggleUpdateModal}
        selectedRole={selectedRole}
        onUpdate={refreshRoles}
      />
      <DeleteRoleConfirmationModal
        open={showDeleteModal}
        toggleModal={toggleDeleteModal}
        roleId={selectedRole?._id}
        roleName={selectedRole?.roleName}
        onDelete={refreshRoles}
      />
    </div>
  );
}

export default UserRoles;
