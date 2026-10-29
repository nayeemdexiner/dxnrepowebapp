import React from 'react';

/**
 * AppleGlassCurvedSides
 * Apple iOS-style seamless 4-edge curved glass screen frame:
 * - NO inner square lines or box borders.
 * - Soft 4mm frosted glass blur diffusion ("ঝাপসা") running along the 4 edges.
 * - Middle of the screen is 100% crystal clear.
 * - Smoothly rounded iOS corners and straight edge lines.
 */
export default function AppleGlassCurvedSides() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-40 select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Outer iOS Curved Screen Bezel (Curved corners, straight sides, no inner square borders) */}
      <div className="absolute inset-1.5 sm:inset-2.5 md:inset-3 rounded-[26px] sm:rounded-[36px] md:rounded-[44px] overflow-hidden pointer-events-none border border-white/20 shadow-[0_0_12px_rgba(255,255,255,0.06)]">
        
        {/* ================= TOP 4MM FROSTED GLASS RAIL (NO INNER BORDER LINE) ================= */}
        <div className="absolute top-0 inset-x-0 h-[14px] sm:h-[16px] backdrop-blur-[6px] bg-gradient-to-b from-white/[0.12] via-white/[0.04] to-transparent z-10" />

        {/* ================= BOTTOM 4MM FROSTED GLASS RAIL (NO INNER BORDER LINE) ================= */}
        <div className="absolute bottom-0 inset-x-0 h-[14px] sm:h-[16px] backdrop-blur-[6px] bg-gradient-to-t from-white/[0.12] via-white/[0.04] to-transparent z-10" />

        {/* ================= LEFT 4MM FROSTED GLASS RAIL (NO INNER BORDER LINE) ================= */}
        <div className="absolute left-0 inset-y-0 w-[14px] sm:w-[16px] backdrop-blur-[6px] bg-gradient-to-r from-white/[0.12] via-white/[0.04] to-transparent z-10" />

        {/* ================= RIGHT 4MM FROSTED GLASS RAIL (NO INNER BORDER LINE) ================= */}
        <div className="absolute right-0 inset-y-0 w-[14px] sm:w-[16px] backdrop-blur-[6px] bg-gradient-to-l from-white/[0.12] via-white/[0.04] to-transparent z-10" />
      </div>
    </div>
  );
}
