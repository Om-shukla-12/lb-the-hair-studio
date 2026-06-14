"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

// Individual hair strand that drops after being cut
function HairStrand({
  x,
  color,
  delay,
  height,
}: {
  x: number;
  color: string;
  delay: number;
  height: number;
}) {
  return (
    <motion.line
      x1={x}
      y1={0}
      x2={x}
      y2={height}
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      initial={{ pathLength: 1, opacity: 1, y: 0 }}
      animate={{ y: [0, 0, 60], opacity: [1, 1, 0] }}
      transition={{ duration: 0.5, delay, ease: "easeIn" }}
    />
  );
}

const STRAND_COLORS = [
  "#2C1810", "#4A2C1A", "#6B3A2A", "#111111",
  "#3D2B1F", "#8B5E3C", "#1A0A05", "#5C3317",
];

const TOTAL_STRANDS = 16;
const SCENE_WIDTH = 132;
const SCENE_HEIGHT = 54;
const HAIR_TOP = 18; // y position of scissor cut line

// Generate strand positions spread evenly — use deterministic heights (no Math.random → no SSR mismatch)
const STRANDS = Array.from({ length: TOTAL_STRANDS }, (_, i) => ({
  x: 10 + (i * (SCENE_WIDTH - 20)) / (TOTAL_STRANDS - 1),
  color: STRAND_COLORS[i % STRAND_COLORS.length],
  // Deterministic pseudo-random height variation based on index
  fullHeight: HAIR_TOP + 20 + ((i * 13 + i * i * 3) % 18),
}));

// SVG Scissors component — two blades that open/close
function ScissorsSVG({ progress }: { progress: number }) {
  // progress: 0 = closed, 1 = open, snipping = oscillating
  const bladeAngle = progress * 22; // degrees open

  return (
    <g>
      {/* Pivot point */}
      <circle cx={0} cy={0} r={3} fill="#8B0000" />

      {/* Top blade */}
      <g transform={`rotate(${-bladeAngle})`}>
        {/* Blade body */}
        <path
          d="M 0 0 L 28 -4 L 30 -2 L 2 1 Z"
          fill="#C0C0C0"
          stroke="#888"
          strokeWidth={0.5}
        />
        {/* Handle ring */}
        <circle cx={-8} cy={-6} r={7} fill="none" stroke="#8B0000" strokeWidth={2} />
        <circle cx={-8} cy={-6} r={4} fill="#8B0000" opacity={0.3} />
      </g>

      {/* Bottom blade */}
      <g transform={`rotate(${bladeAngle})`}>
        <path
          d="M 0 0 L 28 4 L 30 2 L 2 -1 Z"
          fill="#D0D0D0"
          stroke="#888"
          strokeWidth={0.5}
        />
        {/* Handle ring */}
        <circle cx={-8} cy={6} r={7} fill="none" stroke="#8B0000" strokeWidth={2} />
        <circle cx={-8} cy={6} r={4} fill="#8B0000" opacity={0.3} />
      </g>

      {/* Shine on blade */}
      <g transform={`rotate(${-bladeAngle * 0.5})`}>
        <line x1={8} y1={-1} x2={22} y2={-2} stroke="white" strokeWidth={0.8} opacity={0.5} />
      </g>
    </g>
  );
}

export default function ScissorsLoader({ message = "Loading..." }: { message?: string }) {
  // Track which strands have been "cut" and are falling
  const [cutStrands, setCutStrands] = useState<Set<number>>(new Set());
  const [scissorX, setScissorX] = useState(-30); // scissor x position (left → right)
  const [bladeOpen, setBladeOpen] = useState(0.5);
  const [cycle, setCycle] = useState(0);

  // Main animation loop
  useEffect(() => {
    let frame: number;
    let startTime: number | null = null;
    const DURATION = 1450; // ms per full left-to-right pass
    const PAUSE = 280; // pause at end before restarting

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) % (DURATION + PAUSE);
      const progress = Math.min(elapsed / DURATION, 1);

      if (progress < 1) {
        // Move scissor from left (-30) to right (SCENE_WIDTH + 30)
        const x = -30 + progress * (SCENE_WIDTH + 60);
        setScissorX(x);

        // Snipping: blade oscillates open/close rapidly
        const snip = Math.sin(timestamp / 62) * 0.5 + 0.5;
        setBladeOpen(snip);

        // Mark strands as cut as scissor passes over them
        setCutStrands((prev) => {
          const next = new Set(prev);
          STRANDS.forEach((s, i) => {
            if (s.x <= x + 5 && !prev.has(i)) {
              next.add(i);
            }
          });
          return next;
        });
      } else {
        // Pause phase — reset for next cycle
        setScissorX(-30);
        setBladeOpen(0.5);
        setCutStrands(new Set());
        setCycle((c) => c + 1);
        startTime = timestamp;
      }

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="flex select-none flex-col items-center justify-center py-4">
      <div className="relative" style={{ width: SCENE_WIDTH, height: SCENE_HEIGHT + 26 }}>
        <svg
          width={SCENE_WIDTH}
          height={SCENE_HEIGHT + 26}
          viewBox={`0 0 ${SCENE_WIDTH} ${SCENE_HEIGHT + 26}`}
          className="overflow-visible"
        >
          {/* ── HAIR STRANDS ── */}
          {STRANDS.map((strand, i) => {
            const isCut = cutStrands.has(i);
            const strandBottom = HAIR_TOP + strand.fullHeight;

            return (
              <g key={`${i}-${cycle}`}>
                {/* Uncut portion above scissors (always visible while scissor hasn't reached) */}
                {!isCut ? (
                  // Full strand — scissor hasn't reached yet
                  <line
                    x1={strand.x}
                    y1={4}
                    x2={strand.x}
                    y2={strandBottom}
                    stroke={strand.color}
                    strokeWidth={1.5}
                    strokeLinecap="round"
                  />
                ) : (
                  <>
                    {/* Top stub — stays in place */}
                    <line
                      x1={strand.x}
                      y1={4}
                      x2={strand.x}
                      y2={HAIR_TOP - 1}
                      stroke={strand.color}
                      strokeWidth={1.5}
                      strokeLinecap="round"
                    />

                    {/* Cut piece — falls down */}
                    <motion.g
                      initial={{ y: 0, opacity: 1, rotate: 0 }}
                      animate={{
                        y: [0, 4, 55],
                        opacity: [1, 1, 0],
                        rotate: [0, i % 2 === 0 ? 12 : -12, i % 2 === 0 ? 25 : -20],
                      }}
                      transition={{
                        duration: 0.55,
                        ease: [0.25, 0.46, 0.45, 0.94],
                        times: [0, 0.3, 1],
                      }}
                      style={{ originX: strand.x, originY: HAIR_TOP }}
                    >
                      <line
                        x1={strand.x}
                        y1={HAIR_TOP}
                        x2={strand.x}
                        y2={strandBottom}
                        stroke={strand.color}
                        strokeWidth={1.5}
                        strokeLinecap="round"
                      />
                    </motion.g>
                  </>
                )}
              </g>
            );
          })}

          {/* ── CUT LINE (guide) ── */}
          <line
            x1={0}
            y1={HAIR_TOP}
            x2={SCENE_WIDTH}
            y2={HAIR_TOP}
            stroke="#8B0000"
            strokeWidth={0.5}
            strokeDasharray="4 4"
            opacity={0.2}
          />

          {/* ── SCISSORS ── */}
          <g transform={`translate(${scissorX}, ${HAIR_TOP})`}>
            <ScissorsSVG progress={bladeOpen} />
          </g>

          {/* ── GLINT on cut line (sparkle where scissor is) ── */}
          {scissorX > 0 && scissorX < SCENE_WIDTH && (
            <motion.circle
              cx={scissorX}
              cy={HAIR_TOP}
              r={2}
              fill="#D4AF37"
              animate={{ opacity: [0.8, 0.2, 0.8], scale: [1, 1.5, 1] }}
              transition={{ duration: 0.15, repeat: Infinity }}
            />
          )}
        </svg>
      </div>

      {/* Message */}
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37]/80">
        {message}
      </p>
    </div>
  );
}
