let bgMusic: HTMLAudioElement | null = null;
let clickAudio: HTMLAudioElement | null = null;
let jumpAudio: HTMLAudioElement | null = null;
let dayMusic: HTMLAudioElement | null = null;
let dayMusicSrc = "";

let bgShouldPlay = false;
let dayShouldPlay = false;

function ensureBg() {
  if (!bgMusic) {
    bgMusic = new Audio("/music/bg_music_main.mp3");
    bgMusic.loop = true;
    bgMusic.volume = 0.35;
  }
  return bgMusic;
}

function tryPlay(m: HTMLAudioElement) {
  if (!m.paused) return;
  m.play().catch(() => {});
}

export function playBgMusic() {
  bgShouldPlay = true;
  const m = ensureBg();
  if (!m.paused) return;
  m.play().catch(() => {});
}

export function pauseBgMusic() {
  bgShouldPlay = false;
  bgMusic?.pause();
}

export function playDayMusic(src: string) {
  dayShouldPlay = true;
  if (!dayMusic || dayMusicSrc !== src) {
    dayMusic?.pause();
    dayMusic = new Audio(src);
    dayMusic.loop = true;
    dayMusic.volume = 0.35;
    dayMusicSrc = src;
  }
  if (!dayMusic.paused) return;
  dayMusic.play().catch(() => {});
}

export function stopDayMusic() {
  dayShouldPlay = false;
  if (dayMusic) {
    dayMusic.pause();
    dayMusic.currentTime = 0;
    dayMusic = null;
    dayMusicSrc = "";
  }
}

// Call from any direct click/tap handler so the browser grants the audio
// context within a trusted user gesture. Also resumes bg/day music if blocked.
export function playClick() {
  if (!clickAudio) {
    clickAudio = new Audio("/music/fx_1.mp3");
    clickAudio.volume = 0.3;
  }
  clickAudio.currentTime = 0;
  clickAudio.play().catch(() => {});

  if (bgShouldPlay) tryPlay(ensureBg());
}

export function playJump() {
  if (!jumpAudio) {
    jumpAudio = new Audio("/music/jump.mp3");
    jumpAudio.volume = 0.6;
  }
  jumpAudio.currentTime = 0;
  jumpAudio.play().catch(() => {});
}

let airplaneAudio: HTMLAudioElement | null = null;

export function playAirplaneSfx() {
  if (!airplaneAudio) {
    airplaneAudio = new Audio("/music/airplane_sfx.mp3");
    airplaneAudio.volume = 0.5;
  }
  airplaneAudio.currentTime = 0;
  airplaneAudio.play().catch(() => {});
}

(function installUnlock() {
  const unlock = () => {
    if (bgShouldPlay) tryPlay(ensureBg());
    if (dayShouldPlay && dayMusic) tryPlay(dayMusic);
    ["pointerdown", "keydown", "touchstart"].forEach((e) =>
      window.removeEventListener(e, unlock),
    );
  };
  ["pointerdown", "keydown", "touchstart"].forEach((e) =>
    window.addEventListener(e, unlock, { passive: true }),
  );
})();
