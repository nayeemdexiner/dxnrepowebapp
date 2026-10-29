import { useState, useRef, useEffect, useCallback } from 'react';

const CHAMELEON_VIDEO = {
  id: 'chameleon-walking-pingpong',
  localSrc: '/videos/chameleon-pingpong.mp4',
  externalSrc: 'https://assets.mixkit.co/videos/1483/1483-1080.mp4',
  type: 'video/mp4',
};

export default function ForestBackground() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  // isMirrored controls CSS scaleX(-1) so after one pingpong cycle (forward + reverse),
  // it flips horizontally to enter from the right side and walk across, then reverse back!
  const [isMirrored, setIsMirrored] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const lastTapTimeRef = useRef(0);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  // When the video ends (after finishing one complete forward + reverse walking cycle),
  // toggle the mirror state so the chameleon walks in from the opposite (right) side!
  const handleVideoEnded = () => {
    setIsMirrored((prev) => !prev);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  // Screen click/tap handler: chameleon instantly switches to the opposite direction and walks out from the other side
  const handlePointerDown = useCallback((e: PointerEvent) => {
    const target = e.target as HTMLElement | null;
    // Don't interrupt when user is clicking actual buttons, links, or controls
    if (
      target &&
      (target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('[role="button"]') ||
        target.closest('.cursor-pointer'))
    ) {
      return;
    }

    const now = Date.now();
    if (now - lastTapTimeRef.current < 400) return;
    lastTapTimeRef.current = now;

    if (!videoRef.current) return;

    // Switch to the opposite direction and restart from 0s
    setIsMirrored((prev) => !prev);
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => {});
  }, []);

  useEffect(() => {
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [handlePointerDown]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#061209]">
      {/* ================= 1. ATMOSPHERIC JUNGLE BASE ================= */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/50 via-[#040e07] to-[#020603]" />

      {/* ================= 2. REAL 1080P VIVID GREEN CHAMELEON VIDEO (SEAMLESS 4-WAY CYCLE) ================= */}
      {/* Frame stays 100% rock solid and stationary - no shifting, moving or shaking */}
      <div
        className="w-full h-full"
        style={{
          transform: isMirrored ? 'scaleX(-1)' : 'scaleX(1)',
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handleVideoEnded}
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`w-full h-full object-cover object-center filter brightness-[1.05] contrast-[1.04] saturate-[1.25] transition-opacity duration-700 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-40'
          }`}
        >
          <source src={CHAMELEON_VIDEO.localSrc} type={CHAMELEON_VIDEO.type} />
          <source src={CHAMELEON_VIDEO.externalSrc} type={CHAMELEON_VIDEO.type} />
        </video>
      </div>

      {/* ================= 3. SOFT AMBIENCE (KEEPS CHAMELEON BRIGHT ON SIDES) ================= */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/30 pointer-events-none" />
    </div>
  );
}
