import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
const navLinks = [{
  name: "Home",
  href: "#home"
}, {
  name: "About",
  href: "#about"
}, {
  name: "Programs",
  href: "#programs"
}, {
  name: "Contact",
  href: "#contact"
}];
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return <nav className={cn("fixed w-full z-50 transition-all duration-300", isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent")}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 bg-gray-300 px-[41px] mx-[15px] my-[2px] py-0">
          <div className="flex items-center">
            <a href="#home" className="flex items-center space-x-2">
              <span className="h-10 w-10 bg-gradient-to-br from-jnana-700 to-jnana-900 rounded-md flex items-center justify-center">
                <span className="text-white font-serif font-bold text-lg">JB</span>
              </span>
              <div className="hidden md:block">
                <h1 className="text-jnana-900 font-serif font-bold text-xl tracking-tight">
                  Jnana Bharthi
                </h1>
                <p className="text-jnana-600 text-xs tracking-widest">
                  SCHOOL & PU COLLEGE
                </p>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map(link => <a key={link.name} href={link.href} className="text-jnana-800 hover:text-jnana-accent transition-all-200 jnana-link font-medium text-sm">
                {link.name}
              </a>)}
            <a href="#contact" className="ml-2 inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-jnana-800 hover:bg-jnana-700 transition-all-200">
              Admissions
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-jnana-700 hover:text-jnana-accent hover:bg-jnana-50 transition-all-200" aria-controls="mobile-menu" aria-expanded="false" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn("md:hidden fixed inset-0 top-20 bg-white/95 backdrop-blur-md z-40 transform transition-transform duration-300 ease-in-out", isMobileMenuOpen ? "translate-x-0" : "translate-x-full")}>
        <div className="px-4 pt-4 pb-6 space-y-5">
          {navLinks.map(link => <a key={link.name} href={link.href} className="block py-4 text-jnana-800 hover:text-jnana-accent border-b border-jnana-100 font-medium text-lg" onClick={() => setIsMobileMenuOpen(false)}>
              {link.name}
            </a>)}
          <a href="#contact" className="mt-6 block w-full text-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-jnana-800 hover:bg-jnana-700 transition-all-200" onClick={() => setIsMobileMenuOpen(false)}>
            Admissions
          </a>
        </div>
      </div>
    </nav>;
}