// ScrollToTop.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  // List of routes where you want to scroll to top
  const pathsToScroll = [
    "/legal",
    "/about",
    "/TermsConditions",
    "/Contactus",
    "/PrivacyPolicy",
    "/Cookie",
    "/Antispam",
  ];

  useEffect(() => {
    if (pathsToScroll.includes(pathname)) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
