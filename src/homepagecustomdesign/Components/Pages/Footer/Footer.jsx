import React from "react";
import {
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";
import { Link, NavLink } from "react-router";
import EmailForm from "../Button/latest/Latest";
import footerLogo from "../../../assets/Footerlogo.png";
const Footer = () => {
  return (
    <div>
      <footer className="bg-white  py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Products */}
          <div>
            <h3 className="text-lg font-bold mb-4">Products</h3>
            <ul className="space-y-2 text-gray-600">
              {[
                "HR Software",
                "Core HR",
                "Recruitment",
                "Attendance",
                "Payroll",
                "Engagement",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-orange-500 transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Fundamentals */}
          <div>
            <h3 className="text-lg font-bold mb-4">NetlifyCon Fundamentals</h3>
            <ul className="space-y-3 text-gray-600">
              <li>
                <span className="cursor-pointer hover:text-orange-500 transition-colors duration-200">
                  <NavLink to="/Contactus">Contact</NavLink>
                </span>
              </li>
              <li>
                <NavLink to="/TermsConditions">
                  <span className="cursor-pointer hover:text-orange-500 transition-colors duration-200">
                    <a href="#terms2"> Terms & Conditions </a>
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/PrivacyPolicy">
                  <span className="cursor-pointer hover:text-orange-500 transition-colors duration-200">
                    Privacy
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/legal">
                  {" "}
                  <span className="cursor-pointer hover:text-orange-500 transition-colors duration-200">
                    Legal
                  </span>
                </NavLink>
              </li>
              <li className="cursor-pointer hover:text-orange-500 transition-colors duration-200">
                <NavLink to="/Cookie">
                  {" "}
                  <span>Cookie Policy</span>
                </NavLink>
              </li>
              <li className="cursor-pointer hover:text-orange-500 transition-colors duration-200">
                <NavLink to="/Antispam">
                  <span>Anti-spam Policy</span>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Stay Updated */}
          <div>
            <EmailForm></EmailForm>
          </div>
        </div>
      </footer>
      <footer className="bg-[#f2f4f7] text-gray-800 w-full py-6 px-4">
        {/* Social Icons
      <div className="flex justify-center space-x-6 mb-4 text-2xl">
        <FaXTwitter className="hover:text-blue-500 cursor-pointer" />
        <FaFacebookF className="hover:text-blue-600 cursor-pointer" />
        <FaYoutube className="hover:text-red-500 cursor-pointer" />
        <FaLinkedinIn className="hover:text-blue-700 cursor-pointer" />
        <FaInstagram className="hover:text-pink-500 cursor-pointer" />
      </div> */}

        {/* <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-center">
        <span>Netlifycon Home</span>
        
        <span className="hidden sm:inline">|</span>
        <span>Security</span>
        <span className="hidden sm:inline">|</span>
        <span>Compliance</span>
        
    
        <span className="hidden sm:inline">|</span>
        <span>Terms of Service</span>
        <span className="hidden sm:inline">|</span>
        <span>Data Policy</span>
        
        
        <span className="hidden sm:inline">|</span>
        <span>Abuse Policy</span>
      </div> */}
      </footer>
      <div className="bg-[#08091A] text-gray-300 w-full">
        <div className="flex flex-col items-center justify-center py-6 space-y-3">
          <a href="#footer2">
            {" "}
            <img src={footerLogo} width={80} alt="footerLogo" />
          </a>
          <p className="text-sm text-center px-2">
            © 2025, Netlifycon. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
