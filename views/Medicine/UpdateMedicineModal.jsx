import { Input, Dialog, DialogBody, DialogFooter, Button, Spinner } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMedicine } from "../../redux/thunk/medicine";
const UpdateMedicineModal = ({ open, toggleModal, selectedMedicine }) => {
  const [formValues, setFormValues] = useState({
    genericName: "",
    brandName: "",
    dosageForm: "",
    strength: "",
    manufacturer: "",
    manufacturingDate: "",
    expiryDate: "",
    description: "",
    price: 0.0
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const hospitalId = useSelector((state) => state?.UserSlice?.userDetails?.hospitalId);
  useEffect(() => {
    if (selectedMedicine) {
      setFormValues({
        genericName: selectedMedicine.genericName || "",
        brandName: selectedMedicine.brandName || "",
        dosageForm: selectedMedicine.dosageForm || "",
        strength: selectedMedicine.strength || "",
        manufacturer: selectedMedicine.manufacturer || "",
        manufacturingDate: selectedMedicine.manufacturingDate ? new Date(selectedMedicine.manufacturingDate).toISOString().split("T")[0] : "",
        expiryDate: selectedMedicine.expiryDate ? new Date(selectedMedicine.expiryDate).toISOString().split("T")[0] : "",
        description: selectedMedicine.description || "",
        quantity: selectedMedicine.quantity || 0,
        price: selectedMedicine.price || 0.0
      });
    } else {
      // Reset form values if no selectedMedicine
    }
    setErrors({});
  }, [selectedMedicine, open]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formValues.genericName) tempErrors.genericName = "Generic Name is required.";
    if (!formValues.brandName) tempErrors.brandName = "Brand Name is required.";
    if (!formValues.dosageForm) tempErrors.dosageForm = "Dosage Form is required.";
    if (!formValues.strength) tempErrors.strength = "Strength is required.";
    if (!formValues.manufacturer) tempErrors.manufacturer = "Manufacturer is required.";
    if (!formValues.manufacturingDate) tempErrors.manufacturingDate = "Manufacturing Date is required.";
    if (!formValues.expiryDate) tempErrors.expiryDate = "Expiry Date is required.";
    if (!formValues.price) tempErrors.price = "Price is required.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (validate()) {
      setLoading(true);

      const medicineData = {
        _id: selectedMedicine._id,
        ...formValues,
        hospitalId: hospitalId
      };

      dispatch(updateMedicine(medicineData));

      setLoading(false);
      toggleModal();
    }
  };

  return (
    <Dialog open={open} handler={toggleModal} className="max-w-lg mx-auto w-full">
      <DialogBody className="p-6 max-h-[70vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-center">Update Medicine</h2>
        {loading && (
          <div className="flex justify-center items-center h-32">
            <Spinner color="blue" />
          </div>
        )}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="mb-1">
              <Input label="Generic Name" name="genericName" value={formValues.genericName} onChange={handleInputChange} error={!!errors.genericName} className="w-full" placeholder={errors.genericName || ""} containerProps={{ className: "mb-1" }} />
            </div>

            <div className="mb-1">
              <Input label="Brand Name" name="brandName" value={formValues.brandName} onChange={handleInputChange} error={!!errors.brandName} className="w-full" placeholder={errors.brandName || ""} containerProps={{ className: "mb-1" }} />
            </div>

            <div className="mb-2">
              <Input label="Dosage Form" name="dosageForm" value={formValues.dosageForm} onChange={handleInputChange} error={!!errors.dosageForm} className="w-full" placeholder={errors.dosageForm || ""} containerProps={{ className: "mb-2" }} />
            </div>

            <div className="mb-2">
              <Input label="Strength" name="strength" value={formValues.strength} onChange={handleInputChange} error={!!errors.strength} className="w-full" placeholder={errors.strength || ""} containerProps={{ className: "mb-2" }} />
            </div>

            <div className="mb-2 md:col-span-2">
              <Input label="Manufacturer" name="manufacturer" value={formValues.manufacturer} onChange={handleInputChange} error={!!errors.manufacturer} className="w-full" placeholder={errors.manufacturer || ""} containerProps={{ className: "mb-2" }} />
            </div>

            <div className="mb-2 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <Input label="Manufacturing Date" name="manufacturingDate" type="date" value={formValues.manufacturingDate} onChange={handleInputChange} error={!!errors.manufacturingDate} className="w-full" placeholder={errors.manufacturingDate || ""} containerProps={{ className: "mb-2" }} />
              </div>

              <div>
                <Input label="Expiry Date" name="expiryDate" type="date" value={formValues.expiryDate} onChange={handleInputChange} error={!!errors.expiryDate} className="w-full" placeholder={errors.expiryDate || ""} containerProps={{ className: "mb-2" }} />
              </div>
            </div>

            <div className="mb-2 md:col-span-2">
              <Input label="Description" name="description" value={formValues.description} onChange={handleInputChange} className="w-full" containerProps={{ className: "mb-2" }} />
            </div>

            <div>
              <Input label="Price" name="price" type="number" value={formValues.price} onChange={handleInputChange} error={!!errors.price} className="w-full" placeholder={errors.price || ""} containerProps={{ className: "mb-2" }} />
            </div>
          </div>
        )}
      </DialogBody>

      <DialogFooter className="flex justify-between">
        <Button variant="text" color="red" onClick={toggleModal} className="w-full sm:w-auto">
          Cancel
        </Button>
        <Button color="blue" onClick={handleUpdate} className="w-full sm:w-auto ml-2 sm:ml-4">
          Update
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default UpdateMedicineModal;
