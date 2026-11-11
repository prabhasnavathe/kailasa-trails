import React, { useEffect, useRef, useState } from "react";
import { Play, RotateCcw, Trophy, Award, ArrowUp, ArrowLeft, ArrowRight, Copy, Check, MessageCircle, Shield, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Ledge {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  type: "rock" | "ice" | "spring" | "crumble" | "summit";
  crumbleTimer?: number;
  crumbled?: boolean;
  vx?: number;
}

interface Collectible {
  id: number;
  x: number;
  y: number;
  type: "flag" | "chai" | "crystal";
  collected: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

const SUMMIT_ALTITUDE = 13549;
const BASE_ALTITUDE = 6000;
const VOUCHER_CODE = "KAILASA500";
const VOUCHER_VALUE = 500;

export default function SummitRushGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover" | "victory">("idle");
  const [altitude, setAltitude] = useState<number>(BASE_ALTITUDE);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [ropesLeft, setRopesLeft] = useState<number>(3);
  const [copied, setCopied] = useState<boolean>(false);

  // Audio permanently muted per user request
  useEffect(() => {
    const saved = localStorage.getItem("kailasa_climber_highscore");
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  const stateRef = useRef({
    gameState: "idle" as "idle" | "playing" | "gameover" | "victory",
    score: 0,
    altitude: BASE_ALTITUDE,
    ropesLeft: 3,
    cameraY: 0,
    animId: 0,
    aiming: false,
    aimAngle: -Math.PI / 2,
    aimPower: 13,
    shieldTimer: 0,
    particles: [] as Particle[],
    snowflakes: [] as { x: number; y: number; r: number; speed: number; drift: number }[],
    climber: {
      x: 350,
      y: 320,
      vx: 0,
      vy: 0,
      width: 30,
      height: 44,
      isGrounded: true,
      jumpsLeft: 2,
      facing: 1 as 1 | -1,
      lastStableX: 350,
      lastStableY: 320,
    },
    ledges: [] as Ledge[],
    collectibles: [] as Collectible[],
    nextLedgeY: 260,
    summitY: -6500, // Summit platform location
  });

  // Procedural ledges reaching up to the summit
  const generateLedgesUpTo = (targetWorldY: number) => {
    const s = stateRef.current;
    const canvas = canvasRef.current;
    const width = canvas ? canvas.width : 750;

    while (s.nextLedgeY > targetWorldY) {
      const y = s.nextLedgeY;

      // When reaching near summit
      if (y <= s.summitY) {
        // Place the Grand Golden Summit Platform
        s.ledges.push({
          id: 999999,
          x: width / 2 - 160,
          y: s.summitY,
          width: 320,
          height: 24,
          type: "summit",
        });
        break;
      }

      // Standard progressive ledges
      const progress = Math.min(1, Math.abs(y) / Math.abs(s.summitY));
      const ledgeWidth = Math.max(90, 160 - progress * 40);

      // Alternate positions left / center / right so climbing zig-zags naturally
      const count = Math.random() < 0.25 ? 2 : 1;
      for (let i = 0; i < count; i++) {
        const x = Math.max(25, Math.min(width - ledgeWidth - 25, Math.random() * (width - ledgeWidth)));
        const rand = Math.random();
        let type: Ledge["type"] = "rock";
        let vx = 0;

        if (rand < 0.22) {
          type = "ice";
          vx = (Math.random() - 0.5) * 1.8;
        } else if (rand < 0.4) {
          type = "crumble";
        } else if (rand < 0.55) {
          type = "spring";
        }

        s.ledges.push({
          id: Math.random(),
          x,
          y,
          width: ledgeWidth,
          height: 16,
          type,
          vx,
        });

        // Collectibles on ledges
        if (Math.random() < 0.5) {
          const itemRand = Math.random();
          const itemType = itemRand < 0.5 ? "flag" : itemRand < 0.85 ? "chai" : "crystal";
          s.collectibles.push({
            id: Math.random(),
            x: x + ledgeWidth / 2,
            y: y - 22,
            type: itemType,
            collected: false,
          });
        }
      }

      // Vertical step between ledges (comfortable jump height: 75px - 90px)
      const gap = 76 + Math.random() * 16;
      s.nextLedgeY -= gap;
    }
  };

  const spawnParticles = (x: number, y: number, color: string, count = 10, speedMult = 1) => {
    const s = stateRef.current;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = (Math.random() * 3 + 1) * speedMult;
      s.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 20 + Math.random() * 15,
        color,
        size: Math.random() * 3 + 1.5,
      });
    }
  };

  const jumpClimber = (vx: number, vy: number) => {
    const s = stateRef.current;
    if (s.gameState !== "playing") return;

    // Check if can jump (on ground or has mid-air double jump)
    if (s.climber.isGrounded || s.climber.jumpsLeft > 0) {
      s.climber.vx = vx;
      s.climber.vy = vy;
      s.climber.isGrounded = false;
      s.climber.jumpsLeft--;
      s.climber.facing = vx >= 0 ? 1 : -1;

      // Particle burst
      spawnParticles(
        s.climber.x + s.climber.width / 2,
        s.climber.y + s.climber.height,
        s.climber.jumpsLeft === 1 ? "#f8fafc" : "#38bdf8",
        10
      );
    }
  };

  const startGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const s = stateRef.current;

    s.gameState = "playing";
    s.score = 0;
    s.altitude = BASE_ALTITUDE;
    s.ropesLeft = 3;
    s.cameraY = 0;
    s.shieldTimer = 0;
    s.particles = [];
    s.collectibles = [];

    // Starting base ledge near bottom of canvas
    const startLedgeY = canvas.height - 55;
    s.ledges = [
      {
        id: 1,
        x: canvas.width / 2 - 120,
        y: startLedgeY,
        width: 240,
        height: 20,
        type: "rock",
      },
    ];

    s.summitY = -6200; // ~65 ledges to summit
    s.nextLedgeY = startLedgeY - 80;
    generateLedgesUpTo(startLedgeY - 1200);

    // Position player safely on the starting ledge
    s.climber = {
      x: canvas.width / 2 - 15,
      y: startLedgeY - 44,
      vx: 0,
      vy: 0,
      width: 30,
      height: 44,
      isGrounded: true,
      jumpsLeft: 2,
      facing: 1,
      lastStableX: canvas.width / 2 - 15,
      lastStableY: startLedgeY - 44,
    };

    setGameState("playing");
    setScore(0);
    setAltitude(BASE_ALTITUDE);
    setRopesLeft(3);
  };

  const handleCopyVoucher = () => {
    navigator.clipboard.writeText(VOUCHER_CODE);
    setCopied(true);
    toast.success(`Copied ₹500 voucher code: ${VOUCHER_CODE}`);
    setTimeout(() => setCopied(false), 3000);
  };

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const s = stateRef.current;
      if (s.gameState !== "playing") return;

      if (e.code === "ArrowLeft" || e.code === "KeyA") {
        e.preventDefault();
        jumpClimber(-5.8, -13.8);
      } else if (e.code === "ArrowRight" || e.code === "KeyD") {
        e.preventDefault();
        jumpClimber(5.8, -13.8);
      } else if (e.code === "ArrowUp" || e.code === "KeyW" || e.code === "Space") {
        e.preventDefault();
        jumpClimber(0, -14.2);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Main canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      if (!containerRef.current || !canvas) return;
      canvas.width = containerRef.current.clientWidth || 800;
      canvas.height = 440;
    };
    resize();
    window.addEventListener("resize", resize);

    const s = stateRef.current;
    s.snowflakes = Array.from({ length: 65 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.2 + 0.8,
      speed: Math.random() * 1.4 + 0.8,
      drift: Math.random() * 0.8 - 0.4,
    }));

    const loop = (time: number) => {
      s.animId = requestAnimationFrame(loop);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // --- 1. Background Sky Atmosphere based on Altitude ---
      const altRatio = Math.min(1, Math.max(0, (s.altitude - BASE_ALTITUDE) / (SUMMIT_ALTITUDE - BASE_ALTITUDE)));
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      if (altRatio < 0.4) {
        grad.addColorStop(0, "#08101e");
        grad.addColorStop(0.5, "#0f1d33");
        grad.addColorStop(1, "#182a47");
      } else if (altRatio < 0.75) {
        grad.addColorStop(0, "#0b1526");
        grad.addColorStop(0.5, "#1e293b");
        grad.addColorStop(1, "#334155");
      } else {
        // High summit golden sunrise
        grad.addColorStop(0, "#1e1b4b");
        grad.addColorStop(0.3, "#431407");
        grad.addColorStop(0.7, "#7c2d12");
        grad.addColorStop(1, "#f59e0b");
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Parallax mountain silhouettes
      const mountainY = canvas.height * 0.75;
      ctx.fillStyle = altRatio > 0.7 ? "rgba(124, 45, 18, 0.4)" : "rgba(15, 23, 42, 0.55)";
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      for (let i = 0; i <= canvas.width + 120; i += 120) {
        const h = Math.sin((i + s.cameraY * 0.08) * 0.015) * 80 + 100;
        ctx.lineTo(i, mountainY - h);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fill();

      // Atmospheric falling snowflakes
      ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
      for (const flake of s.snowflakes) {
        flake.y += flake.speed;
        flake.x += flake.drift;
        if (flake.y > canvas.height) flake.y = -5;
        if (flake.x > canvas.width) flake.x = 0;
        if (flake.x < 0) flake.x = canvas.width;

        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- 2. Physics & Camera Updates ---
      if (s.gameState === "playing") {
        const c = s.climber;

        // Apply gravity & motion
        c.vy += 0.48;
        c.x += c.vx;
        c.y += c.vy;

        // Horizontal damping
        c.vx *= 0.95;

        // Screen edge wrapping
        if (c.x + c.width < 0) c.x = canvas.width;
        if (c.x > canvas.width) c.x = -c.width;

        // STABLE CAMERA LOGIC:
        // The camera ONLY scrolls up when the climber rises above the middle of the screen (48% height)
        // It NEVER scrolls down during normal jumping, preventing the character from ever being pushed down!
        const screenY = c.y + s.cameraY;
        const targetScreenY = canvas.height * 0.48;
        if (screenY < targetScreenY) {
          const delta = targetScreenY - screenY;
          s.cameraY += delta;
        }

        // Calculate altitude
        const climbedPixels = Math.max(0, (canvas.height - 55 - 44) - c.y);
        const totalHeight = Math.abs(s.summitY);
        const newAlt = Math.min(SUMMIT_ALTITUDE, Math.floor(BASE_ALTITUDE + (climbedPixels / totalHeight) * (SUMMIT_ALTITUDE - BASE_ALTITUDE)));
        s.altitude = newAlt;
        setAltitude(newAlt);

        // Check victory (reached summit platform or 13,549 FT)
        if (newAlt >= SUMMIT_ALTITUDE || c.y <= s.summitY) {
          s.gameState = "victory";
          setGameState("victory");
          spawnParticles(c.x + 15, c.y + 20, "#fbbf24", 50, 3);
          spawnParticles(c.x + 15, c.y + 20, "#38bdf8", 50, 3);
        }

        // Generate ledges ahead as player climbs
        generateLedgesUpTo(c.y - 800);

        // Update moving ledges & crumbling timers
        for (const ledge of s.ledges) {
          if (ledge.vx) {
            ledge.x += ledge.vx;
            if (ledge.x < 15 || ledge.x + ledge.width > canvas.width - 15) {
              ledge.vx = -ledge.vx;
            }
          }
          if (ledge.crumbleTimer !== undefined && ledge.crumbleTimer > 0) {
            ledge.crumbleTimer -= 1;
            if (ledge.crumbleTimer <= 0) {
              ledge.crumbled = true;
              spawnParticles(ledge.x + ledge.width / 2, ledge.y + 8, "#94a3b8", 12);
            }
          }
        }

        // Ledge Collision Detection (only when falling downwards)
        if (c.vy > 0) {
          for (const ledge of s.ledges) {
            if (ledge.crumbled) continue;

            const feet = c.y + c.height;
            const prevFeet = feet - c.vy;

            // Generous landing collision box
            if (
              c.x + c.width > ledge.x &&
              c.x < ledge.x + ledge.width &&
              prevFeet <= ledge.y + 12 &&
              feet >= ledge.y - 4
            ) {
              // Landed on ledge!
              c.y = ledge.y - c.height;
              c.vy = 0;
              c.vx = 0;
              c.isGrounded = true;
              c.jumpsLeft = 2; // Reset double-jump!
              c.lastStableX = c.x;
              c.lastStableY = c.y;

              // Special ledge types
              if (ledge.type === "spring") {
                c.vy = -18.5; // Super spring bounce!
                c.isGrounded = false;
                spawnParticles(c.x + 15, c.y + 44, "#fbbf24", 18, 2);
              } else if (ledge.type === "crumble" && ledge.crumbleTimer === undefined) {
                ledge.crumbleTimer = 55; // 55 frames before crumbling
              }
              break;
            }
          }
        }

        // Collectibles collection
        for (const item of s.collectibles) {
          if (item.collected) continue;
          const dist = Math.hypot(c.x + 15 - item.x, c.y + 22 - item.y);
          if (dist < 34) {
            item.collected = true;
            let pts = 150;
            let col = "#f59e0b";
            if (item.type === "chai") {
              pts = 300;
              col = "#ea580c";
              s.shieldTimer = 180;
            } else if (item.type === "crystal") {
              pts = 500;
              col = "#06b6d4";
            }
            s.score += pts;
            setScore(s.score);
            if (s.score > highScore) {
              setHighScore(s.score);
              localStorage.setItem("kailasa_climber_highscore", s.score.toString());
            }
            spawnParticles(item.x, item.y, col, 14);
          }
        }

        // Check if player fell below visible bottom of the canvas
        if (c.y + s.cameraY > canvas.height + 40) {
          if (s.ropesLeft > 1) {
            // Safety Rope Rescue: Pull back up to last stable foothold!
            s.ropesLeft -= 1;
            setRopesLeft(s.ropesLeft);

            c.x = c.lastStableX;
            c.y = c.lastStableY;
            c.vx = 0;
            c.vy = 0;
            c.isGrounded = true;
            c.jumpsLeft = 2;

            // Recenter camera smoothly around the rescue position
            s.cameraY = Math.max(0, canvas.height * 0.55 - c.y);
            spawnParticles(c.x + 15, c.y + 22, "#10b981", 24, 2);
          } else {
            // Out of safety ropes -> Game Over
            s.gameState = "gameover";
            setGameState("gameover");
          }
        }

        if (s.shieldTimer > 0) s.shieldTimer--;
      }

      // --- 3. Render World with Camera Transform ---
      ctx.save();
      ctx.translate(0, s.cameraY);

      // Draw Ledges
      for (const ledge of s.ledges) {
        if (ledge.crumbled) continue;

        // Skip ledges off-screen
        const screenTop = ledge.y + s.cameraY;
        if (screenTop < -30 || screenTop > canvas.height + 30) continue;

        let baseColor = "#334155";
        let snowColor = "#e2e8f0";

        if (ledge.type === "ice") {
          baseColor = "#0284c7";
          snowColor = "#bae6fd";
        } else if (ledge.type === "spring") {
          baseColor = "#d97706";
          snowColor = "#fef08a";
        } else if (ledge.type === "crumble") {
          baseColor = ledge.crumbleTimer ? "#b91c1c" : "#78716c";
          snowColor = "#fca5a5";
        } else if (ledge.type === "summit") {
          baseColor = "#b45309";
          snowColor = "#fde047";
        }

        // Ledge Body
        ctx.fillStyle = baseColor;
        ctx.beginPath();
        ctx.roundRect(ledge.x, ledge.y + 4, ledge.width, ledge.height - 4, 6);
        ctx.fill();

        // Snowy Cap
        ctx.fillStyle = snowColor;
        ctx.beginPath();
        ctx.roundRect(ledge.x - 2, ledge.y, ledge.width + 4, 6, 3);
        ctx.fill();

        // Trampoline Spring coils
        if (ledge.type === "spring") {
          ctx.strokeStyle = "#fbbf24";
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(ledge.x + ledge.width / 2 - 12, ledge.y + 3);
          ctx.lineTo(ledge.x + ledge.width / 2 + 12, ledge.y + 3);
          ctx.stroke();
        }

        // Grand Summit Shrine cairn
        if (ledge.type === "summit") {
          ctx.fillStyle = "#f59e0b";
          ctx.beginPath();
          ctx.moveTo(ledge.x + ledge.width / 2 - 20, ledge.y);
          ctx.lineTo(ledge.x + ledge.width / 2, ledge.y - 28);
          ctx.lineTo(ledge.x + ledge.width / 2 + 20, ledge.y);
          ctx.closePath();
          ctx.fill();
        }
      }

      // Draw Collectibles
      for (const item of s.collectibles) {
        if (item.collected) continue;
        const screenTop = item.y + s.cameraY;
        if (screenTop < -30 || screenTop > canvas.height + 30) continue;

        const floatBob = Math.sin(time * 0.005 + item.id) * 3;
        const iy = item.y + floatBob;

        if (item.type === "flag") {
          // Tibetan Prayer Flag
          ctx.strokeStyle = "#94a3b8";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(item.x - 8, iy + 14);
          ctx.lineTo(item.x - 8, iy - 6);
          ctx.stroke();

          ctx.fillStyle = "#ef4444";
          ctx.beginPath();
          ctx.moveTo(item.x - 8, iy - 6);
          ctx.lineTo(item.x + 8, iy - 1);
          ctx.lineTo(item.x - 8, iy + 4);
          ctx.closePath();
          ctx.fill();
        } else if (item.type === "chai") {
          // Hot Pahadi Chai Cup
          ctx.fillStyle = "#ea580c";
          ctx.beginPath();
          ctx.roundRect(item.x - 7, iy - 4, 14, 12, 3);
          ctx.fill();

          ctx.strokeStyle = "rgba(255, 255, 255, 0.75)";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(item.x - 2, iy - 6);
          ctx.lineTo(item.x - 3, iy - 10);
          ctx.stroke();
        } else if (item.type === "crystal") {
          // Himalayan Quartz
          ctx.fillStyle = "#38bdf8";
          ctx.beginPath();
          ctx.moveTo(item.x, iy - 8);
          ctx.lineTo(item.x + 7, iy);
          ctx.lineTo(item.x, iy + 8);
          ctx.lineTo(item.x - 7, iy);
          ctx.closePath();
          ctx.fill();
        }
      }

      // Draw Climber
      const c = s.climber;

      // Aiming Trajectory Line
      if (s.aiming && (c.isGrounded || c.jumpsLeft > 0)) {
        ctx.strokeStyle = "rgba(251, 191, 36, 0.9)";
        ctx.lineWidth = 2.5;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        const startX = c.x + c.width / 2;
        const startY = c.y + 14;
        ctx.moveTo(startX, startY);

        let simX = startX;
        let simY = startY;
        let simVx = Math.cos(s.aimAngle) * s.aimPower;
        let simVy = Math.sin(s.aimAngle) * s.aimPower;
        for (let step = 0; step < 16; step++) {
          simX += simVx;
          simY += simVy;
          simVy += 0.48;
          ctx.lineTo(simX, simY);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Shield Bubble
      if (s.shieldTimer > 0) {
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(c.x + c.width / 2, c.y + c.height / 2, 28, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Parka Jacket (Vibrant Expedition Red)
      ctx.fillStyle = "#e11d48";
      ctx.beginPath();
      ctx.roundRect(c.x + 4, c.y + 12, 22, 20, 5);
      ctx.fill();

      // Backpack
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(c.facing === 1 ? c.x : c.x + 20, c.y + 14, 8, 16);

      // Climber Head & Warm Beanie
      ctx.fillStyle = "#f59e0b";
      ctx.beginPath();
      ctx.arc(c.x + 15, c.y + 8, 7.5, 0, Math.PI * 2);
      ctx.fill();

      // Face
      ctx.fillStyle = "#fed7aa";
      ctx.beginPath();
      ctx.arc(c.facing === 1 ? c.x + 17 : c.x + 13, c.y + 9, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Ice Axe
      ctx.strokeStyle = "#cbd5e1";
      ctx.lineWidth = 2;
      ctx.beginPath();
      const handX = c.facing === 1 ? c.x + 24 : c.x + 6;
      ctx.moveTo(handX, c.y + 18);
      ctx.lineTo(handX + c.facing * 8, c.y + 9);
      ctx.stroke();
      ctx.fillStyle = "#64748b";
      ctx.fillRect(handX + c.facing * 6, c.y + 7, 5 * c.facing, 3);

      // Boots
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(c.x + 6, c.y + 32, 7, 12);
      ctx.fillRect(c.x + 17, c.y + 32, 7, 12);

      // Particles
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const p = s.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        const alpha = Math.max(0, 1 - p.life / p.maxLife);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        if (p.life >= p.maxLife) {
          s.particles.splice(i, 1);
        }
      }

      ctx.restore();
    };

    s.animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(s.animId);
      window.removeEventListener("resize", resize);
    };
  }, [highScore]);

  // Pointer Aim & Jump Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const s = stateRef.current;
    if (s.gameState !== "playing") return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const climberScreenX = s.climber.x + s.climber.width / 2;
    const climberScreenY = s.climber.y + s.cameraY + 14;

    const dx = clickX - climberScreenX;
    const dy = clickY - climberScreenY;

    // Upward angle constraint
    s.aiming = true;
    s.aimAngle = Math.atan2(dy, dx);
    s.aimPower = Math.min(16, Math.max(10, Math.hypot(dx, dy) * 0.08 + 10));
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const s = stateRef.current;
    if (!s.aiming) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const climberScreenX = s.climber.x + s.climber.width / 2;
    const climberScreenY = s.climber.y + s.cameraY + 14;

    const dx = clickX - climberScreenX;
    const dy = clickY - climberScreenY;

    s.aimAngle = Math.atan2(dy, dx);
    s.aimPower = Math.min(16, Math.max(10, Math.hypot(dx, dy) * 0.08 + 10));
  };

  const handlePointerUp = () => {
    const s = stateRef.current;
    if (!s.aiming) return;
    s.aiming = false;

    // Compute jump velocity components from aim
    const vx = Math.cos(s.aimAngle) * s.aimPower;
    // Ensure jump is directed upward
    const vy = Math.min(-10, Math.sin(s.aimAngle) * s.aimPower);
    jumpClimber(vx, vy);
  };

  return (
    <div className="w-full text-white" ref={containerRef}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-xs font-semibold text-amber-300 uppercase tracking-widest mb-3">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            Interactive Vertical Alpine Climber · Win ₹500 Voucher
          </div>
          <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Summit Climber: The 13,549 FT Ascent
          </h3>
          <p className="text-base text-white/60 mt-2 max-w-xl">
            Scale the sheer rock face to the sacred summit! Click & drag to aim your ice-axe leap, or use <strong className="text-amber-400">A / D / W / Space</strong> (Double-Jump enabled!). Collect sacred prayer flags & hot Pahadi chai mugs to claim your <strong className="text-emerald-400">₹500 booking voucher</strong>!
          </p>
        </div>

        {/* Telemetry HUD */}
        <div className="flex items-center gap-4 bg-slate-950/80 border border-white/10 px-5 py-3 rounded-2xl backdrop-blur-md">
          <div>
            <p className="text-[10px] text-white/50 uppercase font-semibold">Altitude</p>
            <p className="text-lg font-extrabold text-cyan-300 font-mono">
              {altitude.toLocaleString()} FT
            </p>
          </div>
          <div className="h-8 w-[1px] bg-white/10" />
          <div>
            <p className="text-[10px] text-white/50 uppercase font-semibold">Score</p>
            <p className="text-lg font-extrabold text-amber-400 font-mono">{score}</p>
          </div>
          <div className="h-8 w-[1px] bg-white/10" />
          <div>
            <p className="text-[10px] text-white/50 uppercase font-semibold">Safety Ropes</p>
            <p className="text-sm font-extrabold text-emerald-400 flex items-center gap-1">
              {Array.from({ length: ropesLeft }).map((_, i) => (
                <Shield key={i} className="w-4 h-4 fill-emerald-400 text-emerald-400" />
              ))}
              {ropesLeft === 0 && <span className="text-xs text-red-400">0 Left</span>}
            </p>
          </div>
        </div>
      </div>

      {/* Main Game Stage */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-white/15 shadow-2xl bg-slate-950 group">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="w-full block cursor-crosshair select-none touch-none"
        />

        {/* In-Game Controls Hint Overlay */}
        {gameState === "playing" && (
          <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-3 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-white/80 border border-white/10">
            <span className="flex items-center gap-1 text-amber-300">
              <ArrowLeft className="w-3.5 h-3.5" /> <ArrowUp className="w-3.5 h-3.5" /> <ArrowRight className="w-3.5 h-3.5" /> A / D / Space or Click & Drag to Aim (Double Jump Active!)
            </span>
          </div>
        )}

        {/* Start Game Screen */}
        {gameState === "idle" && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-in fade-in">
            <div className="p-4 rounded-3xl bg-amber-400/20 border border-amber-400/30 text-amber-300 mb-4 shadow-xl">
              <Mountain className="w-12 h-12" />
            </div>
            <h4 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
              Ascend to 13,549 FT & Win ₹500
            </h4>
            <p className="text-sm text-white/70 max-w-md mb-6 leading-relaxed">
              Launch your carabiner hook, balance across ice shelves and bouncy snow banks, and conquer the sacred summit to claim an exclusive <strong className="text-emerald-400">₹500 trek voucher</strong>!
            </p>
            <Button
              size="lg"
              onClick={startGame}
              className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-500 hover:to-orange-600 text-black font-extrabold text-base px-9 py-6 rounded-2xl shadow-2xl shadow-amber-500/30 transition-transform hover:scale-105"
            >
              <Play className="w-5 h-5 fill-current mr-2" /> Start Ascent Now
            </Button>
          </div>
        )}

        {/* Game Over Screen */}
        {gameState === "gameover" && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95 duration-200">
            <div className="p-3 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 mb-3">
              <RotateCcw className="w-8 h-8 animate-spin" style={{ animationDuration: "8s" }} />
            </div>
            <h4 className="text-3xl font-extrabold text-white mb-1">Out of Safety Ropes!</h4>
            <p className="text-sm text-white/70 mb-5">
              You climbed to <strong className="text-cyan-300 font-mono">{altitude.toLocaleString()} FT</strong> with a score of <strong className="text-amber-400 font-mono">{score}</strong>. The summit awaits your return!
            </p>
            <Button
              size="lg"
              onClick={startGame}
              className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-black font-bold px-8 py-5 rounded-2xl shadow-lg"
            >
              <RotateCcw className="w-4 h-4 mr-2" /> Try Again
            </Button>
          </div>
        )}

        {/* Victory Screen - 13,549 FT Reached - ₹500 Voucher */}
        {gameState === "victory" && (
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95 duration-300">
            <div className="p-4 rounded-3xl bg-amber-400/20 border border-amber-400/40 text-amber-300 mb-3 shadow-2xl animate-bounce">
              <Award className="w-12 h-12" />
            </div>
            <h4 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
              13,549 FT SUMMIT CONQUERED! 🏔️
            </h4>
            <p className="text-sm text-white/80 max-w-lg mb-4">
              Master mountaineer! You reached the sacred crest with a score of <strong className="text-amber-400 font-mono">{score}</strong>! Here is your official <strong className="text-emerald-400">₹{VOUCHER_VALUE} OFF</strong> expedition voucher:
            </p>

            {/* Voucher Card */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-950 border-2 border-amber-400/40 rounded-2xl p-4 sm:px-6 mb-6 flex items-center justify-between gap-4 max-w-md w-full shadow-2xl">
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Trek Voucher Value</span>
                <p className="text-2xl font-black text-white">₹{VOUCHER_VALUE} OFF</p>
                <p className="text-xs text-white/50 font-mono mt-0.5">Code: <strong className="text-cyan-300">{VOUCHER_CODE}</strong></p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyVoucher}
                className="border-amber-400/40 text-amber-300 hover:bg-amber-400/20"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400 mr-1.5" /> : <Copy className="w-4 h-4 mr-1.5" />}
                {copied ? "Copied!" : "Copy Code"}
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                onClick={() => {
                  const url = `https://wa.me/919440650253?text=${encodeURIComponent(
                    `Hi Kailasa Trails! I just conquered the 13,549 FT Summit Climber game on your website with a score of ${score}! I want to redeem my ₹${VOUCHER_VALUE} voucher (${VOUCHER_CODE}) for my next trek booking!`
                  )}`;
                  window.open(url, "_blank", "noopener,noreferrer");
                }}
                className="bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-black font-extrabold px-8 py-5 rounded-2xl shadow-xl shadow-emerald-500/20"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Claim ₹{VOUCHER_VALUE} Voucher on WhatsApp →
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={startGame}
                className="border-white/30 text-white hover:bg-white/10 px-6 py-5 rounded-2xl"
              >
                Play Again
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
