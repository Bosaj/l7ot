import React, { useState } from 'react'
import {
  Scale,
  ShieldCheck,
  AlertTriangle,
  Ruler,
  Compass,
  FileText,
  Search,
  Info,
} from 'lucide-react'
import type { SupportedLanguage } from '../i18n/strings'

interface LegalSpeciesSize {
  id: string
  scientificName: string
  nameAr: string
  nameFr: string
  nameEn: string
  minSizeCm?: number
  minWeightGrams?: number
  category: 'pelagic' | 'demersal' | 'cephalopod' | 'crustacean'
  notesAr: string
  notesFr: string
  notesEn: string
  penaltyAr: string
  penaltyFr: string
  penaltyEn: string
}

const MOROCCAN_LEGAL_SIZES: LegalSpeciesSize[] = [
  {
    id: 'sardine',
    scientificName: 'Sardina pilchardus',
    nameAr: 'السردين (Serdine)',
    nameFr: 'Sardine commune',
    nameEn: 'European Pilchard',
    minSizeCm: 11,
    category: 'pelagic',
    notesAr: 'يُقاس من طرف الخطم (الفم) حتى شوكة الذيل المنفرجة.',
    notesFr: 'Mesuré de la pointe du museau à l’extrémité de la nageoire caudale.',
    notesEn: 'Measured from the tip of the snout to the end of the caudal fin.',
    penaltyAr: 'حجز المصيد وغرامة مالية طبقاً للقانون 15-12 المتعلق بمحاربة الصيد غير القانوني.',
    penaltyFr: 'Saisie immédiate de la cargaison et amende selon la Loi 15-12.',
    penaltyEn: 'Immediate cargo confiscation and fine under Law 15-12 against IUU fishing.',
  },
  {
    id: 'merlan',
    scientificName: 'Merluccius merluccius',
    nameAr: 'الميرلا / ميرلوسة',
    nameFr: 'Merlu blanc / Colin',
    nameEn: 'European Hake',
    minSizeCm: 20,
    category: 'demersal',
    notesAr: 'حماية صغار الميرلا لضمان تجديد مخزون أعماق الأطلسي والعرائش.',
    notesFr: 'Protection stricte des juvéniles pour la reconstitution des stocks.',
    notesEn: 'Strict juvenile protection for Atlantic deep-water stock replenishment.',
    penaltyAr: 'محضر مخالفة من طرف مراقبي مندوبية الصيد ومصادرة فورية للأسماك دون الحجم.',
    penaltyFr: 'Procès-verbal d’infraction et saisie par les inspecteurs de la DPM.',
    penaltyEn: 'Official violation notice and confiscation by fisheries inspectors.',
  },
  {
    id: 'pageot',
    scientificName: 'Pagellus erythrinus / acarne',
    nameAr: 'الباجو / باجو أحمر',
    nameFr: 'Pageot commun / Pageot blanc',
    nameEn: 'Common Pandora / Red Seabream',
    minSizeCm: 15,
    category: 'demersal',
    notesAr: 'الحد الأدنى المسموح به للباجو في موانئ طنجة، الحسيمة، والناظور.',
    notesFr: 'Taille minimale en vigueur dans tous les ports et halles de criée.',
    notesEn: 'Minimum legal commercial landing size across all Moroccan ports.',
    penaltyAr: 'غرامة وحجز من طرف الشرطة المينائية.',
    penaltyFr: 'Amende et confiscation portuaire.',
    penaltyEn: 'Port authority fine and seizure.',
  },
  {
    id: 'bar-loup',
    scientificName: 'Dicentrarchus labrax',
    nameAr: 'الدرعي / اللوبينار (Bar)',
    nameFr: 'Bar européen / Loup de mer',
    nameEn: 'European Sea Bass',
    minSizeCm: 17,
    category: 'demersal',
    notesAr: 'مقاس إجباري للصيد التجاري والرياضي بالقصبة على الشواطئ والجرف الصخري.',
    notesFr: 'Obligation légale pour la pêche artisanale et la pêche sportive côtière.',
    notesEn: 'Mandatory standard for commercial, recreational, and surfcasting anglers.',
    penaltyAr: 'منع التسويق ومصادرة العتاد في حالة التكرار.',
    penaltyFr: 'Interdiction de commercialisation et saisie du matériel en récidive.',
    penaltyEn: 'Marketing ban and potential gear seizure upon repeat violation.',
  },
  {
    id: 'sole',
    scientificName: 'Solea solea',
    nameAr: 'الصول (Sandalia)',
    nameFr: 'Sole commune',
    nameEn: 'Common Dover Sole',
    minSizeCm: 18,
    category: 'demersal',
    notesAr: 'حماية موائل مصبات الأنهار (واد سبو، واد بورقراق، واد سوس).',
    notesFr: 'Préservation des zones de nourriceries estuariennes.',
    notesEn: 'Protection of vital estuarine juvenile nursery zones.',
    penaltyAr: 'غرامة مالية فورية للمراكب المخالفة.',
    penaltyFr: 'Amende forfaitaire sur le navire contrevenant.',
    penaltyEn: 'Statutory fine levied on offending trawlers.',
  },
  {
    id: 'congre',
    scientificName: 'Conger conger',
    nameAr: 'الصنور (Asennour)',
    nameFr: 'Congre d’Europe',
    nameEn: 'European Conger Eel',
    minSizeCm: 58,
    category: 'demersal',
    notesAr: 'أطول مقاس قانوني مفروض لحماية إناث الصنور قبل هجرتها التناسلية العميقة.',
    notesFr: 'Seuil légal le plus élevé pour protéger la reproduction en haute mer.',
    notesEn: 'Highest legal threshold protecting spawning migration.',
    penaltyAr: 'حجز ومصادرة من مراقبي الجودة والبيطرة.',
    penaltyFr: 'Confiscation vétérinaire et halieutique.',
    penaltyEn: 'Veterinary and fisheries confiscation.',
  },
  {
    id: 'espadon',
    scientificName: 'Xiphias gladius',
    nameAr: 'بو سيف (Espadon)',
    nameFr: 'Espadon de Méditerranée et d’Atlantique',
    nameEn: 'Swordfish',
    minSizeCm: 120,
    category: 'pelagic',
    notesAr: '120 سم من الفك السفلي حتى انشقاق الذيل، أو وزن أدنى 25 كلغ (خاضع لنظام الحصص الدولية ICCAT).',
    notesFr: '120 cm (ou 25 kg) selon les quotas internationaux stricts de l’ICCAT.',
    notesEn: '120 cm (or 25 kg) under strict ICCAT international conservation quotas.',
    penaltyAr: 'عقوبات جنائية وحرمان مركب الصيد من رخصة الصيد الدولية.',
    penaltyFr: 'Sanctions pénales et suspension possible de la licence de pêche.',
    penaltyEn: 'Criminal sanctions and suspension of commercial fishing license.',
  },
  {
    id: 'poulpe',
    scientificName: 'Octopus vulgaris',
    nameAr: 'الأخطبوط (الروكبا)',
    nameFr: 'Poulpe commun',
    nameEn: 'Common Octopus',
    minWeightGrams: 500,
    category: 'cephalopod',
    notesAr: '500 غرام كحد أدنى في الساحل الأطلسي الجنوبي (الداخلة/بوجدور) و 400 غرام في المتوسط.',
    notesFr: '500 g au Sud Atlantique (Dakhla/Boujdour), 400 g en Méditerranée.',
    notesEn: '500g in South Atlantic (Dakhla/Boujdour), 400g in Mediterranean.',
    penaltyAr: 'أقصى العقوبات المادية ومصادرة القوارب المخالفة خلال الراحة البيولوجية.',
    penaltyFr: 'Sanctions maximales et saisie d’embarcations lors du repos biologique.',
    penaltyEn: 'Maximum financial penalties and boat seizure during closed biological rests.',
  },
  {
    id: 'merou-brun',
    scientificName: 'Epinephelus marginatus',
    nameAr: 'الميرو (Mérou brun)',
    nameFr: 'Mérou brun / Mérou blanc',
    nameEn: 'Dusky Grouper',
    minSizeCm: 45,
    category: 'demersal',
    notesAr: 'ممنوع صيد أي ميرو يقل عن 45 سم. وخاضع لراحة بيولوجية صارمة كل صيف (1 يوليوز - 31 غشت).',
    notesFr: 'Taille min 45 cm. Repos biologique estival absolu du 1er juillet au 31 août.',
    notesEn: '45 cm min length. Absolute biological resting period from July 1 to August 31.',
    penaltyAr: 'مصادرة عتاد الغطس بالكامل ومتابعة قضائية فورية للصيادين المخالفين.',
    penaltyFr: 'Confiscation totale du matériel de chasse et poursuites pénales.',
    penaltyEn: 'Full seizure of spearfishing equipment and immediate legal prosecution.',
  },
  {
    id: 'dorade-royale',
    scientificName: 'Sparus aurata',
    nameAr: 'الزريقة الملكية / الدواريد',
    nameFr: 'Daurade royale',
    nameEn: 'Gilt-head Seabream',
    minSizeCm: 19,
    category: 'demersal',
    notesAr: 'حماية أمهات الدواريد في بحيرة مارتشيكا والواليدية ومصبات الأنهار.',
    notesFr: 'Protection des géniteurs en lagunes côtières (Marchica, Oualidia).',
    notesEn: 'Spawning adult protection in coastal lagoons (Marchica, Oualidia).',
    penaltyAr: 'غرامة مالية ومصادرة.',
    penaltyFr: 'Amende et confiscation.',
    penaltyEn: 'Fine and confiscation.',
  },
]

export const MaritimeLawGuide: React.FC<{ lang: SupportedLanguage }> = ({ lang }) => {
  const [search, setSearch] = useState('')
  const [filterCat, setFilterCat] = useState<'all' | 'pelagic' | 'demersal' | 'cephalopod' | 'crustacean'>('all')

  const filteredSizes = MOROCCAN_LEGAL_SIZES.filter((item) => {
    const matchesCat = filterCat === 'all' || item.category === filterCat
    const q = search.toLowerCase().trim()
    const matchesSearch =
      !q ||
      item.nameAr.toLowerCase().includes(q) ||
      item.nameFr.toLowerCase().includes(q) ||
      item.nameEn.toLowerCase().includes(q) ||
      item.scientificName.toLowerCase().includes(q)
    return matchesCat && matchesSearch
  })

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-cyan-500/25 bg-gradient-to-br from-[#0e171b] via-[#101413] to-[#0b0908] p-6 sm:p-8">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/15 px-3 py-1 font-mono text-xs font-bold text-cyan-300">
            <Scale className="h-4 w-4" />
            {lang === 'ar'
              ? 'الترسانة القانونية للصيد البحري بالمغرب'
              : lang === 'fr'
                ? 'Législation Maritime Marocaine & Pêche Durable'
                : 'Moroccan Maritime Law & Sustainable Fisheries'}
          </div>

          <h2 className="font-editorial text-2xl sm:text-4xl font-bold tracking-tight text-[#f6f1e7]">
            {lang === 'ar'
              ? 'دليل المقاسات القانونية الأدنى وقوانين الصيد بالغطس الحر'
              : lang === 'fr'
                ? 'Guide Officiel des Tailles Minimales & Réglementation Chasse Sous-Marine'
                : 'Official Minimum Catch Sizes & Spearfishing Regulations Guide'}
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-[#b5a592]">
            {lang === 'ar'
              ? 'تعتمد المملكة المغربية معايير بيولوجية دقيقة لحماية الثروة السمكية في واجهتيها الأطلسية والمتوسطية، وفقاً للظهير الشريف لسنة 1973، والقانون رقم 15-12، وقرار وزير الصيد البحري رقم 1154-88 المنظم للمقاسات التجارية الدنيا.'
              : lang === 'fr'
                ? 'Le Maroc applique des normes biologiques rigoureuses sur ses 3 500 km de côtes, encadrées par le Dahir de 1973, la Loi 15-12 anti-pêche INN et l’Arrêté 1154-88 régissant les tailles marchandes minimales et le repos biologique.'
                : 'Morocco enforces strict conservation standards along its 3,500 km coastline under the 1973 Dahir, Law 15-12 against IUU fishing, and Ministerial Order 1154-88 defining minimum legal catch sizes.'}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-cyan-200/80">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              {lang === 'ar' ? 'الظهير بمثابة قانون 1-73-255' : 'Dahir n° 1-73-255'}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-cyan-400" />
              {lang === 'ar' ? 'القانون 15-12 ضد الصيد غير القانوني' : 'Loi 15-12 (Pêche INN)'}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Ruler className="h-4 w-4 text-amber-400" />
              {lang === 'ar' ? 'القرار الوزاري رقم 1154-88' : 'Arrêté n° 1154-88 (Tailles)'}
            </span>
          </div>
        </div>
      </div>

      {/* Spearfishing & Apnea Regulations Card */}
      <div className="rounded-2xl border border-amber-500/25 bg-[#14100e] p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-300 border border-amber-500/30">
              <Compass className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-editorial text-lg sm:text-xl font-bold text-[#f6f1e7]">
                {lang === 'ar'
                  ? 'القانون المغربي المنظم للصيد بالغطس الحر (Chasse Sous-Marine)'
                  : lang === 'fr'
                    ? 'Réglementation Marocaine de la Chasse Sous-Marine en Apnée'
                    : 'Moroccan Underwater Spearfishing & Free-Diving Regulations'}
              </h3>
              <p className="text-xs text-[#a69b8d]">
                {lang === 'ar'
                  ? 'موجز الشروط الإلزامية لممارسي الغطس وصيادي القصبة والمسدس المائي بالمغرب'
                  : lang === 'fr'
                    ? 'Conditions et règles obligatoires pour la pêche sous-marine récréative au Maroc'
                    : 'Mandatory rules for recreational spearfishing in Moroccan waters'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 pt-2">
          {/* Rule 1 */}
          <div className="rounded-xl border border-[#2a211c] bg-[#0b0908] p-4 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="h-4 w-4" />
              {lang === 'ar' ? 'الغطس الحر (الأنبوبة ممنوعة)' : 'Apnée pure exclusive'}
            </div>
            <p className="text-xs text-[#b5a592] leading-relaxed">
              {lang === 'ar'
                ? 'الصيد مسموح فقط بالغطس الحر (Apnée). استخدام قنينات الأكسجين أو أي جهاز تنفس اصطناعي جريمة يعاقب عليها القانون بمصادرة المعدات والغرامة.'
                : lang === 'fr'
                  ? 'Strictement limité à l’apnée pure. L’usage de bouteilles de plongée (scaphandre autonome) constitue une infraction pénale majeure.'
                  : 'Strictly limited to free-diving (apnea). Using scuba gear or oxygen tanks is a serious criminal offense.'}
            </p>
          </div>

          {/* Rule 2 */}
          <div className="rounded-xl border border-[#2a211c] bg-[#0b0908] p-4 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <Scale className="h-4 w-4" />
              {lang === 'ar' ? 'استهلاك شخصي (البيع ممنوع)' : 'Consommation personnelle'}
            </div>
            <p className="text-xs text-[#b5a592] leading-relaxed">
              {lang === 'ar'
                ? 'حصيلة الصيد بالغطس مخصصة للاستهلاك العائلي والشخصي فقط. يُمنع منعاً كلياً بيع الحوت للمطاعم أو في أسواق السمك.'
                : lang === 'fr'
                  ? 'Prises destinées exclusivement à la consommation personnelle. Revente aux poissonniers ou restaurants strictement illégale.'
                  : 'Catches are strictly for personal and family consumption. Reselling to restaurants or fishmongers is strictly illegal.'}
            </p>
          </div>

          {/* Rule 3 */}
          <div className="rounded-xl border border-[#2a211c] bg-[#0b0908] p-4 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4" />
              {lang === 'ar' ? 'العوامة والرخصة السنوية' : 'Bouée de sécurité & Licence'}
            </div>
            <p className="text-xs text-[#b5a592] leading-relaxed">
              {lang === 'ar'
                ? 'إلزامية سحب العوامة السطحية البرتقالية مع الراية التحذيرية (Alpha Flag)، والحصول على رخصة سنوية من مندوبية الصيد البحري (DPM).'
                : lang === 'fr'
                  ? 'Bouée de signalisation orange avec pavillon Alpha obligatoire à la surface, et licence annuelle délivrée par la DPM.'
                  : 'Mandatory orange surface float with Alpha dive flag and annual spearfishing license from the maritime delegation (DPM).'}
            </p>
          </div>

          {/* Rule 4 */}
          <div className="rounded-xl border border-[#2a211c] bg-[#0b0908] p-4 space-y-2">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
              <Info className="h-4 w-4" />
              {lang === 'ar' ? 'الصيد بالنهار فقط' : 'Période diurne stricte'}
            </div>
            <p className="text-xs text-[#b5a592] leading-relaxed">
              {lang === 'ar'
                ? 'الصيد مسموح فقط بين شروق الشمس وغروبها. الصيد الليلي بالمسدس والأنوار الكاشفة ممنوع منعاً باتاً للحفاظ على الحوت النائم.'
                : lang === 'fr'
                  ? 'Chasse autorisée uniquement entre le lever et le coucher du soleil. Chasse sous-marine de nuit formellement proscrite.'
                  : 'Spearfishing is strictly permitted between sunrise and sunset. Night spearfishing is completely prohibited.'}
            </p>
          </div>

          {/* Rule 5 */}
          <div className="rounded-xl border border-[#2a211c] bg-[#0b0908] p-4 space-y-2">
            <div className="flex items-center gap-2 text-rose-300 font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="h-4 w-4" />
              {lang === 'ar' ? 'الراحة البيولوجية للميرو' : 'Repos biologique Mérou'}
            </div>
            <p className="text-xs text-[#b5a592] leading-relaxed">
              {lang === 'ar'
                ? 'يُمنع صيد سمك الميرو بالغطس في كامل السواحل المغربية من 1 يوليوز إلى 31 غشت سنوياً لحماية موسم التزاوج والتكاثر.'
                : lang === 'fr'
                  ? 'Interdiction totale de chasse du mérou du 1er juillet au 31 août afin de protéger la période de fraie.'
                  : 'Complete ban on spearfishing grouper from July 1 to August 31 to safeguard peak summer spawning.'}
            </p>
          </div>

          {/* Rule 6 */}
          <div className="rounded-xl border border-[#2a211c] bg-[#0b0908] p-4 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <Ruler className="h-4 w-4" />
              {lang === 'ar' ? 'احترام المقاس الأدنى' : 'Respect des tailles minimales'}
            </div>
            <p className="text-xs text-[#b5a592] leading-relaxed">
              {lang === 'ar'
                ? 'لا يجوز ضرب أي سمكة يقل طولها عن المقاس القانوني (مثل الدرعي أقل من 17 سم أو الميرو أقل من 45 سم أو الأخطبوط أقل من 500 غرام).'
                : lang === 'fr'
                  ? 'Obligation absolue d’épargner tout poisson sous la taille marchande légale (Bar < 17 cm, Mérou < 45 cm).'
                  : 'Strict obligation to spare any fish below the legal landing size (Sea Bass < 17 cm, Grouper < 45 cm).'}
            </p>
          </div>
        </div>
      </div>

      {/* Minimum Legal Sizes Interactive Table */}
      <div className="rounded-2xl border border-[#2a211c] bg-[#120e0c] p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-editorial text-xl font-bold text-[#f6f1e7] flex items-center gap-2">
              <Ruler className="h-5 w-5 text-amber-400" />
              {lang === 'ar'
                ? 'جدول المقاسات التجارية الدنيا المعتمدة (القرار 1154-88)'
                : lang === 'fr'
                  ? 'Tableau Officiel des Tailles Marchandes Minimales (Arrêté 1154-88)'
                  : 'Official Minimum Legal Sizes Table (Order 1154-88)'}
            </h3>
            <p className="text-xs text-[#a69b8d]">
              {lang === 'ar'
                ? 'ابحث بالاسم أو صف حسب فئة الأسماك للتأكد من قانونية الصيد والشراء'
                : lang === 'fr'
                  ? 'Vérifiez la taille légale autorisée par espèce pour les achats au souk ou la pêche'
                  : 'Verify legal minimum commercial sizes by species for souk purchases or fishing'}
            </p>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#a69b8d]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={lang === 'ar' ? 'بحث عن نوع الحوت...' : 'Rechercher un poisson...'}
                className="w-48 sm:w-60 rounded-xl border border-[#2a211c] bg-[#0b0908] py-1.5 pl-8 pr-3 text-xs text-[#f6f1e7] placeholder-[#a69b8d]/60 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <select
              value={filterCat}
              onChange={(e) => setFilterCat(e.target.value as any)}
              className="rounded-xl border border-[#2a211c] bg-[#0b0908] px-3 py-1.5 text-xs text-[#f6f1e7] focus:border-amber-500 focus:outline-none"
            >
              <option value="all">{lang === 'ar' ? 'جميع الفئات' : 'Toutes catégories'}</option>
              <option value="pelagic">{lang === 'ar' ? 'الأسماك السطحية (Pelagics)' : 'Pélagiques'}</option>
              <option value="demersal">{lang === 'ar' ? 'أسماك القاع البيضاء (Démersaux)' : 'Démersaux'}</option>
              <option value="cephalopod">{lang === 'ar' ? 'الرخويات (Poulpe/Calmar)' : 'Céphalopodes'}</option>
            </select>
          </div>
        </div>

        {/* Legal Size Cards Grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSizes.map((spec) => (
            <div
              key={spec.id}
              className="group relative flex flex-col justify-between rounded-xl border border-[#2a211c] bg-[#0b0908] p-4 transition-all hover:border-amber-500/40 hover:bg-[#14100e]"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-editorial text-base font-bold text-[#f6f1e7]">
                      {lang === 'ar' ? spec.nameAr : lang === 'fr' ? spec.nameFr : spec.nameEn}
                    </h4>
                    <span className="font-mono text-[11px] italic text-[#a69b8d]">
                      {spec.scientificName}
                    </span>
                  </div>

                  <span className="shrink-0 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-xs font-bold text-emerald-400">
                    {spec.minSizeCm ? `≥ ${spec.minSizeCm} cm` : `≥ ${spec.minWeightGrams} g`}
                  </span>
                </div>

                {/* Visual Fish Size Gauge */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[10px] font-mono text-[#a69b8d]">
                    <span>{lang === 'ar' ? '0 سم' : '0 cm'}</span>
                    <span className="text-emerald-400 font-bold">
                      {lang === 'ar' ? `المقاس الأدنى: ${spec.minSizeCm || spec.minWeightGrams}` : `Min: ${spec.minSizeCm || spec.minWeightGrams}`}
                    </span>
                    <span>{lang === 'ar' ? 'بالغ (+)' : 'Adulte'}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[#1b1512] flex">
                    <div className="h-full bg-rose-500/50 w-1/3" title="Zone interdite (Sous-taille)" />
                    <div className="h-full bg-emerald-500 w-2/3" title="Zone légale autorisée" />
                  </div>
                </div>

                <p className="text-xs text-[#b5a592] leading-relaxed pt-1">
                  {lang === 'ar' ? spec.notesAr : lang === 'fr' ? spec.notesFr : spec.notesEn}
                </p>
              </div>

              <div className="mt-3 border-t border-[#2a211c] pt-2 text-[11px] text-rose-300/80">
                <span className="font-bold text-rose-400">
                  {lang === 'ar' ? '⚠️ العقوبة:' : '⚠️ Sanction :'}
                </span>{' '}
                {lang === 'ar' ? spec.penaltyAr : lang === 'fr' ? spec.penaltyFr : spec.penaltyEn}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
