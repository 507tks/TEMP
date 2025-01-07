import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import React, { useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";

const MedicineDataTable = ({
  medicineData,
  actions,
  selectedRow,
  pageInfo,
}) => {
  const { currentPage, pageSize } = pageInfo;
const [openDialog, setOpenDialog] = useState(false);
const [selectedMedicine, setSelectedMedicine] = useState(null);

const handleOpenDialog = (medicine) => {
  setSelectedMedicine(medicine);
  setOpenDialog(true);
};

const handleCloseDialog = () => {
  setOpenDialog(false);
  setSelectedMedicine(null);
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
              Medicine Info
            </th>
            <th className="p-3 text-left text-white text-sm font-bold ">
              Manufacturing Info
            </th>
            <th className="p-3 text-left text-white text-sm font-bold hidden md:table-cell">
              Stock Info
            </th>
            <th className="p-3 text-left text-white text-sm font-bold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {medicineData?.map((data, index) => (
            <tr
              key={data._id}
              className="border-t border-gray-300 hover:bg-gray-100"
            >
              <td className="p-3">{currentPage * pageSize + index + 1}</td>

              {/* Medicine Info: Generic Name, Brand Name, Dosage Form */}
              <td
                className="p-3 cursor-pointer"
                onClick={() => handleOpenDialog(data)}
              >
                <div>
                  <div className="font-medium text-black">
                    <span className="font-bold">Generic Name:</span>{" "}
                    {data.genericName}
                  </div>
                  <div className="text-sm text-black">
                    <span className="font-bold">Brand:</span> {data.brandName}
                  </div>
                  <div className="text-sm text-black">
                    <span className="font-bold">Dosage Form:</span>{" "}
                    {data.dosageForm}
                  </div>
                  <div className="text-sm text-black">
                    <span className="font-bold">Strength:</span> {data.strength}
                  </div>
                </div>
                <div className=" space-y-1 md:hidden">
                  <div className="text-sm text-black">
                    <span className="font-bold">Quantity:</span> {data.quantity}
                  </div>
                  <div className="text-sm text-black">
                    <span className="font-bold">Price:</span>{" "}
                    {data.price || "N/A"}
                  </div>
                </div>
              </td>

              {/* Manufacturing Info: Manufacturer, Manufacturing Date, Expiry Date */}
              <td className="p-3 ">
                <div>
                  <div className="text-sm text-black">
                    <span className="font-bold">Manufacturer:</span>{" "}
                    {data.manufacturer}
                  </div>
                  <div className="text-sm text-black">
                    <span className="font-bold">Manufactured On:</span>
                    {new Date(data.manufacturingDate).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-black">
                    <span className="font-bold">Expiry Date:</span>
                    {new Date(data.expiryDate).toLocaleDateString()}
                  </div>
                </div>
              </td>

              {/* Stock Info: Quantity, Price */}
              <td className="p-3 hidden md:table-cell">
                <div>
                  <div className="text-sm text-black">
                    <span className="font-bold">Quantity:</span> {data.quantity}
                  </div>
                  <div className="text-sm text-black">
                    <span className="font-bold">Price:</span>{" "}
                    {data.price || "N/A"}
                  </div>
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
      {selectedMedicine && (
        <Dialog open={openDialog} handler={handleCloseDialog} size="lg">
          <DialogHeader className="sticky">
            <div className="flex justify-between items-center w-full p-4">
              <h2 className="text-xl md:text-2xl font-bold">
                Medicine Details
              </h2>
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
                <strong>Generic Name:</strong> {selectedMedicine.genericName}
              </div>
              <div>
                <strong>Brand Name:</strong> {selectedMedicine.brandName}
              </div>
              <div>
                <strong>Dosage Form:</strong> {selectedMedicine.dosageForm}
              </div>
              <div>
                <strong>Strength:</strong> {selectedMedicine.strength}
              </div>
              <div>
                <strong>Manufacturer:</strong> {selectedMedicine.manufacturer}
              </div>
              <div>
                <strong>Manufacturing Date:</strong>{" "}
                {new Date(
                  selectedMedicine.manufacturingDate,
                ).toLocaleDateString()}
              </div>
              <div>
                <strong>Expiry Date:</strong>{" "}
                {new Date(selectedMedicine.expiryDate).toLocaleDateString()}
              </div>
              <div>
                <strong>Quantity:</strong> {selectedMedicine.quantity}
              </div>
              <div>
                <strong>Price:</strong> {selectedMedicine.price || "N/A"}
              </div>
              <div className="col-span-1 sm:col-span-2 md:col-span-3">
                <strong>Description:</strong>{" "}
                {selectedMedicine?.description || "-"}
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
                      action.onClickFunction(selectedMedicine);
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

export default MedicineDataTable;
