import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const DeleteSessionModal = ({ isOpen, onClose, onDelete, sessionData }) => {
  const handleDelete = () => {
    onDelete(sessionData);
    onClose();
  };

  return (
    <Dialog open={isOpen} size="sm" handler={onClose}>
      <DialogHeader>Delete Session</DialogHeader>
      <DialogBody>
        <p className="text-sm text-gray-700">
          Are you sure you want to delete the session ? This action cannot be
          undone.
        </p>
      </DialogBody>
      <DialogFooter>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 rounded-lg mr-2"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Delete
        </button>
      </DialogFooter>
    </Dialog>
  );
};

export default DeleteSessionModal;
