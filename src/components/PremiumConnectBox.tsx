import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  Sparkles, 
  MessageCircle, 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Copy, 
  ExternalLink,
  ShieldCheck,
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { contactInfo } from '../data/portfolio';
import { playSound } from '../utils/audio';

export default function PremiumConnectBox() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const slideLeftX = useTransform(scrollYProgress, [0.78, 1], [0, -140]);
  const slideRightX = useTransform(scrollYProgress, [0.78, 1], [0, 140]);
  const exitOpacity = useTransform(scrollYProgress, [0.78, 0.98], [1, 0.2]);

  const copyText = (text: string, key: string) => {
    playSound('click');
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <section 
      ref={containerRef}
      className="relative py-14 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-white/[0.03] rounded-full blur-[140px] pointer-events-none" />

      {/* Main Luxury VIP Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 glass-panel-glow p-5 sm:p-10 rounded-[28px] sm:rounded-[32px] border border-neutral-700/80 bg-neutral-950/90 shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden"
      >
        {/* Top Header Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 sm:pb-6 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-2xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white shadow-inner shrink-0">
              <Zap className="w-5 sm:w-6 h-5 sm:h-6 animate-pulse" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-white text-[9px] sm:text-[10px] font-mono uppercase tracking-wider font-semibold">
                <ShieldCheck className="w-3 h-3 text-white" />
                <span>DIRECT VIP ACCESS</span>
              </div>
              <h3 className="font-heading font-black italic text-lg sm:text-2xl text-white uppercase tracking-tight mt-0.5">
                Priority Collaboration Hub
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 sm:py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] sm:text-xs font-mono text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Available for Hire &amp; Projects</span>
          </div>
        </div>

        {/* 2 Big Premium Direct Channels (Dual Slide) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5 sm:my-6">
          {/* WhatsApp VIP Card (Left Slide) */}
          <motion.a
            style={{ x: slideLeftX, opacity: exitOpacity }}
            href="https://wa.me/16137070221?text=Hello%20Muhammad%20Nayeem,%20I%20am%20contacting%20you%20from%20your%20portfolio."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSound('click')}
            className="group relative p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-900/90 to-neutral-950 border border-neutral-800 hover:border-neutral-500 transition-all duration-300 hover:scale-[1.02] flex items-center justify-between cursor-pointer shadow-lg active:scale-95"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition-all shrink-0">
                <MessageCircle className="w-5 sm:w-6 h-5 sm:h-6" />
              </div>
              <div>
                <span className="text-[9px] sm:text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                  FAST 1-HOUR RESPONSE
                </span>
                <span className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                  WhatsApp Direct Chat
                </span>
                <span className="text-xs font-mono text-neutral-400 block mt-0.5">
                  +1 (613) 707-0221
                </span>
              </div>
            </div>
            <ArrowUpRight className="w-4 sm:w-5 h-4 sm:h-5 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
          </motion.a>

          {/* Telegram VIP Card (Right Slide) */}
          <motion.a
            style={{ x: slideRightX, opacity: exitOpacity }}
            href="https://t.me/developer_x_nayeem_ceo"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSound('click')}
            className="group relative p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-900/90 to-neutral-950 border border-neutral-800 hover:border-neutral-500 transition-all duration-300 hover:scale-[1.02] flex items-center justify-between cursor-pointer shadow-lg active:scale-95"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-black transition-all shrink-0">
                <Send className="w-5 sm:w-6 h-5 sm:h-6" />
              </div>
              <div>
                <span className="text-[9px] sm:text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                  TELEGRAM DIRECT HANDLE
                </span>
                <span className="text-sm sm:text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                  @developer_x_nayeem_ceo
                </span>
                <span className="text-xs font-mono text-neutral-400 block mt-0.5">
                  Telegram Verified Chat
                </span>
              </div>
            </div>
            <ArrowUpRight className="w-4 sm:w-5 h-4 sm:h-5 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
          </motion.a>
        </div>

        {/* Quick Credentials Info Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-2">
          {/* Email */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800/80 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <Mail className="w-4 h-4 text-white shrink-0" />
              <div className="min-w-0">
                <span className="text-[9px] sm:text-[10px] font-mono text-neutral-400 uppercase block">EMAIL</span>
                <span className="text-xs font-semibold text-neutral-200 truncate block">
                  {contactInfo.email}
                </span>
              </div>
            </div>
            <button
              onClick={() => copyText(contactInfo.email, 'email')}
              className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer shrink-0"
              title="Copy Email"
            >
              {copiedKey === 'email' ? <CheckCircle2 className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Direct Phone */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800/80 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <Phone className="w-4 h-4 text-white shrink-0" />
              <div className="min-w-0">
                <span className="text-[9px] sm:text-[10px] font-mono text-neutral-400 uppercase block">CALL DIRECT</span>
                <span className="text-xs font-semibold text-neutral-200 truncate block">
                  {contactInfo.phone}
                </span>
              </div>
            </div>
            <button
              onClick={() => copyText(contactInfo.phone, 'phone')}
              className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer shrink-0"
              title="Copy Phone"
            >
              {copiedKey === 'phone' ? <CheckCircle2 className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Location */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800/80 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <MapPin className="w-4 h-4 text-white shrink-0" />
              <div className="min-w-0">
                <span className="text-[9px] sm:text-[10px] font-mono text-neutral-400 uppercase block">LOCATION</span>
                <span className="text-xs font-semibold text-neutral-200 truncate block">
                  {contactInfo.location}
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-neutral-400 shrink-0">
              BANGLADESH
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
