import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaEdit } from "react-icons/fa";
import Form from "./Form";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorThunk, OnBoardDoctorThunk } from "../../redux/thunk/doctor";
// import { Button, Input } from "@material-tailwind/react";
import AddDoctorModal from "./AddDoctorModal";
import EditDoctorModal from "./EditDoctorModal";
import { DashboardNavbar } from "@/widgets/layout";
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import { IoSettingsSharp } from "react-icons/io5";

const Doctor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const [selectedDoctor, setSelectedDoctor] = useState(null); 

   const [openDoctorDialog, setOpenDoctorDialog] = useState(false);
   

   const handleOpenDialog = (doctor) => {
     setSelectedDoctor(doctor);
     setOpenDoctorDialog(true);
   };

   const handleCloseDialog = () => {
     setOpenDoctorDialog(false);
   };

  const [doctors, setDoctors] = useState([]);
  const temp = useSelector((state) => state.DoctorSlice);

  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const [id, setId] = useState();

  const toggleModal = (doctor) => {
    setSelectedDoctor(doctor);
    setId(doctor._id);
    setIsModalOpen(!isModalOpen);
  };


// Function to open the dialog
const openDialog = () => {
  setIsDialogOpen(true);
};

// Function to close the dialog
const closeDialog = () => {
  setIsDialogOpen(false);
};
  useEffect(() => {
    dispatch(getDoctorThunk({ searchTerm }));
  }, [searchTerm,dispatch]);

  useEffect(() => {
    if (temp?.doctorList) setDoctors(temp?.doctorList);
  }, [temp?.doctorList]);

  const handleFormSubmit = (formData) => {
    dispatch(OnBoardDoctorThunk(formData))
    .unwrap()
    .then(()=>dispatch(getDoctorThunk({ searchTerm:"" })))
  };
  
 
 const openEditModal = (doctor) => {
   setSelectedDoctor(doctor); 
   setIsEditModalOpen(true); // Open edit modal
 };
  return (
    <div className=" bg-themeLight">
      <div className="relative w-full px-4 py-10">
        <DashboardNavbar
          inputField={
            <div className="flex items-center space-x-2 border-2 border-gray-300 bg-transparent rounded focus:border-blue-500 px-4 py-2 w-80">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 2a8 8 0 105.293 14.293l4.707 4.707a1 1 0 001.414-1.414l-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 100 12A6 6 0 0010 4z"
                  clip-rule="evenodd"
                />
              </svg>
              <input
                label="Search"
                placeholder="Find a Doctor"
                color="blue"
                className="bg-transparent focus:outline-none text-black placeholder-gray-500 w-full"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          }
        />
        <h1 className="text-2xl font-bold mb-4 ">Doctor List</h1>
        <div className="flex justify-between items-center mb-4 ">
          <button
            onClick={openDialog}
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
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-sm bg-themeLight">
            <thead className="bg-blue-900">
              <tr>
                <th className="p-3 text-left text-white text-sm font-bold">
                  S No.
                </th>
                <th className="p-3 text-left text-white text-sm font-bold">
                  <span className="block md:hidden">Doctor Info</span>
                  <span className="hidden md:block">Doctor Details</span>
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
              {doctors?.map((doctor, index) => (
                <tr
                  key={doctor._id}
                  className="border-t border-gray-300 hover:bg-gray-100"
                >
                  {/* S No. */}
                  <td className="p-3">{index + 1}</td>

                  {/* Combined Details Column for Small Screens */}
                  <td
                    className="p-3 md:hidden"
                    onClick={() => handleOpenDialog(doctor)}
                  >
                    <div className="font-medium text-black">
                      {" "}
                      {doctor.name
                        ? doctor.name.charAt(0).toUpperCase() +
                          doctor.name.slice(1)
                        : ""}
                    </div>

                    <div className="text-sm text-black">
                      <span>Email: {doctor.email}</span>
                    </div>
                    <div className="text-sm text-black">
                      <span>Phone: {doctor.mobile}</span>
                    </div>
                    <div className="text-sm text-black">
                      <span>
                        Qualifications: {doctor.qualifications.join(", ")}
                      </span>
                    </div>
                    <div className="text-sm text-black">
                      <span>Experience: {doctor.experience} years</span>
                    </div>
                    <div className="text-sm text-black">
                      <span>Clinic Address: {doctor.clinicAddress}</span>
                    </div>
                  </td>

                  {/* Expanded Details Column for Larger Screens */}
                  <td
                    className="p-3 hidden md:table-cell "
                    onClick={() => handleOpenDialog(doctor)}
                  >
                    <div className="font-medium text-black">
                      {doctor.name
                        ? doctor.name.charAt(0).toUpperCase() +
                          doctor.name.slice(1)
                        : ""}
                    </div>
                    <div className="text-sm text-black">
                      <span>Specialization: {doctor.specialization}</span>
                    </div>
                    <div className="text-sm text-black">
                      <span>Experience: {doctor.experience} years</span>
                    </div>
                    <div className="text-sm text-black">
                      <span>
                        Qualifications: {doctor.qualifications.join(", ")}
                      </span>
                    </div>
                  </td>

                  {/* Hidden Contact Info Column for Small Screens */}
                  <td className="p-3 hidden md:table-cell">
                    <div className="text-sm text-black">
                      <span>Email: {doctor.email}</span>
                    </div>
                    <div className="text-sm text-black">
                      <span>Phone: {doctor.mobile}</span>
                    </div>
                    <div className="text-sm text-black">
                      <span>Clinic Address: {doctor.clinicAddress}</span>
                    </div>
                  </td>

                  {/* Actions Column */}
                  <td
                    onClick={() => handleOpenDialog(doctor)}
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
        {isModalOpen && (
          <Form isOpen={isModalOpen} onClose={toggleModal} id={id} />
        )}
        <AddDoctorModal
          isOpen={isDialogOpen}
          handleClose={closeDialog}
          handleSubmit={handleFormSubmit}
        />
        {isEditModalOpen && (
          <EditDoctorModal
            isOpen={isEditModalOpen}
            handleClose={() => {
              setIsEditModalOpen(false);
              setSelectedDoctor(null); // Clear selectedDoctor on modal close
            }}
            handleSubmit={handleFormSubmit}
            doctorData={selectedDoctor}
          />
        )}

        {openDoctorDialog && (
          <Dialog
            open={openDoctorDialog}
            handler={handleCloseDialog}
            className="h-auto overflow-y-auto"
            size="md"
          >
            <DialogHeader>
              <div className="flex justify-between items-center w-full">
                <h2 className="text-2xl font-bold">Doctor Details</h2>
                <button
                  onClick={handleCloseDialog}
                  className="bg-red-500 text-white px-4 py-1 rounded shadow"
                >
                  Close
                </button>
              </div>
            </DialogHeader>
            <DialogBody divider>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  gap-4 text-black">
                <p>
                  <strong>Name:</strong> {selectedDoctor.name}
                </p>
                <p>
                  <strong>Specialization:</strong>{" "}
                  {selectedDoctor.specialization}
                </p>
                <p>
                  <strong>Experience:</strong> {selectedDoctor.experience} years
                </p>
                <p>
                  <strong>Qualifications:</strong>{" "}
                  {selectedDoctor.qualifications.join(", ")}
                </p>
                <p>
                  <strong>Email:</strong> {selectedDoctor.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedDoctor.mobile}
                </p>
                <p>
                  <strong>Clinic Address:</strong>{" "}
                  {selectedDoctor.clinicAddress}
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold p-2 text-black">Actions</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full xll:grid-cols-8 xl:grid-cols-4">
                  <div
                    className="flex flex-col items-center justify-center text-center p-3 border rounded shadow hover:bg-gray-100 cursor-pointer lg:w-[100px] xl:w-fit"
                    onClick={() => {
                      toggleModal(selectedDoctor);
                      handleCloseDialog();
                    }}
                  >
                    <FaCalendarAlt
                      size={20}
                      className="cursor-pointer text-blue-500"
                    />
                    Reschedule
                  </div>
                  <div
                    className="flex flex-col items-center justify-center text-center p-3 border rounded shadow hover:bg-gray-100 cursor-pointer xl:w-[85px] lg:ml-2 xl:ml-1"
                    onClick={() => {
                      openEditModal(selectedDoctor);
                      handleCloseDialog();
                    }}
                  >
                    {" "}
                    <FaEdit
                      size={20}
                      className="cursor-pointer text-green-500"
                    />
                    Edit details
                  </div>
                </div>
              </div>
            </DialogBody>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default Doctor;
