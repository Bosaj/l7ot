// Downloads native Arabic pronunciation MP3s for all 22 Moroccan fish species into public/audio/fish/
import { mkdir, writeFile } from 'node:fs/promises'

const FISH_SPEECH_AR = {
  'sardine': 'السَّرْدِين المغربي، ويُسمّى في الشمال سَرْدِينَة وفي سوس تازنكارت',
  'merlan': 'المِيرْلَا البيضاء، وتُسمّى في طنجة بيسكاديا',
  'dorade-royale': 'الزّرِيقَة الملكية، أو الدُّورَاد وتُسمّى في الشمال البَارْغُو',
  'sole': 'سمك الصُّول، ويُسمّى حُوت موسى أو اللِّنْغوَادُو في الشمال',
  'courbine': 'القُرْب الملكي، أو الكُورْبِينَة وأَزْلَمْزَا في الجنوب',
  'espadon': 'إِسْبَادُون، سيف البحر، أو بُوسِيف في الدار البيضاء والرباط',
  'calamar': 'الكَالامَار، الحَبَّار المغربي، أو الخَطَّاف في طنجة وتطوان',
  'poulpe': 'الرُّوطَالَة، الأخطبوط المغربي، أو البُولْبُو في الشمال وأَزَايْز في سوس والداخلة',
  'crevette': 'الكْرُوفِيت الوردي، القَمْرُون المغربي، أو الكَامْبَا في الشمال',
  'anchois': 'الشُّطُون المغربي، الأَنْشُوبَة، أو البُوكِيرُون في طنجة والحسيمة',
  'pageot': 'البَاجُو الملكي، البُوقَة الحمراء، أو الفُورَاسِيرُو في طنجة وأصيلة',
  'chinchard': 'الشَّرْن المغربي، ويُسمّى الشَّخَّار في الشمال وأَكْلَاز في سوس',
  'congre': 'الفَرْخ البحري، أو الصَّنُّور في تطوان وسلا والرباط',
  'raie': 'الرَّايَة البحرية المغربية، وتُسمّى تَافْغَالْت بالأمازيغية',
  'bar-loup': 'الدَّرْعِي الأطلسي، ويُسمّى بُوشُوك أو اللُّوبِين في الشمال',
  'mulet': 'البُورِي المغربي، ويُسمّى كَابُوسُو في طنجة والركال في الوسط',
  'maquereau': 'كَبَايْلَا، الإسْقُمْرِي المغربي، أو زْرِيرَق في آسفي والصويرة',
  'thon-rouge': 'التُّون الأحمر المغربي، البُونِيتُو، أو البَاكُورَة في المضيق والعرائش',
  'sabre': 'السَّمْطَة الفضية، وتُسمّى السَّبْتَة في طنجة والعرائش',
  'rouget': 'الرُّوجِي ديال الحجر، سُلْطَان إبراهيم، أو البَرْمُونِي في الشمال',
  'seiche': 'السِّيبْيَا البحرية، وتُسمّى التْشُوكُو في طنجة وتطوان وأصيلة',
  'moules-bouzroug': 'بُوزْرُوك المغربي، بلح البحر، ويُسمّى المِيخِيلُون في الشمال وتِيغْرِي في سوس',
}

await mkdir('public/audio/fish', { recursive: true })

for (const [id, phrase] of Object.entries(FISH_SPEECH_AR)) {
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ar&client=tw-ob&q=${encodeURIComponent(phrase)}`
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
  })
  if (res.ok) {
    const buf = Buffer.from(await res.arrayBuffer())
    await writeFile(`public/audio/fish/${id}.mp3`, buf)
    console.log('AUDIO OK:', id, buf.length, 'bytes')
  } else {
    console.log('AUDIO FAILED:', id, res.status)
  }
}
