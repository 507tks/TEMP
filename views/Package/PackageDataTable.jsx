import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import React, { useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";

const PackageDataTable = ({ packageData, actions, selectedRow, pageInfo }) => {
  const { currentPage, pageSize } = pageInfo;
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handleOpenDialog = (pkg) => {
    setSelectedPackage(pkg);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPackage(null);
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
              Package Name
            </th>
            <th className="p-3 text-left text-white text-sm font-bold hidden lg:table-cell">
              Services Offered
            </th>
            <th className="p-3 text-left text-white text-sm font-bold hidden lg:table-cell">
              Total Sessions
            </th>
            <th className="p-3 text-left text-white text-sm font-bold hidden lg:table-cell">
              Pricing
            </th>
            <th className="p-3 text-left text-white text-sm font-bold hidden lg:table-cell">
              Interval
            </th>
            <th className="p-3 text-left text-white text-sm font-bold block lg:hidden">
              Package Details
            </th>
            <th className="p-3 text-left text-white text-sm font-bold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {packageData.length > 0 &&
            packageData?.map((pkg, index) => (
              <tr
                key={pkg._id}
                onClick={() => handleOpenDialog(pkg)}
                className="border-t border-gray-300 hover:bg-gray-100"
              >
                <td className="p-3">{currentPage * pageSize + index + 1}</td>

                {/* Package Name */}
                <td
                  className="p-3 cursor-pointer"
                  onClick={() => handleOpenDialog(pkg)}
                >
                  <div className="font-medium text-black capitalize">
                    {pkg.name}
                  </div>
                </td>

                {/* Package Details (Combined for small/medium screens) */}
                <td className="p-3 lg:hidden">
                  <div className="text-sm text-black">
                    <strong>Services Offered:</strong>
                    <ul className="list-disc pl-5">
                      {pkg.services.map((service, idx) => (
                        <li key={idx}>{service}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-sm text-black">
                    <strong>Total Sessions:</strong> {pkg.totalSessions}
                  </div>
                  <div className="text-sm text-black">
                    <strong>Pricing:</strong> {pkg?.price}
                  </div>
                  <div className="text-sm text-black">
                    <strong>Interval:</strong>
                    <span>{pkg?.interval}</span>
                  </div>
                </td>

                {/* Services Offered */}
                <td className="p-3 hidden lg:table-cell">
                  <ul className="list-disc pl-5 text-sm text-black">
                    {pkg.services.map((service, idx) => (
                      <li key={idx}>{service}</li>
                    ))}
                  </ul>
                </td>

                {/* Total Sessions */}
                <td className="p-3 hidden lg:table-cell">
                  {pkg?.totalSessions}
                </td>

                {/* Pricing */}
                <td className="p-3 hidden lg:table-cell">{pkg?.price}</td>

                {/* Schedule Preferences */}
                <td className="p-3 hidden lg:table-cell">{pkg?.interval}</td>

                {/* Actions Column */}
                <td
                  onClick={() => handleOpenDialog(pkg)}
                  className="p-3 text-sm text-black"
                >
                  <p className="cursor-pointer">
                    <IoSettingsSharp />
                  </p>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {selectedPackage && (
        <Dialog open={openDialog} handler={handleCloseDialog} size="lg">
          <DialogHeader className="sticky">
            <div className="flex justify-between items-center w-full p-4">
              <h2 className="text-xl md:text-2xl font-bold">Package Details</h2>
              <button
                onClick={handleCloseDialog}
                className="bg-red-500 text-white px-3 md:px-4 py-1 rounded shadow hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </DialogHeader>

          <DialogBody divider className="overflow-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-black">
              <div>
                <strong>Package Name:</strong> {selectedPackage?.name}
              </div>
              <div>
                <strong>Total Sessions:</strong>{" "}
                {selectedPackage?.totalSessions}
              </div>
              <div>
                <strong>Pricing:</strong> {selectedPackage?.price}
              </div>
              <div>
                <strong>Services Offered:</strong>
                <ul className="list-disc pl-5">
                  {selectedPackage?.services.map((service, idx) => (
                    <li key={idx}>{service}</li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>Interval:</strong>{" "}
                {selectedPackage?.interval}
              </div>
             
            </div>

            <div className="mt-4 w-full border border-gray-300" />

            <div className="mt-6">
              <h2 className="text-xl md:text-2xl font-bold mb-4">Actions</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {actions.map((action, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center p-4 border rounded shadow hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      action.onClickFunction(selectedPackage);
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

export default PackageDataTable;
