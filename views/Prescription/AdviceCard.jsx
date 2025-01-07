import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Option,
  Select,
} from "@material-tailwind/react";
import { Autocomplete, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FaRegSave, FaTrash } from "react-icons/fa";
import {
  addAdviceTemplate,
  deleteAdviceTemplate,
  getAdviceTemplatesList,
  getAdviceThunk,
} from "@/redux/thunk/appointments";

function AdviceCard({ selectedAdvice, setSelectedAdvice }) {
  const [newAdviceTemplateTitle, setNewAdviceTemplateTitle] = useState("");
  const [openAdviceDialog, setOpenAdviceDialog] = useState(false);
  const [selectedAdviceTemplate, setSelectedAdviceTemplate] = useState("");
  const [adviceTemplateName, setAdviceTemplateName] = useState("");

  const dispatch = useDispatch();
  const adviceTemplates = useSelector(
    (state) => state.AppointmentSlice?.adviceTemplates?.result,
  );
  const adviceData = useSelector(
    (state) => state.AppointmentSlice?.adviceData?.result,
  );

  const handleInputChange = (event, value) => {
    if (value) dispatch(getAdviceThunk({ query: value, limit: 20 }));
  };

  const handleAdviceTemplateSelect = (e) => {
    const selected = adviceTemplates.find((template) => template.name === e);
    if (selected) {
      setSelectedAdvice(selected.advices || []);
      setAdviceTemplateName(e);
    }
    setSelectedAdviceTemplate(e);
  };

  const handleDeleteAdviceTemplate = (templateName) => {
    if (!templateName) return;
    dispatch(deleteAdviceTemplate(templateName))
      .unwrap()
      .then(() =>
        dispatch(getAdviceTemplatesList()).then(() => {
          setAdviceTemplateName("");
          handleAdviceTemplateSelect("");
        }),
      );
  };

  const handleAddAdviceTemplate = () => {
    if (!newAdviceTemplateTitle) return;
    const newTemplate = {
      name: newAdviceTemplateTitle,
      advices: selectedAdvice,
    };
    dispatch(addAdviceTemplate(newTemplate))
      .unwrap()
      .then(() => dispatch(getAdviceTemplatesList()));
    setNewAdviceTemplateTitle("");
    setOpenAdviceDialog(false);
  };

  return (
    <div className="p-2 col-span-1 flex flex-col gap-4  w-full border border-gray-300 rounded-lg overflow-x-auto overflow-hidden">
      <div className="p-4  w-full border border-gray-300 rounded-lg">
        <div className="mb-4 sm:p-4 border-b-2 border-blue-500 gap-2 ip:gap-1 sm:gap-0 grid grid-cols-1 sm:flex sm:justify-between sm:items-center">
          <h4 className="text-lg font-bold text-blue-900">Advice</h4>

          <div className="mt-1 flex items-center gap-3 text-md text-gray-800 font-semibold">
            Selected Template: {selectedAdviceTemplate}
            {selectedAdviceTemplate && (
              <button
                className="text-red-300"
                onClick={() => handleDeleteAdviceTemplate(adviceTemplateName)}
              >
                <FaTrash />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:flex sm:justify-between sm:items-center gap-4">
            <div className="flex gap-2 w-1/8">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                onClick={() => {
                  setSelectedAdvice([]);
                  setSelectedAdviceTemplate("");
                }}
              >
                Reset
              </button>
              <button
                color="blue"
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                onClick={() => setOpenAdviceDialog(true)}
              >
                <FaRegSave />
                Save as Template
              </button>
            </div>

            <div className="">
              {adviceTemplates && Array.isArray(adviceTemplates) && (
                <Select
                  label="Available Test Template"
                  color="blue"
                  className="min-w-[200px]"
                  value={selectedAdviceTemplate}
                  onChange={handleAdviceTemplateSelect}
                  placeholder="Choose a test template"
                  menuProps={{ className: "max-h-60 overflow-y-auto" }}
                >
                  {adviceTemplates.map((template, index) => (
                    <Option key={index} value={template.name}>
                      {template.name}
                    </Option>
                  ))}
                </Select>
              )}
            </div>
          </div>
        </div>
        {adviceData && (
          <div className="mt-4">
            <Autocomplete
              multiple
              freeSolo
              options={adviceData.map((adv) => adv.advice)}
              value={selectedAdvice}
              onInputChange={handleInputChange}
              onChange={(event, newValue) => setSelectedAdvice(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Advice"
                  className="w-full  bg-white border border-gray-300 rounded-lg shadow-sm"
                />
              )}
            />
          </div>
        )}

        <Dialog size="xs" open={openAdviceDialog} handler={setOpenAdviceDialog}>
          <DialogHeader>Save Advice As Template</DialogHeader>
          <DialogBody>
            <TextField
              label="Advice Template Title"
              fullWidth
              value={newAdviceTemplateTitle}
              onChange={(e) => setNewAdviceTemplateTitle(e.target.value)}
            />
          </DialogBody>
          <DialogFooter>
            <Button color="gray" onClick={() => setOpenAdviceDialog(false)}>
              Cancel
            </Button>
            <Button color="blue" onClick={handleAddAdviceTemplate}>
              Save Template
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </div>
  );
}

export default AdviceCard;
