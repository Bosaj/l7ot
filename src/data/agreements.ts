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
  {
    id: 'maroc-uk',
    partnerName: {
      ar: 'اتفاقية الشراكة والتجارة البحرية بين المغرب والمملكة المتحدة (Post-Brexit)',
      fr: 'Accord d’Association & Commerce Halieutique Maroc – Royaume-Uni',
      en: 'Morocco–United Kingdom Association & Seafood Trade Agreement',
    },
    flag: '🇬🇧',
    status: 'active',
    period: '2021 – سارٍ بصفة دائمة (مع خط شحن بحري مباشر طنجة–بول)',
    economicValue: {
      ar: 'إعفاء جمركي شامل لصادرات مصبرات السردين والماكريل والرخويات نحو الأسواق البريطانية (أكثر من 1.8 مليار درهم سنوياً)',
      fr: 'Accès préférentiel sans droits de douane pour les conserves de sardine, maquereau et produits congelés vers le Royaume-Uni (> 1,8 Md MAD/an)',
      en: 'Duty-free preferential access for Moroccan canned sardines, mackerel, and frozen cephalopods into the UK market (>1.8B MAD/year)',
    },
    targetSpecies: [
      'مصبرات السردين والماكريل (آسفي وأكادير)',
      'الأخطبوط والحبار المجمد (الداخلة والعيون)',
      'الأعشاب البحرية وزيت السمك (طانطان والجديدة)',
    ],
    keyTerms: {
      ar: [
        'الاعتراف الكامل بشهادات المنشأ والسلامة الصحية الصادرة عن المكتب الوطني للسلامة الصحية (ONSSA) في كافة أقاليم المملكة من طنجة إلى الكويرة',
        'إعفاء جمركي (0% رسوم) لحصص واسعة من معلبات السردين والأنشوبة المغربية في المتاجر البريطانية الكبرى',
        'فتح خطوط شحن بحري مباشر للمبردات (Ro-Ro) من ميناء طنجة المتوسط نحو الموانئ البريطانية لتجاوز الوسطاء الأوروبيين',
      ],
      fr: [
        'Reconnaissance intégrale des certificats sanitaires ONSSA sur l’ensemble des provinces marocaines du Nord au Sud',
        'Exonération tarifaire (0 % de droits) sur les conserves de poissons pélagiques marocaines distribuées au Royaume-Uni',
        'Liaisons maritimes frigorifiques directes Tanger Med – Royaume-Uni réduisant le transit à moins de 72 heures',
      ],
      en: [
        'Full UK recognition of ONSSA sanitary and origin certificates across all Moroccan coastal provinces',
        'Zero-tariff preferential quotas for Moroccan canned sardines and pelagic products across major British supermarkets',
        'Direct refrigerated maritime corridors from Tanger Med to UK ports cutting transit under 72 hours',
      ],
    },
    strategicContext: {
      ar: 'عقب خروج بريطانيا من الاتحاد الأوروبي (Brexit)، وقّع المغرب والمملكة المتحدة اتفاقية شراكة استراتيجية تضمن تدفق المنتجات البحرية المغربية (خصوصاً معلبات السردين والسمك المجمد من الأقاليم الجنوبية) مباشرة إلى لندن ومانشستر دون المرور عبر الوسطاء في القارة الأوروبية.',
      fr: 'Après le Brexit, Rabat et Londres ont scellé un partenariat souverain garantissant l’accès direct des produits de la mer marocains, y compris ceux des provinces du Sud (Dakhla, Laâyoune), au marché britannique.',
      en: 'Following Brexit, Rabat and London established a direct bilateral framework ensuring uninterrupted British access to Moroccan seafood—including value-added exports from Dakhla and Laâyoune—confirmed by UK High Court rulings.',
    },
    moroccoGains: {
      ar: [
        'استحواذ السردين المغربي المعلب على أكثر من 60% من حصة السوق البريطانية',
        'تثمين مباشر لمنتجات مصانع الداخلة والعيون وأكادير بعملة الجنيه الإسترليني',
        'استقلالية لوجستية عبر الخطوط البحرية الأطلسية المباشرة',
      ],
      fr: [
        'Plus de 60 % de parts de marché pour la sardine en conserve marocaine au Royaume-Uni',
        'Valorisation directe des usines d’Agadir, Safi, Laâyoune et Dakhla en livres sterling',
        'Souveraineté logistique via les corridors maritimes atlantiques',
      ],
      en: [
        'Over 60% UK market share captured by Moroccan canned sardines',
        'Direct pound-sterling revenue for canneries in Safi, Agadir, Laâyoune, and Dakhla',
        'Logistical independence via direct Atlantic shipping lines',
      ],
    },
  },
  {
    id: 'maroc-usa',
    partnerName: {
      ar: 'اتفاقية التبادل الحر بين المغرب والولايات المتحدة الأمريكية (الشق البحري والتصبير)',
      fr: 'Accord de Libre-Échange Maroc – États-Unis (Chapitre Produits de la Mer)',
      en: 'Morocco–United States Free Trade Agreement (Seafood & Cannery Chapter)',
    },
    flag: '🇺🇸',
    status: 'active',
    period: '2006 – سارٍ بصفة دائمة',
    economicValue: {
      ar: 'صادرات سنوية تفوق 2.4 مليار درهم من مصبرات السردين الفاخرة، فيليه الشطون، والأجار البحري نحو أمريكا الشمالية',
      fr: 'Exportations annuelles dépassant 2,4 milliards MAD de conserves gourmet, filets d’anchois à l’huile d’olive et agar-agar vers les USA',
      en: 'Over 2.4B MAD in annual exports of gourmet canned sardines, olive-oil anchovy fillets, and marine agar-agar to North America',
    },
    targetSpecies: [
      'سردين بدون جلد وبدون شوك في زيت الزيتون البكر (Skinless & Boneless)',
      'فيليه الشطون المملح والمرقد (طنجة، العرائش، الحسيمة)',
      'مستخلصات الطحالب الحمراء (الأجار أجار - الجديدة والقنيطرة)؛ المغرب رابع مصدر عالمي',
    ],
    keyTerms: {
      ar: [
        'ولج معفى من الرسوم الجمركية (0%) للمنتجات البحرية المصنعة بالكامل في المصانع المغربية المعتمدة من هيئة الغذاء والدواء الأمريكية (FDA)',
        'اعتماد معايير الاستدامة وحماية السلاحف والثدييات البحرية (NOAA Fisheries Compliance)',
        'تشجيع تصدير المنتجات ذات القيمة المضافة العالية (السردين منزوع الجلد والعظم، الشطون المتبل، وزيت السمك الغني بأوميغا 3)',
      ],
      fr: [
        'Droits de douane nuls (0 %) pour les conserves et semi-conserves issues d’usines marocaines agréées par la FDA américaine',
        'Conformité stricte aux normes environnementales NOAA pour la protection de la faune marine',
        'Priorité aux produits à très haute valeur ajoutée : sardines sans peau ni arêtes à l’huile d’olive vierge et agar-agar',
      ],
      en: [
        'Zero-duty entry for seafood processed in FDA-certified Moroccan canneries and curing plants',
        'Full compliance with US NOAA marine mammal and sea turtle conservation standards',
        'Focus on high-margin specialty exports: skinless/boneless sardines in extra-virgin olive oil, cured anchovies, and pharmaceutical-grade agar-agar',
      ],
    },
    strategicContext: {
      ar: 'المغرب هو البلد الأفريقي والعربي الوحيد الذي يرتبط باتفاقية تبادل حر شاملة مع الولايات المتحدة، مما جعل علامات السردين والشطون المغربية تتصدر أرفف المتاجر الأمريكية الكبرى (Whole Foods, Trader Joe’s, Costco).',
      fr: 'Seul pays d’Afrique lié par un accord de libre-échange complet avec les États-Unis, le Maroc domine le segment américain de la conserve de sardine gourmet et de l’anchois.',
      en: 'As the only African nation with a comprehensive US Free Trade Agreement, Morocco dominates the American gourmet tinned-fish boom across major specialty retailers.',
    },
    moroccoGains: {
      ar: [
        'رفع القيمة المضافة للطن المصدر بـ 3 أضعاف عبر التحويل الصناعي الدقيق بدل تصدير السمك الخام',
        'تشغيل أكثر من 35,000 عامل وعاملة في وحدات التصبير والتعليب بآسفي وأكادير والعرائش وطنجة',
        'ريادة عالمية في تصدير مادة الأجار-أجار المستخلصة من الطحالب البحرية الأطلسية',
      ],
      fr: [
        'Multiplication par 3 de la valeur à la tonne grâce à la transformation industrielle fine',
        'Plus de 35 000 emplois directs dans les conserveries de Safi, Agadir, Larache et Tanger',
        'Rang de 4e exportateur mondial d’agar-agar marin (algues rouges Gelidium d’El Jadida)',
      ],
      en: [
        'Tripling export value per ton through artisanal hand-filleted canning rather than raw bulk export',
        'Over 35,000 direct jobs across canneries in Safi, Agadir, Larache, and Tangier',
        'World #4 exporter status in high-value marine agar-agar extracted from Atlantic red algae',
      ],
    },
  },
  {
    id: 'comhafat-afrique',
    partnerName: {
      ar: 'المؤتمر الوزاري للتعاون في الصيد البحري بين الدول الأفريقية المطلة على الأطلسي (COMHAFAT / ATLAFCO)',
      fr: 'Conférence Ministérielle sur la Coopération Halieutique des États Africains de l’Atlantique (COMHAFAT)',
      en: 'Ministerial Conference on Fisheries Cooperation Among African Atlantic States (ATLAFCO)',
    },
    flag: '🌍',
    status: 'framework',
    period: 'تأسست باتفاقية الرباط (1989) – المقر الدائم بالعاصمة الرباط (22 دولة أفريقية)',
    economicValue: {
      ar: 'قيادة دبلوماسية وعلمية مغربية لـ 22 دولة أفريقية تمتد من طنجة إلى كيب تاون مع برامج تكوين وبحث بحري مشترك',
      fr: 'Leadership diplomatique et scientifique marocain fédérant 22 États côtiers africains de Tanger au Cap, avec siège permanent à Rabat',
      en: 'Moroccan diplomatic and scientific leadership uniting 22 African Atlantic coastal states from Tangier to Cape Town, headquartered in Rabat',
    },
    targetSpecies: [
      'الأسماك السطحية المهاجرة المشتركة (السردين، الشرن، كبايلا)',
      'الأخطبوط والرخويات في تيار الكناري وتيار بنغويلا',
      'التونة الاستوائية والأطلسية',
    ],
    keyTerms: {
      ar: [
        'احتضان الرباط للأمانة الدائمة للمنظمة وتنسيق المواقف الأفريقية الموحدة في المحافل الدولية (FAO, ICCAT, CITES)',
        'تكوين مئات الضباط والبحارة وتقنيي الصيد الأفارقة في المعاهد المغربية (ISPM أكادير ومعاهد طنجة وآسفي والعيون)',
        'التعاون الإقليمي لمحاربة الصيد غير القانوني دون إبلاغ ودون تنظيم (IUU) وبناء قرى الصيادين ونقط التفريغ المجهزة في غرب أفريقيا',
      ],
      fr: [
        'Siège permanent à Rabat coordonnant la voix unifiée de 22 nations africaines auprès de la FAO et de l’ICCAT',
        'Formation des cadres maritimes africains à l’ISPM d’Agadir et dans les instituts de Tanger, Safi et Laâyoune',
        'Lutte conjointe contre la pêche INN (illicite) et financement marocain de points de débarquement aménagés (PDA) en Afrique de l’Ouest',
      ],
      en: [
        'Permanent Secretariat hosted in Rabat coordinating unified African positions at FAO, ICCAT, and WTO',
        'Scholarships and training for hundreds of African maritime officers at Morocco’s ISPM Agadir and coastal academies',
        'Joint surveillance against IUU fishing and Moroccan construction of modern artisanal fish landing hubs in Senegal, Côte d’Ivoire, Gabon, and Guinea',
      ],
    },
    strategicContext: {
      ar: 'يجسد هذا الإطار العقيدة البحرية للملك محمد السادس في التعاون جنوب-جنوب ومبادرة الدول الأفريقية الأطلسية، حيث لم يعد المغرب مجرد مصدر للسمك بل شريكاً تقنياً ومكوناً ومستثمراً في البنية التحتية البحرية لغرب أفريقيا.',
      fr: 'Pilier de l’Initiative Royale pour l’Atlantique Africain, la COMHAFAT positionne le Maroc comme le hub scientifique, académique et portuaire de toute la façade atlantique africaine.',
      en: 'A cornerstone of Morocco’s Royal Atlantic African Initiative, ATLAFCO positions Rabat as the scientific, academic, and port-infrastructure anchor of the entire African Atlantic seaboard.',
    },
    moroccoGains: {
      ar: [
        'تعزيز السيادة والإشعاع الجيوسياسي للمغرب كعاصمة للأطلسي الأفريقي',
        'تصدير الخبرة المغربية في بناء قرى الصيادين وأسواق الجملة الرقمية لدول غرب أفريقيا',
        'تتبع علمي مشترك لهجرة الأسماك عبر سفن البحث المغربية (سفينة الحسن المراكشي)',
      ],
      fr: [
        'Rayonnement géopolitique de Rabat comme capitale halieutique de l’Atlantique africain',
        'Exportation du modèle marocain des villages de pêcheurs et halles nouvelle génération',
        'Campagnes scientifiques conjointes à bord du navire océanographique marocain Al Hassan Al Marrakchi',
      ],
      en: [
        'Geopolitical stature of Rabat as the maritime capital of Atlantic Africa',
        'Export of Morocco’s artisanal fishing village and digital auction-hall model across West Africa',
        'Joint oceanographic stock assessments aboard Morocco’s research vessel Al Hassan Al Marrakchi',
      ],
    },
  },
  {
    id: 'cgpm-mediterranee',
    partnerName: {
      ar: 'الهيئة العامة لمصايد أسماك البحر الأبيض المتوسط والبحر الأسود (GFCM / CGPM – FAO)',
      fr: 'Commission Générale des Pêches pour la Méditerranée (CGPM – FAO)',
      en: 'General Fisheries Commission for the Mediterranean (GFCM – FAO Treaty)',
    },
    flag: '🌊',
    status: 'active',
    period: 'معاهدة ملزمة متعددة الأطراف (بحر البوران ومضيق جبل طارق)',
    economicValue: {
      ar: 'حماية وتثمين مصايد الواجهة المتوسطية المغربية (طنجة، المضيق، الفنيدق، الحسيمة، الناظور، السعيدية)',
      fr: 'Gestion durable et valorisation des pêcheries méditerranéennes du Royaume (Tanger, M’diq, Al Hoceima, Nador)',
      en: 'Binding conservation and high-value quota management across Morocco’s Mediterranean ports (Tangier, M’diq, Al Hoceima, Nador)',
    },
    targetSpecies: [
      'الباجو الملكي / الفوراسيرو (Pagellus bogaraveo) في بحر البوران',
      'الكروفيت الملكي والميرلا المتوسطية والروجي',
      'المرجان الأحمر المتوسطي والأسماك السطحية الصغيرة',
    ],
    keyTerms: {
      ar: [
        'خطة الإدارة المشتركة لسمك الفوراسيرو (الباجو الملكي) في بحر البوران ومضيق جبل طارق لضمان استمراريته وأسعاره العالية',
        'برامج حماية شباك الصيد التقليدي من هجمات الدلافين الكبير (النيكرو) بدعم علمي وتقني لصيادي الحسيمة والمضيق والناظور',
        'تطوير تربية الأحياء المائية المستدامة (Aquaculture) في ساحل المضيق والحسيمة وبحيرة مارتشيكا بالناظور',
      ],
      fr: [
        'Plan de gestion pluriannuel de la dorade rose (voracero) en mer d’Alboran et dans le détroit de Gibraltar',
        'Programme de soutien aux artisans pêcheurs d’Al Hoceima et M’diq face aux interactions avec le grand dauphin (« Negro »)',
        'Développement de l’aquaculture écologique (loup, dorade, coquillages) à M’diq, Al Hoceima et dans la lagune de Marchica',
      ],
      en: [
        'Multiannual management plan for Blackspot Seabream (Voracero) in the Alboran Sea and Strait of Gibraltar',
        'Acoustic deterrent and gear-reinforcement support for artisanal fishermen in Al Hoceima and M’diq against dolphin depredation',
        'Expansion of sustainable marine aquaculture (seabass, seabream, shellfish) across M’diq, Al Hoceima, and Nador’s Marchica lagoon',
      ],
    },
    strategicContext: {
      ar: 'تمتد السواحل المتوسطية للمغرب على 512 كلم وتتميز بتنوع بيولوجي فريد في بحر البوران. من خلال هيئة CGPM، يحمي المغرب حقوق صياديه التقليديين في الشمال ويطور مشاريع تربية الأسماك والمحار بتمويل ودعم تقني دولي.',
      fr: 'Sur ses 512 km de côte méditerranéenne, le Maroc joue un rôle clé au sein de la CGPM pour défendre sa pêche artisanale du Rif et du Détroit tout en développant l’aquaculture.',
      en: 'Across its 512 km Mediterranean coastline, Morocco leverages the GFCM treaty to safeguard artisanal Rif and Strait fleets while scaling modern marine aquaculture.',
    },
    moroccoGains: {
      ar: [
        'حماية مخزون الباجو الملكي والروجي والكروفيت في موانئ الشمال والريف',
        'توسيع مزارع تربية الدرعي والزريقة وبلح البحر في المضيق والناظور والحسيمة',
        'تمويلات دولية لتحديث قوارب الصيد التقليدي بالواجهة المتوسطية',
      ],
      fr: [
        'Sauvegarde des stocks nobles (voracero, rouget, crevette rouge) des ports du Nord',
        'Essor des fermes aquacoles de M’diq, Al Hoceima et Nador',
        'Appui financier et scientifique à la flotte artisanale méditerranéenne',
      ],
      en: [
        'Protection of high-value demersal stocks (Voracero, red mullet, deep-water shrimp) in Northern ports',
        'Rapid growth of marine aquaculture farms in M’diq, Al Hoceima, and Nador',
        'Scientific and financial backing for Mediterranean artisanal boat modernization',
      ],
    },
  },
  {
    id: 'plan-halieutis-2030',
    partnerName: {
      ar: 'ميثاق "أليوتيس" الوطني والرقمنة السيادية لأسواق الجملة (Plan Halieutis & ONP 2020–2030)',
      fr: 'Stratégie Nationale Halieutis & Digitalisation des Criées ONP (2020–2030)',
      en: 'National Halieutis Compact & ONP Digital Fish Auction Network (2020–2030)',
    },
    flag: '🇲🇦',
    status: 'active',
    period: '2009 – 2030 (المرحلة الثانية: التثمين الصناعي والرقمنة الشاملة)',
    economicValue: {
      ar: 'رفع صادرات الصيد البحري المغربية إلى رقم قياسي تجاوز 31 مليار درهم (أكثر من 3.1 مليار دولار سنوياً)',
      fr: 'Croissance historique des exportations halieutiques marocaines dépassant 31 milliards MAD (> 3,1 Mds USD/an)',
      en: 'Propelled Moroccan seafood exports to an all-time record exceeding 31 billion MAD (>3.1B USD/year)',
    },
    targetSpecies: [
      'كافة المصايد الوطنية (1.4 إلى 1.5 مليون طن سنوياً)',
      'شبكة 72 سوق جملة وميناء صيد خاضعة للمكتب الوطني للصيد (ONP)',
      'تربية الأحياء المائية البحرية (ANDA) بالداخلة، الواليدية، أكادير، والمضيق',
    ],
    keyTerms: {
      ar: [
        'رقمنة المزاد العلني (Criée Digitale) في موانئ المملكة ونظام الصناديق البلاستيكية الموحدة المزودة بشرائح RFID لضمان شفافية الأسعار والجودة الصحية',
        'مراقبة 100% من أسطول الصيد الساحلي وأعالي البحار عبر الأقمار الصناعية (VMS) لمنع الصيد في المناطق المحظورة ومواسم الراحة البيولوجية',
        'إنشاء 11 سوقاً من الجيل الجديد لبيع السمك بالجملة في المدن الداخلية (الدار البيضاء، الرباط، مراكش، فاس، مكناس، وجدة، بني ملال) لتقريب الحوت الطري من المواطن',
      ],
      fr: [
        'Informatisation des enchères dans les halles aux poissons ONP et bacs normalisés RFID garantissant la chaîne du froid',
        'Surveillance satellitaire VMS sur 100 % des navires côtiers et hauturiers pour faire respecter les zones de repos biologique',
        'Réseau de 11 marchés de gros de deuxième génération dans les villes intérieures (Marrakech, Fès, Meknès, Oujda, Béni Mellal)',
      ],
      en: [
        'Automated digital auction clocks and RFID-tagged insulated crates across ONP port halls ensuring cold-chain integrity',
        '100% VMS satellite tracking across coastal and deep-sea vessels enforcing biological rest closures',
        '11 inland wholesale fish markets (Casablanca, Rabat, Marrakech, Fes, Meknes, Oujda) bringing port-fresh fish to interior cities',
      ],
    },
    strategicContext: {
      ar: 'يمثل مخطط "أليوتيس" العقد الاستراتيجي المرجعي لقطاع الصيد البحري بالمغرب؛ وقد حول المملكة إلى القوة البحرية الأولى في أفريقيا والـ 13 عالمياً، مع التركيز اليوم على تصنيع المنتجات محلياً وتزويد الأسواق الداخلية بأسعار معقولة.',
      fr: 'Pacte fondateur de la modernisation maritime du Royaume, le Plan Halieutis a hissé le Maroc au 1er rang africain et au 13e rang mondial des puissances halieutiques.',
      en: 'Morocco’s master fisheries compact transformed the Kingdom into Africa’s #1 fishing nation and #13 globally, shifting focus from raw extraction to domestic industrial processing.',
    },
    moroccoGains: {
      ar: [
        'توفير أكثر من 260,000 منصب شغل مباشر (بحارة وعاملات تصبير) و500,000 منصب غير مباشر',
        'القضاء على النقل العشوائي للسمك بفضل الصناديق العازلة للحرارة وشاحنات التبريد المعتمدة',
        'إحداث الوكالة الوطنية لتنمية تربية الأحياء المائية (ANDA) التي أطلقت أكثر من 250 مزرعة بحرية بالداخلة والشمال',
      ],
      fr: [
        'Plus de 260 000 emplois directs en mer et à terre et 500 000 emplois induits',
        'Chaîne du froid certifiée de la cale du bateau jusqu’au marché de gros',
        'Lancement de plus de 250 projets aquacoles marins pilotés par l’ANDA à Dakhla, Oualidia et M’diq',
      ],
      en: [
        'Over 260,000 direct jobs at sea and ashore plus 500,000 indirect livelihoods',
        'End-to-end cold-chain certification from vessel hold to urban wholesale hall',
        'Over 250 marine aquaculture concessions launched via ANDA in Dakhla, Oualidia, and M’diq',
      ],
    },
  },
  {
    id: 'maroc-espagne-chaine-valeur',
    partnerName: {
      ar: 'سلسلة التوريد الصناعي والتعاون العلمي البحري بين المغرب وإسبانيا والبرتغال',
      fr: 'Corridor Industriel Halieutique & Coopération Scientifique Maroc – Espagne – Portugal',
      en: 'Morocco–Iberia Seafood Value-Chain & Oceanographic Cooperation Pact',
    },
    flag: '🇪🇸',
    status: 'active',
    period: 'شراكة تجارية وعلمية مستمرة (INRH – IEO – IPMA)',
    economicValue: {
      ar: 'إسبانيا هي الزبون الأول عالمياً للحوت المغربي بقيمة صادرات تتجاوز 9.5 مليار درهم سنوياً عبر ميناء طنجة المتوسط',
      fr: 'L’Espagne est le 1er client mondial du poisson marocain avec plus de 9,5 milliards MAD d’achats annuels via Tanger Med',
      en: 'Spain is the #1 global buyer of Moroccan seafood, importing over 9.5 billion MAD annually via Tanger Med refrigerating corridors',
    },
    targetSpecies: [
      'الأخطبوط، السيبيا، والكالامار (نحو فيغو، قادش، ومدريد)',
      'الكروفيت الوردي، الباجو، الدرعي، والصول الطازج',
      'الأنشوبة نصف المصبرة والسردين الموجه للمصانع الإيبيرية',
    ],
    keyTerms: {
      ar: [
        'تحول تاريخي بعد 2023: بدل صيد البواخر الإسبانية في المياه المغربية، أصبحت الأسواق والمصانع الإسبانية (Mercamadrid, Mercabarna, Vigo) تشتري الأسماك المصطادة والمجمدة بأيدي مغربية من مصانع الداخلة والعيون وأكادير وطنجة',
        'عبور يومي لمئات الشاحنات المبردة المغربية عبر مضيق جبل طارق (طنجة المتوسط – الجزيرة الخضراء) في أقل من 24 ساعة من التفريغ',
        'برامج بحث علمي مشترك بين المعهد الوطني للبحث في الصيد البحري (INRH) والمعهد الإسباني لعلوم المحيطات (IEO) لدراسة تيارات الكناري ومضيق جبل طارق',
      ],
      fr: [
        'Mutation structurelle depuis 2023 : au lieu de pêcher avec leurs propres chalutiers, les industriels espagnols de Vigo, Cadix et Madrid s’approvisionnent directement auprès des usines marocaines de Dakhla, Laâyoune et Agadir',
        'Pont logistique quotidien de camions frigorifiques Tanger Med – Algésiras livrant le poisson frais en moins de 24 h',
        'Coopération océanographique entre l’INRH marocain et l’IEO espagnol sur l’écosystème du courant des Canaries',
      ],
      en: [
        'Structural post-2023 shift: rather than fishing with foreign trawlers, Spanish processors in Vigo, Cadiz, and Madrid now purchase seafood landed and processed by Moroccan crews and factories in Dakhla, Laâyoune, and Agadir',
        'Daily cold-chain truck bridge across Tanger Med–Algeciras delivering fresh catch to Iberian hubs in under 24 hours',
        'Joint oceanographic research between Morocco’s INRH and Spain’s IEO on the Canary Current and Strait of Gibraltar',
      ],
    },
    strategicContext: {
      ar: 'رغم توقف بروتوكول صيد البواخر الأوروبية سنة 2023، فإن التجارة البحرية بين المغرب وإسبانيا سجلت أرقاماً قياسية غير مسبوقة، لأن القيمة المضافة للفرز والتجميد والتعليب باتت تُنجز بالكامل داخل المصانع المغربية قبل التصدير.',
      fr: 'Malgré l’arrêt du protocole de flotte UE en 2023, les exportations halieutiques marocaines vers l’Espagne ont atteint un record historique, toute la valeur ajoutée (congélation, filetage, conditionnement) étant désormais réalisée au Maroc.',
      en: 'Despite the 2023 expiration of the EU fleet protocol, Moroccan seafood exports to Spain hit all-time highs because 100% of catching, freezing, and filleting value-add is now retained inside Moroccan ports.',
    },
    moroccoGains: {
      ar: [
        'الاحتفاظ بـ 100% من القيمة الصناعية المضافة (الفرز، التجميد، التعليب) داخل التراب المغربي',
        'ارتباط حيوي لأسواق مدريد وبرشلونة وفيغو بالمنتوج البحري المغربي اليومي',
        'تشغيل الأسطول المغربي الوطني بكامل طاقته دون منافسة من البواخر الأجنبية في المصايد الساحلية',
      ],
      fr: [
        'Rétention de 100 % de la valeur ajoutée industrielle dans les ports marocains',
        'Dépendance structurelle des halles de Madrid, Barcelone et Vigo envers les arrivages marocains',
        'Pleine souveraineté de la flotte nationale marocaine sur ses zones de pêche',
      ],
      en: [
        '100% retention of industrial processing value-add inside Moroccan coastal cities',
        'Structural integration of Madrid, Barcelona, and Vigo wholesale halls with daily Moroccan landings',
        'Exclusive harvesting sovereignty for Moroccan-flagged vessels across coastal grounds',
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
  {
    id: 'crevette-trend',
    speciesId: 'crevette',
    speciesName: {
      ar: 'الكروفيت الوردي / القمرون (Crevette)',
      fr: 'Crevette rose du large',
      en: 'Deep-Water Rose Shrimp',
    },
    pastTrend: {
      priceRangeMAD: '60 – 90 درهم/كلغ (قبل توسع أسطول التجميد والطلب الأندلسي)',
      summary: {
        ar: 'كان الكروفيت الوردي متوفراً بكثرة في موانئ العرائش والقنيطرة وأكادير بأسعار متوسطة في الأسواق المحلية.',
        fr: 'Abondante à Larache, Mehdia et Agadir à des prix modérés sur le marché local.',
        en: 'Historically landed in volume at Larache, Mehdia, and Agadir with moderate domestic prices.',
      },
    },
    presentStatus: {
      priceRangeMAD: '95 – 145 درهم/كلغ (حسب الحجم Royale أو عادي)',
      supplyStatus: 'scarce',
      trendDirection: 'up',
      summary: {
        ar: 'ارتفاع قوي نتيجة الطلب الفندقي والتصدير اليومي نحو إسبانيا، مع ذروة استهلاك في شهر رمضان وفصل الصيف.',
        fr: 'Forte hausse tirée par l’exportation vers l’Andalousie et la demande maximale durant le mois de Ramadan.',
        en: 'Strong upward trend driven by Andalusian export demand and peak domestic consumption during Ramadan and summer.',
      },
    },
    futureForecast: {
      outlook: 'up',
      driverFactors: {
        ar: [
          'تشديد مراقبة شباك الجر الساحلي لحماية صغار القشريات',
          'ارتفاع الطلب على بسطيلة الحوت وأطباق البيل بيل في المطاعم المغربية',
        ],
        fr: [
          'Régulation stricte du chalutage côtier pour préserver les juvéniles',
          'Demande soutenue des traiteurs (Pastilla royale) et restaurants côtiers',
        ],
        en: [
          'Stricter coastal trawling mesh regulations protecting juvenile shrimp beds',
          'Growing catering demand for Royal Seafood Pastilla and coastal Pil-Pil dishes',
        ],
      },
      projection: {
        ar: 'توقعات ببقاء الأسعار مرتفعة بين 105 و 150 درهم/كلغ للأحجام الكبيرة الطازجة.',
        fr: 'Maintien des cours élevés entre 105 et 150 MAD/kg pour les calibres frais.',
        en: 'Prices projected to stay firm between 105–150 MAD/kg for fresh large-caliber catch.',
      },
    },
    biologicalRestPeriod: {
      months: 'يناير – فبراير و شتنبر – أكتوبر (حسب مناطق الصيد بالجر)',
      description: {
        ar: 'منع مؤقت لشباك الجر في مناطق تفريخ القمرون الساحلي لضمان تجدد المخزون.',
        fr: 'Repos zoné des fonds chalutables pour protéger le renouvellement des stocks de crevettes.',
        en: 'Zonal trawling closures protecting coastal shrimp spawning grounds.',
      },
    },
  },
  {
    id: 'dorade-trend',
    speciesId: 'dorade-royale',
    speciesName: {
      ar: 'الزريقة الملكية / الدوراد (Zriqa)',
      fr: 'Dorade royale',
      en: 'Gilthead Seabream',
    },
    pastTrend: {
      priceRangeMAD: '90 – 130 درهم/كلغ (عندما كان الاعتماد حصرياً على صيد الخيط البري)',
      summary: {
        ar: 'كانت الزريقة تقتصر على صيد القصبة والخيط بسعر مرتفع جداً ونادراً ما تتوفر بكميات كبيرة.',
        fr: 'Autrefois limitée à la pêche de ligne sauvage avec des prix très élevés.',
        en: 'Previously limited to wild surf and line catches at premium prices.',
      },
    },
    presentStatus: {
      priceRangeMAD: '65 – 95 درهم/كلغ (بفضل مزارع المضيق والناظور والداخلة إلى جانب الصيد البري)',
      supplyStatus: 'abundant',
      trendDirection: 'stable',
      summary: {
        ar: 'استقرار ملحوظ في السعر بفضل نجاح مشاريع تربية الأحياء المائية المغربية (ANDA) في المضيق ومارتشيكا والداخلة التي وفرت زريقة طرية يومياً.',
        fr: 'Stabilisation remarquable grâce à l’essor des fermes aquacoles marines de M’diq, Nador (Marchica) et Dakhla.',
        en: 'Remarkable price stability driven by thriving Moroccan offshore aquaculture in M’diq, Nador Marchica, and Dakhla.',
      },
    },
    futureForecast: {
      outlook: 'down',
      driverFactors: {
        ar: [
          'دخول أكثر من 50 مزرعة بحرية جديدة حيز الإنتاج في الداخلة والواجهة المتوسطية',
          'وفرة العرض طوال أشهر السنة دون تأثر بتقلبات الطقس والأمواج',
        ],
        fr: [
          'Montée en puissance des nouvelles fermes aquacoles pilotées par l’ANDA',
          'Approvisionnement régulier toute l’année indépendant de la météo marine',
        ],
        en: [
          'Scaling of new ANDA-backed offshore sea cages across Dakhla and the Mediterranean',
          'Consistent year-round supply insulated from winter storm disruptions',
        ],
      },
      projection: {
        ar: 'توقعات بانخفاض تدريجي واستقرار بين 60 و 75 درهم/كلغ للزريقة المرباة في البحر و110 درهم للبرية الحرة.',
        fr: 'Cours très compétitif autour de 60-75 MAD/kg (aquaculture marine) et 110+ MAD/kg (sauvage de ligne).',
        en: 'Accessible 60–75 MAD/kg for sea-cage bream while wild line-caught Zriqa holds at 110+ MAD/kg.',
      },
    },
    biologicalRestPeriod: {
      months: 'أكتوبر – دجنبر (فترة التوالد الشتوي للزريقة البرية)',
      description: {
        ar: 'حماية الحد الأدنى للحجم القانوني (20 سم) للزريقة الحرة مع توفر الزريقة المرباة طوال السنة.',
        fr: 'Respect de la taille minimale biologique (20 cm) pour les spécimens sauvages.',
        en: 'Strict minimum landing size (20 cm) for wild stocks while farmed supply remains continuous.',
      },
    },
  },
]

