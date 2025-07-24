import React from "react";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-[#131313] text-white px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-sm">
      <div className="text-center mb-2 sm:mb-0">
        © {new Date().getFullYear()} Lakshya Singhal. All rights reserved.
      </div>

      <div className="flex gap-6 mb-2 sm:mb-0">
        <a href="#" className="hover:text-cyan-400 transition-colors">About</a>
        <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-cyan-400 transition-colors">Terms of Use</a>
        <a href="#" className="hover:text-cyan-400 transition-colors">Support</a>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-gray-400">Connect:</span>
        <a
          href="mailto:lakshyasinghal2320@gmail.com"
          className="hover:text-cyan-400 transition-colors"
          title="Contact via Email"
        >
          <FaEnvelope size={18} />
        </a>
        <a
          href="https://www.linkedin.com/in/lakshya-singhal"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-cyan-400 transition-colors"
          title="LinkedIn Profile"
        >
          <FaLinkedin size={18} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
