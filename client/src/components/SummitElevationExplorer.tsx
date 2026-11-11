import React, { useState } from "react";
import { Mountain, Compass, Wind, Thermometer, Droplet, ArrowRight, ShieldCheck, Sun, Sunrise, Moon, Eye, Award, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Waypoint {
  id: string;
  name: string;
  altitudeFt: number;
  altitudeM: number;
  distanceKm: number;
  temperature: string;
  oxygenPercent: number;
  biome: string;
  description: string;
  guideAdvice: string;
  highlight: string;
  image: string;
}

interface TrekProfile {
  id: string;
  title: string;
  region: string;
  maxAltitude: string;
  difficulty: string;
  duration: string;
  accentColor: string;
  waypoints: Waypoint[];
}

const TREK_PROFILES: TrekProfile[] = [
  {
    id: "brahmatal",
    title: "Brahmatal Winter Summit",
    region: "Garhwal Himalayas · Chamoli",
    maxAltitude: "11,570 FT",
    difficulty: "Easy",
    duration: "5D / 4N",
    accentColor: "from-cyan-400 to-blue-600",
    waypoints: [
      {
        id: "lohajung",
        name: "Lohajung Basecamp",
        altitudeFt: 7600,
        altitudeM: 2316,
        distanceKm: 0,
        temperature: "+10°C",
        oxygenPercent: 78,
        biome: "Oak & Rhododendron Forest Foothills",
        description: "Historic base camp on the Alaknanda ridge, starting point after scenic Panchprayag drive.",
        guideAdvice: "Hydrate well after the 294 km drive; prepare microspikes and gaiters for snow trail tomorrow.",
        highlight: "Panoramic sunset over Shivalik ranges and Mandoli village.",
        image: "/manus-storage/trek-trail-forest_21c401b4.png",
      },
      {
        id: "bekaltal",
        name: "Bekaltal Frozen Lake",
        altitudeFt: 9850,
        altitudeM: 3002,
        distanceKm: 4.5,
        temperature: "+2°C",
        oxygenPercent: 72,
        biome: "Dense Oak Woods & High Alpine Streams",
        description: "Enchanting high lake enclosed by ancient oak forests, home to Asian Barred Owlets.",
        guideAdvice: "Layer up as night falls — lake temperatures drop close to freezing under the stars.",
        highlight: "First dramatic sight of Mt. Trishul framed through snowy trees.",
        image: "/manus-storage/mountain-lake-reflection_28b217ce.png",
      },
      {
        id: "brahmatal-camp",
        name: "Brahmatal High Camp",
        altitudeFt: 10650,
        altitudeM: 3246,
        distanceKm: 11.5,
        temperature: "-3°C",
        oxygenPercent: 69,
        biome: "Alpine Ridge & Bugyal Meadows",
        description: "Vast snowfield clearing near the sacred frozen lake where Lord Brahma is said to have meditated.",
        guideAdvice: "Early sleep recommended. 4:00 AM alpine start for the summit ridge panorama.",
        highlight: "Glowing moonlit views of Mt. Trishul (7,120 m) and Mt. Nanda Ghunti (6,309 m).",
        image: "/manus-storage/trekker-campfire-evening_f4db685e.png",
      },
      {
        id: "brahmatal-pass",
        name: "Brahmatal Pass Summit",
        altitudeFt: 11570,
        altitudeM: 3526,
        distanceKm: 19.5,
        temperature: "-8°C",
        oxygenPercent: 66,
        biome: "Exposed Wind-Scoured Snow Ridge",
        description: "Zenith ridgeline with steep drops on both flanks and 360° unobstructed Himalayan panorama.",
        guideAdvice: "Keep sunglasses on to prevent snow glare; celebrate summit moment before descent to Daldum.",
        highlight: "Complete 360° Himalayan amphitheatre above a sea of clouds.",
        image: "/manus-storage/trekker-summit-celebration_7cdb949b.png",
      },
    ],
  },
  {
    id: "kedarkantha",
    title: "Kedarkantha Summit Ridge",
    region: "Garhwal Himalayas · Uttarkashi",
    maxAltitude: "12,500 FT",
    difficulty: "Moderate",
    duration: "5D / 4N",
    accentColor: "from-amber-400 to-orange-600",
    waypoints: [
      {
        id: "sankri",
        name: "Sankri Base Village",
        altitudeFt: 6400,
        altitudeM: 1950,
        distanceKm: 0,
        temperature: "+12°C",
        oxygenPercent: 81,
        biome: "Pine Forest Hamlet in Govind National Park",
        description: "Picturesque wooden village gateway nestled inside Govind Pashu Vihar National Park.",
        guideAdvice: "Check backpack weight and verify microspikes fit hiking boots snugly.",
        highlight: "Traditional wooden Himalayan architecture and crisp mountain air.",
        image: "/manus-storage/trek-trail-forest_21c401b4.png",
      },
      {
        id: "juda-ka-talab",
        name: "Juda Ka Talab Lake",
        altitudeFt: 9100,
        altitudeM: 2773,
        distanceKm: 4.0,
        temperature: "+1°C",
        oxygenPercent: 74,
        biome: "Giant Pine & Maple Canopy",
        description: "Mythical frozen lake where Lord Shiva once untied a lock of his hair to create water.",
        guideAdvice: "Stay warm inside insulated sleeping bags; lake freezes solid overnight.",
        highlight: "Mirror reflections of giant pine trees on pristine frozen ice.",
        image: "/manus-storage/mountain-lake-reflection_28b217ce.png",
      },
      {
        id: "kk-base",
        name: "Kedarkantha Base Camp",
        altitudeFt: 11300,
        altitudeM: 3444,
        distanceKm: 7.0,
        temperature: "-6°C",
        oxygenPercent: 68,
        biome: "Snow Meadow Below Pyramid Peak",
        description: "Open snow plateau right at the foot of Kedarkantha's dramatic triangular summit pyramid.",
        guideAdvice: "Alpine wake-up call at 2:00 AM; headlamps and thermal layers are essential.",
        highlight: "Bortle-Class 1 night sky with glowing Milky Way above the summit pyramid.",
        image: "/manus-storage/trekker-campfire-evening_f4db685e.png",
      },
      {
        id: "kk-summit",
        name: "Kedarkantha Summit Peak",
        altitudeFt: 12500,
        altitudeM: 3810,
        distanceKm: 12.5,
        temperature: "-12°C",
        oxygenPercent: 64,
        biome: "Exposed Summit Crest & Trishul Shrine",
        description: "The Queen of Winter Treks pinnacle with small stone shrine and 360° views of Swargarohini.",
        guideAdvice: "Witness golden sunrise hitting Bandarpoonch & Kala Nag, then enjoy the thrilling snow slides down.",
        highlight: "Spectacular 360° golden sunrise over Swargarohini, Bandarpoonch, and Black Peak.",
        image: "/manus-storage/kedarkantha-trek_b82ed446.png",
      },
    ],
  },
  {
    id: "kuari-pass",
    title: "Kuari Pass Curzon Trail",
    region: "Garhwal Himalayas · Joshimath",
    maxAltitude: "12,516 FT",
    difficulty: "Moderate",
    duration: "6D / 5N",
    accentColor: "from-emerald-400 to-teal-600",
    waypoints: [
      {
        id: "dhak",
        name: "Dhak Trailhead / Joshimath",
        altitudeFt: 6150,
        altitudeM: 1874,
        distanceKm: 0,
        temperature: "+14°C",
        oxygenPercent: 82,
        biome: "Terraced Garhwali Hillside & Oak Woods",
        description: "Historic valley start following the footsteps of Lord Curzon's 1905 expedition.",
        guideAdvice: "Pace yourself gently on the opening switchbacks; maintain steady breathing.",
        highlight: "Sweeping views of Dhauliganga river gorge and Mount Dronagiri.",
        image: "/manus-storage/trek-trail-forest_21c401b4.png",
      },
      {
        id: "gulling-top",
        name: "Gulling Top Campsite",
        altitudeFt: 9600,
        altitudeM: 2926,
        distanceKm: 6.0,
        temperature: "+2°C",
        oxygenPercent: 73,
        biome: "Ancient Oak, Walnut & Rhododendron Woods",
        description: "Camp nestled right beneath the high canopy with opening vistas of Hathi Ghoda peaks.",
        guideAdvice: "Drink plenty of warm garlic soup prepared by camp cook to aid acclimatization.",
        highlight: "Alpenglow striking Hathi and Ghoda Parvat across the valley.",
        image: "/manus-storage/mountain-lake-reflection_28b217ce.png",
      },
      {
        id: "khullara-top",
        name: "Khullara Top Snow Meadow",
        altitudeFt: 11100,
        altitudeM: 3383,
        distanceKm: 11.0,
        temperature: "-5°C",
        oxygenPercent: 68,
        biome: "Vast High-Altitude Snow Meadow",
        description: "Expansive alpine meadow opening toward Gurson Bugyal and high Garhwal giants.",
        guideAdvice: "Keep crampons / microspikes accessible in your daypack for the pass ascent.",
        highlight: "Unbroken view of the Himalayan amphitheatre under millions of crisp stars.",
        image: "/manus-storage/trekker-campfire-evening_f4db685e.png",
      },
      {
        id: "kuari-pass-summit",
        name: "Kuari Pass Historic Summit",
        altitudeFt: 12516,
        altitudeM: 3815,
        distanceKm: 19.0,
        temperature: "-9°C",
        oxygenPercent: 64,
        biome: "Wind-Carved Mountain Col & Snow Flutes",
        description: "The Gateway Pass offering the most majestic close-up panoramic wall of Nanda Devi on Earth.",
        guideAdvice: "Pause at the stone cairn; look northeast to identify Kamet, Chaukhamba, and Trishul.",
        highlight: "Face-to-face with India's highest sacred peak — the 7,816 m Nanda Devi wall.",
        image: "/manus-storage/kuari-pass-cover.jpg",
      },
    ],
  },
  {
    id: "har-ki-dun",
    title: "Har Ki Dun (Valley of Gods)",
    region: "Govind NP · Garhwal",
    maxAltitude: "11,675 FT",
    difficulty: "Moderate",
    duration: "7D / 6N",
    accentColor: "from-green-400 to-emerald-600",
    waypoints: [
      {
        id: "sankri-hkd",
        name: "Sankri Base Village",
        altitudeFt: 6400,
        altitudeM: 1950,
        distanceKm: 0,
        temperature: "+13°C",
        oxygenPercent: 81,
        biome: "Wooden Village & River Gorges",
        description: "Historic Himalayan starting village inside Govind Pashu Vihar National Park.",
        guideAdvice: "Check your daypack and enjoy the sound of the Supin River.",
        highlight: "Charming traditional Pahari wooden houses and apple orchards.",
        image: "/manus-storage/trek-trail-forest_21c401b4.png",
      },
      {
        id: "osla",
        name: "Osla / Seema Village",
        altitudeFt: 8500,
        altitudeM: 2600,
        distanceKm: 13.0,
        temperature: "+8°C",
        oxygenPercent: 76,
        biome: "Supin River Valley & Ancient Deodar",
        description: "Centuries-old wooden village famous for its Someshwar temple and terraced fields.",
        guideAdvice: "Respect local customs around the ancient temple; stay hydrated.",
        highlight: "Unique Someshwar temple architecture and friendly Garhwali hospitality.",
        image: "/manus-storage/trekker-forest-trail_d6fd0880.png",
      },
      {
        id: "simatra",
        name: "Simatra Campsite",
        altitudeFt: 10200,
        altitudeM: 3109,
        distanceKm: 26.0,
        temperature: "+2°C",
        oxygenPercent: 71,
        biome: "Chestnut, Willow & River Shore",
        description: "Serene camp across the hanging wooden bridges with the roaring river soundtrack.",
        guideAdvice: "Prepare for a chilly night; high valley winds pick up after sunset.",
        highlight: "Milky Way stretching over the Supin canyon.",
        image: "/manus-storage/trekker-campfire-evening_f4db685e.png",
      },
      {
        id: "hkd-valley",
        name: "Har Ki Dun Valley Floor",
        altitudeFt: 11675,
        altitudeM: 3558,
        distanceKm: 31.5,
        temperature: "-4°C",
        oxygenPercent: 66,
        biome: "Cradle-Shaped Glacial Alpine Basin",
        description: "The mythical Pandavas' trail to heaven surrounded by massive snow massifs.",
        guideAdvice: "Savor the packed lunch while admiring Swargarohini, Black Peak, and Bandarpoonch.",
        highlight: "Face-to-face with the sheer Swargarohini stairs to heaven.",
        image: "/manus-storage/hero-mountain-dawn_3c01f024.png",
      },
    ],
  },
  {
    id: "hampta-pass",
    title: "Hampta Pass (Two Worlds)",
    region: "Manali & Lahaul · Himachal",
    maxAltitude: "14,010 FT",
    difficulty: "Moderate",
    duration: "5D / 4N",
    accentColor: "from-blue-400 to-indigo-600",
    waypoints: [
      {
        id: "jobra",
        name: "Jobra Trailhead / Chika",
        altitudeFt: 10100,
        altitudeM: 3078,
        distanceKm: 0,
        temperature: "+11°C",
        oxygenPercent: 71,
        biome: "Lush Pine, Maple & Deodar Canopy",
        description: "Lush valley start along the rushing crystal waters of Rani Nallah.",
        guideAdvice: "Take short rhythmic strides to adjust smoothly to high altitude.",
        highlight: "Cascading waterfalls tumbling through emerald green pine forests.",
        image: "/manus-storage/trek-trail-forest_21c401b4.png",
      },
      {
        id: "jwara-balu",
        name: "Balu Ka Ghera",
        altitudeFt: 11900,
        altitudeM: 3627,
        distanceKm: 7.0,
        temperature: "+1°C",
        oxygenPercent: 66,
        biome: "Wildflower Meadows & Boulder Sand Flats",
        description: "Sandy campsite at the base of Hampta Pass after traversing the Jwara Valley of Flowers.",
        guideAdvice: "Rest early; tomorrow is the big crossover into the stark cold-desert of Lahaul.",
        highlight: "Wild Himalayan flowers carpeting the riverside meadow.",
        image: "/manus-storage/mountain-lake-reflection_28b217ce.png",
      },
      {
        id: "hampta-summit",
        name: "Hampta Pass Crossing",
        altitudeFt: 14010,
        altitudeM: 4270,
        distanceKm: 15.0,
        temperature: "-6°C",
        oxygenPercent: 60,
        biome: "High Glacial Col & Moraine Ridge",
        description: "The dramatic divide where green Kullu instantly shifts into the barren moonscapes of Lahaul.",
        guideAdvice: "Watch your footing on the steep moraine descent toward Shea Goru.",
        highlight: "Jaw-dropping views of Mt. Deo Tibba (6,001 m) and Mt. Indrasan (6,221 m).",
        image: "/manus-storage/adventure-climber-peak_6654d27c.png",
      },
      {
        id: "shea-goru",
        name: "Shea Goru Oasis",
        altitudeFt: 12900,
        altitudeM: 3931,
        distanceKm: 19.0,
        temperature: "-8°C",
        oxygenPercent: 63,
        biome: "Cold-Desert Valley & Glacial River",
        description: "A sheltered oasis campsite beside the icy Shea Goru stream in the Lahaul valley.",
        guideAdvice: "Unlace boots for the famous morning river crossing before driving to Chandratal.",
        highlight: "Surreal stark barren peaks framed against brilliant cobalt skies.",
        image: "/manus-storage/trekker-campfire-evening_f4db685e.png",
      },
    ],
  },
  {
    id: "bali-pass",
    title: "Bali Pass (The Hardest Divide)",
    region: "Garhwal High Divide · Uttarkashi",
    maxAltitude: "16,200 FT",
    difficulty: "Advanced",
    duration: "8D / 7N",
    accentColor: "from-rose-500 to-red-700",
    waypoints: [
      {
        id: "devsu",
        name: "Devsu Bugyal Meadow",
        altitudeFt: 10200,
        altitudeM: 3109,
        distanceKm: 22.0,
        temperature: "+7°C",
        oxygenPercent: 71,
        biome: "High Alpine Meadow & Pine Slopes",
        description: "Expansive green plateau surrounded by snowy ramparts of Swargarohini.",
        guideAdvice: "Pace your breathing on the sustained ascent from Seema.",
        highlight: "Panoramic vantage of the upper Supin wilderness.",
        image: "/manus-storage/trekker-forest-trail_d6fd0880.png",
      },
      {
        id: "ruinsara",
        name: "Ruinsara Tal Glacial Lake",
        altitudeFt: 11800,
        altitudeM: 3596,
        distanceKm: 29.0,
        temperature: "+1°C",
        oxygenPercent: 66,
        biome: "Glacial Lake & Birch Woods",
        description: "Sacred mountain lake revered by locals, reflecting Black Peak (Kalanag) and Swargarohini.",
        guideAdvice: "Take acclimatization walk around the lake shore in the afternoon.",
        highlight: "Emerald reflection of Mt. Kalanag in still glacial waters.",
        image: "/manus-storage/mountain-lake-reflection_28b217ce.png",
      },
      {
        id: "odari",
        name: "Odari Camp (Hanuman Cave)",
        altitudeFt: 13100,
        altitudeM: 3993,
        distanceKm: 33.0,
        temperature: "-4°C",
        oxygenPercent: 62,
        biome: "Rocky Moraines & High Alpine Boulders",
        description: "Legendary cave camp where Lord Hanuman is believed to have rested.",
        guideAdvice: "Layer up with thermal down jacket; prepare harness and microspikes.",
        highlight: "Dramatic rocky amphitheatre towering under star-dusted skies.",
        image: "/manus-storage/trekker-campfire-evening_f4db685e.png",
      },
      {
        id: "bali-pass-crest",
        name: "Bali Pass Knife-Edge Crest",
        altitudeFt: 16200,
        altitudeM: 4938,
        distanceKm: 42.0,
        temperature: "-14°C",
        oxygenPercent: 54,
        biome: "Perpetual Snow Ridge & Technical Col",
        description: "One of the toughest crossings in the Garhwal connecting to Yamunotri with steep snow knife-edge.",
        guideAdvice: "Follow guide footsteps in single file; maintain three points of contact on steep snow.",
        highlight: "360° close-up view of Bandarpunch, Swargarohini, and Yamunotri valley.",
        image: "/manus-storage/bali-pass-cover.jpg",
      },
    ],
  },
  {
    id: "chandrashila",
    title: "Chopta Chandrashila & Tungnath",
    region: "Chopta · Garhwal",
    maxAltitude: "13,549 FT",
    difficulty: "Easy",
    duration: "3D / 2N",
    accentColor: "from-amber-400 to-yellow-600",
    waypoints: [
      {
        id: "sari",
        name: "Sari Village & Deoria Tal",
        altitudeFt: 7999,
        altitudeM: 2438,
        distanceKm: 0,
        temperature: "+12°C",
        oxygenPercent: 77,
        biome: "Rhododendron Woods & Mirror Lake",
        description: "Charming village and the legendary lake reflecting the great Chaukhamba massif.",
        guideAdvice: "Catch the morning lake reflections before driving to Chopta base.",
        highlight: "Still crystal reflections of Chaukhamba's four snow-clad peaks.",
        image: "/manus-storage/mountain-lake-reflection_28b217ce.png",
      },
      {
        id: "chopta",
        name: "Chopta Meadows (Mini Switzerland)",
        altitudeFt: 8790,
        altitudeM: 2680,
        distanceKm: 12.0,
        temperature: "+9°C",
        oxygenPercent: 75,
        biome: "Alpine Grassland Bugyal & Pine Forest",
        description: "The emerald staging meadow at the base of the Tungnath-Chandrashila trail.",
        guideAdvice: "Begin early morning to witness the sunrise from the high summit.",
        highlight: "Rolling meadows blanketed in snow and rhododendrons.",
        image: "/manus-storage/trek-trail-forest_21c401b4.png",
      },
      {
        id: "tungnath",
        name: "Tungnath Temple (Highest Shiva Shrine)",
        altitudeFt: 12070,
        altitudeM: 3680,
        distanceKm: 15.5,
        temperature: "+1°C",
        oxygenPercent: 66,
        biome: "High Altitude Sacred Stone Sanctuary",
        description: "The highest Shiva temple on planet Earth, revered as part of the sacred Panch Kedar.",
        guideAdvice: "Ring the temple bell and take a short breather before the final push to Moon Rock.",
        highlight: "Ancient stone shrine standing resilient amidst Himalayan winds.",
        image: "/manus-storage/trekker-group-sunrise_89814204.png",
      },
      {
        id: "chandrashila-peak",
        name: "Chandrashila Summit (Moon Rock)",
        altitudeFt: 13549,
        altitudeM: 4000,
        distanceKm: 17.0,
        temperature: "-5°C",
        oxygenPercent: 62,
        biome: "Exposed 360° Alpine Summit Pinnacle",
        description: "A legendary summit vantage offering the most complete 360° view of Garhwal giants.",
        guideAdvice: "Soak in the golden alpenglow illuminating Nanda Devi, Trishul, and Kedar Dome.",
        highlight: "Panoramic 360° sight of Nanda Devi, Trishul, and Chaukhamba.",
        image: "/manus-storage/chopta-chandrashila-cover.jpg",
      },
    ],
  },
];

export default function SummitElevationExplorer() {
  const [selectedTrekId, setSelectedTrekId] = useState<string>("brahmatal");
  const [activeWaypointIndex, setActiveWaypointIndex] = useState<number>(1);
  const [timeOfDay, setTimeOfDay] = useState<"dawn" | "day" | "dusk">("dawn");

  const currentTrek = TREK_PROFILES.find((t) => t.id === selectedTrekId) || TREK_PROFILES[0];
  const activeWaypoint = currentTrek.waypoints[activeWaypointIndex] || currentTrek.waypoints[0];

  const minAlt = currentTrek.waypoints[0].altitudeFt;
  const maxAlt = currentTrek.waypoints[currentTrek.waypoints.length - 1].altitudeFt;
  const currentAlt = activeWaypoint.altitudeFt;
  const altProgress = Math.round(((currentAlt - minAlt) / (maxAlt - minAlt)) * 100);

  const handleBookTrek = () => {
    const text = `Hi Kailasa Trails! I was exploring the interactive ${currentTrek.title} route at ${activeWaypoint.name} (${activeWaypoint.altitudeFt} FT). I want to enquire about joining your next expedition batch.`;
    const url = `https://wa.me/919440650253?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-full text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300 uppercase tracking-widest mb-3">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            Interactive Summit Elevation Profiler
          </div>
          <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Ascent Route & Altitude Lab
          </h3>
          <p className="text-base text-white/60 mt-2 max-w-xl">
            Analyze the topographic profile, atmospheric oxygen drops, and crucial camp milestones from valley floor to the summit ridge.
          </p>
        </div>

        {/* Expedition Switcher Tabs */}
        <div className="flex flex-wrap gap-2 bg-slate-950/80 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
          {TREK_PROFILES.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setSelectedTrekId(t.id);
                setActiveWaypointIndex(1);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                t.id === selectedTrekId
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 scale-[1.02]"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              {t.title.split(" ")[0]} ({t.maxAltitude})
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Interactive 3D Elevation Cross-Section Curve & Waypoints */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
          {/* Subtle Ambient Background Light */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Telemetry Header */}
          <div className="flex items-center justify-between gap-4 mb-6 z-10">
            <div>
              <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">
                {currentTrek.region}
              </span>
              <h4 className="text-2xl font-bold text-white">{currentTrek.title}</h4>
            </div>

            {/* Time of Day Toggle */}
            <div className="flex items-center gap-1 bg-black/40 border border-white/10 p-1 rounded-xl">
              <button
                onClick={() => setTimeOfDay("dawn")}
                className={`p-1.5 rounded-lg transition-colors ${
                  timeOfDay === "dawn" ? "bg-amber-500 text-black shadow-sm" : "text-white/50 hover:text-white"
                }`}
                title="Summit Push Dawn"
              >
                <Sunrise className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setTimeOfDay("day")}
                className={`p-1.5 rounded-lg transition-colors ${
                  timeOfDay === "day" ? "bg-sky-400 text-black shadow-sm" : "text-white/50 hover:text-white"
                }`}
                title="Alpine Midday Sun"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setTimeOfDay("dusk")}
                className={`p-1.5 rounded-lg transition-colors ${
                  timeOfDay === "dusk" ? "bg-indigo-600 text-white shadow-sm" : "text-white/50 hover:text-white"
                }`}
                title="Starlit Basecamp"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Dynamic Mountain SVG Elevation Profile Chart */}
          <div className="relative my-4 py-4 z-10">
            <div className="relative w-full h-48 sm:h-56">
              <svg
                viewBox="0 0 600 240"
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
              >
                <defs>
                  {/* Elevation Curve Gradient */}
                  <linearGradient id="elevationGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.45" />
                    <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#0f172a" stopOpacity="0.0" />
                  </linearGradient>

                  <linearGradient id="curveLine" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="50%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#fbbf24" />
                  </linearGradient>
                </defs>

                {/* Subtle Grid Lines */}
                <line x1="0" y1="60" x2="600" y2="600" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                <line x1="0" y1="120" x2="600" y2="120" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                <line x1="0" y1="180" x2="600" y2="180" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />

                {/* Mountain Ridge Elevation Path */}
                <path
                  d="M 20 200 C 120 190, 160 160, 240 145 C 320 130, 380 90, 460 70 C 510 55, 540 35, 580 25 L 580 220 L 20 220 Z"
                  fill="url(#elevationGrad)"
                />
                <path
                  d="M 20 200 C 120 190, 160 160, 240 145 C 320 130, 380 90, 460 70 C 510 55, 540 35, 580 25"
                  fill="none"
                  stroke="url(#curveLine)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Interactive Waypoint Nodes along the curve */}
                {currentTrek.waypoints.map((wp, idx) => {
                  // Coordinate interpolation based on 4 points
                  const coords = [
                    { x: 20, y: 200 },
                    { x: 220, y: 150 },
                    { x: 420, y: 85 },
                    { x: 580, y: 25 },
                  ][idx] || { x: 20, y: 200 };

                  const isActive = idx === activeWaypointIndex;

                  return (
                    <g
                      key={wp.id}
                      className="cursor-pointer transition-transform duration-300 hover:scale-125"
                      onClick={() => setActiveWaypointIndex(idx)}
                    >
                      {/* Outer Pulse ring if active */}
                      {isActive && (
                        <circle
                          cx={coords.x}
                          cy={coords.y}
                          r="16"
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="2"
                          className="animate-ping"
                        />
                      )}

                      {/* Main Node circle */}
                      <circle
                        cx={coords.x}
                        cy={coords.y}
                        r={isActive ? "9" : "6"}
                        fill={isActive ? "#fbbf24" : "#0284c7"}
                        stroke="#ffffff"
                        strokeWidth="2.5"
                        className="transition-all"
                      />

                      {/* Node Text Label */}
                      <text
                        x={coords.x}
                        y={coords.y - 14}
                        textAnchor={idx === 0 ? "start" : idx === 3 ? "end" : "middle"}
                        fill={isActive ? "#fbbf24" : "rgba(255,255,255,0.7)"}
                        fontSize="11"
                        fontWeight={isActive ? "700" : "500"}
                      >
                        {wp.name.split(" ")[0]} ({wp.altitudeFt} FT)
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Elevation Scrubber */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between text-xs text-white/60 mb-2">
                <span>Base Camp: {minAlt} FT</span>
                <span className="text-cyan-300 font-bold">
                  Active Milestone: {activeWaypoint.altitudeFt.toLocaleString()} FT ({activeWaypoint.altitudeM} M)
                </span>
                <span>Summit: {maxAlt} FT</span>
              </div>

              {/* Waypoint Selection Buttons */}
              <div className="grid grid-cols-4 gap-2">
                {currentTrek.waypoints.map((wp, idx) => (
                  <button
                    key={wp.id}
                    onClick={() => setActiveWaypointIndex(idx)}
                    className={`py-2 px-1 rounded-xl text-center text-xs font-semibold border transition-all ${
                      idx === activeWaypointIndex
                        ? "bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-500/10"
                        : "bg-white/5 border-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span className="block text-[10px] text-white/40 uppercase">Day {idx + 1}</span>
                    <span className="truncate block font-bold">{wp.name.split(" ")[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Real-Time Telemetry Bar (Oxygen, Temp, Distance) */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 z-10">
            {/* Oxygen Saturation */}
            <div className="bg-black/40 border border-white/10 p-3 rounded-2xl">
              <div className="flex items-center gap-1.5 text-xs text-white/60 mb-1">
                <Wind className="w-3.5 h-3.5 text-cyan-400" />
                <span>Atmospheric O₂</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold text-white">{activeWaypoint.oxygenPercent}%</span>
                <span className="text-[10px] text-emerald-400">
                  {activeWaypoint.oxygenPercent > 75 ? "Optimal" : activeWaypoint.oxygenPercent > 65 ? "Acclimatize" : "Summit Push"}
                </span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-amber-400 transition-all duration-500"
                  style={{ width: `${activeWaypoint.oxygenPercent}%` }}
                />
              </div>
            </div>

            {/* Ambient Temperature */}
            <div className="bg-black/40 border border-white/10 p-3 rounded-2xl">
              <div className="flex items-center gap-1.5 text-xs text-white/60 mb-1">
                <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                <span>Temperature</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold text-white">{activeWaypoint.temperature}</span>
                <span className="text-[10px] text-sky-300">Ridge Wind</span>
              </div>
              <p className="text-[10px] text-white/40 mt-1 truncate">
                {activeWaypoint.altitudeFt > 10000 ? "Sub-zero chill" : "Comfortable hiking"}
              </p>
            </div>

            {/* Trail Distance */}
            <div className="bg-black/40 border border-white/10 p-3 rounded-2xl">
              <div className="flex items-center gap-1.5 text-xs text-white/60 mb-1">
                <Mountain className="w-3.5 h-3.5 text-indigo-400" />
                <span>Distance</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold text-white">{activeWaypoint.distanceKm} KM</span>
                <span className="text-[10px] text-white/50">From Start</span>
              </div>
              <p className="text-[10px] text-white/40 mt-1 truncate">
                {altProgress}% elevation gain
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Waypoint Card & Photo Showcase */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-slate-950/90 border border-white/10 rounded-3xl p-6 sm:p-7 backdrop-blur-xl relative overflow-hidden shadow-2xl">
          {/* Waypoint Image Preview with Overlay */}
          <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden mb-6 border border-white/10 group">
            <img
              src={activeWaypoint.image}
              alt={activeWaypoint.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

            {/* Milestone Badge */}
            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-semibold text-amber-300">
              Waypoint {activeWaypointIndex + 1} of {currentTrek.waypoints.length}
            </div>

            {/* Altitude Tag */}
            <div className="absolute top-3 right-3 bg-cyan-500/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg">
              {activeWaypoint.altitudeFt.toLocaleString()} FT
            </div>

            {/* Waypoint Title Over Image */}
            <div className="absolute bottom-3 left-3 right-3">
              <h5 className="text-xl font-bold text-white leading-snug drop-shadow-md">
                {activeWaypoint.name}
              </h5>
              <p className="text-xs text-cyan-300 font-medium">{activeWaypoint.biome}</p>
            </div>
          </div>

          {/* Description & Guide Briefing */}
          <div className="space-y-4 mb-6">
            <div>
              <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-1">
                Topographic Terrain & Experience
              </p>
              <p className="text-sm text-white/80 leading-relaxed">
                {activeWaypoint.description}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/20">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 mb-1">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                Kailasa Lead Guide Briefing
              </div>
              <p className="text-xs text-white/75 leading-relaxed">
                {activeWaypoint.guideAdvice}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-amber-300/90">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{activeWaypoint.highlight}</span>
            </div>
          </div>

          {/* Booking CTA Button */}
          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700 text-white font-bold py-6 rounded-2xl shadow-xl shadow-cyan-500/20 transition-all hover:scale-[1.01]"
            onClick={handleBookTrek}
          >
            Enquire For {currentTrek.title.split(" ")[0]} Expedition <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
