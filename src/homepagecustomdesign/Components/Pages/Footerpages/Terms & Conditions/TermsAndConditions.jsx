import React from 'react';

const TermsConditions = () => {
    return (
        <div id='terms2' className="bg-white text-gray-800 p-6 md:p-12 max-w-5xl ">
      <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">Legal & Policies – Netlifycon</h1>

      {/* Terms of Service */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Terms of Service</h2>
        <p className="mb-4">
          By using Netlifycon’s platform, you agree to follow these Terms of Service. You must not misuse our services.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>You’re responsible for your account security and actions under your account.</li>
          <li>Custom features depend on the selected subscription plan.</li>
          <li>All payments are final and non-refundable.</li>
          <li>We may suspend services due to non-payment or abuse.</li>
          <li>Refer to our Privacy Policy for how we handle your data.</li>
          <li>We are not liable for indirect or consequential damages.</li>
        </ul>
      </section>

      

      {/* Cookie Policy */}
      
    </div>
  
    );
};

export default TermsConditions;