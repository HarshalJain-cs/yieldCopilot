"use client";

import { type ReactNode, useCallback, useRef, useState } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export function GlassCard({
  children,
  className = "",
  tilt = true,
  glow = true,
  onClick,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
  });
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || !tilt) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      setTiltStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
      });

      if (glow) {
        setGlowPosition({
          x: (x / rect.width) * 100,
          y: (y / rect.height) * 100,
        });
      }
    },
    [tilt, glow],
  );

  const handleMouseLeave = useCallback(() => {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
    });
    setGlowPosition({ x: 50, y: 50 });
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (onClick && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        onClick();
      }
    },
    [onClick],
  );

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onKeyDown={onClick ? handleKeyDown : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`
        relative overflow-hidden
        glass-card-premium
        transition-all duration-300 ease-out
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
      style={tiltStyle}
    >
      {/* Radial glow that follows mouse */}
      {glow && (
        <div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(139, 127, 232, 0.4), transparent 50%)`,
          }}
        />
      )}

      {/* Animated border shimmer on hover */}
      <div
        className="absolute inset-0 rounded-[1.25rem] opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)`,
          backgroundSize: "200% 200%",
          backgroundPosition: `${glowPosition.x}% ${glowPosition.y}%`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />

      {/* Inner highlight line at top */}
      <div
        className="absolute top-0 left-4 right-4 h-px opacity-50 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
