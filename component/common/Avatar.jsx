import React from "react";
import male from "../../assets/male.jpg";
import female from "../../assets/female.jpg";
import { FaUserCircle } from "react-icons/fa";

function Avatar({ gender, styles = "w-8 h-8 rounded-full cursor-pointer" }) {
  let src;
  if (gender === "FEMALE") {
    src = female;
  } else if (gender === "MALE") {
    src = male;
  } else {
    return <FaUserCircle className={styles} />;
  }
  return <img src={src} alt="thumbnail" className={styles} />;
}

export default Avatar;
