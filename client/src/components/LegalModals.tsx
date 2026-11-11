import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Shield, FileText, Mountain, CheckCircle2, AlertTriangle, HeartPulse, Sparkles, X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface DifficultyModalProps extends ModalProps {
  onSelectDifficulty?: (level: string) => void;
}

export function PrivacyPolicyDialog({ open, onOpenChange }: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-slate-900 border-white/20 text-white p-6 sm:p-8">
        <DialogHeader className="border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-white">
                Privacy & Data Protection Policy
              </DialogTitle>
              <DialogDescription className="text-white/60 text-xs mt-0.5">
                Kailasa Trails — Last updated January 2026
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 text-sm text-white/80 mt-4 leading-relaxed">
          <p>
            At <strong>Kailasa Trails</strong>, we respect your personal privacy and are committed to safeguarding all personal information you provide when planning, booking, and undertaking Himalayan expeditions with our team.
          </p>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              1. Information We Collect
            </h4>
            <ul className="list-disc pl-5 space-y-1.5 text-white/70">
              <li>
                <strong>Contact Information:</strong> Full name, WhatsApp phone number, email address, and emergency contact details for family coordination.
              </li>
              <li>
                <strong>Wilderness Permit Documents:</strong> Government photo ID (Aadhaar or Passport) required by the Uttarakhand Forest Department and Himachal Tourism for inner-line permits and national park sanctuary entry.
              </li>
              <li>
                <strong>Medical & Fitness Self-Declaration:</strong> Prior trekking history, altitude tolerance, known medical conditions, allergies, or regular medications to ensure proactive guide safety and acute mountain sickness (AMS) monitoring.
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              2. How Your Data Is Used
            </h4>
            <ul className="list-disc pl-5 space-y-1.5 text-white/70">
              <li>Processing official forest checkpost permits, camping permits, and local panchayat access.</li>
              <li>Coordinating batch logistics, vehicle pickups from Dehradun/Rishikesh, and high-camp rations.</li>
              <li>Dispatching rapid mountain rescue services or emergency helicopter evacuation if acute medical situations arise.</li>
              <li>Sharing batch photos, weather advisories, and preparation checklists directly via WhatsApp.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              3. Data Security & Third-Party Protection
            </h4>
            <p className="text-white/70 mb-2">
              We <strong>never sell, lease, or monetize</strong> your personal data to third-party ad networks or brokers. Your contact details are shared strictly on a need-to-know basis with:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-white/70">
              <li>Designated certified Trek Leaders leading your specific batch.</li>
              <li>Forest Department authorities for statutory entry registration.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              4. Trekkers' Gallery & Photo Rights
            </h4>
            <p className="text-white/70">
              Photos submitted via the "Share Your Experience" portal undergo admin moderation before display in the public Trekkers' Gallery. You retain ownership of your images. You may request removal or modification at any time.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-white/80">
            <h4 className="font-semibold text-primary mb-1">Questions or Data Inquiries?</h4>
            <p className="text-xs text-white/70">
              Reach our privacy officer at{" "}
              <a href="mailto:kailasatrails@gmail.com" className="text-primary underline">
                kailasatrails@gmail.com
              </a>{" "}
              or call/WhatsApp{" "}
              <a href="tel:9440650253" className="text-primary underline font-medium">
                +91 94406 50253
              </a>
              .
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
          <Button
            onClick={() => onOpenChange(false)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6"
          >
            I Understand
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function TermsOfServiceDialog({ open, onOpenChange }: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-slate-900 border-white/20 text-white p-6 sm:p-8">
        <DialogHeader className="border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-white">
                Expedition Terms of Service
              </DialogTitle>
              <DialogDescription className="text-white/60 text-xs mt-0.5">
                Kailasa Trails — Booking Agreement & Mountain Guidelines
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 text-sm text-white/80 mt-4 leading-relaxed">
          <p>
            By booking a trek, paying an advance deposit, or participating in an expedition with <strong>Kailasa Trails</strong>, you agree to the following terms, safety obligations, and operational policies.
          </p>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              1. Slot Booking, Balance Payment & 5% GST
            </h4>
            <ul className="list-disc pl-5 space-y-1.5 text-white/70">
              <li>
                A non-refundable slot advance of <strong>₹1,000 per trekker</strong> secures your reservation for the selected departure date.
              </li>
              <li>
                <strong>Statutory 5% GST:</strong> All adventure tourism services, guiding, campsite permits, and meals are billed with statutory 5% Goods and Services Tax as mandated by the Government of India.
              </li>
              <li>
                The remaining balance must be cleared prior to or upon departure from the basecamp meeting point.
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              2. Cancellation & Flexible Rescheduling
            </h4>
            <ul className="list-disc pl-5 space-y-1.5 text-white/70">
              <li>
                <strong>15+ days before departure:</strong> 100% of your paid deposit is credited as an expedition voucher valid for 12 months for any upcoming batch.
              </li>
              <li>
                <strong>7 to 14 days before departure:</strong> 50% credit voucher issued for future trek bookings.
              </li>
              <li>
                <strong>Weather & Natural Circumstances:</strong> If heavy snowfall, landslides, or state forest orders close a trail, Kailasa Trails will provide an alternate safe route or free batch rescheduling.
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              3. Trek Leader Authority & Mountain Safety
            </h4>
            <p className="text-white/70 mb-2">
              Himalayan trekking carries inherent natural risks including sub-zero temperatures, altitude sickness, and unpredictable mountain weather.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-white/70">
              <li>
                You must follow the instructions of your certified NIM/IMF Trek Leader at all times.
              </li>
              <li>
                If a participant shows symptoms of Acute Mountain Sickness (AMS), High Altitude Pulmonary Edema (HAPE), or exhaustion, the Trek Leader holds the <strong>absolute authority</strong> to mandate immediate descent for the safety of the individual and team.
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-amber-400" />
              4. Code of Conduct & Leave No Trace
            </h4>
            <ul className="list-disc pl-5 space-y-1.5 text-white/70">
              <li>
                <strong>Zero Tolerance for Substances:</strong> Alcohol, recreational drugs, and smoking are strictly forbidden on trail and at high camps to protect team respiratory fitness and safety.
              </li>
              <li>
                <strong>Eco-Stewardship:</strong> Kailasa Trails enforces strict Leave No Trace ethics. All plastic, sweet wrappers, and non-biodegradable waste must be packed down to valley disposal centers.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
          <Button
            onClick={() => onOpenChange(false)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6"
          >
            Accept Terms
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function DifficultyLevelsDialog({
  open,
  onOpenChange,
  onSelectDifficulty,
}: DifficultyModalProps) {
  const grades = [
    {
      level: "Easy",
      badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      accentBorder: "border-emerald-500/30",
      altRange: "Up to 12,500 FT",
      pace: "4 - 5 hrs / 5 - 8 km daily",
      terrain: "Gradual forest trails, rhododendron canopies, gentle alpine bugyals, packed seasonal snow.",
      fitness: "Can jog 3 km comfortably in 25-30 minutes. Basic cardiovascular stamina.",
      treks: ["Brahmatal Winter Trek (12,250 FT)", "Kedarkantha Summit (12,500 FT)"],
      description: "Designed for beginners, first-time Himalayan adventurers, and active families who want sweeping high-mountain views with manageable daily elevation gains.",
    },
    {
      level: "Moderate",
      badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      accentBorder: "border-amber-500/30",
      altRange: "12,500 FT - 14,500 FT",
      pace: "5 - 7 hrs / 8 - 12 km daily",
      terrain: "Sustained ascents, rocky moraines, boulder crossings, knee-deep snow sections, crisp sub-zero camps.",
      fitness: "Can run 5 km in 35 minutes. Routine cardio, brisk walking, or active sports 3-4 days per week.",
      treks: ["Har Ki Dun (11,700 FT)", "Kuari Pass Lord Curzon Trail (12,516 FT)"],
      description: "Requires solid endurance and mental grit. Features steeper climbs and longer trail days with breathtaking 360° panoramas of India's highest peaks.",
    },
    {
      level: "Advanced",
      badgeColor: "bg-rose-500/20 text-rose-400 border-rose-500/30",
      accentBorder: "border-rose-500/30",
      altRange: "14,500 FT - 16,200+ FT",
      pace: "7 - 9 hrs / 10 - 15 km daily",
      terrain: "High-altitude pass crossing, sharp knife-edge ridges, scree slopes, fixed ropes, glacial moraine traverse.",
      fitness: "Can run 5 km under 30 minutes. High anaerobic stamina, core strength, and prior 13,000+ FT experience.",
      treks: ["Bali Pass Alpine Expedition (16,200 FT)"],
      description: "For seasoned trekkers seeking technical alpine crossings and high-adrenaline wilderness expeditions requiring microspikes, gaiters, and rope work.",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[88vh] overflow-y-auto bg-slate-900 border-white/20 text-white p-6 sm:p-8">
        <DialogHeader className="border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
              <Mountain className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-white">
                Himalayan Difficulty Grading System
              </DialogTitle>
              <DialogDescription className="text-white/60 text-xs mt-0.5">
                Understand altitude, trail profiles, and physical requirements to choose your ideal expedition
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="grid gap-6 mt-6">
          {grades.map((g) => (
            <div
              key={g.level}
              className={`p-5 sm:p-6 rounded-2xl bg-white/[0.03] border ${g.accentBorder} transition-all hover:bg-white/[0.05]`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${g.badgeColor}`}>
                    {g.level} Grade
                  </span>
                  <span className="text-xs text-white/60 font-medium">
                    Max Altitude: <strong className="text-white">{g.altRange}</strong>
                  </span>
                </div>
                <span className="text-xs text-primary font-semibold">
                  ⏱️ {g.pace}
                </span>
              </div>

              <p className="text-sm text-white/80 mb-4 leading-relaxed">
                {g.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-3 text-xs mb-4">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <strong className="text-white/90 block mb-1">🥾 Trail Terrain:</strong>
                  <span className="text-white/70">{g.terrain}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <strong className="text-white/90 block mb-1">🏃 Target Fitness:</strong>
                  <span className="text-white/70">{g.fitness}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/5">
                <div className="text-xs text-white/60">
                  <strong className="text-white/80">Kailasa Treks: </strong>
                  {g.treks.join(" • ")}
                </div>
                {onSelectDifficulty && (
                  <Button
                    size="sm"
                    onClick={() => {
                      onSelectDifficulty(g.level);
                      onOpenChange(false);
                    }}
                    className="bg-primary/20 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/40 text-xs font-semibold px-4 h-8 transition-colors"
                  >
                    View {g.level} Treks →
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
          <Button
            onClick={() => onOpenChange(false)}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            Close Guide
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
