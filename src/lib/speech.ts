let activeAudio: HTMLAudioElement | null = null

const ARABIC_NAME_TO_ID: Record<string, string> = {
  سردين: 'sardine',
  ميرلا: 'merlan',
  'الزريقة (الدوراد)': 'dorade-royale',
  الزريقة: 'dorade-royale',
  صول: 'sole',
  القرب: 'courbine',
  إسبادون: 'espadon',
  كالامار: 'calamar',
  الروطالة: 'poulpe',
  'الكروفيت (القمرون)': 'crevette',
  الكروفيت: 'crevette',
  الشطون: 'anchois',
  'الباجو الملكي': 'pageot',
  الشرن: 'chinchard',
  الفرخ: 'congre',
  الراية: 'raie',
  الدرعي: 'bar-loup',
  البوري: 'mulet',
  كبايلا: 'maquereau',
  'التون الأحمر': 'thon-rouge',
  السمطة: 'sabre',
  الروجي: 'rouget',
  السيبيا: 'seiche',
  بوزروك: 'moules-bouzroug',
  الشرغو: 'sar-sargo',
  'حوت سيدنا سليمان': 'saint-pierre',
  المرجان: 'dentex-merjane',
  البونيتو: 'bonite-sarda',
  'كلب البحر': 'roussette-chien',
  لانكوست: 'langouste-royale',
  بوجنبة: 'crabe-araignee',
  'محار الواليدية': 'huitre-oualidia',
  المتيل: 'palourde-coquillage',
  البوقة: 'bogue-bouga',
}

export function speakDarija(
  text: string,
  phoneticFallback?: string,
  fishId?: string
): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  // Stop any active HTML5 audio or speechSynthesis
  if (activeAudio) {
    try {
      activeAudio.pause()
      activeAudio.currentTime = 0
    } catch {
      // ignore
    }
    activeAudio = null
  }

  const resolvedId = fishId || ARABIC_NAME_TO_ID[text.trim()]

  // 1. Primary: Play local native Arabic MP3 recording if available
  if (resolvedId && typeof Audio !== 'undefined') {
    try {
      const audio = new Audio(`/audio/fish/${resolvedId}.mp3`)
      activeAudio = audio
      const playPromise = audio.play()
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          fallbackWebSpeech(text, phoneticFallback)
        })
      }
      return true
    } catch {
      // Fall through to Web Speech API
    }
  }

  return fallbackWebSpeech(text, phoneticFallback)
}

function fallbackWebSpeech(text: string, phoneticFallback?: string): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false
  }

  try {
    window.speechSynthesis.cancel()

    const voices = window.speechSynthesis.getVoices()
    const arabicVoice = voices.find(
      (v) => v.lang.toLowerCase().startsWith('ar')
    )

    // Strip hyphens so a fallback TTS never spells letters out
    const cleanPhonetic = phoneticFallback
      ? phoneticFallback.replace(/-/g, ' ')
      : text

    const utterance = new SpeechSynthesisUtterance(
      arabicVoice ? text : cleanPhonetic
    )
    utterance.rate = 0.88
    utterance.pitch = 1.0

    if (arabicVoice) {
      utterance.voice = arabicVoice
      utterance.lang = arabicVoice.lang
    } else {
      const frenchVoice = voices.find((v) =>
        v.lang.toLowerCase().startsWith('fr')
      )
      if (frenchVoice) {
        utterance.voice = frenchVoice
      }
      utterance.lang = 'fr-FR'
    }

    window.speechSynthesis.speak(utterance)
    return true
  } catch {
    return false
  }
}
