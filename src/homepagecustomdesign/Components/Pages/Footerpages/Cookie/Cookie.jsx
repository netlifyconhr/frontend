import React from 'react';

const Cookie = () => {
    return (
        <div className="bg-white text-gray-800 p-6 md:p-12 max-w-5xl mt-20 "> 
            <section>
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Cookie Policy</h2>
        <p className="mb-4">
          We use cookies to improve your experience. By continuing to use our services, you agree to our cookie usage.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Used to remember preferences and analyze performance.</li>
          <li>Used by tools like Google Analytics and Hotjar.</li>
          <li>You can disable cookies in your browser settings.</li>
        </ul>
      </section>
        </div>
    );
};

export default Cookie;