import React from "react";
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { getPatientThunk, deleteDocumentThunk } from "../../../redux/thunk/patients";
import { appointmentThunk } from "../../../redux/thunk/appointments";

const DeleteConfirmationModal = ({ open, toggle, onDelete, fileToDelete, selectedRow, currentPage, patient, appointment, searchValue }) => {
  const dispatch = useDispatch();

  const deleteFile = async () => {
    await dispatch(deleteDocumentThunk({ patientId: patient._id, filePath: fileToDelete.filePath }));
    if (appointment) {
      await dispatch(appointmentThunk({ date: "", status: "", search: searchValue, pageSize: 25, pageIndex: currentPage }))
        .unwrap()
        .then((data) => {
          const temp = data?.allAppoinments?.appointmentList.filter((x) => x?.patient[0]._id === patient._id);
          if (temp.length > 0) selectedRow(temp[0]);
        });
    } else
      await dispatch(getPatientThunk({ value: searchValue, pageSize: 25, pageIndex: currentPage }))
        .unwrap()
        .then((data) => {
          if (data?.allPatients) {
            const temp = data?.allPatients?.patients.filter((x) => x._id === patient._id);
            if (temp) selectedRow(temp[0]);
          }
        });
  };

  return (
    <Dialog open={open} handler={toggle} size="sm">
      <DialogHeader>Confirmation</DialogHeader>
      <DialogBody className="flex flex-col items-center">
        <p className="mb-4">Are you sure you want to delete this file?</p>
        <div className="flex">
          <button
            className="mr-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600" // Set green color for "Yes" button
            onClick={() => {
              deleteFile();
              onDelete();
              // setParentModalOpen(false);
            }}
          >
            Yes
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" // Set red color for "No" button
            onClick={() => toggle()}
          >
            No
          </button>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
