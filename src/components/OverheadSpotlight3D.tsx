import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Lightbulb, Sparkles, Sliders, Zap } from 'lucide-react';
import { playSound } from '../utils/audio';

interface OverheadSpotlight3DProps {
  className?: string;
  targetRef?: React.RefObject<HTMLDivElement | null>;
}

export default function OverheadSpotlight3D({ className = '', targetRef }: OverheadSpotlight3DProps) {
  const [isOn, setIsOn] = useState(true);
  const [lightColor, setLightColor] = useState<'white' | 'silver' | 'warm'>('white');
  const [beamAngle, setBeamAngle] = useState(0); // slight pendulum sway
  const [intensity, setIntensity] = useState(1); // 0.6 to 1.4

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Colors config - Pure monochrome, studio white & luxury silver
  const colorConfigs = {
    white: {
      core: 'rgba(255, 255, 255, 0.95)',
      beam: 'rgba(240, 246, 255, 0.22)',
      glow: 'rgba(220, 230, 245, 0.35)',
      floor: 'rgba(255, 255, 255, 0.30)',
      mote: '#ffffff',
      label: 'Studio White',
    },
    silver: {
      core: 'rgba(226, 232, 240, 0.95)',
      beam: 'rgba(203, 213, 225, 0.20)',
      glow: 'rgba(148, 163, 184, 0.30)',
      floor: 'rgba(203, 213, 225, 0.25)',
      mote: '#cbd5e1',
      label: 'Pure Silver',
    },
    warm: {
      core: 'rgba(254, 243, 199, 0.95)',
      beam: 'rgba(253, 230, 138, 0.18)',
      glow: 'rgba(245, 158, 11, 0.25)',
      floor: 'rgba(253, 230, 138, 0.25)',
      mote: '#fef08a',
      label: 'Warm Light',
    },
  };

  const currentTheme = colorConfigs[lightColor];

  // Volumetric beam & floating dust motes simulation on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Light beam dust particles
    interface Mote {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      maxAlpha: number;
      life: number;
      maxLife: number;
    }

    const motes: Mote[] = [];
    const maxMotes = 60;

    const spawnMote = (): Mote => {
      const topX = width / 2;
      const progress = Math.random();
      const beamHalfWidth = 40 + progress * (width * 0.38);
      const xOffset = (Math.random() - 0.5) * 2 * beamHalfWidth;

      return {
        x: topX + xOffset,
        y: progress * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: 0.15 + Math.random() * 0.45,
        size: Math.random() * 2 + 0.8,
        alpha: 0,
        maxAlpha: 0.25 + Math.random() * 0.55,
        life: 0,
        maxLife: 180 + Math.random() * 220,
      };
    };

    for (let i = 0; i < maxMotes; i++) {
      const m = spawnMote();
      m.life = Math.random() * m.maxLife;
      motes.push(m);
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      if (!isOn) {
        animId = requestAnimationFrame(render);
        return;
      }

      // Slight organic swaying of the light source
      const swayOffset = Math.sin(time * 0.6) * 18 * intensity;
      const sourceX = width / 2 + swayOffset;
      const sourceY = 0;

      // Draw volumetric light cone
      const coneBottomWidth = Math.min(width * 0.85, 980);
      const bottomLeftX = sourceX - coneBottomWidth / 2;
      const bottomRightX = sourceX + coneBottomWidth / 2;
      const bottomY = height;

      // 1. Volumetric Beam Gradient
      const beamGrad = ctx.createRadialGradient(
        sourceX,
        sourceY,
        10,
        sourceX,
        bottomY * 0.55,
        bottomY * 0.95
      );

      beamGrad.addColorStop(0, currentTheme.core);
      beamGrad.addColorStop(0.12, currentTheme.beam);
      beamGrad.addColorStop(0.45, currentTheme.glow);
      beamGrad.addColorStop(0.85, 'rgba(0, 0, 0, 0)');
      beamGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(sourceX - 35, sourceY);
      ctx.lineTo(sourceX + 35, sourceY);
      ctx.lineTo(bottomRightX, bottomY);
      ctx.lineTo(bottomLeftX, bottomY);
      ctx.closePath();

      ctx.globalAlpha = 0.85 * intensity;
      ctx.fillStyle = beamGrad;
      ctx.fill();
      ctx.restore();

      // 2. Secondary soft atmospheric rays
      for (let r = 0; r < 4; r++) {
        const rayAngle = (r - 1.5) * 0.12 + Math.sin(time + r) * 0.03;
        const rayEndX = sourceX + Math.sin(rayAngle) * height * 1.1;
        const rayEndY = Math.cos(rayAngle) * height;

        const rayGrad = ctx.createLinearGradient(sourceX, sourceY, rayEndX, rayEndY);
        rayGrad.addColorStop(0, currentTheme.core);
        rayGrad.addColorStop(0.3, currentTheme.beam);
        rayGrad.addColorStop(0.9, 'transparent');

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(sourceX - 10, sourceY);
        ctx.lineTo(sourceX + 10, sourceY);
        ctx.lineTo(rayEndX + 45, rayEndY);
        ctx.lineTo(rayEndX - 45, rayEndY);
        ctx.closePath();
        ctx.globalAlpha = 0.25 * intensity;
        ctx.fillStyle = rayGrad;
        ctx.fill();
        ctx.restore();
      }

      // 3. Render illuminated floating dust motes within the cone
      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        m.life += 1;
        m.x += m.vx + Math.sin(time + m.y * 0.01) * 0.2;
        m.y += m.vy;

        const progress = m.life / m.maxLife;
        if (progress < 0.2) {
          m.alpha = (progress / 0.2) * m.maxAlpha;
        } else if (progress > 0.8) {
          m.alpha = ((1 - progress) / 0.2) * m.maxAlpha;
        } else {
          m.alpha = m.maxAlpha;
        }

        if (m.life >= m.maxLife || m.y > height) {
          motes[i] = spawnMote();
          continue;
        }

        ctx.save();
        ctx.globalAlpha = m.alpha * intensity;
        ctx.fillStyle = currentTheme.mote;
        ctx.shadowBlur = 6;
        ctx.shadowColor = currentTheme.mote;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 4. Floor light pool / ground reflection
      const floorGrad = ctx.createRadialGradient(
        sourceX,
        height - 30,
        10,
        sourceX,
        height - 30,
        coneBottomWidth * 0.45
      );
      floorGrad.addColorStop(0, currentTheme.floor);
      floorGrad.addColorStop(0.5, currentTheme.glow);
      floorGrad.addColorStop(1, 'transparent');

      ctx.save();
      ctx.globalAlpha = 0.7 * intensity;
      ctx.fillStyle = floorGrad;
      ctx.beginPath();
      ctx.ellipse(sourceX, height - 30, coneBottomWidth * 0.45, 65, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [isOn, lightColor, intensity]);

  const cycleColor = () => {
    playSound('tab');
    const colors: ('white' | 'silver' | 'warm')[] = ['white', 'silver', 'warm'];
    const nextIdx = (colors.indexOf(lightColor) + 1) % colors.length;
    setLightColor(colors[nextIdx]);
  };

  const togglePower = () => {
    playSound('click');
    setIsOn((prev) => !prev);
  };

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* 1. Overhead Fixture Lamp at Top Center */}
      <div className="pointer-events-auto absolute top-0 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
        {/* Hanging wire */}
        <div className="w-[2px] h-6 sm:h-9 bg-gradient-to-b from-neutral-800 via-neutral-600 to-neutral-400" />

        {/* Industrial Lamp Fixture Cap */}
        <motion.div
          animate={{ scale: isOn ? [1, 1.02, 1] : 1 }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="relative flex flex-col items-center"
        >
          {/* Metal Housing */}
          <div className="w-20 sm:w-28 h-6 sm:h-8 rounded-t-full bg-gradient-to-b from-neutral-700 via-neutral-900 to-black border-t border-neutral-600/50 shadow-2xl flex items-center justify-center">
            <div className="w-12 h-1.5 rounded-full bg-neutral-800 border-b border-neutral-600/60" />
          </div>

          {/* Lamp Emitting Lens Glass */}
          <div
            className={`w-24 sm:w-32 h-4 sm:h-5 rounded-b-2xl transition-all duration-500 flex items-center justify-center ${
              isOn
                ? 'bg-white shadow-[0_10px_40px_rgba(255,255,255,0.95),0_0_70px_rgba(255,255,255,0.8)]'
                : 'bg-neutral-900 border-b border-neutral-800'
            }`}
          >
            {isOn && (
              <div className="w-full h-full rounded-b-2xl bg-gradient-to-b from-white via-neutral-100 to-neutral-300 blur-[1px]" />
            )}
          </div>

          {/* Intense Bulb Core Flare */}
          {isOn && (
            <div className="absolute top-7 left-1/2 -translate-x-1/2 w-48 sm:w-72 h-20 bg-white/20 rounded-full blur-2xl pointer-events-none" />
          )}
        </motion.div>
      </div>

      {/* 2. Interactive Spotlight Controls (Floating Glass Mini-HUD at top right) */}
      <div className="pointer-events-auto absolute top-20 sm:top-24 right-4 sm:right-8 z-30 flex items-center gap-2">
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-black/90 border border-neutral-800 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
          {/* Power Toggle Button */}
          <button
            onClick={togglePower}
            title={isOn ? 'Turn Spotlight Off' : 'Turn Spotlight On'}
            className={`p-2 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
              isOn
                ? 'bg-white/15 text-white border border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.25)]'
                : 'bg-neutral-950 text-neutral-500 hover:text-neutral-300 border border-neutral-800'
            }`}
          >
            <Zap className={`w-3.5 h-3.5 ${isOn ? 'text-white animate-pulse' : 'text-neutral-500'}`} />
            <span className="hidden sm:inline font-semibold">{isOn ? 'LIGHT: ON' : 'LIGHT: OFF'}</span>
          </button>

          {/* Color Switcher */}
          {isOn && (
            <button
              onClick={cycleColor}
              title="Change Spotlight Color & Temperature"
              className="px-2.5 py-1.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700/80 text-[11px] font-mono text-neutral-200 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span
                className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]"
                style={{ backgroundColor: currentTheme.mote }}
              />
              <span className="hidden sm:inline">{currentTheme.label}</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. High Performance 2D Hardware Canvas with Raytracer Light Cone */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 w-full h-full mix-blend-screen"
      />
    </div>
  );
}
