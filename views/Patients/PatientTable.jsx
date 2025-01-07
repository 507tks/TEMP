import React, { useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogHeader,
} from "@material-tailwind/react";
import { IoSettingsSharp } from "react-icons/io5";
import Avatar from "@/component/common/Avatar";

const PatientTable = ({ patientData, actions, selectedRow, pageInfo }) => {
  const { currentPage, pageSize } = pageInfo;
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedPatientGender, setselectedPatientGender] = useState("");
  const handleOpenDialog = (patient) => {
    setSelectedPatient(patient);
    setselectedPatientGender(patient.gender);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPatient(null);
  };console.log(patientData)
  

  return (
    <div className="overflow-x-auto">
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
                Visit Info
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
            {patientData?.map((data, index) => (
              <tr
                key={data._id}
                className="border-t border-gray-300 hover:bg-gray-100"
              >
                <td className="p-3">{currentPage * pageSize + index + 1}</td>
                {/* First Column: Name, Age, Gender */}
                <td className="p-3">
                  <div
                    className="flex gap-2 cursor-pointer items-center relative group"
                    onClick={() => handleOpenDialog(data)}
                  >
                    {data.profilePic ? (
                      <img
                        src={data.thumbnail}
                        alt="thumbnail"
                        className="w-8 h-8 rounded-full cursor-pointer"
                      />
                    ) : (
                      <Avatar gender={data.gender} />
                    )}
                    <div>
                      <div className="font-medium text-black">
                        {data.name
                          ? data.name.charAt(0).toUpperCase() +
                            data.name.slice(1)
                          : ""}
                      </div>

                      <div className="text-sm text-black">
                        <span>Age: {data.age || "N/A"}</span>
                      </div>
                      <div className="text-sm text-black">
                        <span>Gender: {data.gender || "N/A"}</span>
                      </div>

                      {/* Contact Info for Small Screens */}
                      <div className="space-y-1 md:hidden mt-2">
                        <div className="text-sm text-black">
                          Phone: {data.phone || "N/A"}
                        </div>
                        <div className="text-sm text-black">
                          City: {data.city || "N/A"}, {data.state || ""}
                        </div>
                        <div className="text-sm text-black">
                          Pincode: {data.pincode || "N/A"}
                        </div>
                      </div>
                    </div>
                  </div>
                </td>

                {/* Second Column: Phone, Last Visit, Departments */}
                <td className="p-3 hidden md:table-cell">
                  <div>
                    <div className="text-sm text-black">
                      Last Visit:{" "}
                      {data.lastVisit
                        ? new Date(data.lastVisit).toLocaleDateString()
                        : "N/A"}
                    </div>
                    <div className="text-sm text-black">
                      Registered From: {data.registeredFrom || "N/A"}
                    </div>
                    <div className="text-sm text-black">
                      Reference: {data.reference || "N/A"}
                    </div>
                    <div className="text-sm text-black">
                      Departments:{" "}
                      {data.departments.map((dept) => dept.name).join(", ") ||
                        "N/A"}
                    </div>
                  </div>
                </td>

                {/* Third Column: State, Pincode, City */}
                <td className="p-3 hidden md:table-cell">
                  <div>
                    <div className="text-sm text-black">
                      <span>Patient Id: {data.patientId}</span>
                    </div>
                    <div className="text-sm text-black">
                      Phone: {data.phone || "N/A"}
                    </div>
                    <div className="text-sm text-black">
                      City: {data.city || "N/A"}, {data.state || ""}
                    </div>
                    <div className="text-sm text-black">
                      Pincode: {data.pincode || "N/A"}
                    </div>
                  </div>
                </td>

                {/* Mobile View: Combined Contact & Location Info */}
                <td className="p-3 md:hidden">
                    <div className="text-sm text-black">
                      <span>Patient Id: {data.patientId}</span>
                    </div>
                  <div className="text-sm text-black">
                    Last Visit:{" "}
                    {data.lastVisit
                      ? new Date(data.lastVisit).toLocaleDateString()
                      : "N/A"}
                  </div>
                  <div className="text-sm text-black">
                    Departments:{" "}
                    {data.departments.map((dept) => dept.name).join(", ") ||
                      "N/A"}
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
      </div>

      {selectedPatient && (
        <Dialog
          size="md"
          className="h-auto overflow-auto"
          open={openDialog}
          handler={handleCloseDialog}
        >
          <DialogHeader>
            <div className="flex items-center justify-between w-full">
              <h2 className="text-xl md:text-2xl font-bold">Patient Details</h2>
              <button
                onClick={handleCloseDialog}
                className="bg-red-500 text-white px-3 py-1 rounded shadow text-sm md:text-base"
              >
                Close
              </button>
            </div>
          </DialogHeader>
          <DialogBody divider>
            <div className="flex flex-col items-center">
              {/* Patient Info Section */}
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6 w-full text-black">
                {/* Profile Picture */}
                <div className="flex justify-center md:justify-start items-center">
                  {selectedPatient?.profilePic ? (
                    <img
                      src={selectedPatient.profilePic}
                      alt="Patient"
                      className="w-24 h-24 border-2 border-black md:w-32 md:h-32 rounded-full"
                    />
                  ) : (
                    <div className="w-24 h-24 md:w-32 md:h-32  rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                      <Avatar
                        gender={selectedPatientGender}
                        styles="w-24 h-24 md:w-32 md:h-32"
                      />

                      {/* <FaUserCircle className="w-24 h-24 md:w-32 md:h-32" /> */}
                    </div>
                  )}
                </div>

                {/* Patient Details */}
                <div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-6 w-full justify-between">
                  <div className="space-y-1 text-sm md:text-base">
                    {selectedPatient.name && (
                      <p>
                        <strong>Name:</strong> {selectedPatient.name}
                      </p>
                    )}

                    {selectedPatient.age && (
                      <p>
                        <strong>Age:</strong> {selectedPatient.age}
                      </p>
                    )}

                    {selectedPatient.gender && (
                      <p>
                        <strong>Gender:</strong> {selectedPatient.gender}
                      </p>
                    )}
                    {selectedPatient.patientId && (
                      <p>
                        <strong>PatientId:</strong> {selectedPatient.patientId}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1 text-sm md:text-base">
                    {selectedPatient.phone && (
                      <p>
                        <strong>Phone:</strong> {selectedPatient.phone}
                      </p>
                    )}

                    {selectedPatient.city && (
                      <p>
                        <strong>City:</strong> {selectedPatient.city}
                      </p>
                    )}

                    {selectedPatient.state && (
                      <p>
                        <strong>State:</strong> {selectedPatient.state}
                      </p>
                    )}

                    {selectedPatient.pincode && (
                      <p>
                        <strong>Pincode:</strong> {selectedPatient.pincode}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1 text-sm md:text-base">
                    {selectedPatient.lastVisit && (
                      <p>
                        <strong>Last Visit:</strong>{" "}
                        {new Date(
                          selectedPatient.lastVisit,
                        ).toLocaleDateString()}
                      </p>
                    )}

                    {selectedPatient.registeredFrom && (
                      <p>
                        <strong>Registered From:</strong>{" "}
                        {selectedPatient.registeredFrom}
                      </p>
                    )}

                    {selectedPatient.reference && (
                      <p>
                        <strong>Reference:</strong> {selectedPatient.reference}
                      </p>
                    )}
                    {selectedPatient?.departments?.length > 0 && (
                      <p>
                        <strong>Departments:</strong>
                        {selectedPatient?.departments
                          ?.map((dept) => dept.name)
                          .join(", ")}
                      </p>
                    )}
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
};

export default PatientTable;
