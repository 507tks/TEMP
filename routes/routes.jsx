import Appointment from "@/views/Appointments/Appointment";
import MessageBroadcasting from "@/views/Broadcasting/MessageBroadcasting";
import Doctor from "@/views/Doctor/Doctor";
import Patients from "@/views/Patients/Patients";
import SupportForm from "@/views/Support/SupportForm";
import UserRoles from "@/views/UserRoles/UserRoles";
import User from "@/views/Users/user";
import { BsCashCoin } from "react-icons/bs";
import {
  FaAddressBook,
  FaCalendar,
  FaHandsHelping,
  FaHome,
  FaHospital,
  FaUser,
  FaUserMd,
  FaUserShield,
} from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import Dashboard from "../views/Dashboard/Dashboard";
import RoleBasedRoute from "./RoleBasedRoute";

import Invoice from "@/views/Invoice/Invoice";
import MedicineTable from "@/views/Medicine/Medicine";
import MyHospital from "@/views/MyHospital/MyHospital";
import Package from "@/views/Package/Package";


// const icon = {
//   className: "w-5 h-5 text-inherit",
// };

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <FaHome />,
        name: "dashboard",
        path: "/home",
        element: (
          <RoleBasedRoute requiredAccess={{ collectionName: "dashboard" }}>
            <Dashboard />
          </RoleBasedRoute>
        ),
      },
      {
        icon: <FaUser />,
        name: "patients",
        path: "/patients",
        element: (
          <RoleBasedRoute requiredAccess={{ collectionName: "patients" }}>
            <Patients />
          </RoleBasedRoute>
        ),
      },
      {
        icon: <FaCalendar />,
        name: "appointments",
        path: "/appointment",
        element: (
          <RoleBasedRoute requiredAccess={{ collectionName: "appointments" }}>
            <Appointment />
          </RoleBasedRoute>
        ),
      },
      {
        icon: <FaUserMd />,
        name: "doctors",
        path: "/doctors",
        element: (
          <RoleBasedRoute requiredAccess={{ collectionName: "doctors" }}>
            <Doctor />
          </RoleBasedRoute>
        ),
      },
      {
        icon: <FaAddressBook />,
        name: "broadCasting",
        path: "/messageBroadcasting",
        element: (
          <RoleBasedRoute
            requiredAccess={{ collectionName: "messageBroadcasting" }}
          >
            <MessageBroadcasting />
          </RoleBasedRoute>
        ),
      },
      {
        icon: <FaHandsHelping />,
        name: "Technical Support",
        path: "/support",
        element: (
          <RoleBasedRoute requiredAccess={{ collectionName: "support" }}>
            <SupportForm />
          </RoleBasedRoute>
        ),
      },
      {
        icon: <FaUserShield />,
        name: "Users",
        path: "/users",
        element: (
          <RoleBasedRoute requiredAccess={{ collectionName: "users" }}>
            <User />
          </RoleBasedRoute>
        ),
      },
      {
        icon: <FaUsersGear />,
        name: "User access control",
        path: "/userrole",

        element: (
          <RoleBasedRoute requiredAccess={{ collectionName: "userroles" }}>
            <UserRoles />
          </RoleBasedRoute>
        ),
      },
      {
        icon: <BsCashCoin />,
        name: "Invoice",
        path: "/invoices",

        element: (
          <RoleBasedRoute requiredAccess={{ collectionName: "invoices" }}>
            <Invoice />
          </RoleBasedRoute>
        ),
      },
      {
        icon: <BsCashCoin />,
        name: "Package",
        path: "/package",

        element: (
          <RoleBasedRoute requiredAccess={{ collectionName: "package" }}>
            <Package />
          </RoleBasedRoute>
        ),
      },
      {
        icon: <BsCashCoin />,
        name: "Medicines",
        path: "/medicine",
        element: (
          <RoleBasedRoute requiredAccess={{ collectionName: "medicines" }}>
            <MedicineTable />
          </RoleBasedRoute>
        ),
      },
      {
        icon: <FaHospital />,
        name: "MyHospital",
        path: "/myhospital",
        element: (
          <RoleBasedRoute requiredAccess={{ collectionName: "myhospital" }}>
            <MyHospital />
          </RoleBasedRoute>
        ),
      },
    ],
  },
];

export default routes;
