import { Input } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { hasAccess } from "../../utils/helpers";

const MedicineHeader = ({ searchHandler, setAddMedicineModal, count, handleSortByName, sortButtonColor, isSortButtonDisabled }) => {
   const role = useSelector((state) => state.userrole?.userRole);


  const hasAddMedicinePermission = hasAccess(role, "medicines", "ADD_MEDICINE");
 
  return (
    <div>
      <h1 className="font-bold text-[23px] mb-5">Medicine Inventory</h1>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div className="flex w-full sm:w-[40%] bg-white mb-4 sm:mb-0">
          <Input label="Search" color="blue" placeholder="Search by generic name/brand name" onChange={(e) => searchHandler(e.target.value)} />
        </div>
        <span className="font-bold mb-4 sm:mb-0">Total medicines: {count}</span>

        {hasAddMedicinePermission && (
          <button type="button" className="border h-10 bg-theme text-white px-4 text-sm rounded-md" onClick={() => setAddMedicineModal(true)}>
            Add Medicine
          </button>
        )}
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          className={`border h-10 ${sortButtonColor} text-white px-4 text-sm rounded-md`} // Apply dynamic color
          onClick={handleSortByName}
          disabled={isSortButtonDisabled}
        >
          Sort by Brand Name
        </button>
      </div>
    </div>
  );
};

export default MedicineHeader;
