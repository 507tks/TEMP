import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import Logo from "../../assets/robodoc.png";

export function Sidenav({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType, openSidenav } = controller;
  const sidenavRef = useRef(null);
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "white shadow-sm",
  };

  const toggleSidenav = () => {
    setOpenSidenav(dispatch, !openSidenav);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidenavRef.current && !sidenavRef.current.contains(event.target)) {
        setOpenSidenav(dispatch, false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch]);

  return (
    <aside
      ref={sidenavRef}
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed bg-themeLight inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100 overflow-y-scroll`}
    >
      <div className="relative">
        <div className="flex justify-between items-center m-10">
          <div className="flex items-center">
            <img src={Logo} alt="Logo" className="h-15 w-12" />
            <h1 className="font-semibold text-xl">RoboSensy</h1>
          </div>
          <IconButton
            variant="text"
            color="white"
            size="sm"
            ripple={false}
            className="xl:hidden"
            onClick={toggleSidenav}
          >
            <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-black" />
          </IconButton>
        </div>
      </div>
      <div className="m-4">
        <ul className="mb-4 flex flex-col gap-1">
          {routes.map(({ layout, title, pages }, key) => (
            <li key={key} className="mx-3.5 mt-4 mb-2">
              <Typography
                variant="small"
                color={sidenavType === "dark" ? "white" : "blue-gray"}
                className="font-black uppercase opacity-75"
              >
                {title}
              </Typography>
              {pages.map(({ icon, name, path }) => (
                <NavLink
                  key={name}
                  to={`/${layout}${path}`}
                  onClick={() => {
                    if (window.innerWidth < 1024)
                      setOpenSidenav(dispatch, false);
                  }}
                >
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "gradient" : "text"}
                      color={
                        isActive
                          ? "blue"
                          : sidenavType === "dark"
                            ? "white"
                            : "blue-gray"
                      }
                      className="flex items-center gap-4 px-4 capitalize"
                      fullWidth
                    >
                      {icon}
                      <Typography
                        color="inherit"
                        className="font-medium capitalize"
                      >
                        {name}
                      </Typography>
                    </Button>
                  )}
                </NavLink>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "./robodoc.png",
  brandName: "RoboSensy",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
