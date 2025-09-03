import React from "react";
import { motion } from "framer-motion";
import img from "../../../assets/ess.png"
const services = [
  {
    title: "Attendance and Leave Management",
    content: "Manage your attendance with biometrics, apply for leaves, and regularize entries in real time.",
  },
  {
    title: "Claims and Reimbursements",
    content: "Log trips, upload bills, and get travel reimbursements faster.",
  },
  {
    title: "Bulk Payslip",
    content: "Instantly send bulk payslips within minutes.",
  },
  {
    title: "Dedicated Helpdesk",
    content: "Raise HR issues and get timely responses from the support desk — at no extra cost.",
  },
  {
    title: "Recruitment Model",
    content: "Customize your recruitment workflow — from application to onboarding — at your convenience.",
  },
];

const ESSSection = () => {
  return (
    <div className="bg-gradient-to-tr from-yellow-100 to-white py-16 px-6 lg:px-24 flex flex-col-reverse lg:flex-row items-center gap-12 transition-all duration-700">
      
      {/* Left Content */}
      <div className="w-full lg:w-1/2">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Employee Self Service
        </h2>
        <p className="text-gray-600 mb-6 text-lg">
          Experience excellence with a single-window view through{" "}
          <span className="font-semibold text-blue-600"><h1 className="text-2xl font-bold text-gray-800"><span className='N text-red-500 si'>N</span>etlifyCon- H<span className='H text-blue-700'>R</span></h1></span>.
        </p>

        <div className="space-y-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-white hover:bg-yellow-50 p-5 rounded-2xl shadow-md hover:shadow-xl cursor-pointer transform hover:scale-[1.02] transition"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{service.title}</h3>
              <p className="text-gray-600">{service.content}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right Hero Image */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full lg:w-1/2 flex justify-center"
      >
        <img
          src={img} // replace with actual image path
          alt="Hero Team Collaboration"
          className="rounded-3xl shadow-4xl max-h-[450px] object-cover"
        />
      </motion.div>
    </div>
  );
};

export default ESSSection;
