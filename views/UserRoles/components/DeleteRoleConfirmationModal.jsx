import React from "react";
import { Dialog, DialogBody, DialogFooter, Button } from "@material-tailwind/react";

import { useDispatch } from "react-redux";
import { deleteRoleThunk } from "../../../redux/thunk/userrole";

const DeleteRoleConfirmationModal = ({ open, toggleModal, roleId, roleName }) => {
  const dispatch = useDispatch();
   const handleDelete = async () => {
     try {
       await dispatch(deleteRoleThunk(roleId)).unwrap();
       toggleModal();
     } catch (error) {
         toggleModal();
      
     }
   };

  return (
    <Dialog open={open} handler={toggleModal} className="max-w-lg mx-auto w-full">
      <DialogBody className="p-6">
        <h2 className="text-xl font-extrabold mb-4 text-center text-blue-gray-900">Delete Role</h2>
        <p className="text-center">
          Are you sure you want to delete the role <span className="font-semibold text-blue-600">{roleName}</span>? Deleting this role will also delete all users associated with it.
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

export default DeleteRoleConfirmationModal;
