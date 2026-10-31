/**
 * Arabic speech service for Basyir Agency.
 * Primary: Nabra neural MSA TTS in the browser (WASM, worker-based).
 * Fallback: a real Arabic voice exposed by the browser/operating system.
 *
 * TTS supports vocabulary and Modern Standard Arabic practice. It is not a
 * substitute for verified Qur'anic recitation or tajwid instruction.
 */

const MAX_AUDIO_CACHE = 64;
let requestId = 0;
let ttsPromise = null;
let ttsInstance = null;
let audioContext = null;
let activeSource = null;
let activeUtterance = null;
const generatedAudioCache = new Map();

function reportStatus(kind, message, reason = '', extra = {}) {
  if (typeof window === 'undefined') return;
  try {
    window.dispatchEvent(new CustomEvent('basyir-audio-status', {
      detail: { kind, message, reason, ...extra }
    }));
  } catch { /* Audio status must never interrupt gameplay. */ }
}

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextConstructor) return null;
  try {
    if (!audioContext || audioContext.state === 'closed') audioContext = new AudioContextConstructor();
    return audioContext;
  } catch {
    return null;
  }
}

function stopCurrentPlayback() {
  if (activeSource) {
    try {
      activeSource.onended = null;
      activeSource.stop(0);
      activeSource.disconnect();
    } catch { /* The source may already have stopped. */ }
    activeSource = null;
  }
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    try { window.speechSynthesis.cancel(); } catch { /* Browser speech may already be idle. */ }
  }
  activeUtterance = null;
}

export function stopAudio() {
  requestId += 1;
  stopCurrentPlayback();
}

function cacheGeneratedAudio(text, audio, sampleRate) {
  generatedAudioCache.delete(text);
  generatedAudioCache.set(text, { audio, sampleRate });
  while (generatedAudioCache.size > MAX_AUDIO_CACHE) {
    generatedAudioCache.delete(generatedAudioCache.keys().next().value);
  }
}

function isWorkerSetupError(error) {
  const message = `${error?.name ?? ''} ${error?.message ?? error ?? ''}`.toLowerCase();
  return /worker|blob|content security|csp|import\.meta|module script|cross-origin/.test(message);
}

function loadNabraTTS() {
  if (ttsInstance) return Promise.resolve(ttsInstance);
  if (ttsPromise) return ttsPromise;

  reportStatus('info', 'Menyiapkan suara Arab Fusha. Penggunaan pertama mengunduh model suara sekitar 30 MB dan menyimpannya di cache browser.', 'NABRA_TTS_LOADING');
  ttsPromise = import('nabra-tts')
    .then(async ({ NabraTTS }) => {
      if (!NabraTTS || typeof NabraTTS.load !== 'function') {
        throw new Error('NABRA_TTS_EXPORT_NOT_FOUND');
      }

      const options = {
        dtype: 'fp32',
        device: 'wasm',
        numThreads: 1,
        cache: true,
        worker: true
      };

      try {
        return await NabraTTS.load(options);
      } catch (error) {
        if (!isWorkerSetupError(error)) throw error;
        reportStatus('warning', 'Worker audio tidak tersedia. Aplikasi mencoba mode kompatibilitas browser.', 'NABRA_WORKER_FALLBACK');
        return NabraTTS.load({ ...options, worker: false });
      }
    })
    .then((instance) => {
      ttsInstance = instance;
      reportStatus('success', 'Mesin suara Arab Fusha siap. Tekan ikon speaker untuk mendengarkan.', 'NABRA_TTS_READY');
      return instance;
    })
    .catch((error) => {
      ttsPromise = null;
      throw error;
    });
  return ttsPromise;
}

function playBuffer(context, audio, sampleRate, id, spokenText) {
  if (id !== requestId) return { ok: false, reason: 'PLAYBACK_CANCELLED' };
  if (!audio || !audio.length) throw new Error('EMPTY_GENERATED_AUDIO');

  const pcm = audio instanceof Float32Array ? audio : Float32Array.from(audio);
  const audioBuffer = context.createBuffer(1, pcm.length, sampleRate || 24000);
  audioBuffer.copyToChannel(pcm, 0);
  const source = context.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(context.destination);
  source.onended = () => {
    if (activeSource === source) activeSource = null;
    try { source.disconnect(); } catch { /* Ignore already-disconnected source. */ }
    reportStatus('ended', '', 'AUDIO_PLAYBACK_ENDED', { text: spokenText });
  };
  activeSource = source;
  source.start(0);
  reportStatus('playing', '', 'AUDIO_PLAYING', { text: spokenText });
  return { ok: true, mode: 'nabra-neural-arabic-msa' };
}

function selectArabicVoice(voices = []) {
  const arabic = voices.filter((voice) => /^ar([_-]|$)/i.test(voice.lang || ''));
  return arabic.find((voice) => /^ar[-_]SA/i.test(voice.lang))
    || arabic.find((voice) => /^ar[-_]001/i.test(voice.lang))
    || arabic.find((voice) => /^ar[-_]AE/i.test(voice.lang))
    || arabic.find((voice) => /^ar[-_]EG/i.test(voice.lang))
    || arabic[0]
    || null;
}

async function getBrowserArabicVoice(synth) {
  const current = selectArabicVoice(synth.getVoices?.() ?? []);
  if (current) return current;

  return new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      synth.removeEventListener?.('voiceschanged', onChanged);
      if (synth.onvoiceschanged === onChanged) synth.onvoiceschanged = null;
      resolve(selectArabicVoice(synth.getVoices?.() ?? []));
    };
    const onChanged = () => {
      const voice = selectArabicVoice(synth.getVoices?.() ?? []);
      if (voice) finish();
    };
    const timer = setTimeout(finish, 1800);
    if (typeof synth.addEventListener === 'function') synth.addEventListener('voiceschanged', onChanged);
    else synth.onvoiceschanged = onChanged;
  });
}

async function playWithBrowserTTS(text, id) {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    return { ok: false, reason: 'BROWSER_TTS_UNAVAILABLE' };
  }
  const Utterance = window.SpeechSynthesisUtterance || globalThis.SpeechSynthesisUtterance;
  if (typeof Utterance !== 'function') return { ok: false, reason: 'SPEECH_UTTERANCE_UNAVAILABLE' };

  const synth = window.speechSynthesis;
  const voice = await getBrowserArabicVoice(synth);
  if (id !== requestId) return { ok: false, reason: 'PLAYBACK_CANCELLED' };
  if (!voice) return { ok: false, reason: 'ARABIC_BROWSER_VOICE_UNAVAILABLE' };

  return new Promise((resolve) => {
    const utterance = new Utterance(text);
    let started = false;
    let settled = false;
    let timer;
    const finish = (result) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve(result);
    };

    utterance.lang = voice.lang || 'ar-SA';
    utterance.voice = voice;
    utterance.rate = 0.82;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.onstart = () => {
      started = true;
      reportStatus('warning', `Suara neural tidak tersedia. Menggunakan suara Arab perangkat: ${voice.name}.`, 'BROWSER_TTS_FALLBACK', { text });
      finish({ ok: true, mode: 'browser-arabic-fallback', voice: voice.name });
    };
    utterance.onend = () => {
      if (activeUtterance === utterance) activeUtterance = null;
      reportStatus('ended', '', 'AUDIO_PLAYBACK_ENDED', { text });
    };
    utterance.onerror = (event) => {
      if (activeUtterance === utterance) activeUtterance = null;
      if (!started) finish({ ok: false, reason: event?.error || 'BROWSER_TTS_ERROR' });
      else reportStatus('warning', 'Pelafalan terhenti sebelum selesai.', event?.error || 'BROWSER_TTS_INTERRUPTED', { text });
    };

    activeUtterance = utterance;
    timer = setTimeout(() => finish({ ok: false, reason: 'BROWSER_TTS_START_TIMEOUT' }), 5000);
    try {
      synth.cancel();
      synth.speak(utterance);
    } catch (error) {
      finish({ ok: false, reason: error?.name || 'BROWSER_TTS_FAILED' });
    }
  });
}

/** Speak Arabic text and preserve its original harakat/tashkeel. */
export async function playArabic({ text = '' } = {}) {
  requestId += 1;
  const id = requestId;
  stopCurrentPlayback();

  const cleanText = String(text ?? '').replace(/[\u0640]/g, '').replace(/\s+/g, ' ').trim();
  if (!cleanText || !/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(cleanText)) {
    reportStatus('warning', 'Teks Arab tidak ditemukan. Audio tidak dapat dibuat.', 'EMPTY_OR_NON_ARABIC_TEXT');
    return { ok: false, reason: 'EMPTY_OR_NON_ARABIC_TEXT' };
  }

  // Create/resume the audio context directly inside the click gesture. This
  // avoids browser autoplay restrictions after the neural model finishes loading.
  const context = getAudioContext();
  let resumePromise = null;
  if (context) {
    try { resumePromise = context.state === 'running' ? Promise.resolve() : context.resume(); }
    catch { resumePromise = null; }
  }

  try {
    if (!context) throw new Error('WEB_AUDIO_UNAVAILABLE');
    const tts = await loadNabraTTS();
    if (id !== requestId) return { ok: false, reason: 'PLAYBACK_CANCELLED' };

    let generated = generatedAudioCache.get(cleanText);
    if (generated) {
      generatedAudioCache.delete(cleanText);
      generatedAudioCache.set(cleanText, generated);
    } else {
      generated = await tts.generate(cleanText, { speed: 0.9 });
      if (id !== requestId) return { ok: false, reason: 'PLAYBACK_CANCELLED' };
      cacheGeneratedAudio(cleanText, generated.audio, generated.sampleRate || 24000);
    }

    if (resumePromise) {
      try { await resumePromise; } catch { /* Retry below while still in the same audio session. */ }
    }
    if (context.state !== 'running') await context.resume();
    if (id !== requestId) return { ok: false, reason: 'PLAYBACK_CANCELLED' };
    return playBuffer(context, generated.audio, generated.sampleRate || 24000, id, cleanText);
  } catch (error) {
    if (id !== requestId) return { ok: false, reason: 'PLAYBACK_CANCELLED' };
    const neuralReason = error?.message || error?.name || 'NABRA_TTS_FAILED';
    console.warn('[Basyir audio] Neural Arabic TTS unavailable; trying browser voice.', neuralReason);

    const browserResult = await playWithBrowserTTS(cleanText, id);
    if (browserResult.ok || browserResult.reason === 'PLAYBACK_CANCELLED') return browserResult;

    const reason = browserResult.reason || neuralReason;
    const message = reason === 'ARABIC_BROWSER_VOICE_UNAVAILABLE'
      ? 'Suara Arab belum tersedia. Tunggu mesin neural selesai memuat. Jika masih gagal, instal paket bahasa Arab di Windows lalu buka ulang Chrome.'
      : 'Audio Arab gagal diputar. Periksa koneksi internet saat pemakaian pertama, lalu coba kembali di Chrome atau Edge terbaru.';
    reportStatus('error', message, reason, { text: cleanText });
    return { ok: false, reason };
  }
}

export async function preloadAudio() {
  return {
    requested: 0,
    cached: generatedAudioCache.size,
    engineReady: Boolean(ttsInstance),
    engine: ttsInstance?.device || 'not-loaded'
  };
}

export function getAudioDiagnostics() {
  const voices = typeof window !== 'undefined' && window.speechSynthesis
    ? window.speechSynthesis.getVoices()
    : [];
  return {
    engine: 'nabra-neural-arabic-msa-with-browser-fallback',
    neuralEngineAvailable: Boolean(ttsInstance),
    neuralEngineLoading: Boolean(ttsPromise && !ttsInstance),
    neuralDevice: ttsInstance?.device || null,
    browserTTSAvailable: typeof window !== 'undefined' && Boolean(window.speechSynthesis),
    arabicBrowserVoiceAvailable: Boolean(selectArabicVoice(voices)),
    arabicBrowserVoiceNames: voices.filter((voice) => /^ar([_-]|$)/i.test(voice.lang || '')).map((voice) => voice.name),
    webAudioAvailable: typeof window !== 'undefined' && Boolean(window.AudioContext || window.webkitAudioContext),
    audioContextState: audioContext?.state || 'not-created',
    cachedPhrases: generatedAudioCache.size
  };
}
