import {
  Building,
  Clock,
  DollarSign,
  FileText,
  Menu,
  MessageCircle,
  Shield,
  Star,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const HRMSLandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const services = [
    {
      title: "HRMS",
      description: "Comprehensive HR solutions tailored to your organization.",
      icon: Users,
      color: "from-red-500 to-red-600",
    },
    {
      title: "PAYROLL",
      description: "Fast, secure payroll processing with full compliance.",
      icon: DollarSign,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Background Verification",
      description: "Hire confidently with verified candidate screening.",
      icon: Shield,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Bulk Recruitment",
      description: "Smart, high-volume recruitment to scale teams faster.",
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Payroll Outsource",
      description: "End-to-end payroll operations managed by experts.",
      icon: FileText,
      color: "from-red-500 to-blue-500",
    },
    {
      title: "Chatbot & Web Tech",
      description: "AI chatbots & automation tools for smarter HR ops.",
      icon: MessageCircle,
      color: "from-green-500 to-blue-500",
    },
  ];

  const features = [
    {
      title: "Attendance and Leave Management",
      description:
        "Manage your attendance with biometrics, apply for leaves, and regularize entries in real time.",
      icon: Clock,
    },
    {
      title: "Claims and Reimbursements",
      description:
        "Log trips, upload bills, and get travel reimbursements faster.",
      icon: DollarSign,
    },
    {
      title: "Bulk Payslip",
      description: "Instantly send bulk payslips within minutes.",
      icon: FileText,
    },
    {
      title: "Dedicated Helpdesk",
      description:
        "Raise HR issues and get timely responses from the support desk — at no extra cost.",
      icon: MessageCircle,
    },
    {
      title: "Recruitment Model",
      description:
        "Customize your recruitment workflow — from application to onboarding — at your convenience.",
      icon: Users,
    },
  ];

  const testimonials = [
    {
      name: "Avimannu Shukla",
      position: "Sr.Manager(HR)@MJ Royal",
      content:
        "It gives us great features at a price we can afford. No extra charges, Totally customized Software, just a smart and budget-friendly solution.",
    },
    {
      name: "Disha Rakshit",
      position: "General Manager@ Prime Logistics",
      content:
        "From payroll format to attendance reports, everything was modified just the way we wanted. It feels like the software was built for us — not the other way around.",
    },
    {
      name: "Raha Gupta",
      position: "ADM @Techwens Services",
      content:
        "Even the smallest features we asked for — like a custom joining checklist — were added quickly. No other company gives this much flexibility.",
    },
    {
      name: "Amit Ranjan Bhatt",
      position: "Manger(HR)@ Canva Prime Steel Pvt ltd",
      content:
        "The best part? We didn't have to adjust to the software — the software adjusted to us. It's user-friendly, affordable, and fully customizable.",
    },
  ];

  const stats = [
    { number: "1000+", label: "Users Across to Pan India" },
    { number: "2000+", label: "Visitors" },
    { number: "10+", label: "Products" },
    { number: "5+", label: "Cities Served" },
    { number: "4+", label: "Years in Business" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                NetlifyCon
              </span>
            </div>

            <nav className="hidden md:flex space-x-8">
              <a
                href="#services"
                className="text-gray-700 hover:text-red-600 transition-colors"
              >
                Services
              </a>
              <a
                href="#features"
                className="text-gray-700 hover:text-red-600 transition-colors"
              >
                Features
              </a>
              <a
                href="#testimonials"
                className="text-gray-700 hover:text-red-600 transition-colors"
              >
                Testimonials
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-red-600 transition-colors"
              >
                Contact
              </a>
              <Link
                to="/login"
                className="text-gray-700 hover:text-red-600 transition-colors"
              >
                Login
              </Link>
            </nav>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <a
                  href="#services"
                  className="text-gray-700 hover:text-red-600 transition-colors"
                >
                  Services
                </a>
                <a
                  href="#features"
                  className="text-gray-700 hover:text-red-600 transition-colors"
                >
                  Features
                </a>
                <a
                  href="#testimonials"
                  className="text-gray-700 hover:text-red-600 transition-colors"
                >
                  Testimonials
                </a>
                <a
                  href="#contact"
                  className="text-gray-700 hover:text-red-600 transition-colors"
                >
                  Contact
                </a>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-red-600 transition-colors"
                >
                  Login
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
              Empowering HR with the Intelligence of NetlifyCon
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
            Experience the future of HR Tech. NetlifyCon-HR empowers you with
            seamless digital tools for smart onboarding, automated attendance,
            payroll, and strategic employee engagement.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-red-500 to-blue-500 text-white rounded-lg text-lg font-semibold hover:from-red-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg">
            Contact Us Now
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                OUR SERVICES
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              All-in-one HR services designed for growth and reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all transform hover:scale-105"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center mb-4`}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Employee Self Service Section */}
      <section
        id="features"
        className="py-20 px-4 bg-gradient-to-r from-red-50 to-blue-50"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
                Employee Self Service
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Experience excellence with a single-window view through{" "}
              <span className="font-semibold text-red-600">NetlifyCon-HR</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent">
                Testimonials
              </span>
            </h2>
            <p className="text-xl text-gray-600">What Our Client Say's</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-800">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {testimonial.position}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                DRIVEN BY YOUR GOALS. POWERED BY OUR DEDICATION.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Building className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">NetlifyCon</span>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering HR with intelligent solutions for the modern
                workplace.
              </p>
              <div className="flex space-x-4">
                <button className="px-4 py-2 bg-gradient-to-r from-red-500 to-blue-500 text-white rounded-lg hover:from-red-600 hover:to-blue-600 transition-all">
                  MORE ABOUT NetlifyCon →
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Products</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    HR Software
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Core HR
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Recruitment
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Attendance
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Payroll
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Engagement
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">
                NetlifyCon Fundamentals
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Legal
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Anti-spam Policy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-l-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-red-500 to-blue-500 text-white rounded-r-lg hover:from-red-600 hover:to-blue-600 transition-all">
                  Submit
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025, Netlifycon. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HRMSLandingPage;
