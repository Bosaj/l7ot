import { describe, it, expect, vi, beforeEach } from 'vitest'
import { speakDarija } from './speech'

describe('speech utility', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('attempts to play audio and returns boolean', () => {
    const playMock = vi.fn().mockReturnValue(Promise.resolve())
    const pauseMock = vi.fn()

    class MockAudio {
      src: string
      currentTime = 0
      constructor(src: string) {
        this.src = src
      }
      play = playMock
      pause = pauseMock
    }

    vi.stubGlobal('Audio', MockAudio)

    const result = speakDarija('سردين', 'Ser-dine', 'sardine', 'ar')
    expect(result).toBe(true)
    expect(playMock).toHaveBeenCalled()
  })

  it('handles speech invocation for known species', () => {
    const result = speakDarija('سمك غير معروف', undefined, undefined, 'ar')
    // Returns boolean safely without throwing
    expect(typeof result).toBe('boolean')
  })
})
