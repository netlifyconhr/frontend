import React, { useState } from 'react';

const BookDemoModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    alert('Submitted successfully!');
    // Optionally reset: setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        style={{
          padding: '12px 24px',
          backgroundColor: '#1064ff',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        Book a Demo
      </button>

      {showModal && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '20px',
                fontSize: '20px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              &times;
            </button>

            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Book a Demo</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                style={inputStyle}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                style={inputStyle}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                style={inputStyle}
              />
              <textarea
                name="message"
                placeholder="Tell us briefly about your requirement"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                required
                style={{ ...inputStyle, height: '100px', resize: 'none' }}
              />
              <button
                type="submit"
                disabled={submitted}
                style={{
                  backgroundColor: submitted ? 'gray' : '#1064ff',
                  color: 'white',
                  fontSize: '16px',
                  padding: '14px',
                  width: '100%',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: submitted ? 'not-allowed' : 'pointer',
                  marginTop: '10px'
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

// Styles
const modalOverlay = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000
};

const modalContent = {
  background: 'white',
  padding: '30px',
  borderRadius: '16px',
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
  width: '90%',
  maxWidth: '400px',
  position: 'relative',
  fontFamily: 'Arial, sans-serif'
};

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  marginBottom: '12px',
  border: '1px solid #ccc',
  borderRadius: '10px',
  fontSize: '15px',
  boxSizing: 'border-box'
};

export default BookDemoModal;
