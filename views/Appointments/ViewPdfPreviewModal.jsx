import { Dialog, Typography } from '@material-tailwind/react'
import dayjs from 'dayjs';
import React from 'react'

function ViewPdfPreviewModal({
  appointmentData,
  vitalsValue,
  diagnosis,
  testPrescribed,
  complaints,
  docotrsAdvice,
  medicineArr,
  open,
  onClose,
}) {
  function formatDiagnoses(diagnoses) {
    return diagnoses.map((item) => {
      const durationValue = item.durationValue;
      const durationUnit = item.durationUnit;
      const diagnosis = item.diagnosis;
      return `${diagnosis} since ${durationValue} ${durationUnit}`;
    });
  }
 function formatComplain(complaints) {
   return complaints.map((item) => {
     const durationValue = item.durationValue;
     const durationUnit = item.durationUnit;
     const diagnosis = item.complaint;
     return `${diagnosis} since ${durationValue} ${durationUnit}`;
   });
 }
  const formattedDiagnoses = formatDiagnoses(diagnosis);
const formattedComplaints=formatComplain(complaints)


  return (
    <Dialog
      open={open}
      handler={onClose}
      size="md"
      className="bg-white border-2 overflow-scroll"
    >
      <div className="w-[210mm] h-[297mm] max-h-[95vh] mx-auto bg-white p-8 shadow-lg border border-gray-300 rounded-lg overflow-auto">
        <header className="flex justify-between px-6">
          <div className="w-[40%] leading-1">
            <Typography className="text-[#3737A0] font-bold text-lg">
              {appointmentData?.doctorId?.name || ""}
            </Typography>
            <Typography className="font-semibold text-xs">
              {appointmentData?.doctorId?.qualifications.join(", ") || ""}
            </Typography>
            <Typography className="font-semibold text-xs">
              {appointmentData?.doctorId?.mobile || ""}
            </Typography>
          </div>
          <img
            className="w-12 h-12"
            src={appointmentData?.hospitalId?.logo}
            alt="logo"
          />
          <div className="w-[40%]">
            <Typography className="text-[#3737A0] font-bold text-lg">
              {appointmentData?.hospitalId?.name || ""}
            </Typography>
            <Typography className="font-semibold text-xs">
              Address: {appointmentData?.hospitalId?.address || ""}
            </Typography>
            <Typography className="font-semibold text-xs">
              Ph: {appointmentData?.hospitalId?.contactNumber || ""}
            </Typography>
            <Typography className="font-semibold text-xs">
              Email: {appointmentData?.hospitalId?.email || ""}
            </Typography>
          </div>
        </header>

        <div className="border-t-2 border-[#191b53] w-full my-4"></div>

        <div className="flex">
          <Typography className="text-xs w-[45%]">
            Patient Name:{" "}
            <span className="text-black font-bold">
              {appointmentData?.patientId?.name || ""}
            </span>
          </Typography>
          <Typography className="text-xs w-[25%]">
            Age/Sex:{" "}
            <span className="text-black font-bold">
              {dayjs().diff(dayjs(appointmentData?.patientId?.dob), "year")}/
              {appointmentData?.patientId?.gender || ""}
            </span>
          </Typography>
          <Typography className="text-xs">
            Date:{" "}
            <span className="text-black font-bold">
              {dayjs().format("MM/DD/YYYY")}
            </span>
          </Typography>
        </div>

        <div className="flex my-2">
          <Typography className="text-xs w-[35%]">
            Phone No:{" "}
            <span className="text-black font-bold">
              {appointmentData?.patientId?.phone || ""}
            </span>
          </Typography>
          <Typography className="text-xs">
            Address:{" "}
            <span className="text-black font-bold">
              {appointmentData?.patientId?.address || ""}
            </span>
          </Typography>
        </div>

        <Typography className="text-xs">
          Ref By:{" "}
          <span className="text-black font-bold">
            {appointmentData?.patientId?.reference || ""}
          </span>
        </Typography>

        <div className="mt-4 flex gap-3">
          <Typography className="text-xs">Vitals:</Typography>
          <Typography className="text-black text-xs font-bold">
            {vitalsValue?.pulseRate && (
              <span>
                PULSE RATE -{" "}
                <span className="font-medium">{vitalsValue.pulseRate}</span> |{" "}
              </span>
            )}
            {vitalsValue?.bodyWeight && (
              <span>
                BODY WEIGHT -{" "}
                <span className="font-medium">{vitalsValue.bodyWeight}</span> |{" "}
              </span>
            )}
            {vitalsValue?.bloodPressure && (
              <span>
                BLOOD PRESSURE -{" "}
                <span className="font-medium">{vitalsValue.bloodPressure}</span>{" "}
                |{" "}
              </span>
            )}
            {vitalsValue?.bodyTemperature && (
              <span>
                BODY TEMPERATURE -{" "}
                <span className="font-medium">
                  {vitalsValue.bodyTemperature}
                </span>{" "}
                |{" "}
              </span>
            )}
            {vitalsValue?.SpO2 && (
              <span>
                Oxygen Saturation -{" "}
                <span className="font-medium">{vitalsValue.SpO2}</span>
              </span>
            )}
          </Typography>
        </div>
        <div className="mt-3 flex gap-3">
          <Typography className="text-xs">Complaints:</Typography>
          <Typography className="text-black text-xs font-bold">
            {formattedComplaints.length > 0 &&
              formattedComplaints.map((comp, i) => (
                <span key={i}>
                  {comp}
                  {i < complaints.length - 1 && ", "}
                </span>
              ))}
          </Typography>
        </div>
        {/* Diagnosis Section */}
        <div className="mt-3 flex gap-3">
          <Typography className="text-xs">Diagnosis:</Typography>
          <Typography className="text-black text-xs font-bold">
            {formattedDiagnoses?.length > 0 &&
              formattedDiagnoses.map((diag, i) => (
                <span key={i}>
                  {diag}
                  {i < formattedDiagnoses.length - 1 && ", "}
                </span>
              ))}
          </Typography>
        </div>

        {/* Test Prescribed Section */}
        <div className="mt-3 flex gap-1">
          <Typography className="text-xs">Test Prescribed:</Typography>
          {testPrescribed &&
            testPrescribed?.map((test, i) => (
              <Typography
                key={test._id}
                className="text-black text-xs font-bold"
              >
                {test}
                {i < testPrescribed.length - 1 && ","}
              </Typography>
            ))}
        </div>
        <div className="mt-3 flex gap-3">
          <Typography className="text-xs">Advice:</Typography>
          <Typography className="text-black text-xs font-bold">
            {docotrsAdvice.length > 0 &&
              docotrsAdvice.map((advice, i) => (
                <span key={advice._id}>
                  {advice}
                  {i < docotrsAdvice.length - 1 && ", "}
                </span>
              ))}
          </Typography>
        </div>

        <Typography className="text-xs text-center font-bold my-2 text-[#9487ab]">
          PRESCRIPTION
        </Typography>

        {/* Medicine Table */}
        {medicineArr && (
          <table className="w-full text-xs border-2 border-[#9487ab] rounded-lg">
            <thead className="text-xs font-semibold bg-[#c6b7de] text-black">
              <tr className="text-center">
                <th className="py-1 border-r-2 border-b-2 border-[#9487ab]">
                  S. No.
                </th>
                <th className="border-r-2 border-b-2 border-[#9487ab]">Name</th>
                <th className="border-r-2 border-b-2 border-[#9487ab]">
                  Period
                </th>
                <th className="border-r-2 border-b-2 border-[#9487ab]">
                  Frequency
                </th>
                <th className="border-r-2 border-b-2 border-[#9487ab]">
                  Remarks
                </th>
              </tr>
            </thead>
            <tbody>
              {medicineArr.map((data, i) => (
                <tr
                  key={data._id}
                  className="text-center font-medium text-black"
                >
                  <td className="py-1 border-r-2 border-b-2 border-[#9487ab]">
                    {i + 1}
                  </td>
                  <td className="border-r-2 border-b-2 border-[#9487ab]">
                    {data?.name}{" "}
                    {data?.genericName && (
                      <span className="block text-gray-800 italic max-w-md">
                        {data.genericName}
                      </span>
                    )}
                  </td>
                  <td className="border-r-2 border-b-2 border-[#9487ab]">
                    {data?.period}
                  </td>
                  <td className="border-r-2 border-b-2 border-[#9487ab]">
                    {data?.frequency}
                  </td>
                  <td className="border-r-2 border-b-2 border-[#9487ab]">
                    {data?.remarks}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="mt-auto h-16"></div>
      </div>
    </Dialog>
  );
}

export default ViewPdfPreviewModal