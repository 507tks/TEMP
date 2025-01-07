//Main Route
import { Dashboard } from "@/layouts";
import PatientAppointment from "@/views/Appointments/PatientAppointment";
import AddInvoice from "@/views/Invoice/AddInvoice";
import ForgotPassword from "@/views/Login/ForgotPassword";
import FileUpload from "@/views/UploadDoc/Page";
import { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Homepage from "../views/Homepage/v2/Homepage";
import PrivateRoute from "./privateRoutes";
import AddPatientPrescription from "@/views/Patients/AddPatientPrescription";
import { verifyToken, regenerateAuthTokenThunk } from "@/redux/thunk/login";
import ScheduleSessions from "@/views/Patients/ScheduleSessions";

const Login = lazy(()   => import("../views/Login/Login"));
const Error = lazy(() => import("../views/Error"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyToken());
    dispatch(regenerateAuthTokenThunk());
  }, [dispatch]);

  const authenticatedUser = useSelector((state) => state.LoginSlice.authenticated);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/forget-password" element={<ForgotPassword />} />
        <Route exact path="/FileUpload" element={<FileUpload />} />

        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute isAuthenticated={authenticatedUser}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/patients/:appointmentId"
          element={
            <>
              <PrivateRoute isAuthenticated={authenticatedUser}>
                <PatientAppointment />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="/prescription/:patientId"
          element={
            <>
              <PrivateRoute isAuthenticated={authenticatedUser}>
                <AddPatientPrescription />
              </PrivateRoute>
            </>
          }
        />
        <Route
          path="/sessions/:patientId"
          element={
            <>
              <PrivateRoute isAuthenticated={authenticatedUser}>
                <ScheduleSessions />
              </PrivateRoute>
            </>
          }
        />

        <Route
          exact
          path="/dashboard/invoices/addInvoice"
          element={
            <PrivateRoute isAuthenticated={authenticatedUser}>
              <AddInvoice />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Error />} />
      </Routes>
    </Suspense>
  );
}

export default App;
