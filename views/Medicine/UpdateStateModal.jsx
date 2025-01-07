import React, { useEffect, useState } from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Switch } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { updateActiveState } from "../../redux/thunk/medicine";

function UpdateStateModal({ open, toggleModal, selectedMedicine }) {
  const [newState, setNewState] = useState(selectedMedicine?.isActive);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedMedicine) {
      setNewState(selectedMedicine.isActive);
    }
  }, [selectedMedicine]);

  const handleUpdateState = () => {
    if (selectedMedicine) {
      dispatch(updateActiveState({ medicineId: selectedMedicine._id, newState }));
      toggleModal();
    }
  };

  if (!selectedMedicine) {
    return null;
  }

  return (
    <Dialog open={open} handler={toggleModal}>
      <DialogHeader>Update Medicine Active State</DialogHeader>
      <DialogBody divider>
        <div className="mb-4">
          <Switch label="Active State" checked={newState} onChange={() => setNewState(!newState)} />
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={toggleModal} className="mr-1">
          Cancel
        </Button>
        <Button variant="gradient" color="green" onClick={handleUpdateState}>
          Update
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default UpdateStateModal;
