import React from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

function RoleTable({ roles, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="w-full text-sm border rounded-lg table-auto border-separate border-spacing-0">
        <thead className="text-sm font-semibold bg-custom-theme text-white">
          <tr className="text-center">
            <th className="px-2 py-1 text-center border-r border-white">S.No</th>
            <th className="px-2 py-1 text-center border-r border-white">Role Name</th>
            <th className="px-2 py-1 text-center border-r border-white">Role Access</th>
            <th className="px-2 py-1 text-center border-r border-white">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {roles?.map((role, index) => (
            <tr key={role._id} className="bg-white h-12 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 font-medium text-black">
              <td className="px-6 py-4 text-center">{index + 1}</td>
              <td className="px-6 py-4 text-sm font-medium">{role.roleName}</td>
              <td className="px-6 py-4 text-sm">
                {role.roleAccess === "all" ? (
                  "All Access"
                ) : (
                  <ul className="list-disc pl-5">
                    {role.roleAccess.map((access) => (
                      <li key={access.collectionName}>
                        {access.collectionName}: {access.accessList.join(", ")}
                      </li>
                    ))}
                  </ul>
                )}
              </td>
              <td className="px-6 py-4 text-right text-sm font-medium">
                <div className="flex justify-center space-x-2">
                  <button className="cursor-pointer text-blue-500" onClick={() => onEdit(role)}>
                    <FiEdit className="h-5 w-5" />
                  </button>
                  <button className="text-red-500 cursor-pointer" onClick={() => onDelete(role)}>
                    <MdDelete className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RoleTable;
