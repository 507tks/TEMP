import React from "react";
import logo from "../../assets/robodoc.png";
import { useNavigate } from "react-router-dom";

const HomepageHeader = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };
  return (
    <header className="flex justify-between items-center px-4 py-6 bg-white text-white sticky top-0 drop-shadow-lg">
      <div className="flex items-center lg:pl-20">
        <img src={logo} alt="Logo" className="h-10 w-auto mr-2" />
        <h1 className="text-lg font-bold text-blue-500">RoboSensy</h1>
      </div>
      <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleClick}>
        Login
      </button>
    </header>
  );
};

export default HomepageHeader;
