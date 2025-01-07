import React from 'react';
import { Button, Dialog, DialogBody, DialogFooter } from '@material-tailwind/react';

const DeleteUserModal = ({ open, toggleModal, onDelete }) => { 
  return (
    <Dialog open={open} handler={toggleModal} className="max-w-lg mx-auto w-full">
      <DialogBody className="p-6">
        <h2 className="text-xl font-extrabold mb-4 text-center text-blue-gray-900">Confirm Delete</h2>
        <p className="text-center">
          Are you sure you want to delete this user? This action cannot be undone.
        </p>
      </DialogBody>
      <DialogFooter className="flex justify-between">
        <Button variant="text" color="gray" onClick={toggleModal} className="w-full sm:w-auto">
          Cancel
        </Button>
        <Button color="red" className="w-full sm:w-auto ml-2 sm:ml-4" onClick={onDelete}>
          Delete
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default DeleteUserModal;
