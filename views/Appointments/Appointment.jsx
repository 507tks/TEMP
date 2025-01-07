import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  FaDownload,
  FaFileUpload,
  FaPrescription,
  FaPenSquare,
  FaFileInvoice,
} from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import AddPrescription from "../../component/modal/appointment/appPrescription";
import AppointmentHeader from "./AppointmentHeader";
import UpdateAppointment from "../../component/modal/appointment/updateAppointment";
import UploadDoc from "../../component/modal/appointment/uploadDoc";
import DownloadFiles from "../../component/modal/patients/downloadDoc";
import { TiCancel } from "react-icons/ti";
import CancelAppointment from "../../component/modal/appointment/cancel";
import { PiListChecks } from "react-icons/pi";
import ViewAppointment from "../../component/modal/patients/viewAppointments";
import Notes from "../../component/modal/appointment/Notes";
import { DefaultPagination } from "../../utils/pagination";
import { useNavigate } from "react-router-dom";
import { IoIosSend } from "react-icons/io";
import SendPrescription from "../../component/modal/appointment/sendPrescription";
import { MdCancel, MdOutlineRemoveRedEye } from "react-icons/md";
import ViewPrescription from "../../component/modal/appointment/viewPrescription";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import CompleteAppointment from "../../component/modal/appointment/completeAppointment";
import { filterActionsByAccess } from "../../utils/helpers";
import AppointmentDataTable from "./AppointmentTable";
import AbsentAppointmentModal from "@/component/modal/appointment/absentappointment";

const AppointmentTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isNotesModalOpen, setNotesModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState();
  const [isUploadDocModalOpen, setUploadDocModalOpen] = useState(false);
  const [isAppHistoryModalOpen, setAppHistoryModalOpen] = useState(false);
  const [isDownloadModalOpen, setDownloadModalOpen] = useState(false);
  const [isUpdateAppointmentModalOpen, setUpdateAppointmentModalOpen] =
    useState(false);
  const [cancelAppointment, setCancelAppointment] = useState(false);
  const [sendPrescriptionModal, setSendPrescriptionModal] = useState(false);
  const [prescriptionHistoryModal, setPrescriptionHistoryModal] =
    useState(false);
  const [completeAppointmentModal, setCompleteAppointmentModal] =
    useState(false);
   const [absentAppointmentModal, setAbsentAppointmentModal] =
     useState(false);
  const [searchValue, setSearchValue] = useState("");

  const role = useSelector((state) => state.userrole?.userRole);

  const pageSize = 25;

  const [payload, setPayload] = useState({
    date: "",
    status: "",
    search: searchValue,
  });
  // const userPermissions = useSelector((state) => state.LoginSlice.userPermissions?.data);

  const appointments = useSelector((state) => state.AppointmentSlice);
  const navigate = useNavigate();

  useEffect(() => {
    setTableData(appointments?.allAppoinments?.allAppoinments?.appointmentList);
    setLoading(appointments.loading);
  }, [appointments]);

  const totalPages = appointments?.allAppoinments?.allAppoinments?.count
    ? Math.ceil(appointments?.allAppoinments?.allAppoinments?.count / pageSize)
    : 0;

  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const totalAppointments =
    appointments?.allAppoinments?.allAppoinments?.count || 0;

  const actions = [
    {
      icon: <FaPrescription size={20} color="red" className="cursor-pointer" />,
      id: "ADD_PRESCRIPTION",
      tooltip: "Add Prescription",
      onClickFunction: (appointment) => {
        navigate(`/prescription/${appointment.patient[0]._id}`);
      },
    },
    {
      icon: (
        <FaFileInvoice size={20} color="black" className="cursor-pointer" />
      ),
      id: "ADD_INVOICE",
      tooltip: "Add Invoice",
      onClickFunction: (appointment) =>
        navigate(
          `/dashboard/invoices/addInvoice?patientId=${appointment?.patient[0]?._id}&appointmentId=${appointment._id}`,
        ),
    },
    {
      icon: (
        <MdOutlineRemoveRedEye
          size={20}
          color="teal"
          className="cursor-pointer"
        />
      ),
      id: "PRESCRIPTION_HISTORY",
      tooltip: "Prescription History",
      onClickFunction: (appointment) => {
        setPrescriptionHistoryModal(true);
        setSelectedAppointment(appointment); // Ensure the appointment is set
      },
    },
    {
      icon: <CgNotes size={20} color="#3f51b5" className="cursor-pointer" />,
      id: "NOTES_APPOINTMENT",
      tooltip: "Notes",
      onClickFunction: (appointment) => {
        setNotesModalOpen(true);
        setSelectedAppointment(appointment); // Set selected appointment for notes
      },
    },
    {
      icon: <FaFileUpload size={18} color="teal" className="cursor-pointer" />,
      id: "UPLOAD_DOCS_APPOINTMENT",
      tooltip: "Upload File",
      onClickFunction: (appointment) => {
        setUploadDocModalOpen(true);
        setSelectedAppointment(appointment);
      },
    },
    {
      icon: <FaDownload size={18} color="orange" className="cursor-pointer" />,
      id: "DOWNLOAD_DOCS_APPOINTMENT",
      tooltip: "Download File",
      onClickFunction: (appointment) => {
        setDownloadModalOpen(true);
        setSelectedAppointment(appointment);
      },
    },
    {
      icon: <PiListChecks size={18} color="teal" className="cursor-pointer" />,
      id: "ALL_APPOINTMENTS",
      tooltip: "All Appointments",
      onClickFunction: (appointment) => {
        setAppHistoryModalOpen(true);
        setSelectedAppointment(appointment);
      },
    },
    {
      icon: <FaPenSquare size={18} color="green" className="cursor-pointer " />,
      id: "RESCHEDULE_APPOINTMENT",
      tooltip: "Reschedule Appointment",
      onClickFunction: (appointment) => {
        setUpdateAppointmentModalOpen(true);
        setSelectedAppointment(appointment);
      },
    },
    {
      icon: <TiCancel size={22} color="red" className="cursor-pointer" />,
      id: "ABSENT_APPOINTMENT",
      tooltip: "Mark as Absent",
      onClickFunction: (appointment) => {
        setAbsentAppointmentModal(true);
        setSelectedAppointment(appointment);
      },
    },
    {
      icon: (
        <IoCheckmarkDoneSharp
          size={22}
          color="green"
          className="cursor-pointer"
        />
      ),
      id: "MARK_COMPLETE",
      tooltip: "Mark Complete",
      onClickFunction: (appointment) => {
        setCompleteAppointmentModal(true);
        setSelectedAppointment(appointment);
      },
    },
    {
      icon: <MdCancel size={22} color="red" className="cursor-pointer" />,
      id: "CANCEL_APPOINTMENT",
      tooltip: "Cancel Appointment",
      onClickFunction: (appointment) => {
        setCancelAppointment(true);
        setSelectedAppointment(appointment);
      },
    },
    {
      icon: <IoIosSend size={22} color="blue" className="cursor-pointer" />,
      id: "SEND_PRESCRIPTION",
      tooltip: "Send Prescription",
      onClickFunction: (appointment) => {
        setSendPrescriptionModal(true);
        setSelectedAppointment(appointment);
      },
    },
  ];

  const filteredActions = filterActionsByAccess(actions, role, "appointments");

  return (
    <div className="relative  w-full px-7 py-10">
      <AppointmentHeader
        setDropdown={setPayload}
        count={totalAppointments}
        payload={payload}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        pageSize={pageSize}
        pageIndex={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <div className="overflow-x-auto">
        <AppointmentDataTable
          actions={filteredActions}
          selectedRow={setSelectedAppointment}
          appointmentData={tableData}
          loading={loading}
          pageInfo={{ currentPage: currentPage - 1, pageSize }}
        />
        {/* <ActionTable
          heading={selectedColumn}
          keys={filteredKey}
          tableData={tableData}
          actions={filteredActions}
          selectedRow={setSelectedAppointent}
          loading={loading}
          pageInfo={{ currentPage: currentPage - 1, pageSize }}
          onActionClick={handleActionClick}
        /> */}
      </div>
      <AddPrescription
        open={isModalOpen}
        toggler={() => setModalOpen(false)}
        appointment={selectedAppointment}
        currentPage={currentPage}
      />
      <Notes
        open={isNotesModalOpen}
        toggler={() => setNotesModalOpen(false)}
        appointment={selectedAppointment}
        currentPage={currentPage}
        payloadValue={payload}
      />
      <UploadDoc
        open={isUploadDocModalOpen}
        toggler={() => setUploadDocModalOpen(false)}
        appointment={selectedAppointment}
        currentPage={currentPage}
        payloadValue={payload}
      />
      <DownloadFiles
        setParentModalOpen={setDownloadModalOpen}
        open={isDownloadModalOpen}
        toggler={() => setDownloadModalOpen(!isDownloadModalOpen)}
        patient={
          selectedAppointment &&
          selectedAppointment?.patient &&
          selectedAppointment?.patient[0]
        }
        selectedRow={setSelectedAppointment}
        appointment={true}
        currentPage={currentPage}
        payloadValue={payload}
      />
      <SendPrescription
        open={sendPrescriptionModal}
        toggler={() => setSendPrescriptionModal(!sendPrescriptionModal)}
        appointment={selectedAppointment}
        currentPage={currentPage}
      />
      <ViewAppointment
        open={isAppHistoryModalOpen}
        toggler={() => setAppHistoryModalOpen(false)}
        patient={
          selectedAppointment &&
          selectedAppointment?.patient &&
          selectedAppointment?.patient[0]
        }
      />
      <ViewPrescription
        open={prescriptionHistoryModal}
        toggler={() => setPrescriptionHistoryModal(!prescriptionHistoryModal)}
        appointment={selectedAppointment}
      />
      <UpdateAppointment
        isOpen={isUpdateAppointmentModalOpen}
        onRequestClose={() => setUpdateAppointmentModalOpen(false)}
        appointment={selectedAppointment}
        payloadValue={payload}
      />
      <CancelAppointment
        open={cancelAppointment}
        toggler={() => setCancelAppointment(!cancelAppointment)}
        appointment={selectedAppointment}
        currentPage={currentPage}
        payloadValue={payload}
      />
      <CompleteAppointment
        open={completeAppointmentModal}
        toggler={() => setCompleteAppointmentModal(!completeAppointmentModal)}
        appointment={selectedAppointment}
        currentPage={currentPage}
        payload={payload}
      />

      <AbsentAppointmentModal
        open={absentAppointmentModal}
        toggler={() => setAbsentAppointmentModal(!absentAppointmentModal)}
        appointment={selectedAppointment}
        currentPage={currentPage}
        payload={payload}
      />
      <div className="flex flex-row justify-center">
        <DefaultPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default AppointmentTable;
