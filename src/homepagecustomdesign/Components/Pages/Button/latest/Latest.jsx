import React, { useState } from 'react';

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    alert('Submitted successfully');
    // You can optionally clear the email: setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{
          padding: '12px',
          width: '300px',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '5px',
        }}
      />
      <br /><br />
      <button
        type="submit"
        disabled={submitted}
        style={{
          padding: '8px',
          width: '300px',
          fontSize: '18px',
          backgroundColor: submitted ? 'gray' : 'orange',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: submitted ? 'not-allowed' : 'pointer',
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default EmailForm;
