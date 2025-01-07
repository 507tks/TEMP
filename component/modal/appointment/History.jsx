import { FaTimes } from "react-icons/fa";
import { Dialog, DialogHeader } from "@material-tailwind/react";

const AppointmentHistory = ({ isOpen, onRequestClose }) => {
  return (
    <Dialog open={isOpen} handler={onRequestClose}>
      <DialogHeader>
        History
        <button className="ml-auto focus:outline-none " onClick={onRequestClose}>
          <FaTimes className="h-6 w-6 text-gray-500 hover:text-gray-900" />{" "}
        </button>
      </DialogHeader>
      <div>
        {/* {history.map((entry, index) => (
            <div
              key={index}
              className="border mb-4 p-4 rounded-md transition duration-300 transform hover:shadow-xl"
            >
              <p className="mb-2 text-lg text-gray-800">
                <span className="text-gray-600">Quantity:</span> {entry.quantity}
              </p>
              <p className="mb-2 text-lg text-gray-800">
                <span className="text-gray-600">Manufacturing Date:</span> {entry.manufacturingDate}
              </p>
              <p className="mb-2 text-lg text-gray-800">
                <span className="text-gray-600">Expiry Date:</span> {entry.expiryDate}
              </p>
              <p className="mb-2 text-lg text-gray-800">
                <span className="text-gray-600">Date:</span> {entry.date}
              </p>
              <p className="mb-2 text-lg text-gray-800">
                <span className="text-gray-600">Time:</span> {entry.time}
              </p>
            </div>
          ))} */}
      </div>
    </Dialog>
  );
};

export default AppointmentHistory;
