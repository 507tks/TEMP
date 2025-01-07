import React, { useState } from 'react'
import { ActionHandler, genderHandler, getStatusColor } from './TableFunctions';
import { FaUserCircle } from 'react-icons/fa';
import { getDate, getDepartmentNames, getTime, toMMMDDYYY } from '@/utils/dateHelper';
import moment from 'moment';

function Table({
  heading,
  keys,
  tableData,
  actions,
  pageInfo,
  selectedRow,
  // loading = false,
  loggedInUserId,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  // const [selectedImage, setSelectedImage] = useState("");

  const toggleModal = (imageUrl) => {
    // setSelectedImage(imageUrl);
    setModalOpen(!modalOpen);
  };

  // const cellWidthMap = {
  //   name: "w-[300px]",
  //   createdAt: "w-[150px]",
  //   quantity: "w-[100px]",
  //   serial: "w-[100px]",
  //   status: "w-[150px]",
  //   date: "w-[150px]",
  //   phone: "w-[150px]",
  //   time: "w-[150px]",
  //   patient: "w-[300px]",
  //   doctor: "w-[150px]",
  //   departments: "w-[200px]",
  //   patientId: "w-[150px]",
  //   address: "w-[200px]",
  //   roleName: "w-[200px]",
  //   roleAccess: "w-[200px]",
  // };

  return (
    <>
      <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              {heading?.map((heading, i) => (
                <th
                  key={i}
                  className="p-4 border-b border-slate-200 bg-slate-50"
                >
                  <p className="text-sm font-normal leading-none text-slate-500">
                    {heading}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData && tableData.length > 0 ? (
              tableData.map((data, index) => (
                <tr className="hover:bg-slate-50 border-b border-slate-200">
                  {keys &&
                    keys.map((key, i) => {
                      if (i === 0) return;

                      // const cellClass =
                      //   "px-2 py-1 text-center border-r overflow-hidden";
                      // const cellWidth = cellWidthMap[key] || "w-[120px]";

                      if (keys[0] === "appointment" && key === "action") {
                        return (
                          <td
                            className="p-4 py-5"
                            key={`appointment-action-${i}`}
                          >
                            <ActionHandler
                              actions={actions}
                              selectedRow={selectedRow}
                              data={data}
                              src="appointment"
                            />
                          </td>
                        );
                      }

                      if (key === "action") {
                        return (
                          <td className={`p-4 py-5`} key={`action-${i}`}>
                            <ActionHandler
                              actions={actions}
                              selectedRow={selectedRow}
                              data={data}
                            />
                          </td>
                        );
                      }

                      if (keys[0] === "patient" && key === "name") {
                        return (
                          <td key={`patient-name-${i}`} className={`p-4 py-5`}>
                            <div className="flex gap-1 items-center relative group">
                              {data.profilePic ? (
                                <img
                                  src={data.thumbnail}
                                  alt="thumbnail"
                                  className="w-8 h-8 rounded-full cursor-pointer"
                                  onClick={() => toggleModal(data.profilePic)}
                                />
                              ) : (
                                <FaUserCircle className="w-8 h-8 rounded-full cursor-pointer" />
                              )}
                              <p className="text-sm w-fit overflow-hidden overflow-ellipsis whitespace-nowrap group-hover:whitespace-normal group-hover:bg-gray-200 group-hover:p-1">
                                {data[key].charAt(0).toUpperCase() +
                                  data[key].slice(1)}
                              </p>
                            </div>
                          </td>
                        );
                      }

                      if (keys[0] === "appointment" && key === "patient") {
                        return (
                          <td key={`name-${i}`} className={`p-4 py-5`}>
                            <div className="flex gap-1 items-center relative group">
                              <p className="text-sm w-fit overflow-hidden overflow-ellipsis whitespace-nowrap group-hover:whitespace-normal group-hover:bg-gray-200 group-hover:p-1">
                                {data[key][0]?.name.charAt(0).toUpperCase() +
                                  data[key][0].name.slice(1)}
                              </p>
                            </div>
                          </td>
                        );
                      }
                      if (keys[0] === "appointment" && key === "doctor") {
                        return (
                          <td key={`name-${i}`} className={`p-4 py-5`}>
                            <div className="flex gap-1 items-center relative group">
                              <p className="text-sm w-fit overflow-hidden overflow-ellipsis whitespace-nowrap group-hover:whitespace-normal group-hover:bg-gray-200 group-hover:p-1">
                                {data[key][0]?.name.charAt(0).toUpperCase() +
                                  data[key][0].name.slice(1)}
                              </p>
                            </div>
                          </td>
                        );
                      }
                      if (keys[0] === "allUsers" && key === "name") {
                        return (
                          <td key={`name-${i}`} className={`p-4 py-5`}>
                            <div className="flex gap-1 items-center relative group">
                              <p className="text-sm w-fit overflow-hidden overflow-ellipsis whitespace-nowrap group-hover:whitespace-normal group-hover:bg-gray-200 group-hover:p-1">
                                {data[key].charAt(0).toUpperCase() +
                                  data[key].slice(1)}
                              </p>
                            </div>
                          </td>
                        );
                      }

                      if (keys[0] === "invoice" && key === "customerName") {
                        return (
                          <td key={`name-${i}`} className={`p-4 py-5`}>
                            <div className="flex gap-1 items-center relative group">
                              <p className="text-sm w-fit overflow-hidden overflow-ellipsis whitespace-nowrap group-hover:whitespace-normal group-hover:bg-gray-200 group-hover:p-1">
                                {data[key].charAt(0).toUpperCase() +
                                  data[key].slice(1)}
                              </p>
                            </div>
                          </td>
                        );
                      }

                      if (
                        keys[0] === "viewPrescription" &&
                        key === "createdAt"
                      ) {
                        return (
                          <td key={i} className={`p-4 py-5`}>
                            {moment(data[key]).format("MMM DD YYYY hh:mm A")}
                          </td>
                        );
                      }

                      if (keys[0] === "patient" && key === "gender") {
                        return (
                          <React.Fragment key={`patient-gender-${i}`}>
                            {genderHandler(data[key])}
                          </React.Fragment>
                        );
                      }

                      if (keys[0] === "patient" && key === "dob") {
                        return (
                          <td key={i} className={`p-4 py-5`}>
                            {toMMMDDYYY(data[key])}
                          </td>
                        );
                      }

                      if (keys[0] === "inventory" && key === "quantity") {
                        return (
                          <td key={i} className={`p-4 py-5`}>
                            {data[key] ?? "-"}
                          </td>
                        );
                      }

                      if (keys[0] === "appointment" && key === "serial") {
                        const { currentPage, pageSize } = pageInfo;
                        return (
                          <td key={i} className={`p-4 py-5`}>
                            {currentPage * pageSize + index + 1}
                          </td>
                        );
                      }

                      if (keys[0] === "patient" && key === "serial") {
                        const { currentPage, pageSize } = pageInfo;
                        return (
                          <td key={i} className={`p-4 py-5`}>
                            {currentPage * pageSize + index + 1}
                          </td>
                        );
                      }

                      if (keys[0] === "invoice" && key === "serial") {
                        const { currentPage, pageSize } = pageInfo;

                        return (
                          <td key={i} className={`p-4 py-5`}>
                            {currentPage * pageSize + index + 1}
                          </td>
                        );
                      }

                      if (
                        keys[0] === "invoice" &&
                        (key === "invoiceDate" || key === "invoiceDueDate")
                      ) {
                        return (
                          <td key={i} className={`p-4 py-5`}>
                            {data[key]
                              ? moment(data[key]).format("DD-MM-YYYY")
                              : "N/A"}
                          </td>
                        );
                      }

                      if (key === "manufacturingDate" || key === "expiryDate") {
                        return (
                          <td key={i} className={`p-4 py-5`}>
                            {moment(data[key]).format("MMM DD YYYY")}
                          </td>
                        );
                      }
                      if (keys[0] === "allUsers" && key === "serial") {
                        const { currentPage, pageSize } = pageInfo;
                        return (
                          <td key={i} className={`p-4 py-5`}>
                            {currentPage * pageSize + index + 1}
                          </td>
                        );
                      }

                      if (keys[0] === "allUsers" && key === "name") {
                        return (
                          <td key={`name-${i}`} className={`p-4 py-5`}>
                            <div className="flex gap-1 items-center relative group">
                              <p className="text-sm w-fit overflow-hidden overflow-ellipsis whitespace-nowrap group-hover:whitespace-normal group-hover:bg-gray-200 group-hover:p-1">
                                {data[key]}{" "}
                                {data._id === loggedInUserId ? "( You )" : ""}
                              </p>
                            </div>
                          </td>
                        );
                      }

                      if (keys[0] === "medicine" && key === "serial") {
                        const { currentPage, pageSize } = pageInfo;
                        return (
                          <td key={i} className={`p-4 py-5`}>
                            {currentPage * pageSize + index + 1}
                          </td>
                        );
                      }
                      if (keys[0] === "appointment" && key === "status") {
                        return (
                          <React.Fragment key={`appointment-status-${i}`}>
                            {getStatusColor(data[key])}
                          </React.Fragment>
                        );
                      }

                      if (keys[0] === "appointment" && key === "date") {
                        return (
                          <td key={i} className={`p-4 py-5`}>
                            {getDate(data[key])}
                          </td>
                        );
                      }

                      if (keys[0] === "appointment" && key === "phone") {
                        return (
                          <td key={i} className={`p-4 py-5`}>
                            {data?.patient[0]?.phone}
                          </td>
                        );
                      }

                      if (keys[0] === "appointment" && key === "time") {
                        return (
                          <td key={i} className={`p-4 py-5`}>
                            {getTime(data.date)}
                          </td>
                        );
                      }

                      if (keys[0] === "appointment" && key === "patient") {
                        return (
                          <td key={i} className={`p-4 py-5`}>
                            <div className="flex gap-1 items-center relative group">
                              {data?.patient[0]?.profilePic ? (
                                <img
                                  src={data.patient[0].thumbnail}
                                  alt=""
                                  className="w-8 h-8 rounded-full cursor-pointer"
                                  onClick={() =>
                                    toggleModal(data.patient[0].profilePic)
                                  }
                                />
                              ) : (
                                <FaUserCircle className="w-8 h-8 rounded-full cursor-pointer" />
                              )}
                              <span className="text-sm truncate">
                                {data[key][0].name || "-"}
                              </span>
                              <div className="absolute left-0 top-full mt-1 w-max p-2 bg-white text-black rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                {data[key][0].name || "-"}
                              </div>
                            </div>
                          </td>
                        );
                      }

                      if (
                        keys[0] === "appointment" &&
                        (key === "doctor" || key === "departments")
                      ) {
                        return (
                          <td key={i} className={`p-4 py-5`}>
                            {data[key][0].name || "-"}
                          </td>
                        );
                      }

                      if (keys[0] === "appointment" && key === "patientId") {
                        return (
                          <td key={i} className={`p-4 py-5`}>
                            {data?.patient[0]?.patientId || "-"}
                          </td>
                        );
                      }

                      if (keys[0] === "appointmentModal" && key === "doctor") {
                        return (
                          <td key={i} className={`p-4 py-5`}>
                            {data.doctorId.name || "-"}
                          </td>
                        );
                      }

                      if (keys[0] === "patient" && key === "departments") {
                        return (
                          <td key={i} className={`p-4 py-5`}>
                            {getDepartmentNames(data[key]) || "-"}
                          </td>
                        );
                      }

                      if (key === "address") {
                        const { state, city, pin } = data;
                        return (
                          <td key={i} className={`p-4 py-5`}>
                            <span className="truncate">{`${state || ""}, ${city || ""}, ${pin || ""}`}</span>
                            <span className="absolute left-0 top-full mt-1 w-max p-2 bg-white text-black rounded-lg shadow-lg opacity-0 hover:opacity-100 transition-opacity duration-300 z-10">{`${state || ""}, ${city || ""}, ${pin || ""}`}</span>
                          </td>
                        );
                      }
                      if (keys[0] === "roleManagement" && key === "roleName") {
                        return (
                          <td key={i} className={`p-4 py-5`}>
                            {data[key] || "-"}
                          </td>
                        );
                      }

                      if (
                        keys[0] === "roleManagement" &&
                        key === "roleAccess"
                      ) {
                        return (
                          <td key={i} className={`p-4 py-5`}>
                            {data[key] === "all" ? (
                              "All Access"
                            ) : (
                              <ul className="list-disc pl-5">
                                {data[key].map((access) => (
                                  <li key={access.collectionName}>
                                    {access.collectionName}:{" "}
                                    {access.accessList.join(", ")}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </td>
                        );
                      }

                      if (keys[0] === "roleManagement" && key === "serial") {
                        const { currentPage, pageSize } = pageInfo;
                        return (
                          <td key={i} className={`p-4 py-5`}>
                            {currentPage * pageSize + index + 1}
                          </td>
                        );
                      }

                      return (
                        <td key={i} className={`p-4 py-5`}>
                          {data[key] || "-"}
                        </td>
                      );
                    })}

                
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="text-center py-2 font-bold text-black"
                  colSpan={heading.length}
                >
                  No data found
                </td>
              </tr>
            )}
            {/* <tr className="hover:bg-slate-50 border-b border-slate-200">
              <td className="p-4 py-5">
                <p className="block font-semibold text-sm text-slate-800">
                  PROJ1001
                </p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">John Doe</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">$1,200.00</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">2024-08-01</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">2024-08-15</p>
              </td>
            </tr>
            <tr className="hover:bg-slate-50 border-b border-slate-200">
              <td className="p-4 py-5">
                <p className="block font-semibold text-sm text-slate-800">
                  PROJ1002
                </p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">Jane Smith</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">$850.00</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">2024-08-05</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">2024-08-20</p>
              </td>
            </tr>
            <tr className="hover:bg-slate-50 border-b border-slate-200">
              <td className="p-4 py-5">
                <p className="block font-semibold text-sm text-slate-800">
                  PROJ1003
                </p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">Acme Corp</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">$2,500.00</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">2024-08-07</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">2024-08-21</p>
              </td>
            </tr>
            <tr className="hover:bg-slate-50 border-b border-slate-200">
              <td className="p-4 py-5">
                <p className="block font-semibold text-sm text-slate-800">
                  PROJ1004
                </p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">Global Inc</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">$4,750.00</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">2024-08-10</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">2024-08-25</p>
              </td>
            </tr> */}
          </tbody>
        </table>

     
      </div>
    </>
  );
}

export default Table