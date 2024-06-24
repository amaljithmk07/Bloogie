import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div>
      <div className="footer-main-body">
      <div className="footer-sub-body">
        <div className="footer-title">
          <img src="logo.png" alt="" className="footer-title-logo" />
        </div>
        <div className="footer-about">
          <div>About Us</div>
          Bloogie is a platform where you can share your stories, ideas, and
          inspirations with the world. Join our community and start blogging
          today!
        </div>
        <div className="footer-contact">
          Contact
          <div>(+91) 448-536-4987</div>
          <a href="">Support@bloogie.com</a>
          <img src="footer.png" alt="" className="footer-icon" />
        </div>
      </div>
      <div className="footer-footer">
        <p>&copy; 2024 Bloogie. All rights reserved.</p>
      </div>
    </div>
    </div>
  );
};

export default Footer;
