import React, { useState } from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Input, Select, Option } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { updateStock } from "../../redux/thunk/medicine";
function UpdateStockModal({ open, toggleModal, selectedMedicine }) {
  const [type, setType] = useState("INC");
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();

  const handleUpdateStock = () => {
    dispatch(updateStock({ medicineId: selectedMedicine._id, type, quantity }));
    toggleModal();
  };
  return (
    <Dialog open={open} handler={toggleModal}>
      <DialogHeader>Update Medicine Stock</DialogHeader>
      <DialogBody divider>
        <div className="mb-4">
          <Select label="Type" value={type} onChange={(e) => setType(e)} required>
            <Option value="INC">Increase</Option>
            <Option value="DEC">Decrease</Option>
          </Select>
        </div>
        <div className="mb-4">
          <Input type="number" label="Quantity" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} required />
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={toggleModal} className="mr-1">
          Cancel
        </Button>
        <Button variant="gradient" color="green" onClick={handleUpdateStock}>
          {/* {status === "loading" ? "Updating..." : "Update"} */}
          Update
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default UpdateStockModal;
