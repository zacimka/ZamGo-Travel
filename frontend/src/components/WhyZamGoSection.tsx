/* ZamGo Travel — Why Choose ZamGo Section
   Design: Diagonal background, four benefit cards with icons, animated on scroll */
import { useEffect, useRef, useState } from "react";
import { BadgeDollarSign, Compass, HeadphonesIcon, MousePointerClick } from "lucide-react";

const BENEFITS = [
  {
    icon: BadgeDollarSign,
    title: "Best Price Guarantee",
    description:
      "We match any lower price you find. Book with confidence knowing you're getting the best deal available anywhere.",
    color: "from-blue-500 to-blue-700",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: Compass,
    title: "Handpicked Destinations",
    description:
      "Every destination is personally vetted by our travel experts. Only the finest experiences make it to our collection.",
    color: "from-orange-400 to-orange-600",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Travel Support",
    description:
      "Our dedicated support team is available around the clock to assist you before, during, and after your journey.",
    color: "from-emerald-500 to-emerald-700",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    icon: MousePointerClick,
    title: "Easy Online Booking",
    description:
      "Book your dream trip in minutes with our streamlined booking process. Secure payments and instant confirmation.",
    color: "from-purple-500 to-purple-700",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
];

export default function WhyZamGoSection() {
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
    <section
      id="why-zamgo"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, oklch(0.28 0.12 250) 0%, oklch(0.38 0.14 250) 50%, oklch(0.28 0.12 250) 100%)",
      }}
    >
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-400/10 rounded-full translate-y-1/2 -translate-x-1/3" />
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/5 rounded-full" />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-0.5 w-10 bg-orange-400" />
            <span className="text-orange-400 text-sm font-semibold uppercase tracking-widest font-body">
              Our Promise
            </span>
            <div className="h-0.5 w-10 bg-orange-400" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose <span className="text-orange-400">ZamGo Travel</span>?
          </h2>
          <p className="text-white/70 max-w-xl mx-auto font-body text-lg leading-relaxed">
            We go beyond booking — we craft experiences that become stories you
            tell for a lifetime.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className={`group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-7 hover:bg-white/20 transition-all duration-500 cursor-default ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="font-display text-xl font-bold text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-white/65 text-sm leading-relaxed font-body">
                  {benefit.description}
                </p>

                {/* Decorative number */}
                <div className="absolute top-5 right-5 font-display text-5xl font-bold text-white/5 select-none">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center mt-14 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "0.5s" }}
        >
          <div className="inline-flex items-center gap-4 bg-white/10 border border-white/20 rounded-2xl px-8 py-5">
            <div className="text-left">
              <div className="font-display text-2xl font-bold text-white">50,000+</div>
              <div className="text-white/60 text-sm font-body">Happy Travelers</div>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-left">
              <div className="font-display text-2xl font-bold text-white">200+</div>
              <div className="text-white/60 text-sm font-body">Destinations</div>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-left">
              <div className="font-display text-2xl font-bold text-white">4.9★</div>
              <div className="text-white/60 text-sm font-body">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
