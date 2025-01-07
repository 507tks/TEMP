import React, { useState } from "react";
import { X, File, CheckCircle } from "lucide-react";

const UploadContainer = () => {
  const [files, setFiles] = useState([]);

  const handleFilesChange = (event) => {
    const selectedFiles = Array.from(event.target.files).map((file) => ({
      file,
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + " MB",
      type: file.type,
      progress: 0,
      status: "Uploading"
    }));
    setFiles([...files, ...selectedFiles]);
    uploadFiles(selectedFiles);
  };

  const uploadFiles = (files) => {
    if (!Array.isArray(files)) return;

    files.forEach((file) => {
      const formData = new FormData();
      formData.append("file", file.file);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:5000/upload", true);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          setFiles((prevFiles) => prevFiles.map((f) => (f.name === file.name ? { ...f, progress } : f)));
        }
      };
      xhr.onload = () => {
        if (xhr.status === 200) {
          setFiles((prevFiles) => prevFiles.map((f) => (f.name === file.name ? { ...f, status: "Completed" } : f)));
        } else {
          setFiles((prevFiles) => prevFiles.map((f) => (f.name === file.name ? { ...f, status: "Failed" } : f)));
        }
      };

      xhr.send(formData);
    });
  };

  const removeFile = (fileName) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };
  const discardFiles = () => {
    setFiles([]);
    document.getElementById("fileUpload").value = ""; //Clear the file input
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <h2 className="text-lg font-medium text-gray-700 mb-4">Upload and attach file</h2>
        <p className="text-sm text-gray-500 mb-6">Attachments will be a part of this project.</p>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-6 text-center">
          <input type="file" multiple onChange={handleFilesChange} className="hidden" id="fileUpload" />
          <label htmlFor="fileUpload" className="cursor-pointer text-purple-500">
            <div className="flex flex-col items-center">
              <File className="w-12 h-12 mb-2" />
              <p>Click to Upload or drag and drop</p>
              <p className="text-sm text-gray-400">Max. File size: 25 MB</p>
            </div>
          </label>
        </div>

        <div className="mb-6">
          <h3 className="text-base font-medium text-gray-700 mb-4">Files uploading...</h3>
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between mb-3 border rounded-md p-2 border-gray-300">
              <div className="flex items-center gap-2">
                <File className="w-8 h-8 text-gray-500" />
                <div className="text-left">
                  <h2 className="text-sm font-medium text-gray-700">{file.name}</h2>
                  <h2 className="text-xs text-gray-400">{file.size} • </h2>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {file.status === "Uploading" && (
                  <div className="relative w-32 h-2 bg-gray-200 rounded">
                    <div className="absolute top-0 left-0 h-full bg-purple-500 rounded" style={{ width: `${file.progress}%` }}></div>
                  </div>
                )}
                {file.status === "Completed" && <CheckCircle className="text-green-500" />}
                {file.status === "Failed" && <X className="text-red-500" />}
                {file.status === "Uploading" && <X className="text-red-500 cursor-pointer" onClick={() => removeFile(file.name)} />}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md" onClick={discardFiles}>
            Discard
          </button>
          <button className="px-4 py-2 bg-purple-500 text-white rounded-md" onClick={uploadFiles}>
            Attach files
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadContainer;
