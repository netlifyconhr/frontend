import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react"; // optional: use lucide-react icons

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div
      onClick={() => setDarkMode(!darkMode)}
      className="flex items-center w-20 h-10 rounded-full bg-[#f3f6fc] shadow-inner p-1 cursor-pointer transition-colors"
    >
      <div
        className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
          darkMode ? "translate-x-[2.5rem] bg-gray-700" : "translate-x-0 bg-blue-500"
        }`}
      >
        {darkMode ? (
          <Moon className="text-white w-5 h-5" />
        ) : (
          <Sun className="text-white w-5 h-5" />
        )}
      </div>
    </div>
  );
};

export default ThemeToggle;
