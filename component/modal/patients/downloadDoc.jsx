import React, { useEffect, useState } from "react";
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import { FaEye, FaDownload, FaTrash } from "react-icons/fa";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { deleteMultipleFileThunk, getPatientThunk } from "../../../redux/thunk/patients";
import { useDispatch } from "react-redux";
import { appointmentThunk } from "../../../redux/thunk/appointments";
import { IoMdClose } from "react-icons/io";

const DownloadFiles = ({ setParentModalOpen, open, toggler, patient, currentPage, appointment, searchValue, payloadValue, selectedRow }) => {
  const [docList, setDocList] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);

  const dispatch = useDispatch();
  const handleCheckboxChange = (file) => {
    setSelectedFiles((prevSelectedFiles) => {
      if (prevSelectedFiles.includes(file)) {
        return prevSelectedFiles.filter((selectedFile) => selectedFile !== file);
      } else {
        return [...prevSelectedFiles, file];
      }
    });
  };

  useEffect(() => {
    if (patient?.docs) {
      setDocList(patient.docs);
      setSelectedFiles([]);
    } else {
      setDocList([]);
      setSelectedFiles([]);
    }
  }, [open, patient]);

  const handleMultipleDelete = async (files) => {
    await dispatch(deleteMultipleFileThunk({ patientId: patient._id, filePathArray: files }));
    if (appointment) {
      await dispatch(appointmentThunk({ ...payloadValue, pageSize: 25, pageIndex: currentPage }))
        .unwrap()
        .then((data) => {
          const temp = data?.allAppoinments?.appointmentList.filter((x) => x?.patient[0]._id === patient._id);
          if (temp.length > 0) selectedRow(temp[0]);
        });
    } else {
      await dispatch(getPatientThunk({ value: searchValue, pageSize: 25, pageIndex: currentPage }))
        .unwrap()
        .then((data) => {
          if (data?.allPatients) {
            const temp = data?.allPatients?.patients.filter((x) => x._id === patient._id);
            if (temp) selectedRow(temp[0]);
          }
        });
    }
    // setParentModalOpen(false);
  };

  const downloadFile = (file) => {
    const downloadLink = document.createElement("a");
    downloadLink.href = file.s3url;
    downloadLink.download = file.filePath;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleDeleteClick = (file) => {
    setFileToDelete(file);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setFileToDelete(null);
    setDeleteModalOpen(false);
  };

  const changeStatus = () => {
    setDeleteModalOpen(!deleteModalOpen);
    setFileToDelete(null);
    setParentModalOpen(true);
  };
  return (
    <>
      <Dialog open={open} handler={toggler} size="lg" dismiss={{ outsidePress: false }}>
        <DialogHeader>
          <div className="flex justify-between items-center w-full">
            <span>Download Files</span>
            <span className="flex gap-3 items-center ">
              {selectedFiles.length > 0 && (
                <button onClick={() => handleMultipleDelete(selectedFiles)} className="bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600 text-sm">
                  Delete({selectedFiles.length})
                </button>
              )}
              <IoMdClose className="cursor-pointer" onClick={() => setParentModalOpen(false)} />
            </span>
          </div>
        </DialogHeader>
        <DialogBody className="flex flex-col overflow-y-auto max-h-[40rem] px-8">
          {docList.map((file, index) => (
            <div key={index} className="mb-4 flex items-center">
              <input type="checkbox" checked={selectedFiles.includes(file.filePath)} onChange={() => handleCheckboxChange(file.filePath)} />
              <span className="text-gray-700 max-w-[80%] truncate ml-3">{file.fileName}</span>
              <div className="flex items-center ml-auto">
                <a href={file.s3url} rel="noopener noreferrer" target="_blank">
                  <FaEye className="text-blue-500 cursor-pointer mr-2" style={{ width: "24px", height: "24px" }} tooltip="View" />
                </a>
                <FaDownload className="text-green-500 cursor-pointer mr-2" style={{ width: "24px", height: "24px" }} tooltip="Download" onClick={() => downloadFile(file)} />
                <FaTrash className="text-red-500 cursor-pointer" style={{ width: "24px", height: "24px" }} tooltip="Delete" onClick={() => handleDeleteClick(file)} />
              </div>
            </div>
          ))}
        </DialogBody>
      </Dialog>
      <DeleteConfirmationModal open={deleteModalOpen} toggle={changeStatus} onDelete={confirmDelete} fileToDelete={fileToDelete} setParentModalOpen={setParentModalOpen} currentPage={currentPage} patient={patient} appointment={appointment} searchValue={searchValue} selectedRow={selectedRow} />
    </>
  );
};

export default DownloadFiles;
