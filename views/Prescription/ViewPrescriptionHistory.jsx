import { getPatientPrescriptionsHistory } from "@/redux/thunk/patients";
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

function ViewPrescriptionHistory({ open, toggler, patient }) {

  const dispatch = useDispatch();
  const prescriptionData = useSelector(
    (state) => state?.PatientSlice?.prescriptionHistory?.prescription,
  );

  useEffect(() => {
    if (patient?._id) {
      dispatch(getPatientPrescriptionsHistory(patient?._id));
    }
  }, [patient, dispatch]);

  return (
    <Dialog open={open} handler={toggler} aria-labelledby="dialogHeader">
      <DialogHeader id="dialogHeader">Prescription History</DialogHeader>
      <DialogBody
        className="flex justify-center items-center flex-col gap-4"
        role="dialog"
        aria-live="polite"
      >
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2 border border-gray-300">Updated At</th>
              <th className="px-4 py-2 border border-gray-300">
                View Prescription
              </th>
            </tr>
          </thead>

          {prescriptionData && prescriptionData.length > 0 ? (
            prescriptionData?.map((item, index) => (
              <tbody>
                <tr key={index} className="text-center">
                  <td className="px-4 py-2 border border-collapse border-gray-300">
                    {new Date(item.updatedAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border     border-gray-300">
                    {item.prescriptionPdfUrl || item.prescriptionWithoutHeaderPdfUrl ? (
                      <a
                        href={item.prescriptionPdfUrl || item.prescriptionWithoutHeaderPdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center"
                      >
                        <MdOutlineRemoveRedEye
                          size={20}
                          color="green"
                          className="cursor-pointer"
                        />
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
              </tbody>
            ))
          ) : (
            <tr>
              <td
                className="text-center py-2 font-bold text-black"
                colSpan="2"
              >
                No data found
              </td>
            </tr>
          )}
        </table>
      </DialogBody>
    </Dialog>
  );
}

export default ViewPrescriptionHistory;
