import React, { useEffect, useState } from "react";
import logo from "../../../../assets/Only N icon.png";

const LogoLoader = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user has already visited in this session
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (!hasVisited) {
      setIsLoading(true);

      // Set flag so loader doesn't show again in this session
      sessionStorage.setItem("hasVisited", "true");

      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="animate-pulse">
        <img className="w-24 h-24" src={logo} alt="Logo" />
      </div>
    </div>
  );
};

export default LogoLoader;
