import AutoInput from "@/component/ctkComponents/AutoInput";
import SendInvoiceModal from "@/component/modal/invoices/SendInvoiceModal";
import { getMedicineThunk, getTestsThunk } from "@/redux/thunk/appointments";
import { getDoctorThunk } from "@/redux/thunk/doctor";
import { getMyHospitalData } from "@/redux/thunk/hospital";
import { getPatientById, updatePatientThunk } from "@/redux/thunk/patients";
import { Button, Input, Typography } from "@material-tailwind/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  AddInvoicethunk,
  generateInvoiceThunk,
  getInvoiceById,
  updateInvoiceThunk,
} from "../../redux/thunk/invoice";

const discountOptions = [
  {
    label: "Fixed",
    value: "FIXED",
  },
  {
    label: "Percentage",
    value: "PERCENTAGE",
  },
];

const AddInvoice = () => {
  // const [hospitalData, setHospitalData] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const queryParams = new URLSearchParams(location.search);
  const patientId = queryParams.get("patientId");
  const appointmentId = queryParams.get("appointmentId");

  // for invoice edit
  const editMode = queryParams.get("editMode");
  const invoiceId = queryParams.get("invoiceId");

  const [hospital, setHospital] = useState();
  const [invoiceItems, setInvoiceItems] = useState([
    {
      id: 0,
      name: "",
      description: "",
      quantity: 1,
      price: 0,
      descriptionOptions: [],
      // isConsultation: false,
    },
  ]);
  const [invoiceDetails, setInvoiceDetails] = useState({
    patientId: patientId,
    appointmentId: appointmentId,
    customerName: "",
    mobile: "",
    address: "",
    invoiceDate: new Date().toISOString().slice(0, 10),
    invoiceDueDate: new Date().toISOString().slice(0, 10),
    isPaid: false,
  });
  // const [invoiceTax, setInvoiceTax] = useState(0);
  const [discount, setDiscount] = useState({
    type: "PERCENTAGE",
    value: 0,
  });
  const [invoiceNumber, setInvoiceNumber] = useState("");

  // invoice edit
  useEffect(() => {
    const getInvoiceDataForEdit = async () => {
      if (!invoiceId || !editMode) {
        return;
      }

      const response = await dispatch(getInvoiceById({ invoiceId }));

      if (!response.payload) {
        return;
      }

      setInvoiceNumber(response.payload?.invoiceNumber);

      setInvoiceDetails({
        appointmentId: response.payload?.appointmentId,
        patientId: response.payload?.patientId,
        customerName: response.payload?.customerName,
        mobile: response.payload?.mobile,
        address: response.payload?.address,
        invoiceDate: response.payload?.invoiceDate,
        invoiceDueDate: response.payload?.invoiceDueDate,
      });

      // setInvoiceTax(response.payload?.tax || 0);

      const items = response.payload?.items.map((item) => {
        return {
          id: item._id,
          name: item.name,
          description: item.description,
          quantity: item.qty,
          price: item.price,
          descriptionOptions: [
            {
              _id: item._id,
              name: item.name,
            },
          ],
        };
      });

      setInvoiceItems([...items]);
    };

    getInvoiceDataForEdit();
  }, [dispatch, editMode, invoiceId]);

  // getting hospital data
  useEffect(() => {
    const getHospitalData = async () => {
      const response = await dispatch(getMyHospitalData());
      if (!response.payload) {
        return;
      }
      setHospital(response.payload.hospital);
      setInvoiceDetails((prev) => {
        return {
          ...prev,
        };
      });
      // setInvoiceTax(response.payload.hospital?.invoiceTax)
      setDiscount({
        value: response.payload.hospital?.invoiceDiscount,
        type: "PERCENTAGE",
      });
    };

    getHospitalData();
  }, [dispatch]);

  const [addingInvoice, setAddingInvoice] = useState(false);
  const [errors, setErrors] = useState({});
  const [invoicePdfUrl, setInvoicePdfUrl] = useState();
  const [invoiceResponse, setInvoiceResponse] = useState({});
  const [showSendInvoiceModal, setShowSendInvoiceModal] = useState(false);
  // const [isConsultationInvoice, setIsConsultationInvoice] = useState(false);

  // useEffect(() => {
  //     if (isConsultationInvoice) {
  //         setInvoiceTax(hospital?.consultationInvoiceTax || 0)
  //     } else {
  //         setInvoiceTax(hospital?.invoiceTax || 0)
  //     }
  // }, [isConsultationInvoice])

  useEffect(() => {
    const getPatientData = async () => {
      if (!patientId) {
        return;
      }

      const response = await dispatch(getPatientById({ patientId }));
      const patient = response.payload;

      if (patient) {
        setInvoiceDetails((prev) => {
          let address = "";
          if (patient.address) {
            address += patient.address;
          }
          if (patient.city) {
            address += `, ${patient.city}`;
          }
          if (patient.state) {
            address += `, ${patient.state}`;
          }
          if (patient.pincode) {
            address += ` - ${patient.pincode}`;
          }

          return {
            ...prev,
            customerName: patient.name,
            mobile: patient.phone,
            address: address,
          };
        });
      } else {
        toast.error("Something went wrong");
      }
    };
    getPatientData();
  }, [appointmentId, patientId, dispatch]);

  const [savingAddress, setSavingAddress] = useState(false);
  const handleSavePatientAddress = async () => {
    if (
      !patientId ||
      !invoiceDetails.address ||
      invoiceDetails?.address?.length === 0
    ) {
      setErrors((prev) => {
        return {
          ...prev,
          address: "Address is required",
        };
      });
      return;
    }

    setErrors((prev) => {
      return {
        ...prev,
        address: null,
      };
    });
    setSavingAddress(true);
    await dispatch(
      updatePatientThunk({
        id: patientId,
        data: { address: invoiceDetails.address },
      }),
    );
    setSavingAddress(false);
  };
  const handleInvoiceDetailChange = (e) => {
    const { name, value } = e.target;

    if (name === "invoiceDate" || name === "invoiceDueDate") {
      const date = new Date(value);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`;
      setInvoiceDetails({ ...invoiceDetails, [name]: formattedDate });
    } else if (name === "isPaid") {
      setInvoiceDetails((prev) => {
        return { ...invoiceDetails, [name]: !prev.isPaid };
      });
    } else {
      setInvoiceDetails({ ...invoiceDetails, [name]: value });
    }
  };

  const debounceTimeout = useRef(null);
  const handleSearchQueryChange = useCallback(
    async (itemId, newQuery) => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      // if (newQuery === "") {
      //     setInvoiceItems((prevItems) =>
      //         prevItems.map((item) =>
      //             item.id === itemId
      //                 ? { ...item, descriptionOptions: [] }
      //                 : item,
      //         ),
      //     );
      //     return;
      // }

      debounceTimeout.current = setTimeout(async () => {
        try {
          const response = await dispatch(
            getMedicineThunk({ query: newQuery, limit: 6 }),
          );
          const medicines =
            response.payload?.medicines?.map((item) => {
              return {
                ...item,
                optionType: "medicines",
              };
            }) || [];

          const response2 = await dispatch(
            getDoctorThunk({ searchTerm: newQuery, limit: 6 }),
          );

          const doctors =
            response2.payload?.map((item) => {
              return {
                ...item,
                optionType: "doctors",
              };
            }) || [];

          const response3 = await dispatch(
            getTestsThunk({ query: newQuery, limit: 6 }),
          );

          const tests =
            response3?.payload?.result?.map((item) => {
              return {
                name: item.test,
                description: "Test",
                optionType: "tests",
              };
            }) || [];

          setInvoiceItems((prevItems) =>
            prevItems.map((item) =>
              item.id === itemId
                ? {
                    ...item,
                    descriptionOptions: [...medicines, ...doctors, ...tests],
                  }
                : item,
            ),
          );
        } catch (error) {
          console.error("Failed to fetch options:", error);
        }
      }, 500);
    },
    [debounceTimeout, dispatch],
  );

  // const handleIsConsultationBtn = (id) => {
  //     setInvoiceItems((prevItems) =>
  //         prevItems.map((item) =>
  //             item.id === id
  //                 ? { ...item, isConsultation: !item.isConsultation }
  //                 : item,
  //         ),
  //     );
  // }

  const handleSelectChange = (id, newValue) => {
    setInvoiceItems((prevItems) =>
      prevItems.map((item) => {
        let name = "";
        let description = "";

        if (newValue?.optionType === "medicines") {
          name = newValue?.name;
          description = `${newValue?.shortComposition1}, ${newValue?.shortComposition2 || " "}`;
        } else if (newValue?.optionType === "doctors") {
          name = "Consultation";
          description = newValue?.name;
        } else if (newValue?.optionType === "tests") {
          name = newValue?.name;
          description = "Test";
        }

        return item.id === id
          ? {
              ...item,
              name,
              description,
              price: newValue?.price ? newValue.price : 1,
            }
          : item;
      }),
    );
  };

  const addItem = () => {
    setInvoiceItems((prev) => {
      return [
        ...prev,
        {
          id: prev.length,
          name: "",
          description: "",
          quantity: 1,
          price: 0,
          descriptionOptions: [],
          // isConsultation: false,
        },
      ];
    });
  };

  const handleFormReset = () => {
    setInvoiceItems([
      {
        id: 0,
        name: "",
        description: "",
        quantity: 1,
        price: 0,
        descriptionOptions: [],
        // isConsultation: false,
      },
    ]);
  };

  const removeItem = (id) => {
    const updatedItems = invoiceItems.filter((item) => item.id !== id);
    setInvoiceItems(updatedItems);
  };

  // const handleInvoiceTypeChangeBtn = () => {
  //     setIsConsultationInvoice((p) => !p)
  //     handleFormReset()
  // }

  const calculateTotal = () => {
    let total = 0;
    invoiceItems.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total.toFixed(2);
  };

  const calculateDiscount = () => {
    if (discount.type === "PERCENTAGE") {
      const total = parseFloat(calculateTotal());
      return (discount.value * total).toFixed(2);
    } else {
      return parseFloat(discount.value).toFixed(2);
    }
  };

  const calculateNetAmount = () => {
    return (calculateTotal() - calculateDiscount()).toFixed(2);
  };

  // const handleTaxChange = (e) => {
  //     const val = e.target.value
  //     if (val > 100 || val < 0) {
  //         return;
  //     }

  //     // setInvoiceTax((val / 100).toFixed(2));
  // }

  const handleDiscountChange = (e) => {
    const val = e.target.value;
    if (val < 0) {
      return;
    }

    setDiscount((p) => {
      return {
        ...p,
        value: p.type === "PERCENTAGE" ? (val / 100).toFixed(2) : val,
      };
    });
  };

  const validateInputs = () => {
    const newErrors = {};

    if (!invoiceDetails.customerName)
      newErrors.customerName = "Customer Name is required";
    if (!invoiceDetails.mobile) newErrors.mobile = "Mobile number is required";
    if (!invoiceDetails.address) newErrors.address = "Address is required";
    if (!invoiceDetails.invoiceDate)
      newErrors.invoiceDate = "Invoice Date is required";
    if (!invoiceDetails.invoiceDate)
      newErrors.invoiceDate = "Due Date is required";

    if (invoiceItems.length === 0)
      newErrors.invoiceItems = "At least one item is required";

    invoiceItems.forEach((item) => {
      if (!item.name || !item.description) {
        return;
      }
      if (!item.description)
        newErrors[`description-${item.id}`] =
          `Description for item ${item.id} is required`;
      if (item.quantity <= 0)
        newErrors[`quantity-${item.id}`] =
          `Quantity for item ${item.id} must be greater than zero`;
      if (item.price <= 0)
        newErrors[`price-${item.id}`] =
          `Price for item ${item.id} must be greater than zero`;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) {
      return;
    }
    setInvoicePdfUrl(null);
    setAddingInvoice(true);

    const filterdInvoiceItems = invoiceItems
      .map((item) => {
        if (!item.name) {
          return null;
        }
        return {
          name: item.name,
          description: item.description,
          qty: item.quantity,
          price: item.price,
          totalAmount: (item.quantity * item.price).toFixed(2),
        };
      })
      .filter((item) => item !== null);

    const invoiceData = {
      patientId: invoiceDetails.patientId,
      appointmentId: invoiceDetails.appointmentId,
      mobile: invoiceDetails.mobile,
      customerName: invoiceDetails.customerName,
      address: invoiceDetails.address,
      invoiceDate: invoiceDetails.invoiceDate,
      invoiceDueDate: invoiceDetails.isPaid
        ? null
        : invoiceDetails.invoiceDueDate,
      isPaid: invoiceDetails.isPaid,
      // tax: invoiceTax,
      totalAmount: calculateTotal(),
      discount: calculateDiscount(),
      finalAmount: calculateNetAmount(),
      items: filterdInvoiceItems,
      // invoiceType: isConsultationInvoice ? "CONSULTATION" : "PRODUCT",
    };

    try {
      const response = editMode
        ? await dispatch(updateInvoiceThunk({ invoiceId, data: invoiceData }))
        : await dispatch(AddInvoicethunk(invoiceData));
      setInvoiceResponse(response?.payload.invoice);

      const savedInvoiceNumber = response?.payload?.invoice?.invoiceNumber;
      if (savedInvoiceNumber) {
        const pdfResponse = await dispatch(
          generateInvoiceThunk(response?.payload?.invoice?._id),
        );

        if (pdfResponse?.payload) {
          setInvoicePdfUrl(pdfResponse?.payload?.invoicePdfUrl);
        }
      } else {
        console.error("Failed to get saved invoice number");
      }
      setAddingInvoice(false);
    } catch (error) {
      setAddingInvoice(false);
      toast.error("Failed to save invoice:", error);
    }
  };
  const handleItemChange = (id, field, value) => {
    setInvoiceItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  const handleAutoAddRow = (index) => {
    if (index === invoiceItems.length - 1) {
      addItem();
    }
  };

  if (!patientId && !editMode) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
        <h1 className="text-4xl font-bold text-red-600 mb-4">400</h1>
        <p className="text-lg text-gray-700 mb-6">
          patientId are required in the url query.
        </p>
      </div>
    );
  }

  return (
    <div className="">
     
      <div className="p-2">
        <div className="bg-gray-100 p-4 mb-2 rounded-lg shadow-md">
          <div className="flex items-center justify-between  py-2 ">
            <button
              onClick={() => window.history.back()}
              className="text-gray-600 text-2xl"
            >
              <FaArrowLeft />
            </button>
            <h1 className="text-xl font-bold text-gray-800">Invoice Page</h1>
            <div></div>
          </div>
          <h2 className="text-2xl px-3 font-semibold text-gray-700 mb-4">
            Bill By:
          </h2>
          <nav className="  px-4 py-3 flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <h1 className="text-lg font-semibold text-gray-600">
                Hospital Name:{" "}
                <span className="font-medium text-gray-700">
                  {hospital?.name}
                </span>
              </h1>
              <p className="text-sm text-gray-600">
                Email:{" "}
                <span className="font-medium text-gray-700">
                  {hospital?.email}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Contact:{" "}
                <span className="font-medium text-gray-700">
                  {hospital?.contactNumber}
                </span>
              </p>
            </div>
            <div className="flex items-center justify-between ">
              <div>
                {hospital?.logo && (
                  <img
                    src={hospital?.logo}
                    alt={`${hospital?.name} logo`}
                    className="w-32 h-32 rounded-full border-2 border-white shadow-md"
                  />
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div className="bg-white shadow-lg p-4  rounded-lg print:w-a4-width print:h-a4-height print:m-auto print:p-a4-padding">
        <div className="custom-polifyx-scrollbar border h-full p-2">
          <div className="bg-gray-100 p-2 rounded-lg shadow-md mb-3 ">
            <div className="flex justify-between mb-4 text-gray-700">
              <h2 className="text-2xl font-semibold">Bill To:</h2>
              {invoiceNumber && (
                <Typography variant="h6" className="mb-2 font-semibold">
                  Invoice Id: {invoiceNumber}
                </Typography>
              )}
              {!editMode && (
                <Button
                  color="green"
                  onClick={handleFormReset}
                  className="mb-6 w-auto  bg-gray-300 text-black p-2 rounded-lg float-right"
                >
                  Reset
                </Button>
              )}
            </div>

            <div className="flex flex-wrap justify-between mb-4">
              <div className="flex flex-col gap-4 w-full sm:w-2/6">
                <Input
                  className="w-full"
                  label="Customer Name"
                  name="customerName"
                  value={invoiceDetails.customerName}
                  onChange={handleInvoiceDetailChange}
                  required
                />
                {errors.customerName && (
                  <p className="text-red-500">{errors.customerName}</p>
                )}

                <div className="grid grid-cols-[8fr_2fr] gap-4">
                  <Input
                    className="w-full"
                    label="Address"
                    name="address"
                    value={invoiceDetails.address}
                    onChange={handleInvoiceDetailChange}
                    required
                  />
                  <button
                    disabled={savingAddress}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                    onClick={handleSavePatientAddress}
                  >
                    {savingAddress ? "Saving..." : "Save"}
                  </button>
                </div>
                {errors.address && (
                  <p className="text-red-500">{errors.address}</p>
                )}

                <Input
                  className="w-full"
                  label="Mobile"
                  name="mobile"
                  value={invoiceDetails.mobile}
                  onChange={handleInvoiceDetailChange}
                  required
                />
                {errors.mobile && (
                  <p className="text-red-500">{errors.mobile}</p>
                )}
              </div>
              <div className="flex flex-col gap-4 w-full sm:w-2/6">
                <Input
                  className="w-full"
                  label="Invoice Date"
                  type="date"
                  name="invoiceDate"
                  value={invoiceDetails.invoiceDate}
                  onChange={handleInvoiceDetailChange}
                  required
                />
                {errors.invoiceDate && (
                  <p className="text-red-500">{errors.invoiceDate}</p>
                )}
                {invoiceDetails.isPaid ? (
                  <>
                    <p className="text-green-500 font-bold text-2xl py-1 px-3">
                      PAID
                    </p>
                  </>
                ) : (
                  <>
                    <Input
                      className="w-full"
                      label="Due Date"
                      type="date"
                      name="invoiceDueDate"
                      value={invoiceDetails.invoiceDueDate}
                      onChange={handleInvoiceDetailChange}
                      required
                    />
                    {errors.invoiceDueDate && (
                      <p className="text-red-500">{errors.invoiceDueDate}</p>
                    )}
                  </>
                )}
                {/* <Input
                                    label={`${isConsultationInvoice ? "Consultation" : "Invoice"} Tax (%)`}
                                    type="number"
                                    max={100}
                                    value={parseFloat(invoiceTax * 100).toFixed(2) || 0}
                                    onChange={handleTaxChange}
                                    className="w-full"
                                    required
                                />
                                {errors.tax && (
                                    <p className="text-red-500">{errors.tax}</p>
                                )} */}
              </div>
            </div>
          </div>

          <div className="mb-6 overflow-x-auto">
            <table className="min-w-full table-auto bg-white rounded-lg shadow-md hidden sm:table">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-2 py-2 text-left text-gray-700">
                    Serial No.
                  </th>
                  <th className="px-2 py-2 text-left text-gray-700">
                    Treatments & Products
                  </th>
                  <th className="px-2 py-2 text-left text-gray-700">
                    Quantity
                  </th>
                  <th className="px-2 py-2 text-left text-gray-700">
                    Unit Price
                  </th>
                  <th className="px-2 py-2 text-left text-gray-700">
                    Total Amount
                  </th>
                  <th className="px-2 py-2 text-left text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {invoiceItems.map((item, index) => (
                  <tr key={item.id} className="border-b last:border-none">
                    <td className="px-2 py-2 text-gray-800">{index + 1}.</td>
                    <td
                      className="px-2 py-4 space-y-1 relative"
                      onFocus={() => {
                        handleAutoAddRow(index);
                        handleSearchQueryChange(item.id, "");
                      }}
                    >
                      <AutoInput
                        placeholder={"Item Name"}
                        onInputChange={(query) =>
                          handleSearchQueryChange(item.id, query)
                        }
                        value={item.name}
                        options={item.descriptionOptions}
                        onOptionSelect={(option) =>
                          handleSelectChange(item.id, option)
                        }
                        handleValueNotInOption={(val) =>
                          handleItemChange(item.id, "name", val)
                        }
                      />
                      <input
                        name="description"
                        type="text"
                        value={item.description}
                        onChange={(e) => {
                          handleItemChange(
                            item.id,
                            "description",
                            e.target.value,
                          );
                        }}
                        placeholder="Item Desc"
                        className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </td>
                    <td className="px-2 py-2">
                      <input
                        name="quantity"
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => {
                          if (e.target.value >= 1) {
                            handleItemChange(
                              item.id,
                              "quantity",
                              parseInt(e.target.value, 10),
                            );
                          }
                        }}
                        className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </td>
                    <td className="px-2 py-2">
                      <input
                        name="price"
                        type="number"
                        value={item.price}
                        onChange={(e) => {
                          handleItemChange(
                            item.id,
                            "price",
                            parseFloat(e.target.value),
                          );
                        }}
                        className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </td>
                    <td className="px-2 py-2 text-center text-gray-800">
                      {(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="px-2 py-2">
                      {index === invoiceItems.length - 1 ? (
                        <></>
                      ) : (
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 rounded-full bg-red-500 text-white hover:bg-red-700"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile View */}
            <div className="block sm:hidden">
              {invoiceItems.map((item, index) => (
                <div
                  key={item.id}
                  className="border rounded-lg p-4 mb-4 shadow-sm bg-gray-200"
                >
                  <div className="mb-2">
                    <strong>Serial No.:</strong> {index + 1}
                  </div>
                  <div
                    className="mb-2"
                    onFocus={() => {
                      handleAutoAddRow(index);
                      handleSearchQueryChange(item.id, "");
                    }}
                  >
                    <AutoInput
                      placeholder={"Item Name"}
                      onInputChange={(query) =>
                        handleSearchQueryChange(item.id, query)
                      }
                      value={item.name}
                      options={item.descriptionOptions}
                      onOptionSelect={(option) =>
                        handleSelectChange(item.id, option)
                      }
                      handleValueNotInOption={(val) =>
                        handleItemChange(item.id, "name", val)
                      }
                    />
                  </div>
                  <div
                    className="mb-2 "
                    onFocus={() => {
                      handleAutoAddRow(index);
                      handleSearchQueryChange(item.id, "");
                    }}
                  >
                    <input
                      name="description"
                      type="text"
                      value={item.description}
                      onChange={(e) => {
                        handleItemChange(
                          item.id,
                          "description",
                          e.target.value,
                        );
                      }}
                      placeholder="Item Desc"
                      className=" px-3 py-1 italic text-sm w-72 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm text-gray-700">
                      Quantity:
                    </label>
                    <input
                      name="quantity"
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => {
                        if (e.target.value >= 1) {
                          handleItemChange(
                            item.id,
                            "quantity",
                            parseInt(e.target.value, 10),
                          );
                        }
                      }}
                      className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm text-gray-700">
                      Unit Price:
                    </label>
                    <input
                      name="price"
                      type="number"
                      value={item.price}
                      onChange={(e) => {
                        handleItemChange(
                          item.id,
                          "price",
                          parseFloat(e.target.value),
                        );
                      }}
                      className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="mb-2 flex justify-between items-center">
                    <div>
                      <strong>Total Amount:</strong>{" "}
                      {(item.price * item.quantity).toFixed(2)}
                    </div>
                    <div>
                      {index === invoiceItems.length - 1 ? (
                        <></>
                      ) : (
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 rounded-full bg-red-500 text-white hover:bg-red-700"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start sm:items-end md:items-end mb-6">
            <div className="text-left">
              <Typography variant="h4" className="text-gray-800 font-semibold">
                Total Amount: ₹{calculateTotal()}
              </Typography>
              <div className=" mt-2 flex gap-2 justify-end">
                <select
                  className="w-38 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={discount.type}
                  onChange={(e) =>
                    setDiscount((prev) => {
                      return { ...prev, type: e.target.value };
                    })
                  }
                >
                  {discountOptions.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <Input
                  name="discount"
                  label={
                    discount.type === "PERCENTAGE"
                      ? "Discount (%)"
                      : "Discount (₹)"
                  }
                  type="number"
                  min={0}
                  max={discount.type === "PERCENTAGE" ? 100 : calculateTotal()}
                  value={
                    discount.type === "PERCENTAGE"
                      ? parseFloat(discount.value * 100).toFixed(2)
                      : discount.value || 0
                  }
                  onChange={handleDiscountChange}
                  required
                />
              </div>
              <Typography
                variant="h4"
                className="mt-2 text-gray-800 font-semibold"
              >
                Discount: ₹{calculateDiscount()}
              </Typography>
              <Typography
                variant="h4"
                className="mt-2 text-gray-800 font-semibold"
              >
                Net Amount: ₹{calculateNetAmount()}
              </Typography>
              <div className="w-full flex items-center gap-2">
                <label htmlFor="isPaid">
                  <Typography
                    variant="h4"
                    className={`font-semibold ${invoiceDetails.isPaid ? "text-green-500" : "text-red-500"}`}
                  >
                    {`Payment Status: ${invoiceDetails.isPaid ? "Paid" : "Not Paid"}`}
                  </Typography>
                </label>
                <input
                  className="w-6 h-6"
                  label="Paid"
                  type="checkbox"
                  name="isPaid"
                  id="isPaid"
                  checked={invoiceDetails.isPaid}
                  onChange={handleInvoiceDetailChange}
                />
              </div>
            </div>
          </div>

          <div className="mt-16 mb-6 gap-2 flex justify-center">
            {/* <Button
                                    name="isPaid"
                                    className={`text-white w-44 p-2 rounded-md ${invoiceDetails.isPaid ? "bg-green-500" : "bg-red-500"}`}
                                    onClick={handleInvoiceDetailChange}
                                >
                                    {
                                        invoiceDetails.isPaid
                                            ? "Payment Status: Paid"
                                            : "Payment Status: Not Paid"
                                    }
                                </Button> */}
            <button
              color="green"
              className="bg-blue-500 w-44 text-white p-2 rounded-md disabled:text-black disabled:cursor-not-allowed disabled:bg-blue-200"
              onClick={handleSubmit}
            >
              {editMode ? (
                <>{addingInvoice ? "Saving" : "Save"}</>
              ) : (
                <>{addingInvoice ? "Adding" : "Add"}</>
              )}
            </button>
            <button
              disabled={!(invoicePdfUrl && invoicePdfUrl.length > 0)}
              color="green"
              className="bg-amber-600 w-44 text-white p-2 rounded-md disabled:text-black disabled:cursor-not-allowed disabled:bg-amber-200"
              onClick={() => window.open(invoicePdfUrl, "_blank")}
            >
              Open PDF
            </button>
            <button
              disabled={!(invoicePdfUrl && invoicePdfUrl.length > 0)}
              color="green"
              className="bg-green-600 w-44 text-white p-2 rounded-md disabled:text-black disabled:cursor-not-allowed disabled:bg-green-200"
              onClick={() => setShowSendInvoiceModal(true)}
            >
              Send Invoice
            </button>
          </div>
        </div>

        <SendInvoiceModal
          open={showSendInvoiceModal}
          toggler={() => setShowSendInvoiceModal((prev) => !prev)}
          invoice={invoiceResponse}
        />
      </div>
    </div>
  );
};

export default AddInvoice;
