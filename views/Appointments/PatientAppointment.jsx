import { getPrescriptionHistoryByAppointmentIdThunk, getSingleAppointment } from "@/redux/thunk/appointments";
import { Typography } from "@material-tailwind/react";
import { ArrowLeft } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaDownload, FaEye } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { getStatusColor } from "../../component/common/ActionTable/TableFunctions";
import { getDate, getTime } from "../../utils/dateHelper";
import { useParams } from "react-router-dom";
import Error from "../Error";

const PatientAppointment = () => {
  const [singleAppointmentData, setSingleAppointmentData] = useState({});
  const [pdfUrl, setPdfUrl] = useState("");
  const [DocsData, setDocsData] = useState([]);
  const [perscriptionHistoryData, setPerscriptionHistoryData] = useState([]);

  const { appointmentId } = useParams();
  // const appointmentSlice = useSelector((state) => state.AppointmentSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleAppointment(appointmentId)).then(res => {
      setSingleAppointmentData(res?.payload?.data);
    });
  }, [appointmentId,dispatch]);

  const downloadFile = (file) => {
    const downloadLink = document.createElement("a");
    downloadLink.href = file.s3url;
    downloadLink.download = file.filePath;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  useEffect(() => {
    setDocsData(singleAppointmentData?.patientId?.docs || []);
    setPdfUrl(singleAppointmentData?.prescriptionId?.prescriptionWithoutHeaderPdfUrl || singleAppointmentData?.prescriptionId?.prescriptionPdfUrl)
  }, [singleAppointmentData?.patientId?.docs,singleAppointmentData?.prescriptionId?.prescriptionPdfUrl,singleAppointmentData?.prescriptionId?.prescriptionWithoutHeaderPdfUrl]);

  useEffect(() => {
    if (appointmentId) {
      dispatch(getPrescriptionHistoryByAppointmentIdThunk(appointmentId)).then(res => {
        setPerscriptionHistoryData(res?.payload?.prescription?.map(pres => {
          return { url: pres?.prescriptionWithoutHeaderPdfUrl || pres?.prescriptionPdfUrl, createdAt: pres?.createdAt }
        }) || []);
      });
    }
  }, [appointmentId,dispatch]);

  if (!appointmentId) {
    return <Error />;
  }

  if (!singleAppointmentData?.patientId) {
    return <div className="relative bg-white rounded-xl p-6 shadow-lg my-6 mx-4 sm:mx-12 min-h-[calc(100vh-50px)] flex flex-col justify-center items-center">
      <Typography className="" variant="h3">
        Please wait
      </Typography>
      <span>
        loading...
      </span>
    </div>;
  }

  return (
    <div className="relative bg-white rounded-xl p-6 shadow-lg my-6 mx-4 sm:mx-12 min-h-[calc(100vh-50px)]">
      <div className="mb-20 flex gap-5 items-center">
        <button onClick={() => window.history.back()} className="bg-blue-300 p-1.5 rounded-full text-white"><ArrowLeft size={20} /></button>
        <Typography variant="h3">
          Appointment Details
        </Typography>
      </div>
      <div className="flex mt-4 px-10 text-gray-600">
        <div className="mr-20 flex-shrink-0">
          {singleAppointmentData.patientId?.profilePic ? (
            <img src={singleAppointmentData.patientId?.profilePic} alt="Patient Profile" className="w-40 h-40 rounded-full object-cover" />
          ) : (
            <FaUserCircle className="w-40 h-40 text-gray-400" />
          )}
        </div>
        <div className="flex flex-col justify-center flex-grow">
          <div className="grid grid-cols-2 gap-y-4">
            <span>
              <Typography>Patient Name</Typography>
              <Typography className="font-bold text-black">{singleAppointmentData.patientId?.name || "N/A"}</Typography>
            </span>
            <span>
              <Typography>Date</Typography>
              <Typography className="font-bold text-black">{getDate(singleAppointmentData.date) || "N/A"}</Typography>
            </span>
            <span>
              <Typography>Doctor</Typography>
              <Typography className="font-bold text-black">{singleAppointmentData.doctorId?.name || "N/A"}</Typography>
            </span>
            <span>
              <Typography>Time</Typography>
              <Typography className="font-bold text-black">{getTime(singleAppointmentData.date) || "N/A"}</Typography>
            </span>
            <span>
              <Typography>Department</Typography>
              <Typography className="font-bold text-black">{singleAppointmentData.departmentId?.name || "N/A"}</Typography>
            </span>
            <span className="">
              <Typography>Status</Typography>
              <Typography className="font-bold text-black">
                <span>{getStatusColor(singleAppointmentData.status)}</span>
              </Typography>
            </span>

          </div>
        </div>
      </div>
      <div>
        <Typography variant="h4" className="mt-8">
          Prescription
        </Typography>
        <Typography className="font-bold text-black w-40 sm:w-60 md:w-96 lg:w-[500px] truncate">
          {pdfUrl ? (
            <a href={pdfUrl} className="text-blue-500" target="_blank" rel="noopener noreferrer">
              {pdfUrl}
            </a>
          ) : (
            "No prescription available."
          )}
        </Typography>
      </div>
      <div>
        <Typography variant="h4" className="mt-8">
          Prescription History
        </Typography>
        <div className="mt-2 grid grid-cols-4 gap-2">
          <div className="col-span-3 font-bold">URL</div>
          <div className="col-span-1 font-bold">Date</div>
          {perscriptionHistoryData.length > 0 ? (
            perscriptionHistoryData.map((pres) => (
              <>
                <div className="col-span-3 w-40 sm:w-60 md:w-96 lg:w-[500px] truncate">
                  <a href={pres.url} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                    {pres.url}
                  </a>
                </div>
                <div className="col-span-1 text-gray-600">
                  ({moment(pres.createdAt).format("MMMM Do YYYY, h:mm:ss a")})
                </div>
              </>
            ))
          ) : (
            <Typography className="text-gray-600 col-span-4">No prescription history available.</Typography>
          )}
        </div>
      </div>
      {DocsData.length > 0 &&
        <div>
          <Typography variant="h4" className="mt-8">
            Document List
          </Typography>
          <div>
            {DocsData.map((file, index) => (
              <div key={index} className="mb-4 flex items-center">
                <span className="text-gray-700 max-w-[80%] truncate ml-3">{file.fileName}</span>
                <div className="flex items-center ml-auto">
                  <a href={file.s3url} rel="noopener noreferrer" target="_blank">
                    <FaEye className="text-blue-500 cursor-pointer mr-2" style={{ width: "24px", height: "24px" }} />
                  </a>
                  <FaDownload className="text-green-500 cursor-pointer mr-2" style={{ width: "24px", height: "24px" }} onClick={() => downloadFile(file)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      }
      <div>
        <Typography variant="h4" className="mt-8">
          Reference
        </Typography>
        <div>
          {singleAppointmentData.patientId?.reference ? (
            <Typography className="text-gray-600">{singleAppointmentData.patientId.reference}</Typography>
          ) : (
            <Typography className="text-gray-600">No reference available.</Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientAppointment;
