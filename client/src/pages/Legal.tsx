import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Shield,
  FileText,
  Mountain,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  HeartPulse,
} from "lucide-react";

interface LegalPageProps {
  type: "privacy" | "terms";
}

export default function Legal({ type }: LegalPageProps) {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-primary selection:text-white">
      {/* Top Bar */}
      <header className="border-b border-white/10 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-85 transition-opacity">
            <img
              src="/manus-storage/kailasa-logo-final_1a4dcf9c.png"
              alt="Kailasa Trails"
              className="w-10 h-10 object-contain rounded"
            />
            <div>
              <span className="font-bold tracking-wider text-base block text-white">
                KAILASA
              </span>
              <span className="text-xs text-primary font-bold tracking-widest block -mt-1">
                TRAILS
              </span>
            </div>
          </Link>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setLocation("/")}
            className="border-white/20 text-white hover:bg-white/10 text-xs font-semibold gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-4xl py-12 sm:py-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
            {type === "privacy" ? (
              <Shield className="w-6 h-6" />
            ) : (
              <FileText className="w-6 h-6" />
            )}
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              {type === "privacy"
                ? "Privacy & Data Protection Policy"
                : "Expedition Terms of Service & Agreement"}
            </h1>
            <p className="text-white/60 text-sm mt-1">
              Kailasa Trails Wilderness Guidelines • Last Updated 2026
            </p>
          </div>
        </div>

        {type === "privacy" ? (
          <div className="space-y-8 text-white/80 leading-relaxed">
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                1. Information We Collect
              </h2>
              <p className="text-sm text-white/70 mb-3">
                To organize and execute high-altitude Himalayan expeditions responsibly, Kailasa Trails collects:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-white/70">
                <li>
                  <strong>Trekker Profile:</strong> Full name, WhatsApp contact number, email address, and emergency contact details.
                </li>
                <li>
                  <strong>Statutory Wilderness Permits:</strong> Photo ID (Aadhaar/Passport) required by Uttarakhand and Himachal Pradesh Forest Departments for Sanctuary & National Park permits.
                </li>
                <li>
                  <strong>Medical & Altitude Health History:</strong> Pre-existing medical conditions, allergies, and altitude fitness declarations to assist our certified wilderness guides in safety monitoring.
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                2. How Your Data Is Used
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-sm text-white/70">
                <li>Procuring forest entry permits, campsite permits, and ecological passes.</li>
                <li>Organizing shared transport pickups from Dehradun, Rishikesh, or Manali.</li>
                <li>Disaster and emergency response dispatch, including medical evacuations.</li>
                <li>Sending pre-trek packing lists and gear readiness checklists via WhatsApp.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                3. Non-Disclosure & Security
              </h2>
              <p className="text-sm text-white/70">
                We never sell, rent, or trade your contact info with third-party advertisers. All information submitted through our portal is encrypted over SSL/TLS.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                4. Trekkers' Gallery Submissions
              </h2>
              <p className="text-sm text-white/70">
                Photos shared through "Share Your Experience" are reviewed by admin before appearing in the gallery. You maintain full copyright of your photos and may request their removal at any time.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20">
              <h3 className="font-semibold text-primary mb-1">Contact for Privacy Requests</h3>
              <p className="text-sm text-white/70">
                Email us at{" "}
                <a href="mailto:kailasatrails@gmail.com" className="text-primary underline">
                  kailasatrails@gmail.com
                </a>{" "}
                or WhatsApp{" "}
                <a href="tel:9440650253" className="text-primary underline font-medium">
                  +91 94406 50253
                </a>
                .
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-8 text-white/80 leading-relaxed">
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-amber-400" />
                1. Slot Reservation, Balance Payment & 5% GST
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-sm text-white/70">
                <li>
                  A booking advance of <strong>₹1,000 per person</strong> secures your batch slot.
                </li>
                <li>
                  <strong>Statutory 5% GST:</strong> All adventure tourism services are billed with 5% GST in accordance with Government of India regulations.
                </li>
                <li>
                  Remaining balance is payable prior to departing from the basecamp pickup hub.
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-amber-400" />
                2. Cancellation & Flexible Rescheduling
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-sm text-white/70">
                <li>
                  <strong>15+ days before trek:</strong> 100% credit voucher valid for 12 months.
                </li>
                <li>
                  <strong>7–14 days before trek:</strong> 50% credit voucher.
                </li>
                <li>
                  <strong>Weather / Trail Closures:</strong> Full credit voucher or free batch rescheduling if extreme blizzards or government directives close the pass.
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                3. Mountain Safety & Guide Authority
              </h2>
              <p className="text-sm text-white/70 mb-2">
                Certified NIM/IMF Trek Leaders have final authority over trail safety. If a trekker displays symptoms of Acute Mountain Sickness (AMS), the guide team reserves the authority to order an immediate descent to a lower camp.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-amber-400" />
                4. Zero-Tolerance for Substances & Leave No Trace
              </h2>
              <p className="text-sm text-white/70">
                Alcohol, recreational drugs, and smoking are strictly forbidden on trail and at high camps. All participants must pack down all non-biodegradable waste to keep the Himalayas pristine.
              </p>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-white/10 py-8 text-center text-xs text-white/50">
        © 2026 Kailasa Trails. All rights reserved. • Contact: +91 94406 50253
      </footer>
    </div>
  );
}
