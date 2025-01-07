import {
  addComplaintsTemplate,
  deleteComplaintsTemplate,
  getComplaintsTemplatesList,
  getComplaintsThunk,
} from "@/redux/thunk/appointments";
import { Autocomplete, TextField } from "@mui/material";
import { Delete } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Option,
  Select,
} from "@material-tailwind/react";
import { FaRegSave, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const ComplaintTable = ({ selectedComplaints, setSelectedComplaints }) => {

  // const [errorMessages, setErrorMessages] = useState({
  //   complaint: "",
  //   duration: "",
  // });
  const [templateName, setTemplateName] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const timeoutRef = useRef(null);
  // const units = ["Days", "Weeks", "Months", "Years"];

  useEffect(() => {
    dispatch(getComplaintsThunk({ query: "", limit: 20 }));
    dispatch(getComplaintsTemplatesList());
  }, [dispatch]);

  const complaintsData = useSelector(
    (state) => state.AppointmentSlice?.complaintsData?.result,
  );
  const templates = useSelector(
    (state) => state.AppointmentSlice?.complaintTemplates?.result,
  );

  const resetOptions = () => {
    dispatch(getComplaintsThunk({ query: "", limit: 20 }));
  };
  const handleSearchQueryChange = useCallback(
    (query) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        dispatch(getComplaintsThunk({ query, limit: 20 }));
      }, 500);
    },
    [dispatch],
  );


 

  const handleRemoveComplaint = (index) => {
    const updatedComplaint = selectedComplaints.filter((_, i) => i !== index);
    setSelectedComplaints(updatedComplaint);
  };

  const handleDurationChange = (index, value, unit) => {
    const updated = [...selectedComplaints];

    updated[index] = {
      ...updated[index],
      [unit]: value,
    };

    setSelectedComplaints(updated);
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
    if (selectedComplaints.length === 0) {
      toast.error("No Complaints to save in the template");
      return;
    }
    const newTemplate = {
      name: templateName,
      complaints: [...selectedComplaints],
    };
    dispatch(addComplaintsTemplate(newTemplate))
      .unwrap()
      .then(() => {
        dispatch(getComplaintsTemplatesList());
      });
    handleCloseDialog();
  };
  const handleTemplateSelect = (value) => {
    const selected = templates.find((template) => template.name === value);
    if (selected) {
      setTemplateName(value);
      setSelectedComplaints([
        ...selected.complaints,
        {
          complaint: "",
          durationValue: "",
          durationUnit: "",
          date: "",
          isCustom: true,
        },
      ]);
      setSelectedTemplate(value);
    }
    setSelectedTemplate(selected?.name || "");
    setTemplateName(selected?.name || "");
  };

  const handleComplaintsDeleteTemplate = (templateName) => {
    if (!templateName) {
      toast.error("Please select a template");
      return;
    }

    dispatch(deleteComplaintsTemplate(templateName))
      .unwrap()
      .then(() => {
        toast.success("Template deleted successfully");
        dispatch(getComplaintsTemplatesList());
        setTemplateName("");
        setSelectedTemplate(null)
      });
  }

  return (
    <div className="overflow-x-auto w-full">
      <div className="mb-4 p-4 border-b-2 border-blue-500 gap-6 ip:gap-4 sm:gap-0 grid grid-cols-1 sm:flex sm:justify-between sm:items-center">
        <h4 className="text-lg font-bold text-blue-900">Complaints</h4>

        <div className="mt-1 flex items-center gap-3 text-md text-gray-800 font-semibold">
          Selected Template: {selectedTemplate}
          {selectedTemplate && (
            <button
              className="text-red-300"
              onClick={() => handleComplaintsDeleteTemplate(templateName)}
            >
              <FaTrash />
            </button>
          )}
        </div>

        <div className="sm:flex sm:justify-start sm:items-center gap-4 grid grid-cols-1">
          <div className="flex gap-2 w-1/8">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              onClick={() => {
                setSelectedComplaints([
                  {
                    complaint: "",
                    durationValue: "",
                    durationUnit: "",
                    date: "",
                    isCustom: true,
                  },
                ]);
                setSelectedTemplate("");
              }}
            >
              Reset
            </button>
            <button
              color="blue"
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              onClick={handleOpenDialog}
            >
              <FaRegSave />
              Save as Template
            </button>
          </div>

          <div className="">
            {templates && Array.isArray(templates) && (
              <Select
                label="Available Template"
                color="blue"
                value={selectedTemplate}
                className="min-w-[200px]"
                onChange={(e) => handleTemplateSelect(e)}
                placeholder="Choose a template"
                menuProps={{
                  className: "max-h-60 overflow-y-auto",
                }}
              >
                {templates?.map((template, index) => (
                  <Option key={index} value={template.name}>
                    {template.name}
                  </Option>
                ))}
              </Select>
            )}
          </div>
        </div>
      </div>
    
      <table className="table-auto w-full shadow-md border border-gray-300">
        <thead className="bg-gray-100 text-black">
          <tr>
            <th className="px-2 py-2 w-1/5 border-b border-gray-300 text-center">
              Complaints
            </th>
            <th className="px-2 py-2 w-1/4 border-b border-gray-300 text-center">
              Duration
            </th>
            <th className="px-2 py-2 w-1/12 border-b border-gray-300 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white text-sm">
          {selectedComplaints.map((complaintItem, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 border-b border-gray-200"
            >
              <td className="border-r px-1 py-1">
                <Autocomplete
                  clearOnEscape
                  freeSolo
                  size="small"
                  options={complaintsData?.map((comp) => ({
                    name: comp?.complaint,
                  }))}
                  getOptionLabel={(option) => option?.name || ""}
                  inputValue={complaintItem.complaint}
                  onInputChange={(event, newInputValue) => {
                    const updatedDiagnosis = [...selectedComplaints];
                    updatedDiagnosis[index] = {
                      ...updatedDiagnosis[index],
                      complaint: newInputValue,
                    };
                    setSelectedComplaints(updatedDiagnosis);
                    handleSearchQueryChange(newInputValue);
                  }}
                  onChange={(event, newValue) => {
                    const isCustomValue =
                      newValue &&
                      !complaintsData.some(
                        (comp) => comp.complaint === newValue.name,
                      );
                    
                    const updatedDiagnosis = [...selectedComplaints];
                    updatedDiagnosis[index] = {
                      ...updatedDiagnosis[index],
                      complaint: newValue ? newValue.name : "",
                      isCustom: isCustomValue,
                    };
                    setSelectedComplaints(updatedDiagnosis);
                    resetOptions();
                  }}
                  onFocus={() => {
                    if (index === selectedComplaints.length - 1) {
                      const newDiagnosis = {
                        complaint: "",
                        days: "",
                        weeks: "",
                        months: "",
                        years: "",
                        isCustom: true,
                      };
                      setSelectedComplaints([
                        ...selectedComplaints,
                        newDiagnosis,
                      ]);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      className="w-full text-sm"
                    />
                  )}
                />
                {/* {errorMessages.complaint && (
                  <p className="text-red-500">{errorMessages.complaint}</p>
                )} */}
              </td>

              <td className="border-r px-1 py-1">
                <div className="relative flex items-center">
                  <div className="relative border-2 border-gray-400 rounded-md px-2 py-1 w-full focus-within:border-blue-700 mt-2 mb-1 ip:mt-2 ip:mb-1 sm:mt-0 sm:mb-0">
                    <label className="absolute -top-2 left-3 bg-white px-1 text-blue-700 text-xs">
                      Years - Months - Weeks - Days
                    </label>
                    <div className="flex items-center">
                      <input
                        type="text"
                        placeholder="years"
                        className="p-1 w-1/3 text-center text-gray-700 focus:outline-none focus:ring-0 appearance-none"
                        style={{ MozAppearance: "textfield" }}
                        value={complaintItem?.years || ""}
                        onChange={(e) => {
                          handleDurationChange(index, e.target.value, "years");
                        }}
                      />
                      <span className="px-1 text-gray-600">-</span>
                      <input
                        type="text"
                        placeholder="months"
                        className="p-1 w-1/3 text-center text-gray-700 focus:outline-none focus:ring-0 appearance-none"
                        style={{ MozAppearance: "textfield" }}
                        value={complaintItem?.months || ""}
                        onChange={(e) => {
                          handleDurationChange(index, e.target.value, "months");
                        }}
                      />
                      <span className="px-1 text-gray-600">-</span>
                      <input
                        type="text"
                        placeholder="weeks"
                        className="p-1 w-1/3 text-center text-gray-700 focus:outline-none focus:ring-0 appearance-none"
                        style={{ MozAppearance: "textfield" }}
                        value={complaintItem?.weeks || ""}
                        onChange={(e) => {
                          handleDurationChange(index, e.target.value, "weeks");
                        }}
                      />
                      <span className="px-1 text-gray-600">- </span>
                      <input
                        type="text"
                        placeholder="days"
                        className="p-1 w-1/3 text-center text-gray-700 focus:outline-none focus:ring-0 appearance-none"
                        style={{ MozAppearance: "textfield" }}
                        value={complaintItem?.days || ""}
                        onChange={(e) => {
                          handleDurationChange(index, e.target.value, "days");
                        }}
                      />
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-1 py-1 text-center">
                {index === selectedComplaints.length - 1 ? (
                  <></>
                ) : (
                  <button
                    onClick={() => handleRemoveComplaint(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Delete />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Dialog size="xs" open={openDialog} handler={handleCloseDialog}>
        <DialogHeader>Save Template</DialogHeader>
        <DialogBody divider>
          <Input
            label="Template Name"
            color="blue"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            placeholder="Enter template Name"
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
    </div>
  );
};

export default ComplaintTable;
