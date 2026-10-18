const fs = require('fs');
const path = require('path');

const fishFilePath = path.join(__dirname, '../src/data/fish.ts');

// Read the original file
let content = fs.readFileSync(fishFilePath, 'utf8');

const ALL_FISH_ENRICHMENT = {
  'sardine': {
    regionalNames: {
      northChamal: 'بوقيرون / Sardina / بيلتشارد (طنجة، تطوان، الحسيمة)',
      centreAtlantic: 'سردين / Serdine (أسفي، الصويرة، الدار البيضاء)',
      southSoussSahara: 'سردين بلدي / تسكالت (أكادير، طانطان، العيون، الداخلة)',
    },
    pricingDetails: {
      wholesalePortMAD: { min: 5, max: 12, unit: 'kg' },
      retailMarketMAD: { min: 12, max: 25, unit: 'kg' },
      globalExportEUR: { min: 3.5, max: 6.0, unit: 'kg', referenceMarket: 'Mercamadrid & Rungis' },
    },
    nutritionPer100g: {
      caloriesKcal: 208,
      proteinGrams: 24.6,
      lipidsGrams: 11.5,
      omega3Mg: 1480,
      vitaminD_mcg: 4.8,
      vitaminB12_mcg: 8.9,
      iodine_mcg: 40,
      selenium_mcg: 52.7,
      phosphorus_mg: 490,
      calcium_mg: 382,
      iron_mg: 2.9,
      zinc_mg: 1.3,
      magnesium_mg: 39,
      potassium_mg: 397,
      healthHighlights: {
        ar: [
          'أعلى تركيز طبيعي لأحماض أوميغا 3 لحماية القلب والشرايين وخفض الكولسترول الضار',
          'غني بالكالسيوم والفسفور لتعزيز الكثافة العظمية والوقاية من الهشاشة',
          'جرعة مكثفة من فيتامين B12 وفيتامين D3 الطبيعي النادر في الأطعمة الأرضية',
        ],
        fr: [
          'Teneur exceptionnelle en acides gras Oméga-3 (EPA/DHA) cardioprotecteurs',
          'Source majeure de calcium bio-assimilable et de phosphore osseux',
          'Concentration record en vitamine B12 (370% des AJR) et vitamine D3 naturelle',
        ],
        en: [
          'Unrivaled natural density of cardioprotective Omega-3 (EPA/DHA) fatty acids',
          'Superior bioavailable calcium and phosphorus fortifying bone density',
          'Exceptional Vitamin B12 and rare natural Vitamin D3 powering neurological vitality',
        ],
      },
    },
  },
  'merlan': {
    regionalNames: {
      northChamal: 'Pescadilla / بيسكادييا / Merluzo (طنجة، الناظور)',
      centreAtlantic: 'ميرلا / Mirla (المهدية، الدار البيضاء، الجديدة)',
      southSoussSahara: 'الميرلا الجنوبية / النزالي / Nazali (طانطان، الداخلة)',
    },
    pricingDetails: {
      wholesalePortMAD: { min: 25, max: 45, unit: 'kg' },
      retailMarketMAD: { min: 45, max: 85, unit: 'kg' },
      globalExportEUR: { min: 7.5, max: 12.0, unit: 'kg', referenceMarket: 'Rungis & Madrid' },
    },
    nutritionPer100g: {
      caloriesKcal: 90,
      proteinGrams: 19.4,
      lipidsGrams: 0.8,
      omega3Mg: 310,
      vitaminD_mcg: 1.0,
      vitaminB12_mcg: 2.1,
      iodine_mcg: 110,
      selenium_mcg: 38.0,
      phosphorus_mg: 210,
      calcium_mg: 25,
      iron_mg: 0.4,
      zinc_mg: 0.5,
      magnesium_mg: 26,
      potassium_mg: 320,
      healthHighlights: {
        ar: [
          'بروتين نقي فائق الهضم بأقل من 1% دهون، مثالي للحميات وتغذية الرياضيين',
          'تركيز عالٍ من اليود الطبيعي المنشط لوظائف الغدة الدرقية وحرق السعرات',
          'سيلينيوم عضوي قوي لحماية الخلايا ومكافحة الإجهاد التأكسدي',
        ],
        fr: [
          'Protéines pures ultra-digestes avec moins de 1% de lipides',
          'Teneur exceptionnelle en iode soutenant le métabolisme thyroïdien',
          'Forte teneur en sélénium antioxydant protecteur cellulaire',
        ],
        en: [
          'Ultra-lean digestible pure protein under 1% fat, ideal for athlete diets',
          'Abundant marine iodine fueling thyroid function and metabolic efficiency',
          'High antioxidant selenium safeguarding cellular structures',
        ],
      },
    },
  },
  'dorade-royale': {
    regionalNames: {
      northChamal: 'Dorada / دورادا / الزريقة الشمالية (المتوسط، طنجة)',
      centreAtlantic: 'الدوراد الملكية / الزريقة (الرباط، الجديدة، آسفي)',
      southSoussSahara: 'أبراغ / Abragh / الحوتة الذهبية (سوس، طرفاية)',
    },
    pricingDetails: {
      wholesalePortMAD: { min: 50, max: 80, unit: 'kg' },
      retailMarketMAD: { min: 80, max: 130, unit: 'kg' },
      globalExportEUR: { min: 12.0, max: 18.0, unit: 'kg', referenceMarket: 'Marchés européens de gros' },
    },
    nutritionPer100g: {
      caloriesKcal: 121,
      proteinGrams: 20.5,
      lipidsGrams: 3.8,
      omega3Mg: 650,
      vitaminD_mcg: 2.5,
      vitaminB12_mcg: 3.2,
      iodine_mcg: 65,
      selenium_mcg: 45.0,
      phosphorus_mg: 240,
      calcium_mg: 30,
      iron_mg: 0.8,
      zinc_mg: 0.7,
      magnesium_mg: 30,
      potassium_mg: 380,
      healthHighlights: {
        ar: [
          'توازن مثالي بين البروتين والأحماض الدهنية الأساسية لصحة الدماغ',
          'غني بالفسفور والمغنيسيوم لتجديد طاقة الخلايا ومقاومة التعب',
          'لحم صحي يساعد على بناء الكتلة العضلية النقية',
        ],
        fr: [
          'Équilibre parfait en protéines nobles et acides gras essentiels',
          'Source de magnésium et phosphore contre la fatigue chronique',
          'Chair noble idéale pour le développement musculaire sain',
        ],
        en: [
          'Ideal balance of noble protein and essential fatty acids for brain function',
          'Rich in magnesium and phosphorus recharging cellular energy',
          'Premium fish supporting lean muscle mass and endurance',
        ],
      },
    },
  },
  'sole': {
    regionalNames: {
      northChamal: 'Lenguado / لينغوادو (طنجة، أصيلة، العرائش)',
      centreAtlantic: 'الصول / لسان الثور / Sole (الدار البيضاء، المهدية)',
      southSoussSahara: 'إيلس / Iles / لسان البحر (سوس، سيدي إفني)',
    },
    pricingDetails: {
      wholesalePortMAD: { min: 55, max: 85, unit: 'kg' },
      retailMarketMAD: { min: 90, max: 150, unit: 'kg' },
      globalExportEUR: { min: 16.0, max: 24.0, unit: 'kg', referenceMarket: 'Rungis & Paris' },
    },
    nutritionPer100g: {
      caloriesKcal: 86,
      proteinGrams: 18.2,
      lipidsGrams: 1.2,
      omega3Mg: 280,
      vitaminD_mcg: 1.2,
      vitaminB12_mcg: 1.8,
      iodine_mcg: 80,
      selenium_mcg: 32.0,
      phosphorus_mg: 230,
      calcium_mg: 28,
      iron_mg: 0.6,
      zinc_mg: 0.6,
      magnesium_mg: 24,
      potassium_mg: 310,
      healthHighlights: {
        ar: [
          'أخف أنواع الأسماك على الجهاز الهضمي، ممتاز للمعدة الحساسة وفترة النقاهة',
          'سعرات منخفضة جداً (86 سعرة) مع أحماض أمينية كاملة',
          'يدعم صحة القلب والشرايين بنسبة صوديوم متوازنة',
        ],
        fr: [
          'Digestibilité suprême pour estomacs sensibles et convalescents',
          'Très faible apport calorique (86 kcal) avec profil protéique complet',
          'Soutien cardiovasculaire par un équilibre minéral parfait',
        ],
        en: [
          'Supreme gastro-intestinal digestibility for recovery and sensitive stomachs',
          'Ultra-low calorie density (86 kcal) with complete amino acid profile',
          'Maintains vascular equilibrium via natural electrolyte balance',
        ],
      },
    },
  },
  'courbine': {
    regionalNames: {
      northChamal: 'Corvina / كوربينا (مضيق جبل طارق، الناظور)',
      centreAtlantic: 'القرب / Qorb / المعزة البحرية (الدار البيضاء، أسفي)',
      southSoussSahara: 'الكوربين / كربانة / عيشة (طانطان، العيون، الداخلة)',
    },
    pricingDetails: {
      wholesalePortMAD: { min: 40, max: 70, unit: 'kg' },
      retailMarketMAD: { min: 70, max: 120, unit: 'kg' },
      globalExportEUR: { min: 10.0, max: 16.0, unit: 'kg', referenceMarket: 'Mercamadrid & Portugal' },
    },
    nutritionPer100g: {
      caloriesKcal: 105,
      proteinGrams: 21.0,
      lipidsGrams: 2.1,
      omega3Mg: 450,
      vitaminD_mcg: 2.0,
      vitaminB12_mcg: 2.8,
      iodine_mcg: 75,
      selenium_mcg: 40.0,
      phosphorus_mg: 220,
      calcium_mg: 22,
      iron_mg: 0.9,
      zinc_mg: 0.8,
      magnesium_mg: 28,
      potassium_mg: 360,
      healthHighlights: {
        ar: [
          'لحم أبيض كثيف غني بالكولاجين الطبيعي لتقوية المفاصل والغضاريف',
          'غني بالبوتاسيوم لدعم انقباض عضلة القلب وضبط الضغط الشرياني',
          'بروتينات بنائية تسهم في التئام الأنسجة وتجديد خلايا الجلد',
        ],
        fr: [
          'Riche en collagène marin fortifiant les articulations',
          'Teneur élevée en potassium régulant la pression artérielle',
          'Excellente densité nutritionnelle stimulant la régénération cellulaire',
        ],
        en: [
          'Dense meat rich in natural marine collagen strengthening cartilage',
          'High potassium content supporting healthy blood pressure',
          'Promotes rapid tissue repair and skin vitality',
        ],
      },
    },
  },
  'espadon': {
    regionalNames: {
      northChamal: 'Pez Espada / بيث إسبادا (طنجة، أصيلة، العرائش)',
      centreAtlantic: 'الإسبادون / بوسف / Bousif (الدار البيضاء، المهدية)',
      southSoussSahara: 'بومشفا / سياف البحر (أكادير، طرفاية، العيون)',
    },
    pricingDetails: {
      wholesalePortMAD: { min: 60, max: 95, unit: 'kg' },
      retailMarketMAD: { min: 100, max: 160, unit: 'kg' },
      globalExportEUR: { min: 14.0, max: 22.0, unit: 'kg', referenceMarket: 'Espagne & Italie' },
    },
    nutritionPer100g: {
      caloriesKcal: 144,
      proteinGrams: 23.5,
      lipidsGrams: 5.1,
      omega3Mg: 950,
      vitaminD_mcg: 6.2,
      vitaminB12_mcg: 3.5,
      iodine_mcg: 50,
      selenium_mcg: 68.5,
      phosphorus_mg: 280,
      calcium_mg: 18,
      iron_mg: 1.1,
      zinc_mg: 1.2,
      magnesium_mg: 35,
      potassium_mg: 420,
      healthHighlights: {
        ar: [
          'نسبة استثنائية من السيلينيوم المضاد للشيخوخة والمعزز للمناعة الطبيعية',
          'جرعة قوية من فيتامين D لتثبيت الكالسيوم وتقوية الهيكل العظمي',
          'شرائح لحمية خالية من الحسك غنية بالحديد لمكافحة فقر الدم والإرهاق',
        ],
        fr: [
          'Teneur record en sélénium antioxydant renforçant l’immunité',
          'Excellente réserve de vitamine D pour la fixation osseuse',
          'Steak marin riche en fer héminique prévenant l’anémie',
        ],
        en: [
          'Remarkable selenium density boosting immunity and longevity',
          'Potent dose of Vitamin D optimizing bone calcium retention',
          'Steak-like boneless meat rich in iron combating anemia and fatigue',
        ],
      },
    },
  },
  'thon-rouge': {
    regionalNames: {
      northChamal: 'Atún Rojo / التون الأحمر (أصيلة، القصر الصغير، طنجة)',
      centreAtlantic: 'التونة الملكية / التون الطري (الدار البيضاء)',
      southSoussSahara: 'أزوكا الكبير / أوتون (أكادير، سيدي إفني، الداخلة)',
    },
    pricingDetails: {
      wholesalePortMAD: { min: 70, max: 120, unit: 'kg' },
      retailMarketMAD: { min: 120, max: 200, unit: 'kg' },
      globalExportEUR: { min: 25.0, max: 65.0, unit: 'kg', referenceMarket: 'Tokyo Toyosu & Rungis' },
    },
    nutritionPer100g: {
      caloriesKcal: 144,
      proteinGrams: 23.3,
      lipidsGrams: 4.9,
      omega3Mg: 1250,
      vitaminD_mcg: 5.5,
      vitaminB12_mcg: 9.4,
      iodine_mcg: 45,
      selenium_mcg: 90.0,
      phosphorus_mg: 280,
      calcium_mg: 15,
      iron_mg: 1.4,
      zinc_mg: 0.9,
      magnesium_mg: 40,
      potassium_mg: 440,
      healthHighlights: {
        ar: [
          'غذاء النخبة الرياضية: بروتين فائق الجودة وسريع الامتصاص',
          'أعلى تركيز فيتامين B12 وسيلينيوم لدعم الذاكرة وتدفق الدم',
          'أحماض دهنية أوميغا 3 نقية تحمي الدماغ والشرايين التاجية',
        ],
        fr: [
          'Protéines complètes d’élite pour sportifs de haut niveau',
          'Apport exceptionnel en vitamine B12 et sélénium pour la vitalité',
          'Dose massive d’Oméga-3 préservant la santé cognitive et cardiaque',
        ],
        en: [
          'Elite athletic protein source with rapid absorption and complete amino acids',
          'Top-tier Vitamin B12 and selenium density fueling brain vitality',
          'Massive Omega-3 reservoir protecting coronary and cognitive health',
        ],
      },
    },
  },
  'calamar': {
    regionalNames: {
      northChamal: 'Calamar de Playa / كالامار بلبايا (طنجة، المضيق، تطوان)',
      centreAtlantic: 'الكالامار البلدي / Kalamar (الدار البيضاء، أسفي)',
      southSoussSahara: 'تيكيت / Tikit / سبييا الجنوب (الداخلة، بوجدور)',
    },
    pricingDetails: {
      wholesalePortMAD: { min: 60, max: 100, unit: 'kg' },
      retailMarketMAD: { min: 90, max: 160, unit: 'kg' },
      globalExportEUR: { min: 13.0, max: 20.0, unit: 'kg', referenceMarket: 'Mercamadrid & Barcelone' },
    },
    nutritionPer100g: {
      caloriesKcal: 92,
      proteinGrams: 15.6,
      lipidsGrams: 1.4,
      omega3Mg: 490,
      vitaminD_mcg: 0.5,
      vitaminB12_mcg: 1.3,
      iodine_mcg: 65,
      selenium_mcg: 44.8,
      phosphorus_mg: 220,
      calcium_mg: 32,
      iron_mg: 0.7,
      zinc_mg: 1.5,
      magnesium_mg: 33,
      potassium_mg: 280,
      healthHighlights: {
        ar: [
          'غني بالزنك والنحاس العضوي الضروريين لصحة المناعة وتكوين الدم',
          'منخفض السعرات مع ملمس لحمي مشبع يساعد في إنقاص الوزن',
          'مصدر للتورين الطبيعي المنظم لضربات القلب والأوعية',
        ],
        fr: [
          'Concentré en zinc et cuivre stimulant l’immunité et l’hématopoïèse',
          'Faible en calories avec texture rassasiante idéale pour la ligne',
          'Source naturelle de taurine régulatrice du rythme cardiovasculaire',
        ],
        en: [
          'Concentrated in zinc and copper powering immunity and blood synthesis',
          'Low-calorie satiating protein aiding healthy weight loss',
          'Natural source of taurine regulating cardiac rhythm',
        ],
      },
    },
  },
  'poulpe': {
    regionalNames: {
      northChamal: 'Pulpo / بولبو (الناظور، الحسيمة، طنجة)',
      centreAtlantic: 'الأخطبوط / الروكاس / Pwilp (الدار البيضاء، الصويرة)',
      southSoussSahara: 'أزوكا / أزايز / Azayz (الداخلة وبوجدور عاصمة الأخطبوط)',
    },
    pricingDetails: {
      wholesalePortMAD: { min: 65, max: 110, unit: 'kg' },
      retailMarketMAD: { min: 90, max: 150, unit: 'kg' },
      globalExportEUR: { min: 14.0, max: 21.0, unit: 'kg', referenceMarket: 'Tokyo & Espagne' },
    },
    nutritionPer100g: {
      caloriesKcal: 82,
      proteinGrams: 14.9,
      lipidsGrams: 1.0,
      omega3Mg: 350,
      vitaminD_mcg: 0.8,
      vitaminB12_mcg: 20.0,
      iodine_mcg: 90,
      selenium_mcg: 44.8,
      phosphorus_mg: 186,
      calcium_mg: 53,
      iron_mg: 5.3,
      zinc_mg: 1.7,
      magnesium_mg: 30,
      potassium_mg: 350,
      healthHighlights: {
        ar: [
          'قنبلة فيتامين B12 الطبيعي (800% من الاحتياج اليومي) لمحاربة الإرهاق العصبي',
          'أعلى مصدر للحديد البحري (5.3 ملغ) لعلاج فقر الدم وتجديد النشاط',
          'خالٍ من الدهون المشبعة والسكريات ومناسب جداً لمرضى السكري والضغط',
        ],
        fr: [
          'Teneur vertigineuse en vitamine B12 (plus de 800% des AJR) contre l’épuisement',
          'Source record de fer héminique marin (5,3 mg) pour vaincre l’anémie',
          'Aliment diététique pur sans graisses saturées ni sucres',
        ],
        en: [
          'Astounding Vitamin B12 density (over 800% Daily Value) eliminating fatigue',
          'Top-tier marine iron source (5.3 mg) rapidly reversing anemia',
          'Super-lean pure dietary food with zero saturated fat, diabetic-friendly',
        ],
      },
    },
  },
  'crevette': {
    regionalNames: {
      northChamal: 'Gamba Blanca / غامبا بلانكا (العرائش، أصيلة، طنجة)',
      centreAtlantic: 'الكروفيت / Krovit (الدار البيضاء، المهدية، أسفي)',
      southSoussSahara: 'القريدس الملكي / كروفيت رويال (طانطان، بوجدور)',
    },
    pricingDetails: {
      wholesalePortMAD: { min: 60, max: 110, unit: 'kg' },
      retailMarketMAD: { min: 90, max: 180, unit: 'kg' },
      globalExportEUR: { min: 15.0, max: 28.0, unit: 'kg', referenceMarket: 'Marchés européens de la marée' },
    },
    nutritionPer100g: {
      caloriesKcal: 99,
      proteinGrams: 20.9,
      lipidsGrams: 1.1,
      omega3Mg: 540,
      vitaminD_mcg: 0.2,
      vitaminB12_mcg: 1.5,
      iodine_mcg: 100,
      selenium_mcg: 48.0,
      phosphorus_mg: 250,
      calcium_mg: 70,
      iron_mg: 2.4,
      zinc_mg: 1.6,
      magnesium_mg: 35,
      potassium_mg: 260,
      healthHighlights: {
        ar: [
          'مضاد أكسدة فريد (الأستازانتين Astaxanthin) يحمي البشرة والعينين من التلف',
          'غني باليود والزنك لدعم صحة الغدة الدرقية والخصوبة وتجدد الخلايا',
          'بروتين نقي بنسبة 21% بأقل من 100 سعرة حرارية لكل 100 غرام',
        ],
        fr: [
          'Richesse en astaxanthine antioxydante protégeant la peau et la vision',
          'Haute teneur en iode et zinc pour l’équilibre hormonal et métabolique',
          'Protéines pures (21%) avec moins de 100 calories aux 100g',
        ],
        en: [
          'Rich in astaxanthin antioxidant shielding skin and eyesight from degradation',
          'High iodine and zinc content promoting hormonal and metabolic balance',
          'Pure concentrated protein (21%) with under 100 calories per 100g',
        ],
      },
    },
  },
  'sar': {
    regionalNames: {
      northChamal: 'Sargo / سارغو صخري (الجبهة، الحسيمة، كاب سبارتيل)',
      centreAtlantic: 'الشرغو / Chargho بلدي (أسفي، الصويرة، الدار البيضاء)',
      southSoussSahara: 'تافروخ / الشرغو الحجري (ميرلفت، أكادير، الداخلة)',
    },
    pricingDetails: {
      wholesalePortMAD: { min: 35, max: 60, unit: 'kg' },
      retailMarketMAD: { min: 60, max: 95, unit: 'kg' },
      globalExportEUR: { min: 9.0, max: 14.0, unit: 'kg', referenceMarket: 'Mercamadrid & Lisbonne' },
    },
    nutritionPer100g: {
      caloriesKcal: 120,
      proteinGrams: 20.8,
      lipidsGrams: 3.2,
      omega3Mg: 680,
      vitaminD_mcg: 2.2,
      vitaminB12_mcg: 2.9,
      iodine_mcg: 60,
      selenium_mcg: 42.0,
      phosphorus_mg: 230,
      calcium_mg: 35,
      iron_mg: 0.9,
      zinc_mg: 0.8,
      magnesium_mg: 31,
      potassium_mg: 370,
      healthHighlights: {
        ar: [
          'لحم بحري أبيض غني بالمعادن المستخلصة من القشريات التي يتغذى عليها الشرغو بين الصخور',
          'يعزز مناعة الجسم بفضل السيلينيوم والزنك العضوي',
          'بروتين مثالي لبناء النسيج العضلي بدون شحوم زائدة',
        ],
        fr: [
          'Saveur iodée intense issue de son alimentation en crustacés rocheux',
          'Renforce l’immunité par un apport équilibré en zinc et sélénium',
          'Protéine idéale pour le développement musculaire sans graisse',
        ],
        en: [
          'Intense mineral richness derived from its rocky shellfish diet',
          'Strengthens immunity through balanced zinc and organic selenium',
          'Ideal lean protein for muscle development without excess fat',
        ],
      },
    },
  },
  'pageot': {
    regionalNames: {
      northChamal: 'Besugo / بيسوغو / Pagel (طنجة، العرائش، القصر الصغير)',
      centreAtlantic: 'الباجو / الغزال / Pageot Rouge (الدار البيضاء، أسفي)',
      southSoussSahara: 'ورغل / Werghel / باجو الجنوب (سيدي إفني، بوجدور)',
    },
    pricingDetails: {
      wholesalePortMAD: { min: 45, max: 75, unit: 'kg' },
      retailMarketMAD: { min: 75, max: 130, unit: 'kg' },
      globalExportEUR: { min: 11.0, max: 17.0, unit: 'kg', referenceMarket: 'Mercamadrid & Rungis' },
    },
    nutritionPer100g: {
      caloriesKcal: 105,
      proteinGrams: 19.8,
      lipidsGrams: 2.5,
      omega3Mg: 550,
      vitaminD_mcg: 2.0,
      vitaminB12_mcg: 2.6,
      iodine_mcg: 70,
      selenium_mcg: 38.0,
      phosphorus_mg: 220,
      calcium_mg: 32,
      iron_mg: 0.8,
      zinc_mg: 0.7,
      magnesium_mg: 29,
      potassium_mg: 350,
      healthHighlights: {
        ar: [
          'لحم وردي شهي سهل الامتصاص مناسب لجميع الفئات العمرية',
          'غني باليود والفسفور لتنشيط الذاكرة والقدرات الذهنية',
          'أحماض دهنية أوميغا 3 تحافظ على مرونة الشرايين',
        ],
        fr: [
          'Chair fine et rosée hautement digestible pour toute la famille',
          'Richesse en iode et phosphore stimulant la concentration',
          'Acides gras Oméga-3 préservant la souplesse artérielle',
        ],
        en: [
          'Delicate pink flesh effortlessly digested across all ages',
          'Rich in iodine and phosphorus boosting mental acuity and focus',
          'Omega-3 fatty acids preserving arterial elasticity',
        ],
      },
    },
  },
  'rouget': {
    regionalNames: {
      northChamal: 'Salmonete / سالمونيتي دي روكا (طنجة، الناظور، الحسيمة)',
      centreAtlantic: 'الروجي الصخري / Rouget-Barbet (الدار البيضاء، أسفي)',
      southSoussSahara: 'سلطان الحوت / أزمار (أكادير، الداخلة)',
    },
    pricingDetails: {
      wholesalePortMAD: { min: 50, max: 80, unit: 'kg' },
      retailMarketMAD: { min: 80, max: 140, unit: 'kg' },
      globalExportEUR: { min: 14.0, max: 22.0, unit: 'kg', referenceMarket: 'Gastronomie française & espagnole' },
    },
    nutritionPer100g: {
      caloriesKcal: 117,
      proteinGrams: 19.4,
      lipidsGrams: 3.9,
      omega3Mg: 820,
      vitaminD_mcg: 3.0,
      vitaminB12_mcg: 3.8,
      iodine_mcg: 85,
      selenium_mcg: 46.0,
      phosphorus_mg: 240,
      calcium_mg: 40,
      iron_mg: 1.2,
      zinc_mg: 0.9,
      magnesium_mg: 32,
      potassium_mg: 360,
      healthHighlights: {
        ar: [
          'نكهة يودية عميقة ومحتوى استثنائي من فيتامين B12 المنشط',
          'غني بالحديد العضوي وفيتامين D لحماية العظام وتجديد الدم',
          'أوميغا 3 عالية تمنح اللحم مذاقاً فاخراً ومنافع قلبية متقدمة',
        ],
        fr: [
          'Goût iodé raffiné avec un apport tonifiant en vitamine B12',
          'Riche en fer biodisponible et vitamine D protectrice des os',
          'Teneur élevée en Oméga-3 alliant gastronomie et bienfaits vasculaires',
        ],
        en: [
          'Deep iodized gourmet flavor paired with invigorating Vitamin B12',
          'Rich in bioavailable iron and bone-protecting Vitamin D',
          'Generous Omega-3 content merging epicurean pleasure with heart health',
        ],
      },
    },
  },
  'merou': {
    regionalNames: {
      northChamal: 'Mero / ميرو / Cherna عملاقة (طنجة، الفنيدق، الجبهة)',
      centreAtlantic: 'الميرو الصخري / Mérou Blanc / الهامور',
      southSoussSahara: 'إيغير / Ighir / ميرو الجنوب (الداخلة، كاب بارباس)',
    },
    pricingDetails: {
      wholesalePortMAD: { min: 90, max: 150, unit: 'kg' },
      retailMarketMAD: { min: 150, max: 240, unit: 'kg' },
      globalExportEUR: { min: 20.0, max: 35.0, unit: 'kg', referenceMarket: 'Haute gastronomie méditerranéenne' },
    },
    nutritionPer100g: {
      caloriesKcal: 118,
      proteinGrams: 24.8,
      lipidsGrams: 1.8,
      omega3Mg: 420,
      vitaminD_mcg: 1.8,
      vitaminB12_mcg: 3.4,
      iodine_mcg: 70,
      selenium_mcg: 50.0,
      phosphorus_mg: 260,
      calcium_mg: 20,
      iron_mg: 1.0,
      zinc_mg: 1.1,
      magnesium_mg: 38,
      potassium_mg: 460,
      healthHighlights: {
        ar: [
          'سيد الأسماك الصخرية بتركيز بروتيني عملاق (25 غرام) لبناء الألياف العضلية',
          'غني بالبوتاسيوم والمغنيسيوم لتنظيم كهرباء القلب ومكافحة الشد العضلي',
          'قليل الدهون المشبعة ومصدر رائع للكولاجين البحري المقوي للأوتار',
        ],
        fr: [
          'Roi des fonds rocheux avec un apport protéique colossal (25g)',
          'Teneur élevée en potassium et magnésium prévenant les crampes musculaires',
          'Très faible en graisses avec un collagène marin fortifiant les tendons',
        ],
        en: [
          'King of rocky sea bottoms packing a massive 25g protein concentration',
          'Rich in potassium and magnesium preventing muscle cramps and fatigue',
          'Very lean with valuable marine collagen reinforcing joint tendons',
        ],
      },
    },
  },
  'bar-loup': {
    regionalNames: {
      northChamal: 'Lubina / لوبينا مياه البوغاز (أصيلة، مارينا سمير)',
      centreAtlantic: 'الدرعي / اللوبين / Drâa (المهدية، شواطئ سلا، الوليدية)',
      southSoussSahara: 'أغيد / Aghed / درعي رملي (شاطئ أخفنير، وادي الشبيكة)',
    },
    pricingDetails: {
      wholesalePortMAD: { min: 55, max: 90, unit: 'kg' },
      retailMarketMAD: { min: 90, max: 150, unit: 'kg' },
      globalExportEUR: { min: 13.0, max: 21.0, unit: 'kg', referenceMarket: 'Mercamadrid & France' },
    },
    nutritionPer100g: {
      caloriesKcal: 97,
      proteinGrams: 18.4,
      lipidsGrams: 2.0,
      omega3Mg: 710,
      vitaminD_mcg: 2.1,
      vitaminB12_mcg: 2.7,
      iodine_mcg: 65,
      selenium_mcg: 41.0,
      phosphorus_mg: 215,
      calcium_mg: 25,
      iron_mg: 0.7,
      zinc_mg: 0.8,
      magnesium_mg: 30,
      potassium_mg: 340,
      healthHighlights: {
        ar: [
          'سمك رياضي مفترس يتميز بلحم متماسك وسهل الهضم منخفض الكوليسترول',
          'غني بالأوميغا 3 المفيدة لتقوية الذاكرة والوقاية من السكتات القلبية',
          'سعرات معتدلة مناسبة جداً للوجبات الخفيفة الصحية وعشاق اللياقة',
        ],
        fr: [
          'Poisson de chasse à la chair ferme, digeste et pauvre en cholestérol',
          'Riche en acides gras Oméga-3 favorisant la mémoire et la santé artérielle',
          'Apport calorique modéré idéal pour l’alimentation santé et minceur',
        ],
        en: [
          'Agile predatory fish with firm, easy-to-digest low-cholesterol flesh',
          'High Omega-3 levels boosting memory and cardiovascular resilience',
          'Moderate calorie density perfectly suited for health and fitness lifestyles',
        ],
      },
    },
  },
  'chinchard': {
    regionalNames: {
      northChamal: 'Jurel / خوريل (طنجة، الجبهة، الفنيدق)',
      centreAtlantic: 'الشرن / Chrene أطلسي (الدار البيضاء، المهدية، الجديدة)',
      southSoussSahara: 'تاوريكت / الشرن الأصفر (طانطان، طرفاية، العيون)',
    },
    pricingDetails: {
      wholesalePortMAD: { min: 8, max: 18, unit: 'kg' },
      retailMarketMAD: { min: 18, max: 35, unit: 'kg' },
      globalExportEUR: { min: 3.5, max: 6.5, unit: 'kg', referenceMarket: 'Espagne & Afrique de l’Ouest' },
    },
    nutritionPer100g: {
      caloriesKcal: 114,
      proteinGrams: 19.8,
      lipidsGrams: 3.8,
      omega3Mg: 920,
      vitaminD_mcg: 3.5,
      vitaminB12_mcg: 5.2,
      iodine_mcg: 50,
      selenium_mcg: 48.0,
      phosphorus_mg: 230,
      calcium_mg: 45,
      iron_mg: 1.5,
      zinc_mg: 1.0,
      magnesium_mg: 32,
      potassium_mg: 360,
      healthHighlights: {
        ar: [
          'سمك أزرق شعبي بقيمة غذائية مذهلة تضاهي أغلى الأسماك البحرية',
          'تركيز قوي من أوميغا 3 والحديد لمكافحة فقر الدم وتنشيط الدورة الدموية',
          'فيتامين B12 وفيتامين D بأسعار اقتصادية في متناول جميع العائلات',
        ],
        fr: [
          'Poisson bleu économique avec une densité nutritionnelle remarquable',
          'Teneur élevée en Oméga-3 et fer luttant contre l’anémie',
          'Richesse accessible en vitamines D et B12 pour toute la famille',
        ],
        en: [
          'Affordable blue fish matching the nutritional prestige of expensive species',
          'Potent Omega-3 and iron synergy combating anemia and fatigue',
          'Cost-effective powerhouse of Vitamins D and B12 for everyday wellbeing',
        ],
      },
    },
  },
  'maquereau': {
    regionalNames: {
      northChamal: 'Caballa / كابايا الشمالية (طنجة، تطوان، الحسيمة)',
      centreAtlantic: 'الكابايلا / Kabayla (أسفي، الصويرة، سلا، المهدية)',
      southSoussSahara: 'تاسارغالت / سمك الإسقمري (أكادير، سيدي إفني)',
    },
    pricingDetails: {
      wholesalePortMAD: { min: 7, max: 15, unit: 'kg' },
      retailMarketMAD: { min: 15, max: 30, unit: 'kg' },
      globalExportEUR: { min: 3.0, max: 5.5, unit: 'kg', referenceMarket: 'Marchés de conserve d’Europe' },
    },
    nutritionPer100g: {
      caloriesKcal: 205,
      proteinGrams: 18.6,
      lipidsGrams: 13.9,
      omega3Mg: 2500,
      vitaminD_mcg: 16.1,
      vitaminB12_mcg: 8.7,
      iodine_mcg: 50,
      selenium_mcg: 44.0,
      phosphorus_mg: 240,
      calcium_mg: 15,
      iron_mg: 1.6,
      zinc_mg: 0.9,
      magnesium_mg: 33,
      potassium_mg: 350,
      healthHighlights: {
        ar: [
          'بطل العالم في الأوميغا 3 وفيتامين D3 (16.1 ميكروغرام = 100% من الاحتياج اليومي)',
          'يقوي الجهاز المناعي ويحمي الشرايين من التصلب والجلطات',
          'يحسن الحالة المزاجية والوظائف العصبية بفضل الأحماض الدهنية الأساسية',
        ],
        fr: [
          'Champion absolu des Oméga-3 et de la vitamine D3 (100% des besoins quotidiens)',
          'Renforce l’immunité et prévient l’athérosclérose vasculaire',
          'Soutient l’humeur et la transmission synaptique cérébrale',
        ],
        en: [
          'World champion in natural Omega-3 and Vitamin D3 (100% of daily requirement)',
          'Bolsters immunity and actively shields arteries from plaque buildup',
          'Elevates mood and synaptic transmission through concentrated essential fatty acids',
        ],
      },
    },
  },
  'anchois': {
    regionalNames: {
      northChamal: 'Boquerón / بوقيرون أندلسي (طنجة، المضيق، الحسيمة)',
      centreAtlantic: 'الشطون / Chteba / الأنشوبة (الدار البيضاء، الجديدة، أسفي)',
      southSoussSahara: 'شطوبة الصحراء / تيميست (طانطان، بوجدور)',
    },
    pricingDetails: {
      wholesalePortMAD: { min: 15, max: 30, unit: 'kg' },
      retailMarketMAD: { min: 30, max: 55, unit: 'kg' },
      globalExportEUR: { min: 5.5, max: 9.0, unit: 'kg', referenceMarket: 'Conserveries Espagne & Italie' },
    },
    nutritionPer100g: {
      caloriesKcal: 131,
      proteinGrams: 20.4,
      lipidsGrams: 4.8,
      omega3Mg: 1480,
      vitaminD_mcg: 1.7,
      vitaminB12_mcg: 3.5,
      iodine_mcg: 55,
      selenium_mcg: 36.5,
      phosphorus_mg: 250,
      calcium_mg: 147,
      iron_mg: 3.3,
      zinc_mg: 1.7,
      magnesium_mg: 41,
      potassium_mg: 380,
      healthHighlights: {
        ar: [
          'غني بالكالسيوم والحديد لدعم صحة الدم وتقوية عظام الأطفال والبالغين',
          'تركيز قوي من دهون EPA و DHA المفيدة لصحة شبكية العين والدماغ',
          'سمك نقي من الملوثات بفضل صغر حجمه وقصر دورة حياته في البحر',
        ],
        fr: [
          'Riche en calcium et fer pour la vitalité sanguine et osseuse',
          'Concentré en EPA/DHA protégeant la rétine et la mémoire',
          'Poisson pur et sain sans accumulation de métaux lourds',
        ],
        en: [
          'Rich in calcium and iron fortifying blood health and bone matrix',
          'Packed with EPA and DHA protecting retinal acuity and cognitive health',
          'Clean ocean fish naturally free of heavy metal accumulation',
        ],
      },
    },
  },
  'raie': {
    regionalNames: {
      northChamal: 'Raya / رايا (المتوسط، كاب سبارتيل، طنجة)',
      centreAtlantic: 'الراية / جناح البحر / Raie (الدار البيضاء، المهدية، أسفي)',
      southSoussSahara: 'تيفيرت / راية الرمال (الداخلة، طرفاية)',
    },
    pricingDetails: {
      wholesalePortMAD: { min: 20, max: 40, unit: 'kg' },
      retailMarketMAD: { min: 40, max: 70, unit: 'kg' },
      globalExportEUR: { min: 6.5, max: 11.0, unit: 'kg', referenceMarket: 'Marchés de l’Atlantique nord' },
    },
    nutritionPer100g: {
      caloriesKcal: 89,
      proteinGrams: 20.5,
      lipidsGrams: 0.7,
      omega3Mg: 220,
      vitaminD_mcg: 0.8,
      vitaminB12_mcg: 2.2,
      iodine_mcg: 60,
      selenium_mcg: 34.0,
      phosphorus_mg: 200,
      calcium_mg: 30,
      iron_mg: 0.8,
      zinc_mg: 0.9,
      magnesium_mg: 28,
      potassium_mg: 320,
      healthHighlights: {
        ar: [
          'خالية تماماً من العظام الصلبة؛ أجنحتها مكونة من غضاريف نقية مغذية',
          'بروتين خفيف عالي النقاء بأقل من 1% دهون مناسب لحميات التخسيس',
          'غضاريفها غنية بالكوندرويتين والجيلاتين الطبيعي لصحة المفاصل',
        ],
        fr: [
          'Dépourvue d’arêtes dures, ailes composées de cartilage noble',
          'Protéines ultra-pures à moins de 1% de graisses pour la minceur',
          'Cartilage riche en chondroïtine naturelle préservant les articulations',
        ],
        en: [
          'Completely free of pin-bones; wings formed of noble edible cartilage',
          'Ultra-pure protein with under 1% lipids perfect for lean diets',
          'Cartilage naturally loaded with chondroitin protecting joint mobility',
        ],
      },
    },
  },
  'saint-pierre': {
    regionalNames: {
      northChamal: 'Pez de San Pedro / سان بيدرو (طنجة، العرائش)',
      centreAtlantic: 'حوتة سيدنا موسى / الديك / Saint-Pierre (الدار البيضاء، أسفي)',
      southSoussSahara: 'أم الشعور / الحوتة المباركة (الصويرة، أكادير، الداخلة)',
    },
    pricingDetails: {
      wholesalePortMAD: { min: 80, max: 140, unit: 'kg' },
      retailMarketMAD: { min: 140, max: 220, unit: 'kg' },
      globalExportEUR: { min: 18.0, max: 32.0, unit: 'kg', referenceMarket: 'Rungis & Gastronomie européenne' },
    },
    nutritionPer100g: {
      caloriesKcal: 95,
      proteinGrams: 19.8,
      lipidsGrams: 1.4,
      omega3Mg: 380,
      vitaminD_mcg: 1.5,
      vitaminB12_mcg: 2.5,
      iodine_mcg: 75,
      selenium_mcg: 40.0,
      phosphorus_mg: 210,
      calcium_mg: 25,
      iron_mg: 0.7,
      zinc_mg: 0.8,
      magnesium_mg: 27,
      potassium_mg: 330,
      healthHighlights: {
        ar: [
          'لحم أرستقراطي أبيض فائق النعومة والصفاء بمذاق بحري راقٍ',
          'قليل السعرات وغني بالفيتامينات والمعادن النادرة',
          'يدعم الجهاز القلبي الوعائي ويمنح طاقة نظيفة بدون كولسترول ضار',
        ],
        fr: [
          'Chair aristocratique blanche d’une finesse gastronomique rare',
          'Faible en calories et riche en oligo-éléments marins essentiels',
          'Soutien cardiovasculaire et vitalité musculaire sans graisses superflues',
        ],
        en: [
          'Aristocratic white meat of exquisite culinary delicacy',
          'Low calorie density loaded with essential marine micro-nutrients',
          'Fosters cardiovascular wellbeing and clean muscular stamina',
        ],
      },
    },
  },
  'lotte': {
    regionalNames: {
      northChamal: 'Rape / رابي (مضيق جبل طارق، طنجة، الحسيمة)',
      centreAtlantic: 'اللوط / الراسكاس الأسود / Baudroie (الدار البيضاء، أسفي)',
      southSoussSahara: 'أكراز / وحش القاع (الداخلة، طانطان، العيون)',
    },
    pricingDetails: {
      wholesalePortMAD: { min: 50, max: 85, unit: 'kg' },
      retailMarketMAD: { min: 85, max: 140, unit: 'kg' },
      globalExportEUR: { min: 14.0, max: 24.0, unit: 'kg', referenceMarket: 'Marchés de gros français & espagnols' },
    },
    nutritionPer100g: {
      caloriesKcal: 76,
      proteinGrams: 14.8,
      lipidsGrams: 1.5,
      omega3Mg: 260,
      vitaminD_mcg: 1.0,
      vitaminB12_mcg: 1.8,
      iodine_mcg: 65,
      selenium_mcg: 35.0,
      phosphorus_mg: 190,
      calcium_mg: 20,
      iron_mg: 0.5,
      zinc_mg: 0.6,
      magnesium_mg: 22,
      potassium_mg: 300,
      healthHighlights: {
        ar: [
          'لحم ذيل اللوط خالٍ تماماً من الحسك وله قوام يشبه لحم الكركند الفاخر',
          'من أخفض الأسماك في السعرات الحرارية (76 سعرة) مع نسبة دهون شبه منعدمة',
          'رأسها وعظامها المركزية كنز لصنع أشهى حساء بحري مقوي للمناعة',
        ],
        fr: [
          'Queue de lotte sans aucune arête à texture proche de la langouste',
          'L’un des poissons les plus légers du littoral (76 kcal) sans matières grasses',
          'Base idéale pour des fumets et bouillons marins riches en minéraux',
        ],
        en: [
          'Boneless tail meat delivering a lobster-like culinary texture',
          'Among the leanest ocean catches (76 kcal) with negligible fat',
          'Exceptional base for mineral-rich restorative marine broths',
        ],
      },
    },
  },
  'moules-bouzroug': {
    regionalNames: {
      northChamal: 'Mejillones / ميخيونيس (كاب سبارتيل، مارتيل، الناظور)',
      centreAtlantic: 'بوزروك / Bouzroug بلدي (الصويرة، تامري، إموران)',
      southSoussSahara: 'تيفريت / صدف الصخور (ميرلفت، سيدي إفني، بوجدور)',
    },
    pricingDetails: {
      wholesalePortMAD: { min: 10, max: 20, unit: 'kg' },
      retailMarketMAD: { min: 20, max: 40, unit: 'kg' },
      globalExportEUR: { min: 4.0, max: 8.0, unit: 'kg', referenceMarket: 'Espagne & France' },
    },
    nutritionPer100g: {
      caloriesKcal: 86,
      proteinGrams: 11.9,
      lipidsGrams: 2.2,
      omega3Mg: 780,
      vitaminD_mcg: 1.1,
      vitaminB12_mcg: 12.0,
      iodine_mcg: 140,
      selenium_mcg: 56.0,
      phosphorus_mg: 240,
      calcium_mg: 33,
      iron_mg: 4.0,
      zinc_mg: 1.6,
      magnesium_mg: 34,
      potassium_mg: 320,
      healthHighlights: {
        ar: [
          'قنبلة الحديد واليود وفيتامين B12 (500% من الاحتياج اليومي) لمحاربة الأنيميا والتعب',
          'غني بالسيلينيوم والأوميغا 3 البحرية لدعم صحة القلب وتنشيط المناعة',
          'صدفيات برية طبيعية غنية بالمعادن النادرة المفيدة لتوازن الهرمونات',
        ],
        fr: [
          'Concentré puissant en fer (4,0 mg), iode et vitamine B12 (500% des AJR)',
          'Riche en sélénium antioxydant et acides gras protecteurs',
          'Mollusque sauvage gorgé d’oligo-éléments marins revigorants',
        ],
        en: [
          'Potent reservoir of bioavailable iron (4.0 mg), iodine, and Vitamin B12 (500% DV)',
          'Rich in antioxidant selenium and cardioprotective marine lipids',
          'Wild ocean shellfish packed with invigorating trace elements',
        ],
      },
    },
  },
  'huitres-dakhla': {
    regionalNames: {
      northChamal: 'Ostras / أوستراس (مارتيل، مارينا سمير)',
      centreAtlantic: 'المحار / محار الوليدية الشهير (بحيرة الوليدية)',
      southSoussSahara: 'محار خليج الداخلة النقي / L-M7ar (خليج وادي الذهب)',
    },
    pricingDetails: {
      wholesalePortMAD: { min: 40, max: 70, unit: 'piece' },
      retailMarketMAD: { min: 70, max: 130, unit: 'piece' },
      globalExportEUR: { min: 12.0, max: 22.0, unit: 'piece', referenceMarket: 'Export européen haut de gamme' },
    },
    nutritionPer100g: {
      caloriesKcal: 68,
      proteinGrams: 9.5,
      lipidsGrams: 2.5,
      omega3Mg: 680,
      vitaminD_mcg: 2.3,
      vitaminB12_mcg: 16.0,
      iodine_mcg: 110,
      selenium_mcg: 77.0,
      phosphorus_mg: 160,
      calcium_mg: 60,
      iron_mg: 6.0,
      zinc_mg: 16.6,
      magnesium_mg: 45,
      potassium_mg: 220,
      healthHighlights: {
        ar: [
          'أعلى تركيز للزنك في الطبيعة (16.6 ملغ = 150% من الاحتياج اليومي) للخصوبة وتقوية المناعة',
          'مصدر ممتاز للحديد العضوي وفيتامين B12 لمحاربة الوهن وتجديد الخلايا',
          'مياه خليج الداخلة النقية المصنفة دولياً تمنحه نقاءً بيولوجياً استثنائياً',
        ],
        fr: [
          'Teneur absolue en zinc organique (16,6 mg) pour l’immunité et la vitalité',
          'Source record de fer biodisponible et vitamine B12 anti-fatigue',
          'Purifié dans les eaux cristallines de la baie de Dakhla classées d’excellence',
        ],
        en: [
          'Highest natural zinc concentration on Earth (16.6 mg) boosting endocrine and immune power',
          'Record level of bioavailable iron and Vitamin B12 revitalizing stamina',
          'Cultivated in the pristine, globally-certified waters of Dakhla lagoon',
        ],
      },
    },
  },
  'langouste': {
    regionalNames: {
      northChamal: 'Langosta Roja / لانغوسطا حمراء (الحسيمة، طنجة، كاب كيراتس)',
      centreAtlantic: 'اللانڭوست الملكي / Langouste (الصويرة، كاب سيم، آسفي)',
      southSoussSahara: 'جراد البحر الملكي / أزايز ن وومان (الداخلة، بوجدور)',
    },
    pricingDetails: {
      wholesalePortMAD: { min: 150, max: 260, unit: 'kg' },
      retailMarketMAD: { min: 260, max: 420, unit: 'kg' },
      globalExportEUR: { min: 35.0, max: 65.0, unit: 'kg', referenceMarket: 'Haute gastronomie internationale' },
    },
    nutritionPer100g: {
      caloriesKcal: 112,
      proteinGrams: 20.6,
      lipidsGrams: 1.5,
      omega3Mg: 410,
      vitaminD_mcg: 0.5,
      vitaminB12_mcg: 2.8,
      iodine_mcg: 95,
      selenium_mcg: 58.0,
      phosphorus_mg: 250,
      calcium_mg: 65,
      iron_mg: 1.1,
      zinc_mg: 2.8,
      magnesium_mg: 42,
      potassium_mg: 350,
      healthHighlights: {
        ar: [
          'لحم ملكي فاخر قليل الدهون مشحون بالزنك والسيلينيوم ومضادات الأكسدة',
          'بروتينات بحرية راقية تدعم تجديد الأنسجة والعضلات',
          'غني باليود والنحاس العضوي لدعم الجهاز المناعي والحيوية البدنية',
        ],
        fr: [
          'Mets royal d’une grande pureté protéique pauvre en lipides',
          'Richesse remarquable en zinc, sélénium et antioxydants marins',
          'Excellente source d’iode et de cuivre pour la vitalité cellulaire',
        ],
        en: [
          'Regal marine delicacy delivering pure lean protein with minimal lipids',
          'Outstanding density of zinc, selenium, and marine antioxidants',
          'Abundant in iodine and organic copper supporting vitality and stamina',
        ],
      },
    },
  },
};

// Now parse the fish array in fish.ts and inject the data
// We will look for each fish object by id and insert regionalNames, pricingDetails, and nutritionPer100g

let updatedCount = 0;

for (const [id, enrichment] of Object.entries(ALL_FISH_ENRICHMENT)) {
  const idRegex = new RegExp(`(id:\\s*['"]${id}['"][\\s\\S]*?)(culinaryProfile:)`);
  if (idRegex.test(content)) {
    const replacement = `$1regionalNames: ${JSON.stringify(enrichment.regionalNames, null, 4)},\n    pricingDetails: ${JSON.stringify(enrichment.pricingDetails, null, 4)},\n    nutritionPer100g: ${JSON.stringify(enrichment.nutritionPer100g, null, 4)},\n    $2`;
    content = content.replace(idRegex, replacement);
    updatedCount++;
  } else {
    console.warn(`Fish ID ${id} not matched in file!`);
  }
}

fs.writeFileSync(fishFilePath, content, 'utf8');
console.log(`Successfully enriched ${updatedCount} fish species in fish.ts!`);
