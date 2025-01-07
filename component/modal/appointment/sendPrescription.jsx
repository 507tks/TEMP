import { Dialog, DialogBody, Typography, Button } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { sendPrescriptionThunk } from "../../../redux/thunk/appointments";
import { toast } from "react-toastify";

const SendPrescription = ({ open, toggler, appointment }) => {
  const dispatch = useDispatch();

  const sendMsgHandler = async () => {
    if (appointment) {
      await dispatch(sendPrescriptionThunk(appointment._id))
        .unwrap()
        .then((data) => {
          if (data?.data?.success) toast.success("Prescription Sent Successfully");
          toggler();
        });
    }
  };

  return (
    <Dialog open={open} handler={toggler}>
      <DialogBody className="flex justify-center items-center flex-col gap-4">
        <Typography className="text-xl font-semibold text-black">
          Send Prescription to <span className="text-blue-400 font-bold">{appointment?.patient[0]?.name}</span>?
        </Typography>
        <span className="flex gap-4">
          <Button color="red" onClick={() => toggler()}>
            No
          </Button>
          <Button color="green" onClick={sendMsgHandler}>
            Yes
          </Button>
        </span>
      </DialogBody>
    </Dialog>
  );
};

export default SendPrescription;
