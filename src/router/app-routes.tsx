import { createBrowserRouter, Outlet } from "react-router-dom";
// import HRMSLandingPage from "@/components/HomePage";
import { AuthProvider } from "@/context/AuthContext";
import LoginPage from "@/features/auth/pages/Login";
import { DashboardRoutes } from "@/features/dashboard/dashboard-routes";
// import HomePage from "../features/homepage/Main/Main";
import PasswordResetFlow from "@/features/reset-password/pages/ResetPassword";
import AboutUs from "../homepagecustomdesign/Components/Pages/About/About";
import Contactus from "../homepagecustomdesign/Components/Pages/Contactus/Contactus";
import Main from "../homepagecustomdesign/Components/Pages/Main/Main";

import ScrollToTop from "@/components/ScrollToTop.js";
import SidebarPage from "@/layout/sidebartest/app/dashboard/page";
import Footer from "../homepagecustomdesign/Components/Pages/Footer/Footer";
import Antispam from "../homepagecustomdesign/Components/Pages/Footerpages/Antispam/Antispam.jsx";
import Cookie from "../homepagecustomdesign/Components/Pages/Footerpages/Cookie/Cookie.jsx";
import FooterLegal from "../homepagecustomdesign/Components/Pages/Footerpages/Legal/Legal.jsx";
import PrivacyPolicy from "../homepagecustomdesign/Components/Pages/Footerpages/Privacy/Privacy.jsx";
import TermsConditions from "../homepagecustomdesign/Components/Pages/Footerpages/Terms & Conditions/TermsAndConditions.jsx";
import Navbar from "../homepagecustomdesign/Components/Pages/Navbar/Navbar";

const withAuth = (element: React.ReactNode) => (
  <AuthProvider>{element}</AuthProvider>
);

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Outlet />
        <Footer />
        <ScrollToTop />
      </>
    ),
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "Contactus",
        element: <Contactus />,
      },
      {
        path: "TermsConditions",
        element: <TermsConditions />,
      },
      {
        path: "PrivacyPolicy",
        element: <PrivacyPolicy />,
      },
      {
        path: "Cookie",
        element: <Cookie />,
      },
      {
        path: "legal",
        element: <FooterLegal />,
      },
      {
        path: "Antispam",
        element: <Antispam />,
      },
    ],
  },
  {
    path: "login",
    element: withAuth(<LoginPage />),
  },
  {
    path: "reset-password",
    element: <PasswordResetFlow />,
  },
  {
    path: "dashboard",
    element: withAuth(<SidebarPage />),
    children: DashboardRoutes,
  },
]);

export default routes;
