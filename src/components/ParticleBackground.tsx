export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
      {/* Subtle Monochrome Ambient Radial Glows in neutral white/silver */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-white/[0.02] blur-[130px]" />
      <div className="absolute top-1/3 -right-40 w-[650px] h-[650px] rounded-full bg-white/[0.015] blur-[150px]" />
      <div className="absolute -bottom-40 left-1/4 w-[700px] h-[700px] rounded-full bg-white/[0.02] blur-[160px]" />

      {/* Subtle Top Monochrome Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.03),rgba(0,0,0,0))]" />
    </div>
  );
}
