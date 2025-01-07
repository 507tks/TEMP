import React, { useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogHeader,
} from "@material-tailwind/react";

import { IoSettingsSharp } from "react-icons/io5"; 

const UserTable = ({
  userData,
  actions,
  selectedRow,
  pageInfo,
  loggedInUserId,
}) => {
  const { currentPage, pageSize } = pageInfo;
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleOpenDialog = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-sm bg-themeLight">
        <thead className="bg-blue-900">
          <tr>
            <th className="p-3 text-left text-white text-sm font-bold">
              S No.
            </th>
            <th className="p-3 text-left text-white text-sm font-bold">
              User Info
            </th>
            <th className="p-3 text-left text-white text-sm font-bold hidden md:table-cell">
              User Role
            </th>
            <th className="p-3 text-left text-white text-sm font-bold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {userData?.map((data, index) => (
            <tr
              key={data._id}
              className="border-t border-gray-300 hover:bg-gray-100"
            >
              <td className="p-3">{currentPage * pageSize + index + 1}</td>

              {/* User Info Column with Clickable Name */}
              <td
                className="p-3 cursor-pointer"
                onClick={() => handleOpenDialog(data)}
              >
                <div
                  onClick={() => handleOpenDialog(data)}
                  className="cursor-pointer"
                >
                  <div className="font-medium text-black ">
                    {data.name
                      ? data.name.charAt(0).toUpperCase() + data.name.slice(1)
                      : "N/A"}
                    {data._id === loggedInUserId ? "( You )" : ""}
                  </div>
                </div>
                <div className="text-sm text-black">
                  Email: {data.email || "N/A"}
                </div>
                <div className="text-sm text-black md:hidden">
                  Role: {data.userRole || "N/A"}
                </div>
              </td>

              {/* User Role Column */}
              <td className="p-3 hidden md:table-cell">
                <div className="text-sm text-black">
                  {data.userRole || "N/A"}
                </div>
              </td>

              {/* Actions Column */}
              <td
                onClick={() => handleOpenDialog(data)}
                className="p-3  text-sm text-black"
              >
                <p className="cursor-pointer">
                  <IoSettingsSharp />
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Dialog for User Details */}
      {selectedUser && (
        <Dialog open={openDialog} handler={handleCloseDialog} size="md">
          <DialogHeader>
            <div className="flex justify-between items-center w-full">
              <h2 className="text-2xl font-bold">User Details</h2>
              <button
                onClick={handleCloseDialog}
                className="bg-red-500 text-white px-4 py-1 rounded shadow"
              >
                Close
              </button>
            </div>
          </DialogHeader>
          <DialogBody divider>
            <div className="space-y-4 text-black">
              <p>
                <strong>Name:</strong> {selectedUser.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.email || "N/A"}
              </p>
              <p>
                <strong>User Role:</strong> {selectedUser.userRole || "N/A"}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold p-2 text-black">Actions</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 w-full">
                {actions.map((action, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center p-3 border rounded shadow hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      action.onClickFunction(selectedUser);
                      handleCloseDialog();
                    }}
                  >
                    {action.icon}
                    <span className="mt-2 text-sm font-medium">
                      {action.tooltip}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </DialogBody>
          {/* <DialogFooter>
            <div className="flex space-x-4">
              <div
                className="flex flex-col items-center text-center p-3 border rounded shadow hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  actions.edit(selectedUser);
                  handleCloseDialog();
                }}
              >
                <FaUserGear
                  size={20}
                  color="#4D8DBD"
                  className="cursor-pointer"
                />
                <span className="mt-2 text-sm font-medium">Change Role</span>
              </div>
              <div
                className="flex flex-col items-center text-center p-3 border rounded shadow hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  actions.delete(selectedUser);
                  handleCloseDialog();
                }}
              >
                <FaTrashAlt
                  size={20}
                  color="#FF4D4D"
                  className="cursor-pointer"
                />
                <span className="mt-2 text-sm font-medium">Delete User</span>
              </div>
            
            </div>
          </DialogFooter> */}
        </Dialog>
      )}
    </div>
  );
};

export default UserTable;
