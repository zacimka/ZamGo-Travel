/* ZamGo Travel — Home Page
   Design: Coastal Modernism — Playfair Display + DM Sans, Blue + Orange palette
   Assembles all sections in order */
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import DestinationsSection from "../components/DestinationsSection";
import PackagesSection from "../components/PackagesSection";
import WhyZamGoSection from "../components/WhyZamGoSection";
import TestimonialsSection from "../components/TestimonialsSection";
import BookingFormSection from "../components/BookingFormSection";
import NewsletterSection from "../components/NewsletterSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <DestinationsSection />
        <PackagesSection />
        <WhyZamGoSection />
        <TestimonialsSection />
        <BookingFormSection />
        <NewsletterSection />
        <ContactSection />
      </main>
      <Footer />
    </div>

  );
}
