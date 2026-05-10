"use client";

import { motion } from "framer-motion";

export default function IndiaMapSVG() {
  return (
    <div className="relative w-full max-w-xs mx-auto opacity-20 pointer-events-none select-none">
      <motion.svg
        viewBox="0 0 400 450"
        className="w-full"
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        {/* Simplified India outline */}
        <path
          d="M180 20 L200 15 L220 22 L240 30 L260 50 L275 70 L280 90 L285 110 L290 130 L295 155 L300 175 L305 195 L310 215 L305 235 L295 255 L280 270 L270 290 L260 310 L245 330 L225 345 L210 360 L200 375 L190 360 L175 345 L160 330 L145 315 L130 295 L115 275 L105 255 L100 235 L98 215 L100 195 L105 175 L110 155 L115 130 L118 110 L120 90 L125 70 L140 50 L160 35 Z"
          fill="none"
          stroke="url(#indiaGrad)"
          strokeWidth="2"
        />
        {/* Decorative data points */}
        {[
          [200, 100], [160, 150], [240, 130], [200, 200],
          [170, 250], [230, 240], [195, 310],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r={3}
            fill="#7c3aed"
            animate={{ r: [2, 5, 2], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
        {/* Connection lines */}
        <motion.line x1="200" y1="100" x2="160" y2="150" stroke="#7c3aed" strokeWidth="0.5" opacity="0.4" />
        <motion.line x1="200" y1="100" x2="240" y2="130" stroke="#7c3aed" strokeWidth="0.5" opacity="0.4" />
        <motion.line x1="200" y1="200" x2="170" y2="250" stroke="#7c3aed" strokeWidth="0.5" opacity="0.4" />
        <motion.line x1="200" y1="200" x2="230" y2="240" stroke="#7c3aed" strokeWidth="0.5" opacity="0.4" />
        <motion.line x1="200" y1="200" x2="195" y2="310" stroke="#7c3aed" strokeWidth="0.5" opacity="0.4" />

        <defs>
          <linearGradient id="indiaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF9933" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#138808" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
}
