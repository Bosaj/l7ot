import { describe, it, expect } from 'vitest'
import { generateSeafoodProductSchema, generateRecipeSchema, injectJsonLd } from './seoStructuredData'
import { MOROCCAN_FISH } from '../data/fish'
import { MOROCCAN_RECIPES } from '../data/recipes'

describe('SEO Structured Data (Schema.org JSON-LD)', () => {
  it('generates compliant Product Schema for Moroccan fish', () => {
    const sardine = MOROCCAN_FISH.find((f) => f.id === 'sardine')!
    const schema = generateSeafoodProductSchema(sardine, 'fr')

    expect(schema['@context']).toBe('https://schema.org')
    expect(schema['@type']).toBe('Product')
    expect(schema.name).toContain('Sardine commune')
    expect(schema.sku).toBe('MA-FISH-SARDINE')
    expect((schema.offers as Record<string, unknown>).priceCurrency).toBe('MAD')
  })

  it('generates compliant Recipe Schema for Moroccan seafood recipes', () => {
    const recipe = MOROCCAN_RECIPES[0]!
    const schema = generateRecipeSchema(recipe, 'fr')

    expect(schema['@context']).toBe('https://schema.org')
    expect(schema['@type']).toBe('Recipe')
    expect(schema.recipeCuisine).toBe('Moroccan')
    expect(Array.isArray(schema.recipeIngredient)).toBe(true)
    expect(Array.isArray(schema.recipeInstructions)).toBe(true)
  })

  it('safely injects JSON-LD script tag into document head', () => {
    const testData = { '@context': 'https://schema.org', '@type': 'Thing', name: 'Test' }
    injectJsonLd('test-schema-id', testData)

    const el = document.getElementById('test-schema-id')
    expect(el).not.toBeNull()
    expect(el?.getAttribute('type')).toBe('application/ld+json')
    expect(el?.textContent).toContain('Test')
  })
})
