import React from "react";
import {
  Navbar,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenSidenav,
} from "@/context";
import { clearLoginData, authenticationHandler } from "../../redux/slice/login";
import { emitter } from "../../utils/eventEmitter";

import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";

export function DashboardNavbar({ inputField }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  // const { pathname } = useLocation();
  // const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const reduxDispatch = useDispatch();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRoleId");
    localStorage.removeItem("hospitalId");
    localStorage.removeItem("userName");
    reduxDispatch(clearLoginData());
    reduxDispatch(authenticationHandler(false));
    emitter.emit("logout");
  };

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="flex items-center gap-5">
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
          {inputField}
        </div>

        <div className="flex items-center ">
          <Menu placement="bottom-end">
            <MenuHandler>
              <div>
                <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
              </div>
            </MenuHandler>
            <MenuList className="p-2">
              <MenuItem
                onClick={logoutHandler}
                className="flex items-center gap-2"
              >
                <span>Logout</span>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
