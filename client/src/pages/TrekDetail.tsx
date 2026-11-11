import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { getTrekBySlug, formatPrice } from "@/lib/treks";
import {
  ChevronRight,
  MapPin,
  Users,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Clock,
  MessageCircle,
  Sparkles,
  Minus,
  Plus,
  ShieldCheck,
} from "lucide-react";
import { useParams, useLocation, Link } from "wouter";
import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import {
  PrivacyPolicyDialog,
  TermsOfServiceDialog,
} from "@/components/LegalModals";

/**
 * Trek Detail Page - Premium Wilderness Aesthetic
 * Shows comprehensive trek information with itinerary, pricing, and booking
 */

export default function TrekDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const trek = getTrekBySlug(slug || "");
  const [, setLocation] = useLocation();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [peopleCount, setPeopleCount] = useState<number>(1);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [leadName, setLeadName] = useState<string>("");
  const [leadPhone, setLeadPhone] = useState<string>("");
  const [specialNotes, setSpecialNotes] = useState<string>("");

  // Ensure trek detail page always opens from the very top
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    const raf = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
    return () => cancelAnimationFrame(raf);
  }, [slug]);

  // Tomorrow as minimum selectable date (past & completed dates disabled)
  const minDateStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);



  const baseFare = trek ? trek.price * peopleCount : 0;
  const gstAmount = Math.round(baseFare * 0.05);
  const totalPrice = baseFare + gstAmount;
  const advanceAmount = 1000 * peopleCount;

  const generateWhatsAppBookingUrl = (withLeadInfo: boolean = false) => {
    if (!trek) return "#";
    const dateText = selectedDate
      ? new Date(selectedDate).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "Upcoming Batch (To be scheduled)";

    const lines = [
      `*Expedition Booking Request — Kailasa Trails*`,
      `*Trek:* ${trek.name}`,
      `*Departure Date:* ${dateText}`,
      `*Group Size:* ${peopleCount} ${peopleCount === 1 ? "Person" : "Trekkers"}`,
      `*Base Fare:* ${formatPrice(trek, baseFare)} (${formatPrice(trek, trek.price)}/person)`,
      `*GST (5%):* ₹${gstAmount.toLocaleString("en-IN")}`,
      `*Total Price (incl. 5% GST):* ${formatPrice(trek, totalPrice)}`,
      `*Advance to Reserve:* ₹${advanceAmount.toLocaleString("en-IN")} (₹1,000/person)`,
    ];

    if (withLeadInfo && leadName.trim()) {
      lines.push(`*Lead Trekker:* ${leadName.trim()}`);
    }
    if (withLeadInfo && leadPhone.trim()) {
      lines.push(`*Phone:* ${leadPhone.trim()}`);
    }
    if (withLeadInfo && specialNotes.trim()) {
      lines.push(`*Notes:* ${specialNotes.trim()}`);
    }

    lines.push(
      ``,
      `Please confirm slot availability and share the advance payment QR code / account details.`
    );

    return `https://wa.me/919440650253?text=${encodeURIComponent(
      lines.join("\n")
    )}`;
  };

  const handleProceedToBooking = () => {
    if (!selectedDate) {
      toast.error("Please select a departure date before proceeding to book.");
      const inputEl = document.getElementById("departure-date-input");
      if (inputEl) {
        inputEl.focus();
        inputEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }
    setIsBookingModalOpen(true);
  };

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back();
    } else {
      setLocation("/");
    }
  };

  if (!trek) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Trek Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The trek you're looking for doesn't exist.
          </p>
          <Button
            onClick={() => setLocation("/")}
            className="bg-primary hover:bg-primary/90"
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden w-full max-w-full">
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container flex items-center justify-between h-20">
          <button
            onClick={handleBack}
            className="text-foreground hover:text-primary transition-colors font-semibold"
          >
            ← Back
          </button>
          <h1 className="text-lg font-bold text-foreground">{trek.name}</h1>
          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/919440650253?text=${encodeURIComponent(
                `Hi Kailasa Trails! I'm interested in the ${trek.name} trek. Could you share upcoming dates and availability?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors"
            >
              <MessageCircle className="h-4 w-4" /> Enquire on WhatsApp
            </a>
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => {
                setLocation("/#featured");
              }}
            >
              Discover
            </Button>
            <Button
              size="sm"
              className="bg-emerald-700 hover:bg-emerald-800 text-white"
              onClick={() => {
                document
                  .getElementById("booking")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Book Now
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-slate-900 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url('${trek.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary border border-primary/30 mb-4">
              {trek.difficulty} Grade · {trek.duration} Days
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              {trek.name}
            </h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              {trek.shortDescription}
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
              <div>
                <p className="text-xs text-white/50 uppercase tracking-wider mb-1">
                  Region
                </p>
                <p className="text-sm font-semibold flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-primary" /> {trek.region.split("·")[0]}
                </p>
              </div>
              <div>
                <p className="text-xs text-white/50 uppercase tracking-wider mb-1">
                  Max Altitude
                </p>
                <p className="text-sm font-semibold">{trek.maxAltitude}</p>
              </div>
              <div>
                <p className="text-xs text-white/50 uppercase tracking-wider mb-1">
                  Total Distance
                </p>
                <p className="text-sm font-semibold">{trek.totalDistance}</p>
              </div>
              <div>
                <p className="text-xs text-white/50 uppercase tracking-wider mb-1">
                  Price / Person
                </p>
                <p className="text-sm font-semibold text-primary">
                  {formatPrice(trek, trek.price)} <span className="text-xs font-normal text-white/70">(+5% GST)</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview & Highlights */}
      <section className="py-20 bg-white">
        <div className="container max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">Expedition Overview</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            {trek.fullDescription}
          </p>

          <h3 className="text-2xl font-bold mb-6">Key Highlights</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {trek.highlights.map((highlight, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-border"
              >
                <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span className="text-foreground text-sm font-medium">
                  {highlight}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Day-by-Day Detailed Itinerary */}
      <section className="py-20 bg-slate-50 border-t border-border">
        <div className="container max-w-4xl">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">
              Trail Blueprint
            </p>
            <h2 className="text-4xl font-bold">Day-by-Day Itinerary</h2>
          </div>

          <div className="space-y-6">
            {trek.itinerary.map((day) => (
              <Card
                key={day.day}
                className="p-6 md:p-8 border-border hover:shadow-lg transition-shadow bg-white"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-border/50">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-primary text-primary-foreground font-bold flex items-center justify-center text-sm shadow-md shadow-primary/20">
                      D{day.day}
                    </span>
                    <h3 className="text-xl font-bold">{day.title}</h3>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground">
                    {day.altitude && (
                      <span className="px-3 py-1 rounded-full bg-slate-100">
                        {day.altitude}
                      </span>
                    )}
                    {day.distance && (
                      <span className="px-3 py-1 rounded-full bg-slate-100">
                        {day.distance}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {day.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Inclusions & Exclusions */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-bold mb-8">What's Included</h3>
              <ul className="space-y-4">
                {trek.includes.map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <CheckCircle2 className="h-6 w-6 text-emerald-400 flex-shrink-0" />
                    <span className="text-lg text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-3xl font-bold mb-8">What's Not Included</h3>
              <ul className="space-y-4">
                {trek.excludes.map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <AlertCircle className="h-6 w-6 text-white/40 flex-shrink-0" />
                    <span className="text-lg text-white/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" style={{ scrollMarginTop: "100px" }} className="py-20 bg-white">
        <div className="container max-w-2xl">
          <h3 className="text-4xl font-bold mb-12 text-center">
            Ready to Conquer Your Peak?
          </h3>

          <Card className="border-border p-6 sm:p-10 bg-slate-50 shadow-xl rounded-3xl">
            {/* 1. Departure Date Selection (Past/Completed Dates Disabled) */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-foreground">
                  Select Your Departure Date
                </label>
                <span className="text-xs text-muted-foreground">
                  Past dates disabled
                </span>
              </div>
              <input
                id="departure-date-input"
                type="date"
                min={minDateStr}
                value={selectedDate}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val && val < minDateStr) {
                    toast.error("Past dates cannot be selected. Please choose an upcoming date.");
                    return;
                  }
                  setSelectedDate(val);
                }}
                className="w-full px-4 py-3 border border-border rounded-xl bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-xs"
              />


            </div>

            {/* 2. Number of Trekkers / People */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-foreground mb-2">
                Number of Trekkers
              </label>
              <div className="flex items-center justify-between p-3.5 bg-white border border-border rounded-xl shadow-xs">
                <div>
                  <p className="font-bold text-foreground text-base">
                    {peopleCount} {peopleCount === 1 ? "Person" : "People"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Custom group size: 1 to {trek.groupSize.max || 20}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setPeopleCount((p) => Math.max(1, p - 1))}
                    disabled={peopleCount <= 1}
                    className="w-10 h-10 rounded-lg border border-border bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center font-bold text-lg text-foreground transition-colors"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-bold text-lg text-foreground">
                    {peopleCount}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setPeopleCount((p) =>
                        Math.min(trek.groupSize.max || 20, p + 1)
                      )
                    }
                    disabled={peopleCount >= (trek.groupSize.max || 20)}
                    className="w-10 h-10 rounded-lg border border-border bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center font-bold text-lg text-foreground transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Quick count chips */}
              <div className="flex flex-wrap gap-2 mt-2.5">
                {[1, 2, 4, 6, 8].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setPeopleCount(count)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      peopleCount === count
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "bg-white border border-border text-foreground hover:bg-slate-100"
                    }`}
                  >
                    {count} {count === 1 ? "Trekker" : "Trekkers"}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Total Amount Display Based on People Count */}
            <div className="mb-6 p-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
              <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                <p className="text-xs font-bold text-amber-900 tracking-wider uppercase">
                  TOTAL PRICE FOR {peopleCount} {peopleCount === 1 ? "PERSON" : "PEOPLE"}
                </p>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-600/15 text-emerald-800 font-bold border border-emerald-600/25">
                  ₹{advanceAmount.toLocaleString("en-IN")} Advance to Reserve
                </span>
              </div>
              <div className="flex items-baseline gap-2.5 mb-2">
                <span className="text-4xl font-extrabold text-primary">
                  {formatPrice(trek, totalPrice)}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-md">
                  incl. 5% GST
                </span>
              </div>
              <div className="pt-2.5 border-t border-amber-900/15 space-y-1.5 text-xs text-muted-foreground">
                <div className="flex justify-between items-center">
                  <span>Base Trek Fare ({peopleCount} × {formatPrice(trek, trek.price)}):</span>
                  <span className="font-semibold text-foreground">{formatPrice(trek, baseFare)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Government GST (5%):</span>
                  <span className="font-semibold text-emerald-700 font-mono">+₹{gstAmount.toLocaleString("en-IN")}</span>
                </div>
                <p className="text-[11px] text-muted-foreground/80 pt-1">
                  Certified guides, forest permits, safety equipment & all trail meals included
                </p>
              </div>
            </div>

            {/* 4. Activated Proceed to Booking Button */}
            <Button
              type="button"
              onClick={handleProceedToBooking}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 text-base mb-3 shadow-lg shadow-primary/20 transition-all hover:scale-[1.01]"
            >
              Proceed to Booking <ChevronRight className="ml-2 h-5 w-5" />
            </Button>

            {/* 5. WhatsApp Notice (Replaced money back guarantee) */}
            <div className="mb-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
              <p className="text-xs sm:text-sm text-emerald-950 font-medium flex items-center justify-center gap-1.5 flex-wrap">
                <MessageCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Please contact through WhatsApp on</span>
                <a
                  href="https://wa.me/919440650253?text=Hi%20Kailasa%20Trails!%20I'd%20like%20to%20confirm%20batch%20dates%20before%20booking."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-emerald-700 underline underline-offset-4 hover:text-emerald-800"
                >
                  +91 94406 50253
                </a>
                <span>before booking.</span>
              </p>
            </div>

            {/* 6. Instant Booking Enquiry on WhatsApp */}
            <a
              href={generateWhatsAppBookingUrl(false)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base transition-all shadow-md shadow-emerald-950/20 hover:scale-[1.01]"
            >
              <MessageCircle className="h-5 w-5" /> Instant Booking Enquiry on WhatsApp
            </a>
          </Card>
        </div>
      </section>

      {/* Booking Confirmation Dialog Modal */}
      <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
        <DialogContent className="max-w-lg bg-slate-900 text-white border-white/10 p-6 sm:p-8 rounded-2xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Confirm Expedition Booking
            </DialogTitle>
            <DialogDescription className="text-white/70 text-sm">
              Review your expedition details. Our trek manager will confirm your slots and send the official receipt on WhatsApp.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-4">
            {/* Summary Card */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2.5 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-white/60">Trek:</span>
                <span className="font-semibold text-white">{trek.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/60">Departure Date:</span>
                <span className="font-semibold text-amber-300">
                  {selectedDate
                    ? new Date(selectedDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        weekday: "short",
                      })
                    : "Not selected"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/60">Trekkers:</span>
                <span className="font-semibold text-white">
                  {peopleCount} {peopleCount === 1 ? "Person" : "People"}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs text-white/70 pt-1 border-t border-white/10">
                <span>Base Trek Fare:</span>
                <span>{formatPrice(trek, baseFare)}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-emerald-400">
                <span>Government GST (5%):</span>
                <span>+₹{gstAmount.toLocaleString("en-IN")}</span>
              </div>
              <div className="border-t border-white/10 pt-2 flex justify-between items-center text-base">
                <span className="font-semibold text-white/80">Total (incl. 5% GST):</span>
                <span className="font-extrabold text-amber-400">
                  {formatPrice(trek, totalPrice)}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs text-emerald-400">
                <span>Advance to Reserve Slot:</span>
                <span className="font-bold">₹{advanceAmount.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Lead Trekker Inputs */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1">
                  Lead Trekker Name (Optional)
                </label>
                <Input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1">
                  WhatsApp / Mobile Number (Optional)
                </label>
                <Input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-amber-400"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 pt-2">
            <a
              href={generateWhatsAppBookingUrl(true)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsBookingModalOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-lg shadow-emerald-950/50 transition-all hover:scale-[1.01]"
            >
              <MessageCircle className="w-5 h-5" /> Confirm on WhatsApp (+91 94406 50253)
            </a>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsBookingModalOpen(false)}
              className="text-white/60 hover:text-white hover:bg-white/10 text-sm"
            >
              Close & Edit Details
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-white/10 pt-12 pb-28 lg:pb-12 text-white">
        <div className="container text-center">
          <p className="text-white/60 mb-4">
            Questions? Contact our expedition team
          </p>
          <p className="font-semibold">
            <a
              href="tel:9440650253"
              className="hover:text-primary transition-colors"
            >
              +91 94406 50253
            </a>
            <span className="mx-3 text-white/40">|</span>
            <a
              href="mailto:kailasatrails@gmail.com"
              className="hover:text-primary transition-colors"
            >
              kailasatrails@gmail.com
            </a>
          </p>
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-white/50">
            <button
              type="button"
              onClick={() => setShowPrivacyModal(true)}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setShowTermsModal(true)}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span>•</span>
            <Link
              href="/admin"
              className="hover:text-amber-400 transition-colors inline-flex items-center gap-1.5 font-medium text-amber-400/80"
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Admin Panel
            </Link>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile Bottom Booking Bar (Phones only) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t border-white/10 backdrop-blur-xl px-4 py-3 flex items-center justify-between shadow-2xl">
        <div>
          <p className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">Trek Fare</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-extrabold text-amber-400">
              {formatPrice(trek, trek.price)}
            </span>
            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/20 px-1.5 py-0.5 rounded border border-emerald-500/30">
              +5% GST
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={`https://wa.me/919440650253?text=${encodeURIComponent(
              `Hi Kailasa Trails! I want to confirm batch dates for ${trek.name} (${formatPrice(trek, trek.price)}/person + 5% GST = ${formatPrice(trek, Math.round(trek.price * 1.05))}).`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-colors"
            aria-label="Enquire on WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
          <Button
            size="sm"
            onClick={handleProceedToBooking}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-4 py-2.5 text-xs rounded-xl shadow-md transition-all active:scale-95"
          >
            Book Now <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </Button>
        </div>
      </div>

      <PrivacyPolicyDialog
        open={showPrivacyModal}
        onOpenChange={setShowPrivacyModal}
      />
      <TermsOfServiceDialog
        open={showTermsModal}
        onOpenChange={setShowTermsModal}
      />
    </div>
  );
}
