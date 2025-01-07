import React, { useEffect, useState } from "react";
import UpdateSessionModal from "./modals/UpdateSesionModal";
import { FaRupeeSign } from "react-icons/fa";
import { TbReplace } from "react-icons/tb";
import DeleteSessionModal from "./modals/DeleteSessionModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSessionThunk,
  getPatientPackages,
} from "@/redux/thunk/package";
import { Autocomplete, TextField } from "@mui/material";
import { GrSchedule } from "react-icons/gr";
import { Tooltip } from "@material-tailwind/react";
import { MdDelete } from "react-icons/md";

function SessionsDetails({ patientId }) {
  const [selectedSession, setSelectedSession] = useState(null);
  const [isUpdateModalOpen, setisUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [actionType, setActionType] = useState("updateAmount");
  const [sessions, setSessions] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getPatientPackages({
        patientId,
        limit: 25,
        page: 1,
      }),
    );
  }, [patientId,dispatch]);
  const patientPackages = useSelector(
    (state) => state?.packageSlice?.patientPackages || [],
  );

  const handlePatientPackageChange = (event, newValue) => {
    setSelectedPackage(newValue);

    setSessions(newValue?.sessions);
  };
 
  const handleOpen = (session, type) => {
    setSelectedSession(session);

    setActionType(type);
    setisUpdateModalOpen(true);
  };

  const handleCloseModal = () => {
    setisUpdateModalOpen(false);
    setSelectedSession(null);
  };


  const OpenDeleteModal = (session) => {
    setSelectedSession(session);
    setisDeleteModalOpen(true);
  };

  const CloseDeleteModal = () => {
    setisDeleteModalOpen(false);
    setSelectedSession(null);
  };

  const handleDelete = (updatedSession) => {
    dispatch(
      deleteSessionThunk({
        id: selectedSession._id,
      }),
    ).then(() => {
      dispatch(
        getPatientPackages({
          patientId,
          limit: 25,
          page: 1,
        }),
      ).then((response) => {
        const updatedPackage = response.payload.find(
          (pkg) => pkg._id === selectedPackage?._id,
        );
        setSessions(updatedPackage?.sessions || []);
      });
    });

    setisUpdateModalOpen(false);
    setSelectedSession(null);
  };

  return (
    <>
      <div className="bg-gray-100 p-4 w-full">
        <h1 className="text-2xl font-bold text-center mb-2">
          Your Session Details
        </h1>
        <div className="flex flex-col items-center">
          {" "}
          <div className="bg-white shadow-lg rounded-lg  w-full max-w-6xl">
            <div className="bg-blue-100 flex justify-between items-center p-4 rounded-md shadow-md ">
              <h2 className="text-lg font-semibold text-blue-800">
                Session Details
              </h2>
              <div className="w-48">
                <Autocomplete
                  options={patientPackages}
                  size="small"
                  fullWidth
                  disableClearable
                  onChange={handlePatientPackageChange}
                  isOptionEqualToValue={(option, value) =>
                    option?.package?.name === value._id
                  }
                  getOptionLabel={(option) => option?.package?.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Package"
                      variant="outlined"
                    />
                  )}
                />
              </div>
            </div>
            <div className="overflow-x-auto ">
              <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg ">
                <thead>
                  <tr className="bg-blue-900">
                    <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-white">
                      Session Name
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-white hidden md:table-cell">
                      Date
                    </th>
                    <th className="border  border-gray-300 px-4 py-2 text-center text-sm font-medium text-white hidden md:table-cell">
                      Status
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-white md:hidden">
                      Date & Status
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-white">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.length > 0 ? (
                    sessions.map((session, index) => (
                      <tr
                        key={index}
                        className={`text-gray-700 border-t border-gray-300 hover:bg-gray-100 transition duration-200 `}
                      >
                        <td className="border border-gray-300 px-4 py-2">
                          Session {index + 1}
                        </td>
                        <td className="border text-center border-gray-300 px-4 py-2 hidden md:table-cell">
                          {new Date(session.date).toLocaleDateString()}
                        </td>
                        <td
                          className={`border text-center border-gray-300 px-4 py-2 font-medium hidden md:table-cell ${
                            session.status === "Completed"
                              ? "text-green-600"
                              : session.status === "Absent"
                                ? "text-red-600"
                                : session.status === "Rescheduled"
                                  ? "text-yellow-600"
                                  : session.status === "Scheduled"
                                    ? "text-blue-600"
                                    : session.status === "Cancelled"
                                      ? "text-gray-600"
                                      : "text-black" // Default color if status is missing
                          }`}
                        >
                          {session.status}
                        </td>

                        <td className="border border-gray-300 px-4 py-2 md:hidden">
                          <div>
                            <div className="text-sm">
                              {new Date(session.date).toLocaleDateString()}
                            </div>
                            <div
                              className={`font-medium ${
                                session.status === "Completed"
                                  ? "text-green-600"
                                  : session.status === "Absent"
                                    ? "text-red-600"
                                    : "text-gray-600"
                              }`}
                            >
                              {session.status}
                            </div>
                          </div>
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <div className="flex justify-center items-center gap-3">
                            <Tooltip content="Update Amount">
                              <button
                                onClick={() =>
                                  handleOpen(session, "updateAmount")
                                }
                              >
                                <FaRupeeSign color="teal" size={20} />
                              </button>
                            </Tooltip>

                            <Tooltip content="Update Status">
                              <button
                                onClick={() =>
                                  handleOpen(session, "updateStatus")
                                }
                              >
                                <TbReplace color="blue" size={20} />
                              </button>
                            </Tooltip>

                            <Tooltip content="Reschedule Session">
                              <button
                                onClick={() =>
                                  handleOpen(session, "reschedule")
                                }
                              >
                                <GrSchedule color="black" size={20} />
                              </button>
                            </Tooltip>

                            <Tooltip content="Delete Session">
                              <button onClick={() => OpenDeleteModal(session)}>
                                <MdDelete color="red" size={20} />
                              </button>
                            </Tooltip>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <div className="py-4 text-center ">
                      No data to show please select any package
                    </div>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <UpdateSessionModal
          isOpen={isUpdateModalOpen}
          onClose={handleCloseModal}
          sessionData={selectedSession || {}}
          actionType={actionType}
          patientId={patientId}
          selectedPackage={selectedPackage}
          setSessions={setSessions}
          setSelectedPackage={setSelectedPackage}
        />
        <DeleteSessionModal
          isOpen={isDeleteModalOpen}
          onClose={CloseDeleteModal}
          sessionData={selectedSession || {}}
          onDelete={handleDelete}
        />
      </div>
      <div className="px-4 bg-gray-100 mx-auto my-10 ">
        <h1 className="text-center text-2xl font-bold mb-4">PAYMENT SECTION</h1>
        <div className="flex flex-col items-center">
          {" "}
          <div className="bg-white shadow-md rounded-md overflow-hidden w-full max-w-6xl">
            <div className="bg-blue-500 text-white text-center py-3 font-medium text-lg">
              Payment Details
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Amount
                </label>
                <input
                  type="text"
                  value={selectedPackage?.totalPrice || 0}
                  readOnly
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount Collected
                </label>
                <input
                  type="text"
                  value={selectedPackage?.sumOfReceivedAmount || 0}
                  readOnly
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount to be Collected
                </label>
                <input
                  value={
                    selectedPackage?.totalPrice -
                      selectedPackage?.sumOfReceivedAmount || 0
                  }
                  type="text"
                  readOnly
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SessionsDetails;
