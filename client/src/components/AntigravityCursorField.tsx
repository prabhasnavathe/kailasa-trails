import React, { useEffect, useRef } from "react";

interface AntigravityCursorFieldProps {
  className?: string;
  particleCount?: number;
  interactiveRadius?: number;
}

interface SnowflakeParticle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  alpha: number;
  baseAlpha: number;
  depth: number; // 0 = tiny distant powder, 1 = midground, 2 = foreground
  swayPhase: number;
  swaySpeed: number;
  driftSpeedY: number;
}

/**
 * AntigravityCursorField (Small Snow Edition)
 * Renders small, delicate, glowing snowflakes on a dark canvas.
 * Snow particles gracefully float and dynamically swirl/displace away
 * from cursor movements with Antigravity bubble physics.
 */
export default function AntigravityCursorField({
  className = "",
  particleCount = 480,
  interactiveRadius = 160,
}: AntigravityCursorFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Mouse tracking
    const mouse = {
      x: -1000,
      y: -1000,
      prevX: -1000,
      prevY: -1000,
      vx: 0,
      vy: 0,
      speed: 0,
      isHovering: false,
    };

    // Click ripples
    const ripples: Array<{ x: number; y: number; radius: number; maxRadius: number; strength: number }> = [];

    // Create small snowflakes
    let flakes: SnowflakeParticle[] = [];

    const createFlake = (initialY?: number): SnowflakeParticle => {
      // 3 depth tiers: 60% distant fine powder, 30% midground, 10% foreground
      const rand = Math.random();
      let depth = 0;
      let baseRadius = 1.2 + Math.random() * 0.6; // 1.2 - 1.8px
      let baseAlpha = 0.35 + Math.random() * 0.3; // 0.35 - 0.65
      let driftSpeedY = 0.35 + Math.random() * 0.35;

      if (rand > 0.88) {
        depth = 2; // foreground crisp snowflake
        baseRadius = 2.4 + Math.random() * 0.8; // 2.4 - 3.2px
        baseAlpha = 0.85 + Math.random() * 0.15;
        driftSpeedY = 0.7 + Math.random() * 0.45;
      } else if (rand > 0.58) {
        depth = 1; // midground
        baseRadius = 1.8 + Math.random() * 0.6; // 1.8 - 2.4px
        baseAlpha = 0.6 + Math.random() * 0.25;
        driftSpeedY = 0.5 + Math.random() * 0.35;
      }

      const x = Math.random() * width;
      const y = initialY !== undefined ? initialY : Math.random() * height;

      return {
        x,
        y,
        originX: x,
        originY: y,
        vx: 0,
        vy: 0,
        radius: baseRadius,
        baseRadius,
        alpha: baseAlpha,
        baseAlpha,
        depth,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: 0.015 + Math.random() * 0.02,
        driftSpeedY,
      };
    };

    const initFlakes = () => {
      flakes = [];
      for (let i = 0; i < particleCount; i++) {
        flakes.push(createFlake(Math.random() * height));
      }
    };

    initFlakes();

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      initFlakes();
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const curX = e.clientX - rect.left;
      const curY = e.clientY - rect.top;

      const isInside = curX >= -50 && curX <= width + 50 && curY >= -50 && curY <= height + 50;

      if (!isInside) {
        mouse.isHovering = false;
        return;
      }

      if (mouse.prevX !== -1000) {
        mouse.vx = curX - mouse.prevX;
        mouse.vy = curY - mouse.prevY;
        mouse.speed = Math.hypot(mouse.vx, mouse.vy);
      }

      mouse.prevX = curX;
      mouse.prevY = curY;
      mouse.x = curX;
      mouse.y = curY;
      mouse.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovering = false;
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.prevX = -1000;
      mouse.prevY = -1000;
      mouse.vx = 0;
      mouse.vy = 0;
      mouse.speed = 0;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      if (clickX >= 0 && clickX <= width && clickY >= 0 && clickY <= height) {
        ripples.push({
          x: clickX,
          y: clickY,
          radius: 0,
          maxRadius: 260,
          strength: 18,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("click", handleClick);

    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // Damp mouse velocity
      mouse.vx *= 0.88;
      mouse.vy *= 0.88;
      mouse.speed *= 0.88;

      // Update ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.radius += 8;
        rp.strength *= 0.94;
        if (rp.radius > rp.maxRadius || rp.strength < 0.2) {
          ripples.splice(i, 1);
        }
      }

      const fLen = flakes.length;
      const radiusSq = interactiveRadius * interactiveRadius;

      for (let i = 0; i < fLen; i++) {
        const p = flakes[i];

        // 1. Natural snowy falling drift & gentle horizontal sway
        p.swayPhase += p.swaySpeed;
        const swayX = Math.sin(p.swayPhase) * (0.35 + p.depth * 0.25);
        p.x += swayX;
        p.y += p.driftSpeedY;

        // 2. Cursor movement repulsion & fluid swirl
        if (mouse.isHovering) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < radiusSq && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            // Non-linear bubble force (soft edge, strong near cursor)
            const force = (1 - dist / interactiveRadius);
            const forceSq = force * force;

            // Push snow away from cursor
            const nx = dx / dist;
            const ny = dy / dist;
            const repulseMultiplier = 14 * (1 + p.depth * 0.4);
            p.vx += nx * forceSq * repulseMultiplier;
            p.vy += ny * forceSq * repulseMultiplier;

            // Swirl / drag in mouse moving direction
            if (mouse.speed > 0.5) {
              const dragFactor = force * 0.35;
              p.vx += mouse.vx * dragFactor;
              p.vy += mouse.vy * dragFactor;
            }
          }
        }

        // 3. Click shockwave interaction
        for (let rIdx = 0; rIdx < ripples.length; rIdx++) {
          const rp = ripples[rIdx];
          const rdx = p.x - rp.x;
          const rdy = p.y - rp.y;
          const rdist = Math.hypot(rdx, rdy);
          const diff = Math.abs(rdist - rp.radius);
          if (diff < 40 && rdist > 0.1) {
            const rforce = (1 - diff / 40) * rp.strength;
            p.vx += (rdx / rdist) * rforce;
            p.vy += (rdy / rdist) * rforce;
          }
        }

        // 4. Air resistance & velocity damping
        p.vx *= 0.90;
        p.vy *= 0.90;

        p.x += p.vx;
        p.y += p.vy;

        // 5. Wrap around screen edges seamlessly
        if (p.y > height + 10) {
          p.y = -10;
          p.x = Math.random() * width;
          p.vx = 0;
          p.vy = 0;
        } else if (p.y < -20) {
          p.y = height + 5;
        }

        if (p.x > width + 20) {
          p.x = -10;
        } else if (p.x < -20) {
          p.x = width + 10;
        }

        // 6. Visual brightness amplification near disturbance
        const curSpeed = Math.hypot(p.vx, p.vy);
        const disturbance = Math.min(1, curSpeed / 6);
        const dynamicAlpha = Math.min(1, p.baseAlpha + disturbance * 0.4);

        // 7. Draw small circular snow particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (disturbance > 0.25 || p.depth === 2) {
          // Subtle frosty luminescence
          ctx.shadowColor = "rgba(224, 242, 254, 0.85)";
          ctx.shadowBlur = 4 + p.depth * 2;
          ctx.fillStyle = `rgba(255, 255, 255, ${dynamicAlpha})`;
        } else {
          ctx.shadowBlur = 0;
          // Soft alpine white with hint of ice cyan
          ctx.fillStyle = `rgba(240, 249, 255, ${dynamicAlpha})`;
        }

        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animId);
    };
  }, [particleCount, interactiveRadius]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 w-full h-full block ${className}`}
    />
  );
}
