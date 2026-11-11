import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronRight,
  MapPin,
  Users,
  Zap,
  ArrowRight,
  Camera,
  Loader2,
  ImagePlus,
  X,
  Menu,
  Phone,
  ZoomIn,
  Compass,
  Mountain,
  MessageCircle,
  Calendar,
  ShieldCheck,
  Tag,
  Sparkles,
} from "lucide-react";
import { useState, useMemo, useRef, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { treks, formatPrice } from "@/lib/treks";
import HimalayanPeakExplorer from "@/components/HimalayanPeakExplorer";
import BunnyDialogueExperience from "@/components/BunnyDialogueExperience";
import TrailMatcherQuiz from "@/components/TrailMatcherQuiz";
import LiveSummitWeather from "@/components/LiveSummitWeather";
import SummitRushGame from "@/components/SummitRushGame";
import AntigravityCursorField from "@/components/AntigravityCursorField";
import {
  PrivacyPolicyDialog,
  TermsOfServiceDialog,
  DifficultyLevelsDialog,
} from "@/components/LegalModals";

/**
 * Kailasa Trails - Premium Wilderness Aesthetic
 * Design Philosophy: Dark luxury editorial with asymmetric layouts
 * Color Palette: Deep charcoal backgrounds + warm bronze/gold + cream text
 * Typography: Playfair Display (headlines), Lora (subheadings), Inter (body)
 * Signature: Diagonal dividers, full-bleed imagery, organic transitions
 */

export default function Home() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    } else {
      const id = window.location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          const headerOffset = id === "weather" ? 130 : 100;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: "smooth",
          });
        }, 150);
      }
    }
  }, []);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      // 80px fixed header + 50px clearance for Live Trail Telemetry
      const headerOffset = id === "weather" ? 130 : 100;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth",
      });
      window.history.pushState(null, "", `#${id}`);
    }
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [difficulty, setDifficulty] = useState("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showDifficultyModal, setShowDifficultyModal] = useState(false);
  const [galleryForm, setGalleryForm] = useState({
    name: "",
    email: "",
    phone: "",
    trek: "",
    story: "",
  });
  const [selectedPhoto, setSelectedPhoto] = useState<{
    base64: string;
    name: string;
    type: string;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [lightboxImage, setLightboxImage] = useState<{
    url: string;
    title: string;
    subtitle?: string;
  } | null>(null);

  const { data: approvedSubmissions } = trpc.gallery.listApproved.useQuery();
  const submitGallery = trpc.gallery.submit.useMutation();

  const handleGalleryFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setGalleryForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file (JPG, PNG, WEBP)");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast.error("Photo must be smaller than 8 MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setSelectedPhoto({
        base64: dataUrl.split(",")[1],
        name: file.name,
        type: file.type,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone, trek, story } = galleryForm;
    if (!name.trim() || !email.trim()) {
      toast.error("Please fill in your name and email");
      return;
    }
    setSubmitting(true);
    try {
      await submitGallery.mutateAsync({
        name,
        email,
        phone: phone || undefined,
        trek: trek || undefined,
        story: story || undefined,
        photoBase64: selectedPhoto?.base64,
        photoName: selectedPhoto?.name,
        photoType: selectedPhoto?.type,
      });
      toast.success(
        "Thank you! Your story and photo have been submitted for review. Once approved, they will appear in the gallery.",
      );
      setGalleryForm({ name: "", email: "", phone: "", trek: "", story: "" });
      setSelectedPhoto(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Submission failed. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone, message } = formData;
    const text = [
      "*New Trek Enquiry — Kailasa Trails*",
      `Name: ${name}`,
      email ? `Email: ${email}` : "",
      phone ? `Phone: ${phone}` : "",
      message ? `Message: ${message}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    const url = `https://wa.me/919440650253?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden w-full max-w-full">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <img
              src="/manus-storage/kailasa-logo-transparent.png"
              alt="Kailasa Trails"
              className="h-16 w-auto object-contain"
            />
            <div>
              <h1 className="text-lg font-bold text-foreground tracking-wide">
                KAILASA
              </h1>
              <p className="text-xs text-primary font-semibold">
                TRAILS
              </p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <a
              href="#featured"
              onClick={(e) => scrollToSection(e, "featured")}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Featured Treks
            </a>
            <a
              href="#weather"
              onClick={(e) => scrollToSection(e, "weather")}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Weather
            </a>
            <a
              href="#matcher"
              onClick={(e) => scrollToSection(e, "matcher")}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Find Your Type
            </a>
            <a
              href="#summit-game"
              onClick={(e) => scrollToSection(e, "summit-game")}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Summit Climber
            </a>
            <a
              href="#destinations"
              onClick={(e) => scrollToSection(e, "destinations")}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Destinations
            </a>
            <a
              href="#about"
              onClick={(e) => scrollToSection(e, "about")}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              About
            </a>
            <a
              href="#gallery"
              onClick={(e) => scrollToSection(e, "gallery")}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Gallery
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "contact")}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md shadow-primary/20 text-xs sm:text-sm px-3 sm:px-4"
              size="sm"
              onClick={() => {
                if (window.location.pathname !== "/") {
                  setLocation("/#featured");
                } else {
                  document
                    .getElementById("featured")
                    ?.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Explore Treks
            </Button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-foreground hover:bg-slate-100 transition-colors border border-border"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-border shadow-2xl animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto">
            <div className="container py-5 space-y-4">
              <nav className="grid grid-cols-2 gap-2 text-xs sm:text-sm font-medium">
                <a
                  href="#featured"
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    scrollToSection(e, "featured");
                  }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Mountain className="w-4 h-4 text-primary" />
                  <span>Featured Treks</span>
                </a>
                <a
                  href="#weather"
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    scrollToSection(e, "weather");
                  }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Live Weather</span>
                </a>
                <a
                  href="#matcher"
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    scrollToSection(e, "matcher");
                  }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Compass className="w-4 h-4 text-primary" />
                  <span>Find Your Type</span>
                </a>
                <a
                  href="#summit-game"
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    scrollToSection(e, "summit-game");
                  }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span>Summit Climber</span>
                </a>
                <a
                  href="#destinations"
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    scrollToSection(e, "destinations");
                  }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Destinations</span>
                </a>
                <a
                  href="#gallery"
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    scrollToSection(e, "gallery");
                  }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Camera className="w-4 h-4 text-primary" />
                  <span>Gallery</span>
                </a>
                <a
                  href="#about"
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    scrollToSection(e, "about");
                  }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Users className="w-4 h-4 text-primary" />
                  <span>About Us</span>
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    scrollToSection(e, "contact");
                  }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-primary" />
                  <span>Contact Us</span>
                </a>
              </nav>

              {/* Direct Quick Action CTAs on Mobile */}
              <div className="pt-3 border-t border-border flex flex-col gap-2">
                <a
                  href="https://wa.me/919440650253?text=Hi%20Kailasa%20Trails!%20I'm%20exploring%20your%20website%20on%20mobile%20and%20want%20to%20enquire%20about%20upcoming%20treks."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4" /> Book / Enquire on WhatsApp
                </a>
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 px-1">
                  <a href="tel:9440650253" className="flex items-center gap-1.5 text-foreground font-semibold hover:text-primary">
                    <Phone className="w-3.5 h-3.5 text-primary" /> +91 94406 50253
                  </a>
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-1 text-amber-700 font-semibold hover:text-amber-800"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" /> Admin Panel
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section with Snowy Weather & Cool Mountain Atmosphere Simulation */}
      <section className="relative pt-24 pb-20 sm:pt-36 sm:pb-36 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/manus-storage/hero-mountain-dawn_3c01f024.png')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/85" />

        {/* Interactive Small Snow Antigravity Atmosphere (Reacts dynamically to cursor movement) */}
        <AntigravityCursorField className="z-[2] opacity-95" particleCount={560} interactiveRadius={185} />

        <div className="container relative z-10 flex flex-col items-center justify-center text-center min-h-[500px] sm:min-h-[600px] px-4">
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold text-white mb-6 sm:mb-8 leading-tight tracking-tight drop-shadow-2xl">
              Where Mountains Meet Mastery
            </h2>
            <p className="text-base sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-12 font-light max-w-3xl mx-auto drop-shadow-md">
              Embark on transformative journeys through the world's most
              breathtaking peaks and trails, guided by experts who know every
              summit intimately
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full max-w-md sm:max-w-none mx-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground text-sm sm:text-base font-semibold px-6 sm:px-10 py-5 sm:py-6 shadow-xl shadow-primary/25 transition-all hover:scale-105"
                onClick={() => {
                  document
                    .getElementById("featured")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Discover Your Next Peak <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white/60 text-white hover:bg-white/15 text-sm sm:text-base font-semibold px-6 sm:px-10 py-5 sm:py-6 backdrop-blur-sm transition-all hover:scale-105"
                onClick={() => {
                  document
                    .getElementById("matcher")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Find Your Type
              </Button>
            </div>
          </div>
        </div>

        {/* Seamless Diagonal Divider Blending directly into Featured Treks */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-b from-transparent to-slate-900 pointer-events-none" />
      </section>

      {/* Featured Treks - Dark Luxury Section with Integrated Live Weather Telemetry */}
      <section id="featured" className="pt-16 pb-20 sm:pb-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="container">
          {/* Live Summit Weather Station Telemetry Bar */}
          <div id="weather" style={{ scrollMarginTop: "130px" }} className="scroll-mt-32 mb-16 pt-2">
            <LiveSummitWeather />
          </div>

          <div className="mb-12">
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-4">
              Handpicked Expeditions
            </p>
            <h3 className="text-6xl md:text-7xl font-bold mb-6">
              Featured Treks
            </h3>
            <p className="text-xl text-white/70 max-w-2xl">
              Each expedition is carefully curated for those who seek authentic
              experiences and genuine wilderness encounters
            </p>
          </div>

          {/* Difficulty Filter & Interactive Grading Guide */}
          <div
            id="difficulty"
            style={{ scrollMarginTop: "120px" }}
            className="flex flex-wrap items-center justify-between gap-4 mb-16 p-4 rounded-2xl bg-white/[0.03] border border-white/10"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold text-white/70 uppercase tracking-wider flex items-center gap-2">
                <Mountain className="w-4 h-4 text-primary" /> Filter by difficulty:
              </span>
              {["All", "Easy", "Moderate", "Advanced"].map(
                (level) => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                      difficulty === level
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                        : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                    }`}
                  >
                    {level}
                  </button>
                )
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDifficultyModal(true)}
              className="border-primary/40 text-primary hover:bg-primary/10 text-xs font-semibold gap-1.5 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" /> Difficulty Grading Guide
            </Button>
          </div>

          {/* Dynamic Trek Roster */}
          {treks.length === 0 ? (
            <div className="py-20 px-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl text-center max-w-3xl mx-auto shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
                <Compass className="w-8 h-8 text-primary animate-pulse" />
              </div>
              <h4 className="text-3xl font-bold text-white mb-3">
                Expedition Roster Cleared
              </h4>
            </div>
          ) : (
            <div className="space-y-24">
              {treks
                .filter((t) => difficulty === "All" || t.difficulty.toLowerCase().includes(difficulty.toLowerCase()))
                .map((trek, idx) => (
                  <div
                    key={trek.id}
                    className={`grid lg:grid-cols-12 gap-6 lg:gap-10 items-center p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-slate-800/80 to-slate-900/90 border border-white/10 shadow-2xl backdrop-blur-md relative overflow-hidden`}
                  >
                    {/* Subtle glow */}
                    <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

                    {/* Image Column */}
                    <div className={`lg:col-span-5 relative group ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                      <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl aspect-[4/3] relative">
                        <img
                          src={trek.image}
                          alt={trek.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        
                        {/* Price Tag Overlay */}
                        <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-amber-400/40 text-amber-300 font-bold text-xs sm:text-sm shadow-xl">
                            <Tag className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
                            {formatPrice(trek, trek.price)} <span className="text-white/60 font-normal text-[11px] sm:text-xs">/ person</span> <span className="text-[9px] sm:text-[10px] font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-400/30 px-1.5 py-0.5 rounded-full uppercase">+5% GST</span>
                          </span>
                        </div>

                        {/* Duration Badge */}
                        <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-[11px] sm:text-xs text-white/90">
                          <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-white/15 font-semibold">
                            {trek.duration} Days / {trek.duration - 1} Nights
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-primary/80 backdrop-blur-sm text-primary-foreground font-bold">
                            Max Alt: {trek.maxAltitude}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content Column */}
                    <div className={`lg:col-span-7 flex flex-col justify-between ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                      <div>
                        {/* Badges */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-primary/15 text-primary border border-primary/30">
                            {trek.difficulty} Grade
                          </span>
                          <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-white/10 text-white/80 border border-white/10">
                            Best Season: {trek.bestSeason.join(", ")}
                          </span>
                        </div>

                        <h4 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3">
                          {trek.name}
                        </h4>

                        <p className="text-sm sm:text-base text-white/75 mb-6 leading-relaxed">
                          {trek.shortDescription}
                        </p>

                        {/* Route telemetry grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-6 p-3.5 sm:p-4 rounded-2xl bg-black/30 border border-white/5">
                          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white/80">
                            <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="truncate">{trek.region}</span>
                          </div>
                          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white/80">
                            <Calendar className="h-4 w-4 text-amber-400 flex-shrink-0" />
                            <span>Advance: ₹1,000 to book</span>
                          </div>
                          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white/80">
                            <Users className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                            <span>{trek.groupSize.min}-{trek.groupSize.max} per batch</span>
                          </div>
                          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white/80">
                            <ShieldCheck className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                            <span>Certified Guides & Safety Gear</span>
                          </div>
                        </div>
                      </div>

                      {/* CTAs */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 pt-2">
                        <Button
                          className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 shadow-lg shadow-primary/20 justify-center text-sm"
                          onClick={() => setLocation(`/trek/${trek.slug}`)}
                        >
                          View Full Itinerary <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>

                        <a
                          href={`https://wa.me/919440650253?text=${encodeURIComponent(
                            `Hi Kailasa Trails! I want to book the ${trek.name} (${formatPrice(trek, trek.price)}/person + 5% GST = ${formatPrice(trek, Math.round(trek.price * 1.05))}). Please share the upcoming batch dates and booking details.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-950/40 hover:scale-[1.02]"
                        >
                          <MessageCircle className="w-4 h-4" /> Book on WhatsApp
                        </a>

                        <a
                          href="tel:9440650253"
                          className="text-xs text-white/60 hover:text-white underline underline-offset-4 transition-colors px-2 text-center py-1 sm:py-0"
                        >
                          Call +91 94406 50253
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </section>

      {/* Ascent Route & Topographic Elevation Explorer */}
      <section id="peaks-guide" className="py-24 bg-slate-950 text-white relative border-t border-white/5">
        <div className="container">
          <HimalayanPeakExplorer />
        </div>
      </section>

      {/* Interactive Trail Matcher Quiz - 3D Summit Finder */}
      <section id="matcher" className="py-24 bg-slate-950 text-white relative border-t border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="container relative z-10">
          <TrailMatcherQuiz />
        </div>
      </section>

      {/* Why Choose Us - Light Contrast Section */}
      <section className="py-32 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-16">
            <div>
              <div className="mb-6 flex">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h4 className="text-3xl font-bold text-foreground mb-4">
                Expert Guides
              </h4>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our guides know every trail intimately, ensuring safety and
                unforgettable experiences through their deep wilderness
                expertise and passion
              </p>
            </div>

            <div>
              <div className="mb-6 flex">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h4 className="text-3xl font-bold text-foreground mb-4">
                Premium Comfort
              </h4>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Luxury accommodations and gourmet meals combined with authentic
                wilderness. We believe adventure should never compromise comfort
              </p>
            </div>

            <div>
              <div className="mb-6 flex">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h4 className="text-3xl font-bold text-foreground mb-4">
                Small Groups
              </h4>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Intimate group sizes ensure personalized attention, genuine
                connections, and minimal environmental impact on the trails
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations - Dark Editorial Section */}
      <section id="destinations" className="py-20 sm:py-32 bg-slate-900 text-white overflow-hidden">
        <div className="container">
          <div className="mb-20">
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-4">
              Expeditions
            </p>
            <h3 className="text-6xl md:text-7xl font-bold mb-6">
              Our Destinations
            </h3>
            <p className="text-xl text-white/70 max-w-2xl">
              From majestic high-altitude passes to remote alpine valleys, we explore the world's most iconic summits and pristine wilderness trails
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Himalayas & High Passes",
                description:
                  "Towering snow peaks, glacial valleys, and legendary high-altitude trails",
                icon: "🏔️",
              },
              {
                name: "Alpine Valleys & Wilderness",
                description:
                  "Pristine meadows, emerald alpine lakes, and remote wilderness ridges",
                icon: "🌲",
              },
            ].map((dest, idx) => (
              <div
                key={idx}
                className="p-8 border border-white/10 rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-300 group cursor-pointer"
                onClick={() => {
                  document
                    .getElementById("featured")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <div className="text-4xl mb-4">{dest.icon}</div>
                <h5 className="text-2xl font-bold text-white mb-3">
                  {dest.name}
                </h5>
                <p className="text-white/70 mb-6 leading-relaxed">
                  {dest.description}
                </p>
                <div className="flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform">
                  Explore <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us - Asymmetric Layout */}
      <section id="about" className="py-20 sm:py-32 bg-white overflow-hidden">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-4">
                Our Story
              </p>
              <h3 className="text-4xl sm:text-6xl font-bold text-foreground mb-8">
                About Kailasa Trails
              </h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Founded by passionate mountaineers and wilderness enthusiasts,
                Kailasa Trails is dedicated to creating transformative travel
                experiences that combine luxury with authentic adventure.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We believe that the greatest journeys are those that challenge
                us, inspire us, and connect us to the raw beauty of nature. Our
                mission is to guide discerning travelers to the world's most
                remarkable peaks and trails.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-foreground text-lg">
                    Years of expedition expertise
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-foreground text-lg">
                    Successful expeditions completed
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-foreground text-lg">
                    Expert guides with international certifications
                  </span>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 relative">
              <img
                src="/manus-storage/mountain-lake-reflection_28b217ce.png"
                alt="About Kailasa Trails"
                className="rounded-lg shadow-2xl w-full"
              />
              <div className="absolute -bottom-4 right-2 sm:-bottom-8 sm:-right-8 bg-primary text-primary-foreground p-4 sm:p-8 rounded-lg shadow-2xl max-w-[220px] sm:max-w-xs">
                <p className="text-sm sm:text-lg font-semibold italic">
                  "Where silence becomes the greatest luxury"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Mountain Mini-Game - Summit Rush */}
      <section id="summit-game" className="py-20 sm:py-28 bg-slate-900 text-white relative border-t border-b border-white/5 overflow-hidden">
        <div className="container">
          <SummitRushGame />
        </div>
      </section>

      {/* Trekkers' Gallery - Client Photos & Experiences */}
      <section id="gallery" className="py-20 sm:py-32 bg-slate-100 overflow-hidden">
        <div className="container">
          <div className="mb-16">
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-4">
              Voices From The Trail
            </p>
            <h3 className="text-6xl font-bold text-foreground mb-6">
              Trekkers' Gallery
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Real moments captured by our trekkers on the trail — every summit,
              sunrise, and campfire story belongs to them. Tap "Share Your
              Experience" to add your own photos and story.
            </p>
            <Button
              className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3"
              onClick={() => {
                document
                  .getElementById("share-experience")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Share Your Experience <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {(approvedSubmissions ?? []).map((sub, idx) =>
              sub.photoUrl ? (
                <div
                  key={`client-${sub.id}`}
                  onClick={() => setLightboxImage({ url: sub.photoUrl!, title: sub.name, subtitle: `${sub.trek ?? "Expedition Moment"} • ${sub.story ?? ""}` })}
                  className={`relative group overflow-hidden rounded-lg shadow-lg cursor-pointer ${idx % 2 === 1 ? "mt-8" : ""}`}
                >
                  <img
                    src={sub.photoUrl}
                    alt={`${sub.name}'s ${sub.trek ?? "trek"} moment`}
                    className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 p-2 rounded-full text-white backdrop-blur-sm">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 left-0 p-4">
                    <p className="text-white font-semibold text-sm">{sub.name}</p>
                    <p className="text-white/70 text-xs">{sub.trek ?? "On The Trail"}</p>
                    {sub.story && (
                      <p className="text-white/70 text-xs mt-1 line-clamp-2">
                        {sub.story}
                      </p>
                    )}
                  </div>
                </div>
              ) : null,
            )}
            <div 
              onClick={() => setLightboxImage({ url: "/manus-storage/trekker-summit-celebration_7cdb949b.png", title: "Summit Joy", subtitle: "High-Altitude Summit • 18,200 FT" })}
              className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
            >
              <img
                src="/manus-storage/trekker-summit-celebration_7cdb949b.png"
                alt="Trekkers celebrating at the summit"
                className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 p-2 rounded-full text-white backdrop-blur-sm">
                <ZoomIn className="w-4 h-4" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 p-4">
                <p className="text-white font-semibold text-sm">Summit Joy</p>
                <p className="text-white/70 text-xs">High-Altitude Summit</p>
              </div>
            </div>
            <div 
              onClick={() => setLightboxImage({ url: "/manus-storage/trekker-group-sunrise_89814204.png", title: "First Light", subtitle: "Alpine Ridge • Dawn Ascent" })}
              className="relative group overflow-hidden rounded-lg shadow-lg mt-8 cursor-pointer"
            >
              <img
                src="/manus-storage/trekker-group-sunrise_89814204.png"
                alt="Trekker group at sunrise on a ridge"
                className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 p-2 rounded-full text-white backdrop-blur-sm">
                <ZoomIn className="w-4 h-4" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 p-4">
                <p className="text-white font-semibold text-sm">First Light</p>
                <p className="text-white/70 text-xs">Alpine Ridge Trek</p>
              </div>
            </div>
            <div 
              onClick={() => setLightboxImage({ url: "/manus-storage/trekker-forest-trail_d6fd0880.png", title: "Forest Trail", subtitle: "Wilderness Trail • Pine Canopy" })}
              className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
            >
              <img
                src="/manus-storage/trekker-forest-trail_d6fd0880.png"
                alt="Trekker on a forest trail"
                className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 p-2 rounded-full text-white backdrop-blur-sm">
                <ZoomIn className="w-4 h-4" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 p-4">
                <p className="text-white font-semibold text-sm">Forest Trail</p>
                <p className="text-white/70 text-xs">Wilderness Trail</p>
              </div>
            </div>
            <div 
              onClick={() => setLightboxImage({ url: "/manus-storage/trekker-lake-fort_f06fb445.png", title: "Valley Overlook", subtitle: "Alpine Overlook • Historic Ramparts & Waterfalls" })}
              className="relative group overflow-hidden rounded-lg shadow-lg mt-8 cursor-pointer"
            >
              <img
                src="/manus-storage/trekker-lake-fort_f06fb445.png"
                alt="Trekker resting overlooking a misty valley"
                className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 p-2 rounded-full text-white backdrop-blur-sm">
                <ZoomIn className="w-4 h-4" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 p-4">
                <p className="text-white font-semibold text-sm">Valley Overlook</p>
                <p className="text-white/70 text-xs">High-Altitude Trails</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div 
              onClick={() => setLightboxImage({ url: "/manus-storage/trekker-campfire-evening_f4db685e.png", title: "Campfire Stories", subtitle: "Base Camp Evenings • Stargazing & Tea" })}
              className="relative group overflow-hidden rounded-lg shadow-lg md:col-span-2 cursor-pointer"
            >
              <img
                src="/manus-storage/trekker-campfire-evening_f4db685e.png"
                alt="Trekkers around a campfire at dusk"
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 p-2 rounded-full text-white backdrop-blur-sm">
                <ZoomIn className="w-4 h-4" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 p-4">
                <p className="text-white font-semibold text-sm">Campfire Stories</p>
                <p className="text-white/70 text-xs">Base Camp Evenings</p>
              </div>
            </div>
            <div 
              onClick={() => setLightboxImage({ url: "/manus-storage/trekker-summit-celebration_7cdb949b.png", title: "On Top Of The World", subtitle: "Summit Joy • High Mountain Horizons" })}
              className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
            >
              <img
                src="/manus-storage/trekker-summit-celebration_7cdb949b.png"
                alt="Summit celebration moment"
                className="w-full h-64 object-cover object-left transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 p-2 rounded-full text-white backdrop-blur-sm">
                <ZoomIn className="w-4 h-4" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 p-4">
                <p className="text-white font-semibold text-sm">On Top Of The World</p>
                <p className="text-white/70 text-xs">Mountain Expedition</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Share Your Experience - Dark Premium */}
      <section id="share-experience" className="py-20 sm:py-32 bg-slate-900 text-white overflow-hidden">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-4">
                Your Story Matters
              </p>
              <h3 className="text-5xl md:text-6xl font-bold mb-8">
                Share Your Experience
              </h3>
              <p className="text-xl text-white/70 mb-8 leading-relaxed">
                Been on a Kailasa Trails expedition? Tell us about it. Fill in the
                details below, upload your favourite trek photo, and submit —
                your story goes into our review queue, and once approved it
                appears right here in the gallery for everyone to see.
              </p>
              <div className="flex items-center gap-3 text-white/60">
                <ImagePlus className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-sm">
                  One photo per story (JPG, PNG or WEBP, up to 8 MB)
                </p>
              </div>
            </div>
            <form
              onSubmit={handleGallerySubmit}
              className="bg-slate-800 border border-white/10 rounded-lg p-10 shadow-2xl"
            >
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">
                    Your Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={galleryForm.name}
                    onChange={handleGalleryFormChange}
                    placeholder="Your name"
                    className="bg-slate-700 border-white/10 text-white placeholder:text-white/40"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={galleryForm.email}
                    onChange={handleGalleryFormChange}
                    placeholder="your@email.com"
                    className="bg-slate-700 border-white/10 text-white placeholder:text-white/40"
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">
                    Phone
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={galleryForm.phone}
                    onChange={handleGalleryFormChange}
                    placeholder="+91 98765 43210"
                    className="bg-slate-700 border-white/10 text-white placeholder:text-white/40"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">
                    Which Trek?
                  </label>
                  <Input
                    type="text"
                    name="trek"
                    value={galleryForm.trek}
                    onChange={handleGalleryFormChange}
                    placeholder="e.g. Mount Kailash Expedition"
                    className="bg-slate-700 border-white/10 text-white placeholder:text-white/40"
                  />
                </div>
              </div>
              <div className="mb-8">
                <label className="block text-sm font-semibold text-white mb-3">
                  Your Experience
                </label>
                <Textarea
                  name="story"
                  value={galleryForm.story}
                  onChange={handleGalleryFormChange}
                  placeholder="What did you love most about the trek?"
                  rows={5}
                  className="bg-slate-700 border-white/10 text-white placeholder:text-white/40 resize-none"
                  required
                />
              </div>
              <div className="mb-8">
                <label className="block text-sm font-semibold text-white mb-3">
                  Your Trek Photo (optional)
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handlePhotoSelect}
                  className="hidden"
                  id="gallery-photo-input"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-dashed border-white/30 text-white hover:bg-white/5 h-24 flex-col gap-2"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {selectedPhoto ? (
                    <span className="text-sm truncate max-w-full">{selectedPhoto.name}</span>
                  ) : (
                    <>
                      <Camera className="h-6 w-6 text-primary" />
                      <span className="text-sm text-white/70">Click to attach a photo</span>
                    </>
                  )}
                </Button>
              </div>
              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 text-base disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting...
                  </>
                ) : (
                  "Submit for Review"
                )}
              </Button>
              <p className="text-xs text-white/50 mt-3 text-center">
                Your story and photo will be reviewed before appearing in the
                gallery above.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Section - Dark Premium */}
      <section id="contact" className="py-20 sm:py-32 bg-slate-900 text-white overflow-hidden">
        <div className="container max-w-4xl">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-4">
              Begin Your Adventure
            </p>
            <h3 className="text-6xl font-bold mb-6">Start Your Journey</h3>
            <p className="text-xl text-white/70 mb-6 max-w-2xl mx-auto">
              Ready to conquer your own peak? Get in touch with our team to
              plan your transformative expedition
            </p>
            <div className="text-white/80 flex flex-wrap justify-center items-center gap-x-6 gap-y-3">
              <a
                href="mailto:kailasatrails@gmail.com"
                className="underline underline-offset-4 hover:text-primary transition-colors"
              >
                kailasatrails@gmail.com
              </a>
              <span className="text-white/30 hidden sm:inline">•</span>
              <a
                href="tel:9440650253"
                className="underline underline-offset-4 hover:text-primary transition-colors"
              >
                +91 94406 50253
              </a>
              <span className="text-white/30 hidden sm:inline">•</span>
              <a
                href="https://www.instagram.com/kailasa.trails?igsh=dDNna3VkN3dicW1z"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-primary transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>

          <form
            onSubmit={handleFormSubmit}
            className="bg-slate-800 border border-white/10 rounded-lg p-10 shadow-2xl"
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-3">
                  Full Name
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Your name"
                  className="bg-slate-700 border-white/10 text-white placeholder:text-white/40"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-3">
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="your@email.com"
                  className="bg-slate-700 border-white/10 text-white placeholder:text-white/40"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-white mb-3">
                Phone
              </label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                placeholder="+91 98765 43210"
                className="bg-slate-700 border-white/10 text-white placeholder:text-white/40"
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-white mb-3">
                Tell us about your dream trek
              </label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                placeholder="Describe your ideal adventure..."
                rows={5}
                className="bg-slate-700 border-white/10 text-white placeholder:text-white/40 resize-none"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 text-base"
            >
              Send Inquiry
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-white/10 py-16 text-white overflow-hidden">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <img
                  src="/manus-storage/kailasa-logo-white-transparent.png"
                  alt="Kailasa Trails"
                  className="h-10 w-auto object-contain"
                />
                <div>
                  <p className="font-bold text-sm">KAILASA</p>
                  <p className="text-xs text-primary">TRAILS</p>
                </div>
              </div>
              <p className="text-white/60 text-sm">
                Conquer your own peak with Kailasa Trails
              </p>
            </div>
            <div>
              <h5 className="font-bold text-white mb-4">Company</h5>
              <ul className="space-y-2 text-sm text-white/60">
                <li>
                  <a
                    href="#about"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById("about")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:text-primary transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:text-primary transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <Link
                    href="/admin"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 border border-amber-500/30 text-xs font-semibold transition-all hover:scale-105 mt-1"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" /> Admin Panel
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-white mb-4">Expeditions</h5>
              <ul className="space-y-2 text-sm text-white/60">
                <li>
                  <a
                    href="#featured"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById("featured")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:text-primary transition-colors"
                  >
                    Featured Treks
                  </a>
                </li>
                <li>
                  <a
                    href="#destinations"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById("destinations")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:text-primary transition-colors"
                  >
                    All Destinations
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setShowDifficultyModal(true)}
                    className="hover:text-primary transition-colors text-left cursor-pointer"
                  >
                    Difficulty Levels
                  </button>
                </li>
                <li>
                  <a
                    href="#gallery"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById("gallery")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:text-primary transition-colors"
                  >
                    Trekkers' Gallery
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-white mb-4">Connect</h5>
              <ul className="space-y-2 text-sm text-white/60">
                <li>
                  <a href="https://www.instagram.com/kailasa.trails?igsh=dDNna3VkN3dicW1z" className="hover:text-primary transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="mailto:kailasatrails@gmail.com" className="hover:text-primary transition-colors">
                    kailasatrails@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:9440650253" className="hover:text-primary transition-colors">
                    +91 94406 50253
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-white/60">
              © 2026 Kailasa Trails. All rights reserved.
            </p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <button
                type="button"
                onClick={() => setShowPrivacyModal(true)}
                className="text-sm text-white/60 hover:text-primary transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => setShowTermsModal(true)}
                className="text-sm text-white/60 hover:text-primary transition-colors cursor-pointer"
              >
                Terms of Service
              </button>
              <span className="text-white/20">|</span>
              <Link
                href="/admin"
                className="text-sm text-white/50 hover:text-amber-400 transition-colors flex items-center gap-1 font-semibold"
              >
                <ShieldCheck className="w-3.5 h-3.5" /> Admin Panel
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Photo Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 border border-white/20 rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors border border-white/20"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="bg-black/60 flex items-center justify-center max-h-[75vh] overflow-hidden">
              <img
                src={lightboxImage.url}
                alt={lightboxImage.title}
                className="w-full max-h-[75vh] object-contain"
              />
            </div>
            <div className="p-6 bg-slate-900 border-t border-white/10">
              <h4 className="text-xl font-bold text-white mb-1">
                {lightboxImage.title}
              </h4>
              {lightboxImage.subtitle && (
                <p className="text-sm text-primary font-medium">
                  {lightboxImage.subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Legal & Difficulty Explanatory Modals */}
      <PrivacyPolicyDialog
        open={showPrivacyModal}
        onOpenChange={setShowPrivacyModal}
      />
      <TermsOfServiceDialog
        open={showTermsModal}
        onOpenChange={setShowTermsModal}
      />
      <DifficultyLevelsDialog
        open={showDifficultyModal}
        onOpenChange={setShowDifficultyModal}
        onSelectDifficulty={(level) => {
          setDifficulty(level);
          const el = document.getElementById("difficulty");
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }}
      />

      {/* Antigravity-Style Opening / Loading Screen */}
      <BunnyDialogueExperience
        onEnter={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        }}
      />
    </div>
  );
}
