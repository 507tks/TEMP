import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import React, { useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";

const UserRoleTable = ({ roleData, actions, selectedRow, pageInfo }) => {
  const { currentPage, pageSize } = pageInfo;
 const [openDialog, setOpenDialog] = useState(false);
 const [selectedRole, setSelectedRole] = useState(null);

 const handleOpenDialog = (role) => {
   setSelectedRole(role);
   setOpenDialog(true);
 };

 const handleCloseDialog = () => {
   setOpenDialog(false);
   setSelectedRole(null);
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
              Role Name
            </th>
            <th className="p-3 text-left text-white text-sm font-bold">
              Collection Name & Access
            </th>
            <th className="p-3 text-left text-white text-sm font-bold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {roleData?.map((data, index) => (
            <tr
              key={data._id}
              className="border-t border-gray-300 hover:bg-gray-100"
            >
              <td className="p-3">{currentPage * pageSize + index + 1}</td>

              {/* Role Name */}
              <td
                className="p-3 cursor-pointer"
                onClick={() => handleOpenDialog(data)}
              >
                <div className="font-medium text-black">
                  {data.roleName
                    ? data.roleName.charAt(0).toUpperCase() +
                      data.roleName.slice(1)
                    : ""}
                </div>
              </td>

              {/* Collection Name & Access List */}
              <td className="p-3">
                <div className="text-sm text-black">
                  {data.roleAccess === "all" ? (
                    // If roleAccess is "all", display "All Access"
                    <span>All Access</span>
                  ) : (
                    // If roleAccess is an array, combine collection name and access list
                    data.roleAccess?.map((access) => (
                      <div key={access.collectionName}>
                        <strong>{access.collectionName}</strong>:{" "}
                        <span>{access.accessList.join(", ") || "N/A"}</span>
                      </div>
                    ))
                  )}
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
      {selectedRole && (
        <Dialog open={openDialog} handler={handleCloseDialog} size="md">
          <DialogHeader>
            <div className="flex justify-between items-center w-full">
              <h2 className="text-2xl font-bold">Role Details</h2>
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
                <strong>Role Name:</strong> {selectedRole.roleName}
              </p>
              <p>
                <strong>Access:</strong>{" "}
                {selectedRole.roleAccess === "all" ? (
                  "All Access"
                ) : (
                  <ul className="list-disc ml-5">
                    {selectedRole.roleAccess.map((access) => (
                      <li key={access.collectionName}>
                        <strong>{access.collectionName}</strong>:{" "}
                        {access.accessList.join(", ")}
                      </li>
                    ))}
                  </ul>
                )}
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
                      action.onClickFunction(selectedRole);
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
        </Dialog>
      )}
    </div>
  );
};

export default UserRoleTable;
