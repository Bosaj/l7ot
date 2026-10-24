import { describe, it, expect, vi } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { OffshoreFishermanBanner } from './OffshoreFishermanBanner'

describe('OffshoreFishermanBanner', () => {
  it('renders offline high seas banner when isHighSeasActive is true', () => {
    const handleGps = vi.fn()
    const handleToggle = vi.fn()

    render(
      <OffshoreFishermanBanner
        isHighSeasActive={true}
        isSimulatedOffline={false}
        lang="ar"
        onOpenGpsNavigator={handleGps}
        onToggleSimulatedOffline={handleToggle}
      />
    )

    expect(screen.getByText(/وضع الصيد في عرض البحر نشط/i)).toBeInTheDocument()
    expect(screen.getByText(/44 صورة وقوانين الصيد مخزنة محلياً/i)).toBeInTheDocument()

    const gpsBtn = screen.getByRole('button', { name: /بوصلة الموانئ \(GPS\)/i })
    fireEvent.click(gpsBtn)
    expect(handleGps).toHaveBeenCalled()
  })

  it('does not render when high seas mode is inactive', () => {
    render(
      <OffshoreFishermanBanner
        isHighSeasActive={false}
        isSimulatedOffline={false}
        lang="fr"
        onOpenGpsNavigator={() => {}}
        onToggleSimulatedOffline={() => {}}
      />
    )

    expect(screen.queryByText(/Mode Pêcheur en Haute Mer/i)).not.toBeInTheDocument()
  })

  it('can be dismissed into a compact floating indicator', () => {
    render(
      <OffshoreFishermanBanner
        isHighSeasActive={true}
        isSimulatedOffline={true}
        lang="en"
        onOpenGpsNavigator={() => {}}
        onToggleSimulatedOffline={() => {}}
      />
    )

    const dismissBtn = screen.getByLabelText(/Dismiss banner/i)
    fireEvent.click(dismissBtn)

    expect(screen.getByText(/High Seas Mode Active \(100% Offline\)/i)).toBeInTheDocument()
  })
})
