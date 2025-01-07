import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { getDoctorThunk, updateDoctorByIdThunk } from "@/redux/thunk/doctor";
import { toast } from "react-toastify";

const EditDoctorModal = ({ isOpen, handleClose, handleSubmit, doctorData }) => {
  const initialFormState = {
    name: "",
    mobile: "",
      licenseNumber: "",
    DMCNumber:"",
    email: "",
    specialization: "",
    clinicAddress: "",
    subscriptionTier: "",
    features: [],
    experience: "",
    qualifications: [],
    hospitalId: "",
    status: "active",
    location: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [newFeature, setNewFeature] = useState("");
  const [newQualification, setNewQualification] = useState("");
  const [errors, setErrors] = useState({});
  const mobileRegex = /^[1-9]{1}[0-9]{9}$/;
  const dispatch = useDispatch();
  useEffect(() => {
    if (isOpen && doctorData) {
      setFormData(doctorData); // Populate the form with existing doctor's data
    }
  }, [isOpen, doctorData]);

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = "Name is required";
    if (!formData.mobile) {
      formErrors.mobile = "Mobile number is required";
    } else if (!mobileRegex.test(formData.mobile)) {
      formErrors.mobile =
        "Invalid mobile number. Must be 10 digits and not start with 0.";
    }
    if (!formData.licenseNumber)
      formErrors.licenseNumber = "License number is required";
    if (!formData.email) formErrors.email = "Email is required";
    if (!formData.specialization)
      formErrors.specialization = "Specialization is required";
    if (!formData.clinicAddress)
      formErrors.clinicAddress = "Clinic address is required";
    if (!formData.subscriptionTier)
      formErrors.subscriptionTier = "Subscription tier is required";
    if (formData.features.length === 0)
      formErrors.features = "At least one feature is required";
    if (formData.qualifications.length === 0)
      formErrors.qualifications = "At least one qualification is required";
    if (!formData.location) formErrors.location = "Location is required";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleAddFeature = () => {
    if (newFeature.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature],
      }));
      setNewFeature("");
    }
  };

  const handleAddQualification = () => {
    if (newQualification.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        qualifications: [...prev.qualifications, newQualification],
      }));
      setNewQualification("");
    }
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setNewFeature("");
    setNewQualification("");
    setErrors({});
  };

  const handleFormSubmit = () => {
    if (validateForm()) {
      const dataToSubmit = { ...formData };
      dispatch(
        updateDoctorByIdThunk({
          doctorId: doctorData?._id,
          payload: dataToSubmit,
        }),
      )
        .unwrap()
        .then(() => {
            toast.success("Doctor Updated Successfully");
            dispatch(getDoctorThunk({ searchTerm: "" }));
        })
        .catch((error) => {
          console.log(error);
        });
      resetForm();
      handleClose();
    }
  };
  // const handleUpdateDoctor = (doctorId, formData) => {};
  const handleRemoveFeature = (index) => {
    const updatedFeatures = formData.features.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, features: updatedFeatures }));
  };

  const handleRemoveQualification = (index) => {
    const updatedQualifications = formData.qualifications.filter(
      (_, i) => i !== index,
    );
    setFormData((prev) => ({ ...prev, qualifications: updatedQualifications }));
  };

  return (
    <Dialog
      open={isOpen}
      handler={() => {
        resetForm();
        handleClose();
      }}
      size="lg"
      className="max-w-5xl w-full mx-auto" // Change max width and full width
    >
      <DialogHeader>Edit Doctor</DialogHeader>
      <DialogBody divider className="overflow-y-auto max-h-[75vh]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Input
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              type="text"
              required
            />
          </div>
          <div>
            <Input
              label="Mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              error={!!errors.mobile}
              helperText={errors.mobile}
              type="tel"
              required
            />
          </div>
          <div>
            <Input
              label="License Number"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              error={!!errors.licenseNumber}
              helperText={errors.licenseNumber}
              type="text"
              required
            />
          </div>
          <div>
            <Input
              label="DMC Number"
              name="DMCNumber"
              value={formData.DMCNumber}
              onChange={handleChange}
              error={!!errors.DMCNumber}
              helperText={errors.DMCNumber}
              type="text"
             
            />
          </div>
          <div>
            <Input
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              type="email"
              required
            />
          </div>
          <div>
            <Input
              label="Specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              error={!!errors.specialization}
              helperText={errors.specialization}
              type="text"
              required
            />
          </div>
          <div>
            <Input
              label="Experience (in years)"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              type="number"
            />
          </div>

          <div>
            <Select
              label="Status"
              name="status"
              value={formData.status}
              onChange={(value) => handleSelectChange("status", value)}
            >
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </div>
          <div className="col-span-1">
            <Input
              label="Clinic Address"
              name="clinicAddress"
              value={formData.clinicAddress}
              onChange={handleChange}
              error={!!errors.clinicAddress}
              helperText={errors.clinicAddress}
              required
            />
          </div>
          <div className="col-span-1">
            <Input
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              error={!!errors.location}
              helperText={errors.location}
              type="text"
              required
            />
          </div>
          <div className="col-span-1">
            <Select
              label="Subscription Tier"
              name="subscriptionTier"
              value={formData.subscriptionTier}
              onChange={(value) =>
                handleSelectChange("subscriptionTier", value)
              }
              error={!!errors.subscriptionTier}
              helperText={errors.subscriptionTier}
              required
            >
              <Option value="Basic">Basic</Option>
              <Option value="Standard">Standard</Option>
              <Option value="Premium">Premium</Option>
            </Select>
          </div>
          <div className="col-span-2">
            <Input
              label="Add Feature"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
            />
            <Button onClick={handleAddFeature} color="blue" className="mt-2">
              Add Feature
            </Button>
            <div className="mt-2">
              <ul className="border p-2 rounded-lg">
                {formData.features.length > 0 ? (
                  formData.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center border-b py-1"
                    >
                      {feature}
                      <Button
                        variant="text"
                        color="red"
                        onClick={() => handleRemoveFeature(index)}
                        className="ml-4"
                      >
                        Remove
                      </Button>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No features added.</li>
                )}
                {errors.features && (
                  <p className="text-red-500">{errors.features}</p>
                )}
              </ul>
            </div>
          </div>

          <div className="col-span-2">
            <Input
              label="Add Qualification"
              value={newQualification}
              onChange={(e) => setNewQualification(e.target.value)}
            />
            <Button
              onClick={handleAddQualification}
              color="blue"
              className="mt-2"
            >
              Add Qualification
            </Button>
            <div className="mt-2">
              {formData.qualifications.length > 0 ? (
                formData.qualifications.map((qualification, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border-b py-1"
                  >
                    {qualification}
                    <Button
                      variant="text"
                      color="red"
                      onClick={() => handleRemoveQualification(index)}
                      className="ml-4"
                    >
                      Remove
                    </Button>
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No qualifications added.</li>
              )}
              {errors.qualifications && (
                <p className="text-red-500">{errors.qualifications}</p>
              )}
            </div>
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleClose}
          className="mr-2"
        >
          Cancel
        </Button>
        <Button variant="gradient" color="blue" onClick={handleFormSubmit}>
          Submit
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default EditDoctorModal;
