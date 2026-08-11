/**
 * @file utils/soundEffects.ts
 * @description Web Audio API Audio Synthesizer Engine for System UI Interaction Audio.
 *
 * Responsibilities:
 * - Synthesizes real-time native audio tones using Web Audio API oscillators, gain nodes, and biquad filters (zero external audio file assets required).
 * - Provides sound feedback triggers for window actions (open, close, minimize, maximize), spotlight toggle, theme changes, toast popups, copy-to-clipboard, trash emptying, and keyboard typing.
 * - Checks global `isMuted` system state from store before synthesizing audio frequencies.
 */

import { useEcosystemStore } from "../store/useEcosystemStore";

let globalAudioCtx: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === "undefined") return null;
  const AudioContextClass =
    window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return null;

  if (!globalAudioCtx || globalAudioCtx.state === "closed") {
    globalAudioCtx = new AudioContextClass();
  }

  if (globalAudioCtx.state === "suspended") {
    globalAudioCtx.resume();
  }

  return globalAudioCtx;
};

// Helper to check mute and scale gain by global volume (0 - 100)
const getScaledGain = (
  ctx: AudioContext,
  baseGain: number,
): GainNode | null => {
  const store = useEcosystemStore.getState();
  if (store.isMuted || store.volume <= 0) return null;
  const volScale = Math.max(0, Math.min(1, store.volume / 100));
  const gainNode = ctx.createGain();
  gainNode.gain.setValueAtTime(baseGain * volScale, ctx.currentTime);
  return gainNode;
};

// Auto-unlock AudioContext on first user interaction anywhere on the page
if (typeof window !== "undefined") {
  const unlockAudio = () => {
    const ctx = getAudioContext();
    if (ctx && ctx.state === "suspended") {
      ctx.resume();
    }
  };
  window.addEventListener("pointerdown", unlockAudio, { passive: true });
  window.addEventListener("keydown", unlockAudio, { passive: true });
}

// 1. Trash Whoosh & Thump Sound
export const playTrashWhooshSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const masterGain = getScaledGain(ctx, 0.9);
    if (!masterGain) return;
    masterGain.connect(ctx.destination);

    const now = ctx.currentTime;

    // Layer 1: White noise paper crumple / swoosh
    const bufferSize = Math.floor(ctx.sampleRate * 0.35);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.9;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "lowpass";
    noiseFilter.frequency.setValueAtTime(1400, now);
    noiseFilter.frequency.linearRampToValueAtTime(2800, now + 0.12);
    noiseFilter.frequency.linearRampToValueAtTime(250, now + 0.35);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(1.0, now);
    noiseGain.gain.linearRampToValueAtTime(0.001, now + 0.35);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterGain);

    // Layer 2: Low-frequency acoustic thump sweep (260Hz -> 40Hz)
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.28);

    oscGain.gain.setValueAtTime(0.8, now);
    oscGain.gain.linearRampToValueAtTime(0.001, now + 0.28);

    osc.connect(oscGain);
    oscGain.connect(masterGain);

    noise.start(now);
    noise.stop(now + 0.35);

    osc.start(now);
    osc.stop(now + 0.28);
  } catch (e) {
    console.warn("Audio playback error:", e);
  }
};

// 2. Window Open Sound (Bright rising C5 -> G5 -> C6 chime)
export const playWindowOpenSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const masterGain = getScaledGain(ctx, 0.85);
    if (!masterGain) return;
    masterGain.connect(ctx.destination);

    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    const gain2 = ctx.createGain();

    osc1.type = "sine";
    osc2.type = "sine";

    osc1.frequency.setValueAtTime(523.25, now);
    osc1.frequency.linearRampToValueAtTime(783.99, now + 0.1);

    gain1.gain.setValueAtTime(0.7, now);
    gain1.gain.linearRampToValueAtTime(0.01, now + 0.18);

    osc2.frequency.setValueAtTime(1046.5, now + 0.05);
    gain2.gain.setValueAtTime(0.6, now + 0.05);
    gain2.gain.linearRampToValueAtTime(0.01, now + 0.22);

    osc1.connect(gain1);
    gain1.connect(masterGain);

    osc2.connect(gain2);
    gain2.connect(masterGain);

    osc1.start(now);
    osc1.stop(now + 0.18);

    osc2.start(now + 0.05);
    osc2.stop(now + 0.22);
  } catch (e) {
    console.warn("Audio playback error:", e);
  }
};

// 3. Window Close Sound (Warm descending pop 520Hz -> 260Hz)
export const playWindowCloseSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const masterGain = getScaledGain(ctx, 0.85);
    if (!masterGain) return;
    masterGain.connect(ctx.destination);

    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.linearRampToValueAtTime(260, now + 0.12);

    gain.gain.setValueAtTime(0.8, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.18);

    osc.connect(gain);
    gain.connect(masterGain);

    osc.start(now);
    osc.stop(now + 0.18);
  } catch (e) {
    console.warn("Audio playback error:", e);
  }
};

// 4. Window Minimize Sound (Fluid pitch swoop down 640Hz -> 180Hz)
export const playWindowMinimizeSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const masterGain = getScaledGain(ctx, 0.85);
    if (!masterGain) return;
    masterGain.connect(ctx.destination);

    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(640, now);
    osc.frequency.linearRampToValueAtTime(180, now + 0.2);

    gain.gain.setValueAtTime(0.85, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.22);

    osc.connect(gain);
    gain.connect(masterGain);

    osc.start(now);
    osc.stop(now + 0.22);
  } catch (e) {
    console.warn("Audio playback error:", e);
  }
};

// 5. Dock Launch Sound (Crisp wooden pop click)
export const playDockLaunchSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const masterGain = getScaledGain(ctx, 0.85);
    if (!masterGain) return;
    masterGain.connect(ctx.destination);

    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.linearRampToValueAtTime(900, now + 0.04);
    osc.frequency.linearRampToValueAtTime(200, now + 0.1);

    gain.gain.setValueAtTime(0.9, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.12);

    osc.connect(gain);
    gain.connect(masterGain);

    osc.start(now);
    osc.stop(now + 0.12);
  } catch (e) {
    console.warn("Audio playback error:", e);
  }
};

// 6. Spotlight Sound (High soft tick)
export const playSpotlightSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const masterGain = getScaledGain(ctx, 0.4);
    if (!masterGain) return;
    masterGain.connect(ctx.destination);

    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(1800, now);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.05);

    osc.connect(gain);
    gain.connect(masterGain);

    osc.start(now);
    osc.stop(now + 0.05);
  } catch (e) {
    console.warn("Audio playback error:", e);
  }
};

// 7. Toast Sound (Crisp double notification chime)
export const playToastSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const masterGain = getScaledGain(ctx, 0.6);
    if (!masterGain) return;
    masterGain.connect(ctx.destination);

    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(880, now);
    gain1.gain.setValueAtTime(0.6, now);
    gain1.gain.linearRampToValueAtTime(0.01, now + 0.1);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(1046.5, now + 0.06);
    gain2.gain.setValueAtTime(0.6, now + 0.06);
    gain2.gain.linearRampToValueAtTime(0.01, now + 0.18);

    osc1.connect(gain1);
    gain1.connect(masterGain);

    osc2.connect(gain2);
    gain2.connect(masterGain);

    osc1.start(now);
    osc1.stop(now + 0.1);

    osc2.start(now + 0.06);
    osc2.stop(now + 0.18);
  } catch (e) {
    console.warn("Audio playback error:", e);
  }
};

// 8. Copy Sound (Success double pop)
export const playCopySound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const masterGain = getScaledGain(ctx, 0.6);
    if (!masterGain) return;
    masterGain.connect(ctx.destination);

    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(1200, now);
    gain1.gain.setValueAtTime(0.6, now);
    gain1.gain.linearRampToValueAtTime(0.01, now + 0.05);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(1600, now + 0.04);
    gain2.gain.setValueAtTime(0.7, now + 0.04);
    gain2.gain.linearRampToValueAtTime(0.01, now + 0.1);

    osc1.connect(gain1);
    gain1.connect(masterGain);

    osc2.connect(gain2);
    gain2.connect(masterGain);

    osc1.start(now);
    osc1.stop(now + 0.05);

    osc2.start(now + 0.04);
    osc2.stop(now + 0.1);
  } catch (e) {
    console.warn("Audio playback error:", e);
  }
};

// 9. Theme Toggle Sound (Tactile analog switch click)
export const playThemeToggleSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const masterGain = getScaledGain(ctx, 0.6);
    if (!masterGain) return;
    masterGain.connect(ctx.destination);

    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(750, now);
    osc.frequency.linearRampToValueAtTime(350, now + 0.03);

    gain.gain.setValueAtTime(0.6, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.04);

    osc.connect(gain);
    gain.connect(masterGain);

    osc.start(now);
    osc.stop(now + 0.04);
  } catch (e) {
    console.warn("Audio playback error:", e);
  }
};

// 10. Official iPhone Lock Screen Unlock Sound (Authentic percussive pitch-drop click)
export const playLockUnlockSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const masterGain = getScaledGain(ctx, 0.75);
    if (!masterGain) return;
    masterGain.connect(ctx.destination);

    const now = ctx.currentTime;

    // Layer 1: Percussive pitch drop sweep (800Hz -> 380Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(800, now);
    osc1.frequency.exponentialRampToValueAtTime(380, now + 0.08);

    gain1.gain.setValueAtTime(0.7, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    // Layer 2: Ultra-short high metallic click accent (1600Hz -> 900Hz)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(1600, now);
    osc2.frequency.exponentialRampToValueAtTime(900, now + 0.03);

    gain2.gain.setValueAtTime(0.5, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    osc1.connect(gain1);
    gain1.connect(masterGain);

    osc2.connect(gain2);
    gain2.connect(masterGain);

    osc1.start(now);
    osc1.stop(now + 0.08);

    osc2.start(now);
    osc2.stop(now + 0.03);
  } catch (e) {
    console.warn("Audio playback error:", e);
  }
};
