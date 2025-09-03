import React from "react";
import {
  ShieldCheck,
  Gift,
  BadgeCheck,
  FolderOpen,
  Wallet,
  Bot,
} from "lucide-react";

const services = [
  {
    title: "HRMS",
    icon: <ShieldCheck className="w-8 h-8 text-white" />,
    gradient: "from-indigo-500 to-purple-600",
    description: "Comprehensive HR solutions tailored to your organization.",
  },
  {
    title: "PAYROLL",
    icon: <Gift className="w-8 h-8 text-white" />,
    gradient: "from-pink-500 to-red-500",
    description: "Fast, secure payroll processing with full compliance.",
  },
  {
    title: "Background Verification",
    icon: <BadgeCheck className="w-8 h-8 text-white" />,
    gradient: "from-green-500 to-teal-500",
    description: "Hire confidently with verified candidate screening.",
  },
  {
    title: "Bulk Recruitment",
    icon: <FolderOpen className="w-8 h-8 text-white" />,
    gradient: "from-yellow-400 to-orange-500",
    description: "Smart, high-volume recruitment to scale teams faster.",
  },
  {
    title: "Payroll Outsource",
    icon: <Wallet className="w-8 h-8 text-white" />,
    gradient: "from-cyan-500 to-blue-500",
    description: "End-to-end payroll operations managed by experts.",
  },
  {
    title: "Chatbot & Web Tech",
    icon: <Bot className="w-8 h-8 text-white" />,
    gradient: "from-rose-500 to-pink-600",
    description: "AI chatbots & automation tools for smarter HR ops.",
  },
];

const ServicesCard = () => {
  return (
    <section id="service" className="py-20 bg-gray-50 ">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 relative inline-block group">
          OUR SERVICES
          <span className="block h-[3px] w-0 bg-indigo-500 group-hover:w-full transition-all duration-500"></span>
        </h2>
        <p className="mt-4 text-gray-600 text-lg">
          All-in-one HR services designed for growth and reliability.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4">
        {services.map((service, i) => (
          <div
            key={i}
            className="group bg-white border border-gray-100 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 relative overflow-hidden"
          >
            {/* Glow Layer */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-white/0 to-indigo-20 pointer-events-none" />

            {/* Icon */}
            <div
              className={`bg-gradient-to-r ${service.gradient} w-14 h-14 flex items-center justify-center rounded-full mb-4 shadow-lg`}
            >
              {service.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {service.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesCard;
