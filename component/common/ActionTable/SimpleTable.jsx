import { useNavigate } from "react-router-dom";
import { getDate, getTime } from "../../../utils/dateHelper";

export const SimpleTable = ({ heading, keys, tableData }) => {

    const navigate = useNavigate()
    return (
        <table className="w-full text-sm border rounded-lg">
            <thead className="text-sm font-semibold bg-custom-theme text-white">
                <tr className="text-center">
                    {heading.map((heading, i) => (
                        <th key={i} className="px-6 py-3">
                            {heading}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {tableData && tableData.length > 0 ? (
                    tableData.map((data, index) => (
                        <tr
                            onClick={() => navigate(`/patients/${data._id}`, { state: data })}
                            key={index}
                            className="bg-white border-b cursor-pointer dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600  text-center font-medium text-black">
                            {keys &&
                                keys.map((key, i) => {
                                    if (i === 0) return null; // Skip the first column
                                    if (keys[0] === 'appointmentModal' && key === 'date') return <td key={i} className="w-auto  ">{getDate(data.date) + ',' + getTime(data.date)}</td>

                                    if (keys[0] === 'appointmentModal' && key === 'doctor') {
                                        return (

                                            <td className="w-auto" key={i}>
                                                <div className="flex items-center">

                                                    <span>{data.doctorId.name || "-"}</span>
                                                </div>
                                            </td>
                                        );
                                    }
                                    if (keys[0] === 'appointmentModal' && key === 'departmentId') {
                                        return (
                                            <td className="w-auto  " key={i}>
                                                {data?.departmentId?.name || "-"}
                                            </td>
                                        );
                                    }
                                    return (
                                        <td key={i} className="px-6 py-4 w-auto text-center ">
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
            </tbody>
        </table>
    );
};
