import React from "react";

export default function GradientFooter() {
  return (
    <footer className="bg-black/40 backdrop-blur-lg border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
              NetlifyCon
            </h3>
            <p className="text-gray-300 mb-4">
              Empowering HR with intelligent solutions for the modern workplace.
            </p>
            <button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
              MORE ABOUT NetlifyCon →
            </button>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Products</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  HR Software
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  Core HR
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  Recruitment
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  Attendance
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  Payroll
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  Engagement
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              NetlifyCon Fundamentals
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  Legal
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  Anti-spam Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2025, Netlifycon. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
