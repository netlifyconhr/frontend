
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import ContactForm from "./ContactForm";
const Contactus = () => {
  
  
  
    return (
    <section className="py-10 mt-25 bg-[#f4f7fd] text-gray-800">
        <img src="" alt="" />
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-12">
        {/* Left Info Block */}
        <div className="space-y-8">
          <div>
            <h4 className="text-blue-600 font-semibold uppercase">Contact Us</h4>
            <h2 className="text-4xl font-extrabold mt-2 text-[#0f172a] leading-snug">
              Let's talk about <br /> your problem.
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <h5 className="font-semibold text-[#0f172a]">Our Location</h5>
              <p className="text-gray-600">
                Natudira Nayabad,Baruipur <br />
                Kolkata, Pin-700150
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-[#0f172a]">Email Address</h5>
              <p className="text-gray-600">admin@netlifycon-hr.in</p>
              
            </div>
            <div>
              <h5 className="font-semibold text-[#0f172a]">Phone Number</h5>
              <p className="text-gray-600">8420377092</p>
              
            </div>
            <div>
              <h5 className="font-semibold text-[#0f172a]">How Can We Help?</h5>
              <p className="text-gray-600">
                Tell us your problem and we will get back to you ASAP.
              </p>
            </div>
          </div>
        </div>
<ScrollToTop></ScrollToTop>
        {/* Right Form Block */}
        <div className="bg-white rounded-xl mt-2 mb-10 ml-20 w-100 shadow-md p-4">
          <h3 className="text-2xl font-bold mb-6 text-[#0f172a]">Send us a Message</h3>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contactus;

