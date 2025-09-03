import React from "react";
import { Link, NavLink } from "react-router";
import { IoMdPersonAdd } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import BookDemoPopup from "../Main/Navbar2/Navbar2";

import Nlogo from "../../../assets/Only N icon.png";
import BookDemoModal from "../Main/Navbar2/Navbar2";


// components/ScrollLink.js
import { useNavigate, useLocation } from "react-router-dom";

const ScrollLink = ({ scrollToId, children, className }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname === "/") {
      const el = document.getElementById(scrollToId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/", { state: { scrollToId } });
    }
  };

  return (
    <li className={className} onClick={handleClick}>
      {children}
    </li>
  );
};

const Navbar = () => {
  return (
    <div className="font-sans fixed top-0 w-full z-50 ">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-3 shadow-md bg-white">
        <div className="flex items-center gap-3">
          <Link to="/">
            <img width={90} src={Nlogo} alt="logo" className="h-20" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">
            <span className="N text-red-500 si">N</span>etlifyCon- H
            <span className="H text-blue-700">R</span>
          </h1>
        </div>
        <ul className="flex gap-6 items-center text-gray-800 font-medium">
          <Link to="/">
            <li className="hover:text-blue-600 cursor-pointer">Home</li>
          </Link>
           
          <ScrollLink
            scrollToId="service"
            className="hover:text-blue-600 cursor-pointer"
          >
            Services
          </ScrollLink>

          <li className=" hover:text-blue-600 relative group cursor-pointer">
            <NavLink to="/Contactus">Contact</NavLink>
          </li>
          <Link to="/about">
            <li className="hover:text-blue-600 cursor-pointer">About Us</li>
          </Link>

          <Link to="/login">
            <li className="flex hover:text-blue-600 items-center gap-1 cursor-pointer">
              <span className=" hover:text-blue-600 material-icons"></span>{" "}
              <IoMdPersonAdd /> Log In
            </li>
          </Link>

          <li>
            <button>
              <NavLink>
                <BookDemoModal></BookDemoModal>
              </NavLink>
            </button>
          </li>
        </ul>
      </nav>

      {/* Rest of your website structure remains unchanged */}
    </div>
  );
};

export default Navbar;
