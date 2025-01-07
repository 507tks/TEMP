import {
  generatePrescriptionPdfThunk,
  getPatientPrescriptionsHistory,
  sendPatientPrescriptionThunk,
} from "@/redux/thunk/patients";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function PreviousPrescriptions({ patientId, showHospitalHeader }) {
  const dispatch = useDispatch();
  const [visibleCount, setVisibleCount] = useState(2);
  const [loader, setloader] = useState(false);
  const prescriptionDatas = useSelector(
    (state) => state?.PatientSlice?.prescriptionHistory?.prescription || [],
  );

  const visiblePrescriptions = prescriptionDatas?.slice(0, visibleCount);

  const sendPrescriptionHandler = (prescriptionId) => {
    dispatch(sendPatientPrescriptionThunk(prescriptionId))
      .unwrap()
      .then((data) => {
        toast.success(data.msg);
      });
  };
  const generatePdf = (prescriptionId) => {
    setloader(true);
    dispatch(generatePrescriptionPdfThunk(prescriptionId))
      .unwrap()
      .then((data) => {
        if (data.prescription) {
          if (!showHospitalHeader) {
            window.open(data.prescription?.prescriptionWithoutHeaderPdfUrl);
          } else {
            window.open(data.prescription?.prescriptionPdfUrl);
          }
        }
        setloader(false);
      });
  };
  useEffect(() => {
    dispatch(getPatientPrescriptionsHistory(patientId));
  }, [patientId, dispatch]);
 
  return (
    <div className="flex flex-col items-center bg-gray-100 p-4">
      {visiblePrescriptions.map((prescriptionData, index) => (
        <div
          className="p-4 w-full max-w-6xl bg-white border border-gray-300 rounded-lg shadow-md mb-4"
          key={index}
        >
          {/* Header Section */}
          <div className="flex justify-between items-center border-b pb-3 mb-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {new Date(prescriptionData.createdAt).toLocaleDateString()}
              </h2>
              <p className="text-sm text-gray-600">
                By: Dr. {prescriptionData.doctorId.name}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                className="text-blue-600 hover:underline"
                disabled={loader}
                onClick={() => {
                  if (!showHospitalHeader) {
                    if (prescriptionData?.prescriptionWithoutHeaderPdfUrl) {
                      window.open(
                        prescriptionData?.prescriptionWithoutHeaderPdfUrl,
                      );
                    } else {
                      generatePdf(prescriptionData._id);
                    }
                  } else {
                    if (prescriptionData?.prescriptionPdfUrl) {
                      window.open(prescriptionData?.prescriptionPdfUrl);
                    } else {
                      generatePdf(prescriptionData._id);
                    }
                  }
                }}
              >
                Print
              </button>

              <button
                className="text-blue-600 hover:underline"
                onClick={() => sendPrescriptionHandler(prescriptionData._id)}
              >
                Send
              </button>
            </div>
          </div>
          <div className="mb-4">
            <h4 className="text-gray-800 font-semibold text-base">
              Chief Complaints:
            </h4>
            <p className="text-gray-700 text-sm">
              {prescriptionData.complaints
                .map((item) => {
                  const durationParts = [
                    item.days ? `${item.days} days` : "",
                    item.weeks ? `${item.weeks} weeks` : "",
                    item.months ? `${item.months} months` : "",
                  ]
                    .filter(Boolean)
                    .join(" ");
                  return `${item.complaint} ${durationParts ? `(${durationParts})` : ""}`;
                })
                .join(", ")}
            </p>
          </div>
          {/* Vitals Section */}
          <div className="mb-4">
            <h4 className="text-gray-800 font-semibold text-base">Vitals:</h4>
            <p className="text-gray-700 text-sm">
              Pulse Rate: {prescriptionData.vitals.pulseRate} | Weight:{" "}
              {prescriptionData.vitals.bodyWeight} kg | Temperature:{" "}
              {prescriptionData.vitals.bodyTemperature}°C | BP:{" "}
              {prescriptionData.vitals.bloodPressure} | SpO2:{" "}
              {prescriptionData.vitals.SpO2}%
            </p>
          </div>

          {/* Diagnosis Section */}
          <div className="mb-4">
            <h4 className="text-gray-800 font-semibold text-base">
              Diagnosis:
            </h4>
            <p className="text-gray-700 text-sm">
              {prescriptionData.diagnosis
                .map((item) => {
                  const durationParts = [
                    item.days ? `${item.days} days` : "",
                    item.weeks ? `${item.weeks} weeks` : "",
                    item.months ? `${item.months} months` : "",
                    item.years ? `${item.years} years` : "",
                  ]
                    .filter(Boolean)
                    .join(" ");
                  return `${item.diagnosis} ${durationParts ? `(${durationParts})` : ""}`;
                })
                .join(", ")}
            </p>
          </div>

          {/* Chief Complaints Section */}

          {/* Prescription Table */}
          <div className="mb-4">
            <h4 className="text-gray-800 font-semibold text-base">Rx</h4>

           
              {prescriptionData.medicines.length > 0 ? (
                <table className="w-full text-left border-t border-gray-300 mt-2">
                  <thead>
                    <tr className="text-gray-600 text-xs font-semibold border-b">
                      <th className="py-2">Medicine</th>
                      <th className="py-2">Dose</th>
                      <th className="py-2">Timing</th>
                      <th className="py-2">Frequency</th>
                      <th className="py-2">Duration</th>
                      <th className="py-2">Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prescriptionData.medicines  &&
                      prescriptionData.medicines.map((med, idx) => (
                        <tr
                          key={idx}
                          className="text-gray-700 text-xs hover:bg-gray-50"
                        >
                          <td className="py-1">{med.name || "---"}</td>
                          <td className="py-1">{med.dosage || "---"}</td>
                          <td className="py-1">{med.remarks || "---"}</td>
                          <td className="py-1">{med.frequency || "---"}</td>
                          <td className="py-1">{med.period || "---"}</td>
                          <td className="py-1">{med.notes || "---"}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <>
                  <h1 className="text-center font-bold py-1">
                    No Medicines Prescribed
                  </h1>
                </>
              )}
          
          </div>

          {/* Test Prescribed Section */}
          <div className="mb-4">
            <h4 className="text-gray-800 font-semibold text-base">
              Tests Prescribed:
            </h4>
            <p className="text-gray-700 text-sm">
              {prescriptionData.testPrescribed.join(", ") || "---"}
            </p>
          </div>

          {/* Advice Section */}
          <div className="mb-4">
            <h4 className="text-gray-800 font-semibold text-base">Advice:</h4>
            <p className="text-gray-700 text-sm">
              {prescriptionData.advice.join(", ") || "---"}
            </p>
          </div>

          {/* Counselling Section */}
          <div className="mb-4">
            <h4 className="text-gray-800 font-semibold text-base">
              Counselling:
            </h4>
            <p className="text-gray-700 text-sm">
              {prescriptionData.counselling || "---"}
            </p>
          </div>

          {/* Next Visit Section */}
          <div className="mb-4">
            <h4 className="text-gray-800 font-semibold text-base">
              Next Visit:
            </h4>
            <p className="text-gray-700 text-sm">
              Duration: {prescriptionData.nextVisit.durationValue}{" "}
              {prescriptionData.nextVisit.durationUnit} | Date:{" "}
              {new Date(
                prescriptionData.nextVisit.nextVisitDate,
              ).toLocaleDateString() || "---"}
            </p>
          </div>
        </div>
      ))}

      {/* Load More Button */}
      {visibleCount < prescriptionDatas.length && (
        <button
          className="mt-4 px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-200"
          onClick={() => setVisibleCount(visibleCount + 3)}
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default PreviousPrescriptions;
