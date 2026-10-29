/**
 * Web Audio API procedural synthesizer for subtle cinematic forest ambience.
 * Zero-asset, zero-network, infinite procedural natural soundscape:
 * - Gentle canopy breeze & rustling leaves (filtered brown/pink noise with dual LFOs)
 * - Deep harmonic earth drone (warm sub-harmonics for cinematic fullness)
 * - Distant evening cricket chirps (gentle periodic resonant pulses)
 */

class ForestAmbienceEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying = false;
  private isMuted = true;
  private intervalIds: number[] = [];

  private initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public start(): boolean {
    const ctx = this.initContext();
    if (!ctx) return false;

    if (this.isPlaying && this.masterGain) {
      // Fade back in if already running
      const now = ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(0.18, now + 1.2);
      this.isMuted = false;
      return true;
    }

    try {
      const now = ctx.currentTime;
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.0001, now);
      master.gain.linearRampToValueAtTime(0.18, now + 1.5);
      master.connect(ctx.destination);
      this.masterGain = master;

      // 1. GENTLE FOREST CANOPY BREEZE & RUSTLING LEAVES (Noise + Bandpass + Dual LFO)
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Pink-ish noise filter
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      // Filter: gentle wind whistling through leaves
      const windFilter = ctx.createBiquadFilter();
      windFilter.type = 'bandpass';
      windFilter.frequency.setValueAtTime(320, now);
      windFilter.Q.setValueAtTime(1.8, now);

      // LFO 1: modulates wind frequency slowly (0.12 Hz)
      const windLfo = ctx.createOscillator();
      windLfo.frequency.setValueAtTime(0.12, now);
      const windLfoGain = ctx.createGain();
      windLfoGain.gain.setValueAtTime(160, now);
      windLfo.connect(windLfoGain);
      windLfoGain.connect(windFilter.frequency);

      // Noise gain
      const windGain = ctx.createGain();
      windGain.gain.setValueAtTime(0.85, now);

      noiseSource.connect(windFilter);
      windFilter.connect(windGain);
      windGain.connect(master);

      noiseSource.start(now);
      windLfo.start(now);

      // 2. CINEMATIC WARM FOREST PAD / DRONE (Harmonic Sub-frequencies)
      const droneOsc1 = ctx.createOscillator();
      droneOsc1.type = 'sine';
      droneOsc1.frequency.setValueAtTime(55, now); // A1 note

      const droneOsc2 = ctx.createOscillator();
      droneOsc2.type = 'sine';
      droneOsc2.frequency.setValueAtTime(110, now); // A2 note

      const droneFilter = ctx.createBiquadFilter();
      droneFilter.type = 'lowpass';
      droneFilter.frequency.setValueAtTime(180, now);

      const droneGain = ctx.createGain();
      droneGain.gain.setValueAtTime(0.04, now);

      droneOsc1.connect(droneFilter);
      droneOsc2.connect(droneFilter);
      droneFilter.connect(droneGain);
      droneGain.connect(master);

      droneOsc1.start(now);
      droneOsc2.start(now);

      // 3. SUBTLE DISTANT CRICKET PULSES (Procedural periodic chirps)
      const cricketGain = ctx.createGain();
      cricketGain.gain.setValueAtTime(0.015, now);
      cricketGain.connect(master);

      const triggerCricketChirp = () => {
        if (!this.ctx || !this.isPlaying || this.isMuted) return;
        const cNow = this.ctx.currentTime;
        const cricketOsc = this.ctx.createOscillator();
        const chirpGain = this.ctx.createGain();

        cricketOsc.type = 'sine';
        cricketOsc.frequency.setValueAtTime(4600 + (Math.random() * 200 - 100), cNow);
        
        chirpGain.gain.setValueAtTime(0.0001, cNow);
        chirpGain.gain.linearRampToValueAtTime(0.012, cNow + 0.02);
        chirpGain.gain.exponentialRampToValueAtTime(0.0001, cNow + 0.12);

        cricketOsc.connect(chirpGain);
        chirpGain.connect(cricketGain);

        cricketOsc.start(cNow);
        cricketOsc.stop(cNow + 0.14);
      };

      const intervalId = window.setInterval(() => {
        if (Math.random() > 0.45) {
          triggerCricketChirp();
          setTimeout(triggerCricketChirp, 70);
          setTimeout(triggerCricketChirp, 140);
        }
      }, 3200);
      this.intervalIds.push(intervalId);

      this.isPlaying = true;
      this.isMuted = false;
      return true;
    } catch {
      return false;
    }
  }

  public stop(): void {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.8);
    this.isMuted = true;
  }

  public toggle(): boolean {
    if (!this.isPlaying || this.isMuted) {
      this.start();
      return true;
    } else {
      this.stop();
      return false;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying && !this.isMuted;
  }

  public enableAutoPlay(): void {
    if (typeof window === 'undefined') return;

    // Try starting immediately
    const started = this.start();
    if (started && this.ctx && this.ctx.state === 'running') {
      return;
    }

    // Fallback: start on first touch, click, scroll or keypress
    const handleFirstGesture = () => {
      this.start();
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('scroll', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };

    window.addEventListener('pointerdown', handleFirstGesture, { passive: true });
    window.addEventListener('touchstart', handleFirstGesture, { passive: true });
    window.addEventListener('scroll', handleFirstGesture, { passive: true });
    window.addEventListener('keydown', handleFirstGesture, { passive: true });
  }
}

export const forestAmbience = new ForestAmbienceEngine();
