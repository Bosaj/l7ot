export function speakDarija(text: string, phoneticFallback?: string): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false
  }

  try {
    window.speechSynthesis.cancel() // Stop any previous speech

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.85 // slightly slower for clear Darija pronunciation
    utterance.pitch = 1.0

    // Search for Arabic voices
    const voices = window.speechSynthesis.getVoices()
    const arabicVoice = voices.find(
      (v) => v.lang.startsWith('ar') || v.lang.includes('AR')
    )

    if (arabicVoice) {
      utterance.voice = arabicVoice
      utterance.lang = arabicVoice.lang
    } else {
      utterance.lang = 'ar-MA'
      // If no arabic voice is found, use phonetic Latin
      if (phoneticFallback) {
        utterance.text = phoneticFallback
        utterance.lang = 'fr-FR'
      }
    }

    window.speechSynthesis.speak(utterance)
    return true
  } catch {
    return false
  }
}
