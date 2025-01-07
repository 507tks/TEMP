import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import React, { useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";

const InvoiceTable = ({ invoiceData, actions, selectedRow, pageInfo }) => {
  const { currentPage, pageSize } = pageInfo;
const [openDialog, setOpenDialog] = useState(false);
const [selectedInvoice, setSelectedInvoice] = useState(null);

const handleOpenDialog = (invoice) => {
  setSelectedInvoice(invoice);
  setOpenDialog(true);
};

const handleCloseDialog = () => {
  setOpenDialog(false);
  setSelectedInvoice(null);
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
              Invoice Details
            </th>
            <th className="p-3 text-left text-white text-sm font-bold">
              Payment Details
            </th>
            <th className="p-3 text-left text-white text-sm font-bold ">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {invoiceData?.map((data, index) => (
            <tr
              key={data._id}
              className="border-t border-gray-300 hover:bg-gray-100"
            >
              <td className="p-3">{currentPage * pageSize + index + 1}</td>

              {/* Combined Invoice Details Column */}
              <td
                className="p-3 cursor-pointer"
                onClick={() => handleOpenDialog(data)}
              >
                <div className="font-medium text-black">
                  <div className="md:hidden">
                    <div className="text-sm text-black">
                      <strong>Customer Name:</strong>
                      {data.customerName
                        ? data.customerName
                            .trim()
                            .toLowerCase()
                            .charAt(0)
                            .toUpperCase() +
                          data.customerName.trim().toLowerCase().slice(1)
                        : ""}
                    </div>
                    <div className="text-sm text-black">
                      <strong>Invoice Number:</strong> {data.invoiceNumber}
                    </div>

                    <div className="text-sm text-black">
                      <strong>Invoice Date:</strong>{" "}
                      {new Date(data.invoiceDate).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Display data in categories on larger screens */}
                  <div className="hidden md:block">
                    <div className="text-sm text-black">
                      <strong>Customer Name:</strong>{" "}
                      {data.customerName
                        ? data.customerName
                            .trim()
                            .toLowerCase()
                            .charAt(0)
                            .toUpperCase() +
                          data.customerName.trim().toLowerCase().slice(1)
                        : ""}
                    </div>
                    <div className="text-sm text-black">
                      <strong>Invoice Number:</strong> {data.invoiceNumber}
                    </div>

                    <div className="text-sm text-black">
                      <strong>Invoice Date:</strong>{" "}
                      {new Date(data.invoiceDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </td>
              <td className="p-3">
                <div className="font-medium text-black">
                  <div className="md:hidden">
                    <div className="text-sm text-black">
                      <strong>Due Date:</strong>{" "}
                      {new Date(data.invoiceDueDate).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-black">
                      <strong>Total Amount:</strong> ₹{data.totalAmount}
                    </div>
                    <div className="text-sm text-black">
                      <strong>Paid Status:</strong>{" "}
                      {data.isPaid ? "Paid" : "Unpaid"}
                    </div>
                  </div>

                  {/* Display data in categories on larger screens */}
                  <div className="hidden md:block">
                    <div className="text-sm text-black">
                      <strong>Due Date:</strong>{" "}
                      {new Date(data.invoiceDueDate).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-black">
                      <strong>Total Amount:</strong> ₹{data.totalAmount}
                    </div>
                    <div className="text-sm text-black">
                      <strong>Paid Status:</strong>{" "}
                      {data.isPaid ? "Paid" : "Unpaid"}
                    </div>
                  </div>
                </div>
              </td>
              {/* Actions Column */}
              <td
                onClick={() => handleOpenDialog(data)}
                className="p-3 cursor-pointer text-sm text-black"
              >
                <p className="">
                  <IoSettingsSharp />
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedInvoice && (
        <Dialog open={openDialog} handler={handleCloseDialog} size="md">
          <DialogHeader>
            <div className="flex justify-between items-center w-full">
              <h2 className="text-2xl font-bold">Invoice Details</h2>
              <button
                onClick={handleCloseDialog}
                className="bg-red-500 text-white px-4 py-1 rounded shadow"
              >
                Close
              </button>
            </div>
          </DialogHeader>
          <DialogBody divider>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 text-black">
              <p>
                <strong>Customer Name:</strong>{" "}
                {selectedInvoice.customerName || "N/A"}
              </p>
              <p>
                <strong>Invoice Number:</strong>{" "}
                {selectedInvoice.invoiceNumber || "N/A"}
              </p>
              <p>
                <strong>Invoice Date:</strong>{" "}
                {new Date(selectedInvoice.invoiceDate).toLocaleDateString() ||
                  "N/A"}
              </p>
              <p>
                <strong>Due Date:</strong>{" "}
                {new Date(
                  selectedInvoice.invoiceDueDate,
                ).toLocaleDateString() || "N/A"}
              </p>
              <p>
                <strong>Total Amount:</strong> ₹
                {selectedInvoice.totalAmount || "0"}
              </p>
              <p>
                <strong>Paid Status:</strong>{" "}
                {selectedInvoice.isPaid ? "Paid" : "Unpaid"}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold p-2 text-black">Actions</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 w-full">
                {actions.map((action, index) => {
                  if (
                    action.tooltip === "View Invoice" &&
                    !selectedInvoice.invoicePdfUrl
                  )
                    return null;
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center text-center p-3 border rounded shadow hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        action.onClickFunction(selectedInvoice);
                        handleCloseDialog();
                      }}
                    >
                      {action.icon}
                      <span className="mt-2 text-sm font-medium">
                        {action.tooltip}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </DialogBody>
        </Dialog>
      )}
    </div>
  );
};

export default InvoiceTable;
