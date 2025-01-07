import {
  Button,
  Card,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { useRef, useState } from "react";
import "./styles/style.css";
import jsPDF from "jspdf";
const PrescriptionPage = ({ data, hospitalData, doctorData, patientData, disable }) => {
  const prescriptionRef = useRef(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSections, setSelectedSections] = useState({
    header: true,
    complaints: true,
    vitals: true,
    diagnosis: true,
    medicines: true,
    tests: true,
    advice: true,
    counselling: true,
    nextVisit: true,
  });

  const toggleDialog = () => setOpenDialog(!openDialog);

  const handleCheckboxChange = (section) => {
    setSelectedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
const sanitizeFileName = (name) => {
  return name.replace(/[^a-zA-Z0-9]/g, "_");
};
  const generateAndOpenPdf = async () => {
    if (!prescriptionRef.current) return;
    const doc = new jsPDF();

    try {
      await doc.html(`
        <html>
        <head>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
          ${prescriptionRef.current.outerHTML}
        </body>
        </html>`,
        {
          width: 210,
          windowWidth: 800,
          autoPaging: "text",
        }
      );
      const pdfOutput = doc.output('blob');
      const url = URL.createObjectURL(pdfOutput);


      const printWindow = window.open(url, "_blank");

      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
          URL.revokeObjectURL(url);
      }, 500);
      /**
      * Set timeout, according to the network(200ms works good for me)
      *        - Prabhat
      */
      

    } catch (error) {
      console.error("Error generating PDF: ", error);
    }
  };
 const DownloadPdf = async () => {
   if (!prescriptionRef.current) return;
   const doc = new jsPDF();

   try {
     await doc.html(
       `
        <html>
        <head>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
          ${prescriptionRef.current.outerHTML}
        </body>
        </html>`,
       {
         width: 210,
         windowWidth: 800,
         autoPaging: "text",
       },
     );
    //  const pdfOutput = doc.output("blob");
    //  const url = URL.createObjectURL(pdfOutput);

     /**
      * Set timeout, according to the network(200ms works good for me)
      *        - Prabhat
      */
     const today = new Date().toISOString().split("T")[0]; // e.g., "2025-01-04"
     const pdfFileName = `${sanitizeFileName(patientData.name)}_${data.prescriptionId}_${today}.pdf`;
     doc.save(pdfFileName);
   } catch (error) {
     console.error("Error generating PDF: ", error);
   }
 };
  // const printPrescription = () => {
  //   if (!prescriptionRef.current) return;
  //   const printWindow = window.open("", "");
  //   const printDocument = printWindow.document;
  //   printDocument.write(
  //     `<html>
  //       <head>
  //         <script src="https://cdn.tailwindcss.com"></script>
  //       </head>
  //       <body>
  //         ${prescriptionRef.current.outerHTML}
  //       </body>
  //     </html>`
  //   );

  //   setTimeout(() => {
  //     printWindow.focus();
  //     printWindow.print();
  //     printWindow.close();
  //   }, 500);
  //   /**
  //    * Set timeout, according to the network(200ms works good for me)
  //    *        - Prabhat
  //    */
  // };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!hospitalData && !doctorData && !patientData) {
    return <div>loading...</div>;
  }

  return (
    <div className=" flex flex-col items-center">
      <div className="hidden">
        <Card className="w-[21cm] min-h-[29.7cm] bg-white shadow-lg">
          <div ref={prescriptionRef} className="font-sans text-black p-8">
            <div className={`${selectedSections.header ? "" : "invisible"}`}>
              {hospitalData && doctorData && (
                <div className="flex justify-between items-center border-b-2 border-black pb-4 mb-4">
                  <div className="w-1/3 flex flex-col gap-0 text-left">
                    <h4 className="text-blue-800 capitalize text-lg font-bold">
                      {doctorData?.name || ""}
                    </h4>
                    <p className="text-sm capitalize font-bold">
                      {doctorData?.qualifications.join(", ") || ""}
                    </p>
                    <p className="text-sm font-bold">
                      Mob No: {doctorData?.mobile || ""}
                    </p>
                  </div>
                  <div className="header-image">
                    {/* <img
                      src={hospitalData?.logo}
                      height="40px"
                      width="45px"
                      alt="Hospital Logo"
                    /> */}
                  </div>
                  <div className="w-1/3 flex flex-col gap-0 text-right">
                    <h4 className="text-blue-900 text-lg font-bold">
                      {hospitalData?.name}
                    </h4>
                    <p className="text-sm font-bold">
                      Address: {hospitalData?.address}
                    </p>
                    <p className="text-sm font-bold">
                      Ph: {hospitalData?.contactNumber}
                    </p>
                    <p className="text-sm font-bold">
                      Email: {hospitalData?.email}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gray-200 p-2 mb-10 text-xs">
              {doctorData && (
                <p className="flex justify-between">
                  <span>
                    <strong className="text-black font-bold">
                      DMC Number:{" "}
                    </strong>
                    {doctorData?.DMCNumber}
                  </span>
                </p>
              )}
              <p className="flex justify-between">
                <span>
                  <strong className="text-black font-bold">Patient Id: </strong>
                  {patientData?.patientId}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="capitalize">
                  {`${patientData?.name} (${patientData?.age}y, ${patientData?.gender}) - ${patientData?.phone}`}
                </span>
                <span>{formatDate(patientData.createdAt)}</span>
              </p>
            </div>
            <div
              className={`${selectedSections.complaints ? "" : "invisible"}`}
            >
              {data?.complaints.length > 0 && (
                <div className="flex text-xs mb-2">
                  <strong className="mr-2 text-black font-bold">
                    Complaints:
                  </strong>
                  <p>
                    {data.complaints.map((complaint, index) => (
                      <span key={complaint._id} className="capitalize">
                        {`${complaint.complaint}${complaint.days || complaint.weeks || complaint.months || complaint.years ? " since" : ""}
                    ${complaint.years ? `${complaint.years} years` : ""} 
                    ${complaint.months ? `- ${complaint.months} months` : ""}
                    ${complaint.weeks ? `- ${complaint.weeks} weeks` : ""}
                    ${complaint.days ? `- ${complaint.days} days` : ""}
                    ${index < data.complaints.length - 1 ? ", " : ""}`}
                      </span>
                    ))}
                  </p>
                </div>
              )}
            </div>
            <div className={`${selectedSections.vitals ? "" : "invisible"}`}>
              {(data.vitals.pulseRate ||
                data.vitals.SpO2 ||
                data.vitals.bloodPressure ||
                data.vitals.bodyWeight ||
                data.vitals.bodyTemperature) && (
                <div className="flex text-xs mb-2">
                  <strong className="mr-2 text-black font-bold">Vitals:</strong>
                  <div>
                    {data.vitals.pulseRate && (
                      <span className="mr-2">
                        <strong>Pulse Rate:</strong> {data.vitals.pulseRate}{" "}
                        bpm,
                      </span>
                    )}
                    {data.vitals.SpO2 && (
                      <span className="mr-2">
                        <strong>SpO2:</strong> {data.vitals.SpO2}%,
                      </span>
                    )}
                    {data.vitals.bloodPressure && (
                      <span className="mr-2">
                        <strong>BP:</strong> {data.vitals.bloodPressure} mmHg,
                      </span>
                    )}
                    {data.vitals.bodyWeight && (
                      <span className="mr-2">
                        <strong>Weight:</strong> {data.vitals.bodyWeight} kgs,
                      </span>
                    )}
                    {data.vitals.bodyTemperature && (
                      <span className="mr-2">
                        <strong>Temp:</strong> {data.vitals.bodyTemperature} °F,
                      </span>
                    )}
                    {data.vitals.lastMenstrualPeriod && (
                      <span className="mr-2">
                        <strong>LMP:</strong>
                        {formatDate(data.vitals.lastMenstrualPeriod)}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className={`${selectedSections.diagnosis ? "" : "invisible"}`}>
              {data.diagnosis.length > 0 && (
                <div className="flex text-xs mb-2">
                  <strong className="mr-2 text-black font-bold">
                    Diagnosis:
                  </strong>
                  <p>
                    {data.diagnosis.map((diag, index) => (
                      <span key={diag._id} className="capitalize">
                        {`${diag.diagnosis}${diag.days || diag.weeks || diag.months || diag.years ? " since" : ""}
                    ${diag.years ? `${diag.years} years` : ""} 
                    ${diag.months ? `- ${diag.months} months` : ""}
                    ${diag.weeks ? `- ${diag.weeks} weeks` : ""}
                    ${diag.days ? `- ${diag.days} days` : ""}
                    ${index < data.diagnosis.length - 1 ? ", " : ""}`}
                      </span>
                    ))}
                  </p>
                </div>
              )}
            </div>

            <div className={`${selectedSections.medicines ? "" : "invisible"}`}>
              {data.medicines.length > 0 && (
                <div className="my-4">
                  <div className="text-2xl text-black">
                    R<span className="text-xl">x</span>
                  </div>
                  <div className="w-full text-black">
                    <div className="grid grid-cols-12 font-bold text-sm border-b-2 border-[#00000044] pb-2">
                      <span className="col-span-1"></span>
                      <span className="col-span-5">Medication</span>
                      <span className="col-span-2">Dosage</span>
                      <span className="col-span-4">
                        Timing - Freq. - Duration
                      </span>
                    </div>
                    {data.medicines.map((med, index) => (
                      <div
                        key={med._id}
                        className="pb-2 border-b-2 border-gray-500"
                      >
                        <div className="grid grid-cols-12 text-sm">
                          <span className="col-span-1">{index + 1})</span>
                          <span className="col-span-5 font-bold uppercase">
                            {med.name || "-"}
                          </span>
                          <span className="col-span-2 font-bold">
                            {med.dosage || "-"}
                          </span>
                          <div className="col-span-4">
                            <span>
                              {med.remarks ? `${med.remarks} - ` : ""}
                            </span>
                            <span>
                              {med.frequency ? `${med.frequency} - ` : ""}
                            </span>
                            <span>{med.period || ""}</span>
                          </div>
                        </div>
                        {med.genericName && (
                          <div className="grid grid-cols-12 text-xs ">
                            <span className="col-span-1"></span>
                            <span
                              className="col-span-11 uppercase"
                              style={{
                                letterSpacing: "0.5px",
                              }}
                            >
                              {`Composition: ${med.genericName}`}
                            </span>
                          </div>
                        )}
                        {med.notes && (
                          <div className="grid grid-cols-12 text-xs">
                            <span className="col-span-1"></span>
                            <span className="col-span-11">
                              Note: {med.notes}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className={`${selectedSections.tests ? "" : "invisible"}`}>
              {data.testPrescribed.length > 0 && (
                <div className="flex text-xs mb-2">
                  <strong className="mr-2 text-black font-extrabold">
                    Tests Prescribed:
                  </strong>
                  <p>{data.testPrescribed.join(", ")}</p>
                </div>
              )}
            </div>

            <div className={`${selectedSections.tests ? "" : "invisible"}`}>
              {data.testPrescribedFor &&
                data.testPrescribedFor?.test?.length > 0 && (
                  <div className="flex text-xs mb-2">
                    <strong className="mr-2 text-black font-extrabold">
                      Tests Prescribed For ({data.testPrescribedFor.for}):
                    </strong>
                    <p>{data.testPrescribedFor.test.join(", ")}</p>
                  </div>
                )}
            </div>

            <div className={`${selectedSections.advice ? "" : "invisible"}`}>
              {data.advice.length > 0 && (
                <div className="flex text-xs mb-2">
                  <strong className="mr-2 text-black font-extrabold">
                    Advice:
                  </strong>
                  <p>{data.advice.join(", ")}</p>
                </div>
              )}
            </div>

            <div
              className={`${selectedSections.counselling ? "" : "invisible"}`}
            >
              {data.counselling && (
                <div className="flex text-xs mb-2">
                  <strong className="mr-2">Counselling:</strong>
                  <p>{data.counselling}</p>
                </div>
              )}
            </div>

            <div className={`${selectedSections.nextVisit ? "" : "invisible"}`}>
              {data.nextVisit.appointmentId && (
                <div className="flex text-xs mb-2">
                  <strong className="mr-2">Next Visit:</strong>
                  <p>{`${data.nextVisit.durationValue} ${data.nextVisit.durationUnit} - (${formatDate(data.nextVisit.nextVisitDate)})`}</p>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
      <Button
        onClick={toggleDialog}
        color="green"
        disabled={disable}
        className=""
      >
        Print Prescription
      </Button>

      <Dialog open={openDialog} handler={toggleDialog} size="lg">
        <DialogHeader>Select Sections to Print</DialogHeader>
        <DialogBody divider>
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(selectedSections).map((section) => (
              <label key={section} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedSections[section]}
                  onChange={() => handleCheckboxChange(section)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="capitalize">{section}</span>
              </label>
            ))}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={toggleDialog}
            className="mr-2"
          >
            Cancel
          </Button>
          {/* <Button onClick={printPrescription} color="green"> */}
          <Button onClick={DownloadPdf} color="blue" className="mr-2">
            Download
          </Button>
          <Button onClick={generateAndOpenPdf} color="green">
            Print
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default PrescriptionPage;
