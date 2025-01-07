import { Button, Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import moment from "moment";
import { IoClose } from "react-icons/io5";

const ViewDetails = ({ open, toggleModal, selectedMedicine }) => {

    
    return (
        <Dialog open={open} handler={toggleModal} className="max-w-lg mx-auto w-full">
            <DialogHeader className="-mb-8 flex justify-between">
                <h3 className="text-3xl font-bold">Medicine Details</h3>
                <Button variant="text" color="red" onClick={toggleModal} className="rounded-full p-1">
                    <IoClose size={30} />
                </Button>
            </DialogHeader>

            <DialogBody className="p-6 max-h-[70vh] overflow-y-auto text-black">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                    <div className="mb-1">
                        <h5 className="font-semibold">{"Generic Name"}</h5>
                        <div className="font-normal">
                            {selectedMedicine?.genericName || "-"}
                        </div>
                    </div>
                    <div className="mb-1">
                        <h5 className="font-semibold">{"Brand Name"}</h5>
                        <div className="font-normal">
                            {selectedMedicine?.brandName || "-"}
                        </div>
                    </div>
                    <div className="mb-1">
                        <h5 className="font-semibold">{"Dosage Form"}</h5>
                        <div className="font-normal">
                            {selectedMedicine?.dosageForm || "-"}
                        </div>
                    </div>
                    <div className="mb-1">
                        <h5 className="font-semibold">{"Strength"}</h5>
                        <div className="font-normal">
                            {selectedMedicine?.strength || "-"}
                        </div>
                    </div>
                    <div className="mb-1 md:col-span-2">
                        <h5 className="font-semibold">{"Manufacturer"}</h5>
                        <div className="font-normal">
                            {selectedMedicine?.manufacturer || "-"}
                        </div>
                    </div>
                    <div>
                        <h5 className="font-semibold">{"Manufacturing Date"}</h5>
                        <div className="font-normal">
                            {moment(selectedMedicine?.manufacturingDate).format("MMM DD YYYY") || "-"}
                        </div>
                    </div>
                    <div>
                        <h5 className="font-semibold">{"Expiry Date"}</h5>
                        <div className="font-normal">
                            {moment(selectedMedicine?.expiryDate).format("MMM DD YYYY") || "-"}
                        </div>
                    </div>
                    <div className="mb-1">
                        <h5 className="font-semibold">{"Quantity"}</h5>
                        <div className="font-normal">
                            {selectedMedicine?.quantity || "-"}
                        </div>
                    </div>
                    <div className="mb-1">
                        <h5 className="font-semibold">{"Price per unit"}</h5>
                        <div className="font-normal">
                            ₹ {selectedMedicine?.price || "-"}
                        </div>
                    </div>
                    <div className="mb-1 md:col-span-2">
                        <h5 className="font-semibold">{"Description"}</h5>
                        <div className="font-normal">
                            {selectedMedicine?.description || "-"}
                        </div>
                    </div>
                </div>

            </DialogBody>
        </Dialog>)
};

export default ViewDetails;
