import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  Button,
  Input,
  Select,
  Option,
  DialogFooter,
  DialogHeader,
  DialogBody,
  Dialog,
} from "@material-tailwind/react";
import {
  Autocomplete,
  debounce,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addMedicinesTemplate,
  deleteMedicinesTemplate,
  getMedicinesTemplatesList,
  getMedicineThunk,
} from "@/redux/thunk/appointments";
import { Delete } from "lucide-react";
import { toast } from "react-toastify";
import { FaRegSave, FaTrash } from "react-icons/fa";

const MedicineTable = ({ medicineArr, setMedicineArr }) => {
  const [errors, setErrors] = useState({});
  const [templateName, setTemplateName] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [recentlySelected, setRecentlySelected] = useState([]);
  const [localPeriods, setLocalPeriods] = useState([]);
  const [notesData, setNotesData] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    const storedPeriods =
      JSON.parse(localStorage.getItem("customPeriods")) || [];
    setLocalPeriods(storedPeriods);

    const storedNotesData = JSON.parse(localStorage.getItem("notesData")) || [];
    setNotesData(storedNotesData);
  }, []);
  useEffect(() => {
    dispatch(getMedicineThunk({ query: "", limit: 10 }));
    dispatch(getMedicinesTemplatesList());
  }, [dispatch]);
  const resetOptions = () => {
    dispatch(getMedicineThunk({ query: "", limit: 10 }));
  };
  const medicineData = useSelector(
    (state) => state.AppointmentSlice?.medicineData,
  );

  const periodData = useSelector(
    (state) => state.AppointmentSlice?.periodData?.data || [],
  );


  const frequencyData = useSelector(
    (state) => state.AppointmentSlice?.frequencyData?.data,
  );

  const remarkData = useSelector(
    (state) => state.AppointmentSlice?.timingData?.data,
  );

  const templates = useSelector(
    (state) => state.AppointmentSlice?.medicineTemplates?.result,
  );

  const timeoutRef = useRef(null);
  const handleSearchQueryChange = useCallback(
    (query) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        dispatch(getMedicineThunk({ query, limit: 10 }));
      }, 500);
    },
    [dispatch],
  );
  const dosageOptions = [
    { value: "1-0-0", label: "1-0-0" },
    { value: "0-1-0", label: "0-1-0" },
    { value: "0-0-1", label: "0-0-1" },
    { value: "1-1-0", label: "1-1-0" },
    { value: "1-0-1", label: "1-0-1" },
    { value: "0-1-1", label: "0-1-1" },
    { value: "1-1-1", label: "1-1-1" },
    { value: "1", label: "1" },
  ];
  const handleDebouncedInputChange = useCallback(
    debounce((index, field, value) => {
      setMedicineArr((prev) => {
        const newArr = [...prev];
        newArr[index] = { ...newArr[index], [field]: value };
        return newArr;
      });
    }, 500),
    [],
  );


  const handleSelectFrequency = (index, newValue) => {
    const updatedMedicine = {
      ...medicineArr[index],
      frequency: newValue?.remark || "",
    };

    setMedicineArr((prev) => {
      const newArr = [...prev];
      newArr[index] = updatedMedicine;
      return newArr;
    });

    // Update recently selected items
    if (newValue?.remark && !recentlySelected.includes(newValue.remark)) {
      setRecentlySelected((prev) => [newValue.remark, ...prev].slice(0, 5)); // limit recent items
    }
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

    if (medicineArr.length === 0) {
      toast.error("No medicines to save in the template");
      return;
    }
    const newTemplate = {
      name: templateName,
      medicines: [...medicineArr],
    };
    dispatch(addMedicinesTemplate(newTemplate))
      .unwrap()
      .then(() => {
        toast.success("Template saved successfully");
        dispatch(getMedicinesTemplatesList());
      });
    handleCloseDialog();
  };

  const handleTemplateSelect = (value) => {
    const selected = templates?.find((template) => template.name === value);
    if (selected) {
      setTemplateName(value);
      setMedicineArr(selected.medicines);
      setSelectedTemplate(value);
    }
    setTemplateName(selected?.name || "")
    setSelectedTemplate(selected?.name || null);
  };

  useEffect(() => {
    const lastRow = medicineArr[medicineArr.length - 1];
    if (
      lastRow &&
      (lastRow.name ||
        lastRow.dosage ||
        lastRow.remarks ||
        lastRow.frequency ||
        lastRow.period ||
        lastRow.notes)
    ) {
      setMedicineArr((prev) => [
        ...prev,
        {
          name: "",
          dosage: "",
          genericName: "",
          isCustom: true,
          remarks: "",
          frequency: "",
          period: "",
          notes: "",
        },
      ]);
    }
    if (medicineArr.length === 0) {
      setMedicineArr([
        {
          name: "",
          dosage: "",
          genericName: "",
          isCustom: true,
          remarks: "",
          frequency: "",
          period: "",
          notes: "",
        },
      ]);
    }
  }, [medicineArr, setMedicineArr]);

  const handleMedicineDeleteTemplate = (tempName) => {
    if (tempName) {
      dispatch(deleteMedicinesTemplate(tempName))
        .unwrap()
        .then(() => {
          toast.success("Template deleted successfully");
          dispatch(getMedicinesTemplatesList()).then(() => {
            setSelectedTemplate(null);
          });
        })
    }
  }
  const updateNotesData = (newNotes) => {
    setNotesData((prev) => {
      const updatedCustomNotes = [...prev, newNotes];
      localStorage.setItem("customNotes", JSON.stringify(updatedCustomNotes));
      return updatedCustomNotes;
    });
  };
  const updatePeriodData = (newPeriod) => {
    const updatedCustomPeriods = [...localPeriods, newPeriod];

    // Save custom periods to localStorage
    localStorage.setItem("customPeriods", JSON.stringify(updatedCustomPeriods));

    setLocalPeriods(updatedCustomPeriods);
  };

  const mergedPeriods = [...localPeriods, ...periodData];
  const sortedPeriods = mergedPeriods.reduce((acc, period) => {
    if (acc.some(p => p.remark === period.remark)) {
      return acc;
    }
    acc.push(period);
    return acc;
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="w-full overflow-x-auto border rounded-lg shadow-md bg-white">
        <div className="mb-4 p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center border-b-2 border-blue-500 gap-6 ip:gap-4 sm:gap-0">
          <h4 className="text-lg font-bold text-blue-900">Medicines</h4>
          <div className="mt-1 flex items-center gap-3 text-md text-gray-800 font-semibold">
            Selected Template: {selectedTemplate}
            {selectedTemplate && (
              <button
                className="text-red-500"
                onClick={() => handleMedicineDeleteTemplate(templateName)}
              >
                <FaTrash />
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-start sm:items-center gap-4">
            <div className="flex gap-2 w-1/8">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                onClick={() => {
                  setMedicineArr([
                    {
                      name: "",
                      dosage: "",
                      genericName: "",
                      isCustom: true,
                      remarks: "",
                      frequency: "",
                      period: "",
                      notes: "",
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
                Save Rx group
              </button>
            </div>

            <div className="">
              {templates && (
                <Select
                  label="Rx Templates "
                  color="blue"
                  value={selectedTemplate}
                  className="min-w-[200px]"
                  onChange={(e) => handleTemplateSelect(e)}
                  placeholder="Choose a template"
                >
                  {templates.map((template, index) => (
                    <Option key={index} value={template.name}>
                      {template.name}
                    </Option>
                  ))}
                </Select>
              )}
            </div>
          </div>
        </div>

        <table className="min-w-full shadow-md rounded-lg border border-gray-300 text-sm">
          <thead className="bg-gray-200 text-black">
            <tr>
              {[
                { label: "Medicine", width: "w-48" },
                { label: "Dose", width: "w-32" },
                { label: "Timing", width: "w-32" },
                { label: "Frequency", width: "w-32" },
                { label: "Duration", width: "w-32" },
                { label: "Notes / Instructions", width: "w-48" },
                { label: "Actions", width: "w-6" },
              ].map((header) => (
                <th key={header.label} className={`p-2 border-b ${header.width}`}>
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {medicineArr.map((medicine, index) => (

              <tr key={index} className="text-black align-top">
                {/* Medicine Name */}
                <td className="border p-2">
                  {medicineData && (
                    <>
                      <Autocomplete
                        clearOnEscape
                        freeSolo
                        size="small"
                        value={medicine || null}
                        options={medicineData.medicines.map((med) => ({
                          name: med.name,
                          shortComposition1: med.shortComposition1,
                          shortComposition2: med.shortComposition2,
                        }))}
                        onFocus={() => {
                          // If focusing on the last row, add a new empty row
                          if (index === medicineArr.length - 1) {
                            setMedicineArr((prev) => [
                              ...prev,
                              {
                                name: "",
                                dosage: "",
                                genericName: "",
                                isCustom: true,

                                remarks: "",
                                frequency: "",
                                period: "",
                                notes: "",
                              },
                            ]);
                          }
                        }}
                        getOptionLabel={(option) => option?.name || ""}
                        onInputChange={(event, newValue) => {
                          handleDebouncedInputChange(index, "name", newValue);
                          handleSearchQueryChange(newValue);
                        }}
                        onChange={(event, newValue) => {
                          // Check if the selected medicine is custom (not in medicineData)
                          const isCustomValue =
                            newValue &&
                            !medicineData.medicines.some(
                              (med) => med.name === newValue.name,
                            );

                          // Compose the generic name if shortComposition1 and/or shortComposition2 are provided
                          const compositions = [
                            newValue?.shortComposition1 || "",
                            newValue?.shortComposition2 || "",
                          ]
                            .filter(Boolean)
                            .join(", ");

                          // Update the selected medicine with isCustom flag
                          const updatedMedicine = {
                            ...medicine,
                            name: newValue?.name || "",
                            genericName: compositions,
                            isCustom: isCustomValue,
                          };

                          // Update medicineArr with the new entry
                          setMedicineArr((prev) => {
                            const newArr = [...prev];
                            newArr[index] = updatedMedicine;
                            return newArr;
                          });
                          resetOptions();
                        }}
                        renderInput={(params) => (
                          <TextField {...params} label="Medicine Name" />
                        )}
                      />
                      <input
                        name="description"
                        type="text"
                        value={medicine.genericName || ""}
                        onChange={(event) => {
                          const updatedMedicine = {
                            ...medicine,
                            genericName: event.target.value,
                          };
                          setMedicineArr((prev) => {
                            const newArr = [...prev];
                            newArr[index] = updatedMedicine;
                            return newArr;
                          });
                        }}
                        placeholder="Item Desc"
                        className="mt-1 px-3 py-1 italic text-sm w-full border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        required
                      />
                    </>
                  )}
                </td>

                {/* Dosage */}
                <td className="border p-2">
                  <Autocomplete
                    clearOnEscape
                    freeSolo
                    size="small"
                    value={
                      dosageOptions?.find(
                        (opt) => opt.value === medicine.dosage,
                      ) || {
                        value: medicine.dosage,
                      }
                    }
                    options={dosageOptions}
                    onInputChange={(event, newValue) =>
                      handleDebouncedInputChange(index, "dosage", newValue)
                    }
                    onChange={(event, newValue) => {
                      const updatedMedicine = {
                        ...medicine,
                        dosage: newValue?.value || newValue || "",
                      };
                      setMedicineArr((prev) => {
                        const newArr = [...prev];
                        newArr[index] = updatedMedicine;
                        return newArr;
                      });
                    }}
                    getOptionLabel={(option) => option.value}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Dosage"
                        error={!!errors.dosage}
                        helperText={errors.dosage}
                      />
                    )}
                  />
                  <div className="mt-1 text-sm text-gray-600 line-clamp-2">
                    {medicine.dosage}
                  </div>
                </td>

                {/* Remarks */}
                <td className="border p-2">
                  <Autocomplete
                    clearOnEscape
                    freeSolo
                    size="small"
                    value={
                      remarkData?.find(
                        (opt) => opt.remark === medicine.remarks,
                      ) || {
                        remark: medicine.remarks,
                      }
                    }
                    options={remarkData}
                    onInputChange={(event, newValue) =>
                      handleDebouncedInputChange(index, "remarks", newValue)
                    }
                    onChange={(event, newValue) => {
                      const updatedMedicine = {
                        ...medicine,
                        remarks: newValue?.remark || "",
                      };
                      setMedicineArr((prev) => {
                        const newArr = [...prev];
                        newArr[index] = updatedMedicine;
                        return newArr;
                      });
                    }}
                    getOptionLabel={(option) => option.remark}
                    renderInput={(params) => (
                      <TextField {...params} label="Remarks" />
                    )}
                  />
                  <div className="mt-1 text-sm text-gray-600 line-clamp-2">
                    {medicine.remarks}
                  </div>
                </td>

                {/* Frequency */}
                <td className="border p-2">
                  <Autocomplete
                    clearOnEscape
                    freeSolo
                    size="small"
                    value={
                      frequencyData?.find(
                        (opt) => opt.remark === medicine.frequency,
                      ) || {
                        remark: medicine.frequency,
                      }
                    }
                    options={frequencyData}
                    onInputChange={(event, newValue) =>
                      handleDebouncedInputChange(index, "frequency", newValue)
                    }
                    onChange={(event, newValue) =>
                      handleSelectFrequency(index, newValue)
                    }
                    getOptionLabel={(option) => option.remark}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Frequency"
                        error={!!errors.frequency}
                        helperText={errors.frequency}
                      />
                    )}
                  />
                  <div className="mt-1 text-sm text-gray-600 line-clamp-2">
                    {medicine.frequency}
                  </div>
                </td>

                {/* Period */}
                <td className="border p-2">
                  <Autocomplete
                    clearOnEscape
                    freeSolo
                    size="small"
                    value={
                      periodData?.find(
                        (opt) => opt.remark === medicine.period,
                      ) || {
                        remark: medicine.period,
                      }
                    }
                    options={sortedPeriods}
                    onBlur={(event, newValue) => {
                      const currentPeriod = medicine.period;
                      if (
                        currentPeriod &&
                        !periodData.some((opt) => opt.remark === currentPeriod) &&
                        !localPeriods.some((opt) => opt.remark === currentPeriod)
                      ) {
                        updatePeriodData({ remark: currentPeriod });
                      }
                    }}
                    onInputChange={(event, newValue) => {

                      handleDebouncedInputChange(index, "period", newValue);
                    }}
                    onChange={(event, newValue) => {
                      const updatedMedicine = {
                        ...medicine,
                        period: newValue?.remark || "",
                      };

                      setMedicineArr((prev) => {
                        const newArr = [...prev];
                        newArr[index] = updatedMedicine;
                        return newArr;
                      });
                    }}
                    getOptionLabel={(option) => option.remark}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Period"
                        error={!!errors.period}
                        helperText={errors.period}
                      />
                    )}
                  />
                  <div className="mt-1 text-sm text-gray-600 line-clamp-2">
                    {medicine.period}
                  </div>
                </td>

                {/* Notes */}
                <td className="border p-2">
                  <Autocomplete
                    clearOnEscape
                    freeSolo
                    size="small"
                    value={
                      notesData?.find(
                        (opt) => opt?.notes === medicine?.notes,
                      ) || {
                        notes: medicine?.notes,
                      }
                    }
                    options={notesData}
                    onInputChange={(event, newValue) =>
                      handleDebouncedInputChange(index, "notes", newValue)
                    }
                    onBlur={(event, newValue) => {
                      const currentNotes = medicine.notes;
                      if (
                        currentNotes &&
                        !notesData.some((opt) => opt.notes === currentNotes)
                      ) {
                        updateNotesData({ notes: currentNotes });
                      }
                    }}
                    onChange={(event, newValue) =>
                      setMedicineArr((prev) => {
                        const newArr = [...prev];
                        newArr[index] = { ...newArr[index], notes: newValue?.notes };
                        return newArr;
                      })
                    }
                    getOptionLabel={(option) => option.notes || ""}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Notes"
                      />
                    )}
                  />
                  {/* <Input
                  type="text"
                  color="blue"
                  placeholder="Notes"
                  value={medicine.notes || ""}
                  onChange={(e) => {
                    const updatedNotes = e.target.value;
                    setMedicineArr((prev) => {
                      const newArr = [...prev];
                      newArr[index] = { ...newArr[index], notes: updatedNotes };
                      return newArr;
                    });
                  }}
                  className="w-full border focus:outline-blue-600 rounded p-2"
                /> */}
                  <div className="mt-1 w-full text-sm text-gray-600 break-before-all line-clamp-2">
                    {medicine.notes}
                  </div>
                </td>

                {/* Delete Button */}
                <td className="border p-2 text-center">
                  {index === medicineArr.length - 1 ? (
                    <></>
                  ) : (
                    <Button
                      onClick={() => {
                        setMedicineArr((prev) =>
                          prev.filter((_, i) => i !== index),
                        );
                      }}
                      variant="text"
                      className="text-red-600 p-0"
                    >
                      <Delete />
                    </Button>
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
    </>
  );
};

export default MedicineTable
