import React from 'react';

const Antispam = () => {
    return (
        <div>
            {/* Anti-Spam Policy */}
      <section className="mb-12 mt-30 ml-10">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Anti-Spam Policy</h2>
        <p className="mb-4">
          Netlifycon has zero tolerance for spam. Users may not use our services to send unsolicited messages.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>No mass email without explicit consent.</li>
          <li>No harvesting email addresses without permission.</li>
          <li>Spam reports will lead to immediate action or suspension.</li>
          <li>Report abuse: <a href="admin@netlifycon.com" className="text-blue-500 hover:underline">admin@netlifycon-hr.in</a></li>
        </ul>
      </section>
        </div>
    );
};

export default Antispam;