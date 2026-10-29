import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  life: number;
  maxLife: number;
}

export default function MouseGlow() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lastMousePosRef = useRef({ x: 0, y: 0, time: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const monochromeColors = [
      '#ffffff', // Pure white
      '#f8fafc', // Slate 50
      '#e2e8f0', // Slate 200
      '#cbd5e1', // Slate 300
      '#94a3b8', // Slate 400
      '#ffffff', // Crisp white sparkle
    ];

    // Helper: spawn a burst of particles at (x, y)
    const createBurst = (x: number, y: number, count = 16, isClick = false) => {
      const baseSpeed = isClick ? 4.5 : 1.8;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * baseSpeed + (isClick ? 1.5 : 0.4);
        const color = monochromeColors[Math.floor(Math.random() * monochromeColors.length)];
        const maxLife = isClick ? (40 + Math.random() * 30) : (25 + Math.random() * 20);

        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: isClick ? Math.random() * 3.5 + 1.5 : Math.random() * 2.2 + 0.8,
          color,
          alpha: 1,
          decay: 1 / maxLife,
          life: 0,
          maxLife,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const x = e.clientX;
      const y = e.clientY;

      setMousePos({ x, y });
      if (!isVisible) setIsVisible(true);

      const dx = x - lastMousePosRef.current.x;
      const dy = y - lastMousePosRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Spawn trail particles when cursor is moving
      if (dist > 4 && now - lastMousePosRef.current.time > 12) {
        const particleCount = Math.min(Math.floor(dist / 8) + 1, 4);
        createBurst(x, y, particleCount, false);
        lastMousePosRef.current = { x, y, time: now };
      }

      const target = e.target as HTMLElement | null;
      if (target) {
        const clickable = target.closest('button, a, input, textarea, [role="button"], .interactive-element');
        setIsPointer(!!clickable);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicked(true);
      // High-energy particle burst on click!
      createBurst(e.clientX, e.clientY, 24, true);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Render loop for particle trails and bursts
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += 1;
        p.alpha -= p.decay;

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94; // natural air drag
        p.vy *= 0.94;

        if (p.alpha <= 0 || p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        // Draw glowing particle
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 - p.life / (p.maxLife * 1.5)), 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  return (
    <>
      {/* High-speed Hardware Accelerated Particle Burst & Trail Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-50 w-full h-full"
      />

      {/* Large subtle ambient glow */}
      {isVisible && (
        <div
          id="mouse-ambient-glow"
          className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden md:block"
          style={{
            background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.05), transparent 80%)`,
          }}
        />
      )}

      {/* Dynamic Magnetic Outer Ring Follower */}
      {isVisible && (
        <motion.div
          id="custom-cursor-follower"
          className="pointer-events-none fixed z-50 rounded-full hidden md:block shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          animate={{
            x: mousePos.x - (isPointer ? 22 : isClicked ? 14 : 10),
            y: mousePos.y - (isPointer ? 22 : isClicked ? 14 : 10),
            width: isPointer ? 44 : isClicked ? 28 : 20,
            height: isPointer ? 44 : isClicked ? 28 : 20,
            borderColor: isPointer
              ? 'rgba(255, 255, 255, 0.95)'
              : isClicked
              ? 'rgba(255, 255, 255, 1)'
              : 'rgba(255, 255, 255, 0.4)',
            backgroundColor: isPointer
              ? 'rgba(255, 255, 255, 0.15)'
              : isClicked
              ? 'rgba(255, 255, 255, 0.25)'
              : 'transparent',
            scale: isClicked ? 0.85 : 1,
          }}
          transition={{ type: 'spring', damping: 24, stiffness: 380, mass: 0.18 }}
          style={{
            borderWidth: 1.5,
            borderStyle: 'solid',
          }}
        />
      )}

      {/* Tiny bright focal center dot */}
      {isVisible && (
        <div
          className="pointer-events-none fixed z-50 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff] hidden md:block"
          style={{
            transform: `translate3d(${mousePos.x - 3}px, ${mousePos.y - 3}px, 0)`,
          }}
        />
      )}
    </>
  );
}
