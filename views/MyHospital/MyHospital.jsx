import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyHospitalData, UpdateHospitalData } from "@/redux/thunk/hospital";
import  hospital_bg from "../../assets/hospital_bg.png";
import { DashboardNavbar } from "@/widgets/layout";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input } from "@material-tailwind/react";
const MyHospital = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyHospitalData());
  }, [dispatch]);

  const initialHospitalData = useSelector(
    (state) => state?.hospital?.data?.hospital,
  );

  const floatToPercentage = (f) => {
    if (f) {
      return (f * 100).toFixed(2);
    }
  };

  const [hospitalData, setHospitalData] = useState({
    ...initialHospitalData,
  });

  useEffect(() => {
    if (initialHospitalData?.logo) {
      setAvatarUrl(initialHospitalData.logo);
    }
    setHospitalData({
      ...initialHospitalData,
      invoiceTax: floatToPercentage(initialHospitalData?.invoiceTax),
      consultationInvoiceTax: floatToPercentage(
        initialHospitalData?.consultationInvoiceTax,
      ),
      invoiceDiscount: floatToPercentage(initialHospitalData?.invoiceDiscount),
    });
  }, [initialHospitalData]);
  useEffect(() => {}, [avatarUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHospitalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("hospitalId", initialHospitalData?._id);
    formData.append("name", hospitalData?.name || "");
    formData.append("email", hospitalData?.email || "");
    formData.append("contactNumber", hospitalData?.contactNumber || "");
    formData.append("code", hospitalData?.code || "");
    formData.append("address", hospitalData?.address || "");
    formData.append(
      "invoiceTax",
      (hospitalData?.invoiceTax / 100).toFixed(2) || 0.12,
    );
    formData.append(
      "consultationInvoiceTax",
      (hospitalData?.consultationInvoiceTax / 100).toFixed(2) || 0.0,
    );
    formData.append(
      "invoiceDiscount",
      (hospitalData?.invoiceDiscount / 100).toFixed(2) || 0.0,
    );
    formData.append(
      "showHeaderInPdf",
      hospitalData?.showHeaderInPdf === "true",
    );

    if (selectedFile) {
      formData.append("logo", selectedFile);
    }

    try {
      const resultAction = await dispatch(UpdateHospitalData(formData));
      if (UpdateHospitalData.fulfilled.match(resultAction)) {
        const updatedHospital = resultAction.payload?.hospital;
        setHospitalData({
          ...updatedHospital,
          invoiceTax: floatToPercentage(updatedHospital?.invoiceTax),
          consultationInvoiceTax: floatToPercentage(
            updatedHospital?.consultationInvoiceTax,
          ),
          invoiceDiscount: floatToPercentage(updatedHospital?.invoiceDiscount),
        });
    dispatch(getMyHospitalData());
        setAvatarUrl(updatedHospital?.logo);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Failed to update hospital data:", error);
    }
  };

  return (
    <div className="sm:px-6 py-6 sm:py-10">
      <div className="flex h-[10vh] items-center w-full justify-between bg-themeLight ">
        <DashboardNavbar
          inputField={
            <div className="text-black">
              <h1 className="font-bold text-2xl">Hospital Information</h1>
            </div>
          }
        />
      </div>
      <div className="flex h-[90vh] flex-col px-4 md:px-0">
        <div className="overflow-hidden w-full rounded-3xl max-w-5xl mx-auto">
          <div className="flex flex-row">
            {/* Left Section */}

            <div className="flex flex-col w-full md:w-6/12 p-5 bg-[#f5e3f2]">
              <div className="flex flex-col justify-center w-full items-center md:items-start">
                <div className="flex justify-center w-full items-center">
                  <img
                    src={hospital_bg}
                    alt="Hospital building exterior view"
                    className="w-48 h-48 border-2 border-blue-700 md:w-full md:h-full rounded-full md:rounded-3xl object-cover mb-4 md:mb-0 block md:hidden"
                  />
                </div>
                <dl className="mt-2 text-sm md:text-lg">
                  <div>
                    <dt className="inline">Name: </dt>
                    <dd className="inline font-semibold">
                      {hospitalData?.name || "N/A"}
                    </dd>
                  </div>
                  <div>
                    <dt className="inline">Email: </dt>
                    <dd className="inline font-semibold">
                      {hospitalData?.email || "N/A"}
                    </dd>
                  </div>
                  <div>
                    <dt className="inline">Contact: </dt>
                    <dd className="inline font-semibold">
                      {hospitalData?.contactNumber || "N/A"}
                    </dd>
                  </div>
                  <div>
                    <dt className="inline">Code: </dt>
                    <dd className="inline font-semibold">
                      {hospitalData?.code || "N/A"}
                    </dd>
                  </div>
                  <div>
                    <dt className="inline">Address: </dt>
                    <dd className="inline font-semibold">
                      {hospitalData?.address || "N/A"}
                    </dd>
                  </div>
                  <div>
                    <dt className="inline">Invoice Tax (%): </dt>
                    <dd className="inline font-semibold">
                      {hospitalData?.invoiceTax || (0.0).toFixed(2)}%
                    </dd>
                  </div>
                  <div>
                    <dt className="inline">Consultation Invoice Tax (%): </dt>
                    <dd className="inline font-semibold">
                      {hospitalData?.consultationInvoiceTax || (0.0).toFixed(2)}{" "}
                      %
                    </dd>
                  </div>
                  <div>
                    <dt className="inline">Invoice Discount (%): </dt>
                    <dd className="inline font-semibold">
                      {hospitalData?.invoiceDiscount || (0.0).toFixed(2)}%
                    </dd>
                  </div>
                  <div>
                    <dt className="inline">Show Header in PDF: </dt>
                    <dd className="inline font-semibold">
                      {hospitalData?.showHeaderInPdf ? "Yes" : "No"}
                    </dd>
                  </div>
                </dl>

                {/* Edit Details Button */}
                <div className="flex mt-6 md:mt-6 justify-center items-center">
                  <button className=" bg-blue-900 text-white text-center rounded-md  w-40 py-2 text-sm md:text-base">
                    <div className="flex gap-2 justify-center items-center">
                      <button
                        className="bg-blue-900 text-white rounded-md w-full md:w-40 py-2"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit Details
                      </button>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="w-full md:w-6/12  bg-white hidden md:block">
              <img
                src={hospital_bg}
                alt="Hospital building exterior view"
                className="w-full h-72 md:h-full rounded-xl object-cover  "
              />
            </div>
          </div>
        </div>
      </div>
      <Dialog
        className="h-[90vh] overflow-y-scroll"
        open={isEditing}
        handler={setIsEditing}
      >
        <DialogHeader>Edit Hospital Details</DialogHeader>
        <DialogBody divider>
          <form>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Name"
                name="name"
                color="blue"
                value={hospitalData?.name || ""}
                onChange={handleInputChange}
              />
              {/* Email */}
              <Input
                label="Email"
                name="email"
                type="email"
                color="blue"
                value={hospitalData?.email || ""}
                onChange={handleInputChange}
              />
              {/* Contact Number */}
              <Input
                label="Contact Number"
                name="contactNumber"
                color="blue"
                type="tel"
                value={hospitalData?.contactNumber || ""}
                onChange={handleInputChange}
              />
              {/* Address */}
              <Input
                label="Address"
                color="blue"
                name="address"
                value={hospitalData?.address || ""}
                onChange={handleInputChange}
              />
              {/* Code */}
              <Input
                label="Code"
                name="code"
                color="blue"
                value={hospitalData?.code || ""}
                onChange={handleInputChange}
              />
              {/* Invoice Tax */}
              <Input
                label="Invoice Tax (%)"
                name="invoiceTax"
                type="number"
                step="0.01"
                color="blue"
                value={hospitalData?.invoiceTax || ""}
                onChange={handleInputChange}
              />
              {/* Consultation Invoice Tax */}
              <Input
                label="Consultation Invoice Tax (%)"
                name="consultationInvoiceTax"
                type="number"
                color="blue"
                step="0.01"
                value={hospitalData?.consultationInvoiceTax || ""}
                onChange={handleInputChange}
              />
              {/* Invoice Discount */}
              <Input
                label="Invoice Discount (%)"
                name="invoiceDiscount"
                color="blue"
                type="number"
                step="0.01"
                value={hospitalData?.invoiceDiscount || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className=" mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div className="flex flex-col items-center gap-4">
                {avatarUrl && (
                  <img
                    src={avatarUrl}
                    alt="Hospital Logo"
                    className="w-24 h-24 object-cover rounded-md"
                  />
                )}
                <Input
                  type="file"
                  color="blue"
                  accept="image/*"
                  label="Upload Logo"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex py-4 gap-4 items-center">
                <label>Show Header in PDF</label>
                <select
                  className="bg-gray-100 border border-blue-500"
                  name="showHeaderInPdf"
                  value={hospitalData?.showHeaderInPdf}
                  onChange={handleInputChange}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setIsEditing(false)}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            Save
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default MyHospital;
