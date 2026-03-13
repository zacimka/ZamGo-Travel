/* ZamGo Travel — Trip Booking Form Section
   Design: Split layout — left info panel, right form with success confirmation */
import { useState } from "react";
import { CheckCircle2, Send, User, Mail, Phone, MapPin, Calendar, Users, MessageSquare } from "lucide-react";
import { trpc } from "../lib/trpc";
import { toast } from "sonner";

const DESTINATIONS_LIST = [
  "Bali, Indonesia",
  "Paris, France",
  "Dubai, UAE",
  "Tokyo, Japan",
  "Maldives",
  "Santorini, Greece",
  "New York, USA",
  "Rome, Italy",
  "Barcelona, Spain",
  "Other",
];

export default function BookingFormSection() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    travelers: "2",
    specialRequests: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const bookingMutation = trpc.bookings.create.useMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await bookingMutation.mutateAsync({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        packageId: 1,
        departureDate: new Date(form.departureDate),
        returnDate: new Date(form.returnDate),
        travelersCount: parseInt(form.travelers),
        specialRequests: form.specialRequests,
        status: "pending",
      });
      setLoading(false);
      setSubmitted(true);
      toast.success("Booking request submitted successfully!");
    } catch (error) {
      setLoading(false);
      console.error("Booking error:", error);
      toast.error("Failed to submit booking. Please try again.");
    }
  };

  const inputClass =
    "w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm font-body focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder-slate-400 bg-white";

  return (
    <section
      id="booking"
      className="py-20 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #f8faff 0%, #fff7f0 100%)" }}
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100/50 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-100/50 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Left Info Panel */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-0.5 w-10 bg-orange-400" />
              <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest font-body">
                Start Your Journey
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-blue-950 leading-tight mb-5">
              Request Your <span className="text-gradient-orange">Dream Trip</span>
            </h2>
            <p className="text-slate-500 font-body leading-relaxed mb-8">
              Fill out the form and our travel experts will craft a personalized
              itinerary just for you. We'll get back to you within 24 hours with
              a tailored proposal.
            </p>

            {/* Process Steps */}
            <div className="space-y-5">
              {[
                { step: "01", title: "Submit Your Request", desc: "Fill in your travel preferences and dates" },
                { step: "02", title: "Get Your Proposal", desc: "Our experts craft a personalized itinerary within 24h" },
                { step: "03", title: "Confirm & Travel", desc: "Review, confirm, and pack your bags!" },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white text-xs font-bold font-body flex-shrink-0 shadow-md">
                    {item.step}
                  </div>
                  <div>
                    <div className="font-semibold text-blue-950 font-body mb-0.5">{item.title}</div>
                    <div className="text-slate-500 text-sm font-body">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap gap-3">
              {["SSL Secured", "No Hidden Fees", "Free Cancellation"].map((badge) => (
                <span
                  key={badge}
                  className="flex items-center gap-1.5 bg-white border border-slate-200 text-slate-600 text-xs px-3 py-1.5 rounded-full font-body shadow-sm"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
              {submitted ? (
                /* Success State */
                <div className="text-center py-12 animate-fade-up">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="font-display text-3xl font-bold text-blue-950 mb-3">
                    Booking Request Sent!
                  </h3>
                  <p className="text-slate-500 font-body leading-relaxed mb-6 max-w-sm mx-auto">
                    Thank you, <strong>{form.fullName}</strong>! Our travel experts will
                    review your request and reach out to{" "}
                    <strong>{form.email}</strong> within 24 hours with a
                    personalized proposal.
                  </p>
                  <div className="bg-blue-50 rounded-2xl p-5 text-left mb-6 max-w-sm mx-auto">
                    <div className="text-sm font-semibold text-blue-900 mb-2 font-body">Your Request Summary</div>
                    <div className="space-y-1 text-sm text-slate-600 font-body">
                      <div><span className="font-medium">Destination:</span> {form.destination}</div>
                      <div><span className="font-medium">Departure:</span> {form.departureDate}</div>
                      <div><span className="font-medium">Travelers:</span> {form.travelers}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ fullName: "", email: "", phone: "", destination: "", departureDate: "", returnDate: "", travelers: "2", specialRequests: "" }); }}
                    className="btn-primary px-8 py-3 rounded-full font-semibold font-body"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-display text-2xl font-bold text-blue-950 mb-1">
                    Trip Booking Form
                  </h3>
                  <p className="text-slate-500 text-sm font-body mb-5">
                    All fields marked with * are required
                  </p>

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5 font-body">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          name="fullName"
                          value={form.fullName}
                          onChange={handleChange}
                          required
                          placeholder="John Smith"
                          className={`${inputClass} pl-10`}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5 font-body">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="john@example.com"
                          className={`${inputClass} pl-10`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phone + Destination */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5 font-body">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          required
                          placeholder="+1 234 567 890"
                          className={`${inputClass} pl-10`}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5 font-body">
                        Destination *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <select
                          name="destination"
                          value={form.destination}
                          onChange={handleChange}
                          required
                          className={`${inputClass} pl-10 appearance-none`}
                        >
                          <option value="">Select destination</option>
                          {DESTINATIONS_LIST.map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5 font-body">
                        Departure Date *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="date"
                          name="departureDate"
                          value={form.departureDate}
                          onChange={handleChange}
                          required
                          className={`${inputClass} pl-10`}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5 font-body">
                        Return Date *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="date"
                          name="returnDate"
                          value={form.returnDate}
                          onChange={handleChange}
                          required
                          className={`${inputClass} pl-10`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Travelers */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 font-body">
                      Number of Travelers *
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <select
                        name="travelers"
                        value={form.travelers}
                        onChange={handleChange}
                        required
                        className={`${inputClass} pl-10 appearance-none`}
                      >
                        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"].map((n) => (
                          <option key={n} value={n}>{n} {parseInt(n) === 1 ? "Traveler" : "Travelers"}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 font-body">
                      Special Requests
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                      <textarea
                        name="specialRequests"
                        value={form.specialRequests}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Dietary requirements, accessibility needs, preferred activities, budget range..."
                        className={`${inputClass} pl-10 resize-none`}
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-accent py-4 rounded-xl font-semibold text-base font-body flex items-center justify-center gap-2 shadow-lg disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Request Booking
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-slate-400 font-body">
                    By submitting, you agree to our Terms of Service and Privacy Policy.
                    No payment required at this stage.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
