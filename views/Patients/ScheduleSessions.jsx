import { getDoctorThunk } from "@/redux/thunk/doctor";
import {
  addPackageThunk,
  alotPackageToPatient,
  getAllPackagesThunk,
  getPatientPackages,
  updatePackageThunk,
} from "@/redux/thunk/package";
import { getPatientById } from "@/redux/thunk/patients";
import { Button, Input } from "@material-tailwind/react";
import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SessionsDetails from "./SessionsDetails";
import { FaArrowLeft } from "react-icons/fa";

function ScheduleSessions() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [editedPackage, setEditedPackage] = useState({});
  const [selectedDoctor, setselectedDoctor] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [isCustomPackage, setIsCustomPackage] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [timeSlot, setTimeSlot] = useState("");
  const [errors, setErrors] = useState({});
  const params = useParams();
  const dispatch = useDispatch();


  const handleFieldChange = (field, value) => {
    setEditedPackage((prev) => ({ ...prev, [field]: value }));
  };

  const handleDoctorChange = (event, newValue) => {
    setselectedDoctor(newValue);
  };
  useEffect(() => {
    dispatch(getPatientById(params));
    dispatch(getDoctorThunk({ searchTerm: "" }));
    dispatch(
      getAllPackagesThunk({
        limit: 25,
        page: 1,
      }),
    );
  }, [params,dispatch]);
  const packageData = useSelector(
    (state) => state?.packageSlice?.packages?.packages || [],
  );
  const patientData = useSelector((state) => state?.PatientSlice?.patientData);
  const { doctorList: doctors } = useSelector((state) => state.DoctorSlice);
  const validateForm = () => {
    const newErrors = {};

    if (!patientData.name.trim()) {
      newErrors.name = "Patient name is required.";
    }
    if (!selectedPackage) {
      newErrors.package = "Please select a package.";
    }
    if (!selectedDoctor) {
      newErrors.doctor = "Please assign a doctor.";
    }
    if (!startDate) {
      newErrors.startDate = "Start date is required.";
    }
    if (!timeSlot) {
      newErrors.timeSlot = "Time slot is required.";
    }
      if (!editedPackage.totalSessions) {
        newErrors.totalSessions = "Total Sessions is required.";
      }
  if (!editedPackage.services) {
    newErrors.services = "Services is required.";
  }
      if (!editedPackage.interval) {
        newErrors.interval = "Interval is required.";
      }
     if (!editedPackage.price) {
       newErrors.price = "Price is required.";
     }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
      setLoading(true); 
    if (validateForm()) {
      const formData = {
        patientId: params.patientId,
        givenDoctorId: selectedDoctor?._id,
        packageId: selectedPackage?._id || null,
        startDate: startDate,
        time: timeSlot,
        packageName: editedPackage.name,
        totalSessions: editedPackage.totalSessions,
        services: editedPackage.services,
        totalPrice: editedPackage.price,
        interval: editedPackage.interval,
      };
      dispatch(alotPackageToPatient(formData))
        .unwrap()
        .then(() => {
          dispatch(
            getPatientPackages({
              patientId: params.patientId,
              limit: 25,
              page: 1,
            }),
          );
        })
        .catch((error) => {
           setLoading(false);
          console.error("Error allotting package:", error);
        });
    } else {
       setLoading(false);
      console.log("Validation errors:", errors);
    }
  };
  const handleUpdatePackage = () => {
    dispatch(
      updatePackageThunk({ data: editedPackage, id: selectedPackage?._id }),
    )
      .unwrap()
      .then(() => {
        dispatch(getAllPackagesThunk({ limit: 25, page: 1 }));
      })
      .catch((error) => {
        console.error("Error updating package:", error);
      });
  };
 

  return (
    <>
      <div className="flex items-center justify-between px-6 py-4 bg-white">
        <button
          onClick={() => window.history.back()}
          className="text-gray-600 text-2xl"
        >
          <FaArrowLeft />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Packages</h1>
        <div></div>
      </div>
      <div className="bg-gray-100 p-2">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg">
            <div className="bg-blue-500 text-white py-3 px-4 rounded-t-lg">
              <h2 className="text-lg text-center font-semibold">
                SCHEDULE YOUR SESSION
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Patient Name
                </label>
                <Input
                  type="text"
                  value={patientData?.name || ""}
                  label="Patient Name"
                  color="blue"
                  placeholder="Enter Patient Name"
                  className="w-full"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Assigned Doctor
                </label>
                <Autocomplete
                  options={doctors}
                  size="small"
                  getOptionLabel={(option) => option.name}
                  onChange={handleDoctorChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Doctor"
                      variant="outlined"
                      error={!!errors.doctor}
                      helperText={errors.doctor}
                    />
                  )}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Select Start Date
                </label>
                <Input
                  type="date"
                  label="Start Date"
                  color="blue"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full"
                />
                {errors.startDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.startDate}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Select Timing
                </label>
                <Input
                  type="time"
                  label="Time"
                  color="blue"
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full"
                />
                {errors.timeSlot && (
                  <p className="text-red-500 text-sm mt-1">{errors.timeSlot}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Select Package
                </label>
                <Autocomplete
                  options={packageData}
                  getOptionLabel={(option) => option.name || ""}
                  freeSolo
                  size="small"
                  value={selectedPackage}
                  onChange={(event, newValue) => {
                    setSelectedPackage(newValue);
                    if (newValue && typeof newValue === "object") {
                      setIsCustomPackage(false);
                      handleFieldChange("name", newValue.name);
                      setEditedPackage({
                        services: newValue.services || [],
                        totalSessions: newValue.totalSessions || "",
                        price: newValue.price || "",
                        interval: newValue.interval || "",
                      });
                    } else {
                      setIsCustomPackage(true);
                      setEditedPackage({});

                      handleFieldChange("name", newValue);
                    }
                  }}
                  onInputChange={(event, newValue) => {
                    setSelectedPackage({ name: newValue });
                    handleFieldChange("name", newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Package Name"
                      variant="outlined"
                      error={!!errors.package}
                      helperText={errors.package}
                      onBlur={() => {
                        if (
                          selectedPackage &&
                          typeof selectedPackage === "object"
                        ) {
                          handleFieldChange("name", selectedPackage.name);
                        } else if (selectedPackage) {
                          handleFieldChange("name", selectedPackage);
                        }
                      }}
                    />
                  )}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Total Sessions
                </label>
                <Input
                  label="Total Sessions"
                  type="number"
                  value={editedPackage.totalSessions || ""}
                  onChange={(e) =>
                    handleFieldChange("totalSessions", e.target.value)
                  }
                  className="w-full"
                />
                {errors.totalSessions && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.totalSessions}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Interval
                </label>
                <Input
                  label="Interval"
                  type="number"
                  value={editedPackage.interval || ""}
                  onChange={(e) =>
                    handleFieldChange("interval", e.target.value)
                  }
                  className="w-full"
                />
                {errors.interval && (
                  <p className="text-red-500 text-sm mt-1">{errors.interval}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Pricing
                </label>
                <Input
                  label="Pricing"
                  type="number"
                  value={editedPackage.price || ""}
                  onChange={(e) => handleFieldChange("price", e.target.value)}
                  className="w-full"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                )}
              </div>

              <div className="col-span-1 md:col-span-2 lg:col-span-2">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Services Offered
                </label>
                <Autocomplete
                  multiple
                  freeSolo
                  size="small"
                  options={packageData.map((pkg) => pkg.services || []).flat()}
                  value={editedPackage.services || []}
                  onChange={(event, newValue) =>
                    handleFieldChange("services", newValue)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Services Offered"
                      variant="outlined"
                      error={!!errors.services}
                      helperText={errors.services}
                    />
                  )}
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex justify-center gap-4 py-2 ">
              <Button
                variant="filled"
                color="blue"
                disabled={loading}
                onClick={handleSubmit}
                className="w-32 p-0 h-10"
              >
                {loading ? "Scheduling..." : "Schedule"}
              </Button>
              {!isCustomPackage && (
                <Button
                  variant="filled"
                  color="green"
                  onClick={handleUpdatePackage}
                  disabled={
                    JSON.stringify(selectedPackage) ===
                    JSON.stringify(editedPackage)
                  }
                  className="w-32 h-10 p-0"
                >
                  Update Package
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <SessionsDetails patientId={params.patientId} />
    </>
  );
}

export default ScheduleSessions;
