import { Dialog, DialogBody, Typography, Button } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { appointmentThunk, cancelAppointmentThunk } from "../../../redux/thunk/appointments";

const CancelAppointment = ({ open, toggler, appointment, currentPage, payloadValue }) => {
  const dispatch = useDispatch();

  const deletePatient = async () => {
    await dispatch(cancelAppointmentThunk(appointment._id));
    await dispatch(appointmentThunk({ ...payloadValue, pageSize: 25, pageIndex: currentPage }));
    toggler();
  };

  return (
    <Dialog open={open} handler={toggler}>
      <DialogBody className="flex justify-center items-center flex-col gap-4">
        <Typography className="text-xl font-semibold text-black">
          Are you sure you want to cancel <span className="text-blue-400 font-bold">{appointment?.patient && appointment?.patient[0]?.name}</span> appointment ?
        </Typography>
        <span className="flex gap-4">
          <Button color="red" onClick={() => toggler()}>
            No
          </Button>
          <Button color="green" onClick={deletePatient}>
            Yes
          </Button>
        </span>
      </DialogBody>
    </Dialog>
  );
};

export default CancelAppointment;
