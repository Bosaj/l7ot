// Downloads curated Wikimedia Commons photos into public/images and writes credits.
import { mkdir, writeFile } from 'node:fs/promises'

const UA = 'L7otApp/1.0 (https://github.com/Bosaj/l7ot)'
const picks = {
  'fish/sardine': 'Sardina pilchardus Italy.jpg',
  'fish/merlan': 'Merluccius merluccius.002 - Aquarium Finisterrae.JPG',
  'fish/dorade-royale': 'Daurades royales (Sparus aurata) en bassin (Ifremer 00633-74539 - 29681).jpg',
  'fish/sole': 'Solea solea 1.jpg',
  'fish/courbine': 'Argyrosomus regius LoroParqueTenerife stone basse IMG 4963.JPG',
  'fish/espadon': 'Xiphias gladius in the sea.jpg',
  'fish/calamar': 'Loligo vulgaris.jpg',
  'fish/poulpe': 'Octopus vulgaris 03.jpg',
  'fish/crevette': 'Crevette rose du large (Parapenaeus longirostris) (Ifremer 00682-79444 - 32243).jpg',
  'fish/anchois': 'Anchois commun (Engraulis encrasicolus) (Ifremer 00402-51364).jpg',
  'fish/pageot': 'Pageot commun (Pagellus erythrinus) (Ifremer 00710-82226).jpg',
  'fish/chinchard': 'Trachurus trachurus France.jpg',
  'fish/congre': 'Meeraal Conger conger 1.jpg',
  'fish/raie': 'Rajidae Raja clavata 2.jpg',
  'fish/bar-loup': 'Bar commun (Dicentrarchus labrax) (Ifremer 00572-68449 - 26366).jpg',
  'fish/mulet': 'Mújol (Mugil cephalus), Parque natural de la Arrábida, Portugal, 2021-09-09, DD 25.jpg',
  'fish/maquereau': 'Atlantic mackerel (Scomber scombrus).jpg',
  'fish/thon-rouge': 'Thunnus thynnus Croatia.jpg',
  'fish/sabre': 'Lepidopus caudatus - Mercado Municipal Funchal 01.jpg',
  'fish/rouget': 'Salmonete de roca (Mullus surmuletus), Parque natural de la Arrábida, Portugal, 2020-07-21, DD 59.jpg',
  'fish/seiche': 'Sepia común (Sepia officinalis), Parque natural de la Arrábida, Portugal, 2020-07-21, DD 62.jpg',
  'fish/moules-bouzroug': 'Perna perna 02.jpg',
  'recipes/sardines-mchermline': 'Grilled sardines.jpg',
  'recipes/tagine-kouari-sardine': 'Tajine kefta (8348397161).jpg',
  'recipes/tagine-l7ot-khodra': 'Tagine au poisson.jpeg',
  'recipes/crevettes-pil-pil': 'Gambas al ajillo.jpg',
  'recipes/pastilla-l7ot-royale': 'Pastilla Seafood.jpg',
  'recipes/pageot-royal-au-four': 'Dorade royale grillée.jpg',
  'recipes/friture-mixte-marocaine': 'Fritto misto di pesce con limone.jpg',
  'recipes/calamar-farci-marocain': 'Kalamar dolma.jpg',
  'recipes/chorba-l7ot-marocaine': 'Seafood stew.jpg',
  'recipes/tagine-bouzroug-essaouira': 'Moules marinières.jpg',
  'recipes/brochettes-espadon-grille': "Brochette d'espadon à Georgioúpoli (Crète) en juillet 2021.jpg",
}
// Optional: node download-images.mjs key1 key2  -> only (re)download those keys and merge credits
const only = process.argv.slice(2)
if (only.length) for (const k of Object.keys(picks)) if (!only.includes(k)) delete picks[k]
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
import { readFile } from 'node:fs/promises'
let credits = {}
if (only.length) credits = JSON.parse(await readFile('public/images/CREDITS.json', 'utf8'))
await mkdir('public/images/fish', { recursive: true })
await mkdir('public/images/recipes', { recursive: true })

for (const [key, file] of Object.entries(picks)) {
  const api =
    'https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=1000' +
    `&titles=${encodeURIComponent('File:' + file)}`
  const j = await (await fetch(api, { headers: { 'User-Agent': UA } })).json()
  const page = Object.values(j.query.pages)[0]
  const ii = page.imageinfo?.[0]
  if (!ii) { console.log('MISSING', key, file); continue }
  let ok = false
  for (let attempt = 0; attempt < 4 && !ok; attempt++) {
    const r = await fetch(ii.thumburl, { headers: { 'User-Agent': UA } })
    if (r.ok) {
      await writeFile(`public/images/${key}.jpg`, Buffer.from(await r.arrayBuffer()))
      ok = true
    } else {
      await sleep(2000 * (attempt + 1))
    }
  }
  const m = ii.extmetadata ?? {}
  credits[key] = {
    file,
    page: ii.descriptionurl,
    author: (m.Artist?.value ?? '').replace(/<[^>]+>/g, '').trim(),
    license: m.LicenseShortName?.value ?? '',
  }
  console.log(ok ? 'OK     ' : 'FAILED ', key)
  await sleep(1500)
}
await writeFile('public/images/CREDITS.json', JSON.stringify(credits, null, 2))

