import React, { useState } from "react";
import { ShieldCheck, CheckCircle2, Circle, Backpack, Sparkles, AlertCircle, Info, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GearItem {
  id: string;
  name: string;
  category: "apparel" | "technical" | "safety";
  weightKg: number;
  essential: boolean;
  desc: string;
}

const GEAR_ITEMS: GearItem[] = [
  {
    id: "g1",
    name: "Down Jacket (-10°C Rated)",
    category: "apparel",
    weightKg: 0.75,
    essential: true,
    desc: "Critical for night drops at alpine base camps and dawn summit pushes.",
  },
  {
    id: "g2",
    name: "Waterproof Trekking Boots (High Ankle)",
    category: "technical",
    weightKg: 1.3,
    essential: true,
    desc: "Provides ankle support on rocky Sahyadri descents and slushy Himalayan snow.",
  },
  {
    id: "g3",
    name: "Microspikes & Gaiters",
    category: "technical",
    weightKg: 0.55,
    essential: true,
    desc: "Prevents slipping on hard morning ice and keeps deep powder out of boots.",
  },
  {
    id: "g4",
    name: "Trekking Poles (Pair)",
    category: "technical",
    weightKg: 0.48,
    essential: false,
    desc: "Reduces knee strain by 25% on steep mountain and ridge descents.",
  },
  {
    id: "g5",
    name: "High-Lumen Headlamp + Spare Cells",
    category: "safety",
    weightKg: 0.18,
    essential: true,
    desc: "Mandatory for 3:30 AM summit pushes and pitch-black campsite navigation.",
  },
  {
    id: "g6",
    name: "High-Altitude Medical Kit & Oximeter",
    category: "safety",
    weightKg: 0.35,
    essential: true,
    desc: "Daily SpO2 monitoring and AMS preventive care guided by expedition leader.",
  },
  {
    id: "g7",
    name: "UV Cat 3 Glacier Sunglasses",
    category: "apparel",
    weightKg: 0.08,
    essential: true,
    desc: "Protects retina from snow blindness caused by intense alpine UV reflection.",
  },
  {
    id: "g8",
    name: "Insulated Stainless Thermal Flask (1L)",
    category: "apparel",
    weightKg: 0.42,
    essential: false,
    desc: "Keeps boiling hot water liquid in sub-zero summit conditions.",
  },
];

export default function GearReadinessSimulator() {
  const [packedIds, setPackedIds] = useState<string[]>([
    "g1",
    "g2",
    "g5",
    "g6",
  ]);

  const toggleItem = (id: string) => {
    setPackedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const packAll = () => {
    setPackedIds(GEAR_ITEMS.map((g) => g.id));
  };

  const totalItems = GEAR_ITEMS.length;
  const packedCount = packedIds.length;
  const readinessPercent = Math.round((packedCount / totalItems) * 100);

  const packedWeight = GEAR_ITEMS.filter((g) => packedIds.includes(g.id))
    .reduce((sum, g) => sum + g.weightKg, 0)
    .toFixed(1);

  return (
    <section className="py-24 bg-white text-slate-900 border-t border-slate-200">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Info & Meter */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-4">
              <Backpack className="w-3.5 h-3.5" />
              <span>Virtual Expedition Pack</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
              Are You Summit Ready?
            </h3>
            <p className="text-muted-foreground text-base mb-8 leading-relaxed">
              Pack your virtual backpack. Check off the essentials recommended by
              our certified mountaineering guides to calculate your readiness score
              and weight before hitting the trail.
            </p>

            {/* Readiness Card */}
            <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-xl mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                  Summit Readiness Status
                </span>
                <span className="text-2xl font-extrabold text-amber-300">
                  {readinessPercent}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden mb-5">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${readinessPercent}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs pt-4 border-t border-white/10">
                <div>
                  <p className="text-white/50">Base Pack Weight</p>
                  <p className="text-base font-bold text-white mt-0.5">{packedWeight} KG</p>
                </div>
                <div>
                  <p className="text-white/50">Packed Essentials</p>
                  <p className="text-base font-bold text-white mt-0.5">
                    {packedCount} of {totalItems} Items
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={packAll}
                className="text-xs font-semibold"
              >
                Pack All Essentials
              </Button>
              <button
                onClick={() => {
                  const itemsList = GEAR_ITEMS.filter((g) => packedIds.includes(g.id))
                    .map((g) => `• ${g.name}`)
                    .join("\n");
                  const msg = `*My Kailasa Trails Gear Checklist:*\n${itemsList}\n\nCan your guide team verify my gear for upcoming trek?`;
                  window.open(`https://wa.me/919440650253?text=${encodeURIComponent(msg)}`, "_blank");
                }}
                className="text-xs text-primary font-semibold hover:underline flex items-center gap-1.5 ml-2"
              >
                Send Checklist to Guide on WhatsApp →
              </button>
            </div>
          </div>

          {/* Right: Interactive Checklist Grid */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h4 className="text-lg font-bold text-foreground mb-4 flex items-center justify-between">
              <span>Alpine Pack Checklist</span>
              <span className="text-xs font-normal text-muted-foreground">Click to pack / unpack</span>
            </h4>

            <div className="grid sm:grid-cols-2 gap-3">
              {GEAR_ITEMS.map((item) => {
                const isPacked = packedIds.includes(item.id);

                return (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer select-none ${
                      isPacked
                        ? "bg-white border-primary/60 shadow-md ring-1 ring-primary/30"
                        : "bg-slate-100/70 border-slate-200/80 hover:bg-white text-muted-foreground"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 text-primary flex-shrink-0">
                        {isPacked ? (
                          <CheckCircle2 className="w-5 h-5 text-amber-600" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-300" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <p className={`text-sm font-bold truncate ${isPacked ? "text-foreground" : "text-slate-600"}`}>
                            {item.name}
                          </p>
                          <span className="text-[10px] font-semibold text-slate-500 bg-slate-200/70 px-1.5 py-0.5 rounded">
                            {item.weightKg}kg
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground leading-tight line-clamp-2">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
