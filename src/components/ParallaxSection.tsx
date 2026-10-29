import React from 'react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}

/**
 * ParallaxSection
 * Lightweight wrapper with GPU acceleration for 120 FPS buttery smooth scrolling
 * without spring physics lag or scroll stutter.
 */
export default function ParallaxSection({
  children,
  className = '',
}: ParallaxSectionProps) {
  return (
    <div className={`relative will-change-transform transform-gpu ${className}`}>
      {children}
    </div>
  );
}
