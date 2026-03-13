/* ZamGo Travel — Newsletter Signup Section
   Design: Full-width gradient band with email input */
import { useState } from "react";
import { Mail, CheckCircle2, Send } from "lucide-react";
import { trpc } from "../lib/trpc";
import { toast } from "sonner";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const newsletterMutation = trpc.newsletter.subscribe.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      await newsletterMutation.mutateAsync({ email });
      setLoading(false);
      setSubscribed(true);
      toast.success("Successfully subscribed to our newsletter!");
      setEmail("");
    } catch (error) {
      setLoading(false);
      console.error("Newsletter subscription error:", error);
      toast.error("Failed to subscribe. Please try again.");
    }
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, oklch(0.68 0.19 50) 0%, oklch(0.62 0.20 45) 40%, oklch(0.55 0.18 35) 100%)",
        }}
      />
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/4" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full" />

      <div className="container mx-auto relative z-10 text-center">
        {/* Icon */}
        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
          <Mail className="w-8 h-8 text-white" />
        </div>

        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
          Get Exclusive Travel Deals
        </h2>
        <p className="text-white/80 font-body text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          Subscribe to our newsletter and be the first to receive handpicked
          travel deals, destination guides, and insider tips delivered straight
          to your inbox.
        </p>

        {/* Perks */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {["Early access to flash sales", "Exclusive member discounts", "Weekly travel inspiration"].map((perk) => (
            <div key={perk} className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2">
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-body">{perk}</span>
            </div>
          ))}
        </div>

        {/* Form */}
        {subscribed ? (
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl px-8 py-5 animate-fade-up">
            <CheckCircle2 className="w-6 h-6 text-white" />
            <div className="text-left">
              <div className="font-semibold text-white font-body">You're subscribed!</div>
              <div className="text-white/70 text-sm font-body">Welcome to the ZamGo travel community.</div>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email address"
                className="w-full bg-white rounded-xl pl-12 pr-4 py-4 text-slate-800 font-body text-sm focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-900 hover:bg-blue-950 text-white px-7 py-4 rounded-xl font-semibold font-body flex items-center justify-center gap-2 shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 whitespace-nowrap"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Subscribe Free
                </>
              )}
            </button>
          </form>
        )}

        <p className="text-white/50 text-xs mt-4 font-body">
          No spam, ever. Unsubscribe at any time. We respect your privacy.
        </p>
      </div>
    </section>
  );
}
