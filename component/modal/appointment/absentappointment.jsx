import {
  Dialog,
  DialogBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import {
    absentAppointmentthunk,
  appointmentThunk,
  completeAppointmentthunk,
} from "../../../redux/thunk/appointments";
import { toast } from "react-toastify";

const AbsentAppointmentModal = ({
  open,
  toggler,
  appointment,
  currentPage,
  payload,
}) => {
  const dispatch = useDispatch();

  const completeAppointmentHandler = async () => {
    if (appointment) {
      await dispatch(absentAppointmentthunk(appointment._id))
        .unwrap()
        .then((data) => {
          if (data?.msg === "Appointment Completed Successfully")
            toast.success("Appointment Marked Completed.");
          toggler();
        });
      await dispatch(
        appointmentThunk({ ...payload, pageSize: 25, pageIndex: currentPage }),
      );
    }
  };

  return (
    <Dialog open={open} handler={toggler}>
      <DialogBody className="flex justify-center items-center flex-col gap-4">
        <Typography className="text-xl font-semibold text-black">
         Mark Patient as absent
          <span className="text-blue-400 font-bold">
            {appointment?.patient[0]?.name}
          </span>
          ?
        </Typography>
        <span className="flex gap-4">
          <Button color="red" onClick={() => toggler()}>
            No
          </Button>
          <Button color="green" onClick={completeAppointmentHandler}>
            Yes
          </Button>
        </span>
      </DialogBody>
    </Dialog>
  );
};

export default AbsentAppointmentModal;
