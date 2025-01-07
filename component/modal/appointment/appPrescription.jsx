import { Button, Collapse, Dialog, DialogBody, DialogHeader, Input, Option, Select, Textarea, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { appointmentThunk, prescriptionThunk, viewPrescriptionThunk } from "../../../redux/thunk/appointments";
import { toMMMDDYYY } from "../../../utils/dateHelper";
import dayjs from "dayjs";

const AddPrescription = ({ open, toggler, appointment, currentPage }) => {
  const [showHistory, setShowHistory] = useState(false);
  const [medicineArr, setMedicineArr] = useState([{ medicine: "", period: "", frequency: "", remark: "" }]);
  const [prescription, setPrescription] = useState();
  const [vitalsValue, setVitalsValue] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    if (appointment) dispatch(viewPrescriptionThunk(appointment?._id));
    if (appointment?.prescription) setPrescription(appointment?.prescription);
    else setPrescription("");
    setMedicineArr([{ medicine: "", period: "", frequency: "", remark: "" }]);
  }, [appointment,dispatch]);

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(prescriptionThunk({ appointmentId: appointment._id, prescription: e.target[0].value }));
    await dispatch(appointmentThunk({ date: "", status: "", search: "", pageSize: 25, pageIndex: currentPage }));
    dispatch(viewPrescriptionThunk(appointment?._id));
    setMedicineArr([{ medicine: "", period: "", frequency: "", remark: "" }]);
    toggler();
  };
  const updateField = (index, name, value) => {
    const temp = [...medicineArr];
    temp[index] = { ...temp[index], [name]: value };
    setMedicineArr(temp);
  };

  const tableData = useSelector((state) => state.AppointmentSlice?.prescriptionHistory?.appointmentData);
  return (
    <Dialog open={open} handler={toggler} size="xl" className="h-[70%]">
      <DialogHeader>Add Prescription</DialogHeader>
      <DialogBody className="flex gap-3 ">
        <div className="w-[60%] overflow-scroll h-[27rem] pr-2">
          <form className="flex flex-col gap-4 mt-2" onSubmit={submitHandler}>
            <Input label="Vitals" id="vitals" value={vitalsValue} onChange={(e) => setVitalsValue(e.target.value)} color="blue" placeholder="Enter Vitals" />
            <Textarea label="Diagnosis" id="presciption" rows={5} value={prescription} onChange={(e) => setPrescription(e.target.value)} color="blue" placeholder="Enter Prescription Details" />

            {medicineArr.map((obj, i) => {
              return (
                <div key={i} className="flex  gap-3 justify-between">
                  <Typography className="font-bold text-black">{i + 1}.</Typography>
                  <div>
                    <div className="flex gap-4 justify-between mb-2 item-center">
                      <span className="w-1/2">
                        <Select label="Select Medicine" onChange={(value) => updateField(i, "medicine", value)}>
                          <Option value="Paracetamol">Paracetamol</Option>
                          <Option value="Aspirin">Aspirin</Option>
                          <Option value="Hydrochlorothiazide">Hydrochlorothiazide</Option>
                        </Select>
                      </span>
                      <span className="w-1/2">
                        <Select label="Select Period" onChange={(value) => updateField(i, "period", value)}>
                          <Option value="7 Days">7 Days</Option>
                          <Option value="15 Days">15 Days</Option>
                          <Option value="30 Days">30 Days</Option>
                        </Select>
                      </span>
                    </div>
                    <div className="flex gap-4  item-center">
                      <span className="w-1/2">
                        <Select label="Select Frequency" onChange={(value) => updateField(i, "frequency", value)}>
                          <Option value="Once a day">Once a day</Option>
                          <Option value="Twice a day">Twice a day</Option>
                          <Option value="Thrice a day">Thrice a day</Option>
                        </Select>
                      </span>
                      <Input label="Remark" className="w-1/2" onChange={(e) => updateField(i, "remark", e.target.value)} />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Button color="green" onClick={() => setMedicineArr((prev) => [...prev, { medicine: "", quantity: "", frequency: "", remark: "" }])}>
                      Add More
                    </Button>
                  </div>
                </div>
              );
            })}
            <div className="lg:col-span-2 flex justify-center gap-4">
              <Button
                color="teal"
                type="button"
                onClick={() => {
                  setShowHistory(!showHistory);
                }}
              >
                History
              </Button>
              <Button color="indigo" type="submit">
                Submit
              </Button>
            </div>
          </form>

          <Collapse open={showHistory} className="mt-2">
            <table className="w-full text-sm border rounded-lg">
              <thead className="text-sm font-semibold bg-custom-theme text-white ">
                <tr className="text-center">
                  <th className="py-2">Prescription</th>
                  <th>Added By</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody className="overflow-scroll">
                {tableData &&
                  tableData.map((data, i) => {
                    return (
                      <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center font-medium text-black">
                        <td className="py-2">{data?.prescription || "-"}</td>
                        <td>{data?.updatedBy?.name || "-"}</td>
                        <td>{toMMMDDYYY(data?.updatedDate) || "-"}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </Collapse>
        </div>
        <div className="w-[40%]  -my-16">
          <header className="text-center">
            <Typography>IDEAL HAIR SKIN & LASER CLINIC</Typography>
            <Typography className="text-xs">Complete Solution for all your health problems</Typography>
            <Typography className="text-xs font-bold">Specialist in Hair Transplant</Typography>
            <div className="border-t-2 border-[#191b53] w-full my-4"></div>
          </header>
          <div className="flex">
            <Typography className="text-xs w-[45%]">
              {" "}
              Patient Name: <span className="text-black font-bold">{appointment && appointment?.patient[0]?.name}</span>{" "}
            </Typography>
            <Typography className="text-xs w-[25%]">
              {" "}
              Age/Sex: <span className="text-black font-bold">{dayjs().diff(dayjs(appointment?.patient[0]?.dob), "year")}</span>
            </Typography>
            <Typography className="text-xs">
              {" "}
              Date: <span className="text-black font-bold">{dayjs().format("MM/DD/YYYY")}</span>{" "}
            </Typography>
          </div>
          <div className="flex my-2">
            <Typography className="text-xs w-[35%]">
              {" "}
              Phone No: <span className="text-black font-bold">{appointment && appointment?.patient[0]?.phone}</span>{" "}
            </Typography>
            <Typography className="text-xs ">
              {" "}
              Address: <span className="text-black font-bold">{appointment && appointment?.patient[0]?.address}</span>{" "}
            </Typography>
          </div>
          <Typography className="text-xs ">
            {" "}
            Ref By: <span className="text-black font-bold">{appointment && appointment?.patient[0]?.reference}</span>{" "}
          </Typography>

          <div className="mt-4 flex gap-3">
            <Typography className="text-xs">Vitals:</Typography>
            <Typography className="text-black text-xs font-bold">{vitalsValue}</Typography>
          </div>
          <div className="mt-3 flex gap-3">
            <Typography className="text-xs">Diagnosis</Typography>
            <Typography className="text-black text-xs font-bold">{prescription}</Typography>
          </div>

          <Typography className="text-xs text-center font-bold my-2 text-[#9487ab] ">PRESCRIPTION</Typography>

          {medicineArr && (
            <table className="w-full text-xs border-2 border-[#9487ab]  rounded-lg ">
              <thead className="text-xs font-semibold bg-[#c6b7de] text-black ">
                <tr className="text-center">
                  <th className="py-1 border-r-2 border-b-2 border-[#9487ab] ">S. No.</th>
                  <th className=" border-r-2 border-b-2 border-[#9487ab] ">Name</th>
                  <th className=" border-r-2 border-b-2 border-[#9487ab] ">Period</th>
                  <th className=" border-r-2 border-b-2 border-[#9487ab] ">Frequency</th>
                  <th className=" border-r-2 border-b-2 border-[#9487ab] ">Remarks</th>
                </tr>
              </thead>
              <tbody className="overflow-scroll">
                {medicineArr.map((data, i) => {
                  return (
                    <tr key={i} className=" text-center font-medium text-black">
                      <td className="py-1 border-r-2 border-b-2 border-[#9487ab] ">{i + 1}</td>
                      <td className=" border-r-2 border-b-2 border-[#9487ab] ">{data?.medicine}</td>
                      <td className=" border-r-2  border-b-2 border-[#9487ab] ">{data?.period}</td>
                      <td className=" border-r-2 border-b-2 border-[#9487ab] ">{data?.frequency}</td>
                      <td className=" border-r-2 border-b-2 border-[#9487ab] ">{data?.remark}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default AddPrescription;
