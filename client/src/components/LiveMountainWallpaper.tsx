import React, { useEffect, useRef } from "react";

interface LiveMountainWallpaperProps {
  className?: string;
  showParallax?: boolean;
}

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  density: number;
  depth: number; // 0 = background (far, tiny), 1 = midground, 2 = foreground (large, fast)
  speedY: number;
  speedX: number;
  opacity: number;
  swaySpeed: number;
  swayDist: number;
  phase: number;
  spin: number;
  spinSpeed: number;
}

interface IceSparkle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export default function LiveMountainWallpaper({
  className = "",
  showParallax = true,
}: LiveMountainWallpaperProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, vx: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 750);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    let lastMouseX = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / width - 0.5;
      const y = (e.clientY - rect.top) / height - 0.5;
      mouseRef.current.targetX = x * 35;
      mouseRef.current.targetY = y * 25;
      mouseRef.current.vx = (e.clientX - lastMouseX) * 0.05;
      lastMouseX = e.clientX;
    };

    if (showParallax) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    // 1. Multi-layered 3D Snowflakes
    // 35 foreground large snowflakes, 85 midground snowflakes, 140 fine powder flakes
    const totalFlakes = 260;
    const flakes: Snowflake[] = Array.from({ length: totalFlakes }).map((_, i) => {
      let depth = 0; // 0 = fine powder, 1 = midground, 2 = foreground
      if (i < 35) depth = 2;
      else if (i < 120) depth = 1;
      else depth = 0;

      let radius = 1;
      let speedY = 1;
      let opacity = 0.8;

      if (depth === 2) {
        radius = Math.random() * 2.5 + 3.2; // 3.2px - 5.7px
        speedY = Math.random() * 1.8 + 2.2;
        opacity = Math.random() * 0.35 + 0.55;
      } else if (depth === 1) {
        radius = Math.random() * 1.4 + 1.5; // 1.5px - 2.9px
        speedY = Math.random() * 1.2 + 1.2;
        opacity = Math.random() * 0.4 + 0.45;
      } else {
        radius = Math.random() * 0.8 + 0.6; // 0.6px - 1.4px
        speedY = Math.random() * 0.8 + 0.6;
        opacity = Math.random() * 0.3 + 0.25;
      }

      return {
        x: Math.random() * (width + 200) - 100,
        y: Math.random() * height,
        radius,
        density: Math.random() * 20,
        depth,
        speedY,
        speedX: Math.random() * 0.6 + 0.3, // slight natural drift to the right
        opacity,
        swaySpeed: Math.random() * 0.02 + 0.008,
        swayDist: Math.random() * (depth === 2 ? 28 : depth === 1 ? 16 : 8) + 4,
        phase: Math.random() * Math.PI * 2,
        spin: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() - 0.5) * 0.03,
      };
    });

    // 2. Cool Glacial Mist / Blizzard Clouds
    const mistClouds = Array.from({ length: 4 }).map((_, i) => ({
      x: (i / 4) * width,
      y: height * 0.55 + Math.random() * (height * 0.3),
      radiusX: Math.random() * 300 + 260,
      radiusY: Math.random() * 100 + 70,
      speedX: Math.random() * 0.25 + 0.15,
      opacity: Math.random() * 0.08 + 0.05,
    }));

    // 3. Ice Crystal Sparkles (Glinting off snow powder)
    const sparkles: IceSparkle[] = [];
    let lastSparkleTime = 0;

    let then = performance.now();

    const render = (now: number) => {
      const delta = Math.min(now - then, 40);
      then = now;

      // Smooth mouse easing with wind inertia
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;
      mouseRef.current.vx *= 0.92; // dampen wind burst

      ctx.clearRect(0, 0, width, height);

      // --- A. Render Cool Glacial Mist / Drifting Mountain Fog ---
      ctx.save();
      ctx.translate(mouseRef.current.x * 0.2, mouseRef.current.y * 0.15);
      mistClouds.forEach((c) => {
        c.x += c.speedX;
        if (c.x - c.radiusX > width) {
          c.x = -c.radiusX;
        }

        const mistGrad = ctx.createRadialGradient(
          c.x,
          c.y,
          0,
          c.x,
          c.y,
          c.radiusX
        );
        // Cool icy slate-cyan tone
        mistGrad.addColorStop(0, `rgba(186, 230, 253, ${c.opacity})`);
        mistGrad.addColorStop(0.5, `rgba(147, 197, 253, ${c.opacity * 0.5})`);
        mistGrad.addColorStop(1, "rgba(200, 225, 255, 0)");

        ctx.beginPath();
        ctx.ellipse(c.x, c.y, c.radiusX, c.radiusY, 0, 0, Math.PI * 2);
        ctx.fillStyle = mistGrad;
        ctx.fill();
      });
      ctx.restore();

      // --- B. Periodically Spawn Diamond Ice Glints ---
      if (now - lastSparkleTime > 350) {
        lastSparkleTime = now;
        if (sparkles.length < 15) {
          sparkles.push({
            x: Math.random() * width,
            y: Math.random() * height * 0.8,
            size: Math.random() * 2.5 + 1.5,
            opacity: 1,
            life: 0,
            maxLife: Math.random() * 30 + 20,
          });
        }
      }

      // Render sparkles
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.life++;
        const progress = s.life / s.maxLife;
        const alpha = Math.sin(progress * Math.PI) * 0.85;

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.beginPath();
        ctx.arc(0, 0, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(224, 242, 254, ${alpha})`;
        ctx.shadowColor = "rgba(186, 230, 253, 0.9)";
        ctx.shadowBlur = s.size * 3;
        ctx.fill();

        // 4-point cross glint
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-s.size * 2, 0);
        ctx.lineTo(s.size * 2, 0);
        ctx.moveTo(0, -s.size * 2);
        ctx.lineTo(0, s.size * 2);
        ctx.stroke();

        ctx.restore();

        if (s.life >= s.maxLife) {
          sparkles.splice(i, 1);
        }
      }

      // --- C. Render 3D Snowflakes with Wind Flurry Physics ---
      const windGust = mouseRef.current.vx * 0.8;

      flakes.forEach((f) => {
        f.phase += f.swaySpeed;
        f.spin += f.spinSpeed;

        // Depth parallax factor
        const parallaxFactor = f.depth === 2 ? 0.9 : f.depth === 1 ? 0.5 : 0.2;
        const currentX =
          f.x +
          Math.sin(f.phase) * f.swayDist +
          mouseRef.current.x * parallaxFactor;
        const currentY = f.y + mouseRef.current.y * parallaxFactor;

        // Fall down and drift with wind
        f.y += f.speedY * (delta / 16);
        f.x += (f.speedX + windGust) * (delta / 16);

        // Wrap around vertically
        if (f.y > height + 20) {
          f.y = -20;
          f.x = Math.random() * (width + 100) - 50;
        }

        // Wrap around horizontally
        if (f.x > width + 60) {
          f.x = -40;
        } else if (f.x < -60) {
          f.x = width + 40;
        }

        // Render snowflake based on depth
        ctx.save();
        ctx.translate(currentX, currentY);

        if (f.depth === 2) {
          // Foreground: Large, soft, slightly blurred snowflake (bokeh camera look)
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, f.radius);
          grad.addColorStop(0, `rgba(255, 255, 255, ${f.opacity * 0.95})`);
          grad.addColorStop(0.5, `rgba(224, 242, 254, ${f.opacity * 0.7})`);
          grad.addColorStop(1, "rgba(200, 230, 255, 0)");

          ctx.beginPath();
          ctx.arc(0, 0, f.radius, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        } else if (f.depth === 1) {
          // Midground: Crisp crystalline snow flake
          ctx.beginPath();
          ctx.arc(0, 0, f.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(240, 249, 255, ${f.opacity})`;
          ctx.shadowColor = "rgba(186, 230, 253, 0.6)";
          ctx.shadowBlur = f.radius * 2;
          ctx.fill();
        } else {
          // Background: Fine cold powder snow flurry
          ctx.beginPath();
          ctx.arc(0, 0, f.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(224, 242, 254, ${f.opacity * 0.85})`;
          ctx.fill();
        }

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      if (showParallax) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [showParallax]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{
          filter: "drop-shadow(0 0 10px rgba(186, 230, 253, 0.25))",
        }}
      />
      {/* Cool Glacial Vignette Overlay for Authentic Chilly Mountain Mood */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-950/20 via-transparent to-slate-950/70 pointer-events-none" />
    </div>
  );
}
