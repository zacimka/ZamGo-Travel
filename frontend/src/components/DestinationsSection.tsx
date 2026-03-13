/* ZamGo Travel — Popular Destinations Section
   Design: Masonry-style grid with oversized cards, hover zoom, pill badges */
import { useEffect, useRef, useState } from "react";
import { MapPin, Star, ArrowRight } from "lucide-react";

const DESTINATIONS = [
  {
    id: 1,
    name: "Bali",
    country: "Indonesia",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663431394260/jNKUbrYpfKW2oNDJnLmJn2/dest-bali-TB5pLW4xkVivvE2HByFAJW.webp",
    rating: 4.9,
    reviews: 2341,
    badge: "Most Popular",
    badgeColor: "bg-orange-500",
    startFrom: "$1,299",
    span: "row-span-2 sm:row-span-2",
  },
  {
    id: 2,
    name: "Paris",
    country: "France",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663431394260/jNKUbrYpfKW2oNDJnLmJn2/dest-paris-LEbYBGyhc2jXGtfQdSNCwY.webp",
    rating: 4.8,
    reviews: 1876,
    badge: "Romantic",
    badgeColor: "bg-pink-500",
    startFrom: "$1,599",
    span: "",
  },
  {
    id: 3,
    name: "Dubai",
    country: "UAE",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663431394260/jNKUbrYpfKW2oNDJnLmJn2/dest-dubai-RM9SheVPLsTCo52RR2EyvW.webp",
    rating: 4.7,
    reviews: 1543,
    badge: "Luxury",
    badgeColor: "bg-amber-500",
    startFrom: "$1,899",
    span: "",
  },
  {
    id: 4,
    name: "Tokyo",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    rating: 4.9,
    reviews: 2108,
    badge: "New",
    badgeColor: "bg-green-500",
    startFrom: "$1,749",
    span: "",
  },
  {
    id: 5,
    name: "Maldives",
    country: "Indian Ocean",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663431394260/jNKUbrYpfKW2oNDJnLmJn2/dest-maldives-b4pVb3RS4DvKxZr5RwuEGj.webp",
    rating: 5.0,
    reviews: 987,
    badge: "Exclusive",
    badgeColor: "bg-blue-500",
    startFrom: "$2,499",
    span: "",
  },
];

function DestCard({ dest, index }: { dest: (typeof DESTINATIONS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const scrollToBooking = () => {
    const el = document.getElementById("booking");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      ref={ref}
      className={`group relative rounded-2xl overflow-hidden shadow-lg card-hover img-zoom-container cursor-pointer transition-all duration-700 ${dest.span} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 0.08}s` }}
      onClick={scrollToBooking}
    >
      <img
        src={dest.image}
        alt={dest.name}
        className="w-full h-full object-cover absolute inset-0"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/30 to-transparent" />

      {/* Badge */}
      <div className="absolute top-4 left-4">
        <span className={`${dest.badgeColor} text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg font-body`}>
          {dest.badge}
        </span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <MapPin className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-white/70 text-xs font-body">{dest.country}</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-1">
              {dest.name}
            </h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
                <span className="text-white text-xs font-semibold font-body">{dest.rating}</span>
              </div>
              <span className="text-white/50 text-xs font-body">({dest.reviews.toLocaleString()} reviews)</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-white/60 text-xs font-body mb-0.5">From</div>
            <div className="font-display text-xl font-bold text-orange-400">{dest.startFrom}</div>
            <button className="mt-2 flex items-center gap-1 text-white/80 text-xs font-medium hover:text-orange-400 transition-colors font-body group-hover:translate-x-1 transition-transform">
              Explore <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DestinationsSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTitleVisible(true); },
      { threshold: 0.2 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="destinations" className="py-20 bg-white">
      <div className="container mx-auto">
        {/* Section Header */}
        <div
          ref={titleRef}
          className={`mb-12 transition-all duration-700 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-0.5 w-10 bg-orange-400" />
            <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest font-body">
              Explore the Globe
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-blue-950 leading-tight">
              Popular <span className="text-gradient-blue">Destinations</span>
            </h2>
            <p className="text-slate-500 max-w-md font-body leading-relaxed">
              Hand-picked destinations loved by thousands of travelers. Each
              location offers a unique experience waiting to be discovered.
            </p>
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" style={{ gridAutoRows: '240px' }}>
          {DESTINATIONS.map((dest, i) => (
            <DestCard key={dest.id} dest={dest} index={i} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <button
            onClick={() => {
              const el = document.getElementById("booking");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white px-8 py-3.5 rounded-full font-semibold transition-all duration-300 font-body"
          >
            View All Destinations
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
