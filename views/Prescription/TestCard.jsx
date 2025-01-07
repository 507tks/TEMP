import React, { useState } from "react";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Option, Select, Typography } from "@material-tailwind/react";
import { Autocomplete, TextField } from "@mui/material";
import { FaRegSave, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addTestTemplate, deleteTestTemplate, getTestTemplatesList, getTestThunk } from "@/redux/thunk/appointments";

export default function TestCard({
  testPrescribed,
  setTestPrescribed,
  testPrescribedFor,
  setTestPrescribedFor,
  showTestForRelative,
  setShowTestForRelative
}) {
  const dispatch = useDispatch();
  const testData = useSelector((state) => state.AppointmentSlice?.testData?.result || []);
  const testTemplates = useSelector((state) => state.AppointmentSlice?.testTemplates?.result);

  const [newTestTemplateTitle, setNewTestTemplateTitle] = useState("");
  const [newTestForTemplateTitle, setNewTestForTemplateTitle] = useState("");
  const [openTestDialog, setOpenTestDialog] = useState(false);
  const [openTestForDialog, setOpenTestForDialog] = useState(false);
  const [selectedTestTemplate, setSelectedTestTemplate] = useState("");
  const [selectedTestForTemplate, setSelectedTestForTemplate] = useState("");
  const [testTemplateName, setTestTemplateName] = useState("");

  const handleTestInputChange = (event, value) => {
    if (value) dispatch(getTestThunk({ query: value, limit: 20 }));
  };

  const handleTestTemplateSelect = (e) => {
    const selected = testTemplates.find((template) => template.name === e);
    if (selected) {
      setTestPrescribed(selected.testPrescribed || []);
      setTestTemplateName(e);
    }
    setSelectedTestTemplate(e);
  };

  const handleTestForTemplateSelect = (e) => {
    const selected = testTemplates.find((template) => template.name === e);
    if (selected) {
      setTestPrescribedFor((prev) => ({ ...prev, test: selected.testPrescribed }));
    }
    setSelectedTestForTemplate(e);
  };

  const handleAddTestTemplate = () => {
    if (!newTestTemplateTitle) return;
    const newTemplate = { name: newTestTemplateTitle, testPrescribed };
    dispatch(addTestTemplate(newTemplate))
      .unwrap()
      .then(() => dispatch(getTestTemplatesList()));
    setNewTestTemplateTitle("");
    setOpenTestDialog(false);
  };

  const handleAddTestForTemplate = () => {
    if (!newTestForTemplateTitle) return;
    const newTemplateFor = { name: newTestForTemplateTitle, testPrescribed: testPrescribedFor?.test };
    dispatch(addTestTemplate(newTemplateFor))
      .unwrap()
      .then(() => dispatch(getTestTemplatesList()));
    setNewTestTemplateTitle("");
    setOpenTestForDialog(false);
  };

  const handleDeleteTestTemplate = (templateName) => {
    if (!templateName) return;
    dispatch(deleteTestTemplate(templateName))
      .unwrap()
      .then(() => {
        setTestTemplateName("");
        handleTestTemplateSelect("");
        dispatch(getTestTemplatesList());
      });
  };
const handleOpenTestForDialog = () => {
  setOpenTestForDialog(true);
    };
      const handleOpenTestDialog = () => {
        setOpenTestDialog(true);
      };
  const toggleTestForRelative = () => setShowTestForRelative((prev) => !prev);

  return (
    <div className="p-2 col-span-1 flex flex-col gap-4  w-full bg-white border border-gray-300 rounded-lg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div
          className={`p-4 border border-gray-300 rounded-lg shadow-sm ${
            showTestForRelative ? "col-span-1" : "col-span-2"
          }`}
        >
          <div className="mb-4  border-b-2 border-blue-500">
            {" "}
            <Typography
              variant="h4"
              className="font-semibold text-gray-800 mb-4"
            >
              Test
            </Typography>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  onClick={() => {
                    setTestPrescribed([]);
                    setSelectedTestTemplate("");
                  }}
                >
                  Reset
                </button>
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  onClick={handleOpenTestDialog}
                >
                  <FaRegSave />
                  Save Tests as Template
                </button>
                <button
                  className="flex items-center gap-2 text-blue-500 hover:text-blue-700 transition"
                  onClick={toggleTestForRelative}
                >
                  {showTestForRelative
                    ? "Hide Test For Relative"
                    : "Show Test For Relative"}
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex justify-between">
                <div className=" text-md flex gap-3 text-gray-800 font-semibold">
                  Selected Template: {selectedTestTemplate}
                  {selectedTestTemplate && (
                    <button
                      className="text-red-500 hover:text-red-700 transition"
                      onClick={() => handleDeleteTestTemplate(testTemplateName)}
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              </div>

              <div className="w-48 mt-4 mb-4 ">
                {testTemplates && Array.isArray(testTemplates) && (
                  <Select
                    label="Available Test Template"
                    color="blue"
                    value={selectedTestTemplate}
                    onChange={handleTestTemplateSelect}
                    placeholder="Choose a test template"
                    menuProps={{ className: "max-h-60 overflow-y-auto" }}
                    className=" rounded-lg shadow-sm transition"
                  >
                    {testTemplates.map((template, index) => (
                      <Option key={index} value={template.name}>
                        {template.name}
                      </Option>
                    ))}
                  </Select>
                )}
              </div>
            </div>
          </div>

          {testData && testData?.length > 0 && (
            <Autocomplete
              multiple
              freeSolo
              options={testData?.map((t) => t.test) || []}
              value={testPrescribed || []}
              getOptionLabel={(option) => option || ""}
              onInputChange={handleTestInputChange}
              onChange={(event, newValue) => setTestPrescribed(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Test" placeholder="Select Test" />
              )}
              sx={{ width: "100%" }}
            />
          )}
        </div>
        {showTestForRelative && (
          <div className="p-4 col-span-1 w-full border border-gray-300 rounded-lg shadow-sm">
            <div className="mb-4  border-b-2 border-blue-500">
              {" "}
              <Typography
                variant="h4"
                className="font-semibold text-gray-800 mb-4"
              >
                Test For Relative
              </Typography>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    onClick={() => {
                      setTestPrescribedFor([]);
                      setSelectedTestForTemplate("");
                    }}
                  >
                    Reset
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    onClick={handleOpenTestForDialog}
                  >
                    <FaRegSave />
                    Save Tests as Template
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex justify-between">
                  <div className=" text-md flex gap-3 text-gray-800 font-semibold">
                    Selected Template: {selectedTestForTemplate}
                  </div>
                </div>

                <div className="w-48 mt-4 mb-4 ">
                  {testTemplates && Array.isArray(testTemplates) && (
                    <Select
                      label="Available Test Template"
                      color="blue"
                      value={selectedTestForTemplate}
                      onChange={handleTestForTemplateSelect}
                      placeholder="Choose a test template"
                      menuProps={{ className: "max-h-60 overflow-y-auto" }}
                      className="w-full rounded-lg shadow-sm transition"
                    >
                      {testTemplates.map((template, index) => (
                        <Option key={index} value={template.name}>
                          {template.name}
                        </Option>
                      ))}
                    </Select>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {testData.length > 0 && (
                <Autocomplete
                  multiple
                  freeSolo
                  options={testData.map((t) => t.test) || []}
                  getOptionLabel={(option) => option || ""}
                  value={testPrescribedFor?.test || []}
                  onInputChange={handleTestInputChange}
                  onChange={(event, newValue) =>
                    setTestPrescribedFor((prev) => ({
                      ...prev,
                      test: newValue,
                    }))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Test"
                      placeholder="Select Test"
                    />
                  )}
                  sx={{ width: "100%" }}
                />
              )}
              <Autocomplete
                freeSolo
                options={[
                  "Parent",
                  "Child",
                  "Husband",
                  "Mother",
                  "Father",
                  "Son",
                  "Daughter",
                  "Wife",
                ]}
                value={testPrescribedFor.for}
                onChange={(event, newValue) =>
                  setTestPrescribedFor((prev) => ({ ...prev, for: newValue }))
                }
                onInputChange={(event, newInputValue) =>
                  setTestPrescribedFor((prev) => ({
                    ...prev,
                    for: newInputValue,
                  }))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Relation to Patient"
                    placeholder="Enter relation (e.g., Husband, Parent, Child)"
                  />
                )}
              />
            </div>
          </div>
        )}
      </div>

      <Dialog size="xs" open={openTestDialog} handler={setOpenTestDialog}>
        <DialogHeader>Save Tests As Template</DialogHeader>
        <DialogBody>
          <TextField
            label="Test Template Title"
            fullWidth
            value={newTestTemplateTitle}
            onChange={(e) => setNewTestTemplateTitle(e.target.value)}
          />
        </DialogBody>
        <DialogFooter className=" gap-3">
          <Button
            color="gray"
            onClick={() => setOpenTestDialog(false)}
            ripple={true}
          >
            Cancel
          </Button>
          <Button color="blue" onClick={handleAddTestTemplate} ripple={true}>
            Save Template
          </Button>
        </DialogFooter>
      </Dialog>
      <Dialog size="xs" open={openTestForDialog} handler={setOpenTestForDialog}>
        <DialogHeader>Save Tests As Template</DialogHeader>
        <DialogBody>
          <TextField
            label="Test Template Title"
            fullWidth
            value={newTestForTemplateTitle}
            onChange={(e) => setNewTestForTemplateTitle(e.target.value)}
          />
        </DialogBody>
        <DialogFooter className=" gap-3">
          <Button
            color="gray"
            onClick={() => setOpenTestForDialog(false)}
            ripple={true}
          >
            Cancel
          </Button>
          <Button color="blue" onClick={handleAddTestForTemplate} ripple={true}>
            Save Template
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
