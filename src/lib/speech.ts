import { getAssetUrl } from './assetHelper'
import type { SupportedLanguage } from '../i18n/strings'

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
  الميرو: 'merou-brun',
  بوجوخ: 'lotte-baudroie',
  التوربو: 'turbot',
  المرمير: 'marbre',
  'الشارغو طمبور': 'sar-tambour',
  الليشا: 'liche-amie',
  البوكشاش: 'rascasse-rouge',
  الأومبرينا: 'ombrine',
  'الهومار الملكي': 'homard-europeen',
  الخنزيرة: 'dorade-grise',
  البصري: 'cernier',
  'الحوتة السامة': 'grande-vive',
}

export function speakDarija(
  text: string,
  phoneticFallback?: string,
  fishId?: string,
  lang: SupportedLanguage = 'ar'
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

  // 1. Primary: Play studio natural neural recording matching active language
  if (resolvedId && typeof Audio !== 'undefined') {
    try {
      const langFolder = lang === 'fr' ? 'fr' : lang === 'en' ? 'en' : 'ar'
      const audioUrl = getAssetUrl(`audio/fish/${langFolder}/${resolvedId}.mp3`)
      const audio = new Audio(audioUrl)
      activeAudio = audio

      const playPromise = audio.play()
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          // Try root fallback or Web Speech
          try {
            const fallbackAudio = new Audio(getAssetUrl(`audio/fish/${resolvedId}.mp3`))
            activeAudio = fallbackAudio
            fallbackAudio.play().catch(() => {
              fallbackWebSpeech(text, phoneticFallback, lang)
            })
          } catch {
            fallbackWebSpeech(text, phoneticFallback, lang)
          }
        })
      }
      return true
    } catch {
      // Fall through to Web Speech API
    }
  }

  return fallbackWebSpeech(text, phoneticFallback, lang)
}

function fallbackWebSpeech(
  text: string,
  phoneticFallback?: string,
  lang: SupportedLanguage = 'ar'
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false
  }

  try {
    window.speechSynthesis.cancel()

    const voices = window.speechSynthesis.getVoices()
    let selectedVoice = voices.find((v) =>
      v.lang.toLowerCase().startsWith(lang)
    )

    if (!selectedVoice) {
      if (lang === 'ar') {
        selectedVoice = voices.find((v) => v.lang.toLowerCase().startsWith('fr'))
      } else {
        selectedVoice = voices.find((v) => v.lang.toLowerCase().startsWith('en'))
      }
    }

    // Strip hyphens so a fallback TTS never spells letters out
    const cleanPhonetic = phoneticFallback
      ? phoneticFallback.replace(/-/g, ' ')
      : text

    const utterance = new SpeechSynthesisUtterance(
      lang === 'ar' && selectedVoice?.lang.startsWith('ar') ? text : cleanPhonetic
    )
    utterance.rate = 0.88
    utterance.pitch = 1.0

    if (selectedVoice) {
      utterance.voice = selectedVoice
      utterance.lang = selectedVoice.lang
    } else {
      utterance.lang = lang === 'fr' ? 'fr-FR' : lang === 'en' ? 'en-US' : 'ar-MA'
    }

    window.speechSynthesis.speak(utterance)
    return true
  } catch {
    return false
  }
}
