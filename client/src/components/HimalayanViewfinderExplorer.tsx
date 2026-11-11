import React, { useState } from "react";
import { Compass, Eye, Sparkles, MapPin, Award, CheckCircle2, ChevronRight, RotateCcw, Volume2, ShieldAlert, Mountain, Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MysterySpot {
  id: string;
  name: string;
  tagline: string;
  altitude: string;
  coordinates: string;
  headingDeg: number;
  region: string;
  mysteryStory: string;
  guideSecret: string;
  image: string;
  difficulty: string;
  unlockedHint: string;
}

const MYSTERY_SPOTS: MysterySpot[] = [
  {
    id: "brahmatal",
    name: "Brahmatal Frozen Lake & Pass",
    tagline: "Sacred Lake of Lord Brahma & Mt. Trishul",
    altitude: "11,570 FT",
    coordinates: "30.1500° N, 79.5800° E",
    headingDeg: 45,
    region: "Chamoli, Garhwal Himalayas",
    mysteryStory:
      "According to ancient Himalayan folklore, Lord Brahma chose this serene high-altitude lake to meditate in silence. During winter, the lake freezes into a crystalline mirror surrounded by snowdrifts, facing the colossal Trident peak of Mt. Trishul (7,120 m).",
    guideSecret:
      "Climb to Jhandi Top at dawn: the ridgeline offers an uninterrupted 360° view of both Mt. Trishul and Nanda Ghunti glowing in the morning light.",
    image: "/manus-storage/mountain-lake-reflection_28b217ce.png",
    difficulty: "5 Days · Winter Snow Trek",
    unlockedHint: "Scan north-east towards the frozen sacred lake.",
  },
  {
    id: "kedarkantha",
    name: "Kedarkantha Summit Ridge",
    tagline: "The Queen of Winter Treks & 360° Sunrise",
    altitude: "12,500 FT",
    coordinates: "31.0225° N, 78.1725° E",
    headingDeg: 125,
    region: "Uttarkashi, Garhwal Himalayas",
    mysteryStory:
      "Locals revere Kedarkantha as the original throat of Lord Shiva before he moved to Kedarnath. The triangular peak stands isolated from other ranges, rewarding summit climbers with an unbroken 360° panorama of 13 Himalayan peaks.",
    guideSecret:
      "Begin your summit push at 2:00 AM under starlight to arrive at the stone shrine precisely as the sun strikes the Swargarohini massif.",
    image: "/manus-storage/kedarkantha-trek_b82ed446.png",
    difficulty: "5 Days · Classic Snow Summit",
    unlockedHint: "Scan south-east towards the isolated triangular pyramid peak.",
  },
  {
    id: "kuari-pass",
    name: "Kuari Pass (Curzon Trail)",
    tagline: "Face-to-Face with Sacred Nanda Devi (7,816 m)",
    altitude: "12,516 FT",
    coordinates: "30.5050° N, 79.5650° E",
    headingDeg: 215,
    region: "Joshimath, Garhwal Himalayas",
    mysteryStory:
      "Named 'The Gateway Pass' and explored by Viceroy Lord Curzon in 1905, Kuari Pass unveils one of the most imposing mountain amphitheaters on Earth — an up-close wall featuring Nanda Devi, Kamet, Dronagiri, and Hathi-Ghoda.",
    guideSecret:
      "From Khullara Top, look towards the eastern horizon at sunset: the sheer pyramid of Dronagiri catches the last fiery alpenglow.",
    image: "/manus-storage/adventure-climber-peak_6654d27c.png",
    difficulty: "6 Days · Historic Curzon Trail",
    unlockedHint: "Scan south-west across the vast high-altitude Curzon pass.",
  },
  {
    id: "juda-ka-talab",
    name: "Juda Ka Talab Stargazer Glade",
    tagline: "Bortle Class 1 Dark Sky & Pine Reflection",
    altitude: "9,100 FT",
    coordinates: "31.0180° N, 78.1850° E",
    headingDeg: 285,
    region: "Govind National Park, Uttarkashi",
    mysteryStory:
      "Surrounded by towering pines and maple trees, this secluded alpine clearing experiences zero light pollution. Legend says the lake was formed when Lord Shiva untied a lock of his hair to provide water for pilgrims.",
    guideSecret:
      "Step outside your tent at midnight: the galactic arch of the Milky Way spans directly over the snow-covered pine canopy.",
    image: "/manus-storage/trekker-campfire-evening_f4db685e.png",
    difficulty: "Scenic Pine Campsite",
    unlockedHint: "Scan west into the starlit pine glade.",
  },
  {
    id: "gurson-bugyal",
    name: "Gurson Bugyal Alpine Meadow",
    tagline: "Endless Rolling Green & Winter Snowfield",
    altitude: "11,100 FT",
    coordinates: "30.5200° N, 79.5750° E",
    headingDeg: 340,
    region: "Joshimath / Auli Ridge",
    mysteryStory:
      "One of the highest alpine meadows in India, Gurson Bugyal transforms with the seasons: vibrant wildflowers in autumn and an unbroken blanket of powder snow in winter, framed continuously by Nanda Devi.",
    guideSecret:
      "Take the ridge trail during late afternoon when the warm amber sunlight filters across the rolling snowdrifts.",
    image: "/manus-storage/trek-trail-forest_21c401b4.png",
    difficulty: "High Alpine Meadow Walk",
    unlockedHint: "Scan north towards the sweeping bugyal meadow.",
  },
];

export default function HimalayanViewfinderExplorer() {
  const [selectedSpotId, setSelectedSpotId] = useState<string>("brahmatal");
  const [discoveredSpots, setDiscoveredSpots] = useState<string[]>(["brahmatal"]);
  const [isLensRotating, setIsLensRotating] = useState<boolean>(false);

  const activeSpot = MYSTERY_SPOTS.find((s) => s.id === selectedSpotId) || MYSTERY_SPOTS[0];
  const allDiscovered = discoveredSpots.length === MYSTERY_SPOTS.length;

  const handleSelectSpot = (spot: MysterySpot) => {
    setIsLensRotating(true);
    setSelectedSpotId(spot.id);
    if (!discoveredSpots.includes(spot.id)) {
      setDiscoveredSpots((prev) => [...prev, spot.id]);
    }
    setTimeout(() => setIsLensRotating(false), 400);
  };

  const handleClaimVoucher = () => {
    const text = `Hey Kailasa Trails! I explored the Himalayan Viewfinder on your website and discovered all 5 hidden secrets! I'd like to redeem my ₹1,000 expedition voucher (Code: BUNNY2026) for my next trek!`;
    const url = `https://wa.me/919440650253?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-full text-white">
      {/* Title & Exploration Status */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-xs font-semibold text-amber-300 uppercase tracking-widest mb-3">
            <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: "12s" }} />
            The Kailasa 360° Alpine Viewfinder
          </div>
          <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Spot The Hidden Himalayan Secrets
          </h3>
          <p className="text-base text-white/60 mt-2 max-w-2xl">
            Aim your high-altitude binoculars across the horizon. Rotate the compass to scan 5 legendary unmapped mysteries, folklore legends, and optical anomalies.
          </p>
        </div>

        {/* Discovery Counter Badge */}
        <div className="flex items-center gap-3 bg-slate-950/80 border border-white/10 px-5 py-3 rounded-2xl backdrop-blur-md">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs text-white/50 uppercase tracking-wider font-semibold">
              <span>Mysteries Uncovered</span>
              <span className="text-amber-400 font-bold">{discoveredSpots.length} / {MYSTERY_SPOTS.length}</span>
            </div>
            <div className="w-36 bg-white/10 h-2 rounded-full mt-1.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-500"
                style={{ width: `${(discoveredSpots.length / MYSTERY_SPOTS.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 360-Degree Panoramic Viewfinder HUD Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Viewfinder Circular Lens Optics */}
        <div className="lg:col-span-7 bg-slate-950 border border-white/15 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl flex flex-col justify-between">
          {/* Top Scope Telemetry */}
          <div className="flex items-center justify-between z-10 text-xs font-mono text-cyan-300">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span>OPTICAL BEARING: {activeSpot.headingDeg.toString().padStart(3, "0")}°</span>
            </div>
            <div className="text-white/60 font-sans">
              ALT: <span className="text-white font-bold">{activeSpot.altitude}</span>
            </div>
          </div>

          {/* Central Binocular Lens Viewport */}
          <div className="relative my-6 mx-auto w-full max-w-md aspect-square rounded-full border-4 border-white/20 shadow-[0_0_50px_rgba(6,182,212,0.2)] overflow-hidden bg-black/60 group">
            {/* The Active Image inside Lens with Subtle Parallax Zoom */}
            <img
              src={activeSpot.image}
              alt={activeSpot.name}
              className={`w-full h-full object-cover transition-all duration-700 ${
                isLensRotating ? "scale-125 filter blur-sm rotate-6" : "scale-105 group-hover:scale-110"
              }`}
            />

            {/* Lens Glare & Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(255,255,255,0.25)_0%,_transparent_60%,_rgba(0,0,0,0.85)_100%)] pointer-events-none" />

            {/* Tactical Crosshair Overlay */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              {/* Horizontal Line */}
              <div className="absolute w-full h-[1px] bg-cyan-400/30" />
              {/* Vertical Line */}
              <div className="absolute h-full w-[1px] bg-cyan-400/30" />

              {/* Center Crosshair Ring */}
              <div className="w-24 h-24 rounded-full border border-cyan-400/40 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full border border-amber-400 animate-ping" />
              </div>

              {/* Angle Tick Marks */}
              <div className="absolute top-4 text-[10px] font-mono text-cyan-300/80">0° N</div>
              <div className="absolute bottom-4 text-[10px] font-mono text-cyan-300/80">180° S</div>
              <div className="absolute right-4 text-[10px] font-mono text-cyan-300/80">90° E</div>
              <div className="absolute left-4 text-[10px] font-mono text-cyan-300/80">270° W</div>
            </div>

            {/* Target Locked Badge inside Lens */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/75 backdrop-blur-md border border-cyan-400/40 px-4 py-1.5 rounded-full text-xs font-mono text-cyan-300 shadow-xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              TARGET IDENTIFIED
            </div>
          </div>

          {/* Compass Horizon Selector Strip */}
          <div className="z-10 pt-4 border-t border-white/10">
            <p className="text-xs text-white/50 mb-3 flex items-center gap-1.5 uppercase tracking-wider font-semibold">
              <Compass className="w-4 h-4 text-cyan-400" />
              Tap to Aim Viewfinder Towards Mystery Coordinates:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {MYSTERY_SPOTS.map((s, idx) => {
                const isSelected = s.id === selectedSpotId;
                const isFound = discoveredSpots.includes(s.id);

                return (
                  <button
                    key={s.id}
                    onClick={() => handleSelectSpot(s)}
                    className={`p-2.5 rounded-2xl text-left border transition-all relative overflow-hidden ${
                      isSelected
                        ? "bg-cyan-500/20 border-cyan-400 text-white shadow-lg shadow-cyan-500/20 scale-[1.02]"
                        : isFound
                        ? "bg-white/5 border-emerald-500/30 text-white/70 hover:bg-white/10"
                        : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                      <span>{s.headingDeg}°</span>
                      {isFound ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Lock className="w-3 h-3 text-white/30" />
                      )}
                    </div>
                    <p className="text-xs font-bold truncate leading-tight">
                      {s.name.split(" ")[0]}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Secret Intelligence Dossier Card */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900/95 to-slate-950/95 border border-white/15 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl flex flex-col justify-between">
          <div>
            {/* Coordinates & Region */}
            <div className="flex items-center justify-between text-xs text-amber-300 font-mono mb-3">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {activeSpot.coordinates}
              </span>
              <span className="bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                {activeSpot.altitude}
              </span>
            </div>

            <h4 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
              {activeSpot.name}
            </h4>
            <p className="text-xs text-cyan-300 font-medium mb-6">
              {activeSpot.tagline} • {activeSpot.region}
            </p>

            {/* The Mystery Story */}
            <div className="mb-6 p-4 rounded-2xl bg-black/40 border border-white/10">
              <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                Uncharted Folklore & Expeditions
              </p>
              <p className="text-sm text-white/85 leading-relaxed">
                {activeSpot.mysteryStory}
              </p>
            </div>

            {/* Guide Secret Tip */}
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 mb-6">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 mb-1">
                <ShieldAlert className="w-4 h-4 text-emerald-400" />
                Kailasa Lead Mountaineer Insider Note
              </div>
              <p className="text-xs text-white/80 leading-relaxed">
                {activeSpot.guideSecret}
              </p>
            </div>
          </div>

          {/* Gamification Reward / WhatsApp Claim Banner */}
          <div>
            {allDiscovered ? (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-cyan-500/20 border border-amber-400/40 text-center animate-in zoom-in-95 duration-300 mb-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 uppercase tracking-widest mb-1">
                  <Award className="w-4 h-4 text-amber-400" />
                  All 5 Alpine Mysteries Uncovered!
                </div>
                <p className="text-xs text-white/80 mb-3">
                  You unlocked the exclusive explorer reward! Use voucher code <strong className="text-amber-300 font-mono text-sm">BUNNY2026</strong> for ₹1,000 off your trek.
                </p>
                <Button
                  onClick={handleClaimVoucher}
                  className="w-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 hover:from-amber-500 hover:to-orange-600 text-black font-extrabold py-5 rounded-xl shadow-xl shadow-amber-500/25"
                >
                  Claim ₹1,000 Voucher on WhatsApp <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            ) : (
              <div className="text-center p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-xs text-white/60 mb-2">
                  Uncover all {MYSTERY_SPOTS.length} coordinates on the viewfinder to unlock an exclusive trekker reward!
                </p>
                <div className="text-xs text-amber-300 font-semibold">
                  {MYSTERY_SPOTS.length - discoveredSpots.length} more coordinates to spot!
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
