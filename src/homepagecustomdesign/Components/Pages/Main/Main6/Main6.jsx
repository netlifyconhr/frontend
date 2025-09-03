import React, { useEffect, useState } from "react";

const PopupModal = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Show the popup 1 second after load
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-[#fff7f0] rounded-lg shadow-xl p-6 max-w-4xl w-full relative animate-fade-in">
            {/* Close Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-red-500 text-2xl font-bold"
            >
              ✕
            </button>

            {/* Heading */}
            <h2 className="text-3xl font-bold text-[#e75e3c] mb-6 text-center">
              Try HROne For Free!
            </h2>

            {/* Image */}
            <div className="flex justify-center mb-6">
              <img
                src="/your-image-path.png" // Replace with your image path
                alt="HR One Demo"
                className="max-w-full h-auto rounded-md shadow"
              />
            </div>

            {/* Form */}
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Work Email*"
                className="p-3 border rounded-md w-full"
                required
              />
              <input
                type="tel"
                placeholder="Phone No*"
                className="p-3 border rounded-md w-full"
                required
              />
              <select className="p-3 border rounded-md w-full md:col-span-2" required>
                <option value="">Employee Size *</option>
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-200">51-200</option>
                <option value="201+">201+</option>
              </select>

              <button
                type="submit"
                className="bg-[#e75e3c] text-white font-bold py-3 rounded-md md:col-span-2 hover:bg-[#cf4c2b] transition"
              >
                Get Started
              </button>
            </form>

            {/* Ratings */}
            <div className="flex justify-center gap-8 mt-6 text-sm text-gray-700">
              <div>⭐ 1,650+ Reviews | 4.8</div>
              <div>⭐ 600+ Reviews | 4.9</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupModal;
