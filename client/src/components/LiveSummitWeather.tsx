import React, { useState } from "react";
import { CloudSnow, Sun, CloudFog, Wind, Eye, Droplets, Sunrise, Sunset, Mountain, Radio } from "lucide-react";

interface SummitWeather {
  id: string;
  name: string;
  altitude: string;
  region: string;
  temp: string;
  feelsLike: string;
  condition: string;
  icon: "snow" | "sun" | "fog";
  wind: string;
  humidity: string;
  visibility: string;
  status: string;
  summitSunrise: string;
  bestPushTime: string;
}

const WEATHER_DATA: SummitWeather[] = [
  {
    id: "brahmatal",
    name: "Brahmatal Pass",
    altitude: "11,570 FT",
    region: "Chamoli, Uttarakhand",
    temp: "-5°C",
    feelsLike: "-9°C",
    condition: "Clear Winter Alpine Skies",
    icon: "sun",
    wind: "14 km/h NW",
    humidity: "42%",
    visibility: "30+ km",
    status: "Mt. Trishul Visible",
    summitSunrise: "06:32 AM",
    bestPushTime: "04:30 AM Ridge Push",
  },
  {
    id: "kedarkantha",
    name: "Kedarkantha Peak",
    altitude: "12,500 FT",
    region: "Uttarkashi, Uttarakhand",
    temp: "-8°C",
    feelsLike: "-14°C",
    condition: "Crisp Snow Summit",
    icon: "snow",
    wind: "18 km/h W",
    humidity: "48%",
    visibility: "28 km",
    status: "Swargarohini Panorama Open",
    summitSunrise: "06:28 AM",
    bestPushTime: "02:00 AM Alpine Push",
  },
  {
    id: "kuari-pass",
    name: "Kuari Pass",
    altitude: "12,516 FT",
    region: "Joshimath, Uttarakhand",
    temp: "-6°C",
    feelsLike: "-11°C",
    condition: "High Ridge Crisp Air",
    icon: "sun",
    wind: "16 km/h SW",
    humidity: "38%",
    visibility: "35+ km",
    status: "Nanda Devi Wall Clear",
    summitSunrise: "06:25 AM",
    bestPushTime: "05:00 AM Khullara Ascent",
  },
  {
    id: "har-ki-dun",
    name: "Har Ki Dun Valley",
    altitude: "11,675 FT",
    region: "Govind NP, Uttarakhand",
    temp: "-2°C",
    feelsLike: "-6°C",
    condition: "Serene Alpine Basin",
    icon: "sun",
    wind: "10 km/h NE",
    humidity: "50%",
    visibility: "25+ km",
    status: "Pandava Trail Clear",
    summitSunrise: "06:30 AM",
    bestPushTime: "06:00 AM Valley Walk",
  },
  {
    id: "hampta-pass",
    name: "Hampta Pass",
    altitude: "14,010 FT",
    region: "Manali, Himachal Pradesh",
    temp: "-4°C",
    feelsLike: "-8°C",
    condition: "Lahaul High Crossover",
    icon: "fog",
    wind: "22 km/h N",
    humidity: "55%",
    visibility: "20 km",
    status: "Deo Tibba & Indrasan Clear",
    summitSunrise: "06:15 AM",
    bestPushTime: "05:30 AM Pass Crossing",
  },
  {
    id: "bali-pass",
    name: "Bali Pass Col",
    altitude: "16,200 FT",
    region: "Garhwal High Divide",
    temp: "-12°C",
    feelsLike: "-19°C",
    condition: "High Glacial Ridge",
    icon: "snow",
    wind: "26 km/h WNW",
    humidity: "32%",
    visibility: "40+ km",
    status: "Technical Ridge Roped",
    summitSunrise: "06:20 AM",
    bestPushTime: "03:00 AM Summit Push",
  },
  {
    id: "chandrashila",
    name: "Chandrashila Peak",
    altitude: "13,549 FT",
    region: "Chopta, Uttarakhand",
    temp: "-3°C",
    feelsLike: "-7°C",
    condition: "Golden Alpenglow Dawn",
    icon: "sun",
    wind: "12 km/h S",
    humidity: "40%",
    visibility: "35+ km",
    status: "360° Chaukhamba Clear",
    summitSunrise: "06:22 AM",
    bestPushTime: "04:30 AM Tungnath Start",
  },
];

export default function LiveSummitWeather() {
  const [selectedId, setSelectedId] = useState("brahmatal");
  const current = WEATHER_DATA.find((w) => w.id === selectedId) || WEATHER_DATA[0];

  return (
    <div className="w-full bg-slate-950/70 border border-white/10 rounded-2xl p-4 sm:px-6 sm:py-3.5 backdrop-blur-md relative">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-6">
          {/* Header & Summit Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5" />
                Live Trail Telemetry
              </span>
            </div>

            {/* Summit Buttons (Horizontal Swipeable on mobile) */}
            <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap gap-1.5 pb-1 sm:pb-0 max-w-full">
              {WEATHER_DATA.map((w) => (
                <button
                  key={w.id}
                  onClick={() => setSelectedId(w.id)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    w.id === selectedId
                      ? "bg-amber-400 text-black shadow-md scale-105"
                      : "bg-white/5 text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {w.name.split(" ")[0]} ({w.altitude})
                </button>
              ))}
            </div>
          </div>

          {/* Current Summit Weather Data Strip */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-8 lg:border-l lg:border-white/10 lg:pl-6">
            {/* Condition & Temp */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300">
                {current.icon === "snow" && <CloudSnow className="w-5 h-5 text-sky-300 animate-pulse" />}
                {current.icon === "sun" && <Sun className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: "20s" }} />}
                {current.icon === "fog" && <CloudFog className="w-5 h-5 text-slate-300" />}
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-extrabold text-white">{current.temp}</span>
                  <span className="text-[11px] text-white/50">Feels {current.feelsLike}</span>
                </div>
                <p className="text-xs text-amber-300 font-medium">{current.condition}</p>
              </div>
            </div>

            {/* Wind */}
            <div className="flex items-center gap-2 border-l border-white/10 pl-4 sm:pl-6">
              <Wind className="w-4 h-4 text-white/40" />
              <div>
                <p className="text-[10px] text-white/50 uppercase">Wind</p>
                <p className="text-xs font-semibold text-white">{current.wind}</p>
              </div>
            </div>

            {/* Visibility */}
            <div className="flex items-center gap-2 border-l border-white/10 pl-4 sm:pl-6 hidden sm:flex">
              <Eye className="w-4 h-4 text-white/40" />
              <div>
                <p className="text-[10px] text-white/50 uppercase">Visibility</p>
                <p className="text-xs font-semibold text-white">{current.visibility}</p>
              </div>
            </div>

            {/* Sunrise / Summit Push Recommendation */}
            <div className="flex items-center gap-2 border-l border-white/10 pl-4 sm:pl-6 hidden md:flex">
              <Sunrise className="w-4 h-4 text-amber-400" />
              <div>
                <p className="text-[10px] text-amber-300/80 uppercase">Summit Sunrise: {current.summitSunrise}</p>
                <p className="text-xs font-semibold text-white">{current.bestPushTime}</p>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}
