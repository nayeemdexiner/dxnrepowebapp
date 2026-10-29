import { useEffect, useRef } from 'react';

interface WorldNetworkCanvasProps {
  className?: string;
  intensity?: 'subtle' | 'vibrant';
  interactive?: boolean;
}

export default function WorldNetworkCanvas({
  className = '',
  intensity = 'subtle',
  interactive = true,
}: WorldNetworkCanvasProps) {
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

    // Network nodes representing major global design hubs connected to Bangladesh (Hajiganj / Dhaka)
    // Normalized coordinates (0 to 1)
    const baseNodes = [
      { x: 0.72, y: 0.46, name: 'Hajiganj (HQ)', isHome: true }, // Bangladesh
      { x: 0.69, y: 0.44, name: 'Dhaka' },
      { x: 0.65, y: 0.45, name: 'Delhi' },
      { x: 0.78, y: 0.52, name: 'Singapore' },
      { x: 0.82, y: 0.40, name: 'Tokyo' },
      { x: 0.52, y: 0.35, name: 'London' },
      { x: 0.54, y: 0.36, name: 'Berlin' },
      { x: 0.59, y: 0.44, name: 'Dubai' },
      { x: 0.28, y: 0.36, name: 'New York' },
      { x: 0.22, y: 0.38, name: 'San Francisco' },
      { x: 0.85, y: 0.75, name: 'Sydney' },
      { x: 0.35, y: 0.68, name: 'Sao Paulo' },
      { x: 0.56, y: 0.62, name: 'Nairobi' },
      { x: 0.75, y: 0.32, name: 'Beijing' },
    ];

    // Background floating particle grid
    const numParticles = width < 768 ? 40 : 85;
    const particles = Array.from({ length: numParticles }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.8 + 0.6,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    // Data pulses traveling along connections
    const pulses: {
      fromIdx: number;
      toIdx: number;
      progress: number;
      speed: number;
      color: string;
    }[] = [];

    // Initialize 6 active pulses in pure white/silver
    for (let i = 0; i < 7; i++) {
      pulses.push({
        fromIdx: 0, // from Hajiganj
        toIdx: Math.floor(Math.random() * (baseNodes.length - 1)) + 1,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.005,
        color: i % 2 === 0 ? '#ffffff' : '#cbd5e1',
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const onMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    if (interactive) {
      window.addEventListener('mousemove', onMouseMove);
    }

    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      angle += 0.004;

      // Draw subtle background grid nodes in monochrome
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * (intensity === 'vibrant' ? 0.4 : 0.2)})`;
        ctx.fill();
      });

      // Connect nearby floating particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const lineAlpha = (1 - dist / 90) * (intensity === 'vibrant' ? 0.2 : 0.08);
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Compute actual pixel locations for world network nodes
      const actualNodes = baseNodes.map((n, idx) => {
        // subtle sinusoidal orbital drift for alive feeling
        const offsetX = Math.sin(angle + idx) * 8;
        const offsetY = Math.cos(angle * 1.2 + idx) * 8;

        let px = n.x * width + offsetX;
        let py = n.y * height + offsetY;

        // Interactive mouse magnetic pull
        if (interactive && mouseX > 0 && mouseY > 0) {
          const mdx = mouseX - px;
          const mdy = mouseY - py;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 180) {
            const pull = (1 - mdist / 180) * 20;
            px += (mdx / mdist) * pull;
            py += (mdy / mdist) * pull;
          }
        }

        return { ...n, px, py };
      });

      const homeNode = actualNodes[0]; // Hajiganj

      // Draw connection lines from Bangladesh HQ to all international nodes
      actualNodes.forEach((node, idx) => {
        if (idx === 0) return;

        // Draw curved arc
        const midX = (homeNode.px + node.px) / 2;
        const midY = (homeNode.py + node.py) / 2 - 35; // Curve upward

        ctx.beginPath();
        ctx.moveTo(homeNode.px, homeNode.py);
        ctx.quadraticCurveTo(midX, midY, node.px, node.py);
        ctx.strokeStyle = intensity === 'vibrant' ? 'rgba(255, 255, 255, 0.20)' : 'rgba(255, 255, 255, 0.10)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Draw active data pulses
      pulses.forEach((pulse) => {
        pulse.progress += pulse.speed;
        if (pulse.progress > 1) {
          pulse.progress = 0;
          pulse.toIdx = Math.floor(Math.random() * (baseNodes.length - 1)) + 1;
        }

        const targetNode = actualNodes[pulse.toIdx];
        if (!targetNode) return;

        const t = pulse.progress;
        const midX = (homeNode.px + targetNode.px) / 2;
        const midY = (homeNode.py + targetNode.py) / 2 - 35;

        // Quadratic bezier position
        const pulseX = (1 - t) * (1 - t) * homeNode.px + 2 * (1 - t) * t * midX + t * t * targetNode.px;
        const pulseY = (1 - t) * (1 - t) * homeNode.py + 2 * (1 - t) * t * midY + t * t * targetNode.py;

        // Glowing pulse head
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = pulse.color;
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw glowing hub nodes in monochrome
      actualNodes.forEach((node) => {
        const isHome = node.isHome;

        // Outer ripple
        if (isHome) {
          const rippleRadius = 14 + Math.sin(angle * 3) * 6;
          ctx.beginPath();
          ctx.arc(node.px, node.py, rippleRadius, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        // Inner solid core
        ctx.beginPath();
        ctx.arc(node.px, node.py, isHome ? 5 : 3, 0, Math.PI * 2);
        ctx.fillStyle = isHome ? '#ffffff' : '#cbd5e1';
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = isHome ? 12 : 5;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label for home hub
        if (isHome) {
          ctx.font = '600 11px "JetBrains Mono", monospace';
          ctx.fillStyle = '#f1f5f9';
          ctx.fillText('HQ: Hajiganj, BD', node.px + 12, node.py + 4);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        window.removeEventListener('mousemove', onMouseMove);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity, interactive]);

  return (
    <canvas
      ref={canvasRef}
      id="world-network-canvas"
      className={`absolute inset-0 pointer-events-none w-full h-full ${className}`}
    />
  );
}
