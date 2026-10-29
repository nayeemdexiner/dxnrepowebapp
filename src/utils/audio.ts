/**
 * Web Audio API synthesizer for futuristic subtle UI feedback sound effects.
 * Safe, zero-asset, client-side procedural sound generation.
 */

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

export const isSoundEnabled = () => soundEnabled;

export const setSoundEnabled = (enabled: boolean) => {
  soundEnabled = enabled;
  return soundEnabled;
};

const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
};

export const playSound = (type: 'hover' | 'click' | 'modal' | 'whoosh' | 'unlock' | 'tab') => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    switch (type) {
      case 'hover': {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(640, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.04);
        gain.gain.setValueAtTime(0.015, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
        break;
      }
      case 'tab': {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(660, now + 0.06);
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
        osc.start(now);
        osc.stop(now + 0.06);
        break;
      }
      case 'click': {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.08);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
        break;
      }
      case 'modal': {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(350, now);
        osc.frequency.exponentialRampToValueAtTime(900, now + 0.18);
        gain.gain.setValueAtTime(0.035, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
        break;
      }
      case 'whoosh': {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(700, now + 0.25);
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
        break;
      }
      case 'unlock': {
        // Futuristic 3-tone arpeggio
        const tones = [523.25, 659.25, 783.99, 1046.5];
        tones.forEach((freq, i) => {
          const subOsc = ctx.createOscillator();
          const subGain = ctx.createGain();
          subOsc.type = 'sine';
          subOsc.frequency.setValueAtTime(freq, now + i * 0.08);
          subGain.gain.setValueAtTime(0.04, now + i * 0.08);
          subGain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 0.25);
          subOsc.connect(subGain);
          subGain.connect(ctx.destination);
          subOsc.start(now + i * 0.08);
          subOsc.stop(now + i * 0.08 + 0.25);
        });
        break;
      }
    }
  } catch {
    // Graceful fallback for restricted audio policies
  }
};
