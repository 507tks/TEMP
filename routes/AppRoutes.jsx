import Invoice from "@/views/Invoice/Invoice";
import { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getRoleById } from "../redux/thunk/userrole";
import AddPrescription from "../views/Appointments/AddPrescription";
import Appointment from "../views/Appointments/Appointment";
import MessageBroadcasting from "../views/Broadcasting/MessageBroadcasting";
import Dashboard from "../views/Dashboard/Dashboard";
import Doctor from "../views/Doctor/Doctor";
import Homepage from "../views/Homepage/v2/Homepage";
import AddInvoice from "../views/Invoice/AddInvoice";
import ForgotPassword from "../views/Login/ForgotPassword";
import MedicineTable from "../views/Medicine/Medicine";
import Patients from "../views/Patients/Patients";
import SupportForm from "../views/Support/SupportForm";
import FileUpload from "../views/uploadFile/page";
import UserRoles from "../views/UserRoles/UserRoles";
import Users from "../views/Users/user";
import PrivateRoute from "./privateRoutes";
import RoleBasedRoute from "./RoleBasedRoute";
import AddPatientPrescription from "@/views/Patients/AddPatientPrescription";

const Login = lazy(() => import("../views/Login/Login"));
const Error = lazy(() => import("../views/Error"));

const AppRoutes = () => {
  const authenticatedUser = useSelector(
    (state) => state.LoginSlice.authenticated,
  );
  const role = useSelector((state) => state.userrole?.userRole);

  const dispatch = useDispatch();
  const userRoleName = role?.roleName;

  useEffect(() => {
    if (localStorage.getItem("userRoleId"))
      dispatch(getRoleById(localStorage.getItem("userRoleId")));
  }, [localStorage.getItem("userRoleId")]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<ForgotPassword />} />
        <Route path="/file-upload" element={<FileUpload />} />

        {/* Protected Routes */}
        <Route
          path="/messageBroadcasting"
          element={
            <PrivateRoute isAuthenticated={authenticatedUser}>
              <RoleBasedRoute
                userRoleName={userRoleName}
                requiredAccess={{
                  collectionName: "messageBroadcasting",
                  access: "create",
                }}
              >
                <MessageBroadcasting />
              </RoleBasedRoute>
            </PrivateRoute>
          }
        />
        <Route path="/docupload" element={<FileUpload />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute isAuthenticated={authenticatedUser}>
              <RoleBasedRoute
                userRoleName={userRoleName}
                requiredAccess={{ collectionName: "dashboard", access: "read" }}
              >
                <Dashboard />
              </RoleBasedRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/inventory"
          element={
            <PrivateRoute isAuthenticated={authenticatedUser}>
              <RoleBasedRoute
                userRoleName={userRoleName}
                requiredAccess={{
                  collectionName: "inventories",
                  access: "read",
                }}
              >
                <MedicineTable />
              </RoleBasedRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/support"
          element={
            <PrivateRoute isAuthenticated={authenticatedUser}>
              <RoleBasedRoute
                userRoleName={userRoleName}
                requiredAccess={{ collectionName: "support", access: "create" }}
              >
                <SupportForm />
              </RoleBasedRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/patients"
          element={
            <PrivateRoute isAuthenticated={authenticatedUser}>
              <RoleBasedRoute
                userRoleName={userRoleName}
                requiredAccess={{ collectionName: "patients", access: "read" }}
              >
                <Patients />
              </RoleBasedRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/doctor"
          element={
            <PrivateRoute isAuthenticated={authenticatedUser}>
              <RoleBasedRoute
                userRoleName={userRoleName}
                requiredAccess={{ collectionName: "doctors", access: "read" }}
              >
                <Doctor />
              </RoleBasedRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <PrivateRoute isAuthenticated={authenticatedUser}>
              <RoleBasedRoute
                userRoleName={userRoleName}
                requiredAccess={{
                  collectionName: "appointments",
                  access: "create",
                }}
              >
                <Appointment />
              </RoleBasedRoute>
            </PrivateRoute>
          }
        />
        {/* <Route
          path="/patients/prescription/:patientId"
          element={
            <PrivateRoute isAuthenticated={authenticatedUser}>
              <RoleBasedRoute
                userRoleName={userRoleName}
                requiredAccess={{
                  collectionName: "prescription",
                  access: "create",
                }}
              >
                <AddPatientPrescription />
              </RoleBasedRoute>
            </PrivateRoute>
          }
        /> */}
        <Route
          path="/appointments/prescription/:appointmentId"
          element={
            <PrivateRoute isAuthenticated={authenticatedUser}>
              <RoleBasedRoute
                userRoleName={userRoleName}
                requiredAccess={{
                  collectionName: "prescription",
                  access: "create",
                }}
              >
                <AddPrescription />
              </RoleBasedRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/invoices"
          element={
            <PrivateRoute isAuthenticated={authenticatedUser}>
              <RoleBasedRoute
                userRoleName={userRoleName}
                requiredAccess={{ collectionName: "invoices", access: "read" }}
              >
                <Invoice />
              </RoleBasedRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/invoices/addInvoice"
          element={
            <PrivateRoute isAuthenticated={authenticatedUser}>
              <RoleBasedRoute
                userRoleName={userRoleName}
                requiredAccess={{
                  collectionName: "invoices",
                  access: "create",
                }}
              >
                <AddInvoice />
              </RoleBasedRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute isAuthenticated={authenticatedUser}>
              <RoleBasedRoute
                userRoleName={userRoleName}
                requiredAccess={{ collectionName: "users", access: "read" }}
              >
                <Users />
              </RoleBasedRoute>
            </PrivateRoute>
          }
        />
        <Route
          path="/userrole"
          element={
            <PrivateRoute isAuthenticated={authenticatedUser}>
              <RoleBasedRoute
                userRoleName={userRoleName}
                requiredAccess={{ collectionName: "userroles", access: "read" }}
              >
                <UserRoles />
              </RoleBasedRoute>
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Error />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Suspense>
  );
};

export default AppRoutes;
