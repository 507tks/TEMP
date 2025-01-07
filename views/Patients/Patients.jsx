import ViewInvoices from "@/component/modal/patients/ViewInvoices";
import { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { AiOutlineSchedule } from "react-icons/ai";
import { CiCalendarDate } from "react-icons/ci";
import {
  FaDownload,
  FaFileInvoice,
  FaPrescription,
  FaRegEye,
  FaTrash,
  FaUpload,
} from "react-icons/fa";
import { GrDocumentTime } from "react-icons/gr";
import { MdModeEditOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Notes from "../../component/modal/appointment/Notes";
import { AddNewPatient } from "../../component/modal/patients/addPatient";
import DeletePatient from "../../component/modal/patients/deletePatient";
import DownloadFiles from "../../component/modal/patients/downloadDoc";
import EditPatient from "../../component/modal/patients/EditPatient";
import ScheduleAppointment from "../../component/modal/patients/scheduleAppointment";
import UploadDoc from "../../component/modal/patients/uploadDoc";
import ViewAppointment from "../../component/modal/patients/viewAppointments";
import { getPatientThunk } from "../../redux/thunk/patients";
import { filterActionsByAccess } from "../../utils/helpers";
import { DefaultPagination } from "../../utils/pagination";
import PatientHeader from "./PatientHeader";
import ViewPrescriptionHistory from "../Prescription/ViewPrescriptionHistory";
import { History } from "lucide-react";
import PatientTable from "./PatientTable";

function Patients() {
  const navigate = useNavigate();
  const [addPatientModel, setAddPatientModel] = useState(false);
  const [scheduleModel, setScheduleModel] = useState(false);
  const [editPatientModel, setEditPatientModel] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState();
  const [appointmentModel, setAppointmentModel] = useState(false);
  const [viewInvoices, setViewInvoices] = useState(false);
  const [uploadDoc, setUploadDoc] = useState(false);
  const [downloadDoc, setDownloadDoc] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [sessionModal, setSessionModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [isNotesModalOpen, setNotesModalOpen] = useState(false);

  const [sortField, setSortField] = useState("createdAt");
  const [sortType, setSortType] = useState("-1");

  
 
  const [prescriptionHistoryModal, setPrescriptionHistoryModal] =
    useState(false);


  

  const pageSize = 25;

  const patientData = useSelector(
    (state) => state.PatientSlice?.patientList?.allPatients?.patients,
  );
  const totalPatients = useSelector(
    (state) => state.PatientSlice?.patientList?.allPatients.count,
  );

  const role = useSelector((state) => state.userrole?.userRole);

  const dispatch = useDispatch();

  // useEffect(() => {
  //     if (patientData?.patientList?.allPatients?.patients) {
  //         let patients = [...(patientData.patientList.allPatients.patients || [])];
  //         if (sortByName) {
  //             patients.sort((a, b) => a.name.localeCompare(b.name));
  //             setSortButtonColor("bg-gray-200");
  //             setIsSortButtonDisabled(true);
  //         } else {
  //             setSortButtonColor("bg-blue-500");
  //             setIsSortButtonDisabled(false);
  //         }
  //         setSortedData(patients);
  //     }
  //     setLoading(patientData.loading);
  // }, [patientData, sortByName]);

  useEffect(() => {
    dispatch(
      getPatientThunk({
        searchValue: searchValue,
        pageSize,
        pageIndex: currentPage,
        sortBy: sortField,
        sortType: sortType,
      }),
    );
  }, [currentPage, searchValue, sortField, sortType, pageSize, dispatch]);

  const totalPages = totalPatients ? Math.ceil(totalPatients / pageSize) : 0;

  

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const actions = [
    {
      icon: <FaPrescription size={20} color="red" className="cursor-pointer" />,
      id: "ADD_PRESCRIPTION",
      tooltip: "Add Prescription",
      onClickFunction: (data) => navigate("/prescription/" + data._id),
    },
    {
      icon: (
        <CiCalendarDate size={18} color="teal" className="cursor-pointer " />
      ),
      id: "SCHEDULE_APPOINTMENT",
      tooltip: "Schedule Appointment",
      onClickFunction: (patient) => {
        setSelectedPatient(patient);
        setScheduleModel(true);
      },
    },
    {
      icon: (
        <AiOutlineSchedule size={20} color="teal" className="cursor-pointer" />
      ),
      id: "SCHEDULE_SESSIONS",
      tooltip: "Schedule Sessions",
      onClickFunction: (data) => navigate("/sessions/" + data._id),
    },
    {
      icon: (
        <CiCalendarDate size={18} color="teal" className="cursor-pointer " />
      ),
      id: "SCHEDULE_SESSION",
      tooltip: "Schedule Session",
      onClickFunction: (patient) => {
        setSelectedPatient(patient);
        setSessionModal(true);
      },
    },

    {
      icon: (
        <MdModeEditOutline size={18} color="teal" className="cursor-pointer" />
      ),
      id: "UPDATE_PATIENT",
      tooltip: "Update Details",
      onClickFunction: (patient) => {
        setSelectedPatient(patient);
        setEditPatientModel(true);
      },
    },
    {
      icon: <History size={20} color="teal" className="cursor-pointer" />,
      id: "PRESCRIPTION_HISTORY",
      tooltip: "Patient Prescription History",
      onClickFunction: (patient) => {
        setPrescriptionHistoryModal(true);
        setSelectedPatient(patient);
      },
    },
    {
      icon: <FaRegEye size={18} color="blue" className="cursor-pointer" />,
      id: "VIEW_APPOINTMENTS",
      tooltip: "View Appointments",
      onClickFunction: (patient) => {
        setAppointmentModel(true);
        setSelectedPatient(patient);
      },
    },
    {
      icon: (
        <FaFileInvoice size={20} color="black" className="cursor-pointer" />
      ),
      id: "ADD_INVOICE",
      tooltip: "Add Invoice",
      onClickFunction: (patient) => {
        setSelectedPatient(patient);
        navigate(`/dashboard/invoices/addInvoice?patientId=${patient?._id}`);
      },
    },
    {
      icon: (
        <GrDocumentTime size={18} color="black" className="cursor-pointer" />
      ),
      id: "VIEW_INVOICE",
      tooltip: "View Invoices",
      onClickFunction: (patient) => {
        setSelectedPatient(patient);

        setViewInvoices(true);
        // navigate(`/dashboard/invoices?patientId=${selectedPatient._id}`)
      },
    },
    {
      icon: <CgNotes size={20} color="#3f51b5" className="cursor-pointer" />,
      id: "NOTES_PATIENT",
      tooltip: "Notes",
      onClickFunction: (patient) => {
        setSelectedPatient(patient);

        setNotesModalOpen(true);
      },
    },
    {
      icon: <FaUpload size={18} className="cursor-pointer text-[#3985cd]" />,
      id: "UPLOAD_DOCS_PATIENT",
      tooltip: "Upload Documents",
      onClickFunction: (patient) => {
        setSelectedPatient(patient);

        setUploadDoc(true);
      },
    },
    {
      icon: <FaDownload size={18} color="green" className="cursor-pointer" />,
      id: "DOWNLOAD_DOCS_PATIENT",
      tooltip: "Download Documents",
      onClickFunction: (patient) => {
        setSelectedPatient(patient);

        setDownloadDoc(true);
      },
    },

    {
      icon: <FaTrash size={18} color="red" className="cursor-pointer" />,
      id: "DELETE_PATIENT",
      tooltip: "Delete Patient",
      onClickFunction: (patient) => {
        setDeleteModal(true);
        setSelectedPatient(patient);
      },
    },
  ];

  const filteredActions = filterActionsByAccess(actions, role, "patients");

  return (
    <div className="relative  w-full px-7 py-10">
      <PatientHeader
        setAddPatientModel={setAddPatientModel}
        count={totalPatients}
        // sortButtonColor={sortButtonColor}
        sortField={sortField}
        setSortField={setSortField}
        sortType={sortType}
        setSortType={setSortType}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setCurrentPage={setCurrentPage}
        // isSortButtonDisabled={isSortButtonDisabled}
        pageSize={pageSize}
      />
      <div className="">
        <PatientTable
          patientData={patientData}
          actions={filteredActions}
          selectedRow={setSelectedPatient}
          pageInfo={{ currentPage: currentPage - 1, pageSize }}
        />
        {/* <ActionTable
          heading={selectedColumns}
          keys={filteredKeys}
          tableData={patientData}
          actions={filteredActions}
          selectedRow={setSelectedPatient}
          loading={loading}
          pageInfo={{ currentPage: currentPage - 1, pageSize }}
        /> */}
      </div>

      <AddNewPatient
        open={addPatientModel}
        toggler={() => setAddPatientModel(!addPatientModel)}
      />
      <ScheduleAppointment
        open={scheduleModel}
        toggler={() => setScheduleModel(!scheduleModel)}
        patient={selectedPatient}
        currentPage={currentPage}
        searchValue={searchValue}
      />
      <ViewPrescriptionHistory
        open={prescriptionHistoryModal}
        toggler={() => setPrescriptionHistoryModal(!prescriptionHistoryModal)}
        patient={selectedPatient}
      />

      <EditPatient
        open={editPatientModel}
        toggler={() => setEditPatientModel(!editPatientModel)}
        patient={selectedPatient}
        currentPage={currentPage}
        searchValue={searchValue}
      />
      <Notes
        open={isNotesModalOpen}
        toggler={() => setNotesModalOpen(false)}
        patient={selectedPatient}
        currentPage={currentPage}
        searchValue={searchValue}
      />
      <ViewAppointment
        open={appointmentModel}
        toggler={() => setAppointmentModel(!appointmentModel)}
        patient={selectedPatient}
      />
      <ViewInvoices
        open={viewInvoices}
        toggler={() => setViewInvoices((prev) => !prev)}
        patient={selectedPatient}
      />
      <UploadDoc
        open={uploadDoc}
        toggler={() => setUploadDoc(!uploadDoc)}
        patient={selectedPatient}
        currentPage={currentPage}
        searchValue={searchValue}
      />
      <DownloadFiles
        setParentModalOpen={setDownloadDoc}
        open={downloadDoc}
        toggler={() => setDownloadDoc(!downloadDoc)}
        patient={selectedPatient}
      />
      <DeletePatient
        open={deleteModal}
        toggler={() => setDeleteModal(!deleteModal)}
        patient={selectedPatient}
        searchValue={searchValue}
        currentPage={currentPage}
        sortField={sortField}
        sortType={sortType}
      />
      <div className="flex justify-center mt-6">
        <DefaultPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}

export default Patients;
