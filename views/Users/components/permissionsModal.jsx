import { Button, Checkbox, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, updatePermissions } from "../../../redux/thunk/user";
import { toast } from "react-toastify";
import { getPermissionsThunk } from "../../../redux/thunk/login";

const PermissionModal = ({ open, toggler, user, currentPage, pageSize }) => {
  const [currentUserPermission, setCurrentUserPermissions] = useState([]);
  const [allSelected, setAllSelected] = useState({}); // State to track select/deselect all

  const dispatch = useDispatch();
  const permissionsList = useSelector((state) => state.UserSlice.allPermissions);

  const extractSubmodules = (data = []) => {
    let submoduleKeys = [];
    data.forEach((module) => {
      if (module.submodules) {
        module.submodules.forEach((submodule) => {
          submoduleKeys.push(submodule);
        });
      }
    });
    return submoduleKeys;
  };

  useEffect(() => {
    if (user.permissions) setCurrentUserPermissions(user.permissions);
  }, [user]);

  useEffect(() => {
    if (permissionsList) {
      const initialSelection = {};
      permissionsList.forEach((module, mi) => {
        if (module.submodules) {
          const allSubmodules = module.submodules.map((sub) => sub.submoduleKey);
          const selectedSubmodules = extractSubmodules(currentUserPermission);
          initialSelection[mi] = allSubmodules.every((key) => selectedSubmodules.includes(key));
        }
      });
      setAllSelected(initialSelection);
    }
  }, [permissionsList, currentUserPermission]);

  const updatePermissionHandler = (moduleIndex, subModuleIndex, isChecked) => {
    let temp = JSON.parse(JSON.stringify(currentUserPermission));
    if (temp.length === 0) {
      temp = [
        {
          moduleKey: "PATIENTS",
          submodules: []
        },
        {
          moduleKey: "APPOINTMENTS",
          submodules: []
        },
        {
          moduleKey: "MESSAGE_BROADCASTING",
          submodules: []
        },
        {
          moduleKey: "CUSTOMER_SUPPORT",
          submodules: []
        },
        {
          moduleKey: "USER_CONTROL",
          submodules: []
        }
      ];
    }
    if (isChecked) {
      const submoduleKeyToRemove = permissionsList[moduleIndex].submodules[subModuleIndex].submoduleKey;
      temp[moduleIndex].submodules = temp[moduleIndex].submodules.filter((submodule) => submodule !== submoduleKeyToRemove);
    } else {
      const submoduleKeyToAdd = permissionsList[moduleIndex].submodules[subModuleIndex].submoduleKey;
      temp[moduleIndex].submodules.push(submoduleKeyToAdd);
    }

    setCurrentUserPermissions(temp);
  };

  const handleToggleAll = (moduleIndex) => {
    setCurrentUserPermissions((prevPermissions) => {
      const newPermissions = JSON.parse(JSON.stringify(prevPermissions));
      const module = permissionsList[moduleIndex];
      const submoduleKeys = module.submodules.map((sub) => sub.submoduleKey);

      if (allSelected[moduleIndex]) {
        newPermissions[moduleIndex].submodules = [];
      } else {
        newPermissions[moduleIndex].submodules = submoduleKeys;
      }

      return newPermissions;
    });

    setAllSelected((prev) => ({ ...prev, [moduleIndex]: !allSelected[moduleIndex] }));
  };

  const submitHandler = () => {
    dispatch(updatePermissions({ _id: user._id, body: { permissionArray: currentUserPermission } }))
      .unwrap()
      .then((data) => {
        if (data?.success) {
          toast.success(data?.msg);
          dispatch(getAllUsers({ currentPage, pageSize }));
          if (localStorage.getItem("id")) dispatch(getPermissionsThunk(localStorage.getItem("id")));
          toggler();
          window.location.reload();
        }
      });
  };

  return (
    <Dialog open={open} handler={toggler} className="w-full">
      <DialogHeader className="flex justify-center">
        Permissions for <span className="text-blue-600 font-bold pl-2 uppercase">{user?.name}</span>
      </DialogHeader>
      <DialogBody className="flex flex-col gap-6 px-10 h-80 overflow-auto">
        {permissionsList &&
          permissionsList.map((module, mi) => (
            <div key={module.moduleKey} className="w-full mb-6">
              <div className="flex items-center justify-between">
                <Typography className="text-center font-bold text-red-700 underline">
                  {module.moduleName}
                </Typography>
                <Button color="blue" onClick={() => handleToggleAll(mi)}>
                  {allSelected[mi] ? "Deselect All" : "Select All"}
                </Button>
              </div>
              <div className="w-full">
                {module.submodules &&
                  module.submodules.map((subModule, si) => {
                    const isChecked = extractSubmodules(currentUserPermission).includes(subModule.submoduleKey);
                    return (
                      <div key={subModule._id} className="flex justify-between items-center mb-2">
                        <Typography className="font-semibold text-black">{subModule.submoduleName}</Typography>
                        <Checkbox onChange={() => updatePermissionHandler(mi, si, isChecked)} color="green" checked={isChecked} />
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
      </DialogBody>
      <DialogFooter className="flex justify-center">
        <Button color="red" onClick={() => toggler()} className="mr-3">
          Cancel
        </Button>
        <Button color="indigo" onClick={submitHandler}>
          Submit
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default PermissionModal;
