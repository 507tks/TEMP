import {
  Button,
  Typography,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import React from "react";

function DeletePackageModal({ open, handleClose, handleDelete }) {
  return (
    <Dialog open={open} onClose={handleClose} className="rounded-lg shadow-lg">
      <div className="p-6">
        <Typography variant="h5" className="font-bold text-gray-800">
          Confirm Delete
        </Typography>
      </div>
      <DialogBody className="px-6 py-4">
        <Typography className="text-gray-600">
          Are you sure you want to delete this package? This action cannot be
          undone.
        </Typography>
      </DialogBody>
      <DialogFooter className="flex justify-end gap-4 px-6 py-4">
        <Button
          onClick={handleClose}
          color="blue-gray"
          variant="text"
          className="hover:bg-gray-100"
        >
          Cancel
        </Button>
        <Button onClick={handleDelete} color="red" className="hover:bg-red-600">
          Delete
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default DeletePackageModal;
