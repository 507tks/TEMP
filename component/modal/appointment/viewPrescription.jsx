/* eslint-disable no-console */
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import { viewPrescriptionHistoryHeading, viewPrescriptionHistoryKeys } from "../../common/ActionTable/TableConstants";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { ActionTable } from "../../common/ActionTable/ActionTable";
import { useState } from "react";

const ViewPrescription = ({ open, toggler, appointment }) => {
  // eslint-disable-next-line no-unused-vars
  const [selectedRow, setSelectedRow] = useState();

  const actions = [
    {
      icon: <MdOutlineRemoveRedEye size={20} color="green" className="cursor-pointer" />,
      tooltip: "View",
      onClickFunction: (data) => {
        if (data?.url) {
          window.open(data.url, '_blank'); // Open in a new tab
        } else {
          // eslint-disable-next-line no-console
          console.error("URL is missing");
        }
      }
    }
  ];


  return (
    <Dialog open={open} handler={toggler} aria-labelledby="dialogHeader">
      <DialogHeader id="dialogHeader">Prescription History</DialogHeader>
      <DialogBody className="flex justify-center items-center flex-col gap-4" role="dialog" aria-live="polite">
        {appointment?.prescriptionPdfHistory && appointment.prescriptionPdfHistory.length > 0 ? (
          <ActionTable
            heading={viewPrescriptionHistoryHeading}
            keys={viewPrescriptionHistoryKeys}
            tableData={appointment.prescriptionPdfHistory}
            actions={actions}
            selectedRow={setSelectedRow}
          />
        ) : (
          <p>No prescription history available</p> // Fallback content
        )}
      </DialogBody>
    </Dialog>
  );
};

export default ViewPrescription;
