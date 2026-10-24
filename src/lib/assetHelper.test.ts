import { describe, it, expect } from 'vitest'
import { getAssetUrl } from './assetHelper'

describe('assetHelper', () => {
  it('returns empty string for undefined or empty input', () => {
    expect(getAssetUrl('')).toBe('')
    expect(getAssetUrl(undefined)).toBe('')
    expect(getAssetUrl(null)).toBe('')
  })

  it('preserves absolute URLs', () => {
    expect(getAssetUrl('https://example.com/fish.png')).toBe('https://example.com/fish.png')
    expect(getAssetUrl('http://example.com/fish.png')).toBe('http://example.com/fish.png')
    expect(getAssetUrl('data:image/svg+xml;utf8,...')).toBe('data:image/svg+xml;utf8,...')
  })

  it('prefixes root-relative and relative paths with BASE_URL', () => {
    const result1 = getAssetUrl('/favicon.svg')
    expect(result1).not.toBe('/favicon.svg')
    expect(result1.endsWith('favicon.svg')).toBe(true)

    const result2 = getAssetUrl('/images/fish/sardine.jpg')
    expect(result2.startsWith('/')).toBe(false)
    expect(result2.endsWith('images/fish/sardine.jpg')).toBe(true)
  })
})
