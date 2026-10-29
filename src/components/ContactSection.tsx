import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence, useScroll } from 'motion/react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Copy, 
  Loader2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { contactInfo } from '../data/portfolio';
import { playSound } from '../utils/audio';
import { sendTelegramMessage } from '../utils/telegram';

export default function ContactSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const toggleExpand = () => {
    playSound(isExpanded ? 'click' : 'unlock');
    setIsExpanded(!isExpanded);
  };

  const copyToClipboard = (text: string, label: string) => {
    playSound('click');
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    playSound('unlock');

    try {
      await sendTelegramMessage(formData);
    } catch (err) {
      console.warn('Telegram error:', err);
    } finally {
      setIsSubmitting(false);
      setFormSent(true);
    }
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative py-6 sm:py-14 px-3 sm:px-6 lg:px-8 max-w-5xl mx-auto"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-80 h-72 sm:h-80 bg-white/[0.02] rounded-full blur-[90px] pointer-events-none" />

      {/* ================= GORGEOUS CAPSULE TRIGGER BUTTON ================= */}
      <div className="flex flex-col items-center justify-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={toggleExpand}
          className={`relative group px-5 sm:px-9 py-2.5 sm:py-3.5 rounded-full font-mono text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 sm:gap-3 transition-all duration-300 shadow-2xl cursor-pointer border active:scale-95 ${
            isExpanded
              ? 'bg-neutral-950 text-white border-neutral-600 hover:bg-neutral-900 shadow-[0_0_25px_rgba(255,255,255,0.12)]'
              : 'bg-white text-black border-white hover:bg-neutral-100 shadow-[0_0_35px_rgba(255,255,255,0.28)] hover:shadow-[0_0_55px_rgba(255,255,255,0.45)]'
          }`}
        >
          {!isExpanded && (
            <span className="absolute -inset-1 rounded-full bg-white/25 blur-sm animate-pulse pointer-events-none" />
          )}

          <span className="font-heading font-black italic tracking-wider text-xs sm:text-base whitespace-nowrap">
            {isExpanded ? 'CLOSE CONTACT' : 'CONTACT'}
          </span>
        </motion.button>
      </div>

      {/* ================= EXPANDED CONTACT CHANNELS ================= */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 24, stiffness: 200 }}
            className="space-y-4 sm:space-y-6 mt-6 sm:mt-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-5">
              
              {/* Left: Quick Connect Cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: -24, filter: 'blur(6px)' }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 0.06, type: 'spring', damping: 16, stiffness: 150 }}
                className="md:col-span-5 space-y-2.5 sm:space-y-3"
              >
                {/* Phone */}
                <div className="glass-panel p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-neutral-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-neutral-400 uppercase">Phone / Call</div>
                      <a href={`tel:${contactInfo.phone}`} className="text-xs sm:text-sm font-semibold text-white hover:underline">
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(contactInfo.phone, 'phone')}
                    className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white cursor-pointer"
                    title="Copy"
                  >
                    {copied === 'phone' ? <CheckCircle2 className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSound('click')}
                  className="glass-panel p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-neutral-800/80 flex items-center justify-between group hover:border-neutral-600 transition-all block active:scale-98"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white shrink-0">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-neutral-400 uppercase">WhatsApp Chat</div>
                      <div className="text-xs sm:text-sm font-semibold text-white group-hover:underline">
                        {contactInfo.whatsapp}
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400 group-hover:text-white">&rarr;</span>
                </a>

                {/* Email */}
                <div className="glass-panel p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-neutral-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3 truncate min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="truncate min-w-0">
                      <div className="text-[10px] font-mono text-neutral-400 uppercase">Direct Email</div>
                      <a href={`mailto:${contactInfo.email}`} className="text-xs sm:text-sm font-semibold text-white hover:underline truncate block">
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(contactInfo.email, 'email')}
                    className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white shrink-0 ml-2 cursor-pointer"
                    title="Copy"
                  >
                    {copied === 'email' ? <CheckCircle2 className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Location */}
                <div className="glass-panel p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-neutral-800/80 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-neutral-400 uppercase">Location</div>
                    <div className="text-xs font-semibold text-white">{contactInfo.location}</div>
                  </div>
                </div>
              </motion.div>

              {/* Right: Clean Message Form */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: -24, filter: 'blur(6px)' }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 0.14, type: 'spring', damping: 16, stiffness: 150 }}
                className="md:col-span-7"
              >
                <div className="glass-panel p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-neutral-800/80">
                  {formSent ? (
                    <div className="text-center py-6 sm:py-8 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center mx-auto text-white">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h3 className="font-heading font-bold text-base text-white">Message Sent</h3>
                      <p className="text-xs text-neutral-400">Thank you! I will get back to you shortly.</p>
                      <button
                        onClick={() => setFormSent(false)}
                        className="px-4 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-xs font-mono text-neutral-300 border border-neutral-800 cursor-pointer"
                      >
                        Send Another
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">Your Name</label>
                          <input
                            type="text"
                            required
                            placeholder="Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3 py-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 text-base sm:text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">Email / Phone</label>
                          <input
                            type="text"
                            required
                            placeholder="Email or WhatsApp"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-3 py-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 text-base sm:text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">Message</label>
                        <textarea
                          required
                          rows={3}
                          placeholder="Write your message..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 text-base sm:text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 shadow-md active:scale-98"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Send Message</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>

            </div>

            {/* Bottom Collapse Button */}
            <div className="flex justify-center pt-2">
              <button
                onClick={toggleExpand}
                className="px-5 py-2 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-xs font-mono text-neutral-300 hover:text-white border border-neutral-800 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <ChevronUp className="w-4 h-4" />
                <span>Close Contact</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
