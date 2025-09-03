import React, { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const mainSection = document.getElementById("main");
      if (mainSection) {
        const rect = mainSection.getBoundingClientRect();
        if (rect.top <= 100) {
          setShowButton(false);
        } else {
          setShowButton(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const navbar = document.getElementById("navbar");
    if (navbar) {
      navbar.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 100, behavior: "smooth" });
    }
  };

  if (!showButton) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl shadow-md transition-all duration-300 z-50 group"
      aria-label="Scroll to Top"
    >
      <ChevronUp
        size={24}
        className="transition-transform duration-500 ease-in-out group-hover:-translate-y-2"
      />
    </button>
  );
};

export default ScrollToTop;
