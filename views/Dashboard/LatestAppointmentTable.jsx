import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appointmentThunk } from "@/redux/thunk/appointments";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
// Import useRouter from Next.js for navigation

const LatestAppointmentTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useRouter for navigation

  useEffect(() => {
    dispatch(
      appointmentThunk({
        search: "",
        status: "",
        pageSize: "10", // Fetch 10 but show only 5
        pageIndex: "1",
        sortBy: "date",
        sortType: "-1",
        date: "",
      }),
    );
  }, [dispatch]);

  const appointments = useSelector(
    (state) =>
      state.AppointmentSlice?.allAppoinments?.allAppoinments?.appointmentList ||
      [],
  );

  // Limit the displayed data to the first 5 appointments
  const limitedAppointments = appointments.slice(0, 3);

  return (
    <div className="flex flex-col justify-center px-7 py-8 text-black bg-violet-50 rounded-3xl max-w-[524px] max-md:px-5">
      <h2 className="text-2xl font-bold mb-4">Appointment Chart</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto text-left max-md:max-w-full">
          <thead>
            <tr className="text-gray-600">
              <th className="px-4 py-2">Bio</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Time</th>
             
              
            </tr>
          </thead>
          <tbody>
            {limitedAppointments.map((appointment) => {
              const { patient, date, status, departments } = appointment;
              const [patientInfo] = patient;
              const [department] = departments;

              return (
                <tr key={appointment._id} className="border-b">
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-300 rounded-full">
                        {" "}
                        {patientInfo?.profilePic ? (
                          <img
                            src={patientInfo.profilePic}
                            alt="Patient"
                            className="w-12 h-12 rounded-full border-2 border-gray-300"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                            <FaUserCircle className="w-12 h-12" />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-semibold">
                         
                          {patientInfo.name
                            ? patientInfo.name
                                .charAt(0)
                                .toUpperCase() +
                              patientInfo.name.slice(1)
                            : ""}
                        </div>
                        <div className="text-sm text-gray-500">
                          {patientInfo.age} years old
                        </div>
                        <div className="text-sm text-gray-500 capitalize">
                          {patientInfo.gender.toLowerCase()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex flex-col items-center space-x-3">
                      <div className="text-green-600">Today</div>
                      <div>{new Date(date).toLocaleDateString()}</div>
                      <div>
                        <span
                          className={`px-2 py-1 rounded-full text-white ${
                            status === "Completed"
                              ? "bg-green-500"
                              : status === "Ongoing"
                                ? "bg-yellow-500"
                                : "bg-blue-500"
                          }`}
                        >
                          {status}
                        </span>
                      </div>
                      {department.name}
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="text-gray-800">
                      {new Date(date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      -{" "}
                      {new Date(date + 3600000).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* View More Button */}
      <div className="text-right mt-4">
        <button
          onClick={() => navigate.push("/appointment")}
          className="text-blue-600 hover:underline"
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default LatestAppointmentTable;
