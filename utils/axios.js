import axios from "axios";
import { emitter } from "./eventEmitter";
import { toast } from "react-toastify";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    config.headers["x-auth-token"] = token;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const customId = "custom-id-yes";
    toast.error(error.response.data.error.message,{
      toastId: customId
    });
    if (error.response.data.error.message === "Token has been expired. Kindly Relogin!") emitter.emit("logout");
    return Promise.reject(error);
  }
);

export { axios };
