import React, { useEffect, useRef } from 'react';

interface Realistic3DSmokeProps {
  layer?: 'back' | 'front' | 'full';
  direction?: 'left-to-right' | 'right-to-left';
  intensity?: 'light' | 'medium' | 'dense';
  className?: string;
}

interface SmokeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  maxRadius: number;
  growthRate: number;
  opacity: number;
  maxOpacity: number;
  life: number;
  maxLife: number;
  rotation: number;
  vRot: number;
  hueOffset: number;
  zDepth: number; // 0 = back, 1 = front
  puffCount: number;
  puffs: { dx: number; dy: number; r: number; alpha: number }[];
}

export default function Realistic3DSmoke({
  layer = 'full',
  direction = 'left-to-right',
  intensity = 'light',
  className = '',
}: Realistic3DSmokeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse wind interaction
    let mouseX = width / 2;
    let mouseY = height / 2;
    let mouseSpeedX = 0;
    let lastMouseX = mouseX;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      mouseSpeedX = (mouseX - lastMouseX) * 0.05;
      lastMouseX = mouseX;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const particles: SmokeParticle[] = [];
    const maxParticles = intensity === 'light' ? 45 : intensity === 'medium' ? 75 : 110;

    // Create realistic procedural smoke texture generator
    const createPuffCluster = (baseR: number) => {
      const puffs = [];
      const numPuffs = 4 + Math.floor(Math.random() * 4);
      for (let i = 0; i < numPuffs; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * baseR * 0.45;
        puffs.push({
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist,
          r: baseR * (0.55 + Math.random() * 0.5),
          alpha: 0.6 + Math.random() * 0.4,
        });
      }
      return { numPuffs, puffs };
    };

    const spawnParticle = (initialRandomSpread = false): SmokeParticle => {
      const z = layer === 'back' ? Math.random() * 0.45 : layer === 'front' ? 0.55 + Math.random() * 0.45 : Math.random();
      const baseRadius = 35 + Math.random() * 50 + z * 35;
      const { numPuffs, puffs } = createPuffCluster(baseRadius);

      const isLeft = direction === 'left-to-right';
      
      const startX = initialRandomSpread
        ? Math.random() * width
        : isLeft
        ? -baseRadius * 1.5 - Math.random() * 60
        : width + baseRadius * 1.5 + Math.random() * 60;

      const startY = height * 0.2 + Math.random() * (height * 0.75);

      const baseSpeedX = isLeft
        ? 0.45 + Math.random() * 0.75 + (1 - z) * 0.3
        : -(0.45 + Math.random() * 0.75 + (1 - z) * 0.3);

      const baseOpacity = intensity === 'light' ? (0.04 + Math.random() * 0.08) : (0.07 + Math.random() * 0.12);

      return {
        x: startX,
        y: startY,
        vx: baseSpeedX,
        vy: -0.15 - Math.random() * 0.35, // gentle natural rising
        radius: baseRadius * 0.5,
        maxRadius: baseRadius * (2.2 + Math.random() * 1.5),
        growthRate: 0.18 + Math.random() * 0.22,
        opacity: 0,
        maxOpacity: baseOpacity * (layer === 'front' ? 0.85 : 1.1),
        life: initialRandomSpread ? Math.random() * 500 : 0,
        maxLife: 550 + Math.random() * 450,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.003,
        hueOffset: Math.random() * 30 - 15,
        zDepth: z,
        puffCount: numPuffs,
        puffs,
      };
    };

    // Pre-populate with initial spread for immediate realistic ambience
    for (let i = 0; i < maxParticles; i++) {
      particles.push(spawnParticle(true));
    }

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 16.66, 2.5);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Dampen mouse speed
      mouseSpeedX *= 0.95;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life += dt;

        if (p.life >= p.maxLife) {
          particles[i] = spawnParticle(false);
          continue;
        }

        // Fluid organic physics: slow swirling turbulence
        const lifeProgress = p.life / p.maxLife;
        const turbulence = Math.sin(time * 0.001 + p.x * 0.005 + p.y * 0.004) * 0.25;
        const verticalCurl = Math.cos(time * 0.0008 + p.x * 0.003) * 0.2;

        p.x += (p.vx + turbulence + mouseSpeedX * 0.2) * dt;
        p.y += (p.vy + verticalCurl) * dt;
        p.rotation += p.vRot * dt;

        if (p.radius < p.maxRadius) {
          p.radius += p.growthRate * dt;
        }

        // Smooth volumetric opacity curve: Ease In -> Steady -> Long Soft Dissipation
        if (lifeProgress < 0.2) {
          p.opacity = (lifeProgress / 0.2) * p.maxOpacity;
        } else if (lifeProgress < 0.65) {
          p.opacity = p.maxOpacity;
        } else {
          p.opacity = p.maxOpacity * (1 - (lifeProgress - 0.65) / 0.35);
        }

        if (p.opacity <= 0.001) continue;

        // Render multi-puff realistic 3D volumetric smoke cluster
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        for (let j = 0; j < p.puffs.length; j++) {
          const puff = p.puffs[j];
          const puffRadius = p.radius * (puff.r / p.radius);
          const currentAlpha = p.opacity * puff.alpha;

          if (puffRadius <= 1 || currentAlpha <= 0.001) continue;

          const grad = ctx.createRadialGradient(
            puff.dx,
            puff.dy,
            0,
            puff.dx,
            puff.dy,
            puffRadius
          );

          // 3D Lighting tint: Pure realistic white & silver steam scattering fading to velvety black
          if (p.zDepth > 0.5) {
            // Front subtle crisp white/silver smoke
            grad.addColorStop(0, `rgba(255, 255, 255, ${currentAlpha * 0.95})`);
            grad.addColorStop(0.35, `rgba(230, 230, 235, ${currentAlpha * 0.6})`);
            grad.addColorStop(0.7, `rgba(180, 180, 190, ${currentAlpha * 0.25})`);
            grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          } else {
            // Back deeper volumetric atmospheric smoke in pure monochrome
            grad.addColorStop(0, `rgba(240, 240, 245, ${currentAlpha * 0.8})`);
            grad.addColorStop(0.4, `rgba(200, 200, 210, ${currentAlpha * 0.45})`);
            grad.addColorStop(0.75, `rgba(120, 120, 130, ${currentAlpha * 0.18})`);
            grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          }

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(puff.dx, puff.dy, puffRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [layer, direction, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 w-full h-full ${className}`}
    />
  );
}
