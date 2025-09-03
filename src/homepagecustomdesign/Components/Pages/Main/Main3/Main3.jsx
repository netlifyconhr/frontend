import React from "react";

const testimonials = [
  {
    name: "Avimannu Shukla",
    role: " Sr.Manager(HR)@MJ Royal.",
    // image: "https://randomuser.me/api/portraits/men/32.jpg",
    message: `“It gives us great features at a price we can afford. No extra charges,Totaly customized Software, just a smart and budget-friendly solution.”`,
  },
  {
    name: "Disha Rakshit",
    role: "General Manager@ Prime Logistics.",
    // image: "https://randomuser.me/api/portraits/women/44.jpg",
    message: `“From payroll format to attendance reports, everything was modified just the way we wanted. It feels like the software was built for us — not the other way around.”`,
  },
  {
    name: "Raha Gupta",
    role: "ADM @Techwens Services.",
    // image: "https://randomuser.me/api/portraits/women/68.jpg",
    message: `“Even the smallest features we asked for — like a custom joining checklist — were added quickly. No other company gives this much flexibility.”`,
  },
  {
    name: "Amit Ranjan Bhatt",
    role: "Manger(HR)@ Canva Prime Steel Pvt ltd.",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    message: `“The best part? We didn’t have to adjust to the software — the software adjusted to us. It's user-friendly, affordable, and fully customizable.”`,
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-20 bg-[#f4f7fd] text-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h4 className="text-blue-600 font-bold uppercase">Testimonials</h4>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4">What Our Client Say's</h2>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((client, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="flex items-center gap-4 mb-4">
                {/* <div className="w-12 h-12 rounded overflow-hidden">
                  <img
                    src={client.image}
                    alt={client.name}
                    className="w-full h-full object-cover"
                  />
                </div> */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{client.name}</h3>
                  <p className="text-sm text-gray-500">{client.role}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">{client.message}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
