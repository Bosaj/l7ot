// Downloads curated Wikimedia Commons photos into public/images and writes credits.
import { mkdir, writeFile } from 'node:fs/promises'

/**
 * Sanitizes untrusted metadata strings by stripping HTML tags iteratively
 * and neutralizing residual markup characters to prevent HTML element injection.
 * Fully complies with CodeQL rule js/incomplete-multi-character-sanitization (CWE-116).
 */
function sanitizeHtml(input) {
  if (typeof input !== 'string') return ''
  let sanitized = input
  let previous
  do {
    previous = sanitized
    sanitized = sanitized.replace(/<[^>]*>/g, '')
  } while (sanitized !== previous)
  return sanitized.replace(/[<>]/g, '').trim()
}

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
  'fish/sar-sargo': 'Sargo común (Diplodus sargus), Parque natural de la Arrábida, Portugal, 2020-07-21, DD 56.jpg',
  'fish/saint-pierre': 'Zeus.faber.jpg',
  'fish/dentex-merjane': 'Dentón común (Dentex dentex), Cabo de Palos, España, 2022-07-15, DD 59.jpg',
  'fish/bonite-sarda': 'Sarda sarda.jpg',
  'fish/roussette-chien': 'Scyliorhinus canicula.jpg',
  'fish/langouste-royale': 'Langosta común (Palinurus elephas), Parque natural de la Arrábida, Portugal, 2023-07-27, DD 12.jpg',
  'fish/crabe-araignee': 'Maja squinado.jpg',
  'fish/huitre-oualidia': 'Crassostrea gigas 01.jpg',
  'fish/palourde-coquillage': 'Ruditapes decussatus 01.jpg',
  'fish/bogue-bouga': 'Boga (Boops boops), franja marina Teno-Rasca, Tenerife, España, 2022-01-08, DD 99.jpg',
  'fish/merou-brun': 'Epinephelus marginatus 1.jpg',
  'fish/lotte-baudroie': 'Lophius piscatorius.jpg',
  'fish/turbot': 'Scophthalmus maximus 1.jpg',
  'fish/marbre': 'Herrera (Lithognathus mormyrus), Parque natural de la Arrábida, Portugal, 2020-07-21, DD 53.jpg',
  'fish/sar-tambour': 'Diplodus cervinus cervinus 2.jpg',
  'fish/liche-amie': 'Lichia amia 1.jpg',
  'fish/rascasse-rouge': 'Scorpaena scrofa 1.jpg',
  'fish/ombrine': 'Umbrina cirrosa.jpg',
  'fish/homard-europeen': 'Homarus gammarus 01.jpg',
  'fish/dorade-grise': 'Spondyliosoma cantharus 1.jpg',
  'fish/cernier': 'Polyprion americanus.jpg',
  'fish/grande-vive': 'Trachinus draco 2.jpg',
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
  'recipes/tagine-farkh-zbib': 'Octopus Tagine.jpg',
  'recipes/raie-mchermla-citron': 'Raie au beurre et câpres.jpg',
  'recipes/thon-confit-maison': '12-atun-encebollado1.jpg',
  'recipes/chergou-farci-vermicelle': 'Poisson au four.JPG',
  'recipes/choco-seiche-tangeroise': 'Hot butter cuttlefish in a bowl.jpg',
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
    author: sanitizeHtml(m.Artist?.value ?? ''),
    license: m.LicenseShortName?.value ?? '',
  }
  console.log(ok ? 'OK     ' : 'FAILED ', key)
  await sleep(1500)
}
await writeFile('public/images/CREDITS.json', JSON.stringify(credits, null, 2))

