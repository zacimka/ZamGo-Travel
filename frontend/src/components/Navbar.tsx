/* ZamGo Travel — Navbar Component
   Design: Coastal Modernism — transparent on hero, solid on scroll */
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663431394260/jNKUbrYpfKW2oNDJnLmJn2/IMG_7750_6b6e4978.PNG";

  const closeMenu = () => {
    setMobileOpen(false);
  };

  const navLinks = [
    { label: "Destinations", path: "/destinations" },
    { label: "Packages", path: "/packages" },
    { label: "Why ZamGo", path: "/why-zamgo" },
    { label: "Reviews", path: "/reviews" },
    { label: "Contact", path: "/contact" },
  ];

  // Header needs to be solid if we've scrolled OR if we are not on the homepage
  const isSolid = isScrolled || !isHomePage;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isSolid
          ? "bg-white/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
        }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
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
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-body text-sm font-medium transition-colors hover:text-orange-400 ${isSolid ? "text-slate-700" : "text-white/90"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:+1234567890"
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${isSolid ? "text-slate-600" : "text-white/80"
              } hover:text-orange-400`}
          >
            <Phone className="w-4 h-4" />
            <span>+44 208 044 8838</span>
          </a>
          <button
            onClick={() => {
                navigate('/');
                setTimeout(() => {
                    const el = document.getElementById("booking");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 100);
            }}
            className="btn-accent px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg"
          >
            Book a Trip
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors ${isSolid ? "text-slate-700" : "text-white"
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
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className="text-left px-4 py-3 text-slate-700 font-medium hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors block"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                closeMenu();
                navigate('/');
                setTimeout(() => {
                    const el = document.getElementById("booking");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
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
