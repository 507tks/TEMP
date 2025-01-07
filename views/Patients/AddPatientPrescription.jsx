import { getDoctorThunk } from "@/redux/thunk/doctor";
import { getMyHospitalData } from "@/redux/thunk/hospital";
import {
  addPrescriptionThunk,
  generatePrescriptionPdfThunk,
  getAppointmentTypeThunk,
  getPatientById,
  getPatientPreviousPrescription,
  sendPatientPrescriptionThunk,
} from "@/redux/thunk/patients";
import {
  Button,
  Card,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from "@material-tailwind/react";
import { Autocomplete, TextField, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { FaRegSave, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addPrescriptionTemplate,
  deletePrescriptionTemplate,
  getAdviceTemplatesList,
  getAdviceThunk,
  getComplaintsTemplatesList,
  getCounsellingTemplatesList,
  getDiagnosisTemplatesList,
  getMedicinesTemplatesList,
  getPrescriptionTemplatesList,
  getRemarksThunk,
  getTestTemplatesList,
  getTestThunk,
} from "../../redux/thunk/appointments";
import PatientDetailsNavbar from "../Appointments/PatientDetailsNavbar";
import ComplaintTable from "../Prescription/ComplaintTable";
import VitalsCard from "../Prescription/VitalsCard";
import DiagnosisTable from "../Prescription/DiagnosisTable";
import MedicineTable from "../Prescription/MedicineTable";

import PreviousPrescriptions from "../Prescription/PreviousPrescriptions";
import Counselling from "../Prescription/Counselling";
import NextVisit from "../Prescription/NextVisit";
import AdviceCard from "../Prescription/AdviceCard";
import TestCard from "../Prescription/TestCard";
import PrescriptionPage from "../Prescription/PrescriptionPage";

const AddPatientPrescription = () => {
  const [medicineArr, setMedicineArr] = useState([
    {
      name: "",
      genericName: "",
      isCustom: true,
      dosage: "",
      remarks: "",
      frequency: "",
      period: "",
      notes: "",
    },
  ]);

  const [vitalsValue, setVitalsValue] = useState({
    pulseRate: "",
    bodyWeight: "",
    bloodPressure: "",
    bodyTemperature: "",
    SpO2: "",
    lastMenstrualPeriod: null,
    estimatedDateOfDelivery: null,
  });
  const [testPrescribed, setTestPrescribed] = useState([]);

  const [testPrescribedFor, setTestPrescribedFor] = useState({
    test: [],
    for: "",
  });
  const [generatingPdf, setGeneratingPdf] = useState(true);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [sendingloader, setSendingloader] = useState(true);
  const [sendingMsg, setSendingMsg] = useState(false);
  const [selectedComplaints, setSelectedComplaints] = useState([
    {
      complaint: "",
      isCustom: true,
      days: "",
      weeks: "",
      months: "",
      years: "",
    },
  ]);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState([
    {
      diagnosis: "",
      isCustom: true,
      days: "",
      weeks: "",
      months: "",
      years: "",
    },
  ]);
  const [selectedAdvice, setSelectedAdvice] = useState([]);

  const [durationValue, setDurationValue] = useState(0);
  const [durationUnit, setDurationUnit] = useState("Days");
  const [nextVisitDate, setNextVisitDate] = useState("");
  const [nextVisitTime, setNextVisitTime] = useState("");
  const [nextVisitAppointmentId, setNextVisitAppointmentId] = useState("");
  const [counselingText, setCounselingText] = useState("");

  const [templateName, setTemplateName] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [showTestForRelative, setShowTestForRelative] = useState(false);
  const [doctorData, setDoctorData] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();

  const prescriptionId = useSelector(
    (state) => state?.PatientSlice?.prescription?.prescription?._id,
  );
  const showHospitalHeader = useSelector(
    (state) => state.hospital?.data?.hospital?.showHeaderInPdf,
  );

  const hospitalData = useSelector((state) => state.hospital.data?.hospital);

  const doctorsData = useSelector((state) => state.DoctorSlice.doctorList);
  const prescriptionData = useSelector(
    (state) => state?.PatientSlice?.previousPrescription?.prescription,
  );

  const templates = useSelector(
    (state) => state.AppointmentSlice?.prescriptionTemplates?.result,
  );
  const patientData = useSelector((state) => state?.PatientSlice?.patientData);

  useEffect(() => {
    if (params && params.patientId) {
      dispatch(getDoctorThunk(""));
      dispatch(getAppointmentTypeThunk());
      dispatch(getRemarksThunk("timing"));
      dispatch(getRemarksThunk("period"));
      dispatch(getRemarksThunk("frequency"));
      dispatch(getAdviceThunk({ query: "", limit: 20 }));
      dispatch(getTestThunk({ query: "", limit: 20 }));
      dispatch(getPatientById(params));
      dispatch(getPatientPreviousPrescription(params));
      dispatch(getMedicinesTemplatesList());
      dispatch(getDiagnosisTemplatesList());
      dispatch(getComplaintsTemplatesList());
      dispatch(getTestTemplatesList());
      dispatch(getAdviceTemplatesList());
      dispatch(getPrescriptionTemplatesList());
      dispatch(getCounsellingTemplatesList());
      dispatch(getMyHospitalData());
      dispatch(getDoctorThunk({ searchTerm: "", sortBy: "createdAt" }));
    }
  }, [params?.patientId]);

  useEffect(() => {
    if (prescriptionData) {
      try {
        const { advice, diagnosis, vitals } = prescriptionData;
        // Ensure data exists before setting state
        setSelectedAdvice(advice || []);
        setSelectedDiagnosis(diagnosis || []);

        if (vitals) {
          const lmp = vitals?.lastMenstrualPeriod
            ? formatDate(vitals.lastMenstrualPeriod)
            : null;
          setVitalsValue({
            ...vitalsValue,
            lastMenstrualPeriod: lmp,
          });
        }
      } catch (error) {
        console.error("Error processing prescription data:", error);
      }
    }
  }, [prescriptionData, params]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }

  const reset = () => {
    setSelectedAdvice([]);
    setSelectedDiagnosis([
      {
        diagnosis: "",
        days: "",
        weeks: "",
        months: "",
        isCustom: true,
        years: "",
      },
    ]);
    setVitalsValue({
      pulseRate: "",
      bodyWeight: "",
      bloodPressure: "",
      bodyTemperature: "",
      SpO2: "",
      lastMenstrualPeriod: null,
      estimatedDateOfDelivery: null,
    });
    setSelectedComplaints([
      {
        complaint: "",
        days: "",
        weeks: "",
        isCustom: true,
        months: "",
        years: "",
      },
    ]);
    setCounselingText("");
    setTestPrescribed([]);
    setMedicineArr([
      {
        name: "",
        genericName: "",
        dosage: "",
        remarks: "",
        frequency: "",
        period: "",
        notes: "",
      },
    ]);
    setDurationValue("");
    setNextVisitDate("");
    setNextVisitTime("");
    setSelectedTemplate("");
  };

  const handleAddPrescription = async () => {
    const complaints = selectedComplaints.filter((c) => c?.complaint);
    const medicines = medicineArr.filter((m) => m?.name);
    const diagnosis = selectedDiagnosis.filter((d) => d?.diagnosis);

    if (showTestForRelative) {
      var testfor = testPrescribedFor;
    } else {
      testfor = [];
    }

    const prescriptionData = {
      vitals: {
        ...vitalsValue,
        lastMenstrualPeriod:
          patientData && patientData.gender === "FEMALE"
            ? vitalsValue.lastMenstrualPeriod
            : null,
        estimatedDateOfDelivery:
          patientData && patientData.gender === "FEMALE"
            ? vitalsValue.estimatedDateOfDelivery
            : null,
      },
      advice: selectedAdvice,
      testPrescribed,
      testPrescribedFor: testfor,
      diagnosis,
      complaints: complaints,
      counselling: counselingText,
      nextVisit: {
        durationUnit,
        durationValue,
        nextVisitDate,
        nextVisitTime,
        appointmentId: nextVisitAppointmentId,
      },
      prescriptionId,
      medicines: medicines.map(
        ({
          name,
          period,
          frequency,
          dosage,
          notes,
          genericName,
          remarks,
          ...rest
        }) => ({
          name: name || null,
          period: period || null,
          genericName,
          dosage: dosage,
          notes: notes,
          frequency: frequency || null,
          remarks: remarks || null,
          ...rest,
        }),
      ),
    };

    return dispatch(
      addPrescriptionThunk({
        patientId: params.patientId,
        ...prescriptionData,
      }),
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    let emptyCount = 0;

    if (emptyCount > 1) {
      toast.error(`Please delete at least ${emptyCount - 1} medicine row.`);
      return;
    }

    // setErrorArr((prev) => ({ ...prev, medicineArr: false }));
    setSubmitLoader(true);
    setGeneratingPdf(true);
    setSendingloader(true);
    handleAddPrescription().then((data) => {
      setNextVisitAppointmentId(
        data?.payload?.prescription?.nextVisit?.appointmentId,
      );
      dispatch(generatePrescriptionPdfThunk(data?.payload?.prescription?._id))
        .unwrap()
        .then((data) => {
          setSubmitLoader(false);
          setGeneratingPdf(false);
          setSendingloader(false);
        });
      dispatch(getPatientPreviousPrescription(params))
        .unwrap()
        .then((data) => {
          setDoctorData(data?.prescription?.doctorId);
        });
    });
  };

  const downloadPdfHandler = () => {
    setGeneratingPdf(true);
    setSubmitLoader(true);

    setSendingloader(true);
    handleAddPrescription().then((data) => {
      setNextVisitAppointmentId(
        data?.payload?.prescription?.nextVisit?.appointmentId,
      );
      dispatch(generatePrescriptionPdfThunk(data?.payload?.prescription?._id))
        .unwrap()
        .then((data) => {
          if (data.prescription) {
            if (!showHospitalHeader) {
              window.open(data.prescription?.prescriptionWithoutHeaderPdfUrl);
            } else {
              window.open(data.prescription?.prescriptionPdfUrl);
            }
          }
          setGeneratingPdf(false);
          setSubmitLoader(false);

          setSendingloader(false);
        });
      dispatch(getPatientPreviousPrescription(params));
    });
  };

  const sendPrescriptionHandler = (e) => {
    e.preventDefault();
    setSendingMsg(true);
    setSubmitLoader(true);
    setGeneratingPdf(true);
    setSendingloader(true);
    handleAddPrescription().then((data) => {
      setNextVisitAppointmentId(
        data?.payload?.prescription?.nextVisit?.appointmentId,
      );
      dispatch(sendPatientPrescriptionThunk(prescriptionId))
        .unwrap()
        .then((data) => {
          setSendingMsg(false);
          if (data) toast.success(data.msg);
          setSendingloader(false);
          setSubmitLoader(false);
          setGeneratingPdf(false);
        });
    });
  };
  const complaints = selectedComplaints.filter((c) => c?.complaint);
  const medicines = medicineArr.filter((m) => m?.name);
  const diagnosis = selectedDiagnosis.filter((d) => d?.diagnosis);
  if (showTestForRelative) {
    var testfor = testPrescribedFor;
  } else {
    testfor = [];
  }
  const prescriptionDataForPdf = {
    vitals: {
      ...vitalsValue,
      lastMenstrualPeriod:
        patientData && patientData.gender === "FEMALE"
          ? vitalsValue.lastMenstrualPeriod
          : null,
      estimatedDateOfDelivery:
        patientData && patientData.gender === "FEMALE"
          ? vitalsValue.estimatedDateOfDelivery
          : null,
    },
    advice: selectedAdvice,
    testPrescribed,
    testPrescribedFor: testfor,
    diagnosis,
    complaints: complaints,
    counselling: counselingText,
    nextVisit: {
      durationUnit,
      durationValue,
      nextVisitDate,
      nextVisitTime,
      appointmentId: nextVisitAppointmentId,
    },
    prescriptionId,
    medicines: medicines.map(
      ({
        name,
        period,
        frequency,
        dosage,
        notes,
        genericName,
        remarks,
        ...rest
      }) => ({
        name: name || null,
        period: period || null,
        genericName,
        dosage: dosage,
        notes: notes,
        frequency: frequency || null,
        remarks: remarks || null,
        ...rest,
      }),
    ),
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTemplateName("");
  };

  const handleSaveTemplate = () => {
    if (!templateName) {
      toast.error("Please enter a template title");
      return;
    }

    const newTemplate = {
      name: templateName,
      medicines: [...medicineArr],
      diagnosis: selectedDiagnosis,
      complaints: selectedComplaints,
      advice: selectedAdvice,
      testPrescribed: testPrescribed,
      counselling: counselingText,
    };

    dispatch(addPrescriptionTemplate(newTemplate))
      .unwrap()
      .then(() => {
        dispatch(getPrescriptionTemplatesList());
        handleCloseDialog();
      });
  };

  const handleTemplateSelect = (value) => {
    const selected = templates.find((template) => template.name === value);
    if (selected) {
      setTemplateName(value);
      setMedicineArr(selected.medicines || []);
      setSelectedDiagnosis(
        [
          ...selected.diagnosis,
          {
            diagnosis: "",
            durationValue: "",
            durationUnit: "",
            date: "",
          },
        ] || [],
      );
      setSelectedAdvice(selected.advice || []);
      setTestPrescribed(selected.testPrescribed || []);
      setSelectedComplaints(
        [
          ...selected.complaints,
          {
            complaint: "",
            durationValue: "",
            durationUnit: "",
            date: "",
          },
        ] || [],
      );
      setCounselingText(selected.counselling || "");
    }
    setSelectedTemplate(value);
  };
  const handlePrescriptionDeleteTemplate = (templateName) => {
    if (!templateName) {
      toast.error("Please select a template");
      return;
    }

    dispatch(deletePrescriptionTemplate(templateName))
      .unwrap()
      .then(() => {
        dispatch(getPrescriptionTemplatesList());
        setTemplateName("");
      });
  };

  if (!patientData && !prescriptionData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="font-bold">Loading data...</h1>
      </div>
    );
  }

  return (
    <>
      <PatientDetailsNavbar patient={patientData} />

      <div className="min-h-screen bg-gray-50 p-4">
        {/* <div className="flex justify-between items-center px-4">
          <button className="text-blue-600 font-semibold">&larr; Back</button>
          <div className="flex space-x-4">
            <button className="bg-gray-200 px-4 py-2 rounded-md">Print</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
              Save
            </button>
          </div>
        </div> */}
        <div className="w-full mx-auto space-y-12">
          <div className="sm:flex sm:justify-between  w-full bg-white p-2 shadow-sm mb-4 rounded-xl">
            <div className="flex items-center gap-2">
              {" "}
              <div className=" text-md text-gray-800 font-semibold">
                Selected Template: {selectedTemplate}
              </div>
              {selectedTemplate && (
                <button
                  className="text-red-500 transition-colors duration-200 hover:text-red-600"
                  onClick={() => handlePrescriptionDeleteTemplate(templateName)}
                >
                  <FaTrash />
                </button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 mr-0">
            <div className="flex gap-2 w-1/8 justify-start w-full p-2 sm:justify-end ">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                onClick={() => {
                  reset();
                }}
              >
                Reset
              </button>
              <Tooltip content="Save Template" placement="bottom">
                <button
                  onClick={handleOpenDialog}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  <FaRegSave /> Save Template
                </button>
              </Tooltip>
              </div> 

              <div className="w-full sm:w-48 md:w-60">
                <Autocomplete
                  freeSolo
                  size="small"
                  options={templates || []}
                  getOptionLabel={(option) => option.name}
                  defaultValue={{ name: selectedTemplate || "" }}
                  value={{ name: selectedTemplate || "" }}
                  disableClearable
                  onInputChange={(_, value) => {
                    if (value.length === 0) {
                      handleTemplateSelect("");
                    }
                  }}
                  onChange={(_, newValue) =>
                    handleTemplateSelect(newValue?.name ? newValue?.name : "")
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Template" />
                  )}
                  renderOption={(props, option) => (
                    <li
                      {...props}
                      onClick={undefined}
                      className="flex justify-between gap-2 px-4 py-2"
                    >
                      <span
                        onClick={props.onClick}
                        className="w-full cursor-pointer"
                      >
                        {option.name}
                      </span>
                      <button
                        className="text-red-500 transition-colors duration-200 hover:text-red-600"
                        onClick={() =>
                          handlePrescriptionDeleteTemplate(templateName)
                        }
                      >
                        <FaTrash />
                      </button>
                    </li>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8">
          <Card className="p-2 pt-0 shadow-lg">
            <ComplaintTable
              selectedComplaints={selectedComplaints || []}
              setSelectedComplaints={setSelectedComplaints}
            />
          </Card>
          <VitalsCard
            vitalsValue={
              vitalsValue || {
                pulseRate: "",
                bodyWeight: "",
                bloodPressure: "",
                bodyTemperature: "",
                SpO2: "",
                lastMenstrualPeriod: null,
                estimatedDateOfDelivery: null,
              }
            }
            setVitalsValue={setVitalsValue}
            patientData={patientData}
          />
          <Card className="p-2 shadow-lg">
            <DiagnosisTable
              selectedDiagnosis={selectedDiagnosis || []}
              setSelectedDiagnosis={setSelectedDiagnosis}
            />
          </Card>

          <Card className="p-2 shadow-lg">
            <MedicineTable
              medicineArr={medicineArr || []}
              setMedicineArr={setMedicineArr}
            />
          </Card>
          <AdviceCard
            setSelectedAdvice={setSelectedAdvice || []}
            selectedAdvice={selectedAdvice}
          />
          <TestCard
            testPrescribed={testPrescribed || []}
            setTestPrescribed={setTestPrescribed}
            testPrescribedFor={testPrescribedFor || []}
            setTestPrescribedFor={setTestPrescribedFor}
            showTestForRelative={showTestForRelative}
            setShowTestForRelative={setShowTestForRelative}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Counselling
              counselingText={counselingText || ""}
              setCounselingText={setCounselingText}
            />
            <NextVisit
              durationValue={durationValue}
              setDurationValue={setDurationValue}
              durationUnit={durationUnit}
              setDurationUnit={setDurationUnit}
              nextVisitDate={nextVisitDate}
              setNextVisitDate={setNextVisitDate}
              nextVisitTime={nextVisitTime}
              setNextVisitTime={setNextVisitTime}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap justify-center  p-5 items-center mt-10 md:mt-0 gap-2 sm:gap-4 w-full md:w-auto">
          <Button
            onClick={() => reset()}
            color="red"
            variant="filled"
            className="w-full sm:w-auto md:w-32"
          >
            Reset
          </Button>
          <Button
            onClick={submitHandler}
            disabled={submitLoader}
            color="green"
            variant="filled"
            className="w-full sm:w-auto md:w-32 transition-colors duration-200 hover:bg-green-600"
          >
            Submit
          </Button>

          {/* <Button
            onClick={downloadPdfHandler}
            color="blue"
            disabled={generatingPdf}
            variant="filled"
            className="w-full sm:w-auto md:w-32 transition-colors duration-200 hover:bg-blue-600"
          >
            Print
          </Button> */}
<PrescriptionPage
        disable={generatingPdf}
        data={prescriptionDataForPdf}
        hospitalData={hospitalData}
        doctorData={doctorData}
        patientData={patientData}
      />
          <Button
            onClick={sendPrescriptionHandler}
            disabled={sendingloader}
            color="green"
            className="w-full sm:w-auto md:w-32 transition-colors duration-200 hover:bg-green-600"
          >
            {sendingMsg ? "Sending..." : "Send"}
          </Button>
        </div>
      </div>
      
      <PreviousPrescriptions
        showHospitalHeader={showHospitalHeader}
        patientId={params.patientId}
      />

      <Dialog size="xs" open={openDialog} handler={handleCloseDialog}>
        <DialogHeader>Save Template</DialogHeader>
        <DialogBody divider>
          <Input
            label="Template Name"
            color="blue"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            placeholder="Enter Prescription template Name"
            fullWidth
          />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="gray"
            onClick={handleCloseDialog}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button color="blue" onClick={handleSaveTemplate}>
            Save
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default AddPatientPrescription;
