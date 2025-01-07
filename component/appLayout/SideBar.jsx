import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaUser, FaCalendar, FaUserMd, FaHandsHelping, FaAddressBook } from "react-icons/fa";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./Sidebar.css";
import { FaUserShield } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../redux/thunk/user";

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [routesLoaded, setRoutesLoaded] = useState(false);
  const [routes, setRoutes] = useState([
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <FaHome />
    },
    {
      path: "/patients",
      name: "Patients",
      icon: <FaUser />
    },
    {
      path: "/appointments",
      name: "Appointments",
      icon: <FaCalendar />
    },
    {
      path: "/doctor",
      name: "Doctors",
      icon: <FaUserMd />
    }
  ]);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.UserSlice.userDetails);

  useEffect(() => {
    dispatch(getUserDetails());
  }, []);

  useEffect(() => {
    if (userDetails) {
      let updatedRoutes = routes;
      if (userDetails?.permissions?.[2]?.submodules[0] === "ALLOW_BROADCASTING") {
        const newRoute = {
          path: "/messageBroadcasting",
          name: "BroadCasting",
          icon: <FaAddressBook />
        };
        const routeExists = updatedRoutes.some((route) => route.path === newRoute.path);
        if (!routeExists) {
          updatedRoutes.push(newRoute);
        }
      }
      if (userDetails?.permissions?.[3]?.submodules[0] === "ALLOW_SUPPORT") {
        const newRoute = {
          path: "/support",
          name: "Support Care",
          icon: <FaHandsHelping />
        };
        const routeExists = updatedRoutes.some((route) => route.path === newRoute.path);
        if (!routeExists) {
          updatedRoutes.push(newRoute);
        }
      }
      if (userDetails?.permissions?.[4]?.submodules[0] === "USER_CONTROL") {
        const newRoute = {
          path: "/users",
          name: "Users",
          icon: <FaUserShield className="text-xl" />
        };
        const routeExists = updatedRoutes.some((route) => route.path === newRoute.path);
        if (!routeExists) {
          updatedRoutes.push(newRoute);
        }
      }
      setRoutes(updatedRoutes);
      setRoutesLoaded(true);
    }
  }, [userDetails]);

  const toggle = () => {
    if (window.innerWidth > 768) {
      setIsOpen(!isOpen);
    } else {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Set initial state based on window width
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.2
      }
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="main-container h-full bottom-0 shadow-lg">
      <motion.div
        animate={{
          width: isOpen ? "200px" : "60px",
          transition: {
            duration: 1,
            type: "spring",
            damping: 10
          }
        }}
        className={`sidebar`}
      >
        <div className="top_section mt-2">
          <div className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {routesLoaded && (
          <section className="routes">
            {routes.map((route, index) => {
              return (
                <NavLink to={route.path} key={index} className="link" activeClassName="active">
                  <div className="icon" style={{ marginTop: "5px" }}>
                    {route.icon}
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div variants={showAnimation} initial="hidden" animate="show" exit="hidden" className="link_text">
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        )}
      </motion.div>

      <motion.div
        animate={{
          marginInlineStart: isOpen ? "12rem" : "4rem",
          transition: {
            duration: 1,
            type: "spring",
            damping: 9
          }
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SideBar;
