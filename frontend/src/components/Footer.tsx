/* ZamGo Travel — Footer Component
   Design: Dark blue footer with organized link columns and social icons */
import { Globe, Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  const LINKS = {
    Company: [
      { label: "About ZamGo", action: () => { } },
      { label: "Our Team", action: () => { } },
      { label: "Careers", action: () => { } },
      { label: "Press & Media", action: () => { } },
      { label: "Blog", action: () => { } },
    ],
    Destinations: [
      { label: "Bali, Indonesia", action: () => navigate("/destinations") },
      { label: "Paris, France", action: () => navigate("/destinations") },
      { label: "Dubai, UAE", action: () => navigate("/destinations") },
      { label: "Tokyo, Japan", action: () => navigate("/destinations") },
      { label: "Maldives", action: () => navigate("/destinations") },
    ],
    Packages: [
      { label: "Honeymoon Packages", action: () => navigate("/packages") },
      { label: "Family Vacations", action: () => navigate("/packages") },
      { label: "Adventure Tours", action: () => navigate("/packages") },
      { label: "Luxury Escapes", action: () => navigate("/packages") },
      { label: "Group Travel", action: () => navigate("/packages") },
    ],
    Support: [
      { label: "Contact Us", action: () => navigate("/contact") },
      { label: "FAQs", action: () => { } },
      { label: "Cancellation Policy", action: () => { } },
      { label: "Privacy Policy", action: () => { } },
      { label: "Terms of Service", action: () => { } },
    ],
  };

  const SOCIAL = [
    { icon: Facebook, label: "Facebook" },
    { icon: Twitter, label: "Twitter" },
    { icon: Instagram, label: "Instagram" },
    { icon: Youtube, label: "YouTube" },
    { icon: Linkedin, label: "LinkedIn" },
  ];

  return (
    <footer
      style={{
        background: "linear-gradient(180deg, oklch(0.22 0.10 250) 0%, oklch(0.16 0.08 250) 100%)",
      }}
    >
      {/* Main Footer */}
      <div className="container mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 mb-5"
            >
              <div className="bg-white rounded-lg p-2 shadow-md">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663431394260/jNKUbrYpfKW2oNDJnLmJn2/IMG_7750_6b6e4978.PNG"
                  alt="ZamGo Travel Logo"
                  className="h-10 w-auto object-contain"
                />
              </div>
            </button>
            <p className="text-white/60 text-sm font-body leading-relaxed mb-6 max-w-xs">
              Your trusted travel partner for unforgettable adventures. We
              curate extraordinary experiences across 200+ destinations worldwide.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              {[
                { icon: Mail, text: "info@zamgotravel.com" },
                { icon: Phone, text: "+44 208 044 8838" },
                // { icon: MapPin, text: "123 Travel Blvd, New York, NY" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-white/60 text-sm font-body">
                  <Icon className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex gap-2">
              {SOCIAL.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-9 h-9 bg-white/10 hover:bg-orange-500 rounded-lg flex items-center justify-center text-white/60 hover:text-white transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-display text-white font-semibold mb-5 text-sm uppercase tracking-wider">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={link.action}
                      className="text-white/55 hover:text-orange-400 text-sm font-body transition-colors flex items-center gap-1 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all duration-200" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm font-body">
            © {new Date().getFullYear()} ZamGo Travel. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <button
                key={item}
                className="text-white/40 hover:text-white/70 text-xs font-body transition-colors"
              >
                {item}
              </button>
            ))}
            <a href="/login" className="text-white/40 hover:text-orange-400 text-xs font-body transition-colors font-medium ml-2 border-l border-white/20 pl-4">Admin Login</a>
          </div>
          <div className="flex items-center gap-2 text-white/40 text-xs font-body">
            <span>Made with</span>
            <span className="text-orange-400">♥</span>
            <span>for travelers worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
