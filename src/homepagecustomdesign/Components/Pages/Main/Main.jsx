import { NavLink } from "react-router";
import robotImg from "../../../assets/ChatGPT_Image_Jun_24__2025__02_14_11_PM-removebg-preview.png";
import earthImg from "../../../assets/Earthh.png";
import ESSSection from "../Main4/Main4";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import LogoLoader from "./Loader/Loader";
import ServicesCard from "./Main2/Main2";
import TestimonialCarousel from "./Main3/Main3";
import ZohoStats from "./Main5/Main5";

const Main = () => {
  return (
    <div>
      <section
        id="footer2"
        className="relative bg-gradient-to-r from-blue-200 to-white py-16 px-8 overflow-hidden transition duration-700 hover:from-white hover:to-blue-100"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              <span className="text-black">Empowering HR with the</span>{" "}
              <span className="text-blue-600 hover:text-red-500 transition duration-500 ease-in-out cursor-pointer">
                Intelligence of NetlifyCon
              </span>
            </h1>
            <p className="text-gray-600 leading-relaxed">
              Experience the future of HR Tech. NetlifyCon-HR empowers you with
              seamless digital tools for smart onboarding, automated attendance,
              payroll, and strategic employee engagement.
            </p>
            <button
              className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-full text-lg hover:bg-orange-600 transition
"
            >
              <NavLink to="/Contactus">Contact Us Now</NavLink>
            </button>
          </div>
          <div className="flex items-center justify-center h-screen relative overflow-hidden">
            {/* Rotating Earth */}
            <div className="absolute w-[400px] h-[400px] animate-spin-slow">
              <img
                src={earthImg}
                alt="Earth"
                className="w-full h-full object-contain opacity-80"
              />
            </div>

            {/* Robot */}
            <div className="relative z-10 object-contain filter brightness-[1.5] saturate-0 ">
              <img
                src={robotImg}
                alt="Robot"
                className="w-[250px] h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>
      <ScrollToTop></ScrollToTop>
      <ServicesCard></ServicesCard>

      <ESSSection></ESSSection>
      <TestimonialCarousel></TestimonialCarousel>
      <ZohoStats></ZohoStats>
      {/* <PopupModal></PopupModal> */}
      <LogoLoader></LogoLoader>
    </div>
  );
};

export default Main;
