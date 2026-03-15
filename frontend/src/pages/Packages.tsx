import { useEffect } from "react";
import Navbar from "../components/Navbar";
import PackagesSection from "../components/PackagesSection";
import Footer from "../components/Footer";

export default function Packages() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-white">
      <Navbar />
      <main className="flex-1 pt-24">
        <PackagesSection />
      </main>
      <Footer />
    </div>
  );
}
