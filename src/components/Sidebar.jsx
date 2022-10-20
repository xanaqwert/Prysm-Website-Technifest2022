import React from "react";
import { BiHomeAlt } from "react-icons/bi";
import { MdOutlineExplore } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
function Sidebar() {
  return (
    <div className="sidenav">
      <h1 className="logo">Prysm.</h1>
      <a href="#about">
        {" "}
        <BiHomeAlt className="icon" />
        Home
      </a>
      <a href="#services">
        {" "}
        <MdOutlineExplore className="icon" />
        Explore
      </a>
      <a href="#clients">
        <FaRegUserCircle className="icon" />
        Profile
      </a>

      <img
        src="https://i.ibb.co/6sKqXGr/juicy-team-discussing-the-project.png"
        alt="juicy-team-discussing-the-project"
        border="0"
        className="img-diskusi"
        width={200}
      />
    </div>
  );
}

export default Sidebar;
