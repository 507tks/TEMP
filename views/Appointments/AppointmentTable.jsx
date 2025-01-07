import Avatar from "@/component/common/Avatar";
import {
  Dialog,
  DialogBody,
  DialogHeader,
  Spinner,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";

function AppointmentDataTable({
  appointmentData,
  actions,
  selectedRow,
  pageInfo,
  loading,
}) {
  const { currentPage, pageSize } = pageInfo;
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleOpenDialog = (patient) => {
    setSelectedPatient(patient);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPatient(null);
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
              Details
            </th>
            <th className="p-3 text-left text-white text-sm font-bold md:table-cell">
              Appointment Info
            </th>
            <th className="p-3 text-left text-white text-sm font-bold hidden md:table-cell">
              Contact Info
            </th>
            <th className="p-3 text-left text-white text-sm font-bold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr className="h-24">
              <td colSpan="5">
                <div className="flex justify-center">
                  <Spinner className="h-8 w-8" color="purple" />
                </div>
              </td>
            </tr>
          ) : (
            <>
              {appointmentData?.map((data, index) => (
                <tr
                  key={data._id}
                  className="border-t border-gray-300 hover:bg-gray-100"
                >
                  <td className="p-3">{currentPage * pageSize + index + 1}</td>

                  {/* Details Column: Patient Name, Age, Gender */}
                  <td className="p-3">
                    <div
                      className="flex gap-2 cursor-pointer items-center relative group"
                      onClick={() => handleOpenDialog(data)}
                    >
                      {" "}
                      {data.profilePic ? (
                        <img
                          src={data.thumbnail}
                          alt="thumbnail"
                          className="w-8 h-8 rounded-full cursor-pointer"
                        />
                      ) : (
                        <Avatar gender={data.patient[0]?.gender} />
                      )}
                      <div>
                        <div className="font-medium text-black">
                          {data.patient[0]?.name
                            ? data.patient[0]?.name.charAt(0).toUpperCase() +
                              data.patient[0]?.name.slice(1)
                            : ""}
                        </div>
                        <div className="text-sm text-black">
                          Age: {data.patient[0]?.age || "N/A"}
                        </div>
                        <div className="text-sm text-black">
                          Gender: {data.patient[0]?.gender || "N/A"}
                        </div>
                        <div className="space-y-1 md:hidden">
                          <div className="text-sm text-black">
                            Phone: {data.patient[0]?.phone || "N/A"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Visit Info Column: Date, Status, Departments */}
                  <td className="p-3 hidden md:table-cell">
                    <div className="text-sm text-black">
                      Appointment Date:{" "}
                      {new Date(data.date).toLocaleDateString()}
                    </div>
                    <div className="text-sm flex text-black">
                      Status:
                      <span
                        className={`text-sm font-semibold ${
                          data.status === "Scheduled"
                            ? "text-blue-900"
                            : data.status === "Completed"
                              ? "text-green-900"
                              : data.status === "Cancelled"
                                ? "text-red-900"
                                : data.status === "Absent"
                                  ? "text-yellow-900"
                                  : "text-gray-900"
                        }`}
                      >
                        {data.status || "N/A"}
                      </span>
                    </div>
                    <div className="text-sm text-black">
                      Department:{" "}
                      {data.departments?.map((d) => d.name).join(", ") || "N/A"}
                    </div>
                    <div className="text-sm text-black">
                      Doctor: {data.doctor[0]?.name || "N/A"}
                    </div>
                  </td>

                  {/* Contact Info Column: Phone, Hospital */}
                  <td className="p-3 hidden md:table-cell">
                    <div className="text-sm text-black">
                      Phone: {data.patient[0]?.phone || "N/A"}
                    </div>
                    <div className="text-sm text-black">
                      Hospital: {data.hospital[0]?.name || "N/A"}
                    </div>
                  </td>

                  {/* Mobile View: Combined Contact & Visit Info */}
                  <td className="p-3 md:hidden">
                    <div className="text-sm text-black">
                      Appointment Date:{" "}
                      {new Date(data.date).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-black">
                      Status: {data.status || "N/A"}
                    </div>
                    <div className="text-sm text-black">
                      Department:{" "}
                      {data.departments?.map((d) => d.name).join(", ") || "N/A"}
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
            </>
          )}
        </tbody>
      </table>

      {selectedPatient && (
        <Dialog
          size="sm"
          className="h-auto overflow-auto"
          open={openDialog}
          handler={handleCloseDialog}
        >
          <DialogHeader>
            <div className="flex items-center justify-between w-full">
              <h2 className="text-xl md:text-2xl font-bold">
                Appointment Details
              </h2>
              <button
                onClick={handleCloseDialog}
                className="bg-red-500 text-white px-3 py-1 rounded shadow text-sm md:text-base"
              >
                Close
              </button>
            </div>
          </DialogHeader>
          <DialogBody divider>
            <div className="flex flex-col items-center gap-4 md:gap-4">
              {/* Patient Info Section */}
              <div className="flex flex-col md:flex-row md:items-start gap-4 w-full text-black">
                {/* Profile Picture */}
                <div className="flex justify-center md:justify-start">
                  {selectedPatient?.profilePic ? (
                    <img
                      src={selectedPatient.profilePic}
                      alt="Patient"
                      className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-gray-300"
                    />
                  ) : (
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                      <Avatar
                        gender={selectedPatient.patient[0]?.gender}
                        styles="w-24 h-24 md:w-32 md:h-32"
                      />
                    </div>
                  )}
                </div>

                {/* Patient Details - Columns */}
                <div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-6 w-full justify-between">
                  <div className="space-y-1 text-sm md:text-base">
                    <p>
                      <strong>Name:</strong>{" "}
                      {selectedPatient.patient[0]?.name || "N/A"}
                    </p>
                    <p>
                      <strong>Age:</strong>{" "}
                      {selectedPatient.patient[0]?.age || "N/A"}
                    </p>
                    <p>
                      <strong>Gender:</strong>{" "}
                      {selectedPatient.patient[0]?.gender || "N/A"}
                    </p>
                  </div>

                  <div className="space-y-1 text-sm md:text-base">
                    <p>
                      <strong>Appointment Date:</strong>{" "}
                      {selectedPatient?.date
                        ? new Date(selectedPatient.date).toLocaleDateString()
                        : "N/A"}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={`text-sm font-semibold ${
                          selectedPatient?.status === "Scheduled"
                            ? "text-blue-900"
                            : selectedPatient?.status === "Completed"
                              ? "text-green-900"
                              : selectedPatient?.status === "Cancelled"
                                ? "text-red-900"
                                : selectedPatient.status === "Absent"
                                  ? "text-yellow-900"
                                  : "text-gray-900"
                        }`}
                      >
                        {selectedPatient?.status || "N/A"}
                      </span>
                    </p>
                    <p>
                      <strong>Department:</strong>{" "}
                      {selectedPatient?.departments
                        ?.map((d) => d.name)
                        .join(", ") || "N/A"}
                    </p>
                    <p>
                      <strong>Doctor:</strong>{" "}
                      {selectedPatient?.doctor[0]?.name || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions Section */}
              <h2 className="text-xl md:text-2xl font-bold p-2 text-black">
                Actions
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 w-full">
                {actions.map((action, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center p-2 border rounded shadow hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      action.onClickFunction(selectedPatient);
                      handleCloseDialog();
                    }}
                  >
                    {action.icon}
                    <span className="mt-1 text-xs md:text-xs font-medium">
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
}

export default AppointmentDataTable;
