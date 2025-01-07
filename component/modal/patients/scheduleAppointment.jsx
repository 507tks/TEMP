import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  Input,
  Option,
  Select,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAppointmentTypeThunk,
  getPatientThunk,
  scheduleAppointmentThunk,
} from "../../../redux/thunk/patients";
import { getDoctorThunk } from "../../../redux/thunk/doctor";
import { getTodayDateForInput } from "../../../utils/dateHelper";
import { useEffect, useState } from "react";

const ScheduleAppointment = ({
  open,
  toggler,
  patient,
  currentPage,
  searchValue,
}) => {
  const [doctorList, setDoctorList] = useState([]);
  const [appointmentTypeList, setAppointmentTypeList] = useState([]);

  const [selectedDoctor, setSelectDoctor] = useState({});
  const [selectedDepartment, setDepartmentType] = useState({});

  const [doctorError, setDoctorError] = useState("");
  const [dateError, setDateError] = useState("");
  const [departmentError, setDepartmentError] = useState("");
  const [timeError, setTimeError] = useState("");

  const dispatch = useDispatch();

  const { doctorList: doctors } = useSelector((state) => state.DoctorSlice);

  const { appointmentTypeList: appointmentTypes } = useSelector(
    (state) => state.PatientSlice,
  );
  useEffect(() => {
    dispatch(getDoctorThunk({ searchTerm: "" }));
    dispatch(getAppointmentTypeThunk());
  }, [open, dispatch]);

  useEffect(() => {
    if (appointmentTypes) {
      setAppointmentTypeList(appointmentTypes);
    }
    if (doctors) {
      setDoctorList(doctors);
    }
  }, [appointmentTypes, doctors]);

  const validateInputs = (date, time) => {
    let isValid = true;

    if (!selectedDoctor._id) {
      setDoctorError("Please select a doctor.");
      isValid = false;
    } else {
      setDoctorError("");
    }

    if (!date) {
      setDateError("Please select a date.");
      isValid = false;
    } else {
      setDateError("");
    }

    if (!selectedDepartment._id) {
      setDepartmentError("Please select a department.");
      isValid = false;
    } else {
      setDepartmentError("");
    }

    if (!time) {
      setTimeError("Please select a time.");
      isValid = false;
    } else {
      setTimeError("");
    }

    return isValid;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const payload = {
      patientId: patient._id,
      doctorId: selectedDoctor._id,
      date: e.target[1].value,
      time: e.target[3].value,
      // getTimestampFromYYYYMMDD(e.target[1].value) +
      // convertTimeStringToMilliseconds(e.target[3].value),
      departmentId: selectedDepartment._id,
    };
    if (!validateInputs(payload.date, payload.time)) return;
    await dispatch(scheduleAppointmentThunk(payload));
    dispatch(
      getPatientThunk({
        value: searchValue,
        pageSize: 25,
        pageIndex: currentPage,
      }),
    );
    toggler();
  };

  return (
    <Dialog open={open} handler={toggler}>
      <DialogHeader>Schedule Appointment</DialogHeader>
      <DialogBody>
        <form
          className="grid grid-cols-1 gap-4 lg:grid-cols-2"
          onSubmit={submitHandler}
        >
          <div className="relative">
            <Select label="Doctor" color="blue" name="doctorSelect">
              {doctorList.map((doctor, key) => {
                return (
                  <Option
                    key={key}
                    onClick={() => {
                      setSelectDoctor(doctor);
                    }}
                  >
                    {" "}
                    {doctor.name}
                  </Option>
                );
              })}
            </Select>
            {doctorError && (
              <div className="text-red-500 text-sm">{doctorError}</div>
            )}
          </div>
          <div className="relative">
            <Input
              label="Date of appointment"
              type="date"
              min={getTodayDateForInput()}
              color="blue"
            />
            {dateError && (
              <div className="text-red-500 text-sm">{dateError}</div>
            )}
          </div>
          <div className="relative">
            <Select label="Department Type" color="blue">
              {appointmentTypeList.map((appointmentType, key) => {
                return (
                  <Option
                    key={key}
                    onClick={() => {
                      setDepartmentType(appointmentType);
                    }}
                  >
                    {" "}
                    {appointmentType.name}
                  </Option>
                );
              })}
            </Select>
            {departmentError && (
              <div className="text-red-500 text-sm">{departmentError}</div>
            )}
          </div>
          <div className="relative">
            <Input label="Time of appointment" type="time" color="blue" />
            {timeError && (
              <div className="text-red-500 text-sm">{timeError}</div>
            )}
          </div>

          <div className="lg:col-span-2 flex justify-center">
            <Button color="blue" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
};

export default ScheduleAppointment;
