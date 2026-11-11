import React, { useState } from "react";
import { Mountain, Compass, Calendar, ArrowRight, MapPin, Eye, Sparkles, Sun, CloudSnow, Wind, ShieldCheck, MessageCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

interface PeakProfile {
  id: string;
  name: string;
  altitudeM: string;
  altitudeFt: string;
  tagline: string;
  witnessFrom: string;
  folklore: string;
  image: string;
  featuredTreks: {
    name: string;
    slug: string;
    price: string;
    duration: string;
    altitude: string;
  }[];
}

const HIMALAYAN_PEAKS: PeakProfile[] = [
  {
    id: "nanda-devi",
    name: "Mt. Nanda Devi",
    altitudeM: "7,816 m",
    altitudeFt: "25,643 FT",
    tagline: "The Bliss-Giving Goddess · India's Second Highest Sacred Summit",
    witnessFrom: "Kuari Pass Curzon Trail & Chopta Chandrashila",
    folklore:
      "Revered as the patron goddess of Uttarakhand, Nanda Devi's dramatic twin pyramid summits rise above 25,600 feet, guarded by a fortress ring of 70 mountain peaks. From the historic Kuari Pass ridgeline, she stands directly opposite you in majestic, unobstructed glory.",
    image: "/peaks/nanda-devi.jpg",
    featuredTreks: [
      {
        name: "Kuari Pass Curzon Trail",
        slug: "kuari-pass-trek",
        price: "₹8,000",
        duration: "6D / 5N",
        altitude: "12,516 FT",
      },
      {
        name: "Chopta Chandrashila & Tungnath",
        slug: "chopta-chandrashila-trek",
        price: "₹6,000",
        duration: "3D / 2N",
        altitude: "13,549 FT",
      },
    ],
  },
  {
    id: "trishul",
    name: "Mt. Trishul",
    altitudeM: "7,120 m",
    altitudeFt: "23,359 FT",
    tagline: "The Sacred Trident of Lord Shiva · Colossal Glacial Amphitheatre",
    witnessFrom: "Brahmatal Winter Trek & Kuari Pass",
    folklore:
      "A sacred trio of peaks resembling the divine trident (Trishul) of Lord Shiva. Standing atop the Brahmatal Pass (11,570 FT) with the sacred frozen lake behind you, Mt. Trishul rises with overwhelming vertical scale above a boundless sea of winter clouds.",
    image: "/peaks/trishul.jpg",
    featuredTreks: [
      {
        name: "Brahmatal Winter Trek",
        slug: "brahmatal-winter-trek",
        price: "₹6,500",
        duration: "5D / 4N",
        altitude: "11,570 FT",
      },
      {
        name: "Kuari Pass Curzon Trail",
        slug: "kuari-pass-trek",
        price: "₹8,000",
        duration: "6D / 5N",
        altitude: "12,516 FT",
      },
    ],
  },
  {
    id: "swargarohini",
    name: "Mt. Swargarohini",
    altitudeM: "6,252 m",
    altitudeFt: "20,511 FT",
    tagline: "The Stairway to Heaven · Ancient Epic of the Mahabharata",
    witnessFrom: "Har Ki Dun, Kedarkantha & Bali Pass",
    folklore:
      "Believed in ancient folklore to be the solitary snow ridge where the Pandavas, led by Yudhishthira and his loyal dog, climbed upward into heaven. Its sheer vertical flutes dominate the cradle valley of Har Ki Dun and the final push of Bali Pass.",
    image: "/peaks/swargarohini.jpg",
    featuredTreks: [
      {
        name: "Har Ki Dun Trek",
        slug: "har-ki-dun-trek",
        price: "₹11,000",
        duration: "7D / 6N",
        altitude: "11,675 FT",
      },
      {
        name: "Kedarkantha Trek",
        slug: "kedarkantha-trek",
        price: "₹6,000",
        duration: "5D / 4N",
        altitude: "12,500 FT",
      },
      {
        name: "Bali Pass Trek",
        slug: "bali-pass-trek",
        price: "₹17,500",
        duration: "8D / 7N",
        altitude: "16,200 FT",
      },
    ],
  },
  {
    id: "chaukhamba",
    name: "Mt. Chaukhamba",
    altitudeM: "7,138 m",
    altitudeFt: "23,418 FT",
    tagline: "The Four Pillars of the Gods · Dominating the Ganga Headwaters",
    witnessFrom: "Chopta Chandrashila & Deoria Tal Lake",
    folklore:
      "A colossal four-pillared massif towering over the sacred valleys of Mandakini and Alaknanda. At sunrise from Chandrashila (13,549 FT), its western face ignites in molten gold, while the still waters of Deoria Tal mirror its four towering crowns.",
    image: "/peaks/chaukhamba.jpg",
    featuredTreks: [
      {
        name: "Chopta Chandrashila & Tungnath",
        slug: "chopta-chandrashila-trek",
        price: "₹6,000",
        duration: "3D / 2N",
        altitude: "13,549 FT",
      },
    ],
  },
  {
    id: "kalanag",
    name: "Kala Nag (Black Peak)",
    altitudeM: "6,387 m",
    altitudeFt: "20,955 FT",
    tagline: "The Cosmic Serpent Crest · Bandarpunch Range Zenith",
    witnessFrom: "Bali Pass, Har Ki Dun & Kedarkantha",
    folklore:
      "Named for its obsidian-black, hood-shaped summit ridge that resembles the hood of the serpent Kalanag. From the shores of sacred Ruinsara Tal and the 15,100 FT Bali Col, its hanging glaciers loom right above base camp.",
    image: "/peaks/kalanag-bandarpunch.jpg",
    featuredTreks: [
      {
        name: "Bali Pass Trek",
        slug: "bali-pass-trek",
        price: "₹17,500",
        duration: "8D / 7N",
        altitude: "16,200 FT",
      },
      {
        name: "Har Ki Dun Trek",
        slug: "har-ki-dun-trek",
        price: "₹11,000",
        duration: "7D / 6N",
        altitude: "11,675 FT",
      },
    ],
  },
  {
    id: "deo-tibba",
    name: "Mt. Deo Tibba & Indrasan",
    altitudeM: "6,001 m",
    altitudeFt: "19,688 FT",
    tagline: "Throne of the Gods · Pir Panjal Glacial Divide",
    witnessFrom: "Hampta Pass Crossover into Lahaul",
    folklore:
      "Standing at the 14,010 FT col of Hampta Pass, you gaze back upon the glaciated dome of Deo Tibba before stepping across into the stark moonscapes of Lahaul — two completely distinct mountain worlds divided by a single pass.",
    image: "/peaks/deo-tibba-indrasan.jpg",
    featuredTreks: [
      {
        name: "Hampta Pass Trek",
        slug: "hampta-pass-trek",
        price: "₹6,500",
        duration: "5D / 4N",
        altitude: "14,010 FT",
      },
    ],
  },
];

interface SeasonCategory {
  id: string;
  seasonName: string;
  months: string;
  tagline: string;
  icon: string;
  temperature: string;
  vibe: string;
  treks: {
    name: string;
    slug: string;
    price: string;
    duration: string;
    altitude: string;
    badge: string;
    image: string;
  }[];
}

const SEASONS: SeasonCategory[] = [
  {
    id: "winter",
    seasonName: "Winter Snow Expeditions",
    months: "December – February",
    tagline: "Knee-deep powder snow, frozen alpine lakes & Bortle-1 starlit nights",
    icon: "❄️",
    temperature: "-5°C to -15°C",
    vibe: "Crisp sub-zero sunrise pushes, snow camping, and pristine white landscapes",
    treks: [
      {
        name: "Brahmatal Winter Trek",
        slug: "brahmatal-winter-trek",
        price: "₹6,500",
        duration: "5D / 4N",
        altitude: "11,570 FT",
        badge: "Sacred Frozen Lake",
        image: "/manus-storage/brahmatal-cover.jpg",
      },
      {
        name: "Kedarkantha Trek",
        slug: "kedarkantha-trek",
        price: "₹6,000",
        duration: "5D / 4N",
        altitude: "12,500 FT",
        badge: "Queen of Winter Treks",
        image: "/manus-storage/kedarkantha-cover.jpg",
      },
      {
        name: "Chopta Chandrashila",
        slug: "chopta-chandrashila-trek",
        price: "₹6,000",
        duration: "3D / 2N",
        altitude: "13,549 FT",
        badge: "Moon Rock Summit",
        image: "/manus-storage/chopta-chandrashila-cover.jpg",
      },
    ],
  },
  {
    id: "spring",
    seasonName: "Spring & Rhododendron Blooms",
    months: "March – May",
    tagline: "Wild scarlet bugyal blooms, rushing streams & mild comfortable days",
    icon: "🌸",
    temperature: "+4°C to +16°C",
    vibe: "Crimson rhododendron canopies, fresh mountain air, and crystal clear morning views",
    treks: [
      {
        name: "Kuari Pass Curzon Trail",
        slug: "kuari-pass-trek",
        price: "₹8,000",
        duration: "6D / 5N",
        altitude: "12,516 FT",
        badge: "Nanda Devi Wall",
        image: "/manus-storage/kuari-pass-cover.jpg",
      },
      {
        name: "Har Ki Dun Trek",
        slug: "har-ki-dun-trek",
        price: "₹11,000",
        duration: "7D / 6N",
        altitude: "11,675 FT",
        badge: "Valley of the Gods",
        image: "/manus-storage/har-ki-dun-cover.jpg",
      },
      {
        name: "Chopta Chandrashila",
        slug: "chopta-chandrashila-trek",
        price: "₹6,000",
        duration: "3D / 2N",
        altitude: "13,549 FT",
        badge: "Highest Shiva Temple",
        image: "/manus-storage/chopta-chandrashila-cover.jpg",
      },
    ],
  },
  {
    id: "summer",
    seasonName: "High Pass Crossovers & Glacial Lakes",
    months: "June – August",
    tagline: "Dramatic terrain crossovers, alpine flower valleys & turquoise high lakes",
    icon: "☀️",
    temperature: "+2°C to +18°C",
    vibe: "Cross towering alpine divides, emerald river gorges, and camp by sacred glacial waters",
    treks: [
      {
        name: "Hampta Pass Trek",
        slug: "hampta-pass-trek",
        price: "₹6,500",
        duration: "5D / 4N",
        altitude: "14,010 FT",
        badge: "Kullu to Lahaul Crossover",
        image: "/manus-storage/hampta-pass-cover.jpg",
      },
      {
        name: "Har Ki Dun Trek",
        slug: "har-ki-dun-trek",
        price: "₹11,000",
        duration: "7D / 6N",
        altitude: "11,675 FT",
        badge: "Supin River Trail",
        image: "/manus-storage/har-ki-dun-cover.jpg",
      },
      {
        name: "Bali Pass High Crossing",
        slug: "bali-pass-trek",
        price: "₹17,500",
        duration: "8D / 7N",
        altitude: "16,200 FT",
        badge: "Hardest Garhwal Divide",
        image: "/manus-storage/bali-pass-cover.jpg",
      },
    ],
  },
  {
    id: "autumn",
    seasonName: "Autumn Crystal Visibility",
    months: "September – November",
    tagline: "Unmatched 60+ km horizon clarity, golden alpine bugyals & crisp night skies",
    icon: "🍂",
    temperature: "0°C to +12°C",
    vibe: "Deep cobalt skies, golden alpenglow on massive mountain walls, and zero haze",
    treks: [
      {
        name: "Kuari Pass Curzon Trail",
        slug: "kuari-pass-trek",
        price: "₹8,000",
        duration: "6D / 5N",
        altitude: "12,516 FT",
        badge: "360° Panorama",
        image: "/manus-storage/kuari-pass-cover.jpg",
      },
      {
        name: "Bali Pass High Crossing",
        slug: "bali-pass-trek",
        price: "₹17,500",
        duration: "8D / 7N",
        altitude: "16,200 FT",
        badge: "Ruinsara Tal & Yamunotri",
        image: "/manus-storage/bali-pass-cover.jpg",
      },
      {
        name: "Chopta Chandrashila",
        slug: "chopta-chandrashila-trek",
        price: "₹6,000",
        duration: "3D / 2N",
        altitude: "13,549 FT",
        badge: "Deoria Tal Reflection",
        image: "/manus-storage/chopta-chandrashila-cover.jpg",
      },
    ],
  },
];

export default function HimalayanPeakExplorer() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"peaks" | "seasons">("peaks");
  const [selectedPeakId, setSelectedPeakId] = useState<string>("nanda-devi");
  const [selectedSeasonId, setSelectedSeasonId] = useState<string>("winter");

  const currentPeak = HIMALAYAN_PEAKS.find((p) => p.id === selectedPeakId) || HIMALAYAN_PEAKS[0];
  const currentSeason = SEASONS.find((s) => s.id === selectedSeasonId) || SEASONS[0];

  return (
    <div className="w-full text-white">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-xs font-semibold text-amber-300 uppercase tracking-widest mb-3">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            Expedition Knowledge Hub
          </div>
          <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Sacred Summits & Seasonal Guide
          </h3>
          <p className="text-base text-white/70 mt-2 max-w-2xl leading-relaxed">
            Discover the legendary Himalayan peaks you will stand face-to-face with on Kailasa Trails, and pick the perfect time of year for your journey.
          </p>
        </div>

        {/* View Switcher Toggle */}
        <div className="flex bg-slate-900/90 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
          <button
            onClick={() => setActiveTab("peaks")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "peaks"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20 scale-[1.02]"
                : "text-white/70 hover:text-white hover:bg-white/5"
            }`}
          >
            <Mountain className="w-4 h-4" />
            Sacred Peaks (6)
          </button>
          <button
            onClick={() => setActiveTab("seasons")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "seasons"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 scale-[1.02]"
                : "text-white/70 hover:text-white hover:bg-white/5"
            }`}
          >
            <Calendar className="w-4 h-4" />
            Best Seasons (4)
          </button>
        </div>
      </div>

      {/* Mode A: Sacred Peaks Showcase */}
      {activeTab === "peaks" && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Peak Selector Pills */}
          <div className="flex flex-wrap gap-2.5 pb-2">
            {HIMALAYAN_PEAKS.map((peak) => (
              <button
                key={peak.id}
                onClick={() => setSelectedPeakId(peak.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  peak.id === selectedPeakId
                    ? "bg-white text-slate-950 border-white shadow-lg shadow-white/10 scale-[1.02]"
                    : "bg-slate-900/80 text-white/70 border-white/10 hover:border-amber-400/40 hover:text-white"
                }`}
              >
                {peak.name} <span className="opacity-60 ml-1">({peak.altitudeFt})</span>
              </button>
            ))}
          </div>

          {/* Active Peak Showcase Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-gradient-to-b from-slate-900/95 to-slate-950/95 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-xl relative overflow-hidden shadow-2xl">
            {/* Ambient Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Left: Peak Imagery */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/3] group">
                <img
                  src={currentPeak.image}
                  alt={currentPeak.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs font-bold">
                    <Mountain className="w-3.5 h-3.5 text-amber-400" />
                    Elevation: {currentPeak.altitudeFt} ({currentPeak.altitudeM})
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Peak Lore & Associated Expeditions */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-2 block">
                  Sacred Himalayan Peak Profile
                </span>
                <h4 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
                  {currentPeak.name}
                </h4>
                <p className="text-sm text-amber-200/80 font-medium mb-4">
                  {currentPeak.tagline}
                </p>

                <p className="text-sm sm:text-base text-white/75 leading-relaxed mb-6 bg-black/30 p-5 rounded-2xl border border-white/5">
                  {currentPeak.folklore}
                </p>

                <div className="mb-6">
                  <p className="text-xs uppercase tracking-wider text-white/60 font-semibold mb-3 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-primary" />
                    Kailasa Trails Expeditions Featuring This Peak:
                  </p>
                  <div className="space-y-2.5">
                    {currentPeak.featuredTreks.map((trek) => (
                      <div
                        key={trek.slug}
                        className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/50 hover:bg-white/10 transition-all cursor-pointer group"
                        onClick={() => setLocation(`/trek/${trek.slug}`)}
                      >
                        <div>
                          <p className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                            {trek.name}
                          </p>
                          <p className="text-xs text-white/60">
                            {trek.duration} · Max Alt: {trek.altitude}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-extrabold text-amber-300">
                            {trek.price}
                          </span>
                          <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-amber-300 group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/10">
                <a
                  href={`https://wa.me/919440650253?text=${encodeURIComponent(
                    `Hi Kailasa Trails! I was reading about ${currentPeak.name} (${currentPeak.altitudeFt}) on your website. Which upcoming batches offer the best views of this peak?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all shadow-lg shadow-emerald-950/40"
                >
                  <MessageCircle className="w-4 h-4" /> Ask Expert on WhatsApp
                </a>
                <span className="text-xs text-white/50">
                  Call: +91 94406 50253
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode B: Seasonal Expedition Matrix */}
      {activeTab === "seasons" && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Season Selector Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {SEASONS.map((season) => (
              <button
                key={season.id}
                onClick={() => setSelectedSeasonId(season.id)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  season.id === selectedSeasonId
                    ? "bg-gradient-to-b from-cyan-500/20 to-blue-600/10 border-cyan-400 text-white shadow-xl shadow-cyan-500/10 scale-[1.02]"
                    : "bg-slate-900/80 border-white/10 text-white/70 hover:border-white/30 hover:text-white"
                }`}
              >
                <span className="text-2xl block mb-2">{season.icon}</span>
                <p className="font-bold text-sm text-white">{season.seasonName.split(" ")[0]}</p>
                <p className="text-xs text-cyan-300 font-semibold">{season.months}</p>
              </button>
            ))}
          </div>

          {/* Active Season Details */}
          <div className="bg-gradient-to-b from-slate-900/95 to-slate-950/95 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-xl relative overflow-hidden shadow-2xl">
            {/* Top Telemetry */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
              <div>
                <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold mb-1 block">
                  Ideal Season Window
                </span>
                <h4 className="text-3xl font-extrabold text-white flex items-center gap-2.5">
                  <span>{currentSeason.icon}</span>
                  {currentSeason.seasonName}
                </h4>
                <p className="text-sm text-white/70 mt-1 max-w-xl">
                  {currentSeason.tagline}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-center">
                  <span className="text-xs text-white/50 block">Typical Temp</span>
                  <span className="text-sm font-extrabold text-cyan-300">{currentSeason.temperature}</span>
                </div>
                <div className="px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-center">
                  <span className="text-xs text-white/50 block">Months</span>
                  <span className="text-sm font-extrabold text-amber-300">{currentSeason.months.split(" ")[0]}</span>
                </div>
              </div>
            </div>

            {/* Trek Grid for this Season */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentSeason.treks.map((t) => (
                <div
                  key={t.slug}
                  className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden hover:border-cyan-400/50 transition-all group flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[11px] font-bold text-cyan-300 border border-cyan-400/30">
                      {t.badge}
                    </span>
                    <span className="absolute bottom-3 right-3 text-base font-extrabold text-amber-300">
                      {t.price} <span className="text-xs font-normal text-white/70">/ person (+5% GST)</span>
                    </span>
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      <h5 className="font-bold text-lg text-white mb-1 group-hover:text-cyan-300 transition-colors">
                        {t.name}
                      </h5>
                      <p className="text-xs text-white/60 mb-4">
                        {t.duration} · Max Altitude: {t.altitude}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                      <Button
                        size="sm"
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs"
                        onClick={() => setLocation(`/trek/${t.slug}`)}
                      >
                        Explore <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                      </Button>
                      <a
                        href={`https://wa.me/919440650253?text=${encodeURIComponent(
                          `Hi Kailasa Trails! I want to join the ${t.name} (${t.price}/person) during ${currentSeason.months}. Please share upcoming batch dates.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                        title="Book via WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
