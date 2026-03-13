/* ZamGo Travel — Customer Testimonials Section
   Design: Offset card layout with large decorative quote marks, star ratings */
import { useEffect, useRef, useState } from "react";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Mitchell",
    location: "New York, USA",
    destination: "Bali, Indonesia",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    rating: 5,
    quote:
      "ZamGo made our Bali honeymoon absolutely magical. Every detail was perfectly arranged — from the rice terrace tours to the beachfront villa. We felt completely taken care of the entire trip. Will definitely book again!",
    date: "February 2026",
  },
  {
    id: 2,
    name: "James Okonkwo",
    location: "London, UK",
    destination: "Dubai, UAE",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    rating: 5,
    quote:
      "The Dubai luxury package exceeded every expectation. The Burj Khalifa view at sunset, the desert safari, the 5-star hotel — ZamGo curated an experience that felt truly exclusive. Outstanding service from start to finish.",
    date: "January 2026",
  },
  {
    id: 3,
    name: "Amara Chen",
    location: "Sydney, Australia",
    destination: "Tokyo, Japan",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    rating: 5,
    quote:
      "Tokyo was a dream I'd had for years, and ZamGo made it a reality. The JR Pass, the cherry blossom parks, the hidden ramen spots — they knew exactly what would make the trip unforgettable. Absolutely flawless.",
    date: "March 2026",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "text-orange-400 fill-orange-400" : "text-slate-300"
          }`}
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto">
        {/* Header */}
        <div
          className={`mb-14 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-0.5 w-10 bg-orange-400" />
            <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest font-body">
              Real Stories
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-blue-950 leading-tight">
              Travelers <span className="text-gradient-blue">Love Us</span>
            </h2>
            <p className="text-slate-500 max-w-md font-body leading-relaxed">
              Don't just take our word for it. Here's what our community of
              adventurers has to say about their ZamGo experiences.
            </p>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.id}
              className={`relative bg-white border border-slate-100 rounded-2xl p-7 shadow-md hover:shadow-xl transition-all duration-500 group ${
                i === 1 ? "md:mt-8" : ""
              } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              {/* Large decorative quote */}
              <div className="absolute top-5 right-6">
                <Quote className="w-10 h-10 text-blue-100 fill-blue-100 group-hover:text-orange-100 group-hover:fill-orange-100 transition-colors duration-300" />
              </div>

              {/* Stars */}
              <StarRating rating={t.rating} />

              {/* Quote */}
              <p className="text-slate-600 leading-relaxed my-5 font-body text-sm italic">
                "{t.quote}"
              </p>

              {/* Divider */}
              <div className="h-px bg-slate-100 mb-5" />

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-orange-200"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
                </div>
                <div>
                  <div className="font-semibold text-blue-950 font-body">{t.name}</div>
                  <div className="text-slate-500 text-xs font-body">{t.location}</div>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-xs text-blue-600 font-semibold font-body bg-blue-50 px-2.5 py-1 rounded-full">
                    {t.destination}
                  </div>
                  <div className="text-xs text-slate-400 font-body mt-1">{t.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall rating bar */}
        <div
          className={`mt-14 bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.5s" }}
        >
          <div className="text-center">
            <div className="font-display text-6xl font-bold text-blue-950">4.9</div>
            <StarRating rating={5} />
            <div className="text-slate-500 text-sm mt-1 font-body">Overall Rating</div>
          </div>
          <div className="flex-1 w-full">
            {[
              { label: "Destinations", pct: 98 },
              { label: "Value for Money", pct: 95 },
              { label: "Customer Service", pct: 97 },
              { label: "Ease of Booking", pct: 99 },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 mb-3">
                <span className="text-sm text-slate-600 w-36 font-body">{item.label}</span>
                <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-orange-400 rounded-full transition-all duration-1000"
                    style={{ width: visible ? `${item.pct}%` : "0%" }}
                  />
                </div>
                <span className="text-sm font-semibold text-blue-950 w-10 font-body">{item.pct}%</span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <div className="font-display text-4xl font-bold text-orange-500">50K+</div>
            <div className="text-slate-500 text-sm font-body">Verified Reviews</div>
          </div>
        </div>
      </div>
    </section>
  );
}
