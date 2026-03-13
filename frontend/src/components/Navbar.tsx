/* ZamGo Travel — Navbar Component
   Design: Coastal Modernism — transparent on hero, solid on scroll */
import { useState, useEffect } from "react";
import { Menu, X, Globe, Phone } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431394260/jNKUbrYpfKW2oNDJnLmJn2/IMG_7750_6b6e4978.PNG";

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: "Destinations", id: "destinations" },
    { label: "Packages", id: "packages" },
    { label: "Why ZamGo", id: "why-zamgo" },
    { label: "Reviews", id: "testimonials" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
        }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 group"
        >
          <div className="bg-white rounded-lg p-1.5 shadow-md">
            <img
              src={LOGO_URL}
              alt="ZamGo Travel Logo"
              className="h-8 w-auto object-contain"
            />
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`font-body text-sm font-medium transition-colors hover:text-orange-400 ${isScrolled ? "text-slate-700" : "text-white/90"
                }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:+1234567890"
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${isScrolled ? "text-slate-600" : "text-white/80"
              } hover:text-orange-400`}
          >
            <Phone className="w-4 h-4" />
            <span>+44 208 044 8838</span>
          </a>
          <button
            onClick={() => scrollTo("booking")}
            className="btn-accent px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg"
          >
            Book a Trip
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors ${isScrolled ? "text-slate-700" : "text-white"
            }`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-md border-t border-slate-100 shadow-xl">
          <div className="container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left px-4 py-3 text-slate-700 font-medium hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("booking")}
              className="btn-accent mt-2 mx-4 py-3 rounded-full text-sm font-semibold"
            >
              Book a Trip
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
