import type { FisheriesAgreement, MarketTrend } from './types'

export const FISHERIES_AGREEMENTS: FisheriesAgreement[] = [
  {
    id: 'maroc-ue',
    partnerName: {
      ar: 'الاتحاد الأوروبي (إسبانيا، البرتغال، فرنسا...)',
      fr: 'Union Européenne (Espagne, Portugal, France...)',
      en: 'European Union (Spain, Portugal, France, Netherlands...)',
    },
    flag: '🇪🇺',
    status: 'suspended_under_renegotiation',
    period: '1988 – 2023 (بروتوكول 2019-2023 انتهى، في طور إعادة التفاوض الاستراتيجي)',
    economicValue: {
      ar: 'حوالي 52.2 مليون يورو سنوياً (منها 12 مليون يورو مخصصة لتحديث الصيد التقليدي المغربي)',
      fr: 'Environ 52,2 millions d’euros par an (dont 12 M€ dédiés au soutien sectoriel halieutique marocain)',
      en: 'Approximately €52.2 million annually (including €12M targeted directly for Moroccan artisanal fleet modernization)',
    },
    targetSpecies: ['السردين والأسماك السطحية الصغيرة', 'الأسماك القاعية (ميرلا، دوراد)', 'التونة', 'القريدس'],
    keyTerms: {
      ar: [
        'منح تراخيص لـ 128 سفينة أوروبية (أغلبها إسبانية وأندلسية)',
        'حظر تام لصيد الأخطبوط على السفن الأوروبية لحماية المخزون والأسطول الوطني',
        'إلزامية تفريغ نسب من المصايد في الموانئ المغربية (الداخلة، طانطان، العيون)',
        'إلزامية تشغيل بحارة مغاربة بنسب تصل إلى 60% على متن السفن الأوروبية',
        'مراقبة فضائية مستمرة عبر الأقمار الاصطناعية (VMS)',
      ],
      fr: [
        'Octroi de licences à 128 navires européens (majorité espagnole/andalouse)',
        'Exclusion totale des céphalopodes (poulpe) réservés exclusivement à la flotte nationale',
        'Obligation de débarquement partiel dans les ports marocains (Dakhla, Agadir, Laâyoune)',
        'Embarquement obligatoire de marins marocains formés (quotas stricts par navire)',
        'Suivi satellite permanent par balises VMS et présence d’observateurs scientifiques',
      ],
      en: [
        'Licensing of up to 128 EU vessels (predominantly Spanish and Portuguese)',
        'Complete exclusion of cephalopods (octopus reserved strictly for Moroccan artisanal & coastal fleets)',
        'Mandatory landing of catch portions in Moroccan ports (Dakhla, Agadir, Laâyoune) to supply local processing units',
        'Mandatory employment of certified Moroccan sailors aboard EU vessels',
        '24/7 Satellite VMS tracking and certified scientific onboard observers',
      ],
    },
    strategicContext: {
      ar: 'أكبر اتفاقية تاريخية للصيد البحري في إفريقيا. انتهى آخر بروتوكول في يوليوز 2023، والمغرب ينهج حالياً عقيدة سيادية جديدة: لا شراكات بحرية لا تشمل السيادة الترابية الكاملة على الأقاليم الجنوبية للمملكة، مع تفضيل القيمة المضافة الوطنية والتصنيع المحلي عوض بيع تراخيص الصيد الخام.',
      fr: "Accord maritime historique le plus important d'Afrique. Après l'expiration du protocole en juillet 2023, le Maroc applique une doctrine souveraine claire : aucun partenariat excluant la pleine souveraineté sur les provinces du Sud, avec une priorité absolue à l'industrialisation locale et la valorisation à quai plutôt que la vente de licences brutes.",
      en: "Africa's most significant historical fisheries agreement. Following protocol expiry in July 2023, Morocco upholds a firm sovereign doctrine: no maritime partnership that compromises territorial integrity over the Southern Provinces, shifting strategic priority toward domestic onshore processing and value creation rather than raw access rights.",
    },
    moroccoGains: {
      ar: [
        'تمويل مشاريع عصرنة قرى الصيادين (PDA) وشبكات التبريد',
        'ملايين ساعات العمل للبحارة المغاربة وتكوينهم في الملاحة البحرية المتقدمة',
        'تثمين وتطوير البحث العلمي للمعهد الوطني للبحث في الصيد البحري (INRH)',
      ],
      fr: [
        'Modernisation des Points de Débarquement Aménagés (PDA) et chaîne du froid',
        'Emploi direct de milliers de marins marocains et formation professionnelle avancée',
        'Financement de la recherche halieutique et campagnes océanographiques de l’INRH',
      ],
      en: [
        'Financing modern artisanal landing points (PDA) and coastal cold chain infrastructure',
        'Thousands of direct high-wage maritime jobs for Moroccan sailors',
        'Direct research funding for the National Fisheries Research Institute (INRH)',
      ],
    },
  },
  {
    id: 'maroc-russie',
    partnerName: {
      ar: 'روسيا الاتحادية',
      fr: 'Fédération de Russie',
      en: 'Russian Federation',
    },
    flag: '🇷🇺',
    status: 'active',
    period: 'سارٍ ومجدد بانتظام (البروتوكول الثامن للتعاون في الصيد البحري)',
    economicValue: {
      ar: 'عوائد مالية منتظمة + رسوم ترخيص سنوية لكل طن مفرغ + منح دراسية وتدريبية',
      fr: 'Compensations financières annuelles + redevances au tonnage + bourses de formation maritime',
      en: 'Annual financial access compensation + per-ton royalties + maritime academy scholarships',
    },
    targetSpecies: ['الأسماك السطحية الصغيرة (سردين، كابايلا، شرن) في أعالي البحار جنوب بوجدور'],
    keyTerms: {
      ar: [
        'السماح لـ 10 بواخر تجميد صناعية روسية عملاقة بالصيد في المياه الأطلسية جنوب خط العرض 28 درجة شمالاً',
        'تحديد حصة صيد سنوية دقيقة لا تتجاوز 140,000 طن من الأسماك السطحية الصغيرة',
        'إلزامية وجود ملاحظين علميين مغاربة من معهد INRH على متن كل سفينة روسية',
        'تخصيص جزء من المصطادات للتفريغ في الموانئ المغربية بأسعار تفضيلية للمصانع الوطنية',
      ],
      fr: [
        'Autorisation de pêche pour 10 grands chalutiers-congélateurs russes au sud du parallèle 28°N',
        'Quota annuel rigoureusement plafonné (env. 140 000 tonnes de petits pélagiques)',
        'Présence obligatoire et permanente d’observateurs scientifiques marocains de l’INRH à bord',
        'Approvisionnement prioritaire des conserveries marocaines à prix préférentiel',
      ],
      en: [
        'Access quota for 10 large Russian pelagic freezer-trawlers south of latitude 28°N',
        'Strictly capped annual pelagic quota (~140,000 tons of sardines, mackerel, horse mackerel)',
        'Mandatory permanent placement of Moroccan INRH scientific observers on every vessel',
        'Preferential supply quota for Moroccan onshore canning and processing plants',
      ],
    },
    strategicContext: {
      ar: 'شراكة إستراتيجية نموذجية خالية من الشروط السياسية، تعتمد على استغلال الأسماك السطحية في الأعماق البعيدة التي لا يصلها الأسطول الساحلي المغربي، مع استفادة المغرب من تقنيات الرصد الروسية المتقدمة لتيارات الأبفيلينغ (Upwelling).',
      fr: 'Partenariat stratégique exemplaire sans conditionnalité politique, ciblant les bancs de haute mer inaccessibles aux petits côtiers marocains, avec transfert d’expertise océanographique et satellitaire.',
      en: 'Model strategic maritime partnership without political conditionality, focusing on deep offshore pelagics beyond coastal fleet reach while transferring advanced oceanographic monitoring technology.',
    },
    moroccoGains: {
      ar: [
        'منح دراسية مجانية للطلبة المغاربة في كليات الملاحة والهندسة البحرية الروسية بموسكو وكالينينغراد وسان بطرسبرغ',
        'بيانات علمية بحرية دقيقة حول هجرة وتكاثر الكتلة الحيوية للسردين',
        'رسوم مالية بالعملة الصعبة تدخل الخزينة العامة',
      ],
      fr: [
        'Bourses universitaires complètes pour officiers et ingénieurs maritimes marocains en Russie',
        'Données précieuses sur la biomasse et les dynamiques de reproduction pélagique',
        'Apport direct en devises fortes pour l’économie nationale',
      ],
      en: [
        'Full university scholarships for Moroccan maritime officers and engineers in leading Russian academies',
        'Comprehensive biophysical data on Moroccan pelagic biomass and reproductive cycles',
        'Substantial foreign exchange revenues directly bolstering the national treasury',
      ],
    },
  },
  {
    id: 'maroc-japon',
    partnerName: {
      ar: 'اليابان (وكالة التعاون الدولي JICA)',
      fr: 'Japon (Agence Japonaise de Coopération Internationale - JICA)',
      en: 'Japan (Japan International Cooperation Agency - JICA)',
    },
    flag: '🇯🇵',
    status: 'active',
    period: 'شراكة تاريخية مستمرة منذ 1979 وتتجدد عبر برامج الدعم التقني والبنيات التحتية',
    economicValue: {
      ar: 'هبات غير مستردة بعشرات الملايين من الدولارات + سفن بحثية هيدروغرافية + وحدات تصنيع الثلج',
      fr: 'Dons non remboursables de dizaines de millions de dollars + navires océanographiques + fabriques de glace',
      en: 'Non-reimbursable grants totaling tens of millions of USD + oceanic research vessels + industrial ice plants',
    },
    targetSpecies: ['التونة الحمراء (Thon Rouge)', 'الأخطبوط والرخويات', 'تطوير الصيد الحرفي'],
    keyTerms: {
      ar: [
        'التعاون التقني والعلمي لتطوير تقنيات الصيد الانتقائي المستدام (المعايير اليابانية صارمة جداً)',
        'بناء وتجهيز قرى الصيادين النموذجية على طول السواحل المغربية (الصويرة، كالا إيريس، سيدي حصاين)',
        'استيراد اليابان لأفضل أصناف الأخطبوط والتونة الحمراء المغربية وفق معايير "الساشيمي" الرفيعة',
      ],
      fr: [
        'Coopération technologique et scientifique pour les techniques de pêche sélective durable',
        'Financement et équipement de dizaines de villages de pêcheurs (PDA) modernes sur les deux façades',
        'Importation par le marché tokyoïte du poulpe et thon rouge marocain aux normes sashimi d’excellence',
      ],
      en: [
        'High-tech transfer of sustainable, selective artisanal fishing methods adhering to Japanese quality standards',
        'Turnkey construction of modern artisanal fishing villages (PDA) equipped with slipways, lockers, and cold rooms',
        'Direct premium export channel for Moroccan bluefin tuna and octopus to Tokyo Toyosu market',
      ],
    },
    strategicContext: {
      ar: 'اليابان هي الشريك التقني الأوثق للمغرب في تحديث الصيد الساحلي والحرفي؛ حيث تم بناء سفينة الأبحاث الشهيرة "الشريف الإدريسي" بهبة يابانية، كما أن الأخطبوط المغربي هو المفضل لدى المستهلك الياباني عالمياً لنظافته وجودة مياهه.',
      fr: 'Le Japon est le partenaire technologique le plus constant du Maroc pour la pêche artisanale. Le navire de recherche océanographique "Al Hassan Al Marrakchi" et les PDA sont le fruit de cette amitié, tandis que le poulpe marocain reste la référence suprême du marché japonais.',
      en: 'Japan stands as Morocco’s most dependable technical partner in coastal fishery modernization. Flagship research vessels and dozens of PDA villages were constructed under Japanese grants, and Moroccan octopus remains the highest-graded benchmark in Japan.',
    },
    moroccoGains: {
      ar: [
        'تأمين سلسلة التبريد للبحارة الصغار وحفظ جودة الصيد من التلف',
        'تصدير الأخطبوط والتونة بأسعار قياسية تفوق الأسواق العادية',
        'نقل خبرات المزرعة المائية وتربية الأحياء البحرية (Aquaculture)',
      ],
      fr: [
        'Préservation maximale de la fraîcheur grâce aux fabriques de glace japonaises dans les PDA',
        'Valorisation tarifaire haut de gamme pour l’exportation du poulpe et thon rouge',
        'Transfert de technologie de pointe en aquaculture et écloseries marines',
      ],
      en: [
        'Flawless cold-chain preservation at sea and port with automated Japanese flake-ice plants',
        'Top-tier pricing premiums on Japanese auction floors for Moroccan octopus and tuna',
        'Pioneering aquaculture and marine hatchery technology transfer to Moroccan cooperatives',
      ],
    },
  },
  {
    id: 'iccat-thon',
    partnerName: {
      ar: 'اللجنة الدولية للحفاظ على التونة الأطلسية (ICCAT)',
      fr: 'Commission Internationale pour la Conservation des Thonidés de l’Atlantique (ICCAT)',
      en: 'International Commission for the Conservation of Atlantic Tunas (ICCAT)',
    },
    flag: '🌐',
    status: 'active',
    period: 'معاهدة دولية دائمة تنظم حصص صيد التونة الحمراء عالمياً',
    economicValue: {
      ar: 'حصة صيد رسمية للمملكة تتجاوز 6,000 طن سنوياً (قيمتها التسويقية تفوق 1.5 مليار درهم)',
      fr: 'Quota officiel marocain dépassant 6 000 tonnes/an (valeur commerciale excédant 1,5 milliard MAD)',
      en: 'Official national Moroccan quota surpassing 6,000 tons/year (market value exceeding 1.5B MAD)',
    },
    targetSpecies: ['التونة الحمراء (Thunnus thynnus) في مضيق جبل طارق والواجهة الأطلسية'],
    keyTerms: {
      ar: [
        'تشغيل مصايد "المضربة" (Madrague / Almadraba) التقليدية الصديقة للبيئة في أصيلة، العرائش، القصر الصغير وسلا',
        'تتبع رقمي فردي لكل سمكة تونة عبر شريحة إلكترونية (e-BCD) من لحظة الصيد حتى المستهلك النهائي',
        'موسم صيد محدد بدقة خلال هجرة التونة في الربيع لحماية أطوار التكاثر',
      ],
      fr: [
        'Exploitation des madragues historiques fixes et éco-responsables à Larache, Tanger et Asilah',
        'Traçabilité électronique intégrale par bague biométrique e-BCD pour chaque thon capturé',
        'Campagne de pêche saisonnière strictement régulée pour protéger la reproduction migratoire',
      ],
      en: [
        'Eco-friendly traditional fixed trap system (Almadraba / Madrague) deployed in Larache, Asilah, and Ksar Sghir',
        'Full digital biometric traceability via electronic Bluefin Tuna Catch Document (e-BCD)',
        'Strictly enforced spring migratory fishing season ensuring sustainable spawning',
      ],
    },
    strategicContext: {
      ar: 'المغرب من كبار الفاعلين الدوليين في صيد وتسمين التونة الحمراء. مصايد المضربة المغربية تعود لمئات السنين وتعتبر من أكثر أساليب الصيد استدامة في العالم لأنها تصطاد الأسماك البالغة فقط دون إيذاء الكائنات البحرية الأخرى.',
      fr: 'Le Maroc est un leader mondial de la pêche responsable du thon rouge. La technique ancestrale des madragues capture uniquement les spécimens géants adultes sans captures accidentelles ni dégâts sur l’écosystème marin.',
      en: 'Morocco is a preeminent global authority in sustainable bluefin tuna harvesting. Centuries-old Moroccan Almadraba labyrinth traps catch only prime mature specimens without bycatch, yielding the world’s most pristine sashimi grades.',
    },
    moroccoGains: {
      ar: [
        'مداخيل قياسية من العملة الصعبة عبر تصدير التونة الطازجة بالطائرة إلى طوكيو ونيويورك',
        'خلق آلاف الوظائف الموسمية في الصيانة وشباك المضربة والصناعات التحويلية',
        'حماية الأنواع البحرية ومكانة المغرب الدولية في الاستدامة البيئية',
      ],
      fr: [
        'Rentrées massives de devises via le fret aérien direct vers les halles japonaises et américaines',
        'Emplois hautement qualifiés dans la ferronnerie navale, confection des filets et transformation',
        'Reconnaissance internationale du Maroc comme modèle de durabilité halieutique',
      ],
      en: [
        'Massive foreign currency inflows via direct air-cargo shipments to Tokyo and European auction floors',
        'Specialized coastal employment in net-weaving, trap maintenance, and certified processing',
        'International acclaim for Morocco as a benchmark in marine conservation and quota governance',
      ],
    },
  },
]

export const MARKET_TRENDS: MarketTrend[] = [
  {
    id: 'sardine-trend',
    speciesId: 'sardine',
    speciesName: {
      ar: 'السردين (Serdine)',
      fr: 'Sardine commune',
      en: 'European Pilchard / Sardine',
    },
    pastTrend: {
      priceRangeMAD: '10 – 15 درهم/كلغ (سابقاً في المتوسط الساحلي)',
      summary: {
        ar: 'كان السردين متوفراً بوفرة قصوى وبأسعار في متناول جميع المغاربة، مع تمركز الصيد في أسفي والصويرة وأكادير.',
        fr: 'Historiquement très abondant et populaire (10-15 MAD/kg), centré sur les ports historiques de Safi, Essaouira et Agadir.',
        en: 'Historically abundant and accessible to all households (10-15 MAD/kg), anchored in Safi, Essaouira, and Agadir.',
      },
    },
    presentStatus: {
      priceRangeMAD: '15 – 30 درهم/كلغ (حسب تقلبات البحر وبعد الميناء عن مدن الداخل)',
      supplyStatus: 'moderate',
      trendDirection: 'up',
      summary: {
        ar: 'ارتفاع في الأسعار بسبب هجرة كتل السردين جنوباً نحو طانطان والداخلة بتأثير التغير المناخي، وارتفاع كلفة الغازوال للمراكب، والطلب المتزايد لمصانع التعليب والتصدير.',
        fr: 'Tension sur les prix en raison du déplacement de la biomasse vers le Sud (Dakhla, Tan-Tan), du coût du carburant et de la forte demande industrielle de conserve.',
        en: 'Price increases caused by biomass migration southward toward Tan-Tan and Dakhla due to sea temperature shifts, maritime diesel costs, and intense canning demand.',
      },
    },
    futureForecast: {
      outlook: 'stable',
      driverFactors: {
        ar: [
          'تطوير أسطول صيد بالجر المبرد (RSW) يحافظ على جودة السردين في الأعالي',
          'دعم الدولة لسلسلة التبريد ومراقبة مسالك التوزيع لتقليص المضاربة',
          'إجراءات الراحة البيولوجية لحماية صغار السردين في فترات التوالد',
        ],
        fr: [
          'Généralisation des navires RSW à eau de mer réfrigérée pour débarquer un poisson ultra-frais',
          'Lutte contre la spéculation des intermédiaires dans les marchés de gros',
          'Respect strict des périodes de repos biologique pour reconstituer les bancs',
        ],
        en: [
          'Expansion of modern RSW (Refrigerated Seawater) vessels landing prime-grade catch',
          'Government oversight on wholesale intermediaries to curb retail speculation',
          'Strict biological rest compliance allowing juvenile schools to recover biomass',
        ],
      },
      projection: {
        ar: 'استقرار الأسعار المتوقعة بين 15 و 22 درهم في الموانئ، مع توفر مستمر بفضل الاستثمارات الحديثة في أسطول التبريد بالداخلة والعيون.',
        fr: 'Stabilisation prévisible autour de 15-22 MAD/kg sur le littoral grâce aux débarquements massifs du Sud et à la régulation des criées.',
        en: 'Expected stabilization around 15–22 MAD/kg in coastal zones supported by massive landings in southern hubs and auction digitisation.',
      },
    },
    biologicalRestPeriod: {
      months: 'يناير وفبراير (جزئي حسب المناطق والتقارير العلمية للـ INRH)',
      description: {
        ar: 'فترة توالد السردين والأسماك السطحية لمنع صيد الأحجام الصغيرة وضمان تجدد الثروة السمكية.',
        fr: 'Période de reproduction pélagique sous contrôle de l’INRH pour protéger le frai et le recrutement.',
        en: 'Pelagic reproductive window monitored by INRH to safeguard juvenile recruitment.',
      },
    },
  },
  {
    id: 'poulpe-trend',
    speciesId: 'poulpe',
    speciesName: {
      ar: 'الأخطبوط (Poulpe / Rokas)',
      fr: 'Poulpe commun',
      en: 'Common Octopus',
    },
    pastTrend: {
      priceRangeMAD: '40 – 70 درهم/كلغ في الموانئ وسوق الجملة',
      summary: {
        ar: 'كان الأخطبوط خاضعاً لضغوط صيد عشوائي كادت تؤدي لانهيار المخزون في بداية الألفية قبل إطلاق مخطط تهيئة مصيدة الأخطبوط سنة 2004.',
        fr: 'Pression de pêche excessive risquant l’épuisement des stocks avant le grand plan d’aménagement de 2004.',
        en: 'Heavy unregulated exploitation nearly depleted stocks prior to Morocco’s landmark 2004 Octopus Management Plan.',
      },
    },
    presentStatus: {
      priceRangeMAD: '80 – 140 درهم/كلغ (وحتى 160 درهم للأحجام الكبيرة T1/T2)',
      supplyStatus: 'moderate',
      trendDirection: 'up',
      summary: {
        ar: 'الأخطبوط المغربي هو "الذهب الأسود" للسواحل؛ طلب عالمي قياسي من إسبانيا وإيطاليا واليابان مع تحسن كبير في الكتلة الحيوية نتيجة الانضباط الصارم للراحة البيولوجية.',
        fr: 'Véritable "or noir" marin marocain : forte demande mondiale (Espagne, Japon, Italie) et stocks assainis grâce aux repos biologiques rigoureux.',
        en: 'Morocco’s marine "black gold": staggering global demand across Spain, Italy, and Japan, with revitalized stocks backed by rigorous biological closures.',
      },
    },
    futureForecast: {
      outlook: 'up',
      driverFactors: {
        ar: [
          'استمرار الطلب الدولي المرتفع على الأخطبوط المغربي المجمد الفاخر',
          'نظام الحصص الفردية الدقيقة (Quotas) لكل قارب صيد تقليدي وصناعي بالداخلة وبوجدور',
          'منع التصدير الخام بدون تجميد وتعبئة داخل الوحدات الصناعية المغربية',
        ],
        fr: [
          'Demande asiatique et européenne structurellement supérieure à l’offre globale',
          'Système de quotas stricts par barque artisanale et chalutier congélateur',
          'Valeur ajoutée maximisée dans les unités de congélation ultra-rapide de Dakhla',
        ],
        en: [
          'Global structural deficit between surging international appetite and capped wild supply',
          'Enforced individual vessel quotas across Dakhla and Boujdour artisanal dories and trawlers',
          'Mandatory domestic onshore deep-freeze processing maximizing export earnings',
        ],
      },
      projection: {
        ar: 'توقعات باستقرار الأسعار عند مستويات مرتفعة (100 - 150 درهم) مع عوائد ممتازة لتعاونيات الصيادين التقليديين في الجنوب.',
        fr: 'Maintien de prix élevés (100-150 MAD/kg) assurant une rentabilité exceptionnelle pour les marins artisans du Sud.',
        en: 'Projections sustain high premium ranges (100–150 MAD/kg) providing prosperous incomes for southern artisanal cooperatives.',
      },
    },
    biologicalRestPeriod: {
      months: 'أبريل – ماي & أكتوبر – نونبر (شهرين في الربيع وشهرين في الخريف)',
      description: {
        ar: 'الراحة البيولوجية الإلزامية للأخطبوط لمنع الصيد التام والسماح للإناث بوضع البيض وفق توصيات INRH.',
        fr: 'Repos biologique semestriel impératif pour la ponte et la croissance des larves de poulpe.',
        en: 'Mandatory biannual closures during peak egg-laying and larval growth cycles.',
      },
    },
  },
  {
    id: 'merlan-trend',
    speciesId: 'merlan',
    speciesName: {
      ar: 'الميرلا (Mirla)',
      fr: 'Merlan / Hake',
      en: 'Whiting / European Hake',
    },
    pastTrend: {
      priceRangeMAD: '30 – 50 درهم/كلغ',
      summary: {
        ar: 'سمك المائدة المفضل للطبقة المتوسطة المغربية، متوفر على مدار السنة في أسواق الرباط والدار البيضاء وطنجة.',
        fr: 'Poisson blanc de référence des familles marocaines, stable et régulier dans les halles atlantiques.',
        en: 'The quintessential daily white fish for Moroccan households across Rabat, Casablanca, and Tangier.',
      },
    },
    presentStatus: {
      priceRangeMAD: '50 – 90 درهم/كلغ (ترتفع في شهر رمضان إلى 110 دراهم)',
      supplyStatus: 'moderate',
      trendDirection: 'up',
      summary: {
        ar: 'ارتفاع في فترات سوء الأحوال الجوية (المنية) وشهر رمضان المبارك حيث يتضاعف استهلاك الأسماك المقلية والمملحات.',
        fr: 'Pic de prix récurrent durant les tempêtes hivernales et lors du mois sacré de Ramadan.',
        en: 'Seasonal surges triggered by winter maritime swells and huge Ramadan demand for fried fish platters.',
      },
    },
    futureForecast: {
      outlook: 'stable',
      driverFactors: {
        ar: [
          'تنظيم شبكات التوزيع بين الموانئ الشمالية والجنوبية لتفادي ندرة السوق',
          'تحديث شباك الصيد لتفادي صيد صغار الميرلا غير الناضجة',
        ],
        fr: [
          'Fluidification des flux logistiques entre ports du Nord et marchés intérieurs',
          'Sélectivité accrue des maillages pour préserver les juvéniles',
        ],
        en: [
          'Optimized cold logistics distributing landings between northern ports and inland cities',
          'Mesh size regulations minimizing accidental bycatch of immature whiting',
        ],
      },
      projection: {
        ar: 'استقرار السعر العادي بين 55 و 75 درهم خارج فترات الذروة والمواسم الخاصة.',
        fr: 'Prix de croisière projeté entre 55 et 75 MAD/kg hors périodes de fêtes et Ramadan.',
        en: 'Projected baseline range of 55–75 MAD/kg outside peak storm and holiday seasons.',
      },
    },
  },
  {
    id: 'espadon-trend',
    speciesId: 'espadon',
    speciesName: {
      ar: 'الإسبادون / بوسف (Spadon)',
      fr: 'Espadon',
      en: 'Swordfish',
    },
    pastTrend: {
      priceRangeMAD: '70 – 100 درهم/كلغ',
      summary: {
        ar: 'سمك راقٍ موجه للمطاعم والفنادق والتصدير نحو أسواق جنوب أوروبا (إسبانيا وإيطاليا).',
        fr: 'Poisson noble prisé par la restauration, les grillades côtières et l’exportation vers l’Europe du Sud.',
        en: 'Prime ocean predator sought after by coastal grill restaurants and export markets in Spain and Italy.',
      },
    },
    presentStatus: {
      priceRangeMAD: '100 – 160 درهم/كلغ للشرائح الطازجة',
      supplyStatus: 'moderate',
      trendDirection: 'stable',
      summary: {
        ar: 'استقرار نسبي بفضل نظام الحصص الدقيقة للمغرب بمضيق جبل طارق والأطلسي ومراقبة صيد الخيوط الطويلة (Palangre).',
        fr: 'Marché bien valorisé et équilibré grâce aux quotas de palangre et à la réputation de fraîcheur de Tanger et Larache.',
        en: 'Balanced premium market sustained by strict longline quotas and celebrated fresh landings in Tangier and Larache.',
      },
    },
    futureForecast: {
      outlook: 'stable',
      driverFactors: {
        ar: [
          'الالتزام الصارم بتوصيات منظمة ICCAT الدولية لأحجام الصيد القانونية',
          'ارتفاع الطلب المحلي في المدن السياحية المغربية (مراكش، أكادير، طنجة)',
        ],
        fr: [
          'Conformité stricte aux tailles minimales de débarquement ICCAT',
          'Croissance continue de la gastronomie et de l’hôtellerie marocaine',
        ],
        en: [
          'Strict adherence to ICCAT minimum landing sizes protecting breeding stocks',
          'Surging domestic hospitality demand across Marrakech, Agadir, and Tangier resorts',
        ],
      },
      projection: {
        ar: 'توقعات باستقرار الأسعار بين 110 و 140 درهم/كلغ للشريحة الممتازة بدون حسك.',
        fr: 'Cours stable projeté entre 110 et 140 MAD/kg pour les longes nobles prêtes à griller.',
        en: 'Projected stability between 110–140 MAD/kg for prime, boneless center-cut loins.',
      },
    },
    biologicalRestPeriod: {
      months: 'فبراير – مارس (في البحر الأبيض المتوسط ومضيق جبل طارق)',
      description: {
        ar: 'فترة حظر صيد الإسبادون لحماية الأسماك الصغيرة في المضيق والمتوسط.',
        fr: 'Fermeture spatio-temporelle méditerranéenne concertée pour la sauvegarde des reproducteurs.',
        en: 'Coordinated Mediterranean and Strait closure protecting migratory breeders.',
      },
    },
  },
]
