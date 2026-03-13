/* ZamGo Travel — Hero Section
   Design: Full-viewport immersive image, left-anchored editorial headline,
   glassmorphism search card, diagonal bottom clip */
import { useState } from "react";
import { Search, MapPin, Calendar, Users, ChevronDown } from "lucide-react";

const HERO_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663431394260/jNKUbrYpfKW2oNDJnLmJn2/hero-travel-UBNCX5mqys4GAewr8A2Qjc.webp";

export default function HeroSection() {
  const [destination, setDestination] = useState("");
  const [departure, setDeparture] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [travelers, setTravelers] = useState("2 Adults");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const el = document.getElementById("packages");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Tropical paradise travel destination"
          className="w-full h-full object-cover object-center"
        />
        {/* Multi-layer gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/85 via-blue-900/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/70 via-transparent to-blue-900/20" />
      </div>

      {/* Diagonal bottom clip */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-white" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto pt-24 pb-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-400/20 border border-orange-400/40 rounded-full px-4 py-1.5 mb-6 animate-fade-in">
            <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
            <span className="text-orange-300 text-sm font-medium font-body">
              Trusted by 50,000+ Happy Travelers
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-5 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Explore the World
            <br />
            <span className="text-orange-400 italic">with ZamGo</span>
          </h1>

          {/* Subheadline */}
          <p
            className="font-body text-lg md:text-xl text-white/80 max-w-xl leading-relaxed mb-10 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            Discover breathtaking destinations, curated travel packages, and
            unforgettable experiences — all in one place. Your next adventure
            starts here.
          </p>

          {/* Stats Row */}
          <div
            className="flex flex-wrap gap-6 mb-10 animate-fade-up"
            style={{ animationDelay: "0.25s" }}
          >
            {[
              { value: "200+", label: "Destinations" },
              { value: "15K+", label: "Bookings" },
              { value: "4.9★", label: "Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-2xl font-bold text-orange-400">
                  {stat.value}
                </div>
                <div className="font-body text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Search Card */}
          <form
            onSubmit={handleSearch}
            className="glass-card rounded-2xl p-5 shadow-2xl animate-fade-up"
            style={{ animationDelay: "0.35s" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              {/* Destination */}
              <div className="relative">
                <label className="block text-white/70 text-xs font-medium mb-1.5 font-body">
                  Destination
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400" />
                  <input
                    type="text"
                    placeholder="Where to?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-white/20 border border-white/30 rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-white/50 text-sm font-body focus:outline-none focus:border-orange-400 focus:bg-white/25 transition-all"
                  />
                </div>
              </div>

              {/* Departure */}
              <div>
                <label className="block text-white/70 text-xs font-medium mb-1.5 font-body">
                  Departure Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400" />
                  <input
                    type="date"
                    value={departure}
                    onChange={(e) => setDeparture(e.target.value)}
                    className="w-full bg-white/20 border border-white/30 rounded-xl pl-9 pr-3 py-2.5 text-white text-sm font-body focus:outline-none focus:border-orange-400 focus:bg-white/25 transition-all [color-scheme:dark]"
                  />
                </div>
              </div>

              {/* Return */}
              <div>
                <label className="block text-white/70 text-xs font-medium mb-1.5 font-body">
                  Return Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400" />
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full bg-white/20 border border-white/30 rounded-xl pl-9 pr-3 py-2.5 text-white text-sm font-body focus:outline-none focus:border-orange-400 focus:bg-white/25 transition-all [color-scheme:dark]"
                  />
                </div>
              </div>

              {/* Travelers */}
              <div>
                <label className="block text-white/70 text-xs font-medium mb-1.5 font-body">
                  Travelers
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400" />
                  <select
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                    className="w-full bg-white/20 border border-white/30 rounded-xl pl-9 pr-8 py-2.5 text-white text-sm font-body focus:outline-none focus:border-orange-400 focus:bg-white/25 transition-all appearance-none [color-scheme:dark]"
                  >
                    <option value="1 Adult">1 Adult</option>
                    <option value="2 Adults">2 Adults</option>
                    <option value="2 Adults, 1 Child">2 Adults, 1 Child</option>
                    <option value="2 Adults, 2 Children">2 Adults, 2 Children</option>
                    <option value="Group (5+)">Group (5+)</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full btn-accent py-3.5 rounded-xl font-semibold text-base font-body flex items-center justify-center gap-2 shadow-lg"
            >
              <Search className="w-5 h-5" />
              Search Trips
            </button>
          </form>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-28 right-8 hidden lg:flex flex-col items-center gap-2 text-white/50">
        <span className="text-xs font-body tracking-widest rotate-90 origin-center mb-2">
          SCROLL
        </span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </div>
    </section>
  );
}
