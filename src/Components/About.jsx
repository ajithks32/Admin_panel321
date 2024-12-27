import React from 'react';


const About = () => {
  return (
    <div className="about-section">
      <h1 className="about-title">About Grace Academy</h1>
      <p className="about-description">
        Grace Academy is committed to providing quality education and fostering an
        environment of growth and learning. Our mission is to nurture talent and
        develop responsible citizens for tomorrow.
      </p>

      <h2 className="section-title">About the Admin Dashboard</h2>
      <p className="section-description">
        The Grace Academy Admin Dashboard is a centralized platform designed to
        streamline administrative tasks. It empowers administrators to efficiently
        manage staff, students, and institutional data, making everyday operations
        seamless.
      </p>

      <h2 className="section-title">Features</h2>
      <ul className="feature-list">
        <li className="feature-item">Staff and student management</li>
        <li className="feature-item">Easy navigation for updating records</li>
        <li className="feature-item">Accessible reports and analytics</li>
      </ul>

      <h2 className="section-title">Contact Us</h2>
      <p className="contact-info">
        For assistance, reach out to us at:
        <br />
        📧 Email: <a href="https://mail.google.com/mail/u/0/?hl=en#inbox?compose=new" className="contact-link">ajithks5532@gmail.com</a>
        <br />
        📞 Phone: +91 93457 38576
      </p>
    </div>
  );
};

export default About;
