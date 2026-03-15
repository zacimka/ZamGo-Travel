import { useEffect } from "react";
import Navbar from "../components/Navbar";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-white">
      <Navbar />
      <main className="flex-1 pt-24 bg-white">
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
