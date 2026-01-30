"use client";

import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function SocialLinks() {
  return (
    <div className="flex gap-3">
      <a
        href="https://ca.linkedin.com/in/chrisandra-vaz"
        target="_blank"
        rel="noopener noreferrer"
        className="social-btn"
        aria-label="LinkedIn"
      >
        <FaLinkedinIn className="w-4 h-4" />
      </a>
      <a
        href="https://x.com/vaz_xyz"
        target="_blank"
        rel="noopener noreferrer"
        className="social-btn"
        aria-label="X (Twitter)"
      >
        <FaXTwitter className="w-4 h-4" />
      </a>
      <a
        href="https://www.instagram.com/chrisan_12/"
        target="_blank"
        rel="noopener noreferrer"
        className="social-btn"
        aria-label="Instagram"
      >
        <FaInstagram className="w-4 h-4" />
      </a>
    </div>
  );
}
