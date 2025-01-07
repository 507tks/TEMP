import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import {
  getPatientPackages,
  markSessionStatusThunk,
  receivedAmountInSessionThunk,
  rescheduleSessionThunk,
} from "@/redux/thunk/package";

const UpdateSessionModal = ({
  isOpen,
  onClose,
  sessionData,
  actionType,
  patientId,
  selectedPackage,
setSelectedPackage,
  setSessions,
}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    receivedAmount: "",
    status: "",
    newDate: "",
  });
  const [rescheduleNextSession, setRescheduleNextSession] = useState(false);
  useEffect(() => {
    if (sessionData) {
      setFormData({
        receivedAmount: sessionData.amount || "",
        status: sessionData.status || "",
        newDate: sessionData.newDate || "",
      });
    }
  }, [sessionData]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    let actionPromise;

    switch (actionType) {
      case "updateAmount":
        actionPromise = dispatch(
          receivedAmountInSessionThunk({
            sessionId: sessionData._id,
            receivedAmount: formData.receivedAmount,
          }),
        );
        break;
      case "updateStatus":
        actionPromise = dispatch(
          markSessionStatusThunk({
            sessionId: sessionData._id,
            status: formData.status,
          }),
        );
        break;
      case "reschedule":
        actionPromise = dispatch(
          rescheduleSessionThunk({
            sessionId: sessionData._id,
            newDate: formData.newDate,
            rescheduleNextSession,
          }),
        );
        break;
      default:
        return;
    }

    actionPromise
      .then(() => {
        dispatch(
          getPatientPackages({
            patientId,
            limit: 25,
            page: 1,
          }),
        ).then((response) => {
          const updatedPackage = response.payload.find(
            (pkg) => pkg._id === selectedPackage?._id,
          );
          setSelectedPackage(updatedPackage);
          setSessions(updatedPackage?.sessions || []);
        });
      })
      .finally(() => {
        onClose();
      });
  };

  return (
    <Dialog open={isOpen} handler={onClose}>
      <DialogHeader>
        {actionType === "updateAmount" && "Update Received Amount"}
        {actionType === "updateStatus" && "Update Session Status"}
        {actionType === "reschedule" && "Reschedule Session"}
      </DialogHeader>
      <DialogBody>
        {actionType === "updateAmount" && (
          <Input
            type="number"
            label="Amount"
            name="receivedAmount"
            value={formData.receivedAmount}
            onChange={handleChange}
            required
          />
        )}
        {actionType === "updateStatus" && (
          <Select
            id="status"
            name="status"
            label="Status"
            value={formData.status}
            onChange={(value) =>
              handleChange({ target: { name: "status", value } })
            }
            className="w-full"
            required
          >
            <Option value="">Select Status</Option>
            <Option value="Scheduled">Scheduled</Option>
            <Option value="Rescheduled">Rescheduled</Option>
            <Option value="Completed">Completed</Option>
            <Option value="Absent">Absent</Option>
            <Option value="Cancelled">Cancelled</Option>
          </Select>
        )}
        {actionType === "reschedule" && (
          <>
            <Input
              type="date"
              label="New Date"
              name="newDate"
              value={formData.newDate}
              onChange={handleChange}
              required
            />
            <div className="mt-3">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={rescheduleNextSession}
                  onChange={() =>
                    setRescheduleNextSession(!rescheduleNextSession)
                  }
                  className="form-checkbox"
                />
                <span className="ml-2">Reschedule next session</span>
              </label>
            </div>
          </>
        )}
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="gradient" color="green" onClick={handleSubmit}>
          Update
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default UpdateSessionModal;
