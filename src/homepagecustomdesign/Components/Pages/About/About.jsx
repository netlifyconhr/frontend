import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-white text-gray-800 mt-25">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">About Netlifycon-HR</h1>
          <p className="text-xl">
            Empowering businesses with smart HR solutions since 2023
          </p>
        </div>
      </section>

      {/* Info Stats */}
      <section className="max-w-6xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
        <div>
          <h2 className="text-5xl font-bold text-indigo-600">500+</h2>
          <p className="text-lg mt-2">Happy Users</p>
        </div>
        <div>
          <h2 className="text-5xl font-bold text-indigo-600">10+</h2>
          <p className="text-lg mt-2">Products</p>
        </div>
        <div>
          <h2 className="text-5xl font-bold text-indigo-600">2</h2>
          <p className="text-lg mt-2">Locations</p>
        </div>
        <div>
          <h2 className="text-5xl font-bold text-indigo-600">2+ Years</h2>
          <p className="text-lg mt-2">In HR Tech Industry</p>
        </div>
        <div>
          <h2 className="text-5xl font-bold text-indigo-600">2024</h2>
          <p className="text-lg mt-2">Opened Delhi Sub-Centre</p>
        </div>
        <div>
          <h2 className="text-5xl font-bold text-indigo-600">Growing</h2>
          <p className="text-lg mt-2">More Centres Coming Soon</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700">
            To streamline HR processes with cutting-edge technology and
            personalized support for modern businesses.
          </p>
        </div>
      </section>

      

      {/* Footer CTA */}
      <section className="bg-indigo-600 text-white py-12 text-center">
        <h2 className="text-3xl font-bold mb-2">Join Netlifycon-HR Today</h2>
        <p className="text-lg">Let’s grow your HR operations smarter & faster.</p>
      </section>
    </div>
  );
};

export default AboutUs;
