import Avatar from "@/component/common/Avatar";
import { getDate, getTime } from "@/utils/dateHelper";
import { Button, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PatientDetailsNavbar = ({ patient }) => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between px-6 py-4 bg-white">
        <button
          onClick={() => window.history.back()}
          className="text-gray-600 text-2xl"
        >
          <FaArrowLeft />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Prescription Page</h1>
        <div></div>
      </div>
      <div className="bg-gradient-to-r w-full from-blue-500 to-indigo-500 text-black py-2 px-6 shadow-lg flex items-center justify-between">
        <div className="flex items-center space-x-6 ip:gap-10">
          {patient?.profilePic ? (
            <img
              src={patient?.profilePic}
              alt={`${patient?.name}'s profile`}
              className="w-16 h-16 rounded-full border-2 border-white shadow-md"
            />
          ) : (
            <Avatar
              gender={patient?.gender}
              styles="w-16 h-16 rounded-full border-2 border-white shadow-md"
            />
          )}

          {/* Patient Information */}
          <div>
            <span>
              <span className=" flex items-center  text-md capitalize">
                {patient?.name}, {patient?.gender} ||{" "}
                {patient?.age ? patient.age + "yr" : ""}
              </span>
            </span>
            <p className="text-md">
              {patient?.phone && (
                <span>
                  Phone: <span className="font-medium">{patient?.phone}</span>
                </span>
              )}
            </p>
            <p className="text-md">
              {patient?.email && (
                <span>
                  Email: <span className="font-medium">{patient?.email}</span>
                </span>
              )}
            </p>
            <p className="text-md">
              {patient?.address && (
                <span>
                  Address:{" "}
                  <span className="font-medium">{patient?.address}</span>
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-right"></div>
      </div>
    </div>
  );
};

export default PatientDetailsNavbar;
