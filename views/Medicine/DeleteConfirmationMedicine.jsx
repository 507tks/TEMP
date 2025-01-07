import React from "react";
import { Dialog, DialogBody, DialogFooter, Button } from "@material-tailwind/react";
import { deleteMedicineThunk } from "../../redux/thunk/medicine";
import { useDispatch } from "react-redux";

const DeleteConfirmationModal = ({ open, toggleModal, medicineId,medicineName }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {    
    dispatch(deleteMedicineThunk(medicineId))
      .unwrap()
      .then(() => {
      toggleModal(); // Close the modal
      })
      .catch((error) => {
        console.error("Failed to delete medicine:", error);
      });
  };
  return (
    <Dialog open={open} handler={toggleModal} className="max-w-lg mx-auto w-full">
      <DialogBody className="p-6">
        <h2 className="text-xl font-bold mb-4 text-center">Delete Medicine</h2>
        <p className="text-center">
          Are you sure you want to delete <span className="font-semibold">{medicineName}</span>?
        </p>
      </DialogBody>
      <DialogFooter className="flex justify-between">
        <Button variant="text" color="gray" onClick={toggleModal} className="w-full sm:w-auto">
          Cancel
        </Button>
        <Button color="red" className="w-full sm:w-auto ml-2 sm:ml-4" onClick={handleDelete}>
          Delete
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
