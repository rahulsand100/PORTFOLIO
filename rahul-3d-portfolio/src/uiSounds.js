let audioContext;

function getAudioContext() {
  const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextConstructor) return null;

  audioContext ??= new AudioContextConstructor();
  if (audioContext.state === "suspended") void audioContext.resume();
  return audioContext;
}

function addNoise(context, start, duration, cutoff, peak) {
  const buffer = context.createBuffer(1, Math.ceil(context.sampleRate * duration), context.sampleRate);
  const samples = buffer.getChannelData(0);
  for (let index = 0; index < samples.length; index += 1) {
    samples[index] = (Math.random() * 2 - 1) * (1 - index / samples.length);
  }

  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();
  source.buffer = buffer;
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(cutoff, start);
  filter.frequency.exponentialRampToValueAtTime(Math.max(180, cutoff * 0.48), start + duration);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(peak, start + 0.025);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  source.connect(filter).connect(gain).connect(context.destination);
  source.start(start);
  source.stop(start + duration);
}

function addTone(context, { start, duration, from, to, peak, type = "sine" }) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(from, start);
  oscillator.frequency.exponentialRampToValueAtTime(to, start + duration);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(peak, start + 0.018);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + duration);
}

export function playDoorSound() {
  try {
    const context = getAudioContext();
    if (!context) return;
    const now = context.currentTime;

    addNoise(context, now, 0.82, 920, 0.05);
    addTone(context, { start: now, duration: 0.74, from: 78, to: 162, peak: 0.055, type: "triangle" });
    addTone(context, { start: now + 0.1, duration: 0.52, from: 112, to: 86, peak: 0.026, type: "sawtooth" });
    addTone(context, { start: now + 0.7, duration: 0.17, from: 780, to: 310, peak: 0.045 });
    addTone(context, { start: now + 0.7, duration: 0.14, from: 145, to: 72, peak: 0.035, type: "triangle" });
  } catch {
    return;
  }
}

export function playCordSound() {
  try {
    const context = getAudioContext();
    if (!context) return;
    const now = context.currentTime;

    addTone(context, { start: now, duration: 0.2, from: 640, to: 310, peak: 0.042, type: "triangle" });
    addTone(context, { start: now + 0.035, duration: 0.24, from: 920, to: 470, peak: 0.022 });
    addNoise(context, now + 0.05, 0.12, 2100, 0.016);
  } catch {
    return;
  }
}