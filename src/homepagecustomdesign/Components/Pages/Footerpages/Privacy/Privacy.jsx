import React from "react";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <motion.div
      className="bg-white text-gray-800 p-6 md:p-12 max-w-5xl "
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h1 className="text-4xl font-bold text-blue-700 mb-8 text-center">
        Privacy Policy – Netlifycon-HR
      </h1>

      <section className="mb-10">
        <p className="text-gray-700 mb-4">
          At Netlifycon-HR we are committed to
          protecting the privacy of the individuals and organizations who use
          our HRMS, payroll, recruitment, and workforce automation services. This
          Privacy Policy outlines the information we collect, how we use it, and
          your rights regarding that information.
        </p>
      </section>

      {/* Section: What We Collect */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          1. Information We Collect
        </h2>
        <p className="mb-2">We collect the following types of data:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Personal Details:</strong> Full name, phone number, email address, job
            title, and company information.
          </li>
          <li>
            <strong>Employee Records:</strong> Attendance logs, salary slips, leave
            history, tax and compliance data, and onboarding documents.
          </li>
          <li>
            <strong>Login & Usage Data:</strong> IP addresses, device details, timestamps,
            browser information, login sessions, and interaction logs.
          </li>
          <li>
            <strong>Third-party Integrations:</strong> Information from integrated tools
            (like biometric devices, payroll banks, etc.).
          </li>
        </ul>
      </section>

      {/* Section: Why We Collect It */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          2. How We Use This Information
        </h2>
        <p className="mb-4">
          The information we collect is used for the following purposes:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>To provide and maintain HR, payroll, and recruitment services</li>
          <li>To automate and customize workflows for organizations</li>
          <li>To generate reports such as pay slips, joining letters, etc.</li>
          <li>To improve system reliability and customer support</li>
          <li>To comply with tax, employment, and regulatory obligations</li>
        </ul>
      </section>

      {/* Section: Data Sharing */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          3. Sharing and Disclosure
        </h2>
        <p className="mb-4">
          We do not sell or rent user data. Data may be shared with:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Government or legal bodies, if required by law</li>
          <li>Authorized payroll partners or banks, with consent</li>
          <li>
            Reputable third-party processors (SMS, Email, cloud storage) under
            strict agreements
          </li>
        </ul>
      </section>

      {/* Section: Security */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          4. Data Security
        </h2>
        <p className="mb-4">
          Netlifycon-HR uses industry-standard technologies to protect user
          data:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>End-to-end encryption for data in transit</li>
          <li>Role-based access control and multi-factor authentication</li>
          <li>Cloud security measures with daily backups</li>
          <li>Quarterly security audits and real-time monitoring</li>
        </ul>
      </section>

      {/* Section: User Rights */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          5. Your Rights
        </h2>
        <p className="mb-2">
          As a user, you have the right to:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Request access to or correction of your personal data</li>
          <li>Request deletion of your data (where legally permitted)</li>
          <li>Withdraw consent for marketing communications</li>
          <li>Export your data in machine-readable formats</li>
        </ul>
        <p className="mt-4">
          To make any such request, contact us at:{" "}
          <a
            href="mailto:privacy@netlifycon.com"
            className="text-blue-500 hover:underline"
          >
            privacy@netlifycon.com
          </a>
        </p>
      </section>

      {/* Section: Cookies */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          6. Cookie Policy
        </h2>
        <p className="mb-4">
          Netlifycon-HR uses cookies and similar technologies to enhance your
          browsing experience and analyze performance.
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Remember login details and preferences</li>
          <li>Collect analytics to improve product features</li>
          <li>
            You can disable cookies from your browser settings at any time
          </li>
        </ul>
      </section>

      {/* Section: Retention & Changes */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          7. Data Retention & Changes to This Policy
        </h2>
        <p className="mb-4">
          We retain user data as long as needed to provide services or comply
          with legal regulations. Policy changes will be notified via app or
          email. Your continued use after changes constitutes agreement.
        </p>
      </section>

      
    </motion.div>
  );
};

export default PrivacyPolicy;
