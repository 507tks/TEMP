import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticationHandler, clearLoginData } from "../redux/slice/login";
import { emitter } from "../utils/eventEmitter";
import { getPermissionsThunk } from "../redux/thunk/login";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const PrivateRoute = ({ children, isAuthenticated }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (userId) {
      dispatch(getPermissionsThunk(userId));
    }
  }, [dispatch]);

  useEffect(() => {
    const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userRole");
      dispatch(clearLoginData());
      dispatch(authenticationHandler(false));
    };

    emitter.on("logout", handleLogout);

    return () => {
      emitter.off("logout", handleLogout);
    };
  }, [dispatch]);

  if (!isAuthenticated) {
    toast.error("Unauthorized access");

    return (
      <>
        <ToastContainer />
        <Navigate to="/" replace />
      </>
    );
  }

  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
};

export default PrivateRoute;
