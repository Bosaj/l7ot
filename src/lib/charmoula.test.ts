import { describe, it, expect } from 'vitest'
import { calculateCharmoula } from './charmoula'
import { MOROCCAN_FISH } from '../data/fish'

describe('calculateCharmoula', () => {
  const sardine = MOROCCAN_FISH.find((f) => f.id === 'sardine')!
  const sole = MOROCCAN_FISH.find((f) => f.id === 'sole')!
  const crevette = MOROCCAN_FISH.find((f) => f.id === 'crevette')!

  it('calculates charmoula for 4 servings of sardine tagine', () => {
    const result = calculateCharmoula(sardine, 'tagine', 4)
    expect(result.servings).toBe(4)
    expect(result.weightKg).toBe(1.0)
    expect(result.formula.garlicCloves).toBeGreaterThanOrEqual(5)
    expect(result.formula.cuminTsp).toBeGreaterThan(1.5)
    expect(result.formula.oliveOilTbsp).toBeGreaterThanOrEqual(3)
    expect(result.marinadeTimeMinutes).toBe(15)
  })

  it('adjusts garlic and paprika for crevettes pil-pil', () => {
    const result = calculateCharmoula(crevette, 'pil_pil', 2)
    expect(result.servings).toBe(2)
    // Crevettes pil-pil has higher garlic and oil factor
    expect(result.formula.garlicCloves).toBeGreaterThanOrEqual(4)
    expect(result.estimatedCookTimeMinutes).toBe(10)
  })

  it('scales proportions when increasing guests from 2 to 8', () => {
    const res2 = calculateCharmoula(sole, 'four', 2)
    const res8 = calculateCharmoula(sole, 'four', 8)
    expect(res8.formula.corianderGrams).toBeGreaterThan(res2.formula.corianderGrams)
    expect(res8.weightKg).toBe(2.0)
  })

  it('includes bay leaves and celery stalks for tagine method', () => {
    const result = calculateCharmoula(sardine, 'tagine', 4)
    const hasBayLeaves = result.formula.specialAdditions.some((s) =>
      s.ar.includes('سيدنا موسى')
    )
    expect(hasBayLeaves).toBe(true)
  })
})
