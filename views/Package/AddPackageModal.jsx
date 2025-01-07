import React, { useState } from "react";
import {
  Button,
  Input,
  Typography,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Autocomplete, TextField } from "@mui/material";

const AddPackageModal = ({ open, handleClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    services: [],
    totalSessions: "",
    price: "",
    interval: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Package name is required.";
    if (!formData.services.length)
      newErrors.services = "At least one service is required.";
    if (
      !formData.totalSessions ||
      isNaN(formData.totalSessions) ||
      formData.totalSessions <= 0
    ) {
      newErrors.totalSessions = "Total sessions must be a positive number.";
    }
    if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
      newErrors.price = "Price must be a positive number.";
    }
    if (
      !formData.interval ||
      isNaN(formData.interval) ||
      formData.interval <= 0
    ) {
      newErrors.interval = "Interval must be a positive number.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // Clear error for the field being edited
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
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
        Add Package
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
              error={Boolean(errors.name)}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Services Offered */}
          <div>
            <Autocomplete
              multiple
              freeSolo
              size="small"
              options={serviceOptions}
              value={formData.services}
              onChange={(e, value) => handleChange("services", value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Services Offered"
                  error={Boolean(errors.services)}
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
              min={1} 
              value={formData.totalSessions}
              onChange={(e) => handleChange("totalSessions", e.target.value)}
              required
              className="mt-1 block w-full"
              error={Boolean(errors.totalSessions)}
            />
            {errors.totalSessions && (
              <p className="text-red-500 text-sm mt-1">
                {errors.totalSessions}
              </p>
            )}
          </div>

          {/* Pricing */}
          <div>
            <Input
              label="Pricing"
              type="number"
              min={0}
              value={formData.price}
              onChange={(e) => handleChange("price", e.target.value)}
              required
              className="mt-1 block w-full"
              error={Boolean(errors.price)}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
          </div>

          {/* Schedule Preferences */}
          <div>
            <Input
              label="Interval in days"
              type="number"
              min={0}
              value={formData.interval}
              onChange={(e) => handleChange("interval", e.target.value)}
              required
              className="mt-1 block w-full"
              error={Boolean(errors.interval)}
            />
            {errors.interval && (
              <p className="text-red-500 text-sm mt-1">{errors.interval}</p>
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
          Submit
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default AddPackageModal;
