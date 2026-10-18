import type { Fish } from './types'

export const MOROCCAN_FISH: Fish[] = [
  {
    id: 'sardine',
    nameDarijaArabic: 'سردين',
    nameDarijaLatin: 'Serdine',
    nameFrench: 'Sardine commune',
    nameEnglish: 'European Pilchard / Sardine',
    scientificName: 'Sardina pilchardus',
    category: 'poisson_bleu',
    coast: 'both',
    mainPorts: ['Safi', 'Essaouira', 'Tan-Tan', 'Agadir', 'Laâyoune', 'Al Hoceima'],
    seasonality: {
      peakMonths: [5, 6, 7, 8, 9, 10],
      description: {
        ar: 'ذروة الجودة في فصل الصيف والخريف عندما يكون السردين سميناً غنياً بأوميغا 3.',
        fr: 'Pleine saison de mai à octobre : la sardine est bien grasse, brillante et savoureuse.',
        en: 'Peak season from May to October: sardines are plump, fatty, and packed with Omega-3.',
      },
    },
    priceRangeMAD: { min: 10, max: 25, unit: 'kg' },
    regionalNames: {
    "northChamal": "بوقيرون / Sardina / بيلتشارد (طنجة، تطوان، الحسيمة)",
    "centreAtlantic": "سردين / Serdine (أسفي، الصويرة، الدار البيضاء)",
    "southSoussSahara": "سردين بلدي / تسكالت (أكادير، طانطان، العيون، الداخلة)"
},
    pricingDetails: {
    "wholesalePortMAD": {
        "min": 5,
        "max": 12,
        "unit": "kg"
    },
    "retailMarketMAD": {
        "min": 12,
        "max": 25,
        "unit": "kg"
    },
    "globalExportEUR": {
        "min": 3.5,
        "max": 6,
        "unit": "kg",
        "referenceMarket": "Mercamadrid & Rungis"
    }
},
    nutritionPer100g: {
    "caloriesKcal": 208,
    "proteinGrams": 24.6,
    "lipidsGrams": 11.5,
    "omega3Mg": 1480,
    "vitaminD_mcg": 4.8,
    "vitaminB12_mcg": 8.9,
    "iodine_mcg": 40,
    "selenium_mcg": 52.7,
    "phosphorus_mg": 490,
    "calcium_mg": 382,
    "iron_mg": 2.9,
    "zinc_mg": 1.3,
    "magnesium_mg": 39,
    "potassium_mg": 397,
    "healthHighlights": {
        "ar": [
            "أعلى تركيز طبيعي لأحماض أوميغا 3 لحماية القلب والشرايين وخفض الكولسترول الضار",
            "غني بالكالسيوم والفسفور لتعزيز الكثافة العظمية والوقاية من الهشاشة",
            "جرعة مكثفة من فيتامين B12 وفيتامين D3 الطبيعي النادر في الأطعمة الأرضية"
        ],
        "fr": [
            "Teneur exceptionnelle en acides gras Oméga-3 (EPA/DHA) cardioprotecteurs",
            "Source majeure de calcium bio-assimilable et de phosphore osseux",
            "Concentration record en vitamine B12 (370% des AJR) et vitamine D3 naturelle"
        ],
        "en": [
            "Unrivaled natural density of cardioprotective Omega-3 (EPA/DHA) fatty acids",
            "Superior bioavailable calcium and phosphorus fortifying bone density",
            "Exceptional Vitamin B12 and rare natural Vitamin D3 powering neurological vitality"
        ]
    }
},
    culinaryProfile: {
      flavor: 'rich',
      texture: 'tender',
      bonesDifficulty: 'medium',
      bestCookingMethods: ['tagine', 'friture', 'grillade'],
    },
    freshnessKeys: {
      ar: ['عين براقة وبارزة بدون احمرار', 'خياشيم حمراء زاهية بدون لزوجة رمادية', 'قشور فضية متماسكة ورائحة بحر نقية'],
      fr: ['Yeux vifs et bombés, non enfoncés', 'Ouïes rouge vif sans mucus terne', 'Écailles argentées éclatantes et odeur saline fraîche'],
      en: ['Clear, convex eyes without bloodshot haze', 'Bright crimson gills with no dull mucus', 'Firm silvery scales with clean oceanic aroma'],
    },
    description: {
      ar: 'رمز السواحل المغربية والمغرب هو المصدر الأول عالمياً للسردين. يُقدّم مشوياً على الفحم مع الكامون، أو كواري في طاجين مطيشة، أو مشمل وملاصق.',
      fr: "Fierté maritime du Maroc, premier exportateur mondial. Incontournable en friture farcie de chermoula (mlasqine), en tagine de boulettes (kouari) ou grillé sur braises.",
      en: "The pride of Moroccan waters; Morocco is the world's #1 exporter. Best served char-grilled, stuffed in pairs with charmoula, or rolled into spiced tomato kefta balls.",
    },
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    fallbackImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Sardina_pilchardus_Genoa.jpg/1200px-Sardina_pilchardus_Genoa.jpg',
    audioPhonetic: 'Ser-dine',
    recommendedRecipeIds: ['sardines-mchermline', 'tagine-kouari-sardine', 'sardine-mechwi-grillade'],
  },
  {
    id: 'merlan',
    nameDarijaArabic: 'ميرلا',
    nameDarijaLatin: 'Mirla',
    nameFrench: 'Merlan',
    nameEnglish: 'Whiting / Hake',
    scientificName: 'Merlangius merlangus',
    category: 'poisson_blanc',
    coast: 'both',
    mainPorts: ['Casablanca', 'Mehdia', 'Larache', 'Tanger', 'Agadir', 'Nador'],
    seasonality: {
      peakMonths: [10, 11, 12, 1, 2, 3, 4],
      description: {
        ar: 'متوفر على مدار السنة مع جودة استثنائية في الخريف والشتاء.',
        fr: 'Disponible toute l’année avec un pic qualitatif en automne et hiver.',
        en: 'Available year-round with superior quality in autumn and winter months.',
      },
    },
    priceRangeMAD: { min: 45, max: 85, unit: 'kg' },
    regionalNames: {
    "northChamal": "Pescadilla / بيسكادييا / Merluzo (طنجة، الناظور)",
    "centreAtlantic": "ميرلا / Mirla (المهدية، الدار البيضاء، الجديدة)",
    "southSoussSahara": "الميرلا الجنوبية / النزالي / Nazali (طانطان، الداخلة)"
},
    pricingDetails: {
    "wholesalePortMAD": {
        "min": 25,
        "max": 45,
        "unit": "kg"
    },
    "retailMarketMAD": {
        "min": 45,
        "max": 85,
        "unit": "kg"
    },
    "globalExportEUR": {
        "min": 7.5,
        "max": 12,
        "unit": "kg",
        "referenceMarket": "Rungis & Madrid"
    }
},
    nutritionPer100g: {
    "caloriesKcal": 90,
    "proteinGrams": 19.4,
    "lipidsGrams": 0.8,
    "omega3Mg": 310,
    "vitaminD_mcg": 1,
    "vitaminB12_mcg": 2.1,
    "iodine_mcg": 110,
    "selenium_mcg": 38,
    "phosphorus_mg": 210,
    "calcium_mg": 25,
    "iron_mg": 0.4,
    "zinc_mg": 0.5,
    "magnesium_mg": 26,
    "potassium_mg": 320,
    "healthHighlights": {
        "ar": [
            "بروتين نقي فائق الهضم بأقل من 1% دهون، مثالي للحميات وتغذية الرياضيين",
            "تركيز عالٍ من اليود الطبيعي المنشط لوظائف الغدة الدرقية وحرق السعرات",
            "سيلينيوم عضوي قوي لحماية الخلايا ومكافحة الإجهاد التأكسدي"
        ],
        "fr": [
            "Protéines pures ultra-digestes avec moins de 1% de lipides",
            "Teneur exceptionnelle en iode soutenant le métabolisme thyroïdien",
            "Forte teneur en sélénium antioxydant protecteur cellulaire"
        ],
        "en": [
            "Ultra-lean digestible pure protein under 1% fat, ideal for athlete diets",
            "Abundant marine iodine fueling thyroid function and metabolic efficiency",
            "High antioxidant selenium safeguarding cellular structures"
        ]
    }
},
    culinaryProfile: {
      flavor: 'delicate',
      texture: 'flaky',
      bonesDifficulty: 'low',
      bestCookingMethods: ['friture', 'four'],
    },
    freshnessKeys: {
      ar: ['لحم أبيض ناصع متماسك يرتد عند لمسه', 'جلد رطب بلون رصاصي فضي لامع', 'عين شفافة كبلورة الماء'],
      fr: ['Chair blanche immaculée qui reprend sa forme sous le doigt', 'Peau argentée luisante', 'Oeil parfaitement limpide et brillant'],
      en: ['Pristine white firm flesh that springs back', 'Shimmering silver-slate skin', 'Crystal-clear transparent eyes'],
    },
    description: {
      ar: 'الميرلا من أحب الأسماك البيضاء لدى العائلات المغربية لخفة لحمها وسهولة تنظيفها. تُقلى مقرمشة وتُقدّم مع الزعلوك والتكتوكة.',
      fr: 'Poisson blanc doux et très apprécié pour sa chair fine et digeste. Reine des fritures croustillantes marocaines avec zaalouk et rondelles de citron.',
      en: 'Beloved Moroccan white fish known for its tender, easy-to-digest flakes and mild sweetness. King of crispy fried fish platters served with zaalouk.',
    },
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=80',
    fallbackImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Merlangius_merlangus.jpg/1200px-Merlangius_merlangus.jpg',
    audioPhonetic: 'Meer-la',
    recommendedRecipeIds: ['friture-mixte-marocaine', 'merlan-au-four-charmoula'],
  },
  {
    id: 'dorade-royale',
    nameDarijaArabic: 'الدوراد الملكية / الزريقة',
    nameDarijaLatin: 'Dorade Royale / Zriqa',
    nameFrench: 'Daurade Royale',
    nameEnglish: 'Gilthead Seabream',
    scientificName: 'Sparus aurata',
    category: 'poisson_blanc',
    coast: 'both',
    mainPorts: ['Al Hoceima', 'Nador', 'Tanger', 'Dakhla', 'Essaouira', 'Agadir'],
    seasonality: {
      peakMonths: [9, 10, 11, 12, 1],
      description: {
        ar: 'فترة الخريف وبداية الشتاء هي الأفضل لصيد الدوراد الملكية من السواحل.',
        fr: 'Excellente de septembre à janvier, chair ferme et grasse à point.',
        en: 'Prime season from September to January with exceptionally firm and juicy meat.',
      },
    },
    priceRangeMAD: { min: 80, max: 150, unit: 'kg' },
    regionalNames: {
    "northChamal": "Dorada / دورادا / الزريقة الشمالية (المتوسط، طنجة)",
    "centreAtlantic": "الدوراد الملكية / الزريقة (الرباط، الجديدة، آسفي)",
    "southSoussSahara": "أبراغ / Abragh / الحوتة الذهبية (سوس، طرفاية)"
},
    pricingDetails: {
    "wholesalePortMAD": {
        "min": 50,
        "max": 80,
        "unit": "kg"
    },
    "retailMarketMAD": {
        "min": 80,
        "max": 130,
        "unit": "kg"
    },
    "globalExportEUR": {
        "min": 12,
        "max": 18,
        "unit": "kg",
        "referenceMarket": "Marchés européens de gros"
    }
},
    nutritionPer100g: {
    "caloriesKcal": 121,
    "proteinGrams": 20.5,
    "lipidsGrams": 3.8,
    "omega3Mg": 650,
    "vitaminD_mcg": 2.5,
    "vitaminB12_mcg": 3.2,
    "iodine_mcg": 65,
    "selenium_mcg": 45,
    "phosphorus_mg": 240,
    "calcium_mg": 30,
    "iron_mg": 0.8,
    "zinc_mg": 0.7,
    "magnesium_mg": 30,
    "potassium_mg": 380,
    "healthHighlights": {
        "ar": [
            "توازن مثالي بين البروتين والأحماض الدهنية الأساسية لصحة الدماغ",
            "غني بالفسفور والمغنيسيوم لتجديد طاقة الخلايا ومقاومة التعب",
            "لحم صحي يساعد على بناء الكتلة العضلية النقية"
        ],
        "fr": [
            "Équilibre parfait en protéines nobles et acides gras essentiels",
            "Source de magnésium et phosphore contre la fatigue chronique",
            "Chair noble idéale pour le développement musculaire sain"
        ],
        "en": [
            "Ideal balance of noble protein and essential fatty acids for brain function",
            "Rich in magnesium and phosphorus recharging cellular energy",
            "Premium fish supporting lean muscle mass and endurance"
        ]
    }
},
    culinaryProfile: {
      flavor: 'sweet',
      texture: 'firm',
      bonesDifficulty: 'low',
      bestCookingMethods: ['four', 'grillade', 'tagine'],
    },
    freshnessKeys: {
      ar: ['علامة الهلال الذهبي واضحة ولامعة بين العينين', 'بقعة حمراء وردية بارزة على الغطاء الخيشومي', 'قشور قوية براقة متراصة بإحكام'],
      fr: ['Croissant doré éclatant visible entre les deux yeux', 'Tache rougeoyante sur l’opercule', 'Écailles fermes et bien adhérentes'],
      en: ['Distinct golden crescent glowing between the eyes', 'Ruby-red spot on gill covers', 'Tight, luminous scales adhered firmly'],
    },
    description: {
      ar: 'ملكة الأسماك المتوسطية والأطلسية في المغرب. تتميز بشريط ذهبي براق بين عينيها. تطهى كاملة في الفرن فوق فرشة من البطاطس والفلفل مع شرمولة أصيلة.',
      fr: "Reine des tables festives au Maroc. Reconnaissable à son bandeau doré frontal. Sublime rôtie entière au four sur lit de poivrons et tomates à la chermoula.",
      en: "Regal fish famous for the golden band across its forehead. Prepared whole in the oven over sliced peppers, potatoes, and fragrant herb charmoula.",
    },
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80',
    fallbackImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Sparus_aurata_2.JPG/1200px-Sparus_aurata_2.JPG',
    audioPhonetic: 'Do-rade / Zree-qa',
    recommendedRecipeIds: ['dorade-royale-au-four', 'tagine-l7ot-khodra'],
  },
  {
    id: 'sole',
    nameDarijaArabic: 'الصول',
    nameDarijaLatin: 'Sol',
    nameFrench: 'Sole commune',
    nameEnglish: 'Common Dover Sole',
    scientificName: 'Solea solea',
    category: 'poisson_blanc',
    coast: 'both',
    mainPorts: ['Mehdia', 'Casablanca', 'Larache', 'Safi', 'Agadir'],
    seasonality: {
      peakMonths: [11, 12, 1, 2, 3, 4],
      description: {
        ar: 'ممتازة في أواخر الخريف وطوال فصل الشتاء والربيع.',
        fr: 'Saison optimale d’hiver et de printemps, chair épaisse et savoureuse.',
        en: 'Optimal in late autumn through winter and spring with dense, sweet meat.',
      },
    },
    priceRangeMAD: { min: 90, max: 160, unit: 'kg' },
    regionalNames: {
    "northChamal": "Lenguado / لينغوادو (طنجة، أصيلة، العرائش)",
    "centreAtlantic": "الصول / لسان الثور / Sole (الدار البيضاء، المهدية)",
    "southSoussSahara": "إيلس / Iles / لسان البحر (سوس، سيدي إفني)"
},
    pricingDetails: {
    "wholesalePortMAD": {
        "min": 55,
        "max": 85,
        "unit": "kg"
    },
    "retailMarketMAD": {
        "min": 90,
        "max": 150,
        "unit": "kg"
    },
    "globalExportEUR": {
        "min": 16,
        "max": 24,
        "unit": "kg",
        "referenceMarket": "Rungis & Paris"
    }
},
    nutritionPer100g: {
    "caloriesKcal": 86,
    "proteinGrams": 18.2,
    "lipidsGrams": 1.2,
    "omega3Mg": 280,
    "vitaminD_mcg": 1.2,
    "vitaminB12_mcg": 1.8,
    "iodine_mcg": 80,
    "selenium_mcg": 32,
    "phosphorus_mg": 230,
    "calcium_mg": 28,
    "iron_mg": 0.6,
    "zinc_mg": 0.6,
    "magnesium_mg": 24,
    "potassium_mg": 310,
    "healthHighlights": {
        "ar": [
            "أخف أنواع الأسماك على الجهاز الهضمي، ممتاز للمعدة الحساسة وفترة النقاهة",
            "سعرات منخفضة جداً (86 سعرة) مع أحماض أمينية كاملة",
            "يدعم صحة القلب والشرايين بنسبة صوديوم متوازنة"
        ],
        "fr": [
            "Digestibilité suprême pour estomacs sensibles et convalescents",
            "Très faible apport calorique (86 kcal) avec profil protéique complet",
            "Soutien cardiovasculaire par un équilibre minéral parfait"
        ],
        "en": [
            "Supreme gastro-intestinal digestibility for recovery and sensitive stomachs",
            "Ultra-low calorie density (86 kcal) with complete amino acid profile",
            "Maintains vascular equilibrium via natural electrolyte balance"
        ]
    }
},
    culinaryProfile: {
      flavor: 'sweet',
      texture: 'tender',
      bonesDifficulty: 'low',
      bestCookingMethods: ['friture', 'four'],
    },
    freshnessKeys: {
      ar: ['الجلد السفلي أبيض ناصع بدون أي اصفرار', 'جسم مستقيم صلب عند رفعه', 'طبقة مخاطية شفافة طبيعية تدل على الصيد الحديث'],
      fr: ['Face ventrale blanc éclatant sans jaunissement', 'Corps bien rigide quand on le tient', 'Fine pellicule protectrice transparente'],
      en: ['Pearly white underside without yellow stains', 'Rigid body when held horizontally', 'Natural clear protective sheen'],
    },
    description: {
      ar: 'سمك قاعي مسطح مشهور بنعومة لحمه الفاخر وخلوه النسبي من الشوك. تفضله العائلات مقلياً بمسحة من عصير الحامض والكمون وزيت الزيتون.',
      fr: 'Poisson plat noble par excellence. Chair d’une finesse incomparable qui se détache facilement de l’arête centrale. Idéal poêlé au beurre ou frit.',
      en: 'Noble flatfish renowned for exquisite sweet tenderness and easy center-bone release. Classically pan-seared or crisped with lemon and cumin.',
    },
    imageUrl: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=1200&q=80',
    fallbackImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Solea_solea.jpg/1200px-Solea_solea.jpg',
    audioPhonetic: 'Sole',
    recommendedRecipeIds: ['sole-meuniere-marocaine', 'friture-mixte-marocaine'],
  },
  {
    id: 'courbine',
    nameDarijaArabic: 'القرب',
    nameDarijaLatin: 'Qorb / Courbine',
    nameFrench: 'Courbine / Maigre',
    nameEnglish: 'Meagre / Croaker',
    scientificName: 'Argyrosomus regius',
    category: 'poisson_blanc',
    coast: 'atlantic',
    mainPorts: ['Dakhla', 'Taghazout', 'Tan-Tan', 'Agadir', 'Essaouira'],
    seasonality: {
      peakMonths: [4, 5, 6, 7, 8, 9, 10],
      description: {
        ar: 'سمك أطلسي ضخم يتواجد بكثرة في خليج الداخلة وسواحل سوس في الصيف والخريف.',
        fr: 'Espèce atlantique emblématique de Dakhla et Agadir, reine des mois chauds.',
        en: 'Iconic Atlantic giant abundant in Dakhla Bay and southern coasts during warm months.',
      },
    },
    priceRangeMAD: { min: 65, max: 110, unit: 'kg' },
    regionalNames: {
    "northChamal": "Corvina / كوربينا (مضيق جبل طارق، الناظور)",
    "centreAtlantic": "القرب / Qorb / المعزة البحرية (الدار البيضاء، أسفي)",
    "southSoussSahara": "الكوربين / كربانة / عيشة (طانطان، العيون، الداخلة)"
},
    pricingDetails: {
    "wholesalePortMAD": {
        "min": 40,
        "max": 70,
        "unit": "kg"
    },
    "retailMarketMAD": {
        "min": 70,
        "max": 120,
        "unit": "kg"
    },
    "globalExportEUR": {
        "min": 10,
        "max": 16,
        "unit": "kg",
        "referenceMarket": "Mercamadrid & Portugal"
    }
},
    nutritionPer100g: {
    "caloriesKcal": 105,
    "proteinGrams": 21,
    "lipidsGrams": 2.1,
    "omega3Mg": 450,
    "vitaminD_mcg": 2,
    "vitaminB12_mcg": 2.8,
    "iodine_mcg": 75,
    "selenium_mcg": 40,
    "phosphorus_mg": 220,
    "calcium_mg": 22,
    "iron_mg": 0.9,
    "zinc_mg": 0.8,
    "magnesium_mg": 28,
    "potassium_mg": 360,
    "healthHighlights": {
        "ar": [
            "لحم أبيض كثيف غني بالكولاجين الطبيعي لتقوية المفاصل والغضاريف",
            "غني بالبوتاسيوم لدعم انقباض عضلة القلب وضبط الضغط الشرياني",
            "بروتينات بنائية تسهم في التئام الأنسجة وتجديد خلايا الجلد"
        ],
        "fr": [
            "Riche en collagène marin fortifiant les articulations",
            "Teneur élevée en potassium régulant la pression artérielle",
            "Excellente densité nutritionnelle stimulant la régénération cellulaire"
        ],
        "en": [
            "Dense meat rich in natural marine collagen strengthening cartilage",
            "High potassium content supporting healthy blood pressure",
            "Promotes rapid tissue repair and skin vitality"
        ]
    }
},
    culinaryProfile: {
      flavor: 'rich',
      texture: 'meaty',
      bonesDifficulty: 'low',
      bestCookingMethods: ['tagine', 'four', 'grillade'],
    },
    freshnessKeys: {
      ar: ['داخل الفم بلون أصفر ذهبي مميز للقرب الطازج', 'لحم سميك صلب بلون رمادي مائل للفضة', 'عيون صافية وقشور متماسكة كالدروع'],
      fr: ['Intérieur de la gueule teinté d’un jaune doré franc', 'Chair ferme et épaisse qui résiste à la pression', 'Écailles argentées solides'],
      en: ['Distinct yellow-gold hue inside the mouth cavity', 'Thick, meaty flesh resisting gentle thumb pressure', 'Armor-like silvery scales'],
    },
    description: {
      ar: 'ملك الأسماك الأطلسية في الجنوب المغربي خاصة الداخلة. لحمه مكتنز يشبه لحم العجل ويتحمل الطهي الطويل في الطاجين مع البصل المعسل والزبيب أو الخضر.',
      fr: "Géant des côtes atlantiques marocaines (jusqu'à 40 kg). Sa chair dense et fondante ne s'effrite jamais, parfaite en tagine aux oignons caramélisés et pruneaux.",
      en: "The heavyweight champion of Atlantic Morocco. Firm, steak-like white flesh that holds beautifully in slow-simmered vegetable or caramelized onion tagines.",
    },
    imageUrl: 'https://images.unsplash.com/photo-1510137600163-2729bc6959a6?auto=format&fit=crop&w=1200&q=80',
    fallbackImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Argyrosomus_regius.jpg/1200px-Argyrosomus_regius.jpg',
    audioPhonetic: 'Qorb',
    recommendedRecipeIds: ['tagine-qorb-m3assel', 'tagine-l7ot-khodra'],
  },
  {
    id: 'espadon',
    nameDarijaArabic: 'الإسبادون / بوسف',
    nameDarijaLatin: 'Spadon / Bousif',
    nameFrench: 'Espadon',
    nameEnglish: 'Swordfish',
    scientificName: 'Xiphias gladius',
    category: 'poisson_bleu',
    coast: 'both',
    mainPorts: ['Tanger', 'Al Hoceima', 'Larache', 'Nador', 'Casablanca'],
    seasonality: {
      peakMonths: [6, 7, 8, 9, 10],
      description: {
        ar: 'موسم الهجرة عبر مضيق جبل طارق في الصيف وبداية الخريف.',
        fr: 'Période de migration par le détroit de Gibraltar entre juin et octobre.',
        en: 'Strait of Gibraltar migration peak through summer and early autumn.',
      },
    },
    priceRangeMAD: { min: 85, max: 140, unit: 'kg' },
    regionalNames: {
    "northChamal": "Pez Espada / بيث إسبادا (طنجة، أصيلة، العرائش)",
    "centreAtlantic": "الإسبادون / بوسف / Bousif (الدار البيضاء، المهدية)",
    "southSoussSahara": "بومشفا / سياف البحر (أكادير، طرفاية، العيون)"
},
    pricingDetails: {
    "wholesalePortMAD": {
        "min": 60,
        "max": 95,
        "unit": "kg"
    },
    "retailMarketMAD": {
        "min": 100,
        "max": 160,
        "unit": "kg"
    },
    "globalExportEUR": {
        "min": 14,
        "max": 22,
        "unit": "kg",
        "referenceMarket": "Espagne & Italie"
    }
},
    nutritionPer100g: {
    "caloriesKcal": 144,
    "proteinGrams": 23.5,
    "lipidsGrams": 5.1,
    "omega3Mg": 950,
    "vitaminD_mcg": 6.2,
    "vitaminB12_mcg": 3.5,
    "iodine_mcg": 50,
    "selenium_mcg": 68.5,
    "phosphorus_mg": 280,
    "calcium_mg": 18,
    "iron_mg": 1.1,
    "zinc_mg": 1.2,
    "magnesium_mg": 35,
    "potassium_mg": 420,
    "healthHighlights": {
        "ar": [
            "نسبة استثنائية من السيلينيوم المضاد للشيخوخة والمعزز للمناعة الطبيعية",
            "جرعة قوية من فيتامين D لتثبيت الكالسيوم وتقوية الهيكل العظمي",
            "شرائح لحمية خالية من الحسك غنية بالحديد لمكافحة فقر الدم والإرهاق"
        ],
        "fr": [
            "Teneur record en sélénium antioxydant renforçant l’immunité",
            "Excellente réserve de vitamine D pour la fixation osseuse",
            "Steak marin riche en fer héminique prévenant l’anémie"
        ],
        "en": [
            "Remarkable selenium density boosting immunity and longevity",
            "Potent dose of Vitamin D optimizing bone calcium retention",
            "Steak-like boneless meat rich in iron combating anemia and fatigue"
        ]
    }
},
    culinaryProfile: {
      flavor: 'rich',
      texture: 'meaty',
      bonesDifficulty: 'low',
      bestCookingMethods: ['grillade', 'tagine', 'four'],
    },
    freshnessKeys: {
      ar: ['اللحم بلون وردي عاجي رطب وخالٍ من البقع الداكنة الجافة', 'الدم حول الفقرات أحمر قرمزي نضر وليس بنياً', 'صلابة متماسكة كاللحم الهبر'],
      fr: ['Tranches rosé nacré, humides sans zones sèches', 'Cercle sanguin rouge rubis vif et non brunâtre', 'Texture dense et ferme'],
      en: ['Moist pearly-pink flesh steaks without dry spots', 'Ruby red vertebrae blood ring, never brown', 'Steak-like resilient firmness'],
    },
    description: {
      ar: 'سمك الصيادين الأسطوري بمضيق البوغاز. لحمه هبرة صافية بدون شوك داخلي، يُقطع شرائح ستيك أو قطباناً للشواء مع الكامون، القزبور، وزيت الزيتون.',
      fr: "Seigneur du détroit de Tanger. Chair steak noble sans arêtes. Découpé en pavés ou brochettes marinées à la chermoula dorées au barbecue.",
      en: "Legendary swordfish of the Strait of Tangier. Pure boneless steaks marinated in cumin, paprika, garlic, and cold-pressed olive oil for charcoal grilling.",
    },
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    fallbackImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Xiphias_gladius1.jpg/1200px-Xiphias_gladius1.jpg',
    audioPhonetic: 'Bou-seef / Spa-don',
    recommendedRecipeIds: ['brochettes-espadon-grille', 'tagine-l7ot-khodra'],
  },
  {
    id: 'thon-rouge',
    nameDarijaArabic: 'التونة الحمراء / التون',
    nameDarijaLatin: 'Tona / Toun',
    nameFrench: 'Thon rouge de Méditerranée',
    nameEnglish: 'Atlantic Bluefin Tuna',
    scientificName: 'Thunnus thynnus',
    category: 'poisson_bleu',
    coast: 'both',
    mainPorts: ['Larache', 'Tanger', 'Kénitra', 'Al Hoceima', 'Asilah'],
    seasonality: {
      peakMonths: [4, 5, 6, 7],
      description: {
        ar: 'موسم المضربة التقليدية الشهيرة في العرائش وأصيلا وطنجة في أواخر الربيع والصيف.',
        fr: 'Saison mythique de la madrague à Larache et Asilah entre avril et juillet.',
        en: 'Iconic traditional madrague net trap season around Larache and Asilah (April-July).',
      },
    },
    priceRangeMAD: { min: 90, max: 180, unit: 'kg' },
    regionalNames: {
    "northChamal": "Atún Rojo / التون الأحمر (أصيلة، القصر الصغير، طنجة)",
    "centreAtlantic": "التونة الملكية / التون الطري (الدار البيضاء)",
    "southSoussSahara": "أزوكا الكبير / أوتون (أكادير، سيدي إفني، الداخلة)"
},
    pricingDetails: {
    "wholesalePortMAD": {
        "min": 70,
        "max": 120,
        "unit": "kg"
    },
    "retailMarketMAD": {
        "min": 120,
        "max": 200,
        "unit": "kg"
    },
    "globalExportEUR": {
        "min": 25,
        "max": 65,
        "unit": "kg",
        "referenceMarket": "Tokyo Toyosu & Rungis"
    }
},
    nutritionPer100g: {
    "caloriesKcal": 144,
    "proteinGrams": 23.3,
    "lipidsGrams": 4.9,
    "omega3Mg": 1250,
    "vitaminD_mcg": 5.5,
    "vitaminB12_mcg": 9.4,
    "iodine_mcg": 45,
    "selenium_mcg": 90,
    "phosphorus_mg": 280,
    "calcium_mg": 15,
    "iron_mg": 1.4,
    "zinc_mg": 0.9,
    "magnesium_mg": 40,
    "potassium_mg": 440,
    "healthHighlights": {
        "ar": [
            "غذاء النخبة الرياضية: بروتين فائق الجودة وسريع الامتصاص",
            "أعلى تركيز فيتامين B12 وسيلينيوم لدعم الذاكرة وتدفق الدم",
            "أحماض دهنية أوميغا 3 نقية تحمي الدماغ والشرايين التاجية"
        ],
        "fr": [
            "Protéines complètes d’élite pour sportifs de haut niveau",
            "Apport exceptionnel en vitamine B12 et sélénium pour la vitalité",
            "Dose massive d’Oméga-3 préservant la santé cognitive et cardiaque"
        ],
        "en": [
            "Elite athletic protein source with rapid absorption and complete amino acids",
            "Top-tier Vitamin B12 and selenium density fueling brain vitality",
            "Massive Omega-3 reservoir protecting coronary and cognitive health"
        ]
    }
},
    culinaryProfile: {
      flavor: 'rich',
      texture: 'meaty',
      bonesDifficulty: 'low',
      bestCookingMethods: ['grillade', 'tagine', 'four'],
    },
    freshnessKeys: {
      ar: ['لون أحمر ياقوتي عميق لامع مثل العقيق', 'رائحة نسيم البحر الصافي دون أي حموضة', 'قوام طري ومرن عند اللمس'],
      fr: ['Couleur rouge rubis profond et brillante', 'Odeur marine fraîche exempte de toute acidité', 'Texture élastique et souple'],
      en: ['Deep ruby-red sheen with lustrous marbling', 'Clean ocean breeze fragrance with no sour notes', 'Supple elasticity under gentle touch'],
    },
    description: {
      ar: 'التونة المغربية من أجود أنواع التونة في العالم بفضل التيارات الغذائية بين المتوسط والأطلسي. تصنع منها أطباق الطاجين مع الفلفل والطماطم أو تشوى كستيك.',
      fr: "Joyau des profondeurs marocaines réputé dans le monde entier. Chair fondante gorgée de saveur, préparée en tagine mijoté ou saisie mi-cuite à la plancha.",
      en: "World-renowned delicacy caught along Moroccan migration corridors. Exceptionally flavorful whether seared rare on a plancha or braised in rich tomato sauce.",
    },
    imageUrl: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80',
    fallbackImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Bluefin-big.jpg/1200px-Bluefin-big.jpg',
    audioPhonetic: 'Tou-na',
    recommendedRecipeIds: ['tagine-thon-rouge-chermoula', 'brochettes-espadon-grille'],
  },
  {
    id: 'calamar',
    nameDarijaArabic: 'الكالامار',
    nameDarijaLatin: 'Kalamar',
    nameFrench: 'Calamar commun / Encornet',
    nameEnglish: 'European Squid',
    scientificName: 'Loligo vulgaris',
    category: 'cephalopode',
    coast: 'both',
    mainPorts: ['Dakhla', 'Agadir', 'Safi', 'Nador', 'Casablanca', 'Tanger'],
    seasonality: {
      peakMonths: [10, 11, 12, 1, 2, 3],
      description: {
        ar: 'فصل الشتاء هو موسم الكالامار الممتاز بأحجامه الكبيرة ولحمه الطري.',
        fr: 'Saison d’hiver très favorable avec des spécimens charnus et tendres.',
        en: 'Prime winter season yielding plump, tender calamari in southern Moroccan waters.',
      },
    },
    priceRangeMAD: { min: 80, max: 140, unit: 'kg' },
    regionalNames: {
    "northChamal": "Calamar de Playa / كالامار بلبايا (طنجة، المضيق، تطوان)",
    "centreAtlantic": "الكالامار البلدي / Kalamar (الدار البيضاء، أسفي)",
    "southSoussSahara": "تيكيت / Tikit / سبييا الجنوب (الداخلة، بوجدور)"
},
    pricingDetails: {
    "wholesalePortMAD": {
        "min": 60,
        "max": 100,
        "unit": "kg"
    },
    "retailMarketMAD": {
        "min": 90,
        "max": 160,
        "unit": "kg"
    },
    "globalExportEUR": {
        "min": 13,
        "max": 20,
        "unit": "kg",
        "referenceMarket": "Mercamadrid & Barcelone"
    }
},
    nutritionPer100g: {
    "caloriesKcal": 92,
    "proteinGrams": 15.6,
    "lipidsGrams": 1.4,
    "omega3Mg": 490,
    "vitaminD_mcg": 0.5,
    "vitaminB12_mcg": 1.3,
    "iodine_mcg": 65,
    "selenium_mcg": 44.8,
    "phosphorus_mg": 220,
    "calcium_mg": 32,
    "iron_mg": 0.7,
    "zinc_mg": 1.5,
    "magnesium_mg": 33,
    "potassium_mg": 280,
    "healthHighlights": {
        "ar": [
            "غني بالزنك والنحاس العضوي الضروريين لصحة المناعة وتكوين الدم",
            "منخفض السعرات مع ملمس لحمي مشبع يساعد في إنقاص الوزن",
            "مصدر للتورين الطبيعي المنظم لضربات القلب والأوعية"
        ],
        "fr": [
            "Concentré en zinc et cuivre stimulant l’immunité et l’hématopoïèse",
            "Faible en calories avec texture rassasiante idéale pour la ligne",
            "Source naturelle de taurine régulatrice du rythme cardiovasculaire"
        ],
        "en": [
            "Concentrated in zinc and copper powering immunity and blood synthesis",
            "Low-calorie satiating protein aiding healthy weight loss",
            "Natural source of taurine regulating cardiac rhythm"
        ]
    }
},
    culinaryProfile: {
      flavor: 'sweet',
      texture: 'tender',
      bonesDifficulty: 'low',
      bestCookingMethods: ['friture', 'four', 'pastilla'],
    },
    freshnessKeys: {
      ar: ['جلد أبيض وردي شفاف مع نقاط صبغية بنية براقة', 'رائحة يود بحري منعشة وغير نفاذة', 'قوام لحمي صلب وليس مطاطياً رخواً'],
      fr: ['Chair blanc translucide ornée de petits chromatophores nacrés', 'Odeur iodée propre et subtile', 'Texture ferme et tonique'],
      en: ['Pearly translucent mantle with vibrant shimmering spots', 'Crisp fresh iodized sea scent', 'Firm and resilient body structure'],
    },
    description: {
      ar: 'عنصر أساسي في البسطيلة المغربية بالسمك وطبق الفواكه البحرية المشكلة. يطهى محشواً بالأرز والشعرية والكروفيت في الفرن أو يقلى حلقات مقرمشة.',
      fr: 'Ingrédient noble de la prestigieuse Pastilla marocaine aux fruits de mer. Délicieux également farci au riz parfumé ou doré en beignets croustillants.',
      en: 'Cornerstone of festive Moroccan Seafood Pastilla. Equally sensational stuffed with seasoned rice and shrimp or lightly dusted and fried into golden rings.',
    },
    imageUrl: 'https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=1200&q=80',
    fallbackImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Loligo_vulgaris.jpg/1200px-Loligo_vulgaris.jpg',
    audioPhonetic: 'Ka-la-mar',
    recommendedRecipeIds: ['calamar-farci-marocain', 'pastilla-l7ot-royale', 'friture-mixte-marocaine'],
  },
  {
    id: 'poulpe',
    nameDarijaArabic: 'الأخطبوط / الروكاس',
    nameDarijaLatin: 'Pwilp / Rokas',
    nameFrench: 'Poulpe commun',
    nameEnglish: 'Common Octopus',
    scientificName: 'Octopus vulgaris',
    category: 'cephalopode',
    coast: 'atlantic',
    mainPorts: ['Dakhla', 'Boujdour', 'Laâyoune', 'Essaouira', 'Agadir'],
    seasonality: {
      peakMonths: [1, 2, 3, 6, 7, 8],
      description: {
        ar: 'الداخلة هي عاصمة الأخطبوط العالمية مع فترات راحة بيولوجية منظمة لحماية الثروة.',
        fr: 'Dakhla est la capitale mondiale du poulpe, soumise à des repos biologiques rigoureux.',
        en: 'Dakhla is the global epicenter of wild octopus fisheries with strict biological resting windows.',
      },
    },
    priceRangeMAD: { min: 70, max: 130, unit: 'kg' },
    regionalNames: {
    "northChamal": "Pulpo / بولبو (الناظور، الحسيمة، طنجة)",
    "centreAtlantic": "الأخطبوط / الروكاس / Pwilp (الدار البيضاء، الصويرة)",
    "southSoussSahara": "أزوكا / أزايز / Azayz (الداخلة وبوجدور عاصمة الأخطبوط)"
},
    pricingDetails: {
    "wholesalePortMAD": {
        "min": 65,
        "max": 110,
        "unit": "kg"
    },
    "retailMarketMAD": {
        "min": 90,
        "max": 150,
        "unit": "kg"
    },
    "globalExportEUR": {
        "min": 14,
        "max": 21,
        "unit": "kg",
        "referenceMarket": "Tokyo & Espagne"
    }
},
    nutritionPer100g: {
    "caloriesKcal": 82,
    "proteinGrams": 14.9,
    "lipidsGrams": 1,
    "omega3Mg": 350,
    "vitaminD_mcg": 0.8,
    "vitaminB12_mcg": 20,
    "iodine_mcg": 90,
    "selenium_mcg": 44.8,
    "phosphorus_mg": 186,
    "calcium_mg": 53,
    "iron_mg": 5.3,
    "zinc_mg": 1.7,
    "magnesium_mg": 30,
    "potassium_mg": 350,
    "healthHighlights": {
        "ar": [
            "قنبلة فيتامين B12 الطبيعي (800% من الاحتياج اليومي) لمحاربة الإرهاق العصبي",
            "أعلى مصدر للحديد البحري (5.3 ملغ) لعلاج فقر الدم وتجديد النشاط",
            "خالٍ من الدهون المشبعة والسكريات ومناسب جداً لمرضى السكري والضغط"
        ],
        "fr": [
            "Teneur vertigineuse en vitamine B12 (plus de 800% des AJR) contre l’épuisement",
            "Source record de fer héminique marin (5,3 mg) pour vaincre l’anémie",
            "Aliment diététique pur sans graisses saturées ni sucres"
        ],
        "en": [
            "Astounding Vitamin B12 density (over 800% Daily Value) eliminating fatigue",
            "Top-tier marine iron source (5.3 mg) rapidly reversing anemia",
            "Super-lean pure dietary food with zero saturated fat, diabetic-friendly"
        ]
    }
},
    culinaryProfile: {
      flavor: 'rich',
      texture: 'firm',
      bonesDifficulty: 'low',
      bestCookingMethods: ['tagine', 'soup', 'grillade'],
    },
    freshnessKeys: {
      ar: ['المجسات كاملة مع ماصات سليمة غير متمزقة', 'لحم مشدود لامع خالي من أي رائحة أمونياك', 'لون رمادي رخامي مائل للبني الطبيعي'],
      fr: ['Ventouses intactes et fermes sur chaque tentacule', 'Peau brillante sans odeur forte', 'Teinte marbrée naturelle'],
      en: ['Intact suction cups throughout all 8 arms', 'Glossy skin without any harsh ammonia aroma', 'Natural healthy marbled tone'],
    },
    description: {
      ar: 'أخطبوط خليج الداخلة يتمتع بشهرة عالمية لمذاقه الاستثنائي. يُسلق أولاً بالملح وورق الغار والليمون، ثم يدخل في طاجين بالشرمولة أو سلطة منعشة.',
      fr: 'Le poulpe de Dakhla est prisé par les plus grands chefs au monde. Poché aux aromates puis sauté en tagine épicé à la chermoula ou en salade tiède.',
      en: 'Octopus from Dakhla Bay commands premium acclaim worldwide. Tenderized gently with bay leaf and lemon, then simmered in rich spicy charmoula sauce.',
    },
    imageUrl: 'https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=1200&q=80',
    fallbackImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Octopus_vulgaris2.jpg/1200px-Octopus_vulgaris2.jpg',
    audioPhonetic: 'Poulpe / Ro-kas',
    recommendedRecipeIds: ['tagine-poulpe-charmoula', 'chorba-l7ot-marocaine'],
  },
  {
    id: 'crevette',
    nameDarijaArabic: 'الكروفيت',
    nameDarijaLatin: 'Krovit',
    nameFrench: 'Crevette rose / royale',
    nameEnglish: 'Deep-water Rose Shrimp',
    scientificName: 'Parapenaeus longirostris',
    category: 'crustace',
    coast: 'both',
    mainPorts: ['Larache', 'Kénitra', 'Agadir', 'Casablanca', 'Tanger', 'Al Hoceima'],
    seasonality: {
      peakMonths: [3, 4, 5, 6, 9, 10, 11],
      description: {
        ar: 'متوفرة بجودة عالية على طول الساحل الأطلسي والمتوسطي معظم أشهر السنة.',
        fr: 'Excellente fraîcheur printanière et automnale sur les côtes de Larache et Agadir.',
        en: 'Outstanding spring and autumn harvest along the rich Larache and Agadir banks.',
      },
    },
    priceRangeMAD: { min: 70, max: 140, unit: 'kg' },
    regionalNames: {
    "northChamal": "Gamba Blanca / غامبا بلانكا (العرائش، أصيلة، طنجة)",
    "centreAtlantic": "الكروفيت / Krovit (الدار البيضاء، المهدية، أسفي)",
    "southSoussSahara": "القريدس الملكي / كروفيت رويال (طانطان، بوجدور)"
},
    pricingDetails: {
    "wholesalePortMAD": {
        "min": 60,
        "max": 110,
        "unit": "kg"
    },
    "retailMarketMAD": {
        "min": 90,
        "max": 180,
        "unit": "kg"
    },
    "globalExportEUR": {
        "min": 15,
        "max": 28,
        "unit": "kg",
        "referenceMarket": "Marchés européens de la marée"
    }
},
    nutritionPer100g: {
    "caloriesKcal": 99,
    "proteinGrams": 20.9,
    "lipidsGrams": 1.1,
    "omega3Mg": 540,
    "vitaminD_mcg": 0.2,
    "vitaminB12_mcg": 1.5,
    "iodine_mcg": 100,
    "selenium_mcg": 48,
    "phosphorus_mg": 250,
    "calcium_mg": 70,
    "iron_mg": 2.4,
    "zinc_mg": 1.6,
    "magnesium_mg": 35,
    "potassium_mg": 260,
    "healthHighlights": {
        "ar": [
            "مضاد أكسدة فريد (الأستازانتين Astaxanthin) يحمي البشرة والعينين من التلف",
            "غني باليود والزنك لدعم صحة الغدة الدرقية والخصوبة وتجدد الخلايا",
            "بروتين نقي بنسبة 21% بأقل من 100 سعرة حرارية لكل 100 غرام"
        ],
        "fr": [
            "Richesse en astaxanthine antioxydante protégeant la peau et la vision",
            "Haute teneur en iode et zinc pour l’équilibre hormonal et métabolique",
            "Protéines pures (21%) avec moins de 100 calories aux 100g"
        ],
        "en": [
            "Rich in astaxanthin antioxidant shielding skin and eyesight from degradation",
            "High iodine and zinc content promoting hormonal and metabolic balance",
            "Pure concentrated protein (21%) with under 100 calories per 100g"
        ]
    }
},
    culinaryProfile: {
      flavor: 'sweet',
      texture: 'tender',
      bonesDifficulty: 'low',
      bestCookingMethods: ['pil_pil', 'pastilla', 'soup'],
    },
    freshnessKeys: {
      ar: ['الرأس متصل بالجسم بقوة دون أي اسوداد', 'العيون سوداء براقة كحبات اللؤلؤ', 'القشرة صلبة وزهرية لامعة'],
      fr: ['Tête solidement attachée au corps sans noircissement', 'Yeux noirs brillants bien nets', 'Carapace translucide rosée et ferme'],
      en: ['Head firmly attached to thorax with no darkening', 'Glistening jet-black beads for eyes', 'Translucent rose-tinted firm shell'],
    },
    description: {
      ar: 'سلطانة فواكه البحر في المطبخ المغربي. بطلة طبق "كروفيت بيل-بيل" الشهير بالثوم والتحميرة والمعدنوس وزيت الزيتون الحار.',
      fr: "Reine des entrées marocaines. Vedette incontestée des crevettes pil-pil mijotées dans l'huile d'olive bouillonnante à l'ail, paprika et piment.",
      en: "The jewel of Moroccan seafood appetizers. Immortalized in sizzling Crevettes Pil-Pil cooked with crushed garlic, sweet paprika, chili, and olive oil.",
    },
    imageUrl: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=1200&q=80',
    fallbackImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Parapenaeus_longirostris.jpg/1200px-Parapenaeus_longirostris.jpg',
    audioPhonetic: 'Kro-veet',
    recommendedRecipeIds: ['crevettes-pil-pil-marocaine', 'pastilla-l7ot-royale', 'chorba-l7ot-marocaine'],
  },
  {
    id: 'sar',
    nameDarijaArabic: 'الشرغو',
    nameDarijaLatin: 'Chargho',
    nameFrench: 'Sar commun',
    nameEnglish: 'White Seabream',
    scientificName: 'Diplodus sargus',
    category: 'poisson_blanc',
    coast: 'both',
    mainPorts: ['Essaouira', 'Safi', 'Al Hoceima', 'Tanger', 'Agadir', 'Mirleft'],
    seasonality: {
      peakMonths: [4, 5, 6, 7, 8, 9],
      description: {
        ar: 'سمك صخري يتغذى على القشريات والمحار، لحمه قمة في الطراوة في الربيع والصيف.',
        fr: 'Poisson des falaises rocheuses, sublime au printemps et en été.',
        en: 'Rocky shoreline dweller that feeds on crustaceans, peaking in spring and summer.',
      },
    },
    priceRangeMAD: { min: 55, max: 95, unit: 'kg' },
    regionalNames: {
    "northChamal": "Sargo / سارغو صخري (الجبهة، الحسيمة، كاب سبارتيل)",
    "centreAtlantic": "الشرغو / Chargho بلدي (أسفي، الصويرة، الدار البيضاء)",
    "southSoussSahara": "تافروخ / الشرغو الحجري (ميرلفت، أكادير، الداخلة)"
},
    pricingDetails: {
    "wholesalePortMAD": {
        "min": 35,
        "max": 60,
        "unit": "kg"
    },
    "retailMarketMAD": {
        "min": 60,
        "max": 95,
        "unit": "kg"
    },
    "globalExportEUR": {
        "min": 9,
        "max": 14,
        "unit": "kg",
        "referenceMarket": "Mercamadrid & Lisbonne"
    }
},
    nutritionPer100g: {
    "caloriesKcal": 120,
    "proteinGrams": 20.8,
    "lipidsGrams": 3.2,
    "omega3Mg": 680,
    "vitaminD_mcg": 2.2,
    "vitaminB12_mcg": 2.9,
    "iodine_mcg": 60,
    "selenium_mcg": 42,
    "phosphorus_mg": 230,
    "calcium_mg": 35,
    "iron_mg": 0.9,
    "zinc_mg": 0.8,
    "magnesium_mg": 31,
    "potassium_mg": 370,
    "healthHighlights": {
        "ar": [
            "لحم بحري أبيض غني بالمعادن المستخلصة من القشريات التي يتغذى عليها الشرغو بين الصخور",
            "يعزز مناعة الجسم بفضل السيلينيوم والزنك العضوي",
            "بروتين مثالي لبناء النسيج العضلي بدون شحوم زائدة"
        ],
        "fr": [
            "Saveur iodée intense issue de son alimentation en crustacés rocheux",
            "Renforce l’immunité par un apport équilibré en zinc et sélénium",
            "Protéine idéale pour le développement musculaire sans graisse"
        ],
        "en": [
            "Intense mineral richness derived from its rocky shellfish diet",
            "Strengthens immunity through balanced zinc and organic selenium",
            "Ideal lean protein for muscle development without excess fat"
        ]
    }
},
    culinaryProfile: {
      flavor: 'sweet',
      texture: 'firm',
      bonesDifficulty: 'medium',
      bestCookingMethods: ['four', 'grillade', 'tagine'],
    },
    freshnessKeys: {
      ar: ['شريط أسود واضح عند قاعدة الذيل والغطاء الخيشومي', 'خطوط عمودية فضية ورمادية مرسومة بدقة', 'لحم صلب ومرن'],
      fr: ['Tache noire franche sur le pédoncule caudal', 'Rayures verticales zébrées nettes', 'Corps compact et musclé'],
      en: ['Sharp black saddle mark near tail and gill edge', 'Crisp vertical silver-grey stripes', 'Muscular, resilient body'],
    },
    description: {
      ar: 'السمك المفضل لدى هواة الصيد بالقصبة والغطس على طول صخور الصويرة والحسيمة. لحمه معطر بنكهة الرخويات البحرية التي يتغذى عليها.',
      fr: 'Le grand favori des pêcheurs de falaise marocains. Nourri de coquillages, sa chair possède un parfum marin délicatement iodé.',
      en: 'Beloved by coastal cliff anglers across Morocco. Nourished on sea mollusks and crustaceans, giving its meat a rich, naturally savory depth.',
    },
    imageUrl: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=1200&q=80',
    fallbackImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Diplodus_sargus_2.JPG/1200px-Diplodus_sargus_2.JPG',
    audioPhonetic: 'Shar-gho',
    recommendedRecipeIds: ['tagine-l7ot-khodra', 'dorade-royale-au-four'],
  },
  {
    id: 'pageot',
    nameDarijaArabic: 'الباجو',
    nameDarijaLatin: 'Bajo',
    nameFrench: 'Pageot rouge',
    nameEnglish: 'Common Pandora',
    scientificName: 'Pagellus erythrinus',
    category: 'poisson_blanc',
    coast: 'both',
    mainPorts: ['Al Hoceima', 'Nador', 'Larache', 'Tanger', 'Casablanca', 'Safi'],
    seasonality: {
      peakMonths: [5, 6, 7, 8, 9, 10],
      description: {
        ar: 'ينشط صيده في مياه البحر الأبيض المتوسط والأطلسي الشمالي خلال الأشهر المعتدلة والدافئة.',
        fr: 'Très prisé en Méditerranée et Atlantique durant la belle saison estivale.',
        en: 'Prized in Mediterranean and northern Atlantic waters during warm summer months.',
      },
    },
    priceRangeMAD: { min: 75, max: 130, unit: 'kg' },
    regionalNames: {
    "northChamal": "Besugo / بيسوغو / Pagel (طنجة، العرائش، القصر الصغير)",
    "centreAtlantic": "الباجو / الغزال / Pageot Rouge (الدار البيضاء، أسفي)",
    "southSoussSahara": "ورغل / Werghel / باجو الجنوب (سيدي إفني، بوجدور)"
},
    pricingDetails: {
    "wholesalePortMAD": {
        "min": 45,
        "max": 75,
        "unit": "kg"
    },
    "retailMarketMAD": {
        "min": 75,
        "max": 130,
        "unit": "kg"
    },
    "globalExportEUR": {
        "min": 11,
        "max": 17,
        "unit": "kg",
        "referenceMarket": "Mercamadrid & Rungis"
    }
},
    nutritionPer100g: {
    "caloriesKcal": 105,
    "proteinGrams": 19.8,
    "lipidsGrams": 2.5,
    "omega3Mg": 550,
    "vitaminD_mcg": 2,
    "vitaminB12_mcg": 2.6,
    "iodine_mcg": 70,
    "selenium_mcg": 38,
    "phosphorus_mg": 220,
    "calcium_mg": 32,
    "iron_mg": 0.8,
    "zinc_mg": 0.7,
    "magnesium_mg": 29,
    "potassium_mg": 350,
    "healthHighlights": {
        "ar": [
            "لحم وردي شهي سهل الامتصاص مناسب لجميع الفئات العمرية",
            "غني باليود والفسفور لتنشيط الذاكرة والقدرات الذهنية",
            "أحماض دهنية أوميغا 3 تحافظ على مرونة الشرايين"
        ],
        "fr": [
            "Chair fine et rosée hautement digestible pour toute la famille",
            "Richesse en iode et phosphore stimulant la concentration",
            "Acides gras Oméga-3 préservant la souplesse artérielle"
        ],
        "en": [
            "Delicate pink flesh effortlessly digested across all ages",
            "Rich in iodine and phosphorus boosting mental acuity and focus",
            "Omega-3 fatty acids preserving arterial elasticity"
        ]
    }
},
    culinaryProfile: {
      flavor: 'sweet',
      texture: 'tender',
      bonesDifficulty: 'low',
      bestCookingMethods: ['four', 'tagine'],
    },
    freshnessKeys: {
      ar: ['لون وردي ياقوتي برّاق مع بريق فضي على البطن', 'عيون صافية خالية من أي غشاوة', 'خياشيم بلون الكرز الأحمر'],
      fr: ['Robe rose carminée brillante avec reflets argentés', 'Oeil limpide sans voile terne', 'Ouïes couleur cerise'],
      en: ['Brilliant carmine pink coat with silvery flanks', 'Clear pupil free of cloudiness', 'Deep cherry-red gills'],
    },
    description: {
      ar: 'سمك نبيل بلونه الوردي الجذاب ولحمه الأبيض الطري الخالي من الدهون الزائدة. يطهى في الفرن مع شرمولة خفيفة وزيت العود وشرائح الطماطم.',
      fr: 'Poisson noble réputé pour sa chair douce et fondante. Magnifié au four à la marocaine avec tomates fraîches, huile d’olive et citron confit.',
      en: 'Noble pink sea bream adored for its succulent, delicate white meat. Baked whole in the oven draped in fresh tomatoes, olive oil, and preserved lemon.',
    },
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=80',
    fallbackImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Pagellus_erythrinus.jpg/1200px-Pagellus_erythrinus.jpg',
    audioPhonetic: 'Ba-jo',
    recommendedRecipeIds: ['pageot-royal-au-four', 'tagine-l7ot-khodra'],
  },
  {
    id: 'rouget',
    nameDarijaArabic: 'الروجي',
    nameDarijaLatin: 'Rouji',
    nameFrench: 'Rouget-barbet',
    nameEnglish: 'Red Mullet',
    scientificName: 'Mullus surmuletus',
    category: 'poisson_blanc',
    coast: 'both',
    mainPorts: ['Al Hoceima', 'Nador', 'Tanger', 'Larache', 'Mehdia', 'Essaouira'],
    seasonality: {
      peakMonths: [6, 7, 8, 9, 10, 11],
      description: {
        ar: 'موسم الصيف والخريف هو الأفضل لتذوق الروجي بنكهته الغنية.',
        fr: 'Plein éclat estival et automnal, chair parfumée et fondante.',
        en: 'Summer through autumn delivers intensely flavorful, aromatic red mullets.',
      },
    },
    priceRangeMAD: { min: 80, max: 140, unit: 'kg' },
    regionalNames: {
    "northChamal": "Salmonete / سالمونيتي دي روكا (طنجة، الناظور، الحسيمة)",
    "centreAtlantic": "الروجي الصخري / Rouget-Barbet (الدار البيضاء، أسفي)",
    "southSoussSahara": "سلطان الحوت / أزمار (أكادير، الداخلة)"
},
    pricingDetails: {
    "wholesalePortMAD": {
        "min": 50,
        "max": 80,
        "unit": "kg"
    },
    "retailMarketMAD": {
        "min": 80,
        "max": 140,
        "unit": "kg"
    },
    "globalExportEUR": {
        "min": 14,
        "max": 22,
        "unit": "kg",
        "referenceMarket": "Gastronomie française & espagnole"
    }
},
    nutritionPer100g: {
    "caloriesKcal": 117,
    "proteinGrams": 19.4,
    "lipidsGrams": 3.9,
    "omega3Mg": 820,
    "vitaminD_mcg": 3,
    "vitaminB12_mcg": 3.8,
    "iodine_mcg": 85,
    "selenium_mcg": 46,
    "phosphorus_mg": 240,
    "calcium_mg": 40,
    "iron_mg": 1.2,
    "zinc_mg": 0.9,
    "magnesium_mg": 32,
    "potassium_mg": 360,
    "healthHighlights": {
        "ar": [
            "نكهة يودية عميقة ومحتوى استثنائي من فيتامين B12 المنشط",
            "غني بالحديد العضوي وفيتامين D لحماية العظام وتجديد الدم",
            "أوميغا 3 عالية تمنح اللحم مذاقاً فاخراً ومنافع قلبية متقدمة"
        ],
        "fr": [
            "Goût iodé raffiné avec un apport tonifiant en vitamine B12",
            "Riche en fer biodisponible et vitamine D protectrice des os",
            "Teneur élevée en Oméga-3 alliant gastronomie et bienfaits vasculaires"
        ],
        "en": [
            "Deep iodized gourmet flavor paired with invigorating Vitamin B12",
            "Rich in bioavailable iron and bone-protecting Vitamin D",
            "Generous Omega-3 content merging epicurean pleasure with heart health"
        ]
    }
},
    culinaryProfile: {
      flavor: 'rich',
      texture: 'tender',
      bonesDifficulty: 'medium',
      bestCookingMethods: ['friture', 'four', 'grillade'],
    },
    freshnessKeys: {
      ar: ['شاربان استشعاريان سليمين تحت الفك السفلي', 'قشور حمراء ذهبية رطبة لا تتساقط بسهولة', 'رائحة كبد البحر العطرية المميزة'],
      fr: ['Barbillon mentonnier bien intact sous la mâchoire', 'Écailles rougeoyantes et fermement attachées', 'Parfum marin raffiné'],
      en: ['Intact sensory chin barbels under jaw', 'Glistening red-gold scales firmly anchored', 'Refined shellfish-like marine perfume'],
    },
    description: {
      ar: 'يعتبر "بندق البحر" لنكهته العطرية الغنية التي تشبه طعم الكبد والقشريات. يقلى حبات كاملة بزيت الزيتون مع رشة كمون أو يخبز في ورق الطهي.',
      fr: 'Surnommé la bécasse de mer pour son goût typé et raffiné. Cuisiné poêlé à l’huile d’olive avec ail doux et coriandre fraîche.',
      en: 'Nicknamed the sea snipe for its intensely fragrant, liver-crustacean depth. Pan-crisped in Moroccan olive oil with crushed garlic and fresh cilantro.',
    },
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    fallbackImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Mullus_surmuletus.jpg/1200px-Mullus_surmuletus.jpg',
    audioPhonetic: 'Rou-jee',
    recommendedRecipeIds: ['friture-mixte-marocaine', 'pageot-royal-au-four'],
  },
  {
    id: 'merou',
    nameDarijaArabic: 'الميرو',
    nameDarijaLatin: 'Miro',
    nameFrench: 'Mérou blanc / brun',
    nameEnglish: 'Dusky Grouper',
    scientificName: 'Epinephelus marginatus',
    category: 'poisson_blanc',
    coast: 'both',
    mainPorts: ['Al Hoceima', 'Tanger', 'Cala Iris', 'Dakhla', 'Taghazout'],
    seasonality: {
      peakMonths: [6, 7, 8, 9],
      description: {
        ar: 'سمك نادر محمي يظهر بكثرة في المياه العميقة الصخرية صيفاً.',
        fr: 'Poisson noble des profondeurs rocheuses, pêché en été.',
        en: 'Prestigious deep-reef predator caught primarily during summer months.',
      },
    },
    priceRangeMAD: { min: 120, max: 220, unit: 'kg' },
    regionalNames: {
    "northChamal": "Mero / ميرو / Cherna عملاقة (طنجة، الفنيدق، الجبهة)",
    "centreAtlantic": "الميرو الصخري / Mérou Blanc / الهامور",
    "southSoussSahara": "إيغير / Ighir / ميرو الجنوب (الداخلة، كاب بارباس)"
},
    pricingDetails: {
    "wholesalePortMAD": {
        "min": 90,
        "max": 150,
        "unit": "kg"
    },
    "retailMarketMAD": {
        "min": 150,
        "max": 240,
        "unit": "kg"
    },
    "globalExportEUR": {
        "min": 20,
        "max": 35,
        "unit": "kg",
        "referenceMarket": "Haute gastronomie méditerranéenne"
    }
},
    nutritionPer100g: {
    "caloriesKcal": 118,
    "proteinGrams": 24.8,
    "lipidsGrams": 1.8,
    "omega3Mg": 420,
    "vitaminD_mcg": 1.8,
    "vitaminB12_mcg": 3.4,
    "iodine_mcg": 70,
    "selenium_mcg": 50,
    "phosphorus_mg": 260,
    "calcium_mg": 20,
    "iron_mg": 1,
    "zinc_mg": 1.1,
    "magnesium_mg": 38,
    "potassium_mg": 460,
    "healthHighlights": {
        "ar": [
            "سيد الأسماك الصخرية بتركيز بروتيني عملاق (25 غرام) لبناء الألياف العضلية",
            "غني بالبوتاسيوم والمغنيسيوم لتنظيم كهرباء القلب ومكافحة الشد العضلي",
            "قليل الدهون المشبعة ومصدر رائع للكولاجين البحري المقوي للأوتار"
        ],
        "fr": [
            "Roi des fonds rocheux avec un apport protéique colossal (25g)",
            "Teneur élevée en potassium et magnésium prévenant les crampes musculaires",
            "Très faible en graisses avec un collagène marin fortifiant les tendons"
        ],
        "en": [
            "King of rocky sea bottoms packing a massive 25g protein concentration",
            "Rich in potassium and magnesium preventing muscle cramps and fatigue",
            "Very lean with valuable marine collagen reinforcing joint tendons"
        ]
    }
},
    culinaryProfile: {
      flavor: 'rich',
      texture: 'firm',
      bonesDifficulty: 'low',
      bestCookingMethods: ['tagine', 'four'],
    },
    freshnessKeys: {
      ar: ['جلد سميك مرقط بني وزيتوني لامع', 'لحم أبيض ناصع سميك ومتماسك جداً', 'عيون كروية كبيرة براقة'],
      fr: ['Peau épaisse mouchetée d’or et de brun sombre', 'Chair blanche très dense et compacte', 'Gros yeux sphériques étincelants'],
      en: ['Thick mottled olive-gold and bronze skin', 'Dense, snow-white compact muscle tissue', 'Large brilliant spherical eyes'],
    },
    description: {
      ar: 'زعيم الكهوف الصخرية البحرية وأفخر الأسماك المغربية على الإطلاق. لحمه طري ومكتنز يذوب في الفم ويصلح لأفخم طواجن المناسبات الكبرى.',
      fr: 'Seigneur des grottes sous-marines et sommet du raffinement gastronomique marocain. Chair succulente et moelleuse, fleuron des tagines royaux.',
      en: 'The legendary sovereign of undersea caves and pinnacle of Moroccan seafood luxury. Luscious, gelatin-rich meat crafted into celebratory royal tagines.',
    },
    imageUrl: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=1200&q=80',
    fallbackImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Epinephelus_marginatus.jpg/1200px-Epinephelus_marginatus.jpg',
    audioPhonetic: 'Mee-ro',
    recommendedRecipeIds: ['tagine-l7ot-khodra', 'pageot-royal-au-four'],
  },
  {
    id: 'bar-loup',
    nameDarijaArabic: 'الدرعي / اللوبين',
    nameDarijaLatin: 'Dr3i / Loubine',
    nameFrench: 'Bar européen / Loup de mer',
    nameEnglish: 'European Seabass',
    scientificName: 'Dicentrarchus labrax',
    category: 'poisson_blanc',
    coast: 'both',
    mainPorts: ['Moulay Bousselham', 'Oualidia', 'Dakhla', 'Larache', 'Tanger', 'Agadir'],
    seasonality: {
      peakMonths: [10, 11, 12, 1, 2, 3],
      description: {
        ar: 'موسم الخريف والشتاء في مصبات الأنهار وبحيرات الوليدية والداخلة.',
        fr: 'Saison d’automne et hiver dans les estuaires et lagunes marocaines.',
        en: 'Autumn and winter season around coastal lagoons, estuaries, and ocean beaches.',
      },
    },
    priceRangeMAD: { min: 90, max: 160, unit: 'kg' },
    regionalNames: {
    "northChamal": "Lubina / لوبينا مياه البوغاز (أصيلة، مارينا سمير)",
    "centreAtlantic": "الدرعي / اللوبين / Drâa (المهدية، شواطئ سلا، الوليدية)",
    "southSoussSahara": "أغيد / Aghed / درعي رملي (شاطئ أخفنير، وادي الشبيكة)"
},
    pricingDetails: {
    "wholesalePortMAD": {
        "min": 55,
        "max": 90,
        "unit": "kg"
    },
    "retailMarketMAD": {
        "min": 90,
        "max": 150,
        "unit": "kg"
    },
    "globalExportEUR": {
        "min": 13,
        "max": 21,
        "unit": "kg",
        "referenceMarket": "Mercamadrid & France"
    }
},
    nutritionPer100g: {
    "caloriesKcal": 97,
    "proteinGrams": 18.4,
    "lipidsGrams": 2,
    "omega3Mg": 710,
    "vitaminD_mcg": 2.1,
    "vitaminB12_mcg": 2.7,
    "iodine_mcg": 65,
    "selenium_mcg": 41,
    "phosphorus_mg": 215,
    "calcium_mg": 25,
    "iron_mg": 0.7,
    "zinc_mg": 0.8,
    "magnesium_mg": 30,
    "potassium_mg": 340,
    "healthHighlights": {
        "ar": [
            "سمك رياضي مفترس يتميز بلحم متماسك وسهل الهضم منخفض الكوليسترول",
            "غني بالأوميغا 3 المفيدة لتقوية الذاكرة والوقاية من السكتات القلبية",
            "سعرات معتدلة مناسبة جداً للوجبات الخفيفة الصحية وعشاق اللياقة"
        ],
        "fr": [
            "Poisson de chasse à la chair ferme, digeste et pauvre en cholestérol",
            "Riche en acides gras Oméga-3 favorisant la mémoire et la santé artérielle",
            "Apport calorique modéré idéal pour l’alimentation santé et minceur"
        ],
        "en": [
            "Agile predatory fish with firm, easy-to-digest low-cholesterol flesh",
            "High Omega-3 levels boosting memory and cardiovascular resilience",
            "Moderate calorie density perfectly suited for health and fitness lifestyles"
        ]
    }
},
    culinaryProfile: {
      flavor: 'sweet',
      texture: 'flaky',
      bonesDifficulty: 'low',
      bestCookingMethods: ['four', 'grillade', 'tagine'],
    },
    freshnessKeys: {
      ar: ['قشور فضية لامعة تشبه المرآة الصقيلة', 'زعانف شوكية قوية وسليمة', 'لحم صلب ومرن'],
      fr: ['Robe argentée étincelante sans ternissure', 'Nageoires dorsales rigides et intactes', 'Fermeté exemplaire au toucher'],
      en: ['Mirror-like silvery metallic reflections', 'Crisp, intact spiny dorsal fins', 'Superb resilience under finger touch'],
    },
    description: {
      ar: 'سمك رياضي شجاع يعيش عند تلاقي الأمواج بالشواطئ. لحمه أبيض نقي ذو نكهة بحرية عذبة، يطهى كاملاً في الفرن بالملح الصخري أو بالشرمولة.',
      fr: 'Poisson combatif des vagues de l’Atlantique. Sa chair blanche et floconneuse est sublimée en croûte de sel marin ou rôtie avec des herbes fraîches.',
      en: 'Dynamic gamefish prized in Moroccan coastal lagoons. Pure white, flaky flesh celebrated when roasted whole in a sea-salt crust or with lemon herbs.',
    },
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80',
    fallbackImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Dicentrarchus_labrax.jpg/1200px-Dicentrarchus_labrax.jpg',
    audioPhonetic: 'Dr-ee / Lou-bine',
    recommendedRecipeIds: ['dorade-royale-au-four', 'tagine-l7ot-khodra'],
  },
  {
    id: 'chinchard',
    nameDarijaArabic: 'الشرن',
    nameDarijaLatin: 'Chren',
    nameFrench: 'Chinchard commun',
    nameEnglish: 'Atlantic Horse Mackerel',
    scientificName: 'Trachurus trachurus',
    category: 'poisson_bleu',
    coast: 'both',
    mainPorts: ['Safi', 'Essaouira', 'Agadir', 'Casablanca', 'Al Hoceima', 'Nador'],
    seasonality: {
      peakMonths: [4, 5, 6, 7, 8, 9],
      description: {
        ar: 'متوفر بكثرة وبأسعار شعبية طوال فصلي الربيع والصيف.',
        fr: 'Abondant et très accessible du printemps à la fin de l’été.',
        en: 'Plentiful and wallet-friendly throughout spring and late summer.',
      },
    },
    priceRangeMAD: { min: 15, max: 35, unit: 'kg' },
    regionalNames: {
    "northChamal": "Jurel / خوريل (طنجة، الجبهة، الفنيدق)",
    "centreAtlantic": "الشرن / Chrene أطلسي (الدار البيضاء، المهدية، الجديدة)",
    "southSoussSahara": "تاوريكت / الشرن الأصفر (طانطان، طرفاية، العيون)"
},
    pricingDetails: {
    "wholesalePortMAD": {
        "min": 8,
        "max": 18,
        "unit": "kg"
    },
    "retailMarketMAD": {
        "min": 18,
        "max": 35,
        "unit": "kg"
    },
    "globalExportEUR": {
        "min": 3.5,
        "max": 6.5,
        "unit": "kg",
        "referenceMarket": "Espagne & Afrique de l’Ouest"
    }
},
    nutritionPer100g: {
    "caloriesKcal": 114,
    "proteinGrams": 19.8,
    "lipidsGrams": 3.8,
    "omega3Mg": 920,
    "vitaminD_mcg": 3.5,
    "vitaminB12_mcg": 5.2,
    "iodine_mcg": 50,
    "selenium_mcg": 48,
    "phosphorus_mg": 230,
    "calcium_mg": 45,
    "iron_mg": 1.5,
    "zinc_mg": 1,
    "magnesium_mg": 32,
    "potassium_mg": 360,
    "healthHighlights": {
        "ar": [
            "سمك أزرق شعبي بقيمة غذائية مذهلة تضاهي أغلى الأسماك البحرية",
            "تركيز قوي من أوميغا 3 والحديد لمكافحة فقر الدم وتنشيط الدورة الدموية",
            "فيتامين B12 وفيتامين D بأسعار اقتصادية في متناول جميع العائلات"
        ],
        "fr": [
            "Poisson bleu économique avec une densité nutritionnelle remarquable",
            "Teneur élevée en Oméga-3 et fer luttant contre l’anémie",
            "Richesse accessible en vitamines D et B12 pour toute la famille"
        ],
        "en": [
            "Affordable blue fish matching the nutritional prestige of expensive species",
            "Potent Omega-3 and iron synergy combating anemia and fatigue",
            "Cost-effective powerhouse of Vitamins D and B12 for everyday wellbeing"
        ]
    }
},
    culinaryProfile: {
      flavor: 'rich',
      texture: 'firm',
      bonesDifficulty: 'medium',
      bestCookingMethods: ['grillade', 'friture', 'tagine'],
    },
    freshnessKeys: {
      ar: ['الخط الجانبي الشوكي بارز وقوي', 'لون أزرق مخضر براق على الظهر', 'خياشيم حمراء طرية'],
      fr: ['Ligne latérale d’écussons osseux bien nette', 'Dos vert-bleuté irisé', 'Ouïes rouge carmin fraîches'],
      en: ['Sharp bony scutes along the lateral line', 'Iridescent blue-green dorsal surface', 'Bright carmine moist gills'],
    },
    description: {
      ar: 'سمك شعبي بامتياز في أسواق السمك المغربية. غني بأحماض أوميغا 3 والدهون الصحية، يشوى على الجمر مع الملح والكمون وعصرة حامض.',
      fr: 'Poisson populaire très apprécié au Maroc. Riche en nutriments, délicieux grillé entier sur charbon de bois avec cumin et gros sel.',
      en: 'Popular staple across Moroccan fish markets. Exceptionally rich in healthy omega fatty acids, roasted over charcoal with cumin and coarse sea salt.',
    },
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    fallbackImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Trachurus_trachurus.jpg/1200px-Trachurus_trachurus.jpg',
    audioPhonetic: 'Chr-en',
    recommendedRecipeIds: ['sardine-mechwi-grillade', 'friture-mixte-marocaine'],
  },
  {
    id: 'maquereau',
    nameDarijaArabic: 'الكابايلا',
    nameDarijaLatin: 'Kabayla',
    nameFrench: 'Maquereau commun',
    nameEnglish: 'Atlantic Mackerel',
    scientificName: 'Scomber scombrus',
    category: 'poisson_bleu',
    coast: 'both',
    mainPorts: ['Safi', 'Essaouira', 'Agadir', 'Larache', 'Tanger', 'Al Hoceima'],
    seasonality: {
      peakMonths: [3, 4, 5, 6, 7, 8, 9],
      description: {
        ar: 'موسم الهجرة والوفرة في الربيع والصيف.',
        fr: 'Haute saison printanière et estivale, chair grasse et nutritive.',
        en: 'Prime spring and summer schools migrating along Atlantic coasts.',
      },
    },
    priceRangeMAD: { min: 15, max: 30, unit: 'kg' },
    regionalNames: {
    "northChamal": "Caballa / كابايا الشمالية (طنجة، تطوان، الحسيمة)",
    "centreAtlantic": "الكابايلا / Kabayla (أسفي، الصويرة، سلا، المهدية)",
    "southSoussSahara": "تاسارغالت / سمك الإسقمري (أكادير، سيدي إفني)"
},
    pricingDetails: {
    "wholesalePortMAD": {
        "min": 7,
        "max": 15,
        "unit": "kg"
    },
    "retailMarketMAD": {
        "min": 15,
        "max": 30,
        "unit": "kg"
    },
    "globalExportEUR": {
        "min": 3,
        "max": 5.5,
        "unit": "kg",
        "referenceMarket": "Marchés de conserve d’Europe"
    }
},
    nutritionPer100g: {
    "caloriesKcal": 205,
    "proteinGrams": 18.6,
    "lipidsGrams": 13.9,
    "omega3Mg": 2500,
    "vitaminD_mcg": 16.1,
    "vitaminB12_mcg": 8.7,
    "iodine_mcg": 50,
    "selenium_mcg": 44,
    "phosphorus_mg": 240,
    "calcium_mg": 15,
    "iron_mg": 1.6,
    "zinc_mg": 0.9,
    "magnesium_mg": 33,
    "potassium_mg": 350,
    "healthHighlights": {
        "ar": [
            "بطل العالم في الأوميغا 3 وفيتامين D3 (16.1 ميكروغرام = 100% من الاحتياج اليومي)",
            "يقوي الجهاز المناعي ويحمي الشرايين من التصلب والجلطات",
            "يحسن الحالة المزاجية والوظائف العصبية بفضل الأحماض الدهنية الأساسية"
        ],
        "fr": [
            "Champion absolu des Oméga-3 et de la vitamine D3 (100% des besoins quotidiens)",
            "Renforce l’immunité et prévient l’athérosclérose vasculaire",
            "Soutient l’humeur et la transmission synaptique cérébrale"
        ],
        "en": [
            "World champion in natural Omega-3 and Vitamin D3 (100% of daily requirement)",
            "Bolsters immunity and actively shields arteries from plaque buildup",
            "Elevates mood and synaptic transmission through concentrated essential fatty acids"
        ]
    }
},
    culinaryProfile: {
      flavor: 'rich',
      texture: 'tender',
      bonesDifficulty: 'medium',
      bestCookingMethods: ['four', 'grillade', 'tagine'],
    },
    freshnessKeys: {
      ar: ['تموجات النمر الزرقاء والخضراء براقة وحادة التباين', 'بطن أبيض لؤلؤي لا يحمل أي بقع', 'عيون دائرية واضحة'],
      fr: ['Zébrures tigrées vert et bleu acier très contrastées', 'Ventre blanc nacré immaculé', 'Oeil clair et vif'],
      en: ['Sharp tiger-like blue and metallic green stripes', 'Pristine pearly white abdomen', 'Crisp, bright circular eyes'],
    },
    description: {
      ar: 'سمك دهني لذيذ ومفيد جداً للقلب. يطهى في المغرب في طواجن الخضار أو يشرمل ويدخل للفرن مع شرائح الليمون وورق الرند ومطيشة.',
      fr: 'Poisson bleu aux vertus cardiovasculaires reconnues. Se prête à merveille aux tagines mijotés, en papillote au four ou mariné au vinaigre façon escabèche.',
      en: 'Hearty blue fish cherished for its rich, satisfying character. Baked in the oven with sliced onions, bay leaves, vine tomatoes, and Moroccan spices.',
    },
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    fallbackImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Scomber_scombrus.jpg/1200px-Scomber_scombrus.jpg',
    audioPhonetic: 'Ka-bay-la',
    recommendedRecipeIds: ['tagine-l7ot-khodra', 'sardine-mechwi-grillade'],
  },
  {
    id: 'anchois',
    nameDarijaArabic: 'الأنشوبة / الشطون',
    nameDarijaLatin: 'Anchouba / Chtoun',
    nameFrench: 'Anchois européen',
    nameEnglish: 'European Anchovy',
    scientificName: 'Engraulis encrasicolus',
    category: 'poisson_bleu',
    coast: 'both',
    mainPorts: ['Al Hoceima', 'Nador', 'Larache', 'Tanger', 'Agadir', 'Essaouira'],
    seasonality: {
      peakMonths: [4, 5, 6, 7, 8, 9],
      description: {
        ar: 'فصل الصيف هو قمة صيد الشطون في خليج الحسيمة والعرائش.',
        fr: 'Apogée estivale dans la baie d’Al Hoceima et Larache.',
        en: 'Summer bounty, especially famous in the Bay of Al Hoceima and Larache.',
      },
    },
    priceRangeMAD: { min: 20, max: 45, unit: 'kg' },
    regionalNames: {
    "northChamal": "Boquerón / بوقيرون أندلسي (طنجة، المضيق، الحسيمة)",
    "centreAtlantic": "الشطون / Chteba / الأنشوبة (الدار البيضاء، الجديدة، أسفي)",
    "southSoussSahara": "شطوبة الصحراء / تيميست (طانطان، بوجدور)"
},
    pricingDetails: {
    "wholesalePortMAD": {
        "min": 15,
        "max": 30,
        "unit": "kg"
    },
    "retailMarketMAD": {
        "min": 30,
        "max": 55,
        "unit": "kg"
    },
    "globalExportEUR": {
        "min": 5.5,
        "max": 9,
        "unit": "kg",
        "referenceMarket": "Conserveries Espagne & Italie"
    }
},
    nutritionPer100g: {
    "caloriesKcal": 131,
    "proteinGrams": 20.4,
    "lipidsGrams": 4.8,
    "omega3Mg": 1480,
    "vitaminD_mcg": 1.7,
    "vitaminB12_mcg": 3.5,
    "iodine_mcg": 55,
    "selenium_mcg": 36.5,
    "phosphorus_mg": 250,
    "calcium_mg": 147,
    "iron_mg": 3.3,
    "zinc_mg": 1.7,
    "magnesium_mg": 41,
    "potassium_mg": 380,
    "healthHighlights": {
        "ar": [
            "غني بالكالسيوم والحديد لدعم صحة الدم وتقوية عظام الأطفال والبالغين",
            "تركيز قوي من دهون EPA و DHA المفيدة لصحة شبكية العين والدماغ",
            "سمك نقي من الملوثات بفضل صغر حجمه وقصر دورة حياته في البحر"
        ],
        "fr": [
            "Riche en calcium et fer pour la vitalité sanguine et osseuse",
            "Concentré en EPA/DHA protégeant la rétine et la mémoire",
            "Poisson pur et sain sans accumulation de métaux lourds"
        ],
        "en": [
            "Rich in calcium and iron fortifying blood health and bone matrix",
            "Packed with EPA and DHA protecting retinal acuity and cognitive health",
            "Clean ocean fish naturally free of heavy metal accumulation"
        ]
    }
},
    culinaryProfile: {
      flavor: 'rich',
      texture: 'tender',
      bonesDifficulty: 'low',
      bestCookingMethods: ['friture', 'four'],
    },
    freshnessKeys: {
      ar: ['جسم فضي مائل للأزرق لامع ومستقيم', 'رائحة منعشة كأمواج الشاطئ', 'بطن سليم غير متمزق'],
      fr: ['Ligne argentée latérale brillante', 'Odeur saline fraîche', 'Ventre intact sans déchirure'],
      en: ['Silvery iridescent side band', 'Clean seaside breeze odor', 'Intact belly with no ruptures'],
    },
    description: {
      ar: 'سمك صغير الحجم ذو نكهة عميقة. يُقلى في باقات مرتبطة بالذيل للحصول على قرمشة لا تقاوم، أو يُخلل بزيت الزيتون والثوم والخل.',
      fr: 'Petit poisson gorgé de soleil. Délicieux frit en éventails dorés croustillants ou mariné au vinaigre, ail et huile d’olive.',
      en: 'Petite fish with profound depth of flavor. Often grouped by their tails into bouquets, dusted in semolina, and deep-fried to crispy perfection.',
    },
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    fallbackImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Engraulis_encrasicolus.jpg/1200px-Engraulis_encrasicolus.jpg',
    audioPhonetic: 'An-chou-ba / Chtoun',
    recommendedRecipeIds: ['friture-mixte-marocaine', 'sardines-mchermline'],
  },
  {
    id: 'raie',
    nameDarijaArabic: 'الراية',
    nameDarijaLatin: 'Raya',
    nameFrench: 'Raie bouclée',
    nameEnglish: 'Thornback Ray / Skate',
    scientificName: 'Raja clavata',
    category: 'cartilagineux',
    coast: 'both',
    mainPorts: ['Casablanca', 'Mehdia', 'Safi', 'Essaouira', 'Agadir', 'Tanger'],
    seasonality: {
      peakMonths: [11, 12, 1, 2, 3, 4],
      description: {
        ar: 'فصل الشتاء والربيع هما أفضل أوقات صيد الراية في مياه الأطلسي.',
        fr: 'Saison hivernale et printanière optimale sur la côte atlantique.',
        en: 'Prime winter and spring seasons in Moroccan Atlantic continental shelves.',
      },
    },
    priceRangeMAD: { min: 40, max: 75, unit: 'kg' },
    regionalNames: {
    "northChamal": "Raya / رايا (المتوسط، كاب سبارتيل، طنجة)",
    "centreAtlantic": "الراية / جناح البحر / Raie (الدار البيضاء، المهدية، أسفي)",
    "southSoussSahara": "تيفيرت / راية الرمال (الداخلة، طرفاية)"
},
    pricingDetails: {
    "wholesalePortMAD": {
        "min": 20,
        "max": 40,
        "unit": "kg"
    },
    "retailMarketMAD": {
        "min": 40,
        "max": 70,
        "unit": "kg"
    },
    "globalExportEUR": {
        "min": 6.5,
        "max": 11,
        "unit": "kg",
        "referenceMarket": "Marchés de l’Atlantique nord"
    }
},
    nutritionPer100g: {
    "caloriesKcal": 89,
    "proteinGrams": 20.5,
    "lipidsGrams": 0.7,
    "omega3Mg": 220,
    "vitaminD_mcg": 0.8,
    "vitaminB12_mcg": 2.2,
    "iodine_mcg": 60,
    "selenium_mcg": 34,
    "phosphorus_mg": 200,
    "calcium_mg": 30,
    "iron_mg": 0.8,
    "zinc_mg": 0.9,
    "magnesium_mg": 28,
    "potassium_mg": 320,
    "healthHighlights": {
        "ar": [
            "خالية تماماً من العظام الصلبة؛ أجنحتها مكونة من غضاريف نقية مغذية",
            "بروتين خفيف عالي النقاء بأقل من 1% دهون مناسب لحميات التخسيس",
            "غضاريفها غنية بالكوندرويتين والجيلاتين الطبيعي لصحة المفاصل"
        ],
        "fr": [
            "Dépourvue d’arêtes dures, ailes composées de cartilage noble",
            "Protéines ultra-pures à moins de 1% de graisses pour la minceur",
            "Cartilage riche en chondroïtine naturelle préservant les articulations"
        ],
        "en": [
            "Completely free of pin-bones; wings formed of noble edible cartilage",
            "Ultra-pure protein with under 1% lipids perfect for lean diets",
            "Cartilage naturally loaded with chondroitin protecting joint mobility"
        ]
    }
},
    culinaryProfile: {
      flavor: 'sweet',
      texture: 'tender',
      bonesDifficulty: 'low',
      bestCookingMethods: ['tagine', 'four'],
    },
    freshnessKeys: {
      ar: ['خلو الجناح تماماً من أي رائحة أمونياك', 'لحم لزج برطوبة طبيعية بيضاء', 'قوام طري مشدود'],
      fr: ['Absence totale d’odeur d’ammoniaque', 'Chair nacrée avec mucus protecteur clair', 'Texture gélatineuse et tendre'],
      en: ['Zero traces of ammonia smell', 'Pearly cartilage with clean protective moisture', 'Supple, tender wing texture'],
    },
    description: {
      ar: 'سمك غضروفي فريد خالي من الشوك العظمي. تُطهى أجنحتها في طاجين بالشرمولة الحارة وعصير الحامض والزيتون الأحمر، حيث يذوب اللحم بين الغضاريف.',
      fr: "Poisson cartilagineux sans arêtes osseuses. Ses ailes fondent littéralement dans un tagine relevé à la chermoula, olives rouges et citron confit.",
      en: 'Cartilaginous fish with no bones, only soft central fibers. Its wings melt into tender strips when simmered in zesty charmoula and cured red olives.',
    },
    imageUrl: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=1200&q=80',
    fallbackImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Raja_clavata.jpg/1200px-Raja_clavata.jpg',
    audioPhonetic: 'Ra-ya',
    recommendedRecipeIds: ['tagine-l7ot-khodra', 'merlan-au-four-charmoula'],
  },
  {
    id: 'saint-pierre',
    nameDarijaArabic: 'حوتة سيدنا موسى / الديك',
    nameDarijaLatin: 'Ddik / Houtat Sidna Moussa',
    nameFrench: 'Saint-Pierre',
    nameEnglish: "John Dory / St Peter's Fish",
    scientificName: 'Zeus faber',
    category: 'poisson_blanc',
    coast: 'both',
    mainPorts: ['Tanger', 'Al Hoceima', 'Casablanca', 'Safi', 'Agadir'],
    seasonality: {
      peakMonths: [10, 11, 12, 1, 2, 3],
      description: {
        ar: 'سمك أعماق نبيل يظهر بكثرة في مواسم البرد.',
        fr: 'Poisson noble d’eaux profondes très apprécié en hiver.',
        en: 'Prestigious deep-water fish captured predominantly during colder months.',
      },
    },
    priceRangeMAD: { min: 110, max: 200, unit: 'kg' },
    regionalNames: {
    "northChamal": "Pez de San Pedro / سان بيدرو (طنجة، العرائش)",
    "centreAtlantic": "حوتة سيدنا موسى / الديك / Saint-Pierre (الدار البيضاء، أسفي)",
    "southSoussSahara": "أم الشعور / الحوتة المباركة (الصويرة، أكادير، الداخلة)"
},
    pricingDetails: {
    "wholesalePortMAD": {
        "min": 80,
        "max": 140,
        "unit": "kg"
    },
    "retailMarketMAD": {
        "min": 140,
        "max": 220,
        "unit": "kg"
    },
    "globalExportEUR": {
        "min": 18,
        "max": 32,
        "unit": "kg",
        "referenceMarket": "Rungis & Gastronomie européenne"
    }
},
    nutritionPer100g: {
    "caloriesKcal": 95,
    "proteinGrams": 19.8,
    "lipidsGrams": 1.4,
    "omega3Mg": 380,
    "vitaminD_mcg": 1.5,
    "vitaminB12_mcg": 2.5,
    "iodine_mcg": 75,
    "selenium_mcg": 40,
    "phosphorus_mg": 210,
    "calcium_mg": 25,
    "iron_mg": 0.7,
    "zinc_mg": 0.8,
    "magnesium_mg": 27,
    "potassium_mg": 330,
    "healthHighlights": {
        "ar": [
            "لحم أرستقراطي أبيض فائق النعومة والصفاء بمذاق بحري راقٍ",
            "قليل السعرات وغني بالفيتامينات والمعادن النادرة",
            "يدعم الجهاز القلبي الوعائي ويمنح طاقة نظيفة بدون كولسترول ضار"
        ],
        "fr": [
            "Chair aristocratique blanche d’une finesse gastronomique rare",
            "Faible en calories et riche en oligo-éléments marins essentiels",
            "Soutien cardiovasculaire et vitalité musculaire sans graisses superflues"
        ],
        "en": [
            "Aristocratic white meat of exquisite culinary delicacy",
            "Low calorie density loaded with essential marine micro-nutrients",
            "Fosters cardiovascular wellbeing and clean muscular stamina"
        ]
    }
},
    culinaryProfile: {
      flavor: 'sweet',
      texture: 'tender',
      bonesDifficulty: 'low',
      bestCookingMethods: ['four', 'tagine'],
    },
    freshnessKeys: {
      ar: ['البقعة السوداء الدائرية الشهيرة واضحة على جانبي الجسم', 'الزعانف الظهرية الطويلة الخيطية غير مكسورة', 'لحم صلب بلون أبيض ناصع'],
      fr: ['Célèbre ocelle noire bien définie sur chaque flanc', 'Longs filaments dorsaux intacts', 'Chair dense et très blanche'],
      en: ["The famous dark 'fingerprint' spot distinct on flanks", 'Intact long dorsal filaments', 'Firm, snow-white meat'],
    },
    description: {
      ar: 'سمك أسطوري بلحمه الأبيض الفاخر الخفيف الذي يقارن بلحم الكركند. يطهى في الفرن مع زيت الزيتون البكر والزعفران الحر والليمون المخلل.',
      fr: 'Poisson de légende à la chair délicate et savoureuse rivalisant avec le homard. Rôti au four avec safran pur de Taliouine et citron confit.',
      en: 'Legendary delicacy with firm yet yielding flakes often compared to lobster. Roasted gently with Taliouine saffron, virgin olive oil, and cured lemon.',
    },
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80',
    fallbackImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Zeus_faber_2.JPG/1200px-Zeus_faber_2.JPG',
    audioPhonetic: 'Ddeek / Saint-Pierre',
    recommendedRecipeIds: ['pageot-royal-au-four', 'tagine-l7ot-khodra'],
  },
  {
    id: 'lotte',
    nameDarijaArabic: 'الراسكاس / اللوط',
    nameDarijaLatin: 'Lotte / Baudroie',
    nameFrench: 'Baudroie commune / Lotte de mer',
    nameEnglish: 'Monkfish / Anglerfish',
    scientificName: 'Lophius piscatorius',
    category: 'poisson_blanc',
    coast: 'both',
    mainPorts: ['Tanger', 'Larache', 'Casablanca', 'Safi', 'Al Hoceima', 'Agadir'],
    seasonality: {
      peakMonths: [11, 12, 1, 2, 3, 4],
      description: {
        ar: 'موسم الشتاء والربيع هو ذروة صيد اللوط في الأعماق.',
        fr: 'Haute saison en hiver et début du printemps.',
        en: 'Prime deep-trawling season throughout winter and early spring.',
      },
    },
    priceRangeMAD: { min: 80, max: 140, unit: 'kg' },
    regionalNames: {
    "northChamal": "Rape / رابي (مضيق جبل طارق، طنجة، الحسيمة)",
    "centreAtlantic": "اللوط / الراسكاس الأسود / Baudroie (الدار البيضاء، أسفي)",
    "southSoussSahara": "أكراز / وحش القاع (الداخلة، طانطان، العيون)"
},
    pricingDetails: {
    "wholesalePortMAD": {
        "min": 50,
        "max": 85,
        "unit": "kg"
    },
    "retailMarketMAD": {
        "min": 85,
        "max": 140,
        "unit": "kg"
    },
    "globalExportEUR": {
        "min": 14,
        "max": 24,
        "unit": "kg",
        "referenceMarket": "Marchés de gros français & espagnols"
    }
},
    nutritionPer100g: {
    "caloriesKcal": 76,
    "proteinGrams": 14.8,
    "lipidsGrams": 1.5,
    "omega3Mg": 260,
    "vitaminD_mcg": 1,
    "vitaminB12_mcg": 1.8,
    "iodine_mcg": 65,
    "selenium_mcg": 35,
    "phosphorus_mg": 190,
    "calcium_mg": 20,
    "iron_mg": 0.5,
    "zinc_mg": 0.6,
    "magnesium_mg": 22,
    "potassium_mg": 300,
    "healthHighlights": {
        "ar": [
            "لحم ذيل اللوط خالٍ تماماً من الحسك وله قوام يشبه لحم الكركند الفاخر",
            "من أخفض الأسماك في السعرات الحرارية (76 سعرة) مع نسبة دهون شبه منعدمة",
            "رأسها وعظامها المركزية كنز لصنع أشهى حساء بحري مقوي للمناعة"
        ],
        "fr": [
            "Queue de lotte sans aucune arête à texture proche de la langouste",
            "L’un des poissons les plus légers du littoral (76 kcal) sans matières grasses",
            "Base idéale pour des fumets et bouillons marins riches en minéraux"
        ],
        "en": [
            "Boneless tail meat delivering a lobster-like culinary texture",
            "Among the leanest ocean catches (76 kcal) with negligible fat",
            "Exceptional base for mineral-rich restorative marine broths"
        ]
    }
},
    culinaryProfile: {
      flavor: 'sweet',
      texture: 'meaty',
      bonesDifficulty: 'low',
      bestCookingMethods: ['tagine', 'four', 'soup'],
    },
    freshnessKeys: {
      ar: ['ذيل اللوط صلب ولحمه متماسك كالمطاط الطبيعي المرن', 'لون الجلد رمادي موحد وخالٍ من الاسوداد', 'خلوه من أي رائحة كريهة'],
      fr: ['Queue de lotte très ferme et rebondie', 'Peau grisâtre uniforme', 'Odeur d’iode pure'],
      en: ['Firm, bouncy monkfish tail that springs back immediately', 'Uniform healthy grey tone', 'Pure, refreshing iodine sea breeze aroma'],
    },
    description: {
      ar: 'يطلق عليها في المطاعم "كركند الفقراء" لأن قوام لحمها يشبه لحم فواكه البحر الصلب. أفضل سمك لطاجين الخضار لأن لحمها لا يتفتت أبداً.',
      fr: "Chair ferme et gélatineuse remarquable, souvent comparée à la langouste. Idéale pour les tagines mijotés car elle ne s'effrite jamais à la cuisson.",
      en: "Prized for its firm, meaty texture reminiscent of lobster tail. The ultimate fish for Moroccan tagines as it never breaks down during slow simmering.",
    },
    imageUrl: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=1200&q=80',
    fallbackImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Lophius_piscatorius.jpg/1200px-Lophius_piscatorius.jpg',
    audioPhonetic: 'Lotte / Baw-drway',
    recommendedRecipeIds: ['tagine-l7ot-khodra', 'chorba-l7ot-marocaine'],
  },
  {
    id: 'moules-bouzroug',
    nameDarijaArabic: 'بوزروك',
    nameDarijaLatin: 'Bouzroug',
    nameFrench: 'Moule méditerranéenne / atlantique',
    nameEnglish: 'Mediterranean Mussel',
    scientificName: 'Mytilus galloprovincialis',
    category: 'mollusque',
    coast: 'both',
    mainPorts: ['Essaouira', 'Taghazout', 'Oualidia', 'Imssouane', 'Al Hoceima', 'Mirleft'],
    seasonality: {
      peakMonths: [7, 8, 9, 10, 11],
      description: {
        ar: 'موسم الصيف والخريف هو وقت قطف بوزروك من الصخور الشاطئية.',
        fr: 'Récolte estivale et automnale sur les rochers battus par la houle.',
        en: 'Summer and autumn wild harvest on surf-swept rocky outcroppings.',
      },
    },
    priceRangeMAD: { min: 25, max: 50, unit: 'kg' },
    regionalNames: {
    "northChamal": "Mejillones / ميخيونيس (كاب سبارتيل، مارتيل، الناظور)",
    "centreAtlantic": "بوزروك / Bouzroug بلدي (الصويرة، تامري، إموران)",
    "southSoussSahara": "تيفريت / صدف الصخور (ميرلفت، سيدي إفني، بوجدور)"
},
    pricingDetails: {
    "wholesalePortMAD": {
        "min": 10,
        "max": 20,
        "unit": "kg"
    },
    "retailMarketMAD": {
        "min": 20,
        "max": 40,
        "unit": "kg"
    },
    "globalExportEUR": {
        "min": 4,
        "max": 8,
        "unit": "kg",
        "referenceMarket": "Espagne & France"
    }
},
    nutritionPer100g: {
    "caloriesKcal": 86,
    "proteinGrams": 11.9,
    "lipidsGrams": 2.2,
    "omega3Mg": 780,
    "vitaminD_mcg": 1.1,
    "vitaminB12_mcg": 12,
    "iodine_mcg": 140,
    "selenium_mcg": 56,
    "phosphorus_mg": 240,
    "calcium_mg": 33,
    "iron_mg": 4,
    "zinc_mg": 1.6,
    "magnesium_mg": 34,
    "potassium_mg": 320,
    "healthHighlights": {
        "ar": [
            "قنبلة الحديد واليود وفيتامين B12 (500% من الاحتياج اليومي) لمحاربة الأنيميا والتعب",
            "غني بالسيلينيوم والأوميغا 3 البحرية لدعم صحة القلب وتنشيط المناعة",
            "صدفيات برية طبيعية غنية بالمعادن النادرة المفيدة لتوازن الهرمونات"
        ],
        "fr": [
            "Concentré puissant en fer (4,0 mg), iode et vitamine B12 (500% des AJR)",
            "Riche en sélénium antioxydant et acides gras protecteurs",
            "Mollusque sauvage gorgé d’oligo-éléments marins revigorants"
        ],
        "en": [
            "Potent reservoir of bioavailable iron (4.0 mg), iodine, and Vitamin B12 (500% DV)",
            "Rich in antioxidant selenium and cardioprotective marine lipids",
            "Wild ocean shellfish packed with invigorating trace elements"
        ]
    }
},
    culinaryProfile: {
      flavor: 'rich',
      texture: 'tender',
      bonesDifficulty: 'low',
      bestCookingMethods: ['tagine', 'soup', 'pastilla'],
    },
    freshnessKeys: {
      ar: ['الصدفات مغلقة بإحكام أو تنغلق فور النقر عليها', 'رائحة أمواج المحيط النظيفة', 'ثقل الصدفة الدال على احتوائها على ماء البحر الطبيعي'],
      fr: ['Coquilles fermées ou se refermant net au toucher', 'Odeur d’écume marine', 'Coquille lourde et pleine d’eau'],
      en: ['Tightly closed shells that snap shut on tapping', 'Pristine ocean foam scent', 'Heavy weight signifying fresh sea liquor inside'],
    },
    description: {
      ar: 'عشيق أهالي الصويرة وتغازوت. يُطهى بوزروك في طويجين صويري حار مع مطيشة محكوكة، الثوم، الفلفل الحار، والكمون مع زيت الزيتون المعصور.',
      fr: "Trésor des rochers d’Essaouira et du Souss. Préparé en petit tagine mijoté à la sauce tomate épicée, ail, cumin et piment fort.",
      en: "Beloved treasure of Essaouira and coastal Souss. Simmered into a fiery tomato-cumin tagine packed with garlic, fresh herbs, and spicy chili.",
    },
    imageUrl: 'https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=1200&q=80',
    fallbackImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Mytilus_galloprovincialis_1.JPG/1200px-Mytilus_galloprovincialis_1.JPG',
    audioPhonetic: 'Bouz-roug',
    recommendedRecipeIds: ['tagine-bouzroug-essaouira', 'pastilla-l7ot-royale'],
  },
  {
    id: 'huitres-dakhla',
    nameDarijaArabic: 'المحار / لي كخيطخ',
    nameDarijaLatin: 'L-M7ar / Huitres',
    nameFrench: 'Huître creuse de Dakhla & Oualidia',
    nameEnglish: 'Pacific Oyster (Dakhla / Oualidia)',
    scientificName: 'Crassostrea gigas',
    category: 'mollusque',
    coast: 'atlantic',
    mainPorts: ['Dakhla', 'Oualidia', 'Taghazout'],
    seasonality: {
      peakMonths: [9, 10, 11, 12, 1, 2, 3, 4],
      description: {
        ar: 'أشهر الأشهر الباردة هي الأفضل لتذوق محار خليج الداخلة وبحيرة الوليدية.',
        fr: 'Saison reine des mois en « r » (septembre à avril) dans les parcs de Dakhla.',
        en: 'Prime oyster season spanning September through April in the pristine Dakhla Bay.',
      },
    },
    priceRangeMAD: { min: 6, max: 15, unit: 'piece' },
    regionalNames: {
    "northChamal": "Ostras / أوستراس (مارتيل، مارينا سمير)",
    "centreAtlantic": "المحار / محار الوليدية الشهير (بحيرة الوليدية)",
    "southSoussSahara": "محار خليج الداخلة النقي / L-M7ar (خليج وادي الذهب)"
},
    pricingDetails: {
    "wholesalePortMAD": {
        "min": 40,
        "max": 70,
        "unit": "piece"
    },
    "retailMarketMAD": {
        "min": 70,
        "max": 130,
        "unit": "piece"
    },
    "globalExportEUR": {
        "min": 12,
        "max": 22,
        "unit": "piece",
        "referenceMarket": "Export européen haut de gamme"
    }
},
    nutritionPer100g: {
    "caloriesKcal": 68,
    "proteinGrams": 9.5,
    "lipidsGrams": 2.5,
    "omega3Mg": 680,
    "vitaminD_mcg": 2.3,
    "vitaminB12_mcg": 16,
    "iodine_mcg": 110,
    "selenium_mcg": 77,
    "phosphorus_mg": 160,
    "calcium_mg": 60,
    "iron_mg": 6,
    "zinc_mg": 16.6,
    "magnesium_mg": 45,
    "potassium_mg": 220,
    "healthHighlights": {
        "ar": [
            "أعلى تركيز للزنك في الطبيعة (16.6 ملغ = 150% من الاحتياج اليومي) للخصوبة وتقوية المناعة",
            "مصدر ممتاز للحديد العضوي وفيتامين B12 لمحاربة الوهن وتجديد الخلايا",
            "مياه خليج الداخلة النقية المصنفة دولياً تمنحه نقاءً بيولوجياً استثنائياً"
        ],
        "fr": [
            "Teneur absolue en zinc organique (16,6 mg) pour l’immunité et la vitalité",
            "Source record de fer biodisponible et vitamine B12 anti-fatigue",
            "Purifié dans les eaux cristallines de la baie de Dakhla classées d’excellence"
        ],
        "en": [
            "Highest natural zinc concentration on Earth (16.6 mg) boosting endocrine and immune power",
            "Record level of bioavailable iron and Vitamin B12 revitalizing stamina",
            "Cultivated in the pristine, globally-certified waters of Dakhla lagoon"
        ]
    }
},
    culinaryProfile: {
      flavor: 'sweet',
      texture: 'tender',
      bonesDifficulty: 'low',
      bestCookingMethods: ['pil_pil'],
    },
    freshnessKeys: {
      ar: ['صدفة مغلقة بإحكام تقاوم الفتح', 'امتلاء الصدفة بماء البحر الشفاف', 'تقلص طرف المحارة عند لمسه برأس سكين أو قطرة ليمون'],
      fr: ['Coquille hermétique qui résiste à l’ouverture', 'Présence d’une eau de mer claire et abondante', 'Rétraction immédiate du manteau au jus de citron'],
      en: ['Hermetically locked shell', 'Filled with crystal-clear natural sea water', 'Instant retraction of mantle border when touched by lemon drop'],
    },
    description: {
      ar: 'محار خليج الداخلة النقي وبحيرة الوليدية يصنف ضمن أرقى أنواع المحار عالمياً بفضل المياه الخالية من التلوث. يؤكل طازجاً مع قطرات ليمون حامض.',
      fr: 'Élevées dans les eaux pures et oxygénées de la baie de Dakhla et la lagune de Oualidia. Dégustées vivantes avec une goutte de citron vert.',
      en: 'Cultivated in the pristine waters of Dakhla Bay and Oualidia lagoon. Savored fresh and raw on the half shell with a squeeze of fresh lime.',
    },
    imageUrl: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=1200&q=80',
    fallbackImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Crassostrea_gigas_p1040858.jpg/1200px-Crassostrea_gigas_p1040858.jpg',
    audioPhonetic: 'L-M7ar',
    recommendedRecipeIds: ['crevettes-pil-pil-marocaine'],
  },
  {
    id: 'langouste',
    nameDarijaArabic: 'اللانڭوست',
    nameDarijaLatin: 'Langoust',
    nameFrench: 'Langouste rouge',
    nameEnglish: 'European Spiny Lobster',
    scientificName: 'Palinurus elephas',
    category: 'crustace',
    coast: 'both',
    mainPorts: ['Essaouira', 'Mirleft', 'Sidi Ifni', 'Al Hoceima', 'Dakhla'],
    seasonality: {
      peakMonths: [4, 5, 6, 7, 8],
      description: {
        ar: 'موسم الصيد البحري في الصيف مع احترام فترات التوالد.',
        fr: 'Pêche estivale sélective respectant les périodes de ponte.',
        en: 'Selective summer catch adhering to strict breeding regulations.',
      },
    },
    priceRangeMAD: { min: 250, max: 450, unit: 'kg' },
    regionalNames: {
    "northChamal": "Langosta Roja / لانغوسطا حمراء (الحسيمة، طنجة، كاب كيراتس)",
    "centreAtlantic": "اللانڭوست الملكي / Langouste (الصويرة، كاب سيم، آسفي)",
    "southSoussSahara": "جراد البحر الملكي / أزايز ن وومان (الداخلة، بوجدور)"
},
    pricingDetails: {
    "wholesalePortMAD": {
        "min": 150,
        "max": 260,
        "unit": "kg"
    },
    "retailMarketMAD": {
        "min": 260,
        "max": 420,
        "unit": "kg"
    },
    "globalExportEUR": {
        "min": 35,
        "max": 65,
        "unit": "kg",
        "referenceMarket": "Haute gastronomie internationale"
    }
},
    nutritionPer100g: {
    "caloriesKcal": 112,
    "proteinGrams": 20.6,
    "lipidsGrams": 1.5,
    "omega3Mg": 410,
    "vitaminD_mcg": 0.5,
    "vitaminB12_mcg": 2.8,
    "iodine_mcg": 95,
    "selenium_mcg": 58,
    "phosphorus_mg": 250,
    "calcium_mg": 65,
    "iron_mg": 1.1,
    "zinc_mg": 2.8,
    "magnesium_mg": 42,
    "potassium_mg": 350,
    "healthHighlights": {
        "ar": [
            "لحم ملكي فاخر قليل الدهون مشحون بالزنك والسيلينيوم ومضادات الأكسدة",
            "بروتينات بحرية راقية تدعم تجديد الأنسجة والعضلات",
            "غني باليود والنحاس العضوي لدعم الجهاز المناعي والحيوية البدنية"
        ],
        "fr": [
            "Mets royal d’une grande pureté protéique pauvre en lipides",
            "Richesse remarquable en zinc, sélénium et antioxydants marins",
            "Excellente source d’iode et de cuivre pour la vitalité cellulaire"
        ],
        "en": [
            "Regal marine delicacy delivering pure lean protein with minimal lipids",
            "Outstanding density of zinc, selenium, and marine antioxidants",
            "Abundant in iodine and organic copper supporting vitality and stamina"
        ]
    }
},
    culinaryProfile: {
      flavor: 'sweet',
      texture: 'meaty',
      bonesDifficulty: 'low',
      bestCookingMethods: ['grillade', 'four'],
    },
    freshnessKeys: {
      ar: ['حركة القرون الاستشعارية عند لمسها (حية)', 'ذيل ملتف بقوة تحت البطن', 'قشرة شوكية صلبة بلون بني محمر ناصع'],
      fr: ['Mouvement vigoureux des antennes (spécimen vivant)', 'Queue fermement repliée sous le thorax', 'Carapace épineuse pourpre et saine'],
      en: ['Vigorous antenna twitching (live)', 'Tail tightly curved under the body', 'Rich reddish-purple spiny shell'],
    },
    description: {
      ar: 'تاج المأكولات البحرية المغربية الفاخرة. تشوى على الفحم مشقوقة إلى نصفين ومدهونة بزبدة الثوم والأعشاب المنسمة أو زيت الزيتون البكر.',
      fr: 'Sommet du luxe gastronomique côtier. Fendue en deux et grillée sur braises au beurre persillé d’ail et citron frais.',
      en: 'The crown of Moroccan coastal luxury. Split lengthwise and flame-grilled with herb-garlic butter or olive oil and fresh lemon.',
    },
    imageUrl: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=1200&q=80',
    fallbackImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Palinurus_elephas.jpg/1200px-Palinurus_elephas.jpg',
    audioPhonetic: 'Lan-goust',
    recommendedRecipeIds: ['brochettes-espadon-grille', 'pageot-royal-au-four'],
  },
]
