import { combineSlices } from "@reduxjs/toolkit";
import PatientSlice from "./slice/patient";
import LoginSlice from "./slice/login";
import dashboardSlice from "./slice/dashboard.js";
import AppointmentSlice from "./slice/appointment.js";
import DoctorSlice from "./slice/doctor.js";
import InvoiceSlice from "./slice/invoice.js";
import UserSlice from "./slice/user.js";
import optionsReducer from "./slice/options.js";
import medicine from "./slice/medicine.js";
import userrole from "./slice/userrole.js";
import hospital from "./slice/hospital";
import packageSlice from "./slice/packageSlice";





export default combineSlices({PatientSlice, packageSlice, LoginSlice, dashboardSlice, AppointmentSlice, InvoiceSlice, DoctorSlice, UserSlice, options: optionsReducer, medicine, userrole, hospital });
