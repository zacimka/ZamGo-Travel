/* ZamGo Travel — Featured Travel Packages Section
   Design: Modern cards with image, details, price, and Book Now CTA */
import { useEffect, useRef, useState } from "react";
import { Clock, Star, ArrowRight, Tag, Users } from "lucide-react";

const PACKAGES = [
  {
    id: 1,
    destination: "Bali Paradise",
    country: "Indonesia",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663431394260/jNKUbrYpfKW2oNDJnLmJn2/dest-bali-TB5pLW4xkVivvE2HByFAJW.webp",
    description: "Immerse yourself in Bali's spiritual temples, lush rice terraces, and pristine beaches. A perfect blend of culture and relaxation.",
    duration: "8 Days / 7 Nights",
    price: "$1,299",
    originalPrice: "$1,699",
    rating: 4.9,
    reviews: 312,
    maxPeople: 12,
    includes: ["Flights", "Hotel", "Tours"],
    featured: true,
  },
  {
    id: 2,
    destination: "Paris Romance",
    country: "France",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663431394260/jNKUbrYpfKW2oNDJnLmJn2/dest-paris-LEbYBGyhc2jXGtfQdSNCwY.webp",
    description: "Experience the City of Light with Seine River cruises, Eiffel Tower visits, world-class cuisine, and iconic art galleries.",
    duration: "6 Days / 5 Nights",
    price: "$1,599",
    originalPrice: "$1,999",
    rating: 4.8,
    reviews: 245,
    maxPeople: 10,
    includes: ["Flights", "Hotel", "Breakfast"],
    featured: false,
  },
  {
    id: 3,
    destination: "Dubai Luxury",
    country: "UAE",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663431394260/jNKUbrYpfKW2oNDJnLmJn2/dest-dubai-RM9SheVPLsTCo52RR2EyvW.webp",
    description: "Discover the future in Dubai — towering skyscrapers, desert safaris, luxury shopping, and world-record attractions.",
    duration: "5 Days / 4 Nights",
    price: "$1,899",
    originalPrice: "$2,399",
    rating: 4.7,
    reviews: 198,
    maxPeople: 8,
    includes: ["Flights", "5-Star Hotel", "Desert Safari"],
    featured: false,
  },
  {
    id: 4,
    destination: "Tokyo Explorer",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    description: "Journey through ancient temples, futuristic districts, cherry blossom parks, and the world's finest culinary scene.",
    duration: "10 Days / 9 Nights",
    price: "$1,749",
    originalPrice: "$2,199",
    rating: 4.9,
    reviews: 276,
    maxPeople: 15,
    includes: ["Flights", "Hotel", "JR Pass"],
    featured: false,
  },
  {
    id: 5,
    destination: "Maldives Escape",
    country: "Indian Ocean",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663431394260/jNKUbrYpfKW2oNDJnLmJn2/dest-maldives-b4pVb3RS4DvKxZr5RwuEGj.webp",
    description: "Unwind in overwater bungalows above crystal-clear lagoons. Snorkeling, diving, and sunset cruises await in paradise.",
    duration: "7 Days / 6 Nights",
    price: "$2,499",
    originalPrice: "$3,199",
    rating: 5.0,
    reviews: 143,
    maxPeople: 6,
    includes: ["Seaplane", "Overwater Villa", "All Meals"],
    featured: false,
  },
  {
    id: 6,
    destination: "Santorini Dream",
    country: "Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
    description: "Wander through whitewashed villages, watch iconic sunsets from Oia, and sail the Aegean Sea on a private catamaran.",
    duration: "7 Days / 6 Nights",
    price: "$1,849",
    originalPrice: "$2,299",
    rating: 4.8,
    reviews: 189,
    maxPeople: 10,
    includes: ["Flights", "Boutique Hotel", "Boat Tour"],
    featured: false,
  },
];

function PackageCard({ pkg, index }: { pkg: (typeof PACKAGES)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const scrollToBooking = () => {
    const el = document.getElementById("booking");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const discount = Math.round(
    ((parseFloat(pkg.originalPrice.replace("$", "").replace(",", "")) -
      parseFloat(pkg.price.replace("$", "").replace(",", ""))) /
      parseFloat(pkg.originalPrice.replace("$", "").replace(",", ""))) *
      100
  );

  return (
    <div
      ref={ref}
      className={`group bg-white rounded-2xl overflow-hidden shadow-md card-hover border border-slate-100 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${pkg.featured ? "ring-2 ring-orange-400 ring-offset-2" : ""}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      {/* Image */}
      <div className="relative h-52 img-zoom-container">
        <img
          src={pkg.image}
          alt={pkg.destination}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {pkg.featured && (
            <span className="bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full font-body">
              Featured
            </span>
          )}
          <span className="bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full font-body">
            -{discount}% OFF
          </span>
        </div>

        {/* Rating on image */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/95 rounded-full px-2.5 py-1 shadow">
          <Star className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
          <span className="text-slate-800 text-xs font-bold font-body">{pkg.rating}</span>
          <span className="text-slate-500 text-xs font-body">({pkg.reviews})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-display text-xl font-bold text-blue-950 group-hover:text-blue-700 transition-colors">
              {pkg.destination}
            </h3>
            <p className="text-slate-500 text-sm font-body">{pkg.country}</p>
          </div>
          <div className="text-right">
            <div className="text-slate-400 text-xs line-through font-body">{pkg.originalPrice}</div>
            <div className="font-display text-xl font-bold text-orange-500">{pkg.price}</div>
            <div className="text-slate-400 text-xs font-body">per person</div>
          </div>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed mb-4 font-body line-clamp-2">
          {pkg.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4 text-sm text-slate-500 font-body">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-blue-500" />
            <span>{pkg.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-blue-500" />
            <span>Max {pkg.maxPeople}</span>
          </div>
        </div>

        {/* Includes */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {pkg.includes.map((item) => (
            <span
              key={item}
              className="flex items-center gap-1 bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full font-medium font-body"
            >
              <Tag className="w-3 h-3" />
              {item}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={scrollToBooking}
          className="w-full btn-primary py-3 rounded-xl font-semibold text-sm font-body flex items-center justify-center gap-2 group"
        >
          Book Now
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

export default function PackagesSection() {
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
    <section id="packages" className="py-20 bg-slate-50">
      <div className="container mx-auto">
        {/* Header */}
        <div
          ref={titleRef}
          className={`mb-12 transition-all duration-700 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-0.5 w-10 bg-orange-400" />
            <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest font-body">
              Curated For You
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-blue-950 leading-tight">
              Featured Travel <span className="text-gradient-orange">Packages</span>
            </h2>
            <p className="text-slate-500 max-w-md font-body leading-relaxed">
              All-inclusive packages designed by travel experts. Every detail
              handled so you can focus on creating memories.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PACKAGES.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
