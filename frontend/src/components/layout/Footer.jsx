import React from 'react';

export const Footer = () => {
  return (
    <footer className="footer-bar">
      <div className="footer-container">
        <p className="footer-copy">
          &copy; {new Date().getFullYear()} CriChax Intelligence Platform. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;
