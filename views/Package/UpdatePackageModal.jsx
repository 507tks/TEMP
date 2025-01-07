import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Typography,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Autocomplete, TextField } from "@mui/material";

const UpdatePackageModal = ({ open, handleClose, onSubmit, packageData }) => {
  const [formData, setFormData] = useState({
    name: "",
    services: [],
    totalSessions: "",
    price: "",
    interval: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    services: "",
    totalSessions: "",
    price: "",
    interval: "",
  });

  useEffect(() => {
    if (packageData) {
      setFormData({
        name: packageData?.name || "",
        services: packageData?.services || [],
        totalSessions: packageData?.totalSessions || "",
        price: packageData?.price || "",
        interval: packageData?.interval || "",
      });
      setErrors({}); // Reset errors when packageData changes
    }
  }, [packageData]);

  const validateFields = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Package name is required.";
    if (formData.services.length === 0)
      newErrors.services = "At least one service is required.";
    if (!formData.totalSessions || formData.totalSessions <= 0)
      newErrors.totalSessions = "Total sessions must be a positive number.";
    if (!formData.price || formData.price <= 0)
      newErrors.price = "Price must be a positive number.";
    if (!formData.interval || formData.interval <= 0)
      newErrors.interval = "Interval must be a positive number.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // Clear the error for the field being updated
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) {
      onSubmit({ data: formData, id: packageData?._id });
    }
  };

  const serviceOptions = ["Service1", "Service2", "Service3"];

  return (
    <Dialog
      open={open}
      handler={handleClose}
      size="lg"
      className="h-[90vh] overflow-y-auto"
    >
      <Typography variant="h2" className="text-2xl font-bold mb-4 p-4">
        Update Package
      </Typography>
      <DialogBody>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Package Name */}
          <div>
            <Input
              label="Package Name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
              className="mt-1 block w-full"
              error={!!errors.name}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Services Offered */}
          <div>
            <Autocomplete
              multiple
              freeSolo
              options={serviceOptions}
              value={formData.services}
              onChange={(e, value) => handleChange("services", value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Services Offered"
                  error={!!errors.services}
                  helperText={errors.services}
                />
              )}
            />
          </div>

          {/* Total Sessions */}
          <div>
            <Input
              label="Total Sessions"
              type="number"
              value={formData.totalSessions}
              onChange={(e) => handleChange("totalSessions", e.target.value)}
              required
              className="mt-1 block w-full"
              error={!!errors.totalSessions}
            />
            {errors.totalSessions && (
              <p className="text-red-500 text-sm">{errors.totalSessions}</p>
            )}
          </div>

          {/* Pricing */}
          <div>
            <Input
              label="Pricing"
              type="number"
              value={formData.price}
              onChange={(e) => handleChange("price", e.target.value)}
              required
              className="mt-1 block w-full"
              error={!!errors.price}
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price}</p>
            )}
          </div>

          {/* Schedule interval */}
          <div>
            <Input
              label="Interval in days"
              type="number"
              value={formData.interval}
              onChange={(e) => handleChange("interval", e.target.value)}
              required
              className="mt-1 block w-full"
              error={!!errors.interval}
            />
            {errors.interval && (
              <p className="text-red-500 text-sm">{errors.interval}</p>
            )}
          </div>
        </form>
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
        <Button type="submit" color="blue" onClick={handleSubmit}>
          Update
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default UpdatePackageModal;
