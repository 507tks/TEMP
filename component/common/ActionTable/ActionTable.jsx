import { Spinner } from "@material-tailwind/react";
import moment from "moment";
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { getDate, getDepartmentNames, getTime, toMMMDDYYY } from "../../../utils/dateHelper";
import ImageModal from "../ImageModal";
import { ActionHandler, genderHandler, getStatusColor } from "./TableFunctions";

export const ActionTable = ({ heading, keys, tableData, actions, pageInfo, selectedRow, loading = false, loggedInUserId }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");

    const toggleModal = (imageUrl) => {
        setSelectedImage(imageUrl);
        setModalOpen(!modalOpen);
    };

    const cellWidthMap = {
        name: "w-[300px]",
        createdAt: "w-[150px]",
        quantity: "w-[100px]",
        serial: "w-[100px]",
        status: "w-[150px]",
        date: "w-[150px]",
        phone: "w-[150px]",
        time: "w-[150px]",
        patient: "w-[300px]",
        doctor: "w-[150px]",
        departments: "w-[200px]",
        patientId: "w-[150px]",
        address: "w-[200px]",
        roleName: "w-[200px]",
        roleAccess: "w-[200px]",
    };

    return (
        <>
            <table className="w-full text-sm border rounded-lg table-auto border-separate border-spacing-0">
                <thead className="text-sm font-semibold bg-custom-theme text-white">
                    <tr className="text-center">
                        {heading.map((heading, i) => (
                            <th key={i} className="px-2 py-1 text-center border-r border-white">
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr className="h-24">
                            <td colSpan={heading.length}>
                                <div className="flex justify-center">
                                    <Spinner className="h-8 w-8" color="purple" />
                                </div>
                            </td>
                        </tr>
                    ) : (
                        <>
                            {tableData && tableData.length > 0 ? (
                                tableData.map((data, index) => (
                                    <tr key={index} className="bg-white h-10 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 font-medium text-black relative">
                                        {keys &&
                                            keys.map((key, i) => {
                                                if (i === 0) return;

                                                const cellClass = "px-2 py-1 text-center border-r overflow-hidden";
                                                const cellWidth = cellWidthMap[key] || "w-[120px]";

                                                if (keys[0] === "appointment" && key === "action") {
                                                    return (
                                                        <td key={`appointment-action-${i}`}>
                                                            <ActionHandler actions={actions} selectedRow={selectedRow} data={data} src="appointment" />
                                                        </td>
                                                    );
                                                }

                                                if (key === "action") {
                                                    return (
                                                        <td className={`flex justify-center items-center h-[40px]`} key={`action-${i}`}>
                                                            <ActionHandler actions={actions} selectedRow={selectedRow} data={data} />
                                                        </td>
                                                    );
                                                }

                                                if (keys[0] === "patient" && key === "name") {
                                                    return (
                                                        <td
                                                            key={`patient-name-${i}`}
                                                            className={`${cellClass} ${cellWidth} text-left whitespace-nowrap relative`}
                                                        >
                                                            <div className="flex gap-1 items-center relative group">
                                                                {data.profilePic ? (
                                                                    <img
                                                                        src={
                                                                            data.thumbnail
                                                                        }
                                                                        alt="thumbnail"
                                                                        className="w-8 h-8 rounded-full cursor-pointer"
                                                                        onClick={() =>
                                                                            toggleModal(
                                                                                data.profilePic,
                                                                            )
                                                                        }
                                                                    />
                                                                ) : (
                                                                    <FaUserCircle className="w-8 h-8 rounded-full cursor-pointer" />
                                                                )}
                                                                <p className="text-sm w-fit overflow-hidden overflow-ellipsis whitespace-nowrap group-hover:whitespace-normal group-hover:bg-gray-200 group-hover:p-1">

                                                                    {data[key]
                                                                        .charAt(0)
                                                                        .toUpperCase() +
                                                                        data[key].slice(
                                                                            1,
                                                                        )}
                                                                </p>
                                                            </div>
                                                        </td>
                                                    );
                                                }

                                                if (
                                                    keys[0] === "appointment" &&
                                                    key === "patient"
                                                ) {


                                                    return (
                                                        <td
                                                            key={`name-${i}`}
                                                            className={`${cellClass} ${cellWidth} text-left whitespace-nowrap relative`}
                                                        >
                                                            <div className="flex gap-1 items-center relative group">
                                                                <p className="text-sm w-fit overflow-hidden overflow-ellipsis whitespace-nowrap group-hover:whitespace-normal group-hover:bg-gray-200 group-hover:p-1">
                                                                    {data[key][0]?.name
                                                                        .charAt(0)
                                                                        .toUpperCase() +
                                                                        data[
                                                                            key
                                                                        ][0].name.slice(
                                                                            1,
                                                                        )}
                                                                </p>
                                                            </div>
                                                        </td>
                                                    );
                                                }
                                                if (
                                                    keys[0] === "appointment" &&
                                                    key === "doctor"
                                                ) {


                                                    return (
                                                        <td
                                                            key={`name-${i}`}
                                                            className={`${cellClass} ${cellWidth} text-left whitespace-nowrap relative`}
                                                        >
                                                            <div className="flex gap-1 items-center relative group">
                                                                <p className="text-sm w-fit overflow-hidden overflow-ellipsis whitespace-nowrap group-hover:whitespace-normal group-hover:bg-gray-200 group-hover:p-1">
                                                                    {data[key][0]?.name
                                                                        .charAt(0)
                                                                        .toUpperCase() +
                                                                        data[
                                                                            key
                                                                        ][0].name.slice(
                                                                            1,
                                                                        )}
                                                                </p>
                                                            </div>
                                                        </td>
                                                    );
                                                }
                                                if (
                                                    keys[0] === "allUsers" &&
                                                    key === "name"
                                                ) {
                                                    return (
                                                        <td
                                                            key={`name-${i}`}
                                                            className={`${cellClass} ${cellWidth} text-left whitespace-nowrap relative`}
                                                        >
                                                            <div className="flex gap-1 items-center relative group">
                                                                <p className="text-sm w-fit overflow-hidden overflow-ellipsis whitespace-nowrap group-hover:whitespace-normal group-hover:bg-gray-200 group-hover:p-1">
                                                                    {data[key]
                                                                        .charAt(0)
                                                                        .toUpperCase() +
                                                                        data[
                                                                            key
                                                                        ].slice(1)}
                                                                </p>
                                                            </div>
                                                        </td>
                                                    );
                                                }

                                                if (
                                                    keys[0] === "invoice" &&
                                                    key === "customerName"
                                                ) {
                                                    return (
                                                        <td
                                                            key={`name-${i}`}
                                                            className={`${cellClass} ${cellWidth} text-left whitespace-nowrap relative`}
                                                        >
                                                            <div className="flex gap-1 items-center relative group">
                                                                <p className="text-sm w-fit overflow-hidden overflow-ellipsis whitespace-nowrap group-hover:whitespace-normal group-hover:bg-gray-200 group-hover:p-1">
                                                                    {data[key]
                                                                        .charAt(0)
                                                                        .toUpperCase() +
                                                                        data[key].slice(1)}
                                                                </p>
                                                            </div>
                                                        </td>
                                                    );
                                                }

                                                if (keys[0] === "viewPrescription" && key === "createdAt") {
                                                    return (
                                                        <td key={i} className={`${cellClass} ${cellWidth} whitespace-nowrap`}>
                                                            {moment(data[key]).format("MMM DD YYYY hh:mm A")}
                                                        </td>
                                                    );
                                                }

                                                if (keys[0] === "patient" && key === "gender") {
                                                    return <React.Fragment key={`patient-gender-${i}`}>{genderHandler(data[key])}</React.Fragment>;
                                                }

                                                if (keys[0] === "patient" && key === "dob") {
                                                    return (
                                                        <td key={i} className={`${cellClass} ${cellWidth} whitespace-nowrap`}>
                                                            {toMMMDDYYY(data[key])}
                                                        </td>
                                                    );
                                                }

                                                if (keys[0] === "inventory" && key === "quantity") {
                                                    return (
                                                        <td key={i} className={`${cellClass} ${cellWidth} whitespace-nowrap`}>
                                                            {data[key] ?? "-"}
                                                        </td>
                                                    );
                                                }

                                                if (keys[0] === "appointment" && key === "serial") {
                                                    const { currentPage, pageSize } = pageInfo;
                                                    return (
                                                        <td key={i} className={`${cellClass} ${cellWidth} whitespace-nowrap`}>
                                                            {currentPage * pageSize + index + 1}
                                                        </td>
                                                    );
                                                }


                                                if (keys[0] === "patient" && key === "serial") {
                                                    const { currentPage, pageSize } = pageInfo;
                                                    return (
                                                        <td key={i} className={`${cellClass} ${cellWidth} whitespace-nowrap`}>
                                                            {currentPage * pageSize + index + 1}
                                                        </td>
                                                    );
                                                }

                                                if (keys[0] === "invoice" && key === "serial") {
                                                    const { currentPage, pageSize } = pageInfo;

                                                    return (
                                                        <td key={i} className={`${cellClass} ${cellWidth} whitespace-nowrap`}>
                                                            {currentPage * pageSize + index + 1}
                                                        </td>
                                                    );
                                                }

                                                if (keys[0] === "invoice" && (key === "invoiceDate" || key === "invoiceDueDate")) {
                                                    return (
                                                        <td key={i} className={`${cellClass} ${cellWidth} whitespace-nowrap`}>
                                                            {data[key] ? moment(data[key]).format("DD-MM-YYYY") : "N/A"}
                                                        </td>
                                                    );
                                                }

                                                if (key === "manufacturingDate" || key === "expiryDate") {
                                                    return (
                                                        <td key={i} className={`${cellClass} ${cellWidth} whitespace-nowrap`}>
                                                            {moment(data[key]).format("MMM DD YYYY")}
                                                        </td>
                                                    );
                                                }
                                                if (keys[0] === "allUsers" && key === "serial") {
                                                    const { currentPage, pageSize } = pageInfo;
                                                    return (
                                                        <td key={i} className={`${cellClass} ${cellWidth} whitespace-nowrap`}>
                                                            {currentPage * pageSize + index + 1}
                                                        </td>
                                                    );
                                                }

                                                if (keys[0] === "allUsers" && key === "name") {
                                                    return (
                                                        <td key={`name-${i}`} className={`${cellClass} ${cellWidth} text-left whitespace-nowrap relative`}>
                                                            <div className="flex gap-1 items-center relative group">
                                                                <p className="text-sm w-fit overflow-hidden overflow-ellipsis whitespace-nowrap group-hover:whitespace-normal group-hover:bg-gray-200 group-hover:p-1">
                                                                    {data[key]} {data._id === loggedInUserId ? "( You )" : ""}
                                                                </p>
                                                            </div>
                                                        </td>
                                                    );
                                                }


                                                if (keys[0] === "medicine" && key === "serial") {
                                                    const { currentPage, pageSize } = pageInfo;
                                                    return (
                                                        <td key={i} className={`${cellClass} ${cellWidth} whitespace-nowrap`}>
                                                            {currentPage * pageSize + index + 1}
                                                        </td>
                                                    );
                                                }
                                                if (keys[0] === "appointment" && key === "status") {
                                                    return <React.Fragment key={`appointment-status-${i}`}>{getStatusColor(data[key])}</React.Fragment>;
                                                }

                                                if (keys[0] === "appointment" && key === "date") {
                                                    return (
                                                        <td key={i} className={`${cellClass} ${cellWidth} whitespace-nowrap`}>
                                                            {getDate(data[key])}
                                                        </td>
                                                    );
                                                }

                                                if (keys[0] === "appointment" && key === "phone") {
                                                    return (
                                                        <td key={i} className={`${cellClass} ${cellWidth} whitespace-nowrap`}>
                                                            {data?.patient[0]?.phone}
                                                        </td>
                                                    );
                                                }

                                                if (keys[0] === "appointment" && key === "time") {
                                                    return (
                                                        <td key={i} className={`${cellClass} ${cellWidth} whitespace-nowrap`}>
                                                            {getTime(data.date)}
                                                        </td>
                                                    );
                                                }

                                                if (keys[0] === "patient" && key === "lastVisit") {
                                                    return (
                                                        <td key={i} className={`${cellClass} ${cellWidth} whitespace-nowrap`}>
                                                            {data.lastVisit ? moment(data.lastVisit).format("MMM DD, YYYY") : "-"}
                                                        </td>
                                                    );
                                                }

                                                if (keys[0] === "appointment" && key === "patient") {
                                                    return (
                                                        <td key={i} className={`${cellClass} ${cellWidth} whitespace-nowrap`}>
                                                            <div className="flex gap-1 items-center relative group">
                                                                {data?.patient[0]?.profilePic ? <img src={data.patient[0].thumbnail} alt="" className="w-8 h-8 rounded-full cursor-pointer" onClick={() => toggleModal(data.patient[0].profilePic)} /> : <FaUserCircle className="w-8 h-8 rounded-full cursor-pointer" />}
                                                                <span className="text-sm truncate">{data[key][0].name || "-"}</span>
                                                                <div className="absolute left-0 top-full mt-1 w-max p-2 bg-white text-black rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">{data[key][0].name || "-"}</div>
                                                            </div>
                                                        </td>
                                                    );
                                                }

                                                if (keys[0] === "appointment" && (key === "doctor" || key === "departments")) {
                                                    return (
                                                        <td key={i} className={`${cellClass} ${cellWidth} whitespace-nowrap`}>
                                                            {data[key][0].name || "-"}
                                                        </td>
                                                    );
                                                }

                                                if (keys[0] === "appointment" && key === "patientId") {
                                                    return (
                                                        <td key={i} className={`${cellClass} ${cellWidth} whitespace-nowrap`}>
                                                            {data?.patient[0]?.patientId || "-"}
                                                        </td>
                                                    );
                                                }

                                                if (keys[0] === "appointmentModal" && key === "doctor") {
                                                    return (
                                                        <td key={i} className={`${cellClass} ${cellWidth} whitespace-nowrap`}>
                                                            {data.doctorId.name || "-"}
                                                        </td>
                                                    );
                                                }

                                                if (keys[0] === "patient" && key === "departments") {
                                                    return (
                                                        <td key={i} className={`${cellClass} ${cellWidth} whitespace-nowrap`}>
                                                            {getDepartmentNames(data[key]) || "-"}
                                                        </td>
                                                    );
                                                }


                                                if (key === "address") {
                                                    const { state, city, pin } = data;
                                                    return (
                                                        <td key={i} className={`${cellClass} ${cellWidth} whitespace-nowrap relative`}>
                                                            <span className="truncate">{`${state || ""}, ${city || ""}, ${pin || ""}`}</span>
                                                            <span className="absolute left-0 top-full mt-1 w-max p-2 bg-white text-black rounded-lg shadow-lg opacity-0 hover:opacity-100 transition-opacity duration-300 z-10">{`${state || ""}, ${city || ""}, ${pin || ""}`}</span>
                                                        </td>
                                                    );
                                                }
                                                if (keys[0] === "roleManagement" && key === "roleName") {
                                                    return (
                                                        <td key={i} className={`${cellClass} ${cellWidth} whitespace-nowrap`}>
                                                            {data[key] || "-"}
                                                        </td>
                                                    );
                                                }

                                                if (keys[0] === "roleManagement" && key === "roleAccess") {
                                                    return (
                                                        <td key={i} className="px-6 py-4 text-sm whitespace-nowrap">
                                                            {data[key] === "all" ? (
                                                                "All Access"
                                                            ) : (
                                                                <ul className="list-disc pl-5">
                                                                    {data[key].map((access) => (
                                                                        <li key={access.collectionName}>
                                                                            {access.collectionName}: {access.accessList.join(", ")}
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
                                                        <td key={i} className={`${cellClass} ${cellWidth} whitespace-nowrap`}>
                                                            {currentPage * pageSize + index + 1}
                                                        </td>
                                                    );
                                                }

                                                return (
                                                    <td key={i} className={`${cellClass} ${cellWidth} whitespace-nowrap capitalize`}>
                                                        {data[key] || "-"}
                                                    </td>
                                                );
                                            })}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="text-center py-2 font-bold text-black" colSpan={heading.length}>
                                        No data found
                                    </td>
                                </tr>
                            )}
                        </>
                    )}
                </tbody>
            </table>
            <ImageModal open={modalOpen} toggleModal={toggleModal} imageUrl={selectedImage} />
        </>
    );
};
