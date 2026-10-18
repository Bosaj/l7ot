// Searches YouTube and verifies 100% embeddable HTTP 200 status via YouTube oEmbed API
const queries = {
  clean_sardine: 'طريقة تنقية السردين المغربي بدون شوك',
  clean_white_fish: 'طريقة تنقية السمك وتقشيره للفرن',
  clean_sole_raie: 'comment nettoyer peler une sole poissonnier',
  clean_large_fish: 'طريقة تقطيع وتنقية سمك القرب او الفرخ',
  clean_squid_octopus: 'طريقة تنظيف الكلمار والاخطبوط والسيبيا',
  clean_shrimp: 'طريقة تقشير وتنظيف الكروفيت القمرون',
  clean_mussels: 'طريقة تنظيف بوزروك بلح البحر',
  rec_sardine_mchermla: 'سردين مشرمل ومقلي على الطريقة المغربية',
  rec_kouari_sardine: 'طاجين كواري السردين على الطريقة المغربية',
  rec_tagine_l7ot: 'طاجين الحوت بالخضرة والشرمولة المغربية',
  rec_pil_pil: 'كروفيت بيل بيل على الطريقة المغربية',
  rec_pastilla: 'بسطيلة الحوت المغربية الملكية',
  rec_four: 'سمك في الفرن بالشرمولة المغربية',
  rec_friture: 'قلي السمك المقرمش بالسميدة على الطريقة المغربية',
  rec_calamar_farci: 'كالامار معمر بالروز على الطريقة المغربية',
  rec_chorba: 'شوربة السمك المغربية',
  rec_bouzroug: 'طاجين بوزروك على الطريقة المغربية',
  rec_farkh: 'طاجين الفرخ بالبصلة والزبيب',
}

async function findVerifiedVideo(q) {
  const res = await fetch('https://www.youtube.com/results?search_query=' + encodeURIComponent(q), {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Accept-Language': 'ar,fr;q=0.9,en;q=0.8',
    },
  })
  const html = await res.text()
  const ids = [...new Set([...html.matchAll(/"videoId":"([a-zA-Z0-9_-]{11})"/g)].map((m) => m[1]))]
  for (const id of ids.slice(0, 8)) {
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`
    const oRes = await fetch(oembedUrl)
    if (oRes.ok) {
      const info = await oRes.json()
      return { id, title: info.title, author: info.author_name }
    }
  }
  return null
}

;(async () => {
  const results = {}
  for (const [key, q] of Object.entries(queries)) {
    const match = await findVerifiedVideo(q)
    results[key] = match
    console.log(key, '=>', match)
  }
})()
