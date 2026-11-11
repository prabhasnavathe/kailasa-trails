import React, { useState } from "react";
import { Compass, Sparkles, ArrowRight, RotateCcw, Check, Mountain, Clock, MapPin, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

interface MatchResult {
  title: string;
  slug: string;
  tagline: string;
  region: string;
  altitude: string;
  duration: string;
  difficulty: string;
  image: string;
  matchScore: number;
}

export default function TrailMatcherQuiz() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    duration: "",
    terrain: "",
    fitness: "",
  });

  const getMatch = (): MatchResult => {
    // Difficult / High Ridge
    if (answers.fitness === "experienced" || answers.duration === "8days") {
      return {
        title: "Bali Pass Trek",
        slug: "bali-pass-trek",
        tagline: "The hardest crossing in the Garhwal at 16,200 ft connecting to Yamunotri via sacred Ruinsara Tal",
        region: "Garhwal Himalayas · Uttarkashi",
        altitude: "16,200 FT",
        duration: "8 Days / 7 Nights",
        difficulty: "Advanced",
        image: "/manus-storage/bali-pass-cover.jpg",
        matchScore: 99,
      };
    }

    // Weekend / 3 Days / Beginner
    if (answers.duration === "3days") {
      return {
        title: "Chopta Chandrashila & Tungnath",
        slug: "chopta-chandrashila-trek",
        tagline: "Trek past the world's highest Shiva temple to the 13,549 ft Moon Rock summit with 360° Chaukhamba views",
        region: "Garhwal Himalayas · Chopta",
        altitude: "13,549 FT",
        duration: "3 Days / 2 Nights",
        difficulty: "Easy",
        image: "/manus-storage/chopta-chandrashila-cover.jpg",
        matchScore: 98,
      };
    }

    // Har Ki Dun / Valley of Gods
    if (answers.terrain === "harkidun" || answers.duration === "7days") {
      return {
        title: "Har Ki Dun Trek",
        slug: "har-ki-dun-trek",
        tagline: "The mythical Valley of the Gods and ancient Pandava trail to heaven ringed by Swargarohini",
        region: "Govind National Park · Uttarakhand",
        altitude: "11,675 FT",
        duration: "7 Days / 6 Nights",
        difficulty: "Moderate",
        image: "/manus-storage/har-ki-dun-cover.jpg",
        matchScore: 98,
      };
    }

    // Hampta Pass / Himachal Crossover
    if (answers.terrain === "hampta") {
      return {
        title: "Hampta Pass Trek",
        slug: "hampta-pass-trek",
        tagline: "Two worlds in one trek: cross from lush Kullu forests into the stark cold-desert of Lahaul & Chandratal",
        region: "Himachal Pradesh · Manali",
        altitude: "14,010 FT",
        duration: "5 Days / 4 Nights",
        difficulty: "Moderate",
        image: "/manus-storage/hampta-pass-cover.jpg",
        matchScore: 97,
      };
    }

    // Kuari Pass
    if (answers.terrain === "curzon" || answers.duration === "6days") {
      return {
        title: "Kuari Pass Curzon Trail",
        slug: "kuari-pass-trek",
        tagline: "Historic Curzon Trail across sweeping Gurson Bugyal facing the mighty Nanda Devi wall",
        region: "Garhwal Himalayas · Joshimath",
        altitude: "12,516 FT",
        duration: "6 Days / 5 Nights",
        difficulty: "Moderate",
        image: "/manus-storage/kuari-pass-cover.jpg",
        matchScore: 98,
      };
    }

    // Brahmatal
    if (answers.terrain === "brahmatal" || answers.fitness === "beginner") {
      return {
        title: "Brahmatal Winter Trek",
        slug: "brahmatal-winter-trek",
        tagline: "Summit above the clouds: frozen alpine lake with 360° views of Mt. Trishul & Nanda Ghunti",
        region: "Garhwal Himalayas · Chamoli",
        altitude: "11,570 FT",
        duration: "5 Days / 4 Nights",
        difficulty: "Easy",
        image: "/manus-storage/brahmatal-cover.jpg",
        matchScore: 98,
      };
    }

    // Kedarkantha default
    return {
      title: "Kedarkantha Winter Trek",
      slug: "kedarkantha-trek",
      tagline: "The Queen of Winter Treks: 360° sunrise summit over Swargarohini, frozen Juda Ka Talab",
      region: "Garhwal Himalayas · Uttarkashi",
      altitude: "12,500 FT",
      duration: "5 Days / 4 Nights",
      difficulty: "Moderate",
      image: "/manus-storage/kedarkantha-cover.jpg",
      matchScore: 97,
    };
  };

  const handleSelect = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    if (step < 3) {
      setStep((prev) => prev + 1);
    } else {
      setStep(4);
    }
  };

  const reset = () => {
    setStep(1);
    setAnswers({ duration: "", terrain: "", fitness: "" });
  };

  const matched = step === 4 ? getMatch() : null;

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/30 mb-4">
            <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: "12s" }} />
            <span>Find Your Type · Trail Matcher</span>
          </div>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
            Find Your Summit in 3 Clicks
          </h3>
          <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto">
            Not sure which trail suits your schedule and spirit? Tell us what you
            seek and let our expedition algorithm match you with your ideal peak.
          </p>
        </div>

        {/* Quiz Stepper Card */}
        <div className="bg-slate-900/90 border border-white/15 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-xl">
          {/* Progress Indicators */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step === num
                      ? "bg-amber-400 text-black shadow-[0_0_15px_rgba(251,191,36,0.6)]"
                      : step > num
                      ? "bg-amber-500/30 text-amber-300 border border-amber-400/40"
                      : "bg-white/10 text-white/40"
                  }`}
                >
                  {step > num ? <Check className="w-4 h-4" /> : num}
                </div>
              ))}
              <span className="text-xs text-white/60 font-medium ml-2">
                {step === 1 && "Step 1 of 3: Duration"}
                {step === 2 && "Step 2 of 3: Landscape & Season"}
                {step === 3 && "Step 3 of 3: Fitness & Experience"}
                {step === 4 && "Expedition Match Ready!"}
              </span>
            </div>

            {step > 1 && (
              <button
                onClick={reset}
                className="text-xs text-white/50 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Start Over
              </button>
            )}
          </div>

          {/* Step 1: Duration */}
          {step === 1 && (
            <div className="animate-in fade-in duration-300">
              <h4 className="text-xl md:text-2xl font-bold mb-3 text-white">
                How many days do you have for your expedition?
              </h4>
              <p className="text-sm text-white/60 mb-6">
                Choose the timeframe that works best with your schedule.
              </p>

              <div className="grid sm:grid-cols-4 gap-4">
                {[
                  {
                    id: "3days",
                    title: "3 Days / 2 Nights",
                    desc: "Quick summit gateway to Chandrashila & Tungnath temple",
                    badge: "3 Days",
                  },
                  {
                    id: "5days",
                    title: "5 Days / 4 Nights",
                    desc: "Classic snow summits: Kedarkantha, Brahmatal or Hampta Pass",
                    badge: "5 Days",
                  },
                  {
                    id: "7days",
                    title: "6 - 7 Days",
                    desc: "Curzon Trail Kuari Pass or Har Ki Dun Valley of the Gods",
                    badge: "6-7 Days",
                  },
                  {
                    id: "8days",
                    title: "8 Days / 7 Nights",
                    desc: "High-altitude technical divide crossing over Bali Pass (16,200 FT)",
                    badge: "8 Days",
                  },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect("duration", opt.id)}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400 hover:bg-amber-500/10 text-left transition-all group hover:scale-[1.02]"
                  >
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/10 text-amber-300 mb-2 group-hover:bg-amber-400 group-hover:text-black transition-colors">
                      {opt.badge}
                    </span>
                    <h5 className="font-bold text-base text-white mb-1 group-hover:text-amber-300">
                      {opt.title}
                    </h5>
                    <p className="text-xs text-white/60 leading-relaxed">
                      {opt.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Landscape Preference */}
          {step === 2 && (
            <div className="animate-in fade-in duration-300">
              <h4 className="text-xl md:text-2xl font-bold mb-3 text-white">
                What Himalayan setting inspires you most?
              </h4>
              <p className="text-sm text-white/60 mb-6">
                Choose your dream landscape from our official Kailasa Trails routes.
              </p>

              <div className="grid sm:grid-cols-4 gap-4">
                {[
                  {
                    id: "brahmatal",
                    title: "Frozen Alpine Lakes",
                    desc: "Brahmatal frozen lake & Mt. Trishul panoramic ridgelines",
                    icon: "🏔️",
                  },
                  {
                    id: "kedarkantha",
                    title: "Snow Summit & Sunrise",
                    desc: "Alpine summit push at 12,500 ft, Juda Ka Talab, and snow slides",
                    icon: "❄️",
                  },
                  {
                    id: "harkidun",
                    title: "Valley of the Gods",
                    desc: "Ancient Pandava trail, Osla village, and Swargarohini massif",
                    icon: "🌲",
                  },
                  {
                    id: "hampta",
                    title: "Two Worlds Crossover",
                    desc: "Green Kullu to barren Lahaul cold desert & Chandratal Lake",
                    icon: "✨",
                  },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect("terrain", opt.id)}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400 hover:bg-amber-500/10 text-left transition-all group hover:scale-[1.02]"
                  >
                    <span className="text-2xl block mb-2">{opt.icon}</span>
                    <h5 className="font-bold text-base text-white mb-1 group-hover:text-amber-300">
                      {opt.title}
                    </h5>
                    <p className="text-xs text-white/60 leading-relaxed">
                      {opt.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Fitness / Experience */}
          {step === 3 && (
            <div className="animate-in fade-in duration-300">
              <h4 className="text-xl md:text-2xl font-bold mb-3 text-white">
                What is your wilderness & fitness level?
              </h4>
              <p className="text-sm text-white/60 mb-6">
                We design routes with proper acclimatization for every experience level.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    id: "first_time",
                    title: "Active Beginner / First Timer",
                    desc: "I run, cycle, or workout regularly but want a guided, confidence-building trail with full support.",
                    badge: "All Welcome",
                  },
                  {
                    id: "experienced",
                    title: "Seasoned Hiker / Adventure Ready",
                    desc: "I have hiked before, comfortable with steep gradients, altitude gain, and variable weather.",
                    badge: "Thrill Seeker",
                  },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect("fitness", opt.id)}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400 hover:bg-amber-500/10 text-left transition-all group hover:scale-[1.02]"
                  >
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/10 text-amber-300 mb-3 group-hover:bg-amber-400 group-hover:text-black transition-colors">
                      {opt.badge}
                    </span>
                    <h5 className="font-bold text-lg text-white mb-2 group-hover:text-amber-300">
                      {opt.title}
                    </h5>
                    <p className="text-xs text-white/60 leading-relaxed">
                      {opt.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Result Match Display */}
          {step === 4 && matched && (
            <div className="animate-in zoom-in-95 duration-500">
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                {/* Image Showcase */}
                <div className="relative w-full lg:w-1/2 h-64 sm:h-72 rounded-2xl overflow-hidden shadow-2xl border border-amber-400/40">
                  <img
                    src={matched.image}
                    alt={matched.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  <div className="absolute top-3 left-3 bg-amber-500 text-black font-extrabold text-xs px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    {matched.matchScore}% Expedition Match
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs text-amber-300 font-semibold">{matched.region}</p>
                    <p className="text-xl font-bold">{matched.title}</p>
                  </div>
                </div>

                {/* Details & CTA */}
                <div className="w-full lg:w-1/2 flex flex-col justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                      Your Matched Expedition
                    </span>
                    <h4 className="text-3xl font-bold text-white mb-2 mt-1">
                      {matched.title}
                    </h4>
                    <p className="text-sm text-white/70 mb-5 leading-relaxed">
                      {matched.tagline}
                    </p>

                    {/* Quick Specs */}
                    <div className="grid grid-cols-3 gap-3 text-center mb-6">
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-[10px] text-white/50 uppercase">Altitude</p>
                        <p className="text-xs sm:text-sm font-bold text-amber-300">{matched.altitude}</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-[10px] text-white/50 uppercase">Duration</p>
                        <p className="text-xs sm:text-sm font-bold text-white">{matched.duration}</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-[10px] text-white/50 uppercase">Grade</p>
                        <p className="text-xs sm:text-sm font-bold text-emerald-400">{matched.difficulty}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={() => setLocation(`/trek/${matched.slug}`)}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold flex-1 py-5"
                    >
                      View Itinerary <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        const msg = `Hi Kailasa Trails! I took your Trail Matcher and got ${matched.title} (${matched.matchScore}% Match). I'd like to ask about upcoming batch dates!`;
                        window.open(`https://wa.me/919440650253?text=${encodeURIComponent(msg)}`, "_blank");
                      }}
                      className="border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20 py-5"
                    >
                      Chat on WhatsApp
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
