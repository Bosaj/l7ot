import type { Fish, Recipe } from '../data/types'
import type { SupportedLanguage } from '../i18n/strings'

/**
 * Generate Schema.org SeafoodProduct JSON-LD structured data for a fish species
 */
export function generateSeafoodProductSchema(
  fish: Fish,
  lang: SupportedLanguage = 'ar'
): Record<string, unknown> {
  const name =
    lang === 'ar'
      ? `${fish.nameDarijaArabic} (${fish.nameDarijaLatin})`
      : lang === 'fr'
      ? fish.nameFrench
      : fish.nameEnglish

  const description =
    lang === 'ar'
      ? `معلومات ومقاسات الصيد القانونية وأسعار ${fish.nameDarijaArabic} في الموانئ المغربية طبقاً لظهير 1973.`
      : lang === 'fr'
      ? `Fiche halieutique officielle de ${fish.nameFrench} (${fish.scientificName}), tailles légales Dahir 1973 et cours des criées marocaines.`
      : `Official Moroccan fisheries specimen guide for ${fish.nameEnglish} (${fish.scientificName}), catch regulations, and live port auctions.`

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    image: `https://l7ot.vercel.app/images/fish/${fish.id}.jpg`,
    description,
    sku: `MA-FISH-${fish.id.toUpperCase()}`,
    category: 'Seafood',
    brand: {
      '@type': 'Brand',
      name: 'L7OT · الحوت المغربي',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'MAD',
      lowPrice: Math.round(fish.pricing.currentSpotMAD * 0.85),
      highPrice: Math.round(fish.pricing.currentSpotMAD * 1.35),
      offerCount: fish.mainPorts.length,
      price: fish.pricing.currentSpotMAD,
      availability: 'https://schema.org/InStock',
      areaServed: {
        '@type': 'Country',
        name: 'Morocco',
      },
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Scientific Name',
        value: fish.scientificName,
      },
      {
        '@type': 'PropertyValue',
        name: 'Minimum Commercial Size (Dahir 1973)',
        value: fish.regulations?.minimumCatchSizeCm
          ? `${fish.regulations.minimumCatchSizeCm} cm`
          : 'Réglementé selon Dahir 1973',
      },
      {
        '@type': 'PropertyValue',
        name: 'Primary Moroccan Landing Ports',
        value: fish.mainPorts.join(', '),
      },
    ],
  }
}

/**
 * Generate Schema.org Recipe JSON-LD for authentic Moroccan seafood recipes
 */
export function generateRecipeSchema(
  recipe: Recipe,
  lang: SupportedLanguage = 'ar'
): Record<string, unknown> {
  const name =
    lang === 'ar'
      ? recipe.titleDarijaArabic
      : lang === 'fr'
      ? recipe.titleFrench
      : recipe.titleEnglish

  return {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name,
    image: `https://l7ot.vercel.app/images/recipes/${recipe.id}.jpg`,
    description: `Recette traditionnelle côtière marocaine : ${name}. Préparée avec épices et chermoula authentique.`,
    recipeCuisine: 'Moroccan',
    prepTime: `PT${recipe.prepTimeMinutes}M`,
    cookTime: `PT${recipe.cookTimeMinutes}M`,
    recipeYield: `${recipe.servings} portions`,
    recipeIngredient: recipe.ingredients.map(
      (i) => `${i.quantity} ${lang === 'ar' ? i.itemAr : lang === 'fr' ? i.itemFr : i.itemEn}`
    ),
    recipeInstructions: recipe.steps.map((s, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      name: `Étape ${idx + 1}`,
      text: lang === 'ar' ? s.textAr : lang === 'fr' ? s.textFr : s.textEn,
    })),
  }
}

/**
 * Inject Schema.org JSON-LD into document.head
 */
export function injectJsonLd(schemaId: string, schemaData: Record<string, unknown>): void {
  if (typeof document === 'undefined') return

  let script = document.getElementById(schemaId) as HTMLScriptElement | null
  if (!script) {
    script = document.createElement('script')
    script.id = schemaId
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(schemaData)
}
