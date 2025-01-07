import "./Homepage.css";
import { useNavigate, Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { IoListSharp } from "react-icons/io5";
import {  useSelector } from "react-redux";
// import { TfiPencilAlt } from "react-icons/tfi";
// import { MdOutlineDashboard } from "react-icons/md";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const isWideScreen = windowWidth > 850;
  const navigate = useNavigate();

  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const section = document.querySelector(hash);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClickOutside = (event) => {
    if (
      sidebar &&
      !isWideScreen &&
      !document.querySelector(".sidebar-menu").contains(event.target) &&
      !document.querySelector(".sidebar-icons").contains(event.target)
    ) {
      setSidebar(false);
    }
  };

  useEffect(() => {
    if (!isWideScreen) {
      if (sidebar && !isWideScreen) {
        document.addEventListener("mousedown", handleClickOutside);
      } else if (!isWideScreen) {
        document.removeEventListener("mousedown", handleClickOutside);
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [sidebar,isWideScreen,handleClickOutside]);
  const authenticated = useSelector((state) => state.LoginSlice.authenticated);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

 

  return (
    <>
      {isWideScreen ? (
        <>
          <nav className="navbar-wideScreen">
            <div
              className="logo"
              onClick={() => navigate(`/dashboard`)}
              style={{ marginLeft: "30px" }}
            >
              {" "}
              RoboSensy
            </div>
            <ul className="nav-links" style={{ marginRight: "50px" }}>
              <li>
                <Link to="/#home">Home</Link>
              </li>
              <li>
                <Link to="/#services">Services</Link>
              </li>
              <li>
                <Link to="/#testimonials">Feedback</Link>
              </li>
              {/* <li>
                <Link to="/project">Blog</Link>
              </li> */}
              <li>
                <Link to="/#contact">Contact</Link>
              </li>
              <li>
                {authenticated ? (
                  <Link to="/dashboard/home">Dashboard</Link>
                ) : (
                  <Link to="/login">SignIn/Login</Link>
                )}
              </li>
            </ul>
          </nav>
        </>
      ) : (
        <>
          <div style={{ maxWidth: "100vw" }}>
            <div className="navbar">
              <Link to="#" className="sidebar-icons">
                <FaBars onClick={showSidebar} />
              </Link>
            </div>
            <nav className={sidebar ? "sidebar-menu active" : "sidebar-menu"}>
              <ul className="sidebar-menu-items" onClick={showSidebar}>
                <li className="sidebar-toggle">
                  <Link to="#" className="sidebar-icons">
                    <IoMdClose style={{ color: "black" }} />
                  </Link>
                </li>
                <li className="list-items">
                  <Link to="#">
                    <IoListSharp style={{ color: "black" }} />
                    <span className="custom-span" style={{ color: "black" }}>
                      Home
                    </span>
                  </Link>
                </li>
                <li className="list-items">
                  <Link to="#">
                    <IoListSharp style={{ color: "black" }} />
                    <span className="custom-span" style={{ color: "black" }}>
                      Services
                    </span>
                  </Link>
                </li>
                <li className="list-items">
                  <Link to="#">
                    <IoListSharp style={{ color: "black" }} />
                    <span className="custom-span" style={{ color: "black" }}>
                      Demo
                    </span>
                  </Link>
                </li>
                <li className="list-items">
                  <Link to="#">
                    <IoListSharp style={{ color: "black" }} />
                    <span className="custom-span" style={{ color: "black" }}>
                      Blog
                    </span>
                  </Link>
                </li>
                <li className="list-items">
                  <Link to="#">
                    <IoListSharp style={{ color: "black" }} />
                    <span className="custom-span" style={{ color: "black" }}>
                      Contact
                    </span>
                  </Link>
                </li>
                <li className="list-items" onClick={() => navigate("/login")}>
                  {/* <Link to="#"> */}
                  <CiLogout style={{ color: "black" }} />
                  <span className="custom-span" style={{ color: "black" }}>
                    SignIn/LogIn
                  </span>
                  {/* </Link> */}
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </>
  );
}

export default Navbar;
