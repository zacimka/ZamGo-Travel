/* ZamGo Travel — Contact Section
   Design: Split layout — left contact info, right contact form */
import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";
import { trpc } from "../lib/trpc";
import { toast } from "sonner";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const contactMutation = trpc.contact.submit.useMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await contactMutation.mutateAsync({
        fullName: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
      });
      setLoading(false);
      setSent(true);
      toast.success("Message sent successfully! We'll reply within 24 hours.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setLoading(false);
      console.error("Contact form error:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  const inputClass =
    "w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm font-body focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder-slate-400 bg-white";

  const SOCIAL = [
    { icon: Facebook, label: "Facebook", color: "hover:bg-blue-600" },
    { icon: Twitter, label: "Twitter", color: "hover:bg-sky-500" },
    { icon: Instagram, label: "Instagram", color: "hover:bg-pink-600" },
    { icon: Youtube, label: "YouTube", color: "hover:bg-red-600" },
    { icon: Linkedin, label: "LinkedIn", color: "hover:bg-blue-700" },
  ];

  return (
    <section id="contact" className="py-20 bg-slate-50">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-0.5 w-10 bg-orange-400" />
            <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest font-body">
              Get In Touch
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-blue-950 leading-tight">
              We'd Love to <span className="text-gradient-blue">Hear From You</span>
            </h2>
            <p className="text-slate-500 max-w-md font-body leading-relaxed">
              Have questions about a destination or package? Our friendly team
              is here to help you plan your perfect trip.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left: Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Info Cards */}
            {[
              {
                icon: Mail,
                title: "Email Us",
                lines: ["hello@zamgotravel.com", "bookings@zamgotravel.com"],
                color: "bg-blue-100 text-blue-600",
              },
              {
                icon: Phone,
                title: "Call Us",
                lines: ["+1 (234) 567-8900", "+1 (234) 567-8901"],
                color: "bg-orange-100 text-orange-600",
              },
              {
                icon: MapPin,
                title: "Visit Our Office",
                lines: ["123 Travel Boulevard, Suite 400", "New York, NY 10001, USA"],
                color: "bg-emerald-100 text-emerald-600",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                >
                  <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-blue-950 font-body mb-1">{item.title}</div>
                    {item.lines.map((line) => (
                      <div key={line} className="text-slate-500 text-sm font-body">{line}</div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Office Hours */}
            <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-2xl p-6 text-white">
              <h4 className="font-display text-lg font-bold mb-3">Office Hours</h4>
              <div className="space-y-2 text-sm font-body">
                <div className="flex justify-between">
                  <span className="text-white/70">Monday – Friday</span>
                  <span className="font-medium">9:00 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Saturday</span>
                  <span className="font-medium">10:00 AM – 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Sunday</span>
                  <span className="font-medium text-orange-400">Closed</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/20">
                <div className="text-orange-400 text-sm font-semibold font-body">24/7 Emergency Support</div>
                <div className="text-white/70 text-xs font-body mt-0.5">For travelers currently on trips</div>
              </div>
            </div>

            {/* Social */}
            <div>
              <div className="font-semibold text-blue-950 font-body mb-3">Follow Us</div>
              <div className="flex gap-2">
                {SOCIAL.map(({ icon: Icon, label, color }) => (
                  <button
                    key={label}
                    aria-label={label}
                    className={`w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 ${color} hover:text-white hover:border-transparent transition-all duration-300 shadow-sm`}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
              {sent ? (
                <div className="text-center py-10 animate-fade-up">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-blue-950 mb-2">Message Sent!</h3>
                  <p className="text-slate-500 font-body mb-6">
                    Thanks for reaching out, <strong>{form.name}</strong>! We'll reply to{" "}
                    <strong>{form.email}</strong> within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                    className="btn-primary px-6 py-2.5 rounded-full font-semibold font-body text-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-display text-2xl font-bold text-blue-950 mb-1">Send a Message</h3>
                  <p className="text-slate-500 text-sm font-body mb-5">
                    We typically respond within a few hours during business hours.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5 font-body">Your Name *</label>
                      <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="John Smith" className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5 font-body">Email Address *</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="john@example.com" className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 font-body">Subject *</label>
                    <input type="text" name="subject" value={form.subject} onChange={handleChange} required placeholder="How can we help you?" className={inputClass} />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 font-body">Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us about your travel plans or questions..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary py-4 rounded-xl font-semibold text-base font-body flex items-center justify-center gap-2 shadow-lg disabled:opacity-70"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
