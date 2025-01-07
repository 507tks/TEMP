import {
  addDiagnosisTemplate,
  deleteDiagnosisTemplate,
  getDiagnosisTemplatesList,
  getDiagnosisThunk,
} from "@/redux/thunk/appointments";
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
import { Autocomplete, TextField } from "@mui/material";
import { Delete } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaRegSave, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const DiagnosisTable = ({ selectedDiagnosis, setSelectedDiagnosis }) => {
  // const [selectedDiagnos, setSelectedDiagnos] = useState(null);
  // const [inputValue, setInputValue] = useState("");
  // const [diagnosis, setDiagnosis] = useState("");
  const [durationValue, setDurationValue] = useState("");
  const [durationUnit, setDurationUnit] = useState("");
  const [date, setDate] = useState("");
  const [newDiagnosisInput, setNewDiagnosisInput] = useState("");
  // const [errorMessages, setErrorMessages] = useState({
  //   diagnosis: "",
  // });
  const [templateName, setTemplateName] = useState("");
  // const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const dispatch = useDispatch();
  // const durationRefs = useRef([]);
  const timeoutRef = useRef(null);
  // const newDiagnosisRef = useRef(null);

  useEffect(() => {
    dispatch(getDiagnosisThunk({ query: "", limit: 20 }));
    dispatch(getDiagnosisTemplatesList());
  }, [dispatch]);

  const handleSearchQueryChange = useCallback(
    (query) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        dispatch(getDiagnosisThunk({ query, limit: 20 }));
      }, 500);
    },
    [dispatch],
  );
  const diagnosisData = useSelector(
    (state) => state.AppointmentSlice?.diagnosisData?.result,
  );
  const templates = useSelector(
    (state) => state.AppointmentSlice?.diagnosisTemplates?.result,
  );

  // function formatDate(dateString) {
  //   const date = new Date(dateString);
  //   const day = String(date.getDate()).padStart(2, "0");
  //   const month = String(date.getMonth() + 1).padStart(2, "0");
  //   const year = date.getFullYear();

  //   return `${day}-${month}-${year}`;
  // }
  // const units = ["Days", "Weeks", "Months", "Years"];
  const clearInputs = () => {
    // setSelectedDiagnos(null);
    // setDiagnosis("");
    setDurationValue("");
    setDurationUnit("");
    setDate("");
    // setInputValue("");
    // setErrorMessages({ diagnosis: "" });
  };
  const resetOptions = () => {
    dispatch(getDiagnosisThunk({ query: "", limit: 20 }));
  }

  // const calculatePastDate = (value, unit) => {
  //   let pastDate = dayjs();
  //   if (unit === "Days") pastDate = pastDate.subtract(Number(value), "day");
  //   else if (unit === "Weeks")
  //     pastDate = pastDate.subtract(Number(value), "week");
  //   else if (unit === "Months")
  //     pastDate = pastDate.subtract(Number(value), "month");
  //   else if (unit === "Years")
  //     pastDate = pastDate.subtract(Number(value), "year");

  //   return pastDate.format("YYYY-MM-DD");
  // };

  const handleRemoveDiagnosis = (index) => {
    const updatedDiagnosis = selectedDiagnosis.filter((_, i) => i !== index);
    setSelectedDiagnosis(updatedDiagnosis);
  };

  const handleDurationChange = (index, value, unit) => {
    const updated = [...selectedDiagnosis];

    updated[index] = {
      ...updated[index],
      [unit]: value,
    };

    setSelectedDiagnosis(updated);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTemplateName(""); // Reset the title input when closing
  };
  const handleSaveTemplate = () => {
    if (!templateName) {
      toast.error("Please enter a template title");
      return;
    }

    if (selectedDiagnosis.length === 0) {
      toast.error("No diagnosis to save in the template");
      return;
    }
    const newTemplate = {
      name: templateName,
      diagnosis: [...selectedDiagnosis],
    };
    dispatch(addDiagnosisTemplate(newTemplate))
      .unwrap()
      .then(() => {
        dispatch(getDiagnosisTemplatesList());
      });
    handleCloseDialog();
  };
  const handleTemplateSelect = (value) => {
    const selected = templates.find((template) => template.name === value);
    if (selected) {
      setSelectedDiagnosis([
        ...selected.diagnosis,
        {
          diagnosis: "",
          isCustom: true,
          durationValue: "",
          durationUnit: "",
          date: "",
        },
      ]);
      setSelectedTemplate(value);
      setTemplateName(value);
    }
    setSelectedTemplate(selected?.name || "");
    setTemplateName(selected?.name || "");
  };

  const handleDiagnosisDeleteTemplate = (templateName) => {
    dispatch(deleteDiagnosisTemplate(templateName))
      .unwrap()
      .then(() => {
        dispatch(getDiagnosisTemplatesList()).then(() => {
          toast.success("Template deleted successfully");
          setTemplateName("");
          setSelectedTemplate(null)
        })
      });
  }
  return (
    <div className="w-full overflow-x-auto border rounded-lg shadow-md bg-white">
      <div className="mb-4 p-4 border-b-2 border-blue-500 gap-6 ip:gap-4 sm:gap-0 grid grid-cols-1 sm:flex sm:justify-between sm:items-center">
        <h4 className="text-lg font-bold text-blue-900">Diagnosis</h4>

        <div className="mt-1 flex items-center gap-3 text-md text-gray-800 font-semibold">
          Selected Template: {selectedTemplate}{" "}
          {selectedTemplate && (
            <button
              className="text-red-500"
              onClick={() => handleDiagnosisDeleteTemplate(templateName)}
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
                setSelectedDiagnosis([
                  {
                    diagnosis: "",
                    durationValue: "",
                    isCustom: true,
                    durationUnit: "",
                    date: "",
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
              Diagnosis
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
          {selectedDiagnosis.map((diagnosisItem, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 border-b border-gray-200"
            >
              <td className="border-r px-1 py-1">
                <Autocomplete
                  clearOnEscape
                  freeSolo
                  size="small"
                  options={
                    diagnosisData?.map((diag) => ({ name: diag.diagnosis })) ||
                    []
                  }
                  getOptionLabel={(option) => option.name || ""}
                  inputValue={diagnosisItem.diagnosis}
                  onInputChange={(event, newInputValue) => {
                    const updatedDiagnosis = [...selectedDiagnosis];
                    updatedDiagnosis[index] = {
                      ...updatedDiagnosis[index],
                      diagnosis: newInputValue,
                    };

                    setSelectedDiagnosis(updatedDiagnosis);
                    handleSearchQueryChange(newInputValue);
                  }}
                  onFocus={() => {
                    if (index === selectedDiagnosis.length - 1) {
                      const newDiagnosis = {
                        diagnosis: newDiagnosisInput,
                        durationValue: durationValue,
                        durationUnit: durationUnit,
                        date: date,
                        isCustom: true,
                      };
                      setSelectedDiagnosis([
                        ...selectedDiagnosis,
                        newDiagnosis,
                      ]);
                      clearInputs();
                      setNewDiagnosisInput("");
                      resetOptions();
                    }
                  }}
                  onChange={(event, newValue) => {
                    const isCustomValue =
                      newValue &&
                      !diagnosisData.some(
                        (diag) => diag.diagnosis === newValue.name,
                      );
                    const updatedDiagnosis = [...selectedDiagnosis];
                    updatedDiagnosis[index] = {
                      ...updatedDiagnosis[index],
                      diagnosis: newValue ? newValue.name : "",
                      isCustom: isCustomValue,
                    };
                    setSelectedDiagnosis(updatedDiagnosis);
                    resetOptions();
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      className="w-full text-sm"
                    />
                  )}
                />
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
                        value={diagnosisItem?.years || ""}
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
                        value={diagnosisItem?.months || ""}
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
                        value={diagnosisItem?.weeks || ""}
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
                        value={diagnosisItem?.days || ""}
                        onChange={(e) => {
                          handleDurationChange(index, e.target.value, "days");
                        }}
                      />
                    </div>
                  </div>
                </div>
              </td>
              {/* <td className="border-r px-1 py-1">
                <div className="flex items-center space-x-1 justify-center">
                  <input
                    type="number"
                    placeholder="Duration"
                    min={0}
                    value={diagnosisItem.durationValue || ""}
                    onChange={(e) => {
                      handleDurationChange(
                        index,
                        e.target.value,
                        diagnosisItem.durationUnit,
                      );
                    }}
                    className="w-1/2 h-9 border border-gray-300 rounded px-2 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <select
                    value={diagnosisItem.durationUnit}
                    onChange={(e) =>
                      handleDurationChange(
                        index,
                        diagnosisItem.durationValue,
                        e.target.value,
                      )
                    }
                    className="w-1/2 h-9 border border-gray-300 rounded px-2 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    {units.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </div>
              </td> */}
              <td className="px-1 py-1 text-center">
                {index === selectedDiagnosis.length - 1 ? (
                  <></>
                ) : (
                  <button
                    onClick={() => handleRemoveDiagnosis(index)}
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

export default DiagnosisTable;
