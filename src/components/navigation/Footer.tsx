// components/Footer.tsx

import { FaFacebookSquare, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-[var(--primary)] text-white pt-12 pb-6 px-16">
      <div className="flex gap-12 justify-between">
        <div className="space-y-4 w-1/3">
          <img src="/LogoFull.svg" alt="NITDA SandBox Logo" className="h-8" />

          <p className="text-[var(--gray)] text-[12px] ">
            Join a sandbox built to help you navigate NOPR and grow with confidence.
          </p>
        </div>
        <div className="max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 w-1/2">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-[var(--gray)] text-[12px] hover:text-[#06A85D] transition">About NITDA</Link></li>
              <li><Link to="/contact" className="text-[var(--gray)] text-[12px] hover:text-[#06A85D] transition">Connect Us</Link></li>
              <li><Link to="/privacy" className="text-[var(--gray)] text-[12px] hover:text-[#06A85D] transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-[var(--gray)] text-[12px] hover:text-[#06A85D] transition">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/auth/login" className="text-[var(--gray)] text-[12px] hover:text-[#06A85D] transition">Guidelines</Link></li>
            </ul>
          </div>

          <div className="">
            <h3 className="text-lg font-semibold">Socials</h3>
            <div className="flex space-x-3 mt-2">
              <Link to="#" className="text-[var(--gray)] text-[12px] hover:text-[#06A85D] transition"><FaLinkedin /></Link>
              <Link to="#" className="text-[var(--gray)] text-[12px] hover:text-[#06A85D] transition"><FaInstagram /></Link>
              <Link to="#" className="text-[var(--gray)] text-[12px] hover:text-[#06A85D] transition"><FaFacebookSquare /></Link>
              <Link to="#" className="text-[var(--gray)] text-[12px] hover:text-[#06A85D] transition"><FaTiktok /></Link>
              <Link to="#" className="text-[var(--gray)] text-[12px] hover:text-[#06A85D] transition"><FaXTwitter /></Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 mt-10 border-t border-white/40  text-[var(-gray)]">
        <p className="text-left text-[12px] font-normal">©2025 NITDA Sandbox. All right reserved</p>
      </div>
    </footer>
  );
};