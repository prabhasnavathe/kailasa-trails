import React, { useState, useEffect } from "react";
import AntigravityCursorField from "@/components/AntigravityCursorField";

interface BunnyDialogueExperienceProps {
  onEnter?: () => void;
}

/**
 * In-memory session state:
 * - When the page reloads (F5 or browser reload), the JS runtime resets to false,
 *   so the cover page opens every time the user reloads the site.
 * - When navigating in-app (e.g. visiting a trek page and pressing the back button),
 *   this variable remains true in memory, so the cover page is not shown again.
 */
let hasEnteredInCurrentSession = false;

export default function BunnyDialogueExperience({ onEnter }: BunnyDialogueExperienceProps) {
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState<boolean>(() => !hasEnteredInCurrentSession);

  // Lock scroll on background page while cover screen is active
  useEffect(() => {
    if (showLoadingScreen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      return () => {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
  }, [showLoadingScreen]);

  // Antigravity-style sleek progress animation
  useEffect(() => {
    if (!showLoadingScreen) return;

    const timer = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsLoaded(true);
          return 100;
        }
        // Smooth exponential step
        const step = Math.max(1, Math.floor((100 - prev) * 0.12));
        return Math.min(100, prev + step);
      });
    }, 45);

    return () => clearInterval(timer);
  }, [showLoadingScreen]);

  // Enter website from Loading Page
  const handleEnter = () => {
    hasEnteredInCurrentSession = true;

    if (typeof window !== "undefined") {
      try {
        sessionStorage.removeItem("kailasa_has_entered");
      } catch (e) {}

      // Remove any trailing hash so user starts cleanly at the top of the Home page
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }

    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
    setShowLoadingScreen(false);

    if (onEnter) onEnter();

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  };

  if (!showLoadingScreen) return null;

  return (
    <div
      onClick={handleEnter}
      className="fixed inset-0 z-[100] bg-[#07090e] flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden transition-all duration-700"
    >
      {/* Interactive Antigravity Small Snow Field (Reacts to cursor movement) */}
      <AntigravityCursorField
        particleCount={520}
        interactiveRadius={175}
        className="z-0 opacity-90"
      />

      {/* Subtle Ambient Radial Glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      {/* Minimalist Central Logo & Orbit */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Floating Transparent Kailasa Trails Logo */}
        <div className="relative mb-8 sm:mb-10 flex items-center justify-center">
          {/* Large Transparent Kailasa Trails Logo */}
          <img
            src="/manus-storage/kailasa-logo-white-transparent.png"
            alt="Kailasa Trails"
            className="w-48 sm:w-60 md:w-72 max-w-[85vw] h-auto object-contain filter drop-shadow-[0_0_30px_rgba(56,189,248,0.2)] drop-shadow-[0_0_60px_rgba(251,191,36,0.15)] hover:scale-105 transition-all duration-500"
          />
        </div>

        {/* Antigravity Minimalist Progress Bar */}
        <div className="w-56 sm:w-64">
          <div className="w-full bg-white/[0.08] h-[2px] rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300 transition-all duration-100 ease-out"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-white/40">
            <span className="tracking-widest uppercase">
              {loadingProgress < 100 ? "Loading Expedition" : "Ready"}
            </span>
            <span>{loadingProgress}%</span>
          </div>
        </div>

        {/* Enter Call to Action */}
        <div className="mt-10 transition-all duration-500">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEnter();
            }}
            className="group relative inline-flex items-center gap-3 px-8 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-white/30 text-white text-xs tracking-[0.2em] uppercase font-medium backdrop-blur-md transition-all shadow-lg hover:shadow-cyan-500/10 hover:scale-105"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Enter Kailasa</span>
          </button>
          <p className="text-[10px] text-white/30 tracking-wider mt-3">
            Click anywhere to step into the mountains
          </p>
        </div>
      </div>
    </div>
  );
}
