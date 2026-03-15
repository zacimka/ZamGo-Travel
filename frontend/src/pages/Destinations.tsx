import { useEffect } from "react";
import Navbar from "../components/Navbar";
import DestinationsSection from "../components/DestinationsSection";
import Footer from "../components/Footer";

export default function Destinations() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-white">
      <Navbar />
      <main className="flex-1 pt-24">
        <DestinationsSection />
      </main>
      <Footer />
    </div>
  );
}
