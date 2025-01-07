import { Dialog, Card, CardBody, Typography, Input, CardFooter, Select, Option } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../redux/thunk/user";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { getAllRoles, registerUser } from "../../../redux/thunk/userrole";

function PopupForm({ open, toggler, currentPage, pageSize }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [roleName, setRoleName] = useState("");
  const [userRoleId, setUserRoleId] = useState(""); // State to store the userRoleId

  const [labelError, setLabelError] = useState({ bool: false, message: "" });
  const [nameError, setNameError] = useState({ bool: false, message: "" });
  const [userError, setUsernameError] = useState({ bool: false, message: "" });
  const [passwordError, setPasswordError] = useState({ bool: false, message: "" });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const allRole = useSelector((state) => state.userrole?.allRoles);

  const handleRoleNameChange = (event) => {
    const selectedRoleName = event;
    const selectedRole = allRole.find((role) => role.roleName === selectedRoleName);

    if (selectedRole) {
      setRoleName(selectedRoleName);
      setUserRoleId(selectedRole._id); // Store userRoleId
    } else {
      setRoleName("");
      setUserRoleId("");
    }
  };

  useEffect(() => {
    if (open) {
      dispatch(getAllRoles());
    }
  }, [open, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === "") {
      setNameError({ bool: true, message: "*Indicates a required field" });
      return;
    }
    if (userRoleId === "") {
      setLabelError({ bool: true, message: "*Indicates a required field" });
      return;
    }
    if (email === "") {
      setUsernameError({ bool: true, message: "*Indicates a required field" });
      return;
    }
    if (password === "") {
      setPasswordError({ bool: true, message: "*Indicates a required field" });
      return;
    }

    const body = {
      name,
      userRoleId,
      email,
      password
    };

    dispatch(registerUser(body))
      .unwrap()
      .then((data) => {
        toast.success(data?.msg);
        dispatch(getAllUsers({ currentPage, pageSize }));
        toggler();
        setEmail("");
        setPassword("");
        setName("");
        setRoleName("");
        setUserRoleId(""); // Reset userRoleId
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <Dialog size="xs" open={open} handler={toggler} className="shadow-none">
      <Card className="mx-auto w-full max-w-[24rem]">
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h4" color="blue-gray">
            Add User
          </Typography>
          <Typography className="-mb-2" variant="h6">
            Name
          </Typography>
          <Input color="blue" label="Name" size="lg" value={name} required onChange={(e) => setName(e.target.value)} />
          {nameError.bool && <p className="text-red-500 text-sm mt-1">{nameError.message}</p>}

          <Typography className="-mb-2" variant="h6">
            Role Name
          </Typography>
          <Select color="blue" label="Role Name" value={roleName} onChange={(value) => handleRoleNameChange(value)}>
            {allRole && allRole.length > 0 ? (
              allRole.map((role) => (
                <Option key={role._id} value={role.roleName}>
                  {role.roleName}
                </Option>
              ))
            ) : (
              <Option disabled>No roles available</Option>
            )}
          </Select>
          {labelError.bool && <p className="text-red-500 text-sm mt-1">{labelError.message}</p>}

          <Typography className="-mb-2" variant="h6">
            Email
          </Typography>
          <Input color="blue" label="Email" size="lg" value={email} required onChange={(e) => setEmail(e.target.value)} />
          {userError.bool && <p className="text-red-500 text-sm mt-1">{userError.message}</p>}

          <Typography className="-mb-2" variant="h6" security="password">
            Password
          </Typography>
          <div className="relative">
            <Input color="blue" label="Password" required size="lg" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-3" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          {passwordError.bool && <p className="text-red-500 text-sm mt-1">{passwordError.message}</p>}
        </CardBody>
        <CardFooter className="pt-0">
          <button onClick={handleSubmit} className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-700">
            Add
          </button>
        </CardFooter>
      </Card>
    </Dialog>
  );
}

export default PopupForm;
