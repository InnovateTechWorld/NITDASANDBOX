import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Button from "../ui/Button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close mobile menu when clicking on a nav item
  const handleNavClick = () => {
    setIsOpen(false);
  };

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Add scroll effect to navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`w-full z-50 text-white py-7 md:py-5 border-b border-b-white/5 transition-all duration-300 ${isScrolled ? "fixed bg-[var(--primary)] left-0  px-7 md:px-16 shadow-md" : "bg-transparent"}`}>
        <div className="container px-4 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <a href="/">
              <img src="/LogoFull.svg" alt="NITDA SandBox Logo" className="h-8" />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Button variant="noOutline" to="/" className="hover:text-[#06A85D] p-0" onClick={handleNavClick}>
                Home
              </Button>
              <Button variant="noOutline" to="#features" className="hover:text-[#06A85D] p-0" onClick={handleNavClick}>
                Features
              </Button>
              <Button variant="noOutline" to="#howItWorks" className="hover:text-[#06A85D] p-0" onClick={handleNavClick}>
                How It Works
              </Button>
              <Button variant="noOutline" className="hover:text-[#06A85D] p-0" onClick={handleNavClick}>
                Contact Us
              </Button>
            </nav>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex space-x-3">
            <Button variant="primaryLight" to="/auth/login">
              Sign In
            </Button>
            <Button variant="white" to="/auth/register">
              Apply To Sandbox
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu (Slides from left) */}
      <div
        className={`fixed top-0 left-0  w-64 bg-[var(--primary)] z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col max-h-screen h-screen p-6">
          <div>
            <div className="flex justify-between items-center mb-8">
              <img src="/LogoFull.svg" alt="NITDA SandBox Logo" className="h-8" />
              <button
                className="text-white focus:outline-none"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <FiX size={24} />
              </button>
            </div>

            <nav className="flex flex-col space-y-6 py-4">
              <Button variant="noOutline" to="/" className="hover:text-[#06A85D] p-0 text-left" onClick={handleNavClick}>
                Home
              </Button>
              <Button variant="noOutline" to="#features" className="hover:text-[#06A85D] p-0 text-left" onClick={handleNavClick}>
                Features
              </Button>
              <Button variant="noOutline" to="#howItWorks" className="hover:text-[#06A85D] p-0 m-0 text-left" onClick={handleNavClick}>
                How It Works
              </Button>
              <Button variant="noOutline" className="hover:text-[#06A85D] p-0  m-0 text-left" onClick={handleNavClick}>
                Contact Us
              </Button>
            </nav>

          </div>
          <div className="space-y-3 mt-10 ">
            <Button variant="primaryLight" to="/auth/login" className="w-full p-0 m-0" onClick={handleNavClick}>
              Sign In
            </Button>
            <Button variant="white" to="/auth/register" className="w-full" onClick={handleNavClick}>
              Apply To Sandbox
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;