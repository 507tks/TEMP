import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import { patientAppointmentsKeys, patientsAppointmentsHeading } from "../../common/ActionTable/TableConstants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatientAppoinment } from "../../../redux/thunk/patients";
import { SimpleTable } from "../../common/ActionTable/SimpleTable";

const ViewAppointment = ({ open, toggler, patient }) => {
  const patientData = useSelector((state) => state.PatientSlice);

  const dispatch = useDispatch();
  useEffect(() => {
    if (open) dispatch(getPatientAppoinment(patient?._id));
  }, [patient,dispatch,open]);

  useEffect(() => {
    setSelectedeAppoinment(patientData?.patientAppointment?.appointmentData);
  }, [patientData?.patientAppointment?.appointmentData]);

  const [selectedAppoinment, setSelectedeAppoinment] = useState();

  return (
    <Dialog open={open} handler={toggler}>
      <DialogHeader>View Appointment</DialogHeader>
      <DialogBody className=" overflow-y-auto max-h-[40rem] px-8">
        <SimpleTable heading={patientsAppointmentsHeading} keys={patientAppointmentsKeys} tableData={selectedAppoinment} selectedRow={setSelectedeAppoinment} />
      </DialogBody>
    </Dialog>
  );
};

export default ViewAppointment;
