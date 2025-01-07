import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogBody, DialogHeader, Input } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { epochToDatetime } from "../../../utils/dateHelper";
import { appointmentThunk, rescheduleAppointmentThunk } from "../../../redux/thunk/appointments";
const UpdateAppointment = ({ isOpen, onRequestClose, appointment, currentPage, payloadValue }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ date: "", time: "", doctorName: "" });
  const [errors, setErrors] = useState({ date: false, time: false });

  useEffect(() => {
    setErrors({ date: false, time: false });
    if (appointment) {
      setFormData({
        date: epochToDatetime(appointment.date).date,
        time: epochToDatetime(appointment.date).time
      });
    }
  }, [appointment]);

  const updateFormHandler = (e) => {
    let { name, value } = e.target;
    setFormData((pre) => ({ ...pre, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ["date", "time"];
    const newErrors = {};
    let isValid = true;

    for (let i = 0; i < requiredFields.length; i++) {
      const fieldName = requiredFields[i];
      if (!formData[fieldName]) {
        isValid = false;
        newErrors[fieldName] = true;
      } else {
        newErrors[fieldName] = false;
      }
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    // const date=getTimestampFromYYYYMMDD(formData.date) + convertTimeStringToMilliseconds(formData.time)

    await dispatch(
      rescheduleAppointmentThunk({
        id: appointment?._id,
        date: formData.date,
        time: formData.time
      })
    );
    dispatch(appointmentThunk({ ...payloadValue, pageSize: 25, pageIndex: currentPage }));
    onRequestClose();
  };

  return (
    <Dialog open={isOpen} handler={onRequestClose}>
      <DialogHeader color="blue" button="close">
        Update Appointment
      </DialogHeader>
      <DialogBody className="flex flex-col items-center justify-center p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-lg">
          <Input label="Date of Appointment*" color="blue" type="date" name="date" value={formData.date} error={errors.date} onChange={updateFormHandler} />
          <Input label="Time of Appointment*" color="blue" type="time" name="time" value={formData.time} error={errors.time} onChange={updateFormHandler} />

          <div className="flex justify-end">
            <Button type="submit" color="blue" ripple={true} className="w-full md:w-auto">
              Update
            </Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
};

export default UpdateAppointment;
