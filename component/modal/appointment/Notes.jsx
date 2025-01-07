import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogBody, DialogHeader, Textarea, Typography } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { appointmentThunk, notesThunk } from "../../../redux/thunk/appointments";
import { getPatientThunk } from "../../../redux/thunk/patients";
import moment from "moment";

const Notes = ({ open, toggler, appointment, patient, currentPage, searchValue, payloadValue }) => {
  const [note, setNote] = useState("");
  const [latestPrescription, setLatestPrescription] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    // Set the note from appointment or patient
    if ((appointment?.patient && appointment?.patient[0]?.appointmentNotes) || patient?.appointmentNotes) {
      setNote(appointment?.patient[0]?.appointmentNotes || patient?.appointmentNotes);
    } else {
      setNote("");
    }

    // Extract the latest prescription from appointment if available
    const prescriptionHistory = appointment?.prescriptionPdfHistory || [];

    if (prescriptionHistory.length > 0) {
      setLatestPrescription(prescriptionHistory[0]); // Assuming the first element is the latest
    } else {
      setLatestPrescription(null);
    }
  }, [appointment, patient]);

  const notesHandler = async () => {
    const patientId = patient?._id ? patient._id : appointment?.patient[0]?._id;

    await dispatch(notesThunk({ patientId, note }));

    if (appointment?.patient && appointment?.patient[0]) {
      dispatch(appointmentThunk({ ...payloadValue, pageSize: 25, pageIndex: currentPage }));
    } else {
      dispatch(getPatientThunk({ value: searchValue, pageSize: 25, pageIndex: currentPage }));
    }

    toggler();
  };

  return (
    <Dialog open={open} handler={toggler}>
      <DialogHeader>Add Note</DialogHeader>
      <DialogBody>
        <Textarea label="Note" id="note" rows={10} value={note} onChange={(e) => setNote(e.target.value)} color="blue" placeholder="Enter Notes" />
        
        {latestPrescription && (
          <div className="mt-4">
            <Typography variant="h5">Prescription</Typography>
            <div className="mt-2 grid grid-cols-4 gap-4">
              <div className="col-span-3 font-bold">URL</div>
              <div className="col-span-1 font-bold">Date</div>
              <div className="col-span-3">
                <a href={latestPrescription.url} className="text-blue-500 truncate" target="_blank" rel="noopener noreferrer">
                  {latestPrescription.url.length > 50 ? `${latestPrescription.url.substring(0, 50)}...` : latestPrescription.url}
                </a>
              </div>
              <div className="col-span-1 text-gray-600">{moment(latestPrescription.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</div>
            </div>
          </div>
        )}
        
        <div className="lg:col-span-2 flex justify-center gap-4 mt-4">
          <Button onClick={notesHandler} color="indigo" type="submit">
            Submit
          </Button>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default Notes;
