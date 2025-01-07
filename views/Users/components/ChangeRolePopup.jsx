import { changeUserRole, getAllRoles } from "@/redux/thunk/userrole";
import { Dialog, Card, CardBody, Typography, Select, Option, CardFooter } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";


function ChangeRolePopup({ open, toggler, userId }) {
  const [selectedRole, setSelectedRole] = useState("");
  const [roleError, setRoleError] = useState({ bool: false, message: "" });

  const dispatch = useDispatch();
  const allRoles = useSelector((state) => state.userrole?.allRoles);

  useEffect(() => {
    if (open) {
      dispatch(getAllRoles());
    }
  }, [open, dispatch]);

  const handleRoleChange = (value) => {
    const role = allRoles.find((r) => r.roleName === value);
    if (role) {
      setSelectedRole(role._id);
    } else {
      setSelectedRole("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedRole === "") {
      setRoleError({ bool: true, message: "*Please select a role" });
      return;
    }
    try {
      await dispatch(changeUserRole({ userId, userRoleId: selectedRole })).unwrap();
      toggler(); 
      setSelectedRole(""); 
    } catch (error) {
      toast.error(error.message || "Failed to update user role.");
    }
  };

  return (
    <Dialog size="xs" open={open} handler={toggler} className="shadow-none">
      <Card className="mx-auto w-full max-w-[24rem]">
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h4" color="black">
            Change User Role
          </Typography>

          <Typography className="mb-2 text-black" variant="h6">
            Select New Role
          </Typography>
          <Select color="blue" className="" label="Role Name" value={allRoles.find((role) => role._id === selectedRole)?.roleName || "dagagvd"} onChange={(e) => handleRoleChange(e)}>
            <div className="overflow-y-scroll h-40">
            {allRoles && allRoles.length > 0 ? (
              allRoles.map((role) => (
                <Option key={role._id} value={role.roleName}>
                  {role.roleName}
                </Option>
              ))
            ) : (
              <Option disabled>No roles available</Option>
              )}
              </div>
          </Select>

          {/* Show the selected role or the list of roles */}
          <div className="mt-4">
            <Typography color="black" variant="h6">Selected Role:</Typography>
            {selectedRole ? <p className="text-blue-gray-700">{allRoles.find((role) => role._id === selectedRole)?.roleName || "No role selected"}</p> : <p className="text-blue-gray-500">No role selected</p>}
          </div>

          {roleError.bool && <p className="text-red-500 text-sm mt-1">{roleError.message}</p>}
        </CardBody>

        <CardFooter className="pt-0">
          <button onClick={handleSubmit} className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-700">
            Change Role
          </button>
        </CardFooter>
      </Card>
    </Dialog>
  );
}

export default ChangeRolePopup;
