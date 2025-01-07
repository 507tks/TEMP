import React, { useState, useRef, useEffect } from "react";
import { Button, Dialog, DialogBody, DialogHeader, Input } from "@material-tailwind/react";
import { IoCloudUploadSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { uploadPatientDoc } from "../../../redux/thunk/patients";
import { appointmentThunk } from "../../../redux/thunk/appointments";

const UploadDoc = ({ open, toggler, appointment, currentPage, payloadValue }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const [prefix, setPrefix] = useState("");

  useEffect(() => {
    if (open) {
      setSelectedFile(null);
      setPrefix("");
    }
  }, [open]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setSelectedFile(droppedFile);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("patientfile", selectedFile);

    if (prefix) formData.append("customfilename", prefix);
    const payload = {
      id: appointment?.patient[0]._id,
      data: formData
    };

    await dispatch(uploadPatientDoc(payload));
    dispatch(appointmentThunk({ ...payloadValue, pageSize: 25, pageIndex: currentPage }));
    toggler();
  };

  return (
    <Dialog open={open} handler={toggler}>
      <DialogHeader>Upload Document</DialogHeader>
      <DialogBody className="flex flex-col items-center justify-center" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
        {/* Input field for Prefix */}
        <div className="w-full max-w-md mb-4">
          <Input label="Prefix" placeholder="Enter prefix" color="blue" value={prefix} onChange={(e) => setPrefix(e.target.value)} />
        </div>

        <div className="flex justify-center">
          <div className="border-dashed border border-blue-500 rounded py-10 px-20 mb-4 cursor-pointer" onClick={openFileDialog}>
            <IoCloudUploadSharp className="h-60 w-60 text-blue-500" />
            <p className="text-center text-gray-600 mb-4">Browse or Drop your files here</p>
          </div>
        </div>

        <form onSubmit={submitHandler}>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} />
          {selectedFile && <div className="text-center text-blue-500 mb-4">Uploaded Document: {selectedFile.name}</div>}
          <div className="flex justify-center mb-8">
            <Button color="blue" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
};

export default UploadDoc;
